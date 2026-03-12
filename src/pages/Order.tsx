import { ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ZomatoIcon, SwiggyIcon } from '../components/Icons';

export default function Order() {
  return (
    <section className="py-20 px-6 bg-cream min-h-[85vh] flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl md:text-7xl font-serif font-medium mb-4">
          Order <span className="text-amber">Online</span>
        </h1>
        <p className="text-lg md:text-xl opacity-80 mb-12 max-w-2xl mx-auto">
          Craving our signature dishes? Choose your favorite delivery partner below and get Nikhil's Kitchen delivered hot and fresh.
        </p>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mb-16">
          <a
            href="https://www.zomato.com/pune/nikhils-kitchen-pav-bhaji-caf%C3%A9-ravet"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order Nikhil's Kitchen food on Zomato"
            className="flex-1 bg-cream border-4 border-charcoal rounded-3xl p-8 flex flex-col items-center justify-between gap-10 shadow-hard hover:shadow-hard-lg hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="h-16 w-auto text-zomato group-hover:scale-110 transition-transform duration-300 mt-4">
              <ZomatoIcon className="w-full h-full" />
            </div>
            <div className="w-full bg-zomato group-hover:bg-zomato-hover text-white border-2 border-charcoal py-4 rounded-full font-bold text-xl flex items-center justify-center gap-2 shadow-hard-sm group-hover:translate-y-1 group-hover:translate-x-1 group-hover:shadow-none transition-all duration-300">
              Order on Zomato <ExternalLink size={22} />
            </div>
          </a>

          <a
            href="https://www.swiggy.com/restaurants/nikhils-kitchen-pav-bhaji-and-cafe-akurdi-ravet-pune-377187"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order Nikhil's Kitchen food on Swiggy"
            className="flex-1 bg-cream border-4 border-charcoal rounded-3xl p-8 flex flex-col items-center justify-between gap-10 shadow-hard hover:shadow-hard-lg hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="h-16 w-auto text-swiggy group-hover:scale-110 transition-transform duration-300 mt-4">
              <SwiggyIcon className="w-full h-full" />
            </div>
            <div className="w-full bg-swiggy group-hover:bg-swiggy-hover text-white border-2 border-charcoal py-4 rounded-full font-bold text-xl flex items-center justify-center gap-2 shadow-hard-sm group-hover:translate-y-1 group-hover:translate-x-1 group-hover:shadow-none transition-all duration-300">
              Order on Swiggy <ExternalLink size={22} />
            </div>
          </a>
        </div>

        <Link to="/" className="inline-flex items-center gap-2 font-bold hover:text-amber transition-colors text-lg bg-sand px-6 py-3 border-2 border-charcoal rounded-full shadow-hard-sm hover:shadow-none hover:translate-y-1 hover:translate-x-1">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    </section>
  );
}