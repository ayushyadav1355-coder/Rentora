import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Store, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  DollarSign, 
  TrendingDown, 
  ShieldAlert, 
  Layers, 
  Lock 
} from 'lucide-react';

interface RentVsBuyPreset {
  name: string;
  category: string;
  retailPrice: number;
  rentDailyRate: number;
  averageDaysNeeded: number;
}

const PRESETS: RentVsBuyPreset[] = [
  { name: 'MacBook Pro M3 Max', category: 'Laptop', retailPrice: 3499, rentDailyRate: 34, averageDaysNeeded: 4 },
  { name: 'Sony Alpha 7 IV Cinema Kit', category: 'Camera', retailPrice: 3198, rentDailyRate: 38, averageDaysNeeded: 3 },
  { name: 'Specialized E-Bike (City)', category: 'Mobility', retailPrice: 3250, rentDailyRate: 26, averageDaysNeeded: 3 },
  { name: 'DJI Mini 4 Pro Drone Combo', category: 'Drone', retailPrice: 1099, rentDailyRate: 29, averageDaysNeeded: 2 },
  { name: 'Dell 4K OLED Portable Monitor', category: 'Tech', retailPrice: 489, rentDailyRate: 14, averageDaysNeeded: 5 },
];

export const ProblemSolutionSection: React.FC = () => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [days, setDays] = useState(PRESETS[0].averageDaysNeeded);

  const preset = PRESETS[selectedPresetIndex];
  const rentalCost = preset.rentDailyRate * days;
  const upfrontBuyCost = preset.retailPrice;
  const moneySaved = upfrontBuyCost - rentalCost;
  const percentSaved = Math.round((moneySaved / upfrontBuyCost) * 100);

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Market Diagnosis
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-heading tracking-tight mt-3 text-balance">
            The Core Problem & Marketplace Gaps
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 text-balance">
            Consumers face heavy purchase burdens for temporary moments, while owners sit on thousands of dollars of idle gear with no secure way to monetize them.
          </p>
        </div>

        {/* 2-Column Comparison from Slide 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Consumer Pain Points */}
          <div className="p-8 rounded-2xl bg-rose-50/40 border border-rose-200/80 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-rose-100 text-rose-700 rounded-xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  Consumer Pain Points
                </h3>
                <p className="text-xs text-rose-700 font-medium">
                  What renters struggle with today
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white/90 rounded-xl border border-rose-100 flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    High-cost temporary needs
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    College students or creators frequently need top-tier cameras or compute power for a 3-day project, but are forced to buy at full retail price.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/90 rounded-xl border border-rose-100 flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Travelers lack local mobility
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Exploring new cities on foot is exhausting, traditional car rentals are bogged down in airport paperwork and parking nightmares, and rideshares drain travel budgets.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/90 rounded-xl border border-rose-100 flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Unnecessary purchase burdens
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Everyday essentials like camping gear, secondary monitors, or drones end up stored in closets 95% of the year, depreciating and accumulating dust.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Marketplace Gaps */}
          <div className="p-8 rounded-2xl bg-amber-50/40 border border-amber-200/80 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  Marketplace Gaps
                </h3>
                <p className="text-xs text-amber-800 font-medium">
                  Structural failures in the current ecosystem
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white/90 rounded-xl border border-amber-100 flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    No structured asset monetization
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Personal owners have zero streamlined platforms to safely lend out high-value equipment to verified users with insurance and identity protection.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/90 rounded-xl border border-amber-100 flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Fragmented rental categories
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Consumers must hunt across separate mom-and-pop camera shops, independent bike shops, and sketchy classified ads without unified standards or logistics.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/90 rounded-xl border border-amber-100 flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    High barriers to access
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Commercial rental houses demand huge security deposits matching the full gear price, 48-hour credit checks, and cumbersome physical contracts.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* How Rentora Bridges the Gap + Interactive Rent vs Buy Calculator */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-teal-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left explanation */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-500/20 text-teal-300 text-xs font-semibold rounded-full border border-teal-500/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>The Rentora Solution</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                Bridging the Gap: Peer-to-Peer + Verified Local Hubs
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Rentora bridges everyday consumer needs with neighborhood inventory. We unify laptops, bikes, cameras, and gear under one digital umbrella with smart deposit escrow, verified identity, and optional white-glove doorstep delivery.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-xl font-bold text-teal-400 font-mono">92%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Average savings vs retail purchase</div>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-xl font-bold text-emerald-400 font-mono">$850+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Avg monthly passive owner income</div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Rent vs Buy Calculator */}
            <div className="lg:col-span-6 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-teal-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                    Interactive Rent vs. Buy Calculator
                  </span>
                </div>
                <span className="text-xs text-slate-400">Live Calculation</span>
              </div>

              {/* Preset Selector */}
              <div className="space-y-3 mb-5">
                <label className="text-xs text-slate-300 font-medium">Select an essential:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {PRESETS.map((p, idx) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => {
                        setSelectedPresetIndex(idx);
                        setDays(p.averageDaysNeeded);
                      }}
                      className={`px-2.5 py-1.5 text-xs rounded-lg text-left transition-all truncate ${
                        selectedPresetIndex === idx
                          ? 'bg-teal-500 text-white font-bold shadow-sm'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {p.name.split('(')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Days Slider */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Rental Duration:</span>
                  <span className="font-bold text-teal-300 font-mono">{days} Day{days > 1 ? 's' : ''}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1 day</span>
                  <span>7 days</span>
                  <span>14 days</span>
                </div>
              </div>

              {/* Comparison Output */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-900/80 rounded-xl border border-white/10">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Buying New</span>
                  <div className="text-lg font-bold text-rose-300 font-mono mt-0.5 line-through decoration-rose-500">
                    ${upfrontBuyCost.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Full upfront capital + depreciation</span>
                </div>

                <div className="border-l border-white/10 pl-3">
                  <span className="text-[11px] text-teal-300 uppercase font-semibold">Rentora Cost</span>
                  <div className="text-2xl font-extrabold text-teal-400 font-mono mt-0.5">
                    ${rentalCost.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-teal-200 block mt-0.5">
                    Save ${moneySaved.toLocaleString()} ({percentSaved}%)
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
