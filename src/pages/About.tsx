import { Coffee } from 'lucide-react';



const attributes = [
  { icon: <Coffee aria-hidden="true" />, label: 'Small Batch Coffee' },
  { icon: <span aria-hidden="true">⭐</span>, label: 'Community Favorite' },
  { label: 'Established 2021' },
];

export default function About() {

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

        {/* Google Reviews Widget */}
        <div className="relative mb-20 max-w-5xl mx-auto rounded-xl overflow-hidden shadow-hard border-2 border-charcoal bg-cream min-h-[600px]">
          <iframe 
            src="https://widgets.sociablekit.com/google-reviews/iframe/25662683" 
            frameBorder="0" 
            width="100%" 
            height="1000px"
            title="Google Reviews"
            className="w-full"
          ></iframe>
        </div>

        {/* Minimal Attributes Strip */}
        <div className="flex flex-wrap justify-center gap-12 py-10 border-y-2 border-charcoal/10">
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

