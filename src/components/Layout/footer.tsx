
import { Phone } from 'lucide-react';

const Footer = () => {
  return (
    <div>
      <footer className="bg-charcoal text-cream py-12 px-6 border-t-4 border-amber">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber border-2 border-cream rounded-full flex items-center justify-center text-charcoal font-serif font-bold text-xl">
              N
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight">Nikhil's Kitchen</span>
          </div>
          
          <div className="flex gap-6">
            <a href="tel:+919876543210" className="hover:text-amber transition-colors flex items-center gap-2">
              <Phone className="w-5 h-5" /> +91 98765 43210
            </a>
          </div>

          <p className="text-sm opacity-60">
            &copy; {new Date().getFullYear()} Nikhil's Kitchen. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}


export default Footer;