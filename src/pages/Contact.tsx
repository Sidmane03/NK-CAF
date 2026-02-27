import { MapPin, Clock, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-20 px-6 bg-cream min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* Added a page header to match the Menu page styling */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-medium mb-4">Contact & Visit Us</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Drop by to enjoy our cozy ambiance and delicious food. We can't wait to host you!
          </p>
        </div>

        <div className="card-artisanal p-8 md:p-12 bg-sand flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8">
            <div className="space-y-6">
              
              {/* Location Block */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber border-2 border-charcoal shadow-hard-sm flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-6 h-6 text-charcoal" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">Location</h4>
                  <p className="opacity-80 leading-relaxed">
                    LA CASITA, Survey No. 32 A, LC,<br />
                    1/1, Shop No. 19, Sector 29, Ravet,<br />
                    Pune, Maharashtra 412101
                  </p>
                </div>
              </div>

              {/* Opening Hours Block */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber border-2 border-charcoal shadow-hard-sm flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-6 h-6 text-charcoal" />
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-xl mb-2">Opening Hours</h4>
                  <div className="space-y-2 opacity-80 w-full max-w-xs">
                    <div className="flex justify-between border-b border-charcoal/20 pb-1">
                      <span>Monday - Sunday</span>
                      <span className="font-medium">9:00 AM - 10:30 PM</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span>Wednesday</span>
                      <span className="font-medium">9:00 AM - 10:30 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Block (Added for the Contact page context) */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber border-2 border-charcoal shadow-hard-sm flex items-center justify-center shrink-0 mt-1">
                  <Phone className="w-6 h-6 text-charcoal" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">Phone</h4>
                  <p className="opacity-80 leading-relaxed">
                    <a href="tel:+917499059843" className="hover:text-amber transition-colors">
                      +91 74990 59843
                    </a>
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Decorative Map/Image Area */}
          <div className="flex-1 w-full">
            <div className="relative w-full aspect-square max-w-sm mx-auto">
              <div className="absolute inset-0 bg-muted-teal rounded-full border-2 border-charcoal translate-x-4 translate-y-4"></div>
              <div className="relative bg-cream rounded-full border-2 border-charcoal overflow-hidden w-full h-full shadow-hard flex items-center justify-center">
                {/* Absolute path applied to the image */}
                <img 
                  src="/hero4.avif" 
                  alt="Cafe Exterior" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}