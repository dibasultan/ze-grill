import React from 'react';
import { X, ShoppingBag, Trash2, ShieldCheck, MapPin, Car, Armchair, HelpCircle, ArrowRight, CreditCard, Send, Plus, Minus } from 'lucide-react';
import { CartItem, DiningMode, PaymentMethod, Order } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onPlaceOrder: (order: Order) => void;
  activeTableReservationNumber: number | null;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  activeTableReservationNumber
}: CartDrawerProps) {
  // Navigation / Tab state within checkout
  const [isCheckoutStep, setIsCheckoutStep] = React.useState(false);

  // Form Fields
  const [diningMode, setDiningMode] = React.useState<DiningMode>('dine-in');
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>('cash');
  
  // Customer Details
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');

  // Mode Specific details
  const [dineInTable, setDineInTable] = React.useState(activeTableReservationNumber ? String(activeTableReservationNumber) : '');
  const [vehicleMake, setVehicleMake] = React.useState('');
  const [vehicleColor, setVehicleColor] = React.useState('');
  const [vehiclePlate, setVehiclePlate] = React.useState('');
  const [deliveryAddress, setDeliveryAddress] = React.useState('');

  // Mock Card payment details
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardExpiry, setCardExpiry] = React.useState('');
  const [cardCvv, setCardCvv] = React.useState('');
  const [cardHolder, setCardHolder] = React.useState('');

  // Sync table reservation if available
  React.useEffect(() => {
    if (activeTableReservationNumber) {
      setDineInTable(String(activeTableReservationNumber));
    }
  }, [activeTableReservationNumber]);

  if (!isOpen) return null;

  // Calculators
  const subtotal = cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.16); // 16% Punjab Sales Tax on services
  const deliveryFee = diningMode === 'delivery' ? 250 : 0;
  const total = subtotal + tax + deliveryFee;

  const handleModeChange = (mode: DiningMode) => {
    setDiningMode(mode);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format card number: xxxx xxxx xxxx xxxx
    const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted.substring(0, 19));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formatted = val;
    if (val.length >= 2) {
      formatted = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setCardExpiry(formatted.substring(0, 5));
  };

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Validate mode requirements
    if (diningMode === 'drive-thru' && (!vehicleMake || !vehiclePlate)) return;
    if (diningMode === 'delivery' && !deliveryAddress) return;
    if (diningMode === 'dine-in' && !dineInTable) return;

    // Card details validation if card selected
    if (paymentMethod === 'card') {
      if (cardNumber.length < 15 || !cardExpiry || cardCvv.length < 3) {
        alert('Please complete the online card details.');
        return;
      }
    }

    // Build the order object
    const newOrder: Order = {
      id: 'ZEG-' + Math.floor(100000 + Math.random() * 900000),
      items: [...cartItems],
      subtotal,
      tax,
      deliveryFee,
      total,
      diningMode,
      status: 'placed',
      paymentMethod,
      paymentDetails: {
        cardLast4: paymentMethod === 'card' ? cardNumber.slice(-4) : undefined,
        bankName: paymentMethod === 'bank-transfer' ? 'Habib Bank Ltd' : undefined,
        isPaid: paymentMethod === 'card' // immediately paid if card
      },
      customerDetails: {
        name,
        phone,
        email: email.trim() || undefined
      },
      vehicleDetails: diningMode === 'drive-thru' ? {
        make: vehicleMake,
        color: vehicleColor || 'Unspecified',
        plateNumber: vehiclePlate
      } : undefined,
      deliveryAddress: diningMode === 'delivery' ? deliveryAddress : undefined,
      tableNumber: diningMode === 'dine-in' ? Number(dineInTable) : undefined,
      createdAt: new Date().toISOString(),
      etaMinutes: diningMode === 'delivery' ? 45 : diningMode === 'dine-in' ? 20 : 15,
      driverName: diningMode === 'delivery' ? ['Hammad', 'Hassan', 'Saahil', 'Kari'][Math.floor(Math.random() * 4)] : undefined
    };

    onPlaceOrder(newOrder);
    setIsCheckoutStep(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* Sliding Panel */}
        <div className="w-screen max-w-lg bg-brand-cream border-l border-brand-beige shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-brand-beige flex items-center justify-between bg-brand-brown-dark text-brand-cream shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-amber" />
              <h2 className="font-serif text-lg font-bold">
                {isCheckoutStep ? 'Secure Checkout' : 'Your Feast Basket'}
              </h2>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-brand-cream/10 hover:bg-brand-cream text-brand-cream hover:text-brand-brown-dark transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Checkout / Cart Steps Toggle */}
          <div className="flex-1 overflow-y-auto">
            {!isCheckoutStep ? (
              /* ================= CART ITEMS LIST ================= */
              <div className="p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-brand-beige mx-auto flex items-center justify-center text-brand-brown/50">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-brand-brown-dark">Basket is Empty</h3>
                    <p className="text-xs text-brand-brown max-w-xs mx-auto">
                      Explore our delicious Lahori BBQ and legendary breakfast nashta items, and add them to your cart.
                    </p>
                    <button
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 bg-brand-amber hover:bg-brand-amber-dark text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      Browse Our Menu
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cartItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-4 rounded-xl border border-brand-beige bg-brand-cream shadow-2xs relative text-left"
                        >
                          {/* Item Image thumbnail */}
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            className="w-16 h-16 rounded-lg object-cover bg-brand-beige shrink-0"
                          />

                          {/* Content */}
                          <div className="flex-1 space-y-1">
                            <h4 className="font-serif font-bold text-sm text-brand-brown-dark leading-tight">
                              {item.menuItem.name}
                            </h4>
                            
                            {/* Selected Custom Options */}
                            <div className="flex flex-wrap gap-1.5 pt-0.5">
                              {item.selectedSpiceLevel && (
                                <span className="bg-brand-amber/10 text-brand-amber px-1.5 py-0.5 rounded text-[9px] font-bold">
                                  🌶️ {item.selectedSpiceLevel}
                                </span>
                              )}
                              {item.customInstructions && (
                                <span className="bg-brand-brown/10 text-brand-brown px-1.5 py-0.5 rounded text-[9px] font-medium max-w-[180px] truncate" title={item.customInstructions}>
                                  Note: {item.customInstructions}
                                </span>
                              )}
                            </div>

                            {/* Price details */}
                            <div className="flex items-center justify-between pt-1">
                              <span className="font-mono text-sm font-bold text-brand-brown">
                                Rs {(item.menuItem.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          {/* Controls column */}
                          <div className="flex flex-col items-end justify-between h-16 shrink-0 pl-2">
                            {/* Trash Delete Button */}
                            <button
                              onClick={() => onRemoveItem(idx)}
                              className="text-neutral-400 hover:text-rose-700 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 bg-brand-beige/50 rounded-lg p-0.5 border border-brand-beige">
                              <button
                                onClick={() => onUpdateQuantity(idx, -1)}
                                className="w-5 h-5 rounded bg-brand-cream border border-brand-beige flex items-center justify-center text-xs text-brand-brown hover:bg-brand-beige cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-mono text-xs font-bold text-brand-brown-dark w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(idx, 1)}
                                className="w-5 h-5 rounded bg-brand-cream border border-brand-beige flex items-center justify-center text-xs text-brand-brown hover:bg-brand-beige cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Summary card */}
                    <div className="bg-brand-beige/40 rounded-xl border border-brand-beige p-4 text-left space-y-3">
                      <span className="text-xs font-bold text-brand-brown-dark uppercase tracking-wider block"> پنجاب سیلز ٹیکس (Sales Tax) Included </span>
                      <div className="flex justify-between text-xs text-brand-brown">
                        <span>Items Subtotal</span>
                        <span className="font-mono">Rs {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs text-brand-brown">
                        <span>PRA Sales Tax (16%)</span>
                        <span className="font-mono">Rs {tax.toLocaleString()}</span>
                      </div>
                      <div className="h-px bg-brand-beige"></div>
                      <div className="flex justify-between text-sm font-bold text-brand-brown-dark">
                        <span>Total Basket Estimate</span>
                        <span className="font-mono text-brand-amber">Rs {(subtotal + tax).toLocaleString()}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* ================= SECURE CHECKOUT FORM ================= */
              <form onSubmit={handleSubmitCheckout} className="p-6 space-y-6 text-left">
                {/* Dining Mode Choice */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-brand-brown-dark uppercase tracking-wider block">
                    1. Select Seating / Service Mode
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { mode: 'dine-in', label: 'Dine In', icon: Armchair },
                      { mode: 'drive-thru', label: 'Drive-Thru', icon: Car },
                      { mode: 'takeout', label: 'Takeout', icon: ShoppingBag },
                      { mode: 'delivery', label: 'Delivery', icon: MapPin }
                    ].map((m) => {
                      const Icon = m.icon;
                      const isSelected = diningMode === m.mode;
                      return (
                        <button
                          key={m.mode}
                          type="button"
                          onClick={() => handleModeChange(m.mode as DiningMode)}
                          className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-center transition-all ${
                            isSelected
                              ? 'bg-brand-brown-dark border-brand-brown-dark text-brand-cream shadow-sm'
                              : 'bg-brand-cream border-brand-beige text-brand-brown hover:bg-brand-beige/50'
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="text-[10px] font-bold whitespace-nowrap">{m.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Service Mode Custom Fields */}
                <div className="space-y-4 bg-brand-beige/20 p-4 rounded-xl border border-brand-beige">
                  {diningMode === 'dine-in' && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-brand-brown-dark uppercase block">
                        Table Number
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        max="12"
                        placeholder="E.g., 4"
                        value={dineInTable}
                        onChange={(e) => setDineInTable(e.target.value)}
                        className="w-full bg-brand-cream border border-brand-beige rounded-lg p-2.5 text-xs text-brand-brown-dark focus:outline-none focus:ring-1 focus:ring-brand-amber"
                      />
                      {activeTableReservationNumber ? (
                        <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> Table synchronized with your table reservation
                        </p>
                      ) : (
                        <p className="text-[10px] text-brand-brown/80">
                          Table is available inside DHA Phase 6. (Default is Table 1)
                        </p>
                      )}
                    </div>
                  )}

                  {diningMode === 'drive-thru' && (
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-brand-brown-dark uppercase block">
                        Vehicle Details (For Curbside Delivery)
                      </span>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Vehicle Make (e.g. Honda Civic)"
                          value={vehicleMake}
                          onChange={(e) => setVehicleMake(e.target.value)}
                          className="w-full bg-brand-cream border border-brand-beige rounded-lg p-2.5 text-xs text-brand-brown-dark focus:outline-none focus:ring-1 focus:ring-brand-amber"
                        />
                        <input
                          type="text"
                          placeholder="Vehicle Color (e.g. White)"
                          value={vehicleColor}
                          onChange={(e) => setVehicleColor(e.target.value)}
                          className="w-full bg-brand-cream border border-brand-beige rounded-lg p-2.5 text-xs text-brand-brown-dark focus:outline-none focus:ring-1 focus:ring-brand-amber"
                        />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="License Plate Number (e.g., LE-19-1234)"
                        value={vehiclePlate}
                        onChange={(e) => setVehiclePlate(e.target.value)}
                        className="w-full bg-brand-cream border border-brand-beige rounded-lg p-2.5 text-xs text-brand-brown-dark font-mono focus:outline-none focus:ring-1 focus:ring-brand-amber"
                      />
                    </div>
                  )}

                  {diningMode === 'delivery' && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-brand-brown-dark uppercase block">
                        Delivery Address in DHA Phase 6 / Lahore
                      </label>
                      <textarea
                        required
                        placeholder="House #, Street #, Sector/Phase, DHA Lahore..."
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        rows={2}
                        className="w-full bg-brand-cream border border-brand-beige rounded-lg p-2.5 text-xs text-brand-brown-dark focus:outline-none focus:ring-1 focus:ring-brand-amber"
                      />
                      <p className="text-[10px] text-brand-amber font-medium">
                        * Flat Rs 250 delivery fee applied to DHA Sector locations.
                      </p>
                    </div>
                  )}

                  {diningMode === 'takeout' && (
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-brand-brown-dark block">Pickup Location</span>
                      <p className="text-xs text-brand-brown leading-relaxed">
                        ZēGrill: H, 294 MB Street 11, Sector H DHA Phase 6, Lahore. Ready in 15 mins!
                      </p>
                    </div>
                  )}
                </div>

                {/* Customer Info */}
                <div className="space-y-4">
                  <span className="text-xs font-bold text-brand-brown-dark uppercase tracking-wider block">
                    2. Customer Contact details
                  </span>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-brand-cream border border-brand-beige rounded-xl p-3 text-xs text-brand-brown-dark focus:outline-none focus:ring-1 focus:ring-brand-amber placeholder:text-brand-brown/50"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number (03XX...)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-brand-cream border border-brand-beige rounded-xl p-3 text-xs text-brand-brown-dark font-mono focus:outline-none focus:ring-1 focus:ring-brand-amber placeholder:text-brand-brown/50"
                      />
                      <input
                        type="email"
                        placeholder="Email (Optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-brand-cream border border-brand-beige rounded-xl p-3 text-xs text-brand-brown-dark focus:outline-none focus:ring-1 focus:ring-brand-amber placeholder:text-brand-brown/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-4">
                  <span className="text-xs font-bold text-brand-brown-dark uppercase tracking-wider block">
                    3. Choose Payment Method
                  </span>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'cash', label: diningMode === 'delivery' ? 'Cash on Delivery' : 'Pay at Counter' },
                      { id: 'card', label: 'Online Card' },
                      { id: 'bank-transfer', label: 'Bank Transfer' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPaymentMethod(p.id as PaymentMethod)}
                        className={`p-3 rounded-xl border text-[11px] font-bold text-center transition-all ${
                          paymentMethod === p.id
                            ? 'bg-brand-brown-dark border-brand-brown-dark text-brand-cream shadow-sm'
                            : 'bg-brand-cream border-brand-beige text-brand-brown hover:bg-brand-beige/50'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Payment specifics */}
                  {paymentMethod === 'card' && (
                    <div className="bg-brand-beige/40 p-4 rounded-xl border border-brand-beige space-y-4 relative overflow-hidden">
                      {/* Fake Interactive Credit Card */}
                      <div className="relative h-32 w-full max-w-xs mx-auto rounded-xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-850 text-brand-cream p-4 shadow-md border border-zinc-800 flex flex-col justify-between font-mono text-left select-none">
                        <div className="flex justify-between items-center">
                          <CreditCard className="w-8 h-8 opacity-80" />
                          <span className="text-[9px] font-bold tracking-widest uppercase">VISA / UNIONPAY</span>
                        </div>
                        
                        <div className="text-base tracking-widest font-bold font-mono">
                          {cardNumber || '•••• •••• •••• ••••'}
                        </div>

                        <div className="flex justify-between items-end text-[9px]">
                          <div>
                            <span className="text-[7px] text-brand-cream/65 block uppercase">Card Holder</span>
                            <span className="font-bold uppercase truncate max-w-[150px] inline-block">{cardHolder || 'Your Name'}</span>
                          </div>
                          <div>
                            <span className="text-[7px] text-brand-cream/65 block uppercase font-mono">Expiry</span>
                            <span className="font-bold">{cardExpiry || 'MM/YY'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Inputs */}
                      <div className="space-y-3 pt-2">
                        <input
                          type="text"
                          required
                          placeholder="Cardholder Name"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full bg-brand-cream border border-brand-beige rounded-lg p-2.5 text-xs text-brand-brown-dark focus:outline-none focus:ring-1 focus:ring-brand-amber"
                        />

                        <input
                          type="text"
                          required
                          placeholder="Card Number"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          className="w-full bg-brand-cream border border-brand-beige rounded-lg p-2.5 text-xs text-brand-brown-dark font-mono focus:outline-none focus:ring-1 focus:ring-brand-amber"
                        />

                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            required
                            placeholder="Expiry MM/YY"
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            className="w-full bg-brand-cream border border-brand-beige rounded-lg p-2.5 text-xs text-brand-brown-dark font-mono focus:outline-none focus:ring-1 focus:ring-brand-amber"
                          />
                          <input
                            type="password"
                            required
                            maxLength={4}
                            placeholder="CVV (E.g., 123)"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ''))}
                            className="w-full bg-brand-cream border border-brand-beige rounded-lg p-2.5 text-xs text-brand-brown-dark font-mono focus:outline-none focus:ring-1 focus:ring-brand-amber"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank-transfer' && (
                    <div className="bg-brand-beige/40 p-4 rounded-xl border border-brand-beige space-y-2 text-xs text-brand-brown leading-relaxed">
                      <p className="font-bold text-brand-brown-dark">Habib Bank Limited (HBL) Transfer details:</p>
                      <div className="font-mono bg-brand-cream p-3 rounded-lg border border-brand-beige/65 space-y-1">
                        <div><span className="text-[10px] text-brand-brown">Account Title:</span> <span className="font-bold text-brand-brown-dark">ZE GRILL PVT LTD</span></div>
                        <div><span className="text-[10px] text-brand-brown">Account Number:</span> <span className="font-bold text-brand-brown-dark font-mono">1234-5678-9012-3456</span></div>
                        <div><span className="text-[10px] text-brand-brown">Branch Code:</span> <span className="font-bold text-brand-brown-dark font-mono">0352 (Phase 6 DHA Lahore)</span></div>
                      </div>
                      <p className="text-[10px] text-brand-amber font-semibold">
                        * Please complete the transfer and keep your digital receipt ready to show.
                      </p>
                    </div>
                  )}
                </div>

                <button type="submit" className="hidden" id="hidden-checkout-submit"></button>
              </form>
            )}
          </div>

          {/* Cart Footer Total Panel */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-brand-beige border-t border-brand-beige/80 shrink-0 text-left space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-xs text-brand-brown font-medium block">Grand Total</span>
                  <span className="font-mono text-xl font-bold text-brand-brown-dark">
                    Rs {total.toLocaleString()}
                  </span>
                </div>
                
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded font-bold">
                  🛡️ Secure Payment
                </span>
              </div>

              {isCheckoutStep ? (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckoutStep(false)}
                    className="flex-1 bg-brand-cream hover:bg-brand-brown-light border border-brand-beige/80 text-brand-brown-dark font-bold text-xs py-3.5 rounded-xl transition-all"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const hiddenBtn = document.getElementById('hidden-checkout-submit');
                      if (hiddenBtn) hiddenBtn.click();
                    }}
                    className="flex-1 bg-brand-amber hover:bg-brand-amber-dark text-white font-bold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Place Order</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsCheckoutStep(true)}
                  className="w-full bg-brand-amber hover:bg-brand-amber-dark text-white font-bold text-xs py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg shadow-brand-amber/10 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
