import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import type { MenuCategory, MenuItem } from '../../types/menu';
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react';

/* ─── Inline types for draft state ─── */
interface ItemDraft {
  name: string;
  price: string;
  is_active: boolean;
}

export default function MenuManager() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [drafts, setDrafts] = useState<Record<string, ItemDraft>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<{ id: string; type: 'ok' | 'err'; msg: string } | null>(null);
  const [newItem, setNewItem] = useState<Record<string, { name: string; price: string }>>({});
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  
  // Category Image States
  const [catImageDrafts, setCatImageDrafts] = useState<Record<string, string>>({});
  const [savingCat, setSavingCat] = useState<Record<string, boolean>>({});

  /* ─── Fetch data ─── */
  const fetchMenu = useCallback(async () => {
    const { data, error } = await supabase
      .from('menu_categories')
      .select('*, items:menu_items(*)')
      .order('display_order', { ascending: true });

    if (error) {
      showFeedback('', 'err', error.message);
    } else {
      const cats = (data ?? []).map((cat: MenuCategory) => ({
        ...cat,
        items: (cat.items ?? []).sort((a: MenuItem, b: MenuItem) => a.display_order - b.display_order),
      }));
      setCategories(cats);

      // Seed drafts for every item and category image
      const d: Record<string, ItemDraft> = {};
      const imgD: Record<string, string> = {};
      cats.forEach((cat: MenuCategory) => {
        imgD[cat.id] = cat.image_url ?? '';
        cat.items.forEach((item: MenuItem) => {
          d[item.id] = { name: item.name, price: String(item.price), is_active: item.is_active };
        });
      });
      setDrafts(d);
      setCatImageDrafts(imgD);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchMenu(); }, [fetchMenu]);

  /* ─── Helpers ─── */
  function showFeedback(id: string, type: 'ok' | 'err', msg: string) {
    setFeedback({ id, type, msg });
    setTimeout(() => setFeedback(null), 3000);
  }

  function toggleExpand(catId: string) {
    setExpanded((p) => ({ ...p, [catId]: !p[catId] }));
  }

  function updateDraft(id: string, field: keyof ItemDraft, value: string | boolean) {
    setDrafts((p) => ({ ...p, [id]: { ...p[id], [field]: value } }));
  }

  /* ─── Save single item ─── */
  async function handleSaveItem(item: MenuItem) {
    const draft = drafts[item.id];
    if (!draft) return;

    const name = draft.name.trim();
    const price = Number(draft.price);
    if (!name) { showFeedback(item.id, 'err', 'Name is required'); return; }
    if (isNaN(price) || price <= 0) { showFeedback(item.id, 'err', 'Enter a valid price'); return; }

    setSaving((p) => ({ ...p, [item.id]: true }));
    const { error } = await supabase
      .from('menu_items')
      .update({ name, price, is_active: draft.is_active })
      .eq('id', item.id);
    setSaving((p) => ({ ...p, [item.id]: false }));

    if (error) {
      showFeedback(item.id, 'err', error.message);
    } else {
      showFeedback(item.id, 'ok', 'Saved!');
      fetchMenu();
    }
  }

  /* ─── Toggle is_active ─── */
  async function handleToggleActive(item: MenuItem) {
    const newVal = !drafts[item.id]?.is_active;
    updateDraft(item.id, 'is_active', newVal);

    const { error } = await supabase
      .from('menu_items')
      .update({ is_active: newVal })
      .eq('id', item.id);

    if (error) {
      showFeedback(item.id, 'err', error.message);
      updateDraft(item.id, 'is_active', !newVal);
    } else {
      showFeedback(item.id, 'ok', newVal ? 'Shown' : 'Hidden');
      fetchMenu();
    }
  }

  /* ─── Delete item ─── */
  async function handleDelete(itemId: string) {
    setSaving((p) => ({ ...p, [itemId]: true }));
    const { error } = await supabase.from('menu_items').delete().eq('id', itemId);
    setSaving((p) => ({ ...p, [itemId]: false }));
    setConfirmDelete(null);

    if (error) {
      showFeedback(itemId, 'err', error.message);
    } else {
      showFeedback('', 'ok', 'Item deleted');
      fetchMenu();
    }
  }

  /* ─── Add new item ─── */
  async function handleAddItem(catId: string) {
    const draft = newItem[catId];
    if (!draft?.name?.trim()) { showFeedback(catId, 'err', 'Name is required'); return; }
    const price = Number(draft.price);
    if (isNaN(price) || price <= 0) { showFeedback(catId, 'err', 'Enter a valid price'); return; }

    // Find max display_order in that category
    const cat = categories.find((c) => c.id === catId);
    const maxOrder = cat?.items.reduce((m, i) => Math.max(m, i.display_order), 0) ?? 0;

    setSaving((p) => ({ ...p, [catId]: true }));
    const { error } = await supabase.from('menu_items').insert({
      category_id: catId,
      name: draft.name.trim(),
      price,
      display_order: maxOrder + 1,
      is_active: true,
      discounted_price: null,
    });
    setSaving((p) => ({ ...p, [catId]: false }));

    if (error) {
      showFeedback(catId, 'err', error.message);
    } else {
      showFeedback(catId, 'ok', 'Item added!');
      setNewItem((p) => ({ ...p, [catId]: { name: '', price: '' } }));
      fetchMenu();
    }
  }

  /* ─── Save Category Image ─── */
  async function handleSaveCatImage(catId: string) {
    const url = catImageDrafts[catId]?.trim() || null;
    setSavingCat((p) => ({ ...p, [catId]: true }));
    const { error } = await supabase
      .from('menu_categories')
      .update({ image_url: url })
      .eq('id', catId);
    setSavingCat((p) => ({ ...p, [catId]: false }));

    if (error) {
      showFeedback(catId, 'err', error.message);
    } else {
      showFeedback(catId, 'ok', 'Category image updated!');
      fetchMenu();
    }
  }

  /* ─── Render ─── */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-amber animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-serif font-medium text-charcoal mb-2">Menu Manager</h2>
      <p className="text-charcoal/60 mb-8">
        Expand a category to edit items, add new ones, or remove them.
      </p>

      {/* Global feedback */}
      {feedback && feedback.id === '' && (
        <div className={`mb-4 px-4 py-2 rounded-lg text-sm font-bold ${
          feedback.type === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {feedback.msg}
        </div>
      )}

      <div className="space-y-4">
        {categories.map((cat) => {
          const isOpen = expanded[cat.id];
          return (
            <div key={cat.id} className="bg-cream border-2 border-charcoal rounded-xl overflow-hidden">
              {/* Category header */}
              <button
                onClick={() => toggleExpand(cat.id)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-sand/40 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {isOpen
                    ? <ChevronDown size={20} className="text-amber" />
                    : <ChevronRight size={20} className="text-charcoal/40" />}
                  <span className="text-xl font-serif font-medium text-charcoal">{cat.name}</span>
                  <span className="text-xs bg-charcoal/10 text-charcoal/60 px-2 py-0.5 rounded-full font-bold">
                    {cat.items.length} items
                  </span>
                  {!cat.is_active && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">Hidden</span>
                  )}
                </div>
              </button>

              {/* Expanded items */}
              {isOpen && (
                <div className="border-t-2 border-charcoal/10">
                  {/* Category Image Manager */}
                  <div className="px-5 py-4 border-b-2 border-charcoal/10 bg-sand/30">
                    <div className="flex flex-col md:flex-row gap-4 md:items-center">
                      <div className="w-16 h-16 rounded border-2 border-charcoal overflow-hidden bg-charcoal shrink-0 flex items-center justify-center text-cream font-bold text-2xl">
                        {catImageDrafts[cat.id] ? (
                          <img src={catImageDrafts[cat.id]} alt="Category preview" className="w-full h-full object-cover" />
                        ) : (
                          cat.name.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <label className="text-xs font-bold uppercase tracking-widest text-charcoal/60">
                          Category Image URL
                        </label>
                        <div className="flex flex-col md:flex-row gap-2">
                          <input
                            type="text"
                            value={catImageDrafts[cat.id] ?? ''}
                            onChange={(e) => setCatImageDrafts((p) => ({ ...p, [cat.id]: e.target.value }))}
                            placeholder="https://..."
                            className="flex-1 bg-cream border-2 border-charcoal/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber transition-colors"
                          />
                          <button
                            onClick={() => handleSaveCatImage(cat.id)}
                            disabled={savingCat[cat.id]}
                            className="btn-artisanal rounded-lg px-4 py-2 text-sm disabled:opacity-50 min-w-[100px] flex justify-center"
                          >
                            {savingCat[cat.id] ? <Loader2 size={16} className="animate-spin" /> : 'Save URL'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {cat.items.map((item) => {
                    const draft = drafts[item.id];
                    const isSaving = saving[item.id];
                    return (
                      <div
                        key={item.id}
                        className="px-5 py-4 border-b border-charcoal/5 last:border-b-0"
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                          {/* Name input */}
                          <input
                            type="text"
                            value={draft?.name ?? item.name}
                            onChange={(e) => updateDraft(item.id, 'name', e.target.value)}
                            className="flex-1 bg-sand border-2 border-charcoal/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber transition-colors"
                          />
                          {/* Price input */}
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-charcoal/60">₹</span>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={draft?.price ?? String(item.price)}
                              onChange={(e) => updateDraft(item.id, 'price', e.target.value)}
                              className="w-24 bg-sand border-2 border-charcoal/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber transition-colors"
                            />
                          </div>
                          {/* Action buttons */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleSaveItem(item)}
                              disabled={isSaving}
                              title="Save changes"
                              className="btn-artisanal rounded-lg p-2 disabled:opacity-50"
                            >
                              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            </button>
                            <button
                              onClick={() => handleToggleActive(item)}
                              title={draft?.is_active ? 'Hide item' : 'Show item'}
                              className={`border-2 rounded-lg p-2 transition-colors ${
                                draft?.is_active
                                  ? 'border-green-300 text-green-600 hover:bg-green-50'
                                  : 'border-charcoal/20 text-charcoal/30 hover:bg-sand'
                              }`}
                            >
                              {draft?.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
                            </button>
                            {confirmDelete === item.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="text-xs font-bold text-red-600 border-2 border-red-300 rounded-lg px-2 py-1.5 hover:bg-red-50 transition-colors"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => setConfirmDelete(null)}
                                  className="text-xs text-charcoal/50 px-2 py-1.5"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmDelete(item.id)}
                                title="Delete item"
                                className="border-2 border-charcoal/20 rounded-lg p-2 text-charcoal/40 hover:text-red-500 hover:border-red-300 hover:bg-red-50 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                          {/* Item-level feedback */}
                          {feedback?.id === item.id && (
                            <span className={`text-xs font-bold shrink-0 ${
                              feedback.type === 'ok' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {feedback.msg}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Add new item row */}
                  <div className="px-5 py-4 bg-sand/30 border-t-2 border-dashed border-charcoal/10">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <input
                        type="text"
                        placeholder="New item name"
                        value={newItem[cat.id]?.name ?? ''}
                        onChange={(e) =>
                          setNewItem((p) => ({ ...p, [cat.id]: { ...p[cat.id], name: e.target.value, price: p[cat.id]?.price ?? '' } }))
                        }
                        className="flex-1 bg-cream border-2 border-charcoal/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber transition-colors"
                      />
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-charcoal/60">₹</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="Price"
                          value={newItem[cat.id]?.price ?? ''}
                          onChange={(e) =>
                            setNewItem((p) => ({ ...p, [cat.id]: { ...p[cat.id], price: e.target.value, name: p[cat.id]?.name ?? '' } }))
                          }
                          className="w-24 bg-cream border-2 border-charcoal/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber transition-colors"
                        />
                      </div>
                      <button
                        onClick={() => handleAddItem(cat.id)}
                        disabled={saving[cat.id]}
                        className="btn-artisanal rounded-lg px-4 py-2 text-sm disabled:opacity-50 shrink-0"
                      >
                        {saving[cat.id] ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} className="inline mr-1" />}
                        Add Item
                      </button>
                    </div>
                    {feedback?.id === cat.id && (
                      <p className={`mt-2 text-xs font-bold ${
                        feedback.type === 'ok' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {feedback.msg}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
