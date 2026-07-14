import { MenuItem, Table } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // BBQ Section
  {
    id: 'bbq-1',
    name: 'Sizzling Beef Seekh Kabab',
    description: 'Four pieces of premium minced beef skewers seasoned with traditional Lahori hot spices and charcoal-grilled to tender perfection.',
    price: 1450,
    category: 'Sizzling BBQ',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    isPopular: true,
    isVegetarian: false,
    spiceLevelSupported: true
  },
  {
    id: 'bbq-2',
    name: 'Creamy Chicken Malai Boti',
    description: 'Eight pieces of boneless chicken cubes marinated in rich fresh cream, cheese, Greek yogurt, and white pepper, grilled over slow wood coals.',
    price: 1350,
    category: 'Sizzling BBQ',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    isPopular: true,
    isVegetarian: false,
    spiceLevelSupported: true
  },
  {
    id: 'bbq-3',
    name: 'Melt-in-mouth Reshmi Kabab',
    description: 'Four juicy chicken minced skewers prepared with fresh cream, coriander, and light green chili marinade, flame-broiled with butter.',
    price: 1250,
    category: 'Sizzling BBQ',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    isPopular: false,
    isVegetarian: false,
    spiceLevelSupported: true
  },
  {
    id: 'bbq-4',
    name: 'ZēGrill Royal BBQ Platter',
    description: 'A spectacular sharing feast including 2 Beef Seekh Kababs, 2 chicken Reshmi Kababs, 4 Chicken Malai Botis, 4 Fish Tikkas, served with hot naan and plum chutney.',
    price: 3450,
    category: 'Sizzling BBQ',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    isPopular: true,
    isVegetarian: false,
    spiceLevelSupported: true
  },

  // Nashta (Breakfast) Section
  {
    id: 'nashta-1',
    name: 'Shahi Lahori Nashta Platter',
    description: 'A rich platter of slow-simmered Lahori Channay (chickpeas), sweet saffron Suji Halwa, 2 freshly rolled crispy-fried Puris, spicy Aloo Bhujia, and homemade yogurt.',
    price: 1550,
    category: 'Nashta (Breakfast)',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    isPopular: true,
    isVegetarian: true,
    spiceLevelSupported: false
  },
  {
    id: 'nashta-2',
    name: 'Slow-Cooked Beef Nihari',
    description: 'Authentic 12-hour slow-cooked tender beef shank stew, served rich with gelatinous bone marrow broth, fresh ginger julienne, chopped chilies, and lemon.',
    price: 1390,
    category: 'Nashta (Breakfast)',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    isPopular: true,
    isVegetarian: false,
    spiceLevelSupported: true
  },
  {
    id: 'nashta-3',
    name: 'Desi Ghee Paratha & Omelette',
    description: 'Crispy layered flatbread made in premium pure Desi Ghee, paired with a spiced double egg omelette stuffed with onions, tomatoes, and green chilies.',
    price: 650,
    category: 'Nashta (Breakfast)',
    image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    isPopular: false,
    isVegetarian: false,
    spiceLevelSupported: true
  },

  // Karahi & Handi
  {
    id: 'karahi-1',
    name: 'ZēGrill Special Chicken Karahi',
    description: 'Traditional Lahori chicken cooked in an iron wok with vine-ripened tomatoes, ginger root, whole green chilies, and freshly roasted black peppercorns.',
    price: 1850,
    category: 'Karahi & Handi',
    image: 'https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    isPopular: true,
    isVegetarian: false,
    spiceLevelSupported: true
  },
  {
    id: 'karahi-2',
    name: 'Royal Mutton White Handi',
    description: 'Boneless tender lamb slow-simmered in a rich cream, white pepper, and cashew paste base inside a traditional clay handi. A royal Mughal delicacy.',
    price: 2450,
    category: 'Karahi & Handi',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    isPopular: false,
    isVegetarian: false,
    spiceLevelSupported: true
  },

  // Tandoor (Breads)
  {
    id: 'tandoor-1',
    name: 'Buttery Roghni Naan',
    description: 'Soft tandoori flatbread enriched with milk and egg, beautifully patterned, sprinkled with sesame seeds, and generously brushed with butter.',
    price: 120,
    category: 'Tandoor & Breads',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    isPopular: false,
    isVegetarian: true,
    spiceLevelSupported: false
  },
  {
    id: 'tandoor-2',
    name: 'Garlic Cheese Naan',
    description: 'Gourmet naan stuffed to the brim with premium melted Mozzarella, topped with roasted garlic flakes and fresh coriander butter.',
    price: 260,
    category: 'Tandoor & Breads',
    image: 'https://images.unsplash.com/photo-1573145959535-3c46753ea65f?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    isPopular: true,
    isVegetarian: true,
    spiceLevelSupported: false
  },

  // Beverages & Desserts
  {
    id: 'bev-1',
    name: 'Sweet Clay-Pot Lassi',
    description: 'Thick, hand-churned traditional Punjabi yogurt drink sweetened with rose-water, served ice cold in an authentic handcrafted clay glass.',
    price: 350,
    category: 'Beverages & Desserts',
    image: 'https://images.unsplash.com/photo-1571115177098-24ec4209e548?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    isPopular: true,
    isVegetarian: true,
    spiceLevelSupported: false
  },
  {
    id: 'bev-2',
    name: 'Shahi Zafrani Kheer',
    description: 'Traditional slow-boiled rice pudding flavored with pure saffron strands, green cardamom, and thickened milk, topped with almonds and pistachios.',
    price: 490,
    category: 'Beverages & Desserts',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    isPopular: false,
    isVegetarian: true,
    spiceLevelSupported: false
  },
  {
    id: 'bev-3',
    name: 'Peshawari Cardamom Kahwa',
    description: 'Traditional light green tea brewed with cardamom pods and mint leaves, served piping hot. The ultimate digestive aid.',
    price: 180,
    category: 'Beverages & Desserts',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    isPopular: false,
    isVegetarian: true,
    spiceLevelSupported: false
  }
];

export const INITIAL_TABLES: Table[] = [
  // Family Hall Area
  { id: 't-1', number: 1, capacity: 4, status: 'available', x: 20, y: 25 },
  { id: 't-2', number: 2, capacity: 4, status: 'available', x: 50, y: 25 },
  { id: 't-3', number: 3, capacity: 6, status: 'available', x: 80, y: 25 },
  { id: 't-4', number: 4, capacity: 8, status: 'reserved', x: 20, y: 65 },

  // Rooftop Grill Area
  { id: 't-5', number: 5, capacity: 2, status: 'available', x: 50, y: 65 },
  { id: 't-6', number: 6, capacity: 4, status: 'available', x: 80, y: 65 },
  { id: 't-7', number: 7, capacity: 4, status: 'available', x: 20, y: 105 },
  { id: 't-8', number: 8, capacity: 6, status: 'available', x: 50, y: 105 },

  // Private Lounge Area
  { id: 't-9', number: 9, capacity: 2, status: 'available', x: 80, y: 105 },
  { id: 't-10', number: 10, capacity: 4, status: 'reserved', x: 20, y: 145 },
  { id: 't-11', number: 11, capacity: 4, status: 'available', x: 50, y: 145 },
  { id: 't-12', number: 12, capacity: 8, status: 'available', x: 80, y: 145 }
];

export const TIME_SLOTS = [
  '12:00 PM - 01:30 PM',
  '01:30 PM - 03:00 PM',
  '03:00 PM - 04:30 PM',
  '07:00 PM - 08:30 PM',
  '08:30 PM - 10:00 PM',
  '10:00 PM - 11:30 PM',
  '11:30 PM - 01:00 AM'
];
