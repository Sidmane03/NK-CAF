import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { MenuCategory } from '../types/menu';

export function useMenu() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchMenu() {
      const { data, error: fetchError } = await supabase
        .from('menu_categories')
        .select(`
          *,
          items:menu_items(*)
        `)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (cancelled) return;

      if (fetchError) {
        setError(fetchError.message);
      } else {
        // Filter out inactive items and sort them by display_order
        const cleaned = (data ?? []).map((cat: MenuCategory) => ({
          ...cat,
          items: (cat.items ?? [])
            .filter((item) => item.is_active)
            .sort((a, b) => a.display_order - b.display_order),
        }));
        setCategories(cleaned);
      }
      setLoading(false);
    }

    fetchMenu();
    return () => { cancelled = true; };
  }, []);

  return { categories, loading, error };
}