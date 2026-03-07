import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  text: string;
  rating: number;
}

export default function TestimonialCard({ name, text, rating }: TestimonialCardProps) {
  return (
    <div className="bg-sand p-8 rounded-2xl border-2 border-charcoal shadow-hard hover:shadow-hard-lg transition-all duration-300">
      <div className="flex gap-1 mb-4" role="img" aria-label={`${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'fill-amber text-amber' : 'text-charcoal/20'}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="text-lg leading-relaxed mb-6 italic text-charcoal/80">
        "{text}"
      </p>
      <div className="font-bold text-sm tracking-widest uppercase border-t-2 border-charcoal/10 pt-4">
        — {name}
      </div>
    </div>
  );
}
