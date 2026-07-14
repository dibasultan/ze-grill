import React from 'react';
import { Star, MapPin, Clock, ShieldCheck, Heart, ArrowRight, Utensils, CalendarDays, Award } from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
  onReserveClick: () => void;
  onTrackerClick: () => void;
}

export default function Hero({ onOrderClick, onReserveClick, onTrackerClick }: HeroProps) {
  const reviews = [
    {
      author: 'Hammad Kari',
      rating: 5,
      text: 'I ordered first time but trust me the food was super good & fresh! I suggest everyone to visit this place. From now onward, ZēGrill is my go-to spot! Highly appreciated, keep it up! ❤️',
      date: 'A month ago'
    },
    {
      author: 'Hassan Danish',
      rating: 5,
      text: 'The nashta platter was delicious. The staff was very friendly and welcoming. Perfect Lahori vibes.',
      date: '6 months ago'
    },
    {
      author: 'Aftab Saahil',
      rating: 5,
      text: 'Food was excellent 👌 service is so good. Staff is very cooperative. Ambiance and family setting area was outstanding, overall superb experience.',
      date: '6 months ago'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner Grid */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-cream via-brand-beige/40 to-brand-cream py-12 lg:py-20 rounded-3xl border border-brand-beige p-6 sm:p-8 lg:p-12 shadow-sm">
        {/* Decorative background grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#18181b_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-amber/10 border border-brand-amber/20 text-brand-amber text-xs font-semibold uppercase tracking-wider font-mono">
              <Award className="w-3.5 h-3.5" />
              <span>DHA Phase 6 • Lahore's Finest BBQ & Nashta</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-brown-dark tracking-tight leading-none">
              Sizzling charcoal BBQ, <br className="hidden sm:inline" />
              <span className="text-brand-amber">crafted for family.</span>
            </h1>

            <p className="text-brand-brown-dark/70 text-base sm:text-lg max-w-xl leading-relaxed">
              ZēGrill brings you the rich heritage of authentic Lahori BBQ, luxurious cream-marinated Malai Botis, and the legendary Shahi Nashta Platter. Cooked over live charcoal coals, served in our outstanding family setting area.
            </p>

            {/* Quick Stats Banner */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-brand-brown-dark/80 pt-2">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <span className="font-bold">4.7</span>
                <span className="text-brand-brown/70">(51 reviews)</span>
              </div>
              <div className="h-4 w-px bg-brand-brown-light hidden sm:block"></div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono bg-brand-beige px-2 py-0.5 rounded text-xs font-semibold text-brand-brown-dark">
                  Rs 1,000–2,000
                </span>
                <span className="text-brand-brown/70">per person</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onOrderClick}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-brand-amber hover:bg-brand-amber-dark text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-brand-amber/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Utensils className="w-5 h-5" />
                <span>Order Online Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onReserveClick}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-transparent hover:bg-brand-beige border-2 border-brand-brown text-brand-brown-dark font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <CalendarDays className="w-5 h-5 text-brand-amber" />
                <span>Reserve a Table</span>
              </button>
            </div>

            {/* Info Badges */}
            <div className="flex flex-wrap gap-4 pt-6 text-xs text-brand-brown border-t border-brand-beige/60">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Dine-in (Family Setting Area)
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Takeout / Drive-thru
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Fast Home Delivery
              </span>
            </div>
          </div>

          {/* Hero Right Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[400px] lg:max-w-none">
              {/* Back ambient card decoration */}
              <div className="absolute -inset-2 bg-brand-beige rounded-[2.5rem] rotate-3 -z-10 shadow-lg"></div>

              {/* Main image container */}
              <div className="rounded-[2rem] overflow-hidden border-4 border-brand-cream shadow-2xl relative group aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800"
                  alt="ZēGrill Charcoal BBQ Platter"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Floating promo badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-brand-cream/90 backdrop-blur-md p-4 rounded-2xl border border-brand-beige shadow-lg">
                  <p className="text-xs font-mono font-bold text-brand-amber uppercase tracking-wider">Today's Special Deal</p>
                  <p className="font-serif text-lg font-bold text-brand-brown-dark">ZēGrill Royal BBQ Feast</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-brand-brown">Feeds 3-4 People</span>
                    <span className="font-mono text-base font-bold text-brand-amber">Rs 3,450</span>
                  </div>
                </div>
              </div>

              {/* Tiny decorative badges */}
              <div className="absolute -top-4 -right-4 bg-brand-cream px-4 py-2.5 rounded-2xl border border-brand-beige shadow-md flex items-center gap-1.5 animate-bounce">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="text-xs font-bold text-brand-brown-dark">4.7 Stars</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Details Section (Address, Hours, Phone) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand-cream border border-brand-beige p-6 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 bg-brand-beige rounded-xl text-brand-amber shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-brown-dark">Find Us</h3>
            <p className="text-sm text-brand-brown/90 mt-1 leading-relaxed">
              H, 294 MB Street 11, Sector H DHA Phase 6, Lahore, Pakistan
            </p>
            <a
              href="https://maps.google.com/?q=ZeGrill+Phase+6+DHA+Lahore"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-brand-amber hover:underline font-semibold inline-flex items-center gap-1 mt-2"
            >
              Get Directions <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="bg-brand-cream border border-brand-beige p-6 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 bg-brand-beige rounded-xl text-brand-amber shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-brown-dark">Opening Hours</h3>
            <p className="text-sm text-brand-brown/90 mt-1">
              Everyday: 12:00 PM – 1:00 AM
            </p>
            <p className="text-xs text-emerald-600 font-semibold mt-2">
              • Now Open & Serving Fresh BBQ
            </p>
          </div>
        </div>

        <div className="bg-brand-cream border border-brand-beige p-6 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 bg-brand-beige rounded-xl text-brand-amber shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-brown-dark">Contact & Ordering</h3>
            <p className="text-sm text-brand-brown/90 mt-1">
              Phone: +92 42 35746201
            </p>
            <span className="text-xs text-brand-brown-dark font-medium inline-block mt-2">
              Deliveries also available on foodpanda.pk
            </span>
          </div>
        </div>
      </section>

      {/* Recommended highlights section */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl font-bold text-brand-brown-dark">
            What Our Patrons Say
          </h2>
          <p className="text-sm text-brand-brown">
            True reviews from our valued guests on Google Maps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-brand-cream border border-brand-beige p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-serif font-bold text-brand-brown-dark text-base">{rev.author}</h4>
                  <span className="text-xs text-brand-brown/70">{rev.date}</span>
                </div>
                <div className="flex text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-brand-brown-dark/80 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>
              <div className="text-xs font-mono text-brand-brown/60 flex items-center gap-1.5 border-t border-brand-beige/55 pt-3">
                <Heart className="w-3 h-3 text-brand-amber fill-brand-amber" />
                <span>Verified Google Local Review</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
