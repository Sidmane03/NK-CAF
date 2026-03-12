import { useState, useEffect, useCallback } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/icons/logo.svg";

// Pure function — outside the component so it's never recreated on re-renders
const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-amber" : "text-charcoal hover:text-amber transition-colors duration-200";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Stable reference — no need to rebuild the handler on re-renders
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Scroll to a hash target, navigating home first if needed
  const scrollToHash = useCallback(
    (hash: string) => {
      closeMobile();

      const scrollToEl = () => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      };

      if (location.pathname === "/") {
        // Already on home — just scroll
        scrollToEl();
      } else {
        // Navigate to home, then scroll after the page renders
        navigate("/");
        // Wait for the next paint so the DOM has the target element
        requestAnimationFrame(() => {
          requestAnimationFrame(scrollToEl);
        });
      }
    },
    [closeMobile, location.pathname, navigate],
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    // passive: true — browser can scroll without waiting on JS, improves scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-charcoal/20 backdrop-blur-md bg-sand/95 transition-all duration-300 ${
        scrolled ? "py-3 shadow-sm" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Nikhil's Kitchen"
            width={40}
            height={40}
            className={`transition-all duration-300 ${scrolled ? "h-8" : "h-10"}`}
          />
          <span className="font-serif text-xl md:text-2xl tracking-tight">Nikhil's Kitchen</span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/#home" className="text-charcoal hover:text-amber transition-colors duration-200">Home</Link>
          <NavLink to="/menu" className={navLinkStyles}>Menu</NavLink>
          <button
            type="button"
            onClick={() => scrollToHash("testimonials")}
            className="text-charcoal hover:text-amber transition-colors duration-200 cursor-pointer"
          >
            Testimonials
          </button>
          <NavLink to="/contact" className={navLinkStyles}>Contact</NavLink>
          <NavLink to="/order" className="btn-artisanal rounded-full px-6 py-2">Order Now</NavLink>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-md focus-visible:outline-2 focus-visible:outline-amber"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        className={`md:hidden overflow-hidden transition-all duration-300 bg-sand/95 border-b border-charcoal/20 ${
          mobileOpen ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0 mb-0 border-transparent"
        }`}
      >
        <div className="px-6 pb-6 flex flex-col gap-6 text-sm font-medium">
          <Link to="/#home" onClick={closeMobile} className="text-charcoal hover:text-amber transition-colors duration-200">Home</Link>
          <NavLink to="/menu" onClick={closeMobile} className={navLinkStyles}>Menu</NavLink>
          <button
            type="button"
            onClick={() => scrollToHash("testimonials")}
            className="text-charcoal hover:text-amber transition-colors duration-200 cursor-pointer text-left text-sm font-medium"
          >
            Testimonials
          </button>
          <NavLink to="/contact" onClick={closeMobile} className={navLinkStyles}>Contact</NavLink>
          <NavLink to="/order" onClick={closeMobile} className="btn-artisanal mt-2 px-5 py-2 w-full text-center">Order Online</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

