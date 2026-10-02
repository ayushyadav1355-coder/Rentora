import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Star, 
  RotateCcw, 
  ShoppingBag, 
  Check, 
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { Booking } from '../types';

interface ActiveRentalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCompleteHandover: (bookingId: string) => void;
  onReturnItem: (bookingId: string, feedback: { rating: number; tags: string[]; comment: string }) => void;
}

export const ActiveRentalsModal: React.FC<ActiveRentalsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCompleteHandover,
  onReturnItem,
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'returned'>('active');
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    bookings.length > 0 ? bookings[0].id : null
  );

  // Return & Feedback modal state
  const [isReturningBooking, setIsReturningBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [selectedFeedbackTags, setSelectedFeedbackTags] = useState<string[]>(['Mint Condition', 'Smooth Handover']);
  const [checklist, setChecklist] = useState({
    inspectedForDamage: true,
    allAccessoriesPacked: true,
    batteryCharged: true,
  });

  if (!isOpen) return null;

  const activeBookings = bookings.filter((b) => b.status === 'active');
  const returnedBookings = bookings.filter((b) => b.status === 'returned');
  const currentList = activeTab === 'active' ? activeBookings : returnedBookings;
  const currentSelectedBooking = bookings.find((b) => b.id === selectedBookingId) || currentList[0];

  const feedbackTagOptions = [
    'Mint Condition',
    'Smooth Handover',
    'Friendly Host',
    'Clean & Sanitized',
    'Saved Me Tons of $',
    'Great Battery Life',
  ];

  const toggleTag = (tag: string) => {
    if (selectedFeedbackTags.includes(tag)) {
      setSelectedFeedbackTags(selectedFeedbackTags.filter((t) => t !== tag));
    } else {
      setSelectedFeedbackTags([...selectedFeedbackTags, tag]);
    }
  };

  const handleFinalizeReturn = () => {
    if (!isReturningBooking) return;
    onReturnItem(isReturningBooking.id, {
      rating,
      tags: selectedFeedbackTags,
      comment: reviewComment || 'Great rental experience, equipment was flawless.',
    });
    setIsReturningBooking(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                My Rentals Dashboard (BorrowHub)
              </h2>
              <p className="text-xs text-slate-500">
                Step 3: Collect & Borrow · Step 4: Return on Time & Settle Escrow
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switchers: Active vs Past Returns */}
        <div className="flex border-b border-slate-200 px-6 bg-white">
          <button
            type="button"
            onClick={() => setActiveTab('active')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'active'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Active Rentals</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-teal-100 text-teal-800 font-mono">
              {activeBookings.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('returned')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'returned'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Past Returns & Reviews</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-600 font-mono">
              {returnedBookings.length}
            </span>
          </button>
        </div>

        {/* Content Body */}
        {currentList.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              {activeTab === 'active' ? 'No active rentals currently' : 'No past returns yet'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Explore the catalog to book your first laptop, bike, or camera!
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-teal-600 text-white text-xs font-semibold rounded-lg hover:bg-teal-700 transition-colors"
            >
              Browse Available Essentials
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
            
            {/* Left list of bookings */}
            <div className="md:col-span-4 border-r border-slate-200 p-4 space-y-2 bg-slate-50/50 max-h-[520px] overflow-y-auto">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-1 mb-1">
                Your Reservations
              </span>

              {currentList.map((booking) => {
                const isSelected = currentSelectedBooking?.id === booking.id;
                return (
                  <button
                    key={booking.id}
                    type="button"
                    onClick={() => setSelectedBookingId(booking.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-teal-500 shadow-sm ring-1 ring-teal-500/20'
                        : 'bg-white/80 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={booking.item.image}
                        alt={booking.item.title}
                        className="w-11 h-11 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div className="overflow-hidden flex-1">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {booking.item.title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {booking.startDate} to {booking.endDate} ({booking.days}d)
                        </div>
                        <div className="text-[10px] font-mono text-teal-700 font-semibold mt-0.5">
                          {booking.status === 'active' ? '● Borrow In Progress' : '✓ Returned & Settled'}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Details Panel: Step 3 (Borrow) & Step 4 (Return) */}
            {currentSelectedBooking && (
              <div className="md:col-span-8 p-6 space-y-6 max-h-[520px] overflow-y-auto">
                
                {/* Status Bar */}
                <div className="flex items-center justify-between bg-slate-900 text-white p-4 rounded-2xl">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400">
                      {currentSelectedBooking.status === 'active' ? 'Step 3: Collect & Use' : 'Step 4: Returned'}
                    </span>
                    <h3 className="text-base font-bold font-heading">
                      {currentSelectedBooking.item.title}
                    </h3>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Duration: {currentSelectedBooking.startDate} to {currentSelectedBooking.endDate} ({currentSelectedBooking.days} days)
                    </div>
                  </div>

                  {currentSelectedBooking.status === 'active' ? (
                    <button
                      type="button"
                      onClick={() => setIsReturningBooking(currentSelectedBooking)}
                      className="px-3.5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Initiate Return</span>
                    </button>
                  ) : (
                    <div className="px-3 py-1.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold rounded-lg flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Escrow Released</span>
                    </div>
                  )}
                </div>

                {/* Handover & Collection Instructions (Step 3: Borrow) */}
                {currentSelectedBooking.status === 'active' && (
                  <div className="border border-slate-200 rounded-2xl p-5 bg-teal-50/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
                        <QrCode className="w-4 h-4 text-teal-700" />
                        <span>Step 3: Handover & Collection Passcode</span>
                      </span>
                      <span className="text-xs font-mono font-semibold text-teal-800">
                        Hold: ${currentSelectedBooking.deposit} in Escrow
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-white rounded-xl border border-teal-200">
                      <div className="p-2.5 bg-slate-900 rounded-xl text-white shrink-0">
                        <QrCode className="w-16 h-16" />
                      </div>
                      <div className="space-y-1 text-center sm:text-left">
                        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          Pickup Verification Passcode
                        </div>
                        <div className="text-3xl font-mono font-extrabold text-teal-700 tracking-widest">
                          {currentSelectedBooking.pickupCode}
                        </div>
                        <p className="text-xs text-slate-600">
                          Enter this code at Rentora Smart Locker Hub or show to host{' '}
                          <strong>{currentSelectedBooking.item.owner.name}</strong> to unlock the gear.
                        </p>
                      </div>
                    </div>

                    {/* Collection Checklist */}
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-slate-700">
                        Pre-Usage Collection Checklist:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center gap-2">
                          <Check className="w-4 h-4 text-teal-600 shrink-0" />
                          <span>Check cosmetics</span>
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center gap-2">
                          <Check className="w-4 h-4 text-teal-600 shrink-0" />
                          <span>Power on & test</span>
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center gap-2">
                          <Check className="w-4 h-4 text-teal-600 shrink-0" />
                          <span>Confirm accessories</span>
                        </div>
                      </div>
                    </div>

                    {/* Address & Host Help */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-teal-200 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
                        <span>{currentSelectedBooking.item.pickupAddress}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                        <span>Pickup available 24/7</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Return Summary if already returned (Step 4: Return) */}
                {currentSelectedBooking.status === 'returned' && (
                  <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-4">
                    <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Post-Rental Settlement Completed</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      Item was returned on time and successfully inspected. Your{' '}
                      <strong>${currentSelectedBooking.deposit}.00</strong> security deposit was released back to your account without deductions.
                    </p>

                    {currentSelectedBooking.feedback && (
                      <div className="p-4 bg-white rounded-xl border border-emerald-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">Your Feedback:</span>
                          <div className="flex text-amber-400 text-xs">
                            {'★'.repeat(currentSelectedBooking.feedback.rating)}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {currentSelectedBooking.feedback.tags.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-medium rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-slate-600 italic">
                          "{currentSelectedBooking.feedback.comment}"
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Financial Summary */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Payment & Escrow Summary
                  </span>
                  <div className="flex justify-between text-slate-600">
                    <span>Base Duration ({currentSelectedBooking.days} days)</span>
                    <span className="font-mono">${currentSelectedBooking.baseTotal.toFixed(2)}</span>
                  </div>
                  {currentSelectedBooking.deliveryFee > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Delivery & Logistics Fee</span>
                      <span className="font-mono">${currentSelectedBooking.deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  {currentSelectedBooking.insuranceFee > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Rentora Care Protection</span>
                      <span className="font-mono">${currentSelectedBooking.insuranceFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Platform Service Fee</span>
                    <span className="font-mono">${currentSelectedBooking.serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-teal-900 font-bold border-t border-slate-200 pt-2">
                    <span>Security Deposit (Refundable)</span>
                    <span className="font-mono">${currentSelectedBooking.deposit.toFixed(2)}</span>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>

      {/* Return & Review Feedback Sub-Modal */}
      {isReturningBooking && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Step 4: Return & Leave Feedback
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsReturningBooking(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Return Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Return Inspection Checklist
              </span>
              <div className="space-y-1.5 text-xs text-slate-700">
                <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.inspectedForDamage}
                    onChange={(e) => setChecklist({ ...checklist, inspectedForDamage: e.target.checked })}
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span>No cosmetic damage or missing parts</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.allAccessoriesPacked}
                    onChange={(e) => setChecklist({ ...checklist, allAccessoriesPacked: e.target.checked })}
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span>All chargers, cables, and cases included</span>
                </label>

                <label className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.batteryCharged}
                    onChange={(e) => setChecklist({ ...checklist, batteryCharged: e.target.checked })}
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span>Battery charged to at least 20%</span>
                </label>
              </div>
            </div>

            {/* Rating Stars */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Rate your BorrowHub Experience
              </span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className="p-1 text-2xl hover:scale-110 transition-transform cursor-pointer"
                  >
                    <span className={s <= rating ? 'text-amber-400' : 'text-slate-300'}>★</span>
                  </button>
                ))}
                <span className="text-xs font-semibold text-slate-600 ml-2">
                  {rating === 5 ? 'Exceptional' : rating === 4 ? 'Great' : 'Good'}
                </span>
              </div>
            </div>

            {/* Feedback Tags */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Quick Compliments
              </span>
              <div className="flex flex-wrap gap-1.5">
                {feedbackTagOptions.map((tag) => {
                  const isSelected = selectedFeedbackTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-teal-600 text-white font-semibold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Written Comment */}
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Review & Note to Host
              </span>
              <textarea
                rows={2}
                placeholder="How was the equipment condition and handover?..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleFinalizeReturn}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Confirm Drop-Off & Release ${isReturningBooking.deposit} Escrow</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
