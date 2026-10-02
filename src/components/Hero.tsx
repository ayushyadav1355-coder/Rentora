import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  GraduationCap, 
  Compass, 
  Briefcase, 
  Coins 
} from 'lucide-react';
import { UserSegment } from '../types';

interface HeroProps {
  onSearch: (query: string, category: string, city: string) => void;
  onSelectSegment: (segment: UserSegment) => void;
  onOpenAIRecommendations: () => void;
  selectedCity: string;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onSelectSegment,
  onOpenAIRecommendations,
  selectedCity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [cityInput, setCityInput] = useState(selectedCity);
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-04');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, searchCategory, cityInput);
    const element = document.getElementById('catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/40 via-white to-slate-50 pt-8 pb-16 md:pt-14 md:pb-24 border-b border-slate-200/80">
      
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-teal-200/20 via-emerald-100/30 to-sky-100/20 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subtitle & Hackathon Credit */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-teal-800 bg-teal-100/70 border border-teal-200/60 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
            <span>HACKATHON PROJECT · TEAM MAVERICK</span>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            <span>Yuvansh Sharma · Ayush Yadav · Utsav Singh · Utkarsh Tiwari</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Search Pilot */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 font-heading tracking-tight leading-[1.08] text-balance">
                Borrow. Use. Return.
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                A smart rental platform for everyday essentials. Access laptops, bikes, cameras, and project gear on demand without the heavy burden of ownership.
              </p>
            </div>

            {/* Travel Pilot Style Search Component */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/90">
              <form onSubmit={handleSearchSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3">
                  
                  {/* Field 1: What do you need? */}
                  <div className="sm:col-span-5 relative">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">
                      What are you looking for?
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl transition-colors focus-within:ring-2 focus-within:ring-teal-500 focus-within:bg-white">
                      <Search className="w-4 h-4 text-slate-400 shrink-0" />
                      <input
                        type="text"
                        placeholder="MacBook, E-Bike, Sony A7, Drone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Field 2: Metro Location */}
                  <div className="sm:col-span-4 relative">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">
                      City / Location
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl transition-colors focus-within:ring-2 focus-within:ring-teal-500 focus-within:bg-white">
                      <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                      <input
                        type="text"
                        placeholder="San Francisco, New York..."
                        value={cityInput}
                        onChange={(e) => setCityInput(e.target.value)}
                        className="w-full text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Field 3: Category */}
                  <div className="sm:col-span-3 relative">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">
                      Category
                    </label>
                    <div className="px-2 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl transition-colors focus-within:ring-2 focus-within:ring-teal-500 focus-within:bg-white">
                      <select
                        value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
                        className="w-full text-xs sm:text-sm font-medium text-slate-800 bg-transparent focus:outline-none cursor-pointer"
                      >
                        <option value="all">All Gear</option>
                        <option value="laptops">Laptops</option>
                        <option value="mobility">Bikes & Scooters</option>
                        <option value="cameras">Cameras</option>
                        <option value="tech">Tech & Work</option>
                        <option value="travel">Travel & Bags</option>
                      </select>
                    </div>
                  </div>

                </div>

                {/* Second row: Dates & Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-3 w-full sm:w-auto text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-semibold text-slate-700">Trip Dates:</span>
                      <span>Oct 1 – Oct 4 (3 days)</span>
                    </div>

                    <button
                      type="button"
                      onClick={onOpenAIRecommendations}
                      className="hidden md:flex items-center gap-1 text-teal-700 font-semibold hover:underline"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Need AI to match a kit?</span>
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-teal-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-100 cursor-pointer"
                  >
                    <span>Search Available Items</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Segment Filter Shortcuts */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Tailored Solutions for Your Profile:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => onSelectSegment('students')}
                  className="flex items-center gap-2 p-2.5 bg-white hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 rounded-xl transition-all text-left group"
                >
                  <div className="p-1.5 bg-emerald-100/80 rounded-lg text-emerald-800 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Students</div>
                    <div className="text-[10px] text-slate-500">Laptops & Gear</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectSegment('travelers')}
                  className="flex items-center gap-2 p-2.5 bg-white hover:bg-sky-50/60 border border-slate-200 hover:border-sky-300 rounded-xl transition-all text-left group"
                >
                  <div className="p-1.5 bg-sky-100/80 rounded-lg text-sky-800 group-hover:scale-105 transition-transform">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Travelers</div>
                    <div className="text-[10px] text-slate-500">Bikes & Mobility</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectSegment('professionals')}
                  className="flex items-center gap-2 p-2.5 bg-white hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-300 rounded-xl transition-all text-left group"
                >
                  <div className="p-1.5 bg-indigo-100/80 rounded-lg text-indigo-800 group-hover:scale-105 transition-transform">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Professionals</div>
                    <div className="text-[10px] text-slate-500">Agile Tech</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectSegment('owners')}
                  className="flex items-center gap-2 p-2.5 bg-white hover:bg-amber-50/60 border border-slate-200 hover:border-amber-300 rounded-xl transition-all text-left group"
                >
                  <div className="p-1.5 bg-amber-100/80 rounded-lg text-amber-800 group-hover:scale-105 transition-transform">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Item Owners</div>
                    <div className="text-[10px] text-slate-500">Earn Passive Income</div>
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset Showcase */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Decorative Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 group">
                <img
                  src="/src/assets/images/rentora_hero_gear_1790533235373.jpg"
                  alt="Everyday essentials available on Rentora: Laptops, bikes, and cameras"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Contrast Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                {/* Overlaid stats & badge */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold tracking-wider uppercase text-teal-300">
                      Verified Peer & Shop Network
                    </span>
                    <span className="text-xs font-mono font-medium text-slate-300">
                      100% Insured
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    Access premium hardware at 5% of retail price
                  </h3>
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/20 text-xs text-slate-300">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                      <span>Smart Deposit Protection</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Instant 24/7 Smart Lockers</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small floating badge */}
              <div className="absolute -bottom-4 -left-3 bg-white border border-slate-200 p-3 rounded-xl shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 font-bold">
                  $34
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">MacBook Pro M3 Max</div>
                  <div className="text-[11px] text-slate-500">Instead of $3,499 purchase</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
