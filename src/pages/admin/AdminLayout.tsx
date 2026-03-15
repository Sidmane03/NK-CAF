import { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { UtensilsCrossed, Tag, LogOut, Menu, X } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin');
      else setChecking(false);
    });
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center">
        <p className="text-charcoal/60 font-medium animate-pulse">Verifying session…</p>
      </div>
    );
  }

  const linkBase =
    'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors';
  const linkActive = 'bg-amber/20 text-amber';
  const linkInactive = 'text-sand/70 hover:text-sand hover:bg-sand/10';

  function handleSignOut() {
    supabase.auth.signOut().then(() => navigate('/admin'));
  }

  return (
    <div className="min-h-screen bg-sand flex">
      {/* Mobile header bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-espresso border-b border-sand/10 px-4 py-3 flex items-center justify-between">
        <span className="font-serif text-lg font-bold text-amber">NK Admin</span>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-sand/80 p-1"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-50 top-0 left-0 h-full w-64 bg-espresso text-sand
          flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}
      >
        <div className="p-6 pb-2">
          <h1 className="font-serif text-xl font-bold text-amber">NK Admin</h1>
          <p className="text-xs text-sand/40 mt-1">Nikhil's Kitchen</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <NavLink
            to="/admin/dashboard/menu"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
          >
            <UtensilsCrossed size={18} />
            Menu Manager
          </NavLink>
          <NavLink
            to="/admin/dashboard/offers"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
          >
            <Tag size={18} />
            Offers & Discounts
          </NavLink>
        </nav>

        <div className="p-4 border-t border-sand/10">
          <button
            onClick={handleSignOut}
            className={`${linkBase} text-sand/50 hover:text-red-400 hover:bg-red-400/10 w-full`}
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen overflow-y-auto pt-14 md:pt-0">
        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}