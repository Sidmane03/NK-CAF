
import menuData from '../data/menudata'; 

export default function Menu() {
  return (
    <section className="py-20 px-6 bg-sand min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-medium mb-4">Our Menu</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            A diverse selection of mouth-watering dishes and refreshing beverages to satisfy every craving.
          </p>
        </div>

        {/* Dynamic Grid Rendering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuData.map((category, idx) => (
            <div key={idx} className="card-artisanal p-6 flex flex-col">
              <h3 className="text-2xl font-serif font-medium mb-6 pb-4 border-b-2 border-charcoal/20 text-amber-hover">
                {category.category}
              </h3>
              
              <ul className="space-y-4 grow">
                {category.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex justify-between items-baseline gap-4">
                    <span className="font-medium text-lg leading-tight">{item.name}</span>
                    {/* Dotted line connector */}
                    <div className="grow border-b-2 border-dotted border-charcoal/30 relative top-[-6px]" aria-hidden="true"></div>
                    <span className="font-bold whitespace-nowrap">₹ {item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}