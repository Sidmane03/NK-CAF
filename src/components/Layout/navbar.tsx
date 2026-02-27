import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "/src/assets/icons/logo.svg";  
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkStyles = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-amber"
      : "text-charcoal hover:text-amber transition-colors duration-200";

  return (
    <header
      className={`
        sticky top-0 z-50 border-b border-charcoal/20
        backdrop-blur-md bg-sand/95
        transition-all duration-300
        ${scrolled ? "py-3 shadow-sm" : "py-6"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Nikhil's Kitchen Logo"
            className={`transition-all duration-300 ${
              scrolled ? "h-8" : "h-10"
            }`}
          />
          <span className="font-serif text-xl md:text-2xl tracking-tight">
            Nikhil's Kitchen
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink to="/" end className={linkStyles}>
            Home
          </NavLink>
          <NavLink to="/menu" className={linkStyles}>
            Menu
          </NavLink>
          <NavLink to="/about" className={linkStyles}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkStyles}>
            Contact
          </NavLink>

          <NavLink 
            to="/bulkorder" 
            className="btn-artisanal rounded-full px-6 py-2"
          > 
            Order Now 
          </NavLink>

        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 bg-sand/95 border-b border-charcoal/20
          ${mobileOpen ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0 mb-0 border-transparent"}
        `}
      >
        <div className="px-6 pb-6 flex flex-col gap-6 text-sm font-medium">
          <NavLink to="/" end onClick={() => setMobileOpen(false)} className={linkStyles}>
            Home
          </NavLink>
          <NavLink to="/menu" onClick={() => setMobileOpen(false)} className={linkStyles}>
            Menu
          </NavLink>
          <NavLink to="/about" onClick={() => setMobileOpen(false)} className={linkStyles}>
            About
          </NavLink>
          <NavLink to="/contact" onClick={() => setMobileOpen(false)} className={linkStyles}>
            Contact
          </NavLink>

          <NavLink
            to="/bulkorder"
            onClick={() => setMobileOpen(false)}
            className="btn-artisanal mt-2 px-5 py-2 w-full text-center"
          >
            Bulk Order
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;