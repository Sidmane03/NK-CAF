import { MapPin, Clock, Phone, ExternalLink } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ContactInfoBlock from '../components/ContactInfoBlock';

export default function Contact() {
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.4688662437698!2d73.7562064!3d18.6429446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b98295527b1d%3A0x6205cf7a13870c80!2sNikhil&#39;s%20Kitchen%20Pav%20Bhaji%20%26%20Cafe!5e0!3m2!1sen!2sin!4v1772827324332!5m2!1sen!2sin";
  const googleMapsUrl = "https://www.google.com/maps/place/Nikhil's+Kitchen+Pav+Bhaji+%26+Cafe/@18.6429446,73.7562064,17z/data=!4m6!3m5!1s0x3bc2b98295527b1d:0x6205cf7a13870c80!8m2!3d18.6429446!4d73.7562064!16s%2Fg%2F11y3lypzkv?entry=ttu";

  return (
    <section className="relative py-20 px-6 bg-cream min-h-screen overflow-hidden">
      {/* Background Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23302D2A' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3C/g%3E%3C/svg%3E")` }}
        aria-hidden="true"
      ></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader
          title="Contact & Visit Us"
          subtitle="Drop by to enjoy our cozy ambiance and delicious food. We can't wait to host you!"
        />

        <div className="card-artisanal p-8 md:p-12 bg-sand/50 backdrop-blur-sm flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8">
            <div className="space-y-6">

              {/* Location Block */}
              <ContactInfoBlock icon={<MapPin className="w-6 h-6 text-charcoal" />} title="Location">
                <p className="opacity-80 leading-relaxed mb-4">
                  LA CASITA, Survey No. 32 A, LC,<br />
                  1/1, Shop No. 19, Sector 29, Ravet,<br />
                  Pune, Maharashtra 412101
                </p>
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold text-amber hover:text-amber-hover transition-colors group"
                >
                  Get Directions
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </ContactInfoBlock>

              {/* Opening Hours Block */}
              <ContactInfoBlock icon={<Clock className="w-6 h-6 text-charcoal" />} title="Opening Hours">
                <div className="space-y-2 opacity-80 max-w-xs">
                  <div className="flex justify-between">
                    <span>Monday – Sunday</span>
                    <span className="font-medium">9:00 AM – 10:30 PM</span>
                  </div>
                </div>
              </ContactInfoBlock>

              {/* Phone Block */}
              <ContactInfoBlock icon={<Phone className="w-6 h-6 text-charcoal" />} title="Phone">
                <p className="opacity-80 leading-relaxed text-xl">
                  <a href="tel:+917499059843" className="hover:text-amber transition-colors font-serif italic">
                    +91 74990 59843
                  </a>
                </p>
              </ContactInfoBlock>

            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 w-full">
            <div className="relative w-full aspect-square max-w-sm mx-auto group">
              {/* Background circular highlight */}
              <div className="absolute inset-0 bg-muted-teal/30 rounded-full border-2 border-charcoal/20 transition-transform duration-500 group-hover:scale-105" aria-hidden="true"></div>
              
              {/* Main Circular Map Container */}
              <div className="relative bg-cream rounded-full border-2 border-charcoal overflow-hidden w-full h-full shadow-hard transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-hard-lg">
                {/* Note: allow-scripts + allow-same-origin are both required for Google Maps interactivity;
                    allow-popups enables "View on Google Maps" / directions links to open in a new tab. */}
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1) brightness(0.95)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  title="Nikhil's Kitchen Google Maps Location"
                  className="w-full h-full"
                ></iframe>
              </div>
              
              {/* Floating Map Label */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-charcoal text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-2 border-cream shadow-hard-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Location
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}