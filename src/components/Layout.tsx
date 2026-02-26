import { Outlet } from 'react-router';
import Navbar from './Layout/navbar'; // Adjust the import path if needed
import Footer from './Layout/footer'; // Adjust the import path if needed

export default function Layout() {
  return (
    <div className="min-h-screen bg-cream font-sans text-charcoal flex flex-col">
      <Navbar />
      {/* Main Content Area - Outlet injects the current page here */}
      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}