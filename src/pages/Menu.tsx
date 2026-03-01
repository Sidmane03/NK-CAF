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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuData.map((category) => (
            <div key={category.category} className="card-artisanal overflow-hidden flex flex-col group bg-cream">

              <div className="h-48 w-full border-b-2 border-charcoal overflow-hidden relative bg-sand shrink-0">
                <img
                  src={category.image}
                  alt={category.category}
                  className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const parent = e.currentTarget.parentElement;
                    if (parent) parent.style.display = 'none';
                  }}
                />
              </div>

              <div className="p-6 flex flex-col grow">
                <h3 className="text-2xl font-serif font-medium mb-6 pb-4 border-b-2 border-charcoal/20 text-amber-hover">
                  {category.category}
                </h3>

                <ul className="space-y-4 grow">
                  {category.items.map((item) => (
                    <li key={item.name} className="flex justify-between items-center gap-4">
                      <span className="font-medium text-lg leading-tight">{item.name}</span>
                      <div className="grow border-b-2 border-dotted border-charcoal/30" aria-hidden="true"></div>
                      <span className="font-bold whitespace-nowrap">₹ {item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}