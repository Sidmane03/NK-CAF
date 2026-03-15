import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { Check, X, Loader2, Tag } from 'lucide-react';

interface OfferRow {
  id: string;
  name: string;
  price: number;
  discounted_price: number | null;
  category_name: string;
  category_id: string;
  is_active: boolean;
  display_order: number;
}

export default function OffersManager() {
  const [items, setItems] = useState<OfferRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<{ id: string; type: 'ok' | 'err'; msg: string } | null>(null);

  // Global Discount States
  const [globalDiscount, setGlobalDiscount] = useState('');
  const [globalScope, setGlobalScope] = useState('all');
  const [globalSaving, setGlobalSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    const { data, error } = await supabase
      .from('menu_items')
      .select('id, name, price, discounted_price, category_id, is_active, display_order, menu_categories(name)')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) {
      setFeedback({ id: 'global', type: 'err', msg: error.message });
    } else {
      const rows: OfferRow[] = (data ?? []).map((d: Record<string, unknown>) => {
        const cat = d.menu_categories as { name: string } | null;
        return {
          id: d.id as string,
          name: d.name as string,
          price: d.price as number,
          discounted_price: d.discounted_price as number | null,
          category_id: d.category_id as string,
          category_name: cat?.name ?? 'Uncategorized',
          is_active: d.is_active as boolean,
          display_order: d.display_order as number,
        };
      });
      setItems(rows);

      // Pre-fill drafts with current discounted prices
      const d: Record<string, string> = {};
      rows.forEach((r) => {
        d[r.id] = r.discounted_price != null ? String(r.discounted_price) : '';
      });
      setDrafts(d);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  /* ─── Individual Save/Clear ─── */
  async function handleSave(item: OfferRow) {
    const value = drafts[item.id]?.trim();
    if (!value || isNaN(Number(value)) || Number(value) <= 0) {
      setFeedback({ id: item.id, type: 'err', msg: 'Enter a valid price' });
      return;
    }

    setSaving((p) => ({ ...p, [item.id]: true }));
    const { error } = await supabase
      .from('menu_items')
      .update({ discounted_price: Number(value) })
      .eq('id', item.id);

    setSaving((p) => ({ ...p, [item.id]: false }));

    if (error) {
      setFeedback({ id: item.id, type: 'err', msg: error.message });
    } else {
      setFeedback({ id: item.id, type: 'ok', msg: 'Saved!' });
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, discounted_price: Number(value) } : i))
      );
      setTimeout(() => setFeedback(null), 2000);
    }
  }

  async function handleClear(item: OfferRow) {
    setSaving((p) => ({ ...p, [item.id]: true }));
    const { error } = await supabase
      .from('menu_items')
      .update({ discounted_price: null })
      .eq('id', item.id);

    setSaving((p) => ({ ...p, [item.id]: false }));

    if (error) {
      setFeedback({ id: item.id, type: 'err', msg: error.message });
    } else {
      setFeedback({ id: item.id, type: 'ok', msg: 'Offer cleared' });
      setDrafts((p) => ({ ...p, [item.id]: '' }));
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, discounted_price: null } : i))
      );
      setTimeout(() => setFeedback(null), 2000);
    }
  }

  /* ─── Global Features ─── */
  async function handleApplyGlobal() {
    const pct = Number(globalDiscount);
    if (isNaN(pct) || pct <= 0 || pct >= 100) {
      setFeedback({ id: 'global', type: 'err', msg: 'Enter a valid percentage (1-99)' });
      return;
    }

    setGlobalSaving(true);
    const toUpdate = items.filter((i) => globalScope === 'all' || i.category_id === globalScope);
    
    // To do a bulk update with dynamic values per row in a single query, we use upsert
    const upsertData = toUpdate.map((item) => {
      const newPrice = Math.round(item.price - (item.price * pct / 100));
      return {
        id: item.id,
        category_id: item.category_id,
        name: item.name,
        price: item.price,
        is_active: item.is_active,
        display_order: item.display_order,
        discounted_price: newPrice,
      };
    });

    const { error } = await supabase.from('menu_items').upsert(upsertData);
    setGlobalSaving(false);

    if (error) {
      setFeedback({ id: 'global', type: 'err', msg: error.message });
    } else {
      setFeedback({ id: 'global', type: 'ok', msg: `Applied ${pct}% discount to ${toUpdate.length} items!` });
      setGlobalDiscount('');
      fetchItems();
      setTimeout(() => setFeedback(null), 3000);
    }
  }

  async function handleClearGlobal() {
    setGlobalSaving(true);
    const toUpdate = items.filter((i) => globalScope === 'all' || i.category_id === globalScope);
    const ids = toUpdate.map(i => i.id);

    const { error } = await supabase
      .from('menu_items')
      .update({ discounted_price: null })
      .in('id', ids);

    setGlobalSaving(false);

    if (error) {
      setFeedback({ id: 'global', type: 'err', msg: error.message });
    } else {
      setFeedback({ id: 'global', type: 'ok', msg: `Cleared discounts for ${toUpdate.length} items.` });
      fetchItems();
      setTimeout(() => setFeedback(null), 3000);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-amber animate-spin" />
      </div>
    );
  }

  const grouped = items.reduce<Record<string, OfferRow[]>>((acc, item) => {
    (acc[item.category_name] ??= []).push(item);
    return acc;
  }, {});

  // Extract unique categories for dropdown
  const uniqueCategories = Object.keys(grouped).map(catName => ({
    name: catName,
    id: grouped[catName][0].category_id
  }));

  return (
    <div>
      <h2 className="text-3xl font-serif font-medium text-charcoal mb-2">Offers & Discounts</h2>
      <p className="text-charcoal/60 mb-8">
        Manage item discounts individually or apply a global percentage across categories.
      </p>

      {/* Global Discount Card */}
      <div className="bg-sand border-2 border-charcoal rounded-xl p-6 mb-8 shadow-hard">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-5 h-5 text-amber" />
          <h3 className="text-xl font-serif font-bold text-charcoal">Global Discount</h3>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 md:items-end">
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-bold uppercase tracking-widest text-charcoal/60">
              Discount Percentage (%)
            </label>
            <input
              type="number"
              min="1"
              max="99"
              placeholder="e.g. 20"
              value={globalDiscount}
              onChange={(e) => setGlobalDiscount(e.target.value)}
              className="w-full bg-cream border-2 border-charcoal/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber transition-colors"
            />
          </div>
          
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-bold uppercase tracking-widest text-charcoal/60">
              Scope
            </label>
            <select
              value={globalScope}
              onChange={(e) => setGlobalScope(e.target.value)}
              className="w-full bg-cream border-2 border-charcoal/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber transition-colors appearance-none"
            >
              <option value="all">All Items</option>
              {uniqueCategories.map(c => (
                <option key={c.id} value={c.id}>Category: {c.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
            <button
              onClick={handleApplyGlobal}
              disabled={globalSaving || !globalDiscount}
              className="flex-1 md:flex-none btn-artisanal rounded-lg px-6 py-2 text-sm disabled:opacity-50"
            >
              {globalSaving ? <Loader2 size={16} className="animate-spin mx-auto" /> : 'Apply'}
            </button>
            <button
              onClick={handleClearGlobal}
              disabled={globalSaving}
              className="flex-1 md:flex-none border-2 border-charcoal/30 rounded-lg px-6 py-2 text-sm hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors disabled:opacity-50"
            >
              Clear All
            </button>
          </div>
        </div>
        {feedback?.id === 'global' && (
          <div className={`mt-4 px-4 py-2 rounded-lg text-sm font-bold ${
            feedback.type === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {feedback.msg}
          </div>
        )}
      </div>

      <div className="space-y-8">
        {Object.entries(grouped).map(([catName, catItems]) => (
          <div key={catName}>
            <h3 className="text-lg font-bold text-amber mb-3 uppercase tracking-wider">{catName}</h3>
            <div className="bg-cream border-2 border-charcoal rounded-xl overflow-hidden shadow-sm">
              {/* Desktop header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-charcoal/5 text-xs font-bold uppercase tracking-widest text-charcoal/60">
                <div className="col-span-4">Item</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-3">Discount ₹</div>
                <div className="col-span-3 text-right">Actions</div>
              </div>

              {catItems.map((item, idx) => (
                <div
                  key={item.id}
                  className={`px-4 py-3 ${idx < catItems.length - 1 ? 'border-b border-charcoal/10' : ''}`}
                >
                  {/* Desktop view */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 font-medium text-charcoal flex items-center gap-2">
                       {item.name}
                    </div>
                    <div className="col-span-2 text-right text-charcoal/70">
                      <span className={item.discounted_price != null ? 'line-through opacity-50' : ''}>
                        ₹{item.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="col-span-3 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40 text-sm">₹</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="—"
                        value={drafts[item.id] ?? ''}
                        onChange={(e) => setDrafts((p) => ({ ...p, [item.id]: e.target.value }))}
                        className={`w-full bg-sand border-2 rounded-lg pl-7 pr-3 py-1.5 text-sm focus:outline-none transition-colors ${
                          item.discounted_price != null ? 'border-amber/50 font-bold text-amber' : 'border-charcoal/20 focus:border-amber'
                        }`}
                      />
                    </div>
                    <div className="col-span-3 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleSave(item)}
                        disabled={saving[item.id]}
                        className="btn-artisanal rounded-lg px-3 py-1.5 text-xs disabled:opacity-50 min-w-[70px] flex justify-center"
                      >
                        {saving[item.id] ? <Loader2 size={14} className="animate-spin" /> : <><Check size={14} /><span className="ml-1">Save</span></>}
                      </button>
                      {item.discounted_price != null && (
                        <button
                          onClick={() => handleClear(item)}
                          disabled={saving[item.id]}
                          className="border-2 border-charcoal/30 rounded-lg px-3 py-1.5 text-xs hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors disabled:opacity-50 min-w-[70px] flex justify-center"
                        >
                          <X size={14} />
                          <span className="ml-1">Clear</span>
                        </button>
                      )}
                      <div className="w-16 flex justify-end">
                        {feedback?.id === item.id && (
                          <span className={`text-xs font-bold ${feedback.type === 'ok' ? 'text-green-600' : 'text-red-600'}`}>
                            {feedback.msg}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mobile view */}
                  <div className="md:hidden space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-charcoal">{item.name}</span>
                      <div className="text-right">
                        <div className={`text-charcoal/70 text-sm ${item.discounted_price != null ? 'line-through opacity-50 text-xs' : ''}`}>
                          ₹{item.price.toFixed(2)}
                        </div>
                        {item.discounted_price != null && (
                          <div className="text-amber font-bold text-sm">
                            ₹{item.discounted_price.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40 text-sm">₹</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="Discount price"
                          value={drafts[item.id] ?? ''}
                          onChange={(e) => setDrafts((p) => ({ ...p, [item.id]: e.target.value }))}
                          className="w-full bg-sand border-2 border-charcoal/20 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:border-amber transition-colors"
                        />
                      </div>
                      <button
                        onClick={() => handleSave(item)}
                        disabled={saving[item.id]}
                        className="btn-artisanal rounded-lg px-3 py-2 text-xs disabled:opacity-50 min-w-[60px] flex justify-center"
                      >
                        {saving[item.id] ? <Loader2 size={14} className="animate-spin" /> : 'Save'}
                      </button>
                      {item.discounted_price != null && (
                        <button
                          onClick={() => handleClear(item)}
                          disabled={saving[item.id]}
                          className="border-2 border-charcoal/30 rounded-lg px-3 py-2 text-xs hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors disabled:opacity-50"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    {feedback?.id === item.id && (
                      <p className={`text-xs font-bold ${feedback.type === 'ok' ? 'text-green-600' : 'text-red-600'}`}>
                        {feedback.msg}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}