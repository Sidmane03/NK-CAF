import { Star, Coffee, Image as ImageIcon } from "lucide-react";

export default function About() {
  const testimonials = [
    {
      name: "Aarav Sharma",
      text: "The flavors are truly artisanal and take me back home. The Masala Chai is unparalleled in the city.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      text: "A beautiful rustic vibe with the best chai in the city. The attention to detail in the spices is evident.",
      rating: 5,
    },
    {
      name: "Ishan Verma",
      text: "Finally, a place that understands the balance of heat and flavor. The ambiance is so grounding.",
      rating: 4,
    },
  ];

  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-7xl font-serif font-medium text-amber">Kind Words</h2>
          <p className="text-xl md:text-2xl font-serif italic text-charcoal/60">
            Thoughts from our community
          </p>
          <div className="w-24 h-1 bg-amber mx-auto mt-4"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="bg-sand p-8 rounded-2xl border-2 border-charcoal shadow-hard hover:shadow-hard-lg transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, starI) => (
                  <Star 
                    key={starI} 
                    size={16} 
                    className={starI < t.rating ? "fill-amber text-amber" : "text-charcoal/20"} 
                  />
                ))}
              </div>
              <p className="text-lg leading-relaxed mb-6 italic text-charcoal/80">
                "{t.text}"
              </p>
              <div className="font-bold text-sm tracking-widest uppercase border-t-2 border-charcoal/10 pt-4">
                — {t.name}
              </div>
            </div>
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
                  <ImageIcon className="opacity-20" size={32} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-30">Cafe Frame {item}</span>
                
                {/* Visual Placeholder Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/5 to-transparent pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal Attributes Strip */}
        <div className="mt-32 flex flex-wrap justify-center gap-12 py-10 border-y-2 border-charcoal/10">
          {[
            { icon: <Coffee />, label: "Small Batch Coffee" },
            { icon: <Star />, label: "Community Favorite" },
            { label: "Established 2021" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-amber">{item.icon}</span>
              <span className="font-bold text-xs uppercase tracking-widest opacity-60 text-espresso">{item.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
