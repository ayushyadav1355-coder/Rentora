import React, { useState } from 'react';
import { 
  GraduationCap, 
  Compass, 
  Briefcase, 
  Coins, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Laptop, 
  Camera, 
  Bike, 
  Luggage, 
  Monitor 
} from 'lucide-react';
import { UserSegment } from '../types';

interface SegmentSectionProps {
  onSelectSegmentFilter: (segment: 'students' | 'travelers' | 'professionals') => void;
  onOpenHostPortal: () => void;
}

export const SegmentSection: React.FC<SegmentSectionProps> = ({
  onSelectSegmentFilter,
  onOpenHostPortal,
}) => {
  const [activeSegment, setActiveSegment] = useState<UserSegment>('students');

  return (
    <section id="segments" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Target User Segments
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-heading tracking-tight mt-3">
            Tailored Rental Solutions for Every Journey
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-2">
            Whether you are on a semester deadline, navigating a new city, or monetizing idle hardware at home.
          </p>
        </div>

        {/* 4 Segment Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          <button
            type="button"
            onClick={() => setActiveSegment('students')}
            className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
              activeSegment === 'students'
                ? 'bg-emerald-50/70 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-xl ${
                activeSegment === 'students' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-900 font-heading">
                College Students
              </span>
            </div>
            <p className="text-xs text-slate-500 line-clamp-2">
              Laptops, cameras, and project gear without heavy capital investment.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveSegment('travelers')}
            className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
              activeSegment === 'travelers'
                ? 'bg-sky-50/70 border-sky-500 shadow-md ring-2 ring-sky-500/20'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-xl ${
                activeSegment === 'travelers' ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-900 font-heading">
                Travelers
              </span>
            </div>
            <p className="text-xs text-slate-500 line-clamp-2">
              Bikes, scooters, luggage for convenient local mobility on demand.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveSegment('professionals')}
            className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
              activeSegment === 'professionals'
                ? 'bg-indigo-50/70 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-xl ${
                activeSegment === 'professionals' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-900 font-heading">
                Professionals
              </span>
            </div>
            <p className="text-xs text-slate-500 line-clamp-2">
              Temporary electronics and agile tech solutions for remote work or trips.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveSegment('owners')}
            className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
              activeSegment === 'owners'
                ? 'bg-amber-50/70 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-xl ${
                activeSegment === 'owners' ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                <Coins className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-900 font-heading">
                Item Owners
              </span>
            </div>
            <p className="text-xs text-slate-500 line-clamp-2">
              Monetizing idle assets and turning unused products into reliable passive income.
            </p>
          </button>
        </div>

        {/* Dynamic Detailed Showcase for Selected Segment */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200">
          
          {/* Segment 1: College Students */}
          {activeSegment === 'students' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md">
                  <GraduationCap className="w-4 h-4" />
                  <span>College Students & Campus Innovators</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 font-heading">
                  High-End Project Gear Without Heavy Capital Investment
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Never let budget hold back your portfolio, capstone project, or film shoot. Access MacBook M3 editing rigs, cinema cameras, gimbals, and graphing devices for just a weekend or exam week.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Laptops, cameras, and audio gear</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Zero upfront purchase burden</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Verified .edu discount programs</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Campus locker hub pick-up</span>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectSegmentFilter('students');
                      const el = document.getElementById('catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl flex items-center gap-2 shadow-sm transition-all"
                  >
                    <span>Browse Student Gear in Catalog</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white p-4">
                  <img
                    src="/src/assets/images/rentora_sustainability_sharing_1790533277946.jpg"
                    alt="Students borrowing creative project gear"
                    referrerPolicy="no-referrer"
                    className="w-full h-56 object-cover rounded-xl mb-4"
                  />
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="font-semibold text-slate-900">Featured Student Bundle:</span>
                    <span className="font-mono text-emerald-700 font-bold">$38/weekend</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Sony Alpha Cinema Body + Wireless Lavalier Mic + Tripod.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Segment 2: Travelers */}
          {activeSegment === 'travelers' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded-md">
                  <Compass className="w-4 h-4" />
                  <span>Travelers & Explorers</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 font-heading">
                  Convenient Local Mobility and Travel Essentials On Demand
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Skip high rental car deposits, parking stress, and expensive taxi rides. Grab a premium e-bike, long-range scooter, or lightweight Rimowa cabin bag directly at your destination.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-sky-600" />
                    <span>Specialized & Ninebot electric mobility</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-sky-600" />
                    <span>Hardshell carry-on suitcases on demand</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-sky-600" />
                    <span>Action cams & portable 5G hotspots</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-sky-600" />
                    <span>Locker pods near major transit hubs</span>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectSegmentFilter('travelers');
                      const el = document.getElementById('catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm rounded-xl flex items-center gap-2 shadow-sm transition-all"
                  >
                    <span>Browse Mobility & Travel Gear</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white p-4">
                  <img
                    src="/src/assets/images/rentora_traveler_mobility_1790533252740.jpg"
                    alt="Traveler with city e-bike"
                    referrerPolicy="no-referrer"
                    className="w-full h-56 object-cover rounded-xl mb-4"
                  />
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="font-semibold text-slate-900">Featured Mobility Kit:</span>
                    <span className="font-mono text-sky-700 font-bold">$26/day</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Specialized Turbo Vado 4.0 + MIPS Helmet + Kryptonite U-Lock.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Segment 3: Working Professionals */}
          {activeSegment === 'professionals' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-md">
                  <Briefcase className="w-4 h-4" />
                  <span>Working Professionals & Remote Road Warriors</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 font-heading">
                  Temporary Electronics & Agile Tech Solutions
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Travelling for a conference, client presentation, or emergency sprint? Equip yourself with portable 4K monitors, studio microphones, noise-canceling headsets, and backup MacBooks.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-indigo-600" />
                    <span>Single-cable 4K OLED portable displays</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-indigo-600" />
                    <span>MacBook Pro M3 Max workstation compute</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-indigo-600" />
                    <span>Noise cancelling conference gear & mics</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-indigo-600" />
                    <span>White-glove doorstep delivery to hotel/office</span>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectSegmentFilter('professionals');
                      const el = document.getElementById('catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl flex items-center gap-2 shadow-sm transition-all"
                  >
                    <span>Browse Professional Tech</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white p-4">
                  <img
                    src="/src/assets/images/rentora_tech_professional_1790533265910.jpg"
                    alt="Minimalist workspace setup with laptop and portable monitor"
                    referrerPolicy="no-referrer"
                    className="w-full h-56 object-cover rounded-xl mb-4"
                  />
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="font-semibold text-slate-900">Featured Productivity Setup:</span>
                    <span className="font-mono text-indigo-700 font-bold">$14/day</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Dell UltraSharp 4K OLED Portable Monitor + Magnetic Stand.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Segment 4: Item Owners */}
          {activeSegment === 'owners' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-md">
                  <Coins className="w-4 h-4" />
                  <span>Item Owners & Asset Monetizers</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 font-heading">
                  Monetize Idle Assets: Turn Unused Products into Passive Income
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your second camera, backup laptop, or electric bike doesn't need to gather dust. List it on Rentora with guaranteed identity verification, deposit escrows, and comprehensive damage coverage.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-amber-700" />
                    <span>Average active host makes $400 - $1,200/mo</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-amber-700" />
                    <span>Transparent 12% transaction commission</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-amber-700" />
                    <span>Premium listing boosts for 3x visibility</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-amber-700" />
                    <span>Automated smart locker drop-off optional</span>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={onOpenHostPortal}
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl flex items-center gap-2 shadow-sm transition-all"
                  >
                    <span>Open Host Portal & Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 uppercase">Estimated Idle Value</span>
                    <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">High ROI</span>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 font-mono">
                    $840 <span className="text-xs text-slate-500 font-normal">/ month avg</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Lending 1 camera kit and 1 e-bike for just 8 days a month generates enough to pay for personal gear upgrades while helping your local community!
                  </p>
                  <button
                    type="button"
                    onClick={onOpenHostPortal}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    List Your First Item Today
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
