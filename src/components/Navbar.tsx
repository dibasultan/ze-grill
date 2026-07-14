import React from 'react';
import { ShoppingBag, Calendar, Compass, ClipboardList, MapPin, Menu, X, Clock } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartCount: number;
  openCart: () => void;
  activeOrdersCount: number;
}

export default function Navbar({
  activeSection,
  setActiveSection,
  cartCount,
  openCart,
  activeOrdersCount
}: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'menu', label: 'Menu & Order', icon: Compass },
    { id: 'reserve', label: 'Reserve Table', icon: Calendar },
    { id: 'tracking', label: 'Order Tracker', icon: ClipboardList, badge: activeOrdersCount > 0 ? activeOrdersCount : undefined }
  ];

  return (
    <nav className="sticky top-0 z-40 bg-brand-cream/95 backdrop-blur-md border-b border-brand-beige shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('home')}>
            <div className="w-11 h-11 rounded-xl bg-brand-amber flex items-center justify-center shadow-md shadow-brand-amber/20">
              <span className="font-serif text-2xl font-bold text-brand-cream">Zē</span>
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-brand-brown-dark tracking-wide">
                ZēGrill
              </h1>
              <div className="flex items-center text-[10px] text-brand-brown/80 font-mono gap-1">
                <MapPin className="w-3 h-3 text-brand-amber" />
                <span>Phase 6 DHA, Lahore</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 py-2 px-1 text-sm font-medium border-b-2 transition-all duration-200 relative ${
                    isActive
                      ? 'border-brand-amber text-brand-amber'
                      : 'border-transparent text-brand-brown-dark/70 hover:text-brand-amber'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="absolute -top-1 -right-4 px-1.5 py-0.5 text-[9px] font-bold bg-brand-amber text-white rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action buttons (Cart, Hours) */}
          <div className="flex items-center gap-3">
            {/* Hours Info Indicator (Desktop Only) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-beige/50 text-xs text-brand-brown font-medium">
              <Clock className="w-3.5 h-3.5 text-brand-amber" />
              <span>Open: 12:00 PM - 01:00 AM</span>
            </div>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-xl bg-brand-beige hover:bg-brand-brown-light text-brand-brown-dark transition-all duration-200 flex items-center justify-center group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-amber text-[10px] font-bold text-white ring-2 ring-brand-cream animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-xl text-brand-brown-dark hover:bg-brand-beige"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-cream border-t border-brand-beige py-3 px-4 space-y-2 shadow-inner">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-beige text-brand-amber font-semibold'
                    : 'text-brand-brown-dark/80 hover:bg-brand-beige/50'
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-brand-amber text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="flex items-center gap-2 px-4 py-3 text-xs text-brand-brown font-medium border-t border-brand-beige pt-4">
            <Clock className="w-4 h-4 text-brand-amber" />
            <span>Open: 12:00 PM - 01:00 AM</span>
          </div>
        </div>
      )}
    </nav>
  );
}
