export interface BulkOrderItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  image: string;
}

interface BulkOrderCardProps {
  item: BulkOrderItem;
}

export default function BulkOrderCard({ item }: BulkOrderCardProps) {
  return (
    <div className="card-artisanal overflow-hidden flex flex-col group">
      <div className="relative h-64 overflow-hidden border-b-2 border-charcoal">
        <img
          src={item.image}
          alt={`${item.title} bulk order platter`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-8 flex flex-col grow">
        <h3 className="text-3xl font-serif font-medium mb-3">{item.title}</h3>
        <p className="text-charcoal/70 leading-relaxed grow italic">
          "{item.description}"
        </p>
        {item.price && (
          <p className="mt-4 font-bold text-sm uppercase tracking-widest text-amber">{item.price}</p>
        )}
      </div>
    </div>
  );
}
