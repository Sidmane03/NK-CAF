// src/types/menu.ts
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  discounted_price: number | null;  // ← new
  display_order: number;
  is_active: boolean;
}

export interface MenuCategory {
  id: string;
  slug: string;
  name: string;
  image_url: string | null;
  image_fit: 'cover' | 'contain' | null;
  image_position: string | null;
  display_order: number;
  is_active: boolean;
  items: MenuItem[];  // joined on fetch
}