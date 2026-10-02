import React from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Recycle, 
  MapPin, 
  Building2, 
  Sparkles,
  ArrowUp
} from 'lucide-react';
import { CityHub } from '../types';

interface FooterProps {
  availableCities: CityHub[];
  onOpenB2B: () => void;
  onOpenHostPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  availableCities,
  onOpenB2B,
  onOpenHostPortal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Slide 8 Anchor Banner: Connect. Empower. Sustain. */}
        <div className="bg-gradient-to-r from-teal-900/60 via-slate-900 to-emerald-950/60 rounded-3xl p-8 sm:p-12 border border-slate-800 text-center mb-16 relative overflow-hidden">
          
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center mx-auto mb-4">
            <Recycle className="w-6 h-6 animate-spin-slow" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white mb-4">
            Connect. Empower. Sustain.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            BorrowHub makes renting everyday products simple and affordable, reducing unnecessary consumption while maximizing resource efficiency.
          </p>

          <div className="w-16 h-1 bg-teal-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* 4 Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 text-xs">
          
          {/* Col 1 & 2: Brand & Team */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white font-bold text-base">
                R
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-heading">
                Rentora
              </span>
              <span className="text-[10px] text-teal-400 font-semibold uppercase tracking-wider bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                BorrowHub
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Connecting temporary needs with verified local inventory. Borrow laptops, bikes, cameras, and project gear on demand.
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Hackathon Project · Team Maverick:
              </span>
              <div className="text-slate-300 font-medium">
                Yuvansh Sharma · Ayush Yadav · Utsav Singh · Utkarsh Tiwari
              </div>
            </div>
          </div>

          {/* Col 3: Browse by Category */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Everyday Categories
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#catalog" className="hover:text-white transition-colors">MacBooks & Laptops</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Electric Bikes & Scooters</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Mirrorless Cinema Cameras</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">4K Portable Displays</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Lightweight Travel Luggage</a></li>
            </ul>
          </div>

          {/* Col 4: Platform & Revenue */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Platform & Revenue
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button 
                  type="button" 
                  onClick={onOpenHostPortal}
                  className="hover:text-white transition-colors text-left"
                >
                  Monetize Idle Assets
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={onOpenHostPortal}
                  className="hover:text-white transition-colors text-left flex items-center gap-1"
                >
                  <span>Premium Listing Boosts</span>
                  <span className="text-[10px] text-amber-400 font-bold">New</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={onOpenB2B}
                  className="hover:text-white transition-colors text-left"
                >
                  B2B Rental Shop Fleet Program
                </button>
              </li>
              <li><a href="#impact" className="hover:text-white transition-colors">Circular Economy Metrics</a></li>
              <li><a href="#future-tech" className="hover:text-white transition-colors">AI & Biometric Tech</a></li>
            </ul>
          </div>

          {/* Col 5: Global Metro Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Active Metro Hubs
            </h4>
            <ul className="space-y-2 text-slate-400">
              {availableCities.slice(0, 5).map((hub) => (
                <li key={hub.id} className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-teal-400" />
                  <span>{hub.city} ({hub.activeItems} items)</span>
                </li>
              ))}
              <li><a href="#future-tech" className="text-teal-400 hover:underline">Vote for your city →</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Rentora / BorrowHub. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Escrow Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Host Guarantee Terms</span>
            <span className="hover:text-slate-400 cursor-pointer">B2B Merchant API</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
