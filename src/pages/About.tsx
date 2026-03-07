import { Coffee, Image as ImageIcon } from 'lucide-react';
import TestimonialCard from '../components/TestimonialCard';

const testimonials = [
  {
    name: 'Aarav Sharma',
    text: "The flavors are truly artisanal and take me back home. The Masala Chai is unparalleled in the city.",
    rating: 5,
  },
  {
    name: 'Priya Patel',
    text: "A beautiful rustic vibe with the best chai in the city. The attention to detail in the spices is evident.",
    rating: 5,
  },
  {
    name: 'Ishan Verma',
    text: "Finally, a place that understands the balance of heat and flavor. The ambiance is so grounding.",
    rating: 4,
  },
];

const attributes = [
  { icon: <Coffee aria-hidden="true" />, label: 'Small Batch Coffee' },
  { icon: <span aria-hidden="true">⭐</span>, label: 'Community Favorite' },
  { label: 'Established 2021' },
];

export default function About() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-7xl font-serif font-medium text-amber">Kind Words</h2>
          <p className="text-xl md:text-2xl font-serif italic text-charcoal/60">
            Thoughts from our community
          </p>
          <div className="w-24 h-1 bg-amber mx-auto mt-4" aria-hidden="true"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} name={t.name} text={t.text} rating={t.rating} />
          ))}
        </div>

        {/* Gallery Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="text-4xl font-serif font-medium mb-2">Moments at Nikhil's</h3>
            <p className="opacity-60 text-sm tracking-widest uppercase font-bold">Snapshots of our journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group relative aspect-video md:aspect-square bg-sand/30 border-2 border-charcoal border-dashed rounded-3xl flex flex-col items-center justify-center overflow-hidden hover:bg-sand/50 transition-colors shadow-hard-sm"
              >
                <div className="w-16 h-16 rounded-full border-2 border-charcoal flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                  <ImageIcon className="opacity-20" size={32} aria-hidden="true" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-30">Cafe Frame {item}</span>

                {/* Visual Placeholder Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/5 to-transparent pointer-events-none" aria-hidden="true"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal Attributes Strip */}
        <div className="mt-32 flex flex-wrap justify-center gap-12 py-10 border-y-2 border-charcoal/10">
          {attributes.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-amber">{item.icon}</span>
              <span className="font-bold text-xs uppercase tracking-widest opacity-60 text-espresso">{item.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
