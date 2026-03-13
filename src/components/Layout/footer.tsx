
import { Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-espresso text-sand/90 py-20 px-6 border-t-2 border-charcoal">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          
          <Link to="/" className="flex items-center gap-3">
          <Logo
            className={`h-10`}
          />
            <span className="font-serif text-2xl font-bold tracking-tight">Nikhil's Kitchen</span>
          </Link>
          <p className="opacity-80 max-w-sm">
            Experience the finest street food and cafe classics crafted with love, serving our community every day.
          </p>
        </div>
        
        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-xl font-bold text-amber">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            <Link to="/" className="hover:text-amber transition-colors w-fit">Home</Link>
            <Link to="/menu" className="hover:text-amber transition-colors w-fit">Menu</Link>
            <Link to="/#testimonials" className="hover:text-amber transition-colors w-fit">Testimonials</Link>
            <Link to="/Order" className="hover:text-amber transition-colors w-fit">Order Online</Link>
          </nav>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-xl font-bold text-amber">Visit Us</h4>
          <a href="tel:+917499059843" className="opacity-90 hover:text-amber transition-colors flex items-center gap-3 w-fit">
            <Phone className="w-5 h-5" /> +91 74990 59843
          </a>
          <div className="opacity-90 flex items-start gap-3">
            <MapPin className="w-5 h-5 shrink-0 mt-1" />
            <span>LA CASITA, Survey No. 32 A, LC,<br />1/1, Shop No. 19, Sector 29, Ravet,<br />Pune, Maharashtra 412101</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-cream/20 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm opacity-80">
          &copy; {new Date().getFullYear()} Nikhil's Kitchen. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;