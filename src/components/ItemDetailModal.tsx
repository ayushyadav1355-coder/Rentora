import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  Calendar, 
  CheckCircle, 
  Sparkles, 
  Info, 
  Lock, 
  Store, 
  ArrowRight,
  Shield,
  Clock
} from 'lucide-react';
import { RentalItem, Booking } from '../types';

interface ItemDetailModalProps {
  item: RentalItem | null;
  onClose: () => void;
  onConfirmBooking: (newBooking: Booking) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onConfirmBooking,
}) => {
  if (!item) return null;

  // Booking form states
  const [startDate, setStartDate] = useState('2026-10-02');
  const [endDate, setEndDate] = useState('2026-10-05');
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate rental duration in days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.max(end.getTime() - start.getTime(), 1000 * 60 * 60 * 24);
  const days = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  // Pricing calculations
  const dailyRate = item.dailyRate;
  const baseTotal = dailyRate * days;
  const deliveryFee = deliveryType === 'delivery' ? item.deliveryFee : 0;
  const insuranceFee = includeInsurance ? 4.5 * days : 0;
  const serviceFee = Math.round(baseTotal * 0.1 * 100) / 100;
  const deposit = item.deposit;
  const grandTotal = Math.round((baseTotal + deliveryFee + insuranceFee + serviceFee + deposit) * 100) / 100;

  // Handle Checkout submission
  const handleProceedToBook = () => {
    setIsSubmitting(true);
    
    // Generate a random 6-digit handover passcode
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    const formattedCode = `${randomCode.slice(0, 3)}-${randomCode.slice(3)}`;

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      item,
      startDate,
      endDate,
      days,
      baseTotal,
      deliveryType,
      deliveryFee,
      insuranceSelected: includeInsurance,
      insuranceFee,
      serviceFee,
      deposit,
      grandTotal,
      status: 'active',
      pickupCode: formattedCode,
      qrCodeData: `RENTORA-ESCROW-${item.id}-${Date.now()}`,
      bookedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      handoverCompleted: false,
      inspectionChecklist: {
        cosmeticsChecked: false,
        powerChecked: false,
        accessoriesConfirmed: false,
      },
      returnChecklist: {
        inspectedForDamage: false,
        allAccessoriesPacked: false,
        batteryCharged: false,
      },
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onConfirmBooking(newBooking);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition-colors shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left Column: Media & Specifications */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            
            {/* Main Visual */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-sm text-white text-xs font-semibold rounded-md">
                  Condition: {item.condition}
                </span>
                {item.isPremiumListing && (
                  <span className="px-2.5 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-md flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Premium Listing</span>
                  </span>
                )}
              </div>
            </div>

            {/* Title & Brand */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700">
                <span>{item.brand}</span>
                <span>·</span>
                <span className="capitalize">{item.category}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-heading mt-1 leading-snug">
                {item.title}
              </h2>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
                <div className="flex items-center gap-1 font-semibold text-slate-900">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{item.rating}</span>
                  <span className="text-slate-400 font-normal">({item.reviewCount} reviews)</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  <span>{item.location.neighborhood} ({item.location.city})</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                About this item
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Key Specifications & Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {item.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-150">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included Accessories */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Included in the Box / Bundle
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {item.includedAccessories.map((acc, aIdx) => (
                  <span key={aIdx} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                    + {acc}
                  </span>
                ))}
              </div>
            </div>

            {/* Host Profile */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm shadow-sm overflow-hidden">
                  {item.owner.avatar ? (
                    <img src={item.owner.avatar} alt={item.owner.name} className="w-full h-full object-cover" />
                  ) : (
                    item.owner.name[0]
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {item.owner.isBusinessPartner ? item.owner.partnerShopName : item.owner.name}
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {item.owner.completedRentals} successful rentals · Replies in {item.owner.responseTime}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-semibold text-teal-800 bg-teal-100/80 px-2.5 py-1 rounded-md">
                  Verified Local Partner
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Booking Engine & Monetization Line Items */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-50 flex flex-col justify-between">
            
            <div className="space-y-6">
              
              {/* Daily Rate & Dynamic Pricing notice */}
              <div className="flex items-baseline justify-between border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-950 font-mono">
                      ${dailyRate}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">/ day</span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Retail value: ${item.originalRetailPrice.toLocaleString()}
                  </span>
                </div>

                {item.dynamicPricing && (
                  <div className={`text-right px-2.5 py-1 rounded-lg text-xs font-bold ${
                    item.dynamicPricing.isDiscount
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-100 text-amber-900 border border-amber-200'
                  }`}>
                    <div>{item.dynamicPricing.label}</div>
                    <span className="text-[10px] font-normal opacity-80">Dynamic algorithm rate</span>
                  </div>
                )}
              </div>

              {/* Date Selection (Step 2: Book) */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                  Select Rental Duration
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Start Date</span>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer mt-0.5"
                    />
                  </div>

                  <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Return Date</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer mt-0.5"
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 px-1">
                  <span>Selected duration:</span>
                  <span className="font-bold text-slate-800 font-mono">{days} day{days > 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Delivery Options (Slide 5: Optional Delivery & Pickup Fees) */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                  Handover & Logistics Method
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <label
                    onClick={() => setDeliveryType('pickup')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      deliveryType === 'pickup'
                        ? 'bg-teal-50/70 border-teal-500 shadow-sm'
                        : 'bg-white border-slate-200 hover:bg-slate-100/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        deliveryType === 'pickup' ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'
                      }`}>
                        {deliveryType === 'pickup' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          24/7 Smart Locker / Host Hub Pickup
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {item.pickupAddress}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">FREE</span>
                  </label>

                  <label
                    onClick={() => setDeliveryType('delivery')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      deliveryType === 'delivery'
                        ? 'bg-teal-50/70 border-teal-500 shadow-sm'
                        : 'bg-white border-slate-200 hover:bg-slate-100/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        deliveryType === 'delivery' ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'
                      }`}>
                        {deliveryType === 'delivery' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-teal-600" />
                          <span>Platform White-Glove Delivery & Pickup</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Delivered to hotel or doorstep & collected post-rental
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900 font-mono">+${item.deliveryFee}.00</span>
                  </label>
                </div>
              </div>

              {/* Damage Protection Option */}
              <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id="insurance"
                    checked={includeInsurance}
                    onChange={(e) => setIncludeInsurance(e.target.checked)}
                    className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 h-4 w-4 cursor-pointer"
                  />
                  <label htmlFor="insurance" className="cursor-pointer">
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-teal-600" />
                      <span>Rentora Care Protection</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Covers accidental drops, spills, and screen damage ($0 deductible)
                    </div>
                  </label>
                </div>
                <span className="text-xs font-bold font-mono text-slate-800">
                  +$4.50/day
                </span>
              </div>

              {/* Itemized Price Breakdown (Monetization UI) */}
              <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>${dailyRate} × {days} days base rental</span>
                  <span className="font-mono text-slate-900">${baseTotal.toFixed(2)}</span>
                </div>

                {deliveryFee > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Doorstep Delivery & Pickup Fee</span>
                    <span className="font-mono text-slate-900">${deliveryFee.toFixed(2)}</span>
                  </div>
                )}

                {insuranceFee > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Rentora Care Protection ({days} days)</span>
                    <span className="font-mono text-slate-900">${insuranceFee.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Platform Trust & Guarantee (10%)</span>
                  <span className="font-mono text-slate-900">${serviceFee.toFixed(2)}</span>
                </div>

                {/* Refundable Security Deposit */}
                <div className="flex justify-between text-teal-900 font-semibold bg-teal-50 p-2 rounded-lg border border-teal-200/80">
                  <div className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-teal-600" />
                    <span>Refundable Security Deposit</span>
                  </div>
                  <span className="font-mono">${deposit.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-slate-400 italic">
                  * Deposit is placed on hold and released immediately upon return verification.
                </p>
              </div>

            </div>

            {/* Bottom Checkout CTA */}
            <div className="pt-6 border-t border-slate-200 mt-6 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Total Due Today
                  </span>
                  <div className="text-[11px] text-slate-400">
                    Includes refundable ${deposit} deposit
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-slate-950 font-mono">
                  ${grandTotal.toFixed(2)}
                </div>
              </div>

              <button
                type="button"
                onClick={handleProceedToBook}
                disabled={isSubmitting}
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-teal-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-100 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Securing Rental Escrow...</span>
                ) : (
                  <>
                    <span>Confirm & Reserve Item</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Zero cancellation penalty up to 24h before pickup</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
