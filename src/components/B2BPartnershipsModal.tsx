import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Store, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  DollarSign, 
  Users, 
  Bike 
} from 'lucide-react';

interface B2BPartnershipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const B2BPartnershipsModal: React.FC<B2BPartnershipsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [shopName, setShopName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Bicycles & E-Bikes');
  const [fleetSize, setFleetSize] = useState('15-50 items');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // keep success visible
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-heading">
                  B2B Partnerships for Physical Rental Shops
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-teal-500 text-slate-950 px-2 py-0.5 rounded">
                  Revenue Stream
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Plug your brick-and-mortar rental fleet into Rentora’s global demand network
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

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Proposition Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-2">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Instant Online Bookings</h4>
              <p className="text-[11px] text-slate-500">
                Convert walk-ins to digital repeat customers with 24/7 online reservations.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Zero Credit Card Chargebacks</h4>
              <p className="text-[11px] text-slate-500">
                Rentora manages biometric identity verification and automated damage escrows.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center mb-2">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Campus & Tourist Reach</h4>
              <p className="text-[11px] text-slate-500">
                Access incoming travelers, remote professionals, and college students directly.
              </p>
            </div>
          </div>

          {/* Active Partner Spotlight */}
          <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Featured Partner: Marina Velocity Bike Rentals</h4>
                <p className="text-[11px] text-slate-600">
                  "Connected our 35 Specialized E-bikes to Rentora and saw our monthly rental utilization jump from 42% to 88%!"
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-teal-800 shrink-0 hidden sm:inline">
              +110% Revenue
            </span>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-slate-900">Partnership Application Received!</h4>
              <p className="text-xs text-slate-600">
                Our B2B Merchant Fleet team will contact <strong>{email}</strong> within 24 hours to sync your physical rental shop catalog.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-slate-200">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Apply for B2B Shop Merchant Integration
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Shop / Company Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Downtown Camera Exchange"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Owner / Manager Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="partner@yourshop.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Primary Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value="Bicycles & E-Bikes">Bicycles & E-Bikes</option>
                    <option value="Cameras & Video Gear">Cameras & Video Gear</option>
                    <option value="Audio & Event Equipment">Audio & Event Equipment</option>
                    <option value="Computers & Electronics">Computers & Electronics</option>
                    <option value="Outdoor & Camping Gear">Outdoor & Camping Gear</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Fleet Size
                  </label>
                  <select
                    value={fleetSize}
                    onChange={(e) => setFleetSize(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    <option value="1-15 items">1 - 15 items</option>
                    <option value="15-50 items">15 - 50 items</option>
                    <option value="50-200 items">50 - 200 items</option>
                    <option value="200+ fleet">200+ fleet units</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Submit Partner Integration Request</span>
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
