import React, { useState } from 'react';
import { 
  Users, 
  Coins, 
  Globe2, 
  Leaf, 
  Recycle, 
  HeartHandshake, 
  TrendingUp, 
  Sparkles,
  TreePine,
  DollarSign
} from 'lucide-react';

export const SocietalBenefitsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'renters' | 'owners' | 'society'>('all');
  const [simulatedRentalsCount, setSimulatedRentalsCount] = useState(25);

  // Dynamic environmental & financial math
  const eWastePreventedKg = (simulatedRentalsCount * 1.8).toFixed(1);
  const co2AvoidedKg = Math.round(simulatedRentalsCount * 16.4);
  const capitalSavedDollars = (simulatedRentalsCount * 285).toLocaleString();
  const treesEquivalent = Math.round(simulatedRentalsCount * 0.7);

  return (
    <section id="impact" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Societal Benefits & Tri-Party Value
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-heading tracking-tight mt-3 text-balance">
            Creating Measurable Value for Renters, Owners, & Planet
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-2 text-balance">
            BorrowHub isn’t just a rental platform—it is a circular engine maximizing the utility of every manufactured product.
          </p>
        </div>

        {/* 3 Core Beneficiary Cards from Slide 6 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Renters */}
          <div className="p-8 rounded-3xl bg-sky-50/40 border border-sky-200/80 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                  Target Beneficiary
                </span>
                <h3 className="text-2xl font-extrabold text-slate-950 font-heading mt-0.5">
                  Renters
                </h3>
              </div>
              <p className="text-sm font-semibold text-sky-950 leading-snug">
                Affordable temporary access & unparalleled convenience.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-sky-100">
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 font-bold">✓</span>
                  <span>Avoid $3,000+ purchases for temporary project needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 font-bold">✓</span>
                  <span>Zero maintenance, storage, or depreciation worries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 font-bold">✓</span>
                  <span>Instant 24/7 access to top-tier hardware in any city</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-sky-200/60 text-xs font-mono text-sky-800 font-semibold">
              Up to 95% capital savings
            </div>
          </div>

          {/* Card 2: Owners */}
          <div className="p-8 rounded-3xl bg-amber-50/40 border border-amber-200/80 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Asset Holders
                </span>
                <h3 className="text-2xl font-extrabold text-slate-950 font-heading mt-0.5">
                  Owners
                </h3>
              </div>
              <p className="text-sm font-semibold text-amber-950 leading-snug">
                Passive income generation from otherwise idle goods.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-amber-100">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>Turn dormant cameras and bikes into $400 - $1,200/mo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>Full protection via escrow deposits & $1,000 guarantee</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>Verified digital identities & contactless smart lockers</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-amber-200/60 text-xs font-mono text-amber-800 font-semibold">
              Average 3.5-month asset payback
            </div>
          </div>

          {/* Card 3: Society */}
          <div className="p-8 rounded-3xl bg-emerald-50/40 border border-emerald-200/80 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Global Impact
                </span>
                <h3 className="text-2xl font-extrabold text-slate-950 font-heading mt-0.5">
                  Society
                </h3>
              </div>
              <p className="text-sm font-semibold text-emerald-950 leading-snug">
                Promotes sharing, reuse, and long-term sustainability.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-emerald-100">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Reduces carbon-heavy manufacturing & e-waste landfills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Democratizes access to creative and professional tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Builds interconnected, collaborative neighborhood networks</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-200/60 text-xs font-mono text-emerald-800 font-semibold">
              Circular Economy Certified
            </div>
          </div>

        </div>

        {/* Interactive Sustainability Impact Simulator */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual & Context */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-slate-800">
                <img
                  src="/src/assets/images/rentora_sustainability_sharing_1790533277946.jpg"
                  alt="Sustainable sharing economy in action"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-200">
                  "Every rental avoids one unnecessary factory production cycle."
                </div>
              </div>
            </div>

            {/* Live Interactive Simulator */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400">
                  <Recycle className="w-4 h-4" />
                  <span>Circular Impact Simulator</span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-white mt-1">
                  Simulate Community Borrowing Impact
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust the monthly rental transactions slider to see tangible resource savings.
                </p>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Community Transactions:</span>
                  <span className="font-mono font-bold text-teal-400">{simulatedRentalsCount} rentals / month</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={simulatedRentalsCount}
                  onChange={(e) => setSimulatedRentalsCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Micro-hub (5)</span>
                  <span>Neighborhood (50)</span>
                  <span>Full City Corridor (100)</span>
                </div>
              </div>

              {/* Metrics Display Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">E-Waste Diverted</span>
                  <div className="text-xl font-bold text-teal-400 font-mono mt-0.5">
                    {eWastePreventedKg} kg
                  </div>
                  <span className="text-[10px] text-slate-500">Toxic scrap avoided</span>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">CO2 Averted</span>
                  <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
                    {co2AvoidedKg} kg
                  </div>
                  <span className="text-[10px] text-slate-500">Manufacturing emissions</span>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Dollars Saved</span>
                  <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">
                    ${capitalSavedDollars}
                  </div>
                  <span className="text-[10px] text-slate-500">Retained in wallet</span>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Tree Equivalent</span>
                  <div className="text-xl font-bold text-sky-400 font-mono mt-0.5">
                    {treesEquivalent} trees
                  </div>
                  <span className="text-[10px] text-slate-500">Annual carbon capture</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
