import { Utensils, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import hero4 from "../assets/images/hero2.jpeg";

export default function Home() {
  return (
    <section id="home" className="py-16 md:py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-charcoal bg-cream font-bold text-sm shadow-hard-sm">
            <Utensils className="w-4 h-4 text-amber" />
            Welcome to Nikhil's Kitchen
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-medium leading-[1.1]">
            The Perfect Blend of <br/>
            <span className="text-amber">Taste & Comfort</span>
          </h1>
          <p className="text-lg md:text-xl opacity-80 leading-relaxed max-w-lg">
            From sizzling Pav Bhaji to refreshing Mojitos, experience the finest street food and cafe classics crafted with love.
          </p>
          
          {/* Notice how these are now <Link> components! */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/bulkorder" className="btn-artisanal rounded-full px-8 py-4 text-lg inline-flex items-center gap-2 hover:bg-amber-hover">
              Order Online <ShoppingBag className="w-5 h-5" />
            </Link>
            <Link to="/menu" className="btn-artisanal rounded-full px-8 py-4 text-lg bg-cream hover:bg-sand inline-flex items-center gap-2">
              View Menu <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Decorative Image Frame */}
        <div className="relative max-w-md mx-auto lg:ml-auto w-full mt-8 lg:mt-0">
          {/* Offset solid background */}
          <div className="absolute inset-0 bg-amber rounded-4xl border-2 border-charcoal translate-x-6 translate-y-6"></div>
          {/* Main image container */}
          <div className="relative bg-cream rounded-4xl border-2 border-charcoal overflow-hidden aspect-4/5 shadow-hard-lg">
            <img 
              src={hero4}
              alt="Delicious Food at Nikhil's Kitchen" 
              className="w-full h-full object-cover"  
            />
          </div>
          {/* Floating Element */}
          <div className="absolute -bottom-6 -left-6 bg-cream border-2 border-charcoal p-4 rounded-xl shadow-hard flex items-center gap-4">
            <div className="w-12 h-12 bg-sand rounded-full border-2 border-charcoal flex items-center justify-center text-2xl">
              🔥
            </div>
            <div>
              <div className="font-bold">Hot & Fresh</div>
              <div className="text-sm opacity-80">Served daily</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}