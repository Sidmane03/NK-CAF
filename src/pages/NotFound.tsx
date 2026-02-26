import { Link } from "react-router-dom";
import { Coffee, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center py-32 px-6 min-h-[70vh] text-center bg-cream">
      {/* Fun Icon Container */}
      <div className="w-24 h-24 bg-amber border-2 border-charcoal rounded-full flex items-center justify-center shadow-hard mb-8">
        <Coffee size={48} className="text-charcoal" />
      </div>
      
      <h1 className="text-6xl md:text-8xl font-serif font-bold mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-serif font-medium mb-6">Oops! Dish not found.</h2>
      
      <p className="text-lg opacity-80 max-w-md mx-auto mb-10">
        Looks like the page you're looking for isn't on our menu. It might have been moved, removed, or we just spilled coffee on the server.
      </p>
      
      <Link to="/" className="btn-artisanal rounded-full px-8 py-3 flex items-center gap-2">
        <ArrowLeft size={20} /> Back to Home
      </Link>
    </section>
  );
}