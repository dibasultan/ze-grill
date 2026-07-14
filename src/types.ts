export type DiningMode = 'dine-in' | 'drive-thru' | 'takeout' | 'delivery';

export type PaymentMethod = 'cash' | 'card' | 'bank-transfer';

export type OrderStatus = 'placed' | 'preparing' | 'ready-pickup' | 'out-for-delivery' | 'completed' | 'cancelled';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in PKR
  category: string;
  image: string;
  rating: number;
  isPopular: boolean;
  isVegetarian: boolean;
  spiceLevelSupported: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedSpiceLevel?: 'Mild' | 'Medium' | 'Sizzling';
  customInstructions?: string;
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: 'available' | 'reserved' | 'selected';
  x: number; // visual coordinates
  y: number;
}

export interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  tableNumber: number;
  area: 'Family Hall' | 'Rooftop Grill' | 'Private Lounge';
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  diningMode: DiningMode;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentDetails?: {
    cardLast4?: string;
    bankName?: string;
    isPaid: boolean;
  };
  customerDetails: {
    name: string;
    phone: string;
    email?: string;
  };
  vehicleDetails?: {
    make: string;
    color: string;
    plateNumber: string;
  };
  deliveryAddress?: string;
  tableNumber?: number;
  createdAt: string;
  etaMinutes: number;
  driverName?: string;
}
