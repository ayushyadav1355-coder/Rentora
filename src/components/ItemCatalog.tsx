import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Star, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  Check, 
  ArrowUpDown,
  Zap,
  Store
} from 'lucide-react';
import { RentalItem, RentalCategory, UserSegment } from '../types';

interface ItemCatalogProps {
  items: RentalItem[];
  onSelectItem: (item: RentalItem) => void;
  selectedCity: string;
  activeSegmentFilter?: 'students' | 'travelers' | 'professionals' | null;
  onClearSegmentFilter?: () => void;
}

export const ItemCatalog: React.FC<ItemCatalogProps> = ({
  items,
  onSelectItem,
  selectedCity,
  activeSegmentFilter,
  onClearSegmentFilter,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<RentalCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(50);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlyPremium, setOnlyPremium] = useState(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Segment filter
      if (activeSegmentFilter && !item.targetSegments.includes(activeSegmentFilter)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesBrand = item.brand.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesDesc) return false;
      }

      // Max price
      if (item.dailyRate > maxPrice) {
        return false;
      }

      // Premium listing filter
      if (onlyPremium && !item.isPremiumListing) {
        return false;
      }

      // Dynamic discount filter
      if (onlyDiscounted && !item.dynamicPricing?.isDiscount) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.dailyRate - b.dailyRate;
      if (sortBy === 'price-desc') return b.dailyRate - a.dailyRate;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: premium listings prioritized
      if (a.isPremiumListing && !b.isPremiumListing) return -1;
      if (!a.isPremiumListing && b.isPremiumListing) return 1;
      return b.rating - a.rating;
    });
  }, [items, selectedCategory, activeSegmentFilter, searchQuery, maxPrice, sortBy, onlyPremium, onlyDiscounted]);

  return (
    <section id="catalog" className="py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span>Available in {selectedCity} & Local Hubs</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-950 font-heading tracking-tight">
              Verified Everyday Essentials
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Top-tier laptops, bikes, cameras, and agile equipment from verified owners and partner shops.
            </p>
          </div>

          {/* Active Segment Badge Dismissal if active */}
          {activeSegmentFilter && (
            <div className="flex items-center gap-2 p-2 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900">
              <span>Filtered by segment: <strong className="capitalize">{activeSegmentFilter}</strong></span>
              <button
                type="button"
                onClick={onClearSegmentFilter}
                className="px-2 py-0.5 bg-teal-200/80 hover:bg-teal-300 rounded font-semibold transition-colors"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Category Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'laptops', label: 'Laptops & Workstations' },
            { id: 'mobility', label: 'Bikes & Scooters' },
            { id: 'cameras', label: 'Cameras & Audio' },
            { id: 'tech', label: 'Tech & Displays' },
            { id: 'travel', label: 'Luggage & Travel' },
          ].map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as RentalCategory)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-teal-500 focus-within:bg-white transition-all">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search item name, brand, or specs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs font-medium text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Price Slider */}
            <div className="md:col-span-4">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span>Max Daily Rate:</span>
                <span className="font-mono font-bold text-slate-900">${maxPrice}/day</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="2"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="featured">Featured / Priority</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

          </div>

          {/* Quick Filter Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer hover:text-slate-900 select-none">
                <input
                  type="checkbox"
                  checked={onlyPremium}
                  onChange={(e) => setOnlyPremium(e.target.checked)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 h-3.5 w-3.5"
                />
                <span className="flex items-center gap-1 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Premium Verified Listings Only
                </span>
              </label>

              <label className="flex items-center gap-2 text-slate-600 cursor-pointer hover:text-slate-900 select-none">
                <input
                  type="checkbox"
                  checked={onlyDiscounted}
                  onChange={(e) => setOnlyDiscounted(e.target.checked)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 h-3.5 w-3.5"
                />
                <span className="font-medium text-emerald-700">
                  Off-Peak Campus Discounts
                </span>
              </label>
            </div>

            <div className="text-slate-400 text-xs">
              Showing <strong className="text-slate-700 font-mono">{filteredItems.length}</strong> items
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No items match your filters</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Try adjusting your max price slider, changing category, or resetting search keywords.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setMaxPrice(50);
                setOnlyPremium(false);
                setOnlyDiscounted(false);
                if (onClearSegmentFilter) onClearSegmentFilter();
              }}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Item Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Gradient Overlay for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                  {/* Top Tags - Zero Pill badge clutter, clean subtle indicators */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs">
                    {item.isPremiumListing ? (
                      <span className="px-2 py-0.5 bg-slate-900/90 backdrop-blur-sm text-amber-300 text-[10px] font-bold rounded flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Premium Pick</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-medium rounded">
                        {item.condition}
                      </span>
                    )}

                    {item.dynamicPricing && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold backdrop-blur-sm shadow-sm ${
                        item.dynamicPricing.isDiscount
                          ? 'bg-emerald-600/90 text-white'
                          : 'bg-amber-600/90 text-white'
                      }`}>
                        {item.dynamicPricing.label}
                      </span>
                    )}
                  </div>

                  {/* Location distance at bottom of image */}
                  <div className="absolute bottom-2 left-2.5 text-[11px] text-white/90 font-medium flex items-center gap-1 drop-shadow-sm">
                    <MapPin className="w-3 h-3 text-teal-300" />
                    <span>{item.location.neighborhood}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div className="space-y-2">
                    
                    {/* Unboxed clean metadata (Category · Brand) */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                      <span>{item.brand}</span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{item.category}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-slate-900 font-heading leading-snug line-clamp-2 group-hover:text-teal-700 transition-colors">
                      {item.title}
                    </h3>

                    {/* Host/Partner note */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                      {item.owner.isBusinessPartner ? (
                        <div className="flex items-center gap-1 text-slate-700 font-medium truncate">
                          <Store className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span className="truncate">{item.owner.partnerShopName}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-slate-600 truncate">
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span className="truncate">Host {item.owner.name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price Baseline & Rating */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-extrabold text-slate-950 font-mono tabular-nums">
                          ${item.dailyRate}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">/ day</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block -mt-0.5">
                        ${item.deposit} refundable deposit
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-800">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-mono">{item.rating}</span>
                      <span className="text-[10px] text-slate-400">({item.reviewCount})</span>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
