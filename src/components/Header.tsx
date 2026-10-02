import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  PlusCircle, 
  MapPin, 
  ShieldCheck, 
  Compass, 
  RefreshCw,
  Building2,
  ChevronDown
} from 'lucide-react';
import { CityHub } from '../types';

interface HeaderProps {
  activeRentalsCount: number;
  onOpenActiveRentals: () => void;
  onOpenHostPortal: () => void;
  onOpenB2B: () => void;
  onOpenAIRecommendations: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  availableCities: CityHub[];
}

export const Header: React.FC<HeaderProps> = ({
  activeRentalsCount,
  onOpenActiveRentals,
  onOpenHostPortal,
  onOpenB2B,
  onOpenAIRecommendations,
  selectedCity,
  onSelectCity,
  availableCities,
}) => {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Zone 1: Brand Title (Strictly one text element wordmark with clean styling) */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-teal-500/20 group-hover:scale-105 transition-transform">
                R
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-heading leading-tight">
                  Rentora
                </span>
                <span className="text-[10px] font-medium text-teal-700 tracking-wider uppercase -mt-0.5">
                  by BorrowHub
                </span>
              </div>
            </a>

            {/* City Hub Switcher */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                title="Select active city hub"
              >
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>{selectedCity}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {cityDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setCityDropdownOpen(false)} 
                  />
                  <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      Active Metro Hubs
                    </div>
                    {availableCities.map((hub) => (
                      <button
                        key={hub.id}
                        type="button"
                        onClick={() => {
                          onSelectCity(hub.city);
                          setCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                          selectedCity === hub.city ? 'bg-teal-50/60 font-semibold text-teal-900' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span>{hub.city}</span>
                          <span className="text-[10px] text-slate-400">{hub.activeItems} items · {hub.lockersAndHubs} hubs</span>
                        </div>
                        {selectedCity === hub.city && (
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Zone 2: 4-6 Nav Links (Single line clean text links) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#catalog" className="hover:text-slate-900 transition-colors">
              Explore Gear
            </a>
            <a href="#workflow" className="hover:text-slate-900 transition-colors">
              How It Works
            </a>
            <a href="#segments" className="hover:text-slate-900 transition-colors">
              User Segments
            </a>
            <a href="#impact" className="hover:text-slate-900 transition-colors">
              Societal Impact
            </a>
            <a href="#future-tech" className="hover:text-slate-900 transition-colors flex items-center gap-1">
              <span>Future Tech</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            </a>
          </nav>

          {/* Zone 3: 1-2 Primary Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* AI Assistant Quick Match */}
            <button
              type="button"
              onClick={onOpenAIRecommendations}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100/80 border border-teal-200/80 rounded-lg transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Smart Match</span>
            </button>

            {/* My Active Rentals Button */}
            <button
              type="button"
              onClick={onOpenActiveRentals}
              className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-slate-600" />
              <span>My Rentals</span>
              {activeRentalsCount > 0 && (
                <span className="flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-teal-600 rounded-full">
                  {activeRentalsCount}
                </span>
              )}
            </button>

            {/* Host Portal Button */}
            <button
              type="button"
              onClick={onOpenHostPortal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Monetize Idle Gear</span>
              <span className="sm:hidden">Host</span>
            </button>

            {/* B2B Partnership Link */}
            <button
              type="button"
              onClick={onOpenB2B}
              className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="For local physical rental shops & fleets"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>B2B Partners</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
