import { useState, useEffect } from 'react';

import hero2 from "../assets/images/hero2.avif";
import hero4 from "../assets/images/hero4.avif";
import ch from "../assets/images/ch.jpg";

const heroItems = [
  {
    image: hero2,
    alt: "Delicious Food at Nikhil's Kitchen",
    badgeIcon: "🔥",
    badgeTitle: "Hot & Fresh",
    badgeSubtitle: "Served daily"
  },
  {
    image: hero4,
    alt: "Refreshing Beverages",
    badgeIcon: "❄️",
    badgeTitle: "Cool Drinks",
    badgeSubtitle: "Made to order"
  },
  {
    image: ch,
    alt: "Cafe Interior",
    badgeIcon: "✨",
    badgeTitle: "Cozy Vibe",
    badgeSubtitle: "Your new hangout"
  }
];

export default function HeroImageTransition() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState(-1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        setExitingIndex(prev);
        return (prev + 1) % heroItems.length;
      });
    }, 5000); 
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-md mx-auto lg:ml-auto w-full mt-8 lg:mt-0 aspect-4/5 pr-6 pb-6">
      
      {/* Cards Container */}
      <div className="relative w-full h-full">
        {heroItems.map((item, index) => {
          let stateClass = "hero-card-hidden";
          
          if (index === currentIndex) {
            stateClass = "hero-card-top";
          } else if (index === (currentIndex + 1) % heroItems.length) {
            stateClass = "hero-card-bottom";
          } else if (index === exitingIndex) {
            stateClass = "hero-card-exit";
          }

          return (
            <img
              key={index}
              src={item.image}
              alt={item.alt}
              className={`hero-card-base ${stateClass}`}
            />
          );
        })}
      </div>

      {/* Floating Element - High Z-index to avoid blocking */}
      <div className="absolute bottom-0 left-0 z-40 w-52 bg-cream border-2 border-charcoal p-4 rounded-xl shadow-hard overflow-hidden h-20 -translate-x-6 translate-y-0">
        <div className="relative w-full h-full">
            {heroItems.map((item, index) => (
                <div 
                    key={`badge-${index}`}
                    className={`absolute inset-0 flex items-center gap-4 hero-transition-smooth w-full ${
                        index === currentIndex 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-12'
                    }`}
                >
                    <div className="w-12 h-12 bg-sand rounded-full border-2 border-charcoal flex items-center justify-center text-2xl shrink-0">
                        {item.badgeIcon}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <div className="font-bold truncate leading-tight">{item.badgeTitle}</div>
                        <div className="text-sm opacity-80 truncate">{item.badgeSubtitle}</div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
