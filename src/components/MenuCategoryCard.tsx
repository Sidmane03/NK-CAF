import type { MenuCategory } from '../types/menu';
import { categoryImages } from '../lib/categoryImages';

interface MenuCategoryCardProps {
  category: MenuCategory;
}

export default function MenuCategoryCard({ category }: MenuCategoryCardProps) {
  const displayImage = category.image_url || categoryImages[category.name];

  return (
    <div className="card-artisanal overflow-hidden flex flex-col group bg-cream h-[580px]">
      {displayImage && (
        <div className="h-48 w-full border-b-2 border-charcoal overflow-hidden relative bg-charcoal shrink-0">
          <img
            src={displayImage}
            alt={`${category.name} dishes`}
            loading="lazy"
            className="w-full h-full transition-transform duration-700 group-hover:scale-110"
            style={{
              objectFit: category.image_fit || 'cover',
              objectPosition: category.image_position || 'center',
            }}
            onError={(e) => {
              const parent = e.currentTarget.parentElement;
              if (parent) parent.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-charcoal/20 to-transparent pointer-events-none" />
        </div>
      )}

      <div className="p-6 flex flex-col grow min-h-0">
        <h3 className="text-2xl font-serif font-medium mb-4 pb-3 border-b-2 border-charcoal/20 text-amber-hover shrink-0">
          {category.name}
        </h3>

        <div className="relative grow min-h-0">
          <ul className="space-y-5 overflow-y-auto h-full pr-2 menu-scrollbar" role="list">
            {category.items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 group/item">
                <div className="grow flex flex-col justify-center min-w-0">
                  <div className="flex justify-between items-end gap-2">
                    <span className="font-medium text-lg leading-tight text-charcoal group-hover/item:text-amber-hover transition-colors">
                      {item.name}
                    </span>
                    <div
                      className="grow border-b-2 border-dotted border-charcoal/20 mb-1.5"
                      aria-hidden="true"
                    ></div>

                    {/* Price — with optional discount */}
                    {item.discounted_price != null ? (
                      <span className="whitespace-nowrap flex items-baseline gap-1.5">
                        <span className="text-sm text-charcoal/40 line-through">
                          ₹{item.price.toFixed(2)}
                        </span>
                        <span className="font-bold text-lg text-amber">
                          ₹{item.discounted_price.toFixed(2)}
                        </span>
                      </span>
                    ) : (
                      <span className="font-bold text-lg text-charcoal/90 whitespace-nowrap">
                        ₹{item.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
