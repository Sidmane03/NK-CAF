import { Info, MessageCircle } from 'lucide-react';

interface BulkOrderItem {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

const bulkOrderItems: BulkOrderItem[] = [
  {
    id: 'pav-bhaji',
    title: 'PAV BHAJI',
    description: 'Our signature buttery pav bhaji served in party-sized portions. Includes extra pav, onions, and lemon slices.',
    price: 'Starts at ₹1,500 (Serves 10-15)',
    image: '/pav_bhaji_bulk_1772195224638.png'
  },
  {
    id: 'pulao',
    title: 'PULAO',
    description: 'Fragrant and spicy Tawa Pulao loaded with fresh seasonal vegetables and authentic spices.',
    price: 'Starts at ₹1,200 (Serves 10-15)',
    image: '/tawa_pulao_bulk_1772195241250.png'
  },
  {
    id: 'sandwich',
    title: 'SANDWICH',
    description: 'A grand platter of our best-selling Grilled Sandwiches, perfectly sliced for easy serving.',
    price: 'Starts at ₹1,800 (Platter of 20)',
    image: '/sandwich_platter_bulk_1772195257448.png'
  }
];

export default function Bulkorder() {
  const whatsappNumber = "+917499059843";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi Nikhil's Kitchen, I'm interested in placing a bulk order.`;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-charcoal bg-sand font-bold text-sm shadow-hard-sm mb-6 animate-fade-in">
            <Info className="w-4 h-4 text-amber" />
            Perfect for Parties & Events
          </div>
          <h1 className="text-5xl md:text-8xl font-serif font-medium leading-tight mb-6">
            Bulk Order – <span className="text-amber">Nikhil’s Kitchen</span>
          </h1>
          <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
            Make your celebrations memorable with the authentic flavors of Nikhil’s Kitchen. 
            From corporate lunches to family gatherings, we cater to all your needs with love and care.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sand/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Grid Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {bulkOrderItems.map((item) => (
              <div key={item.id} className="card-artisanal overflow-hidden flex flex-col group">
                <div className="relative h-64 overflow-hidden border-b-2 border-charcoal">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-amber border-2 border-charcoal px-3 py-1 font-bold text-sm shadow-hard-sm">
                    {item.price.split(' ')[0]}
                  </div>
                </div>
                <div className="p-8 flex flex-col grow">
                  <h3 className="text-3xl font-serif font-medium mb-3">{item.title}</h3>
                  <p className="text-charcoal/70 leading-relaxed mb-6 grow italic">
                    "{item.description}"
                  </p>
                  <div className="pt-4 border-t-2 border-dotted border-charcoal/20 flex justify-between items-center">
                    <span className="font-bold text-lg">{item.price}</span>
                    <div className="w-10 h-10 rounded-full border-2 border-charcoal flex items-center justify-center bg-sand hover:bg-amber transition-colors cursor-pointer shadow-hard-sm">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer/Contact Section */}
      <section className="py-20 px-6 bg-sand border-t-2 border-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-medium mb-8">Ready to Host?</h2>
          <div className="card-artisanal p-10 bg-cream">
            <p className="text-xl mb-8 leading-relaxed">
              We require at least 24 hours notice for bulk orders to ensure everything is prepared fresh and perfectly for your event.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-artisanal rounded-xl px-8 py-4 text-lg font-bold w-full md:w-auto"
              >
                Chat on WhatsApp
              </a>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-sm opacity-60 uppercase tracking-widest font-bold">Call us directly</span>
                <span className="text-2xl font-serif font-medium text-amber-hover">+91 74990 59843</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp FAB for Mobile */}
      <a 
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 md:hidden bg-amber text-charcoal p-4 rounded-full border-2 border-charcoal shadow-hard hover:shadow-hard-lg transition-all active:translate-y-1 active:shadow-none"
      >
        <MessageCircle className="w-8 h-8" />
      </a>
    </div>
  );
}