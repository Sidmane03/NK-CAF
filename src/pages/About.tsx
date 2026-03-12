import { useState, useCallback, useEffect, type ReactNode } from 'react';
import { Coffee, ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from '../components/TestimonialCard';

const testimonials = [
  {
    name: 'AMIT KIRTI',
    text: "We ordered Pav Bhaji and Pulav in bulk for one of our family occasions based on a recommendation. We loved the Pav Bhaji's taste and every guest member has enjoyed it. Since it was a bulk order (in Kilograms), we also took quotations from another famous restaurant for the same menu and found Nikhil's Kitchen to be almost 20-30% cheaper than others. Highly recommend to anyone who likes Pav Bhaji and Pulav.",
    rating: 5,
    foodRating: 5,
    serviceRating: 5,
    atmosphereRating: 5,
    initials: 'A'
  },
  {
    name: 'ASHISH MAHAJAN',
    text: "I recently had the pleasure of trying the Pav Bhaji and Pulao, and I must say – both dishes were absolutely delicious! The bhaji was rich, buttery, and packed with bold flavors. It had the perfect balance of spice and tang, with a smooth yet chunky texture. The pulao was equally impressive – aromatic, well-cooked basmati rice with a lovely mix of vegetables and subtle spices.",
    rating: 5,
    foodRating: 5,
    serviceRating: 5,
    atmosphereRating: 5,
    initials: 'A'
  },
  {
    name: 'Aarav Sharma',
    text: "The flavors are truly artisanal and take me back home. The Masala Chai is unparalleled in the city.",
    rating: 5,
    foodRating: 5,
    serviceRating: 4,
    atmosphereRating: 5,
  },
  {
    name: 'Priya Patel',
    text: "A beautiful rustic vibe with the best chai in the city. The attention to detail in the spices is evident.",
    rating: 5,
    foodRating: 5,
    serviceRating: 5,
    atmosphereRating: 4,
  },
  {
    name: 'Ishan Verma',
    text: "Finally, a place that understands the balance of heat and flavor. The ambiance is so grounding.",
    rating: 4,
    foodRating: 4,
    serviceRating: 4,
    atmosphereRating: 5,
  },
];

interface Attribute {
  icon?: ReactNode;
  label: string;
}

const attributes: Attribute[] = [
  { icon: <Coffee aria-hidden="true" />, label: 'Small Batch Coffee' },
  { icon: <span aria-hidden="true">⭐</span>, label: 'Community Favorite' },
  { label: 'Established 2021' },
];

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="testimonials" className="py-24 px-6 bg-cream scroll-mt-24">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-7xl font-serif font-medium text-amber">Kind Words</h2>
          <p className="text-xl md:text-2xl font-serif italic text-charcoal/60">
            Thoughts from our community
          </p>
          <div className="w-24 h-1 bg-amber mx-auto mt-4" aria-hidden="true"></div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative mb-32 max-w-4xl mx-auto">
          {/* Main Card Container with Animation */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.name} className="w-full shrink-0 px-4">
                  <TestimonialCard {...t} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-8 mt-12">
            <button 
              onClick={prev}
              className="w-14 h-14 rounded-full border-2 border-charcoal bg-cream flex items-center justify-center hover:bg-amber transition-colors shadow-hard-sm active:translate-y-0.5 active:shadow-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Pagination Indicators */}
            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-3 h-3 rounded-full border-2 border-charcoal transition-all duration-300 ${
                    i === activeIndex ? 'bg-amber w-8' : 'bg-transparent'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={next}
              className="w-14 h-14 rounded-full border-2 border-charcoal bg-cream flex items-center justify-center hover:bg-amber transition-colors shadow-hard-sm active:translate-y-0.5 active:shadow-none"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Minimal Attributes Strip */}
        <div className="flex flex-wrap justify-center gap-12 py-10 border-y-2 border-charcoal/10">
          {attributes.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              {item.icon && <span className="text-amber">{item.icon}</span>}
              <span className="font-bold text-xs uppercase tracking-widest opacity-60 text-espresso">{item.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

