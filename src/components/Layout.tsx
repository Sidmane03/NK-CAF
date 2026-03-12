import { Outlet } from 'react-router-dom';
import Navbar from './Layout/navbar'; 
import Footer from './Layout/footer'; 
import BackToTop from './BackToTop';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
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