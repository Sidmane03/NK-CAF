import { Outlet } from 'react-router';
import Navbar from './Layout/navbar'; 
import Footer from './Layout/footer'; 
import BackToTop from './BackToTop';

export default function Layout() {
  return (
    <div className="min-h-screen bg-cream font-sans text-charcoal flex flex-col">
      <Navbar />
      {/* Main Content Area - Outlet injects the current page here */}
      <main className="grow">
        <Outlet />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}