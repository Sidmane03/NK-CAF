import { Utensils, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Bulkorder from './Bulkorder';
import About from './About';
import Reveal from '../components/Reveal';
import HeroImageTransition from '../components/HeroImageTransition';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section id="home" className="min-h-[calc(100vh-80px)] flex items-center py-16 md:py-24 px-6 overflow-hidden relative scroll-mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <Reveal className="space-y-8 z-10" threshold={0.05}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-charcoal bg-cream font-bold text-sm shadow-hard-sm">
              <Utensils className="w-4 h-4 text-amber" />
              Welcome to Nikhil's Kitchen
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-medium leading-[1.1]">
              The Flavours That Bring You <span className="text-amber">Home</span>
            </h1>
            <p className="text-lg md:text-xl text-espresso/80 leading-relaxed max-w-lg">
              From sizzling Pav Bhaji to refreshing Mojitos, experience the finest street food and cafe classics crafted with love.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#bulkorder" className="btn-artisanal rounded-full px-8 py-4 text-lg bg-cream hover:bg-sand inline-flex items-center gap-2">
                Bulk Order <ShoppingBag className="w-5 h-5" />
              </a>
              <Link to="/menu" className="btn-artisanal rounded-full px-8 py-4 text-lg bg-cream hover:bg-sand inline-flex items-center gap-2">
                View Menu <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </Reveal>

          {/* Decorative Image Frame */}
          <Reveal className="h-full flex items-center justify-center w-full" threshold={0.05}>
            <HeroImageTransition />
          </Reveal>
        </div>
      </section>

      {/* Bulk Order Section */}
      <section id="bulkorder" className="relative group overflow-hidden pt-24 md:pt-32 scroll-mt-24">
        {/* Slow Reveal Transition Div */}
        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-cream to-transparent z-10 pointer-events-none" aria-hidden="true" />
        <Reveal threshold={0.15}>
          <Bulkorder />
        </Reveal>
      </section>

      {/* About Section */}
      <section id="about" className="relative pt-24 md:pt-32">
        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-cream to-transparent z-10 pointer-events-none" aria-hidden="true" />
        <Reveal threshold={0.15}>
          <About />
        </Reveal>
      </section>
    </div>
  );
}
