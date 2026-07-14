import React from 'react';
import { Calendar, User, Clock, ArrowRight, ShieldCheck, Armchair, HelpCircle, Check, Info } from 'lucide-react';
import { Table, Reservation } from '../types';
import { INITIAL_TABLES, TIME_SLOTS } from '../data';

interface ReservationSectionProps {
  onAddReservation: (reservation: Reservation) => void;
  activeReservation: Reservation | null;
  onCancelReservation: () => void;
}

export default function ReservationSection({
  onAddReservation,
  activeReservation,
  onCancelReservation
}: ReservationSectionProps) {
  // Input form state
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = React.useState(TIME_SLOTS[3]); // Default to 7:00 PM - 8:30 PM
  const [guestsCount, setGuestsCount] = React.useState(4);
  const [area, setArea] = React.useState<'Family Hall' | 'Rooftop Grill' | 'Private Lounge'>('Family Hall');
  const [notes, setNotes] = React.useState('');
  
  // Interactive Seating Map State
  const [tables, setTables] = React.useState<Table[]>(INITIAL_TABLES);
  const [selectedTableNumber, setSelectedTableNumber] = React.useState<number | null>(null);

  // Filter tables based on selected area
  // Tables 1-4: Family Hall, 5-8: Rooftop Grill, 9-12: Private Lounge
  const filteredTables = tables.filter((t) => {
    if (area === 'Family Hall') return t.number >= 1 && t.number <= 4;
    if (area === 'Rooftop Grill') return t.number >= 5 && t.number <= 8;
    return t.number >= 9 && t.number <= 12;
  });

  const handleTableClick = (table: Table) => {
    if (table.status === 'reserved') return;

    setTables(
      tables.map((t) => {
        if (t.id === table.id) {
          // Toggle select
          const isCurrentlySelected = t.status === 'selected';
          setSelectedTableNumber(isCurrentlySelected ? null : t.number);
          return { ...t, status: isCurrentlySelected ? 'available' : 'selected' };
        } else if (t.status === 'selected') {
          // Deselect other selected tables
          return { ...t, status: 'available' };
        }
        return t;
      })
    );
  };

  // Switch area resets selected table
  const handleAreaChange = (newArea: 'Family Hall' | 'Rooftop Grill' | 'Private Lounge') => {
    setArea(newArea);
    setSelectedTableNumber(null);
    // Reset any previously selected tables to available
    setTables(
      tables.map((t) => (t.status === 'selected' ? { ...t, status: 'available' } : t))
    );
  };

  const handleBookTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !selectedTableNumber) return;

    const newReservation: Reservation = {
      id: 'RES-' + Math.floor(100000 + Math.random() * 900000),
      customerName: name,
      email: email.trim() || undefined,
      phone,
      date,
      timeSlot,
      guestsCount,
      tableNumber: selectedTableNumber,
      area,
      notes: notes.trim() || undefined
    };

    onAddReservation(newReservation);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="font-serif text-3xl font-bold text-brand-brown-dark">
          Table & Seat Reservation
        </h2>
        <p className="text-sm text-brand-brown">
          Book your private dining lounge, rooftop grill, or standard family setting tables at DHA Phase 6 Lahore.
        </p>
      </div>

      {activeReservation ? (
        /* Active Booking Ticket */
        <div className="max-w-2xl mx-auto bg-brand-cream border border-brand-beige rounded-2xl shadow-lg overflow-hidden text-left">
          {/* Header */}
          <div className="bg-brand-brown-dark p-6 text-brand-cream text-center relative">
            <span className="text-[10px] uppercase font-mono font-bold text-brand-amber bg-brand-cream/10 px-2.5 py-1 rounded-full mb-2 inline-block">
              Confirmed Booking
            </span>
            <h3 className="font-serif text-2xl font-bold">Your Table is Secured!</h3>
            <p className="text-xs text-brand-cream/80 mt-1">We look forward to hosting you at ZēGrill</p>
            
            {/* Reservation ID */}
            <div className="absolute top-6 right-6 font-mono text-xs font-bold text-brand-amber">
              {activeReservation.id}
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 border-b border-brand-beige pb-6">
              <div>
                <span className="text-[10px] text-brand-brown font-semibold uppercase block">Reserved For</span>
                <span className="text-base font-bold text-brand-brown-dark">{activeReservation.customerName}</span>
              </div>
              <div>
                <span className="text-[10px] text-brand-brown font-semibold uppercase block">Contact Phone</span>
                <span className="text-base font-mono font-medium text-brand-brown-dark">{activeReservation.phone}</span>
              </div>
              <div>
                <span className="text-[10px] text-brand-brown font-semibold uppercase block">Date & Time</span>
                <span className="text-sm font-bold text-brand-brown-dark">{activeReservation.date}</span>
                <span className="text-xs text-brand-brown block">{activeReservation.timeSlot}</span>
              </div>
              <div>
                <span className="text-[10px] text-brand-brown font-semibold uppercase block">Seating Area</span>
                <span className="text-sm font-bold text-brand-brown-dark">{activeReservation.area}</span>
                <span className="text-xs text-brand-brown block">Table #{activeReservation.tableNumber} ({activeReservation.guestsCount} Guests)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 bg-brand-beige/30 p-4 rounded-xl border border-brand-beige">
              {/* Fake QR Code */}
              <div className="w-24 h-24 bg-brand-brown-dark rounded-xl flex flex-col items-center justify-center p-2 text-white shrink-0 shadow-inner">
                <div className="grid grid-cols-4 gap-1 w-full h-full opacity-90">
                  {[...Array(16)].map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        (i * 7 + 13) % 5 === 0 || i === 0 || i === 3 || i === 12 || i === 15
                          ? 'bg-brand-cream'
                          : 'bg-transparent'
                      }`}
                    ></div>
                  ))}
                </div>
                <span className="text-[7px] font-mono tracking-widest mt-1 uppercase text-brand-beige">ZE-GRILL</span>
              </div>

              <div className="space-y-1.5 text-center sm:text-left">
                <h4 className="font-serif text-sm font-bold text-brand-brown-dark flex items-center justify-center sm:justify-start gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Show this on Arrival
                </h4>
                <p className="text-xs text-brand-brown leading-relaxed">
                  Upon your arrival at our DHA Phase 6 restaurant, please present this booking screen to our reception host. Your table will be held for exactly <span className="font-bold text-brand-amber">15 minutes</span> past your reservation time.
                </p>
              </div>
            </div>

            {/* Cancel booking */}
            <div className="text-center pt-2">
              <button
                onClick={onCancelReservation}
                className="text-xs font-semibold text-rose-700 hover:text-rose-800 hover:underline cursor-pointer"
              >
                Cancel Reservation
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Reservation Booking Form & Seating Map */
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          {/* Reservation Settings Form */}
          <form onSubmit={handleBookTable} className="lg:col-span-5 bg-brand-cream border border-brand-beige p-6 rounded-2xl shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold text-brand-brown-dark border-b border-brand-beige pb-3">
              1. Setup Booking details
            </h3>

            {/* Basic details */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-brown uppercase tracking-wider block">
                    Choose Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-brand-cream border border-brand-beige rounded-xl p-2.5 text-xs text-brand-brown-dark focus:outline-none focus:ring-1 focus:ring-brand-amber cursor-pointer"
                  />
                </div>

                {/* Guests */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-brown uppercase tracking-wider block">
                    Guests Count
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-brand-cream border border-brand-beige rounded-xl p-2.5 text-xs text-brand-brown-dark focus:outline-none focus:ring-1 focus:ring-brand-amber cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-brown uppercase tracking-wider block">
                  Select Dinner/Lunch Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-brand-cream border border-brand-beige rounded-xl p-2.5 text-xs text-brand-brown-dark focus:outline-none focus:ring-1 focus:ring-brand-amber cursor-pointer"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* Area select */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-brand-brown uppercase tracking-wider block">
                  Select Seating Area
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Family Hall', 'Rooftop Grill', 'Private Lounge'] as const).map((areaOption) => (
                    <button
                      key={areaOption}
                      type="button"
                      onClick={() => handleAreaChange(areaOption)}
                      className={`p-2.5 rounded-xl border text-[11px] font-bold text-center transition-all ${
                        area === areaOption
                          ? 'bg-brand-brown-dark border-brand-brown-dark text-brand-cream shadow-sm'
                          : 'bg-brand-cream border-brand-beige text-brand-brown hover:bg-brand-beige/50'
                      }`}
                    >
                      {areaOption}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Guest details */}
            <div className="space-y-4 pt-4 border-t border-brand-beige">
              <h3 className="font-serif text-lg font-bold text-brand-brown-dark">
                2. Guest Contact Info
              </h3>

              {/* Customer Name */}
              <div className="space-y-1.5">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-brand-cream border border-brand-beige rounded-xl p-3 text-xs text-brand-brown-dark focus:outline-none focus:ring-1 focus:ring-brand-amber placeholder:text-brand-brown/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Phone */}
                <input
                  type="tel"
                  required
                  placeholder="Phone Number (e.g., 0321...)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-brand-cream border border-brand-beige rounded-xl p-3 text-xs text-brand-brown-dark font-mono focus:outline-none focus:ring-1 focus:ring-brand-amber placeholder:text-brand-brown/50"
                />

                {/* Email */}
                <input
                  type="email"
                  placeholder="Email Address (Optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-cream border border-brand-beige rounded-xl p-3 text-xs text-brand-brown-dark focus:outline-none focus:ring-1 focus:ring-brand-amber placeholder:text-brand-brown/50"
                />
              </div>

              {/* Notes */}
              <textarea
                placeholder="Special notes (e.g. high chair for child, window-side seat, anniversary setup, etc.)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full bg-brand-cream border border-brand-beige rounded-xl p-3 text-xs text-brand-brown-dark focus:outline-none focus:ring-1 focus:ring-brand-amber placeholder:text-brand-brown/50"
              />
            </div>

            {/* Selection Warning */}
            {!selectedTableNumber && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-[11px] flex gap-2 items-start leading-relaxed">
                <Info className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Please select a table from the interactive seating grid layout on the right to complete your booking.</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!selectedTableNumber}
              className={`w-full py-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                selectedTableNumber
                  ? 'bg-brand-amber hover:bg-brand-amber-dark text-white shadow-brand-amber/20 hover:-translate-y-0.5 cursor-pointer'
                  : 'bg-brand-beige text-brand-brown/50 cursor-not-allowed shadow-none border border-brand-beige/80'
              }`}
            >
              <span>Confirm & Secure Table #{selectedTableNumber || '?'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Seating Grid Interactive Map Layout */}
          <div className="lg:col-span-7 bg-brand-cream border border-brand-beige p-6 rounded-2xl shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-brand-beige pb-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-brand-brown-dark">
                  Interactive Dining Map
                </h3>
                <p className="text-[11px] text-brand-brown mt-0.5">
                  Currently viewing: <span className="font-bold text-brand-amber">{area} Layout</span>
                </p>
              </div>

              {/* Map Legend */}
              <div className="flex items-center gap-4 text-[10px] font-semibold text-brand-brown flex-wrap">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-brand-cream border border-brand-brown-light"></span>
                  Available
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-brand-amber shadow-sm"></span>
                  Selected
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-neutral-200 border border-neutral-300"></span>
                  Occupied
                </span>
              </div>
            </div>

            {/* Visual Floor Grid */}
            <div className="relative w-full aspect-[4/3] bg-brand-beige/25 rounded-2xl border border-brand-beige/80 p-4 overflow-hidden flex flex-col justify-between">
              {/* Fake entrance indicators and windows for immersion */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-brown/10 rounded-b text-[9px] font-mono font-bold text-brand-brown tracking-widest uppercase">
                {area === 'Rooftop Grill' ? 'Rooftop Terrace Edge' : 'Main Entrance / Reception'}
              </div>

              {area !== 'Rooftop Grill' && (
                <div className="absolute left-0 top-1/3 bottom-1/3 w-1 bg-sky-300 rounded-r flex items-center justify-center">
                  <span className="text-[7px] font-mono text-sky-800 rotate-90 whitespace-nowrap uppercase tracking-widest">Glass Window</span>
                </div>
              )}

              {/* Render Tables positioned visually using absolute coordinate percentages */}
              <div className="relative w-full h-full my-6">
                {filteredTables.map((table) => {
                  const isSelected = selectedTableNumber === table.number;
                  const isReserved = table.status === 'reserved';

                  return (
                    <button
                      key={table.id}
                      type="button"
                      disabled={isReserved}
                      onClick={() => handleTableClick(table)}
                      style={{
                        left: `${table.x}%`,
                        top: `${table.y - 15}%`,
                      }}
                      className={`absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl flex flex-col items-center justify-center p-2.5 transition-all duration-300 border cursor-pointer ${
                        isSelected
                          ? 'bg-brand-amber border-brand-amber text-brand-cream shadow-lg shadow-brand-amber/30 scale-105 z-10'
                          : isReserved
                          ? 'bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed'
                          : 'bg-brand-cream border-brand-brown-light/70 text-brand-brown-dark hover:border-brand-brown hover:bg-brand-beige/50 hover:shadow-sm'
                      }`}
                    >
                      <Armchair className={`w-5 h-5 mb-1 ${isSelected ? 'text-brand-cream' : isReserved ? 'text-neutral-300' : 'text-brand-brown'}`} />
                      <span className="text-xs font-bold block">T-{table.number}</span>
                      <span className="text-[9px] font-medium opacity-80 block">{table.capacity} Seats</span>
                    </button>
                  );
                })}
              </div>

              {/* Kitchen Indicator */}
              <div className="w-full text-center py-1.5 bg-brand-brown/5 border-t border-brand-beige text-[9px] font-mono text-brand-brown uppercase tracking-wider">
                Clay-Tandoor & BBQ Kitchen Area
              </div>
            </div>

            {/* Instruction Footer */}
            <div className="flex gap-2 items-start bg-brand-beige/30 p-4 rounded-xl border border-brand-beige">
              <Armchair className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-brand-brown-dark">Table Specifications:</p>
                <ul className="list-disc pl-4 space-y-1 text-brand-brown leading-relaxed">
                  <li><span className="font-semibold text-brand-brown-dark">Tables 1-3</span> inside the AC Family Hall, perfect for large families.</li>
                  <li><span className="font-semibold text-brand-brown-dark">Tables 5-8</span> on the open-air Rooftop grill, absolute best breeze & live BBQ view.</li>
                  <li><span className="font-semibold text-brand-brown-dark">Tables 11-12</span> inside the premium, cozy private lounge.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
