import React from 'react';
import { Search, Star, Flame, ShoppingCart, SlidersHorizontal, Info, Heart, ArrowUpDown, Sparkles } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { MENU_ITEMS } from '../data';

interface MenuSectionProps {
  onAddToCart: (cartItem: CartItem) => void;
}

export default function MenuSection({ onAddToCart }: MenuSectionProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [showOnlyVeg, setShowOnlyVeg] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<'rating' | 'price-asc' | 'price-desc'>('rating');

  // Customization Modal State
  const [selectedItemForModal, setSelectedItemForModal] = React.useState<MenuItem | null>(null);
  const [modalSpiceLevel, setModalSpiceLevel] = React.useState<'Mild' | 'Medium' | 'Sizzling'>('Medium');
  const [modalInstructions, setModalInstructions] = React.useState('');
  const [modalQuantity, setModalQuantity] = React.useState(1);

  const categories = ['All', 'Sizzling BBQ', 'Nashta (Breakfast)', 'Karahi & Handi', 'Tandoor & Breads', 'Beverages & Desserts'];

  // Filter items
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesVeg = !showOnlyVeg || item.isVegetarian;
    return matchesSearch && matchesCategory && matchesVeg;
  });

  // Sort items
  const sortedAndFilteredItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  const openCustomization = (item: MenuItem) => {
    setSelectedItemForModal(item);
    setModalSpiceLevel(item.spiceLevelSupported ? 'Medium' : 'Medium');
    setModalInstructions('');
    setModalQuantity(1);
  };

  const handleConfirmAddToCart = () => {
    if (!selectedItemForModal) return;
    
    onAddToCart({
      menuItem: selectedItemForModal,
      quantity: modalQuantity,
      selectedSpiceLevel: selectedItemForModal.spiceLevelSupported ? modalSpiceLevel : undefined,
      customInstructions: modalInstructions.trim() || undefined
    });
    
    setSelectedItemForModal(null);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="text-left space-y-1">
          <h2 className="font-serif text-3xl font-bold text-brand-brown-dark flex items-center gap-2">
            Explore Menu
            <Sparkles className="w-5 h-5 text-brand-amber animate-pulse" />
          </h2>
          <p className="text-sm text-brand-brown">
            Authentic charcoal recipes, fresh ingredients, and exceptional Lahori taste.
          </p>
        </div>

        {/* Sorting options */}
        <div className="flex items-center gap-2 self-start md:self-end">
          <ArrowUpDown className="w-4 h-4 text-brand-brown/80" />
          <span className="text-xs text-brand-brown font-medium">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-medium bg-brand-cream border border-brand-beige rounded-lg px-3 py-1.5 text-brand-brown-dark focus:outline-none focus:ring-1 focus:ring-brand-amber cursor-pointer"
          >
            <option value="rating">Top Rated (Default)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-brand-beige/30 p-4 rounded-2xl border border-brand-beige">
        {/* Search */}
        <div className="lg:col-span-5 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-brown/60" />
          <input
            type="text"
            placeholder="Search BBQ, Naan, Nashta platters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-brand-cream border border-brand-beige/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-brand-brown-dark focus:outline-none focus:ring-2 focus:ring-brand-amber/30 transition-all placeholder:text-brand-brown/50"
          />
        </div>

        {/* Veg Toggle */}
        <div className="lg:col-span-3 flex items-center justify-start lg:justify-center gap-3">
          <button
            onClick={() => setShowOnlyVeg(!showOnlyVeg)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all ${
              showOnlyVeg
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-brand-cream border-brand-beige text-brand-brown-dark hover:bg-brand-beige/50'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${showOnlyVeg ? 'bg-emerald-600' : 'bg-transparent border border-brand-brown'}`}></span>
            Show Vegetarian Only
          </button>
        </div>

        {/* Category list count */}
        <div className="lg:col-span-4 text-right hidden lg:block">
          <p className="text-xs text-brand-brown font-mono">
            Showing <span className="font-bold text-brand-amber">{sortedAndFilteredItems.length}</span> delicacies
          </p>
        </div>
      </div>

      {/* Categories Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 ${
              selectedCategory === cat
                ? 'bg-brand-brown-dark text-brand-cream shadow-sm'
                : 'bg-brand-beige/50 hover:bg-brand-beige text-brand-brown-dark border border-brand-beige/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of items */}
      {sortedAndFilteredItems.length === 0 ? (
        <div className="text-center py-16 bg-brand-cream border border-dashed border-brand-beige rounded-2xl space-y-2">
          <Info className="w-10 h-10 text-brand-brown/40 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-brand-brown-dark">No Delicacies Found</h3>
          <p className="text-xs text-brand-brown max-w-xs mx-auto">
            We couldn't find any items matching your filters. Try adjusting your search term or category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAndFilteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-brand-cream border border-brand-beige/70 hover:border-brand-brown-light/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group h-full text-left"
            >
              {/* Image Header with tags */}
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-beige">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Tags */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {item.isPopular && (
                    <span className="bg-brand-amber text-brand-cream px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-brand-cream" />
                      Popular
                    </span>
                  )}
                  {item.isVegetarian && (
                    <span className="bg-emerald-600 text-brand-cream px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      Veg
                    </span>
                  )}
                </div>

                {/* Rating badge */}
                <div className="absolute bottom-3 right-3 bg-brand-cream/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-brand-beige/50 flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span className="text-xs font-bold text-brand-brown-dark">{item.rating}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-brand-brown uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-brand-brown-dark leading-snug group-hover:text-brand-amber transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-brand-brown/90 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Card Footer Price & Buy */}
                <div className="flex items-center justify-between pt-2 border-t border-brand-beige/50">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-brand-brown font-medium block">Price</span>
                    <span className="font-mono text-lg font-bold text-brand-brown-dark">
                      Rs {item.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => openCustomization(item)}
                    className="flex items-center gap-1.5 bg-brand-amber hover:bg-brand-amber-dark text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm shadow-brand-amber/10 active:scale-95"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Order</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Customization & Add to Cart Modal */}
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-brand-cream w-full max-w-lg rounded-2xl overflow-hidden border border-brand-beige shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            {/* Header image */}
            <div className="relative h-44 shrink-0">
              <img
                src={selectedItemForModal.image}
                alt={selectedItemForModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <button
                onClick={() => setSelectedItemForModal(null)}
                className="absolute top-4 right-4 bg-brand-cream/20 backdrop-blur-md hover:bg-brand-cream text-brand-cream hover:text-brand-brown-dark p-1.5 rounded-full transition-all"
              >
                <span className="sr-only">Close</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="absolute bottom-4 left-4 text-left">
                <span className="text-[10px] font-mono bg-brand-amber text-brand-cream px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                  {selectedItemForModal.category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                  {selectedItemForModal.name}
                </h3>
              </div>
            </div>

            {/* Modal Body Scroll */}
            <div className="p-6 overflow-y-auto space-y-6 text-left flex-1">
              <p className="text-sm text-brand-brown-dark/95 leading-relaxed">
                {selectedItemForModal.description}
              </p>

              {/* Spice level options */}
              {selectedItemForModal.spiceLevelSupported && (
                <div className="space-y-3">
                  <label className="text-xs font-bold text-brand-brown-dark uppercase tracking-wider flex items-center gap-1">
                    <Flame className="w-4 h-4 text-brand-amber" />
                    Select Spice Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Mild', 'Medium', 'Sizzling'] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setModalSpiceLevel(level)}
                        className={`py-3 px-4 rounded-xl border text-xs font-bold text-center transition-all ${
                          modalSpiceLevel === level
                            ? 'bg-brand-amber/10 border-brand-amber text-brand-amber'
                            : 'bg-brand-cream border-brand-beige text-brand-brown hover:bg-brand-beige/50'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Special instructions */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-brand-brown-dark uppercase tracking-wider block">
                  Cooking Instructions (Optional)
                </label>
                <textarea
                  placeholder="E.g., Make it extra juicy, separate mint chutney, less spicy..."
                  value={modalInstructions}
                  onChange={(e) => setModalInstructions(e.target.value)}
                  rows={2}
                  className="w-full bg-brand-cream border border-brand-beige rounded-xl p-3 text-xs text-brand-brown-dark focus:outline-none focus:ring-1 focus:ring-brand-amber placeholder:text-brand-brown/50"
                />
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between bg-brand-beige/30 p-4 rounded-xl border border-brand-beige">
                <div className="text-left">
                  <span className="text-xs font-bold text-brand-brown-dark block">Quantity</span>
                  <span className="text-[10px] text-brand-brown">Add multiple to share</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                    className="w-9 h-9 rounded-lg bg-brand-cream border border-brand-beige text-brand-brown-dark font-bold flex items-center justify-center hover:bg-brand-beige hover:border-brand-brown-light transition-all cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-mono text-base font-bold text-brand-brown-dark w-6 text-center">
                    {modalQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setModalQuantity(modalQuantity + 1)}
                    className="w-9 h-9 rounded-lg bg-brand-cream border border-brand-beige text-brand-brown-dark font-bold flex items-center justify-center hover:bg-brand-beige hover:border-brand-brown-light transition-all cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-brand-beige border-t border-brand-beige/80 shrink-0 flex items-center justify-between">
              <div className="text-left pl-2">
                <span className="text-[10px] text-brand-brown font-medium block">Total Price</span>
                <span className="font-mono text-lg font-bold text-brand-brown-dark">
                  Rs {(selectedItemForModal.price * modalQuantity).toLocaleString()}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedItemForModal(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-brand-brown-dark hover:bg-brand-brown-light/20 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAddToCart}
                  className="bg-brand-amber hover:bg-brand-amber-dark text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-brand-amber/10"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
