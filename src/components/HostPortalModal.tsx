import React, { useState } from 'react';
import { 
  X, 
  Coins, 
  TrendingUp, 
  Sparkles, 
  PlusCircle, 
  DollarSign, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Store,
  Eye,
  Sliders
} from 'lucide-react';
import { OwnerListing, RentalItem } from '../types';

interface HostPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  listings: OwnerListing[];
  onTogglePremium: (id: string) => void;
  onAddNewListing: (newItem: Partial<RentalItem>) => void;
}

export const HostPortalModal: React.FC<HostPortalModalProps> = ({
  isOpen,
  onClose,
  listings,
  onTogglePremium,
  onAddNewListing,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'calculator' | 'new-item'>('dashboard');

  // Calculator states
  const [calcAsset, setCalcAsset] = useState<'camera' | 'laptop' | 'bike' | 'drone' | 'monitor'>('camera');
  const [calcDays, setCalcDays] = useState(8);

  const assetRates = {
    camera: { name: 'Full-Frame Cinema / Mirrorless Camera', dailyRate: 38, retail: 3200 },
    laptop: { name: 'High-End Workstation Laptop', dailyRate: 34, retail: 3500 },
    bike: { name: 'Commuter City E-Bike', dailyRate: 26, retail: 3000 },
    drone: { name: '4K Compact Aerial Drone', dailyRate: 29, retail: 1100 },
    monitor: { name: '4K Portable OLED Display', dailyRate: 14, retail: 490 },
  };

  const selectedAsset = assetRates[calcAsset];
  const grossMonthly = selectedAsset.dailyRate * calcDays;
  const platformFee = grossMonthly * 0.12; // 12% commission
  const netMonthly = grossMonthly - platformFee;
  const netAnnual = netMonthly * 12;

  // New Listing Form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'laptops' | 'mobility' | 'cameras' | 'tech' | 'travel'>('cameras');
  const [newBrand, setNewBrand] = useState('');
  const [newDailyRate, setNewDailyRate] = useState(25);
  const [newRetailPrice, setNewRetailPrice] = useState(900);
  const [newDeposit, setNewDeposit] = useState(80);
  const [newDescription, setNewDescription] = useState('');
  const [newPickupAddress, setNewPickupAddress] = useState('Rentora Locker Hub #1, Downtown');
  const [formSubmittedSuccess, setFormSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  // Financial aggregates
  const totalGross = listings.reduce((acc, l) => acc + l.grossRevenue, 0);
  const totalCommissions = listings.reduce((acc, l) => acc + l.commissionCut, 0);
  const totalNet = listings.reduce((acc, l) => acc + l.netEarnings, 0);
  const activeRentalsCount = listings.filter((l) => l.status === 'rented').length;

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddNewListing({
      title: newTitle,
      brand: newBrand || 'Custom Gear',
      category: newCategory,
      dailyRate: Number(newDailyRate),
      originalRetailPrice: Number(newRetailPrice),
      deposit: Number(newDeposit),
      description: newDescription || 'Well-maintained personal gear available for neighborhood rentals.',
      pickupAddress: newPickupAddress,
      condition: 'Excellent',
      deliveryAvailable: true,
      deliveryFee: 10,
      image: newCategory === 'cameras' 
        ? '/src/assets/images/rentora_hero_gear_1790533235373.jpg'
        : newCategory === 'mobility'
        ? '/src/assets/images/rentora_traveler_mobility_1790533252740.jpg'
        : '/src/assets/images/rentora_tech_professional_1790533265910.jpg',
      features: ['Verified hardware', 'Battery/charger included', 'Protective carry bag'],
      includedAccessories: ['Power cable', 'Protective travel sleeve'],
      targetSegments: ['students', 'professionals'],
      popularWith: 'Local community members seeking affordable short-term access',
      isPremiumListing: false,
    });

    setFormSubmittedSuccess(true);
    setTimeout(() => {
      setFormSubmittedSuccess(false);
      setActiveTab('dashboard');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-heading">
                  Host & Owner Portal
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded">
                  Monetize Idle Assets
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Turn your unused electronics and bikes into recurring passive income
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'dashboard'
                ? 'border-amber-600 text-amber-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Host Performance & Listings</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('calculator')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'calculator'
                ? 'border-amber-600 text-amber-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Passive Earnings Calculator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('new-item')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'new-item'
                ? 'border-amber-600 text-amber-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>List a New Item</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {/* TAB 1: Host Performance & Listings */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              
              {/* Revenue Streams Metric Cards (from Slide 5) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Revenue Streams & Commission Breakdown
                  </span>
                  <span className="text-xs text-slate-400">
                    Standard 12% Platform Take Rate
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase">Gross Revenue</span>
                    <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
                      ${totalGross.toFixed(2)}
                    </div>
                    <span className="text-[10px] text-slate-400">From 41 lifetime rental days</span>
                  </div>

                  {/* Transaction Commissions (Slide 5 line item) */}
                  <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-amber-800 uppercase">Transaction Commission</span>
                      <span className="text-[10px] font-bold text-amber-700 font-mono">12%</span>
                    </div>
                    <div className="text-2xl font-extrabold text-amber-900 font-mono mt-1">
                      -${totalCommissions.toFixed(2)}
                    </div>
                    <span className="text-[10px] text-amber-700">Platform insurance & escrow cut</span>
                  </div>

                  <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200">
                    <span className="text-[11px] font-semibold text-emerald-800 uppercase">Net Payout Received</span>
                    <div className="text-2xl font-extrabold text-emerald-700 font-mono mt-1">
                      ${totalNet.toFixed(2)}
                    </div>
                    <span className="text-[10px] text-emerald-600">Deposited to bank account</span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase">Active Rentals</span>
                    <div className="text-2xl font-extrabold text-teal-700 font-mono mt-1">
                      {activeRentalsCount} <span className="text-xs text-slate-400 font-normal">of {listings.length} listed</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Generating daily revenue</span>
                  </div>
                </div>
              </div>

              {/* Listings Table & Premium Upsell */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      Your Monetized Assets ({listings.length})
                    </h3>
                    <p className="text-xs text-slate-500">
                      Manage daily rates, review transaction history, and toggle Premium Listings.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('new-item')}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>List Another Item</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {listings.map((listing) => (
                    <div
                      key={listing.id}
                      className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">
                              {listing.title}
                            </h4>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              listing.status === 'rented'
                                ? 'bg-teal-100 text-teal-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {listing.status === 'rented' ? 'Currently Rented' : 'Available'}
                            </span>
                          </div>
                          
                          <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                            <span className="font-mono font-bold text-slate-800">${listing.dailyRate}/day</span>
                            <span>·</span>
                            <span>{listing.totalRentals} rentals</span>
                            <span>·</span>
                            <span className="text-emerald-700 font-semibold font-mono">
                              ${listing.netEarnings.toFixed(2)} earned
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Premium Visibility Upsell (from Slide 5) */}
                      <div className="flex items-center gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <button
                          type="button"
                          onClick={() => onTogglePremium(listing.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            listing.isPremium
                              ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                          }`}
                        >
                          <Sparkles className={`w-3.5 h-3.5 ${listing.isPremium ? 'text-amber-600' : 'text-slate-400'}`} />
                          <span>{listing.isPremium ? 'Premium Active (3x Views)' : 'Upgrade to Premium'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Asset Earnings Calculator */}
          {activeTab === 'calculator' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center space-y-1">
                <h3 className="text-2xl font-bold text-slate-900 font-heading">
                  Idle Asset Monetization Calculator
                </h3>
                <p className="text-xs text-slate-500">
                  Calculate how much your stored gear can earn when shared with verified renters.
                </p>
              </div>

              {/* Asset choice */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Select your gear type:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(Object.keys(assetRates) as Array<keyof typeof assetRates>).map((key) => {
                    const a = assetRates[key];
                    const isSelected = calcAsset === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setCalcAsset(key)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 shadow-sm'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900 truncate">{a.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">${a.dailyRate}/day avg</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Days Slider */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between text-xs text-slate-700">
                  <span className="font-semibold">Estimated Days Rented per Month:</span>
                  <span className="font-mono font-bold text-amber-800">{calcDays} Days</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="24"
                  value={calcDays}
                  onChange={(e) => setCalcDays(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Casual (2 days)</span>
                  <span>Weekend regular (8 days)</span>
                  <span>Heavy volume (24 days)</span>
                </div>
              </div>

              {/* Projection Card */}
              <div className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-amber-400">Projected Earnings</span>
                  <span className="text-xs text-slate-400">After 12% Platform Take Rate</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Monthly Net Income</span>
                    <div className="text-3xl font-extrabold text-amber-400 font-mono mt-1">
                      ${netMonthly.toFixed(2)}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Annual Passive Income</span>
                    <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">
                      ${netAnnual.toFixed(2)}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  In less than <strong>{Math.ceil(selectedAsset.retail / netMonthly)} months</strong>, your item completely pays for its original retail cost of ${selectedAsset.retail.toLocaleString()}!
                </p>

                <button
                  type="button"
                  onClick={() => setActiveTab('new-item')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all"
                >
                  List This Item on Rentora Now
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: List a New Item */}
          {activeTab === 'new-item' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  List Your Idle Equipment
                </h3>
                <p className="text-xs text-slate-500">
                  Items are immediately protected under the $1,000 Rentora Host Escrow Guarantee.
                </p>
              </div>

              {formSubmittedSuccess ? (
                <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">Item Successfully Listed!</h4>
                  <p className="text-xs text-slate-600">
                    Your listing is now live in the Rentora catalog. Renters in your area can now reserve it.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCreateListing} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Item Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Sony FX3 Cinema Camera Kit or Cannondale Topstone Bike"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Category
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      >
                        <option value="cameras">Cameras & Studio</option>
                        <option value="laptops">Laptops & Workstations</option>
                        <option value="mobility">Bikes & Scooters</option>
                        <option value="tech">Tech & Displays</option>
                        <option value="travel">Travel & Luggage</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Brand
                      </label>
                      <input
                        type="text"
                        placeholder="Sony, Apple, Specialized, etc."
                        value={newBrand}
                        onChange={(e) => setNewBrand(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Daily Rate ($)
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="200"
                        value={newDailyRate}
                        onChange={(e) => setNewDailyRate(Number(e.target.value))}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Original Retail ($)
                      </label>
                      <input
                        type="number"
                        min="50"
                        value={newRetailPrice}
                        onChange={(e) => setNewRetailPrice(Number(e.target.value))}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Security Deposit ($)
                      </label>
                      <input
                        type="number"
                        min="20"
                        value={newDeposit}
                        onChange={(e) => setNewDeposit(Number(e.target.value))}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Short Description & Included Items
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mention condition, accessories, battery health, and any guidelines..."
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Pickup Hub / Neighborhood Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Rentora Locker Hub #3 or Neighborhood street"
                      value={newPickupAddress}
                      onChange={(e) => setNewPickupAddress(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Publish Listing to Rentora Marketplace</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
