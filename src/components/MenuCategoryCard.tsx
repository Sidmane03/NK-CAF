import type { MenuCategory } from '../data/menudata';

interface MenuCategoryCardProps {
  category: MenuCategory;
}

export default function MenuCategoryCard({ category }: MenuCategoryCardProps) {
  return (
    <div className="card-artisanal overflow-hidden flex flex-col group bg-cream">
      {category.image && (
        <div className="h-56 w-full border-b-2 border-charcoal overflow-hidden relative bg-charcoal shrink-0">
          <img
            src={category.image}
            alt={`${category.category} dishes`}
            loading="lazy"
            className={`w-full h-full transition-transform duration-700 group-hover:scale-110`}
            style={{ 
              objectFit: category.imageFit || 'cover',
              objectPosition: category.imagePosition || 'center'
            }}
            onError={(e) => {
              const parent = e.currentTarget.parentElement;
              if (parent) parent.style.display = 'none';
            }}
          />
          {/* Subtle overlay for better text contrast if needed */}
          <div className="absolute inset-0 bg-linear-to-t from-charcoal/20 to-transparent pointer-events-none" />
        </div>
      )}

      <div className="p-6 flex flex-col grow">
        <h3 className="text-2xl font-serif font-medium mb-6 pb-4 border-b-2 border-charcoal/20 text-amber-hover">
          {category.category}
        </h3>

        <ul className="space-y-6 grow" role="list">
          {category.items.map((item) => (
            <li key={item.name} className="flex items-center gap-4 group/item">
              <div className="grow flex flex-col justify-center min-w-0">
                <div className="flex justify-between items-end gap-2">
                  <span className="font-medium text-lg leading-tight text-charcoal group-hover/item:text-amber-hover transition-colors">
                    {item.name}
                  </span>
                  <div 
                    className="grow border-b-2 border-dotted border-charcoal/20 mb-1.5" 
                    aria-hidden="true"
                  ></div>
                  <span className="font-bold text-lg text-charcoal/90 whitespace-nowrap">
                    ₹{item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
