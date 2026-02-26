import { ChefHat, Heart, Coffee } from "lucide-react";

export default function About() {
  return (
    <section className="py-20 px-6 bg-cream min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-medium mb-4">Our Story</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Serving smiles and sizzling plates to the community.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="card-artisanal p-8 md:p-12 bg-sand flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-serif font-medium text-amber-hover border-b-2 border-charcoal/20 pb-4 inline-block">
              Welcome to Nikhil's Kitchen
            </h3>
            <p className="text-lg leading-relaxed opacity-90">
              What started as a simple passion for great food has blossomed into your favorite neighborhood spot. At Nikhil's Kitchen, we believe that food is more than just fuel—it's an experience, a comfort, and a way to bring people together.
            </p>
            <p className="text-lg leading-relaxed opacity-90">
              From our signature sizzling Pav Bhaji to our handcrafted coffees and shakes, every item on our menu is prepared with love, using only the freshest ingredients. Whether you're grabbing a quick bite or relaxing with friends, you're always family here.
            </p>
          </div>
          
          {/* Image */}
          <div className="flex-1 w-full">
            <div className="relative w-full aspect-[4/3] rounded-2xl border-2 border-charcoal overflow-hidden shadow-hard">
              <img 
                src="/hero2.jpeg" 
                alt="Delicious food spread" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Value Propositions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <ChefHat size={32} />, title: "Expert Chefs", desc: "Mastering the art of street food and cafe classics." },
            { icon: <Heart size={32} />, title: "Made with Love", desc: "Every dish is crafted to feel like a warm, delicious hug." },
            { icon: <Coffee size={32} />, title: "Fresh Ingredients", desc: "Quality you can taste in every single bite and sip." },
          ].map((item, i) => (
            <div key={i} className="card-artisanal p-6 flex flex-col items-center text-center bg-sand hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-amber border-2 border-charcoal rounded-full flex items-center justify-center shadow-hard-sm mb-4 text-charcoal">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold mb-2">{item.title}</h4>
              <p className="opacity-80">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}