import React from 'react';
import { ClipboardCheck, ChefHat, Truck, CheckCircle2, Clock, MapPin, Phone, Car, Armchair, HelpCircle, ArrowRight, Play, Info } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface TrackingDashboardProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, nextStatus: OrderStatus) => void;
  onClearHistory: () => void;
}

export default function TrackingDashboard({
  orders,
  onUpdateOrderStatus,
  onClearHistory
}: TrackingDashboardProps) {
  const [selectedOrderId, setSelectedOrderId] = React.useState<string | null>(
    orders.length > 0 ? orders[0].id : null
  );

  // Sync selected order if we get a new active order
  React.useEffect(() => {
    if (orders.length > 0 && !selectedOrderId) {
      setSelectedOrderId(orders[0].id);
    }
  }, [orders, selectedOrderId]);

  // Find selected order
  const activeOrder = orders.find((o) => o.id === selectedOrderId) || (orders.length > 0 ? orders[0] : null);

  const getStatusStep = (status: OrderStatus) => {
    switch (status) {
      case 'placed': return 1;
      case 'preparing': return 2;
      case 'ready-pickup':
      case 'out-for-delivery': return 3;
      case 'completed': return 4;
      default: return 1;
    }
  };

  const getStatusLabelAndDescr = (status: OrderStatus, mode: string) => {
    switch (status) {
      case 'placed':
        return { label: 'Order Received', desc: 'ZēGrill kitchen team has confirmed your order and is queuing ingredients.' };
      case 'preparing':
        return { label: 'Sizzling in Kitchen', desc: 'Our grill master has laid your BBQ skewers over live hot wood coals!' };
      case 'ready-pickup':
        return {
          label: mode === 'drive-thru' ? 'Ready for Drive-Thru' : 'Ready for Takeout',
          desc: 'Freshly packed in secure thermal boxes. Please pull up to our DHA Phase 6 curbside bay!'
        };
      case 'out-for-delivery':
        return { label: 'Out for Delivery', desc: 'Our courier rider has left the DHA Phase 6 kitchen and is heading your way.' };
      case 'completed':
        return { label: 'Feast Completed', desc: 'Thank you for choosing ZēGrill. Enjoy your delicious food!' };
      case 'cancelled':
        return { label: 'Cancelled', desc: 'This order was cancelled.' };
    }
  };

  const advanceStatus = (order: Order) => {
    const currentStep = getStatusStep(order.status);
    let nextStatus: OrderStatus = order.status;

    if (currentStep === 1) {
      nextStatus = 'preparing';
    } else if (currentStep === 2) {
      nextStatus = order.diningMode === 'delivery' ? 'out-for-delivery' : 'ready-pickup';
    } else if (currentStep === 3) {
      nextStatus = 'completed';
    }

    onUpdateOrderStatus(order.id, nextStatus);
  };

  return (
    <div className="space-y-10 pb-16 text-left">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brand-beige pb-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-brand-brown-dark">
            Order Tracking Dashboard
          </h2>
          <p className="text-sm text-brand-brown mt-0.5">
            Follow your BBQ sizzling progress in real-time or manage your past meal receipts.
          </p>
        </div>

        {orders.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-xs font-semibold text-rose-700 hover:text-rose-800 hover:underline cursor-pointer"
          >
            Clear Order History
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        /* Empty Dashboard state */
        <div className="text-center py-20 bg-brand-cream border border-dashed border-brand-beige rounded-2xl max-w-2xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-brand-beige mx-auto flex items-center justify-center text-brand-brown/40">
            <ClipboardCheck className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-brand-brown-dark">No Active Orders</h3>
          <p className="text-xs text-brand-brown max-w-sm mx-auto">
            You haven't placed any orders in this session yet. Head over to our Menu section, fill your cart, and place your first order!
          </p>
        </div>
      ) : (
        /* Dashboard Content split layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Order List Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-serif text-sm font-bold text-brand-brown-dark uppercase tracking-widest pl-1">
              Active & Past Receipts
            </h3>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {orders.map((o) => {
                const isSelected = activeOrder?.id === o.id;
                const itemsCount = o.items.reduce((acc, it) => acc + it.quantity, 0);

                return (
                  <button
                    key={o.id}
                    onClick={() => setSelectedOrderId(o.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-brand-brown-dark border-brand-brown-dark text-brand-cream shadow-md'
                        : 'bg-brand-cream border-brand-beige text-brand-brown-dark hover:bg-brand-beige/30'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-xs font-bold block">
                          {o.id}
                        </span>
                        <span className="text-[10px] opacity-75 capitalize block mt-0.5">
                          {o.diningMode.replace('-', ' ')} • {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
                        </span>
                      </div>

                      {/* Status pill inside sidebar */}
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                        o.status === 'completed'
                          ? isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-100 text-emerald-800'
                          : isSelected ? 'bg-brand-amber text-brand-cream' : 'bg-brand-amber/10 text-brand-amber'
                      }`}>
                        {o.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-brand-beige/25">
                      <span className="text-[10px] opacity-75">
                        {new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="font-mono text-xs font-bold">
                        Rs {o.total.toLocaleString()}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Rich Tracking Stepper & Map */}
          {activeOrder && (
            <div className="lg:col-span-8 bg-brand-cream border border-brand-beige p-6 sm:p-8 rounded-2xl shadow-sm space-y-8">
              
              {/* Active Order Title details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-beige pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg font-bold text-brand-brown-dark">
                      Order {activeOrder.id}
                    </span>
                    <span className="bg-brand-beige text-brand-brown px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider font-mono">
                      {activeOrder.diningMode}
                    </span>
                  </div>
                  <p className="text-xs text-brand-brown mt-1">
                    Placed on {new Date(activeOrder.createdAt).toLocaleDateString()} at {new Date(activeOrder.createdAt).toLocaleTimeString()}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-brand-brown block uppercase font-semibold">Total Invoice</span>
                  <span className="font-mono text-xl font-bold text-brand-amber">
                    Rs {activeOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* LIVE TRACKER SIMULATOR (Highly useful testing tool for users) */}
              {activeOrder.status !== 'completed' && (
                <div className="bg-brand-beige/30 p-4 rounded-xl border border-brand-beige flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-mono font-bold text-brand-amber uppercase tracking-wider block">Live Simulator Control</span>
                    <h4 className="text-xs font-bold text-brand-brown-dark">Test tracking progress in real-time:</h4>
                    <p className="text-[11px] text-brand-brown leading-relaxed">
                      Normally our kitchen updates this, but you can fast-forward the order steps yourself to see the dashboard change.
                    </p>
                  </div>

                  <button
                    onClick={() => advanceStatus(activeOrder)}
                    className="w-full sm:w-auto bg-brand-brown-dark hover:bg-brand-brown text-brand-cream text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-brand-cream" />
                    <span>Step Forward Status</span>
                  </button>
                </div>
              )}

              {/* LIVE STEPPER PROGRESS GRAPH */}
              <div className="space-y-6">
                <div className="relative">
                  {/* Stepper bar line */}
                  <div className="absolute top-1/2 left-4 right-4 h-1 bg-brand-beige -translate-y-1/2 z-0 hidden sm:block"></div>
                  
                  {/* Active fill line */}
                  <div
                    style={{
                      width: `${
                        activeOrder.status === 'placed' ? '0%' :
                        activeOrder.status === 'preparing' ? '33%' :
                        activeOrder.status === 'completed' ? '100%' : '66%'
                      }`
                    }}
                    className="absolute top-1/2 left-4 h-1 bg-brand-amber -translate-y-1/2 z-0 transition-all duration-700 hidden sm:block"
                  ></div>

                  {/* Steps container */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative z-10">
                    {[
                      { step: 1, label: 'Placed', icon: ClipboardCheck, desc: 'Received' },
                      { step: 2, label: 'Kitchen', icon: ChefHat, desc: 'Charcoal Grilling' },
                      {
                        step: 3,
                        label: activeOrder.diningMode === 'delivery' ? 'On Road' : 'Ready',
                        icon: activeOrder.diningMode === 'drive-thru' ? Car : Truck,
                        desc: activeOrder.diningMode === 'delivery' ? 'Out for Delivery' : 'Collect'
                      },
                      { step: 4, label: 'Enjoyed', icon: CheckCircle2, desc: 'Completed' }
                    ].map((st) => {
                      const currentActiveStep = getStatusStep(activeOrder.status);
                      const isDone = currentActiveStep >= st.step;
                      const isCurrent = currentActiveStep === st.step;
                      const StepIcon = st.icon;

                      return (
                        <div key={st.step} className="flex sm:flex-col items-center gap-3 sm:gap-2 text-left sm:text-center">
                          {/* Circle Icon */}
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                              isDone
                                ? 'bg-brand-amber border-brand-amber text-brand-cream shadow-md shadow-brand-amber/15'
                                : 'bg-brand-cream border-brand-beige text-brand-brown-light'
                            } ${isCurrent ? 'ring-4 ring-brand-amber/20 scale-105 animate-pulse' : ''}`}
                          >
                            <StepIcon className="w-4 h-4 shrink-0" />
                          </div>

                          {/* Labels */}
                          <div>
                            <span className={`text-xs font-bold block ${isDone ? 'text-brand-brown-dark' : 'text-brand-brown/60'}`}>
                              {st.label}
                            </span>
                            <span className="text-[10px] text-brand-brown/70 block sm:hidden md:block">
                              {st.desc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Rich text desc */}
                <div className="p-4 bg-brand-beige/20 rounded-xl border border-brand-beige">
                  <h4 className="text-xs font-bold text-brand-brown-dark">
                    Status: <span className="text-brand-amber uppercase tracking-wider">{getStatusLabelAndDescr(activeOrder.status, activeOrder.diningMode).label}</span>
                  </h4>
                  <p className="text-[11px] text-brand-brown mt-1 leading-relaxed">
                    {getStatusLabelAndDescr(activeOrder.status, activeOrder.diningMode).desc}
                  </p>
                </div>
              </div>

              {/* TIMING & DELIVERY MAN PROFILE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Clock ETA */}
                <div className="bg-brand-cream border border-brand-beige p-5 rounded-xl flex items-start gap-4">
                  <div className="p-2.5 bg-brand-beige rounded-lg text-brand-amber">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-brown-dark uppercase tracking-wider">Estimated Wait</h4>
                    <p className="text-lg font-serif font-bold text-brand-brown-dark mt-1">
                      {activeOrder.status === 'completed' ? 'Delivered' : `~ ${activeOrder.etaMinutes} Minutes`}
                    </p>
                    <span className="text-[10px] text-brand-brown block mt-1">
                      {activeOrder.status === 'completed' ? 'Completed' : 'Cooked fresh on order placement'}
                    </span>
                  </div>
                </div>

                {/* Mode dependent profile (Delivery Rider / Seat info / Vehicle pickup info) */}
                <div className="bg-brand-cream border border-brand-beige p-5 rounded-xl flex items-start gap-4">
                  {activeOrder.diningMode === 'delivery' && (
                    <>
                      <div className="p-2.5 bg-brand-beige rounded-lg text-brand-amber shrink-0">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-brand-brown-dark uppercase tracking-wider">Assigned Rider</h4>
                        <p className="text-sm font-bold text-brand-brown-dark">
                          {activeOrder.driverName || 'Rider Hammad'} (ZēGrill Express)
                        </p>
                        <span className="text-[10px] text-brand-brown flex items-center gap-1">
                          <Phone className="w-3 h-3 text-brand-amber" /> +92-300-1234567
                        </span>
                      </div>
                    </>
                  )}

                  {activeOrder.diningMode === 'drive-thru' && (
                    <>
                      <div className="p-2.5 bg-brand-beige rounded-lg text-brand-amber shrink-0">
                        <Car className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-brand-brown-dark uppercase tracking-wider">Vehicle registered</h4>
                        <p className="text-sm font-bold text-brand-brown-dark font-mono uppercase">
                          {activeOrder.vehicleDetails?.make} ({activeOrder.vehicleDetails?.color})
                        </p>
                        <span className="text-[10px] text-brand-brown font-semibold font-mono block">
                          Plate: {activeOrder.vehicleDetails?.plateNumber}
                        </span>
                      </div>
                    </>
                  )}

                  {activeOrder.diningMode === 'dine-in' && (
                    <>
                      <div className="p-2.5 bg-brand-beige rounded-lg text-brand-amber shrink-0">
                        <Armchair className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-brand-brown-dark uppercase tracking-wider">Dine-In Table No</h4>
                        <p className="text-base font-bold text-brand-brown-dark">
                          Table #{activeOrder.tableNumber || 1}
                        </p>
                        <span className="text-[10px] text-brand-brown block">
                          Served inside our AC Family Setting Area
                        </span>
                      </div>
                    </>
                  )}

                  {activeOrder.diningMode === 'takeout' && (
                    <>
                      <div className="p-2.5 bg-brand-beige rounded-lg text-brand-amber shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-brand-brown-dark uppercase tracking-wider">Pickup Counter</h4>
                        <p className="text-sm font-bold text-brand-brown-dark leading-tight">
                          Street 11, DHA Phase 6
                        </p>
                        <span className="text-[10px] text-brand-brown block mt-0.5">
                          Hold receipt {activeOrder.id} ready on phone
                        </span>
                      </div>
                    </>
                  )}
                </div>

              </div>

              {/* ORDERED ITEMS RECAP */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-brand-brown-dark uppercase tracking-wider mb-3">Receipt Summary</h4>
                <div className="border border-brand-beige rounded-xl overflow-hidden divide-y divide-brand-beige bg-brand-beige/5">
                  {activeOrder.items.map((it, index) => (
                    <div key={index} className="flex justify-between items-center p-3 text-xs">
                      <div>
                        <span className="font-bold text-brand-brown-dark">{it.quantity}x</span>{' '}
                        <span className="font-medium text-brand-brown-dark">{it.menuItem.name}</span>
                        {it.selectedSpiceLevel && (
                          <span className="text-[9px] text-brand-amber font-bold ml-2">({it.selectedSpiceLevel})</span>
                        )}
                      </div>
                      <span className="font-mono font-medium text-brand-brown-dark">
                        Rs {(it.menuItem.price * it.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  
                  {/* Fee breakdowns */}
                  <div className="p-3 text-xs space-y-1.5 bg-brand-beige/25">
                    <div className="flex justify-between text-brand-brown">
                      <span>Subtotal</span>
                      <span className="font-mono">Rs {activeOrder.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-brand-brown">
                      <span>Sales Tax (16%)</span>
                      <span className="font-mono">Rs {activeOrder.tax.toLocaleString()}</span>
                    </div>
                    {activeOrder.deliveryFee > 0 && (
                      <div className="flex justify-between text-brand-brown">
                        <span>Delivery Rider Fee</span>
                        <span className="font-mono">Rs {activeOrder.deliveryFee.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="h-px bg-brand-beige/80 my-1"></div>
                    <div className="flex justify-between font-bold text-brand-brown-dark text-sm">
                      <span>Total Invoice</span>
                      <span className="font-mono text-brand-amber">Rs {activeOrder.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Receipt confirmation indicator */}
              <div className="flex items-center gap-2 text-xs text-brand-brown bg-brand-beige/10 p-3 rounded-lg border border-brand-beige/40">
                <Info className="w-4 h-4 text-brand-amber shrink-0" />
                <span>
                  Payment Status:{' '}
                  <span className="font-bold text-brand-brown-dark">
                    {activeOrder.paymentMethod === 'card'
                      ? 'PAID ONLINE (Visa Card)'
                      : activeOrder.paymentMethod === 'bank-transfer'
                      ? 'PENDING VERIFICATION (Bank Transfer)'
                      : activeOrder.diningMode === 'delivery'
                      ? 'CASH ON DELIVERY (COD)'
                      : 'CASH ON PICKUP / COUNTER'}
                  </span>
                </span>
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
}
