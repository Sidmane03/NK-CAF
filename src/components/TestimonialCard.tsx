import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  text: string;
  rating: number;
  foodRating?: number;
  serviceRating?: number;
  atmosphereRating?: number;
  initials?: string;
}

export default function TestimonialCard({ 
  name, 
  text, 
  rating, 
  foodRating = 5, 
  serviceRating = 5, 
  atmosphereRating = 5,
  initials
}: TestimonialCardProps) {
  return (
    <div className="bg-cream p-8 md:p-10 rounded-4xl border-2 border-charcoal shadow-hard hover:shadow-hard-lg transition-all duration-500 flex flex-col relative overflow-hidden group">
      {/* Decorative Background Quote */}
      <Quote className="absolute -top-4 -right-4 w-32 h-32 text-amber/5 -rotate-12 group-hover:text-amber/10 transition-colors duration-500" />
      
      {/* Header Info */}
      <div className="flex items-center gap-5 mb-8 relative z-10">
        <div className="w-16 h-16 rounded-full bg-amber border-2 border-charcoal flex items-center justify-center text-2xl font-serif font-bold text-charcoal shadow-hard-sm shrink-0">
          {initials || name.charAt(0)}
        </div>
        <div>
          <h4 className="text-2xl font-serif font-medium leading-tight">{name}</h4>
          <div className="flex gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < rating ? 'fill-amber text-amber' : 'text-charcoal/20'}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Text */}
      <div className="relative z-10 mb-8">
        <Quote className="w-8 h-8 text-amber mb-4 opacity-50" />
        <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-charcoal/90">
          {text}
        </p>
      </div>

      {/* Ratings Breakdown */}
      <div className="mt-auto pt-8 border-t-2 border-charcoal/10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-widest opacity-60">
        <div className="flex items-center gap-2">
          <span className="text-amber">✦</span> Food: {foodRating}/5
        </div>
        <div className="flex items-center gap-2">
          <span className="text-amber">✦</span> Service: {serviceRating}/5
        </div>
        <div className="flex items-center gap-2">
          <span className="text-amber">✦</span> Atmosphere: {atmosphereRating}/5
        </div>
      </div>
    </div>
  );
}
