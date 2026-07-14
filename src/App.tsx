import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import ReservationSection from './components/ReservationSection';
import CartDrawer from './components/CartDrawer';
import TrackingDashboard from './components/TrackingDashboard';
import { CartItem, Order, Reservation, OrderStatus } from './types';
import { Flame, ShieldCheck, Heart, MapPin, Phone, Star } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeSection, setActiveSection] = React.useState<string>('home');
  const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);

  // Core App State (Hydrated from LocalStorage)
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [activeReservation, setActiveReservation] = React.useState<Reservation | null>(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Load from LocalStorage on Mount
  React.useEffect(() => {
    try {
      const storedCart = localStorage.getItem('zegrill_cart');
      if (storedCart) setCartItems(JSON.parse(storedCart));

      const storedOrders = localStorage.getItem('zegrill_orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedRes = localStorage.getItem('zegrill_reservation');
      if (storedRes) setActiveReservation(JSON.parse(storedRes));
    } catch (e) {
      console.error('Failed to load localStorage data', e);
    }
  }, []);

  // Save to LocalStorage on updates
  React.useEffect(() => {
    localStorage.setItem('zegrill_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  React.useEffect(() => {
    localStorage.setItem('zegrill_orders', JSON.stringify(orders));
  }, [orders]);

  React.useEffect(() => {
    if (activeReservation) {
      localStorage.setItem('zegrill_reservation', JSON.stringify(activeReservation));
    } else {
      localStorage.removeItem('zegrill_reservation');
    }
  }, [activeReservation]);

  // Helper: Trigger Temporary Toast Message
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // State Handlers
  const handleAddToCart = (newItem: CartItem) => {
    // Check if item with exact specifications (ID and Spice level) exists in cart
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.menuItem.id === newItem.menuItem.id &&
        item.selectedSpiceLevel === newItem.selectedSpiceLevel
    );

    if (existingIndex > -1) {
      // Update quantity
      const updated = [...cartItems];
      updated[existingIndex].quantity += newItem.quantity;
      if (newItem.customInstructions) {
        // Append or replace instructions
        updated[existingIndex].customInstructions = newItem.customInstructions;
      }
      setCartItems(updated);
    } else {
      // Append new item
      setCartItems([...cartItems, newItem]);
    }

    triggerToast(`Added ${newItem.quantity}x ${newItem.menuItem.name} to your cart!`);
  };

  const handleUpdateCartQuantity = (index: number, delta: number) => {
    const updated = [...cartItems];
    updated[index].quantity += delta;

    if (updated[index].quantity <= 0) {
      // Remove item
      updated.splice(index, 1);
    }
    setCartItems(updated);
  };

  const handleRemoveCartItem = (index: number) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  const handlePlaceOrder = (newOrder: Order) => {
    // Append order to active list
    setOrders([newOrder, ...orders]);
    // Empty basket
    setCartItems([]);
    // Close sidebar
    setIsCartOpen(false);
    // Move view to order tracker dashboard
    setActiveSection('tracking');
    triggerToast('Order placed successfully! Track its progress live below.');
  };

  const handleAddReservation = (newRes: Reservation) => {
    setActiveReservation(newRes);
    triggerToast(`Table Reservation successfully confirmed for Table #${newRes.tableNumber}!`);
  };

  const handleCancelReservation = () => {
    if (confirm('Are you sure you want to cancel your table reservation at ZēGrill?')) {
      setActiveReservation(null);
      triggerToast('Table reservation cancelled.');
    }
  };

  const handleUpdateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    setOrders(
      orders.map((o) => {
        if (o.id === orderId) {
          // Progress ETA minutes alongside status
          let newEta = o.etaMinutes;
          if (nextStatus === 'preparing') newEta = 15;
          if (nextStatus === 'ready-pickup' || nextStatus === 'out-for-delivery') newEta = 5;
          if (nextStatus === 'completed') newEta = 0;

          return { ...o, status: nextStatus, etaMinutes: newEta };
        }
        return o;
      })
    );
  };

  const handleClearOrderHistory = () => {
    if (confirm('Are you sure you want to clear your order history in this session?')) {
      setOrders([]);
      localStorage.removeItem('zegrill_orders');
      triggerToast('Order history cleared.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-brand-brown-dark font-sans relative antialiased selection:bg-brand-amber/15 selection:text-brand-amber">
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-brand-brown-dark text-brand-cream border border-brand-beige px-5 py-3 rounded-xl shadow-lg font-medium text-xs sm:text-sm animate-in fade-in slide-in-from-top duration-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-amber animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Header */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
        activeOrdersCount={orders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled').length}
      />

      {/* Main Content Area Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeSection === 'home' && (
          <Hero
            onOrderClick={() => setActiveSection('menu')}
            onReserveClick={() => setActiveSection('reserve')}
            onTrackerClick={() => setActiveSection('tracking')}
          />
        )}

        {activeSection === 'menu' && (
          <MenuSection onAddToCart={handleAddToCart} />
        )}

        {activeSection === 'reserve' && (
          <ReservationSection
            onAddReservation={handleAddReservation}
            activeReservation={activeReservation}
            onCancelReservation={handleCancelReservation}
          />
        )}

        {activeSection === 'tracking' && (
          <TrackingDashboard
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onClearHistory={handleClearOrderHistory}
          />
        )}
      </main>

      {/* Global Shopping Basket Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onPlaceOrder={handlePlaceOrder}
        activeTableReservationNumber={activeReservation ? activeReservation.tableNumber : null}
      />

      {/* Aesthetic Warm Footer */}
      <footer className="bg-brand-beige/40 border-t border-brand-beige py-12 mt-auto text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Footer Left Identity */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-brand-amber flex items-center justify-center font-serif text-lg font-bold text-brand-cream shadow-sm">
                  Zē
                </div>
                <h2 className="font-serif text-lg font-bold text-brand-brown-dark">ZēGrill Phase 6</h2>
              </div>
              <p className="text-xs text-brand-brown leading-relaxed max-w-sm">
                Authentic wood-coal BBQ and rich Lahori breakfast platters, prepared under pristine hygienic conditions. Proudly serving families in Sector H DHA Phase 6, Lahore.
              </p>
              
              <div className="flex text-amber-500 items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
                <span className="text-xs text-brand-brown-dark font-bold ml-1">4.7 Rating (51 Google Reviews)</span>
              </div>
            </div>

            {/* Footer Middle Links */}
            <div className="md:col-span-4 space-y-4">
              <h3 className="font-serif text-sm font-bold text-brand-brown-dark uppercase tracking-widest">
                Our Services
              </h3>
              <ul className="space-y-2 text-xs text-brand-brown">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Family Dine-In & AC Hall
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Rooftop Open-Air BBQ Seating
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Fast Drive-Thru / Curbside Delivery
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Home Delivery in DHA Phase 6 Wards
                </li>
              </ul>
            </div>

            {/* Footer Right Location */}
            <div className="md:col-span-4 space-y-4">
              <h3 className="font-serif text-sm font-bold text-brand-brown-dark uppercase tracking-widest">
                Visit or Call
              </h3>
              <p className="text-xs text-brand-brown leading-relaxed flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-brand-amber shrink-0" />
                <span>H, 294 MB Street 11, Sector H DHA Phase 6, Lahore, Pakistan</span>
              </p>
              <p className="text-xs text-brand-brown flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-brand-amber" />
                <span>+92 42 35746201</span>
              </p>
              <p className="text-[10px] text-brand-brown/60">
                Opening Hours: 12:00 PM - 01:00 AM (Daily)
              </p>
            </div>
          </div>

          <div className="border-t border-brand-beige/70 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-brand-brown/60 font-mono">
            <p>© 2026 ZēGrill DHA Phase 6 Lahore. All rights reserved.</p>
            <div className="flex items-center gap-1">
              <span>Made with care & passion for fine dining</span>
              <Heart className="w-3 h-3 text-brand-amber fill-brand-amber" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
