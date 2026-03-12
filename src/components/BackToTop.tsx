import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    // passive: true — browser can scroll without waiting on JS
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 left-8 md:left-auto md:right-8 z-60
        w-12 h-12 rounded-full border-2 border-charcoal bg-amber text-charcoal
        shadow-hard transition-all duration-300
        hover:-translate-y-1 hover:shadow-hard-lg
        active:translate-y-0 active:shadow-none
        flex items-center justify-center
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
      `}
      aria-label="Back to top"
    >
      <ArrowUp size={24} aria-hidden="true" />
    </button>
  );
}
