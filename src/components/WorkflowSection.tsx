import React, { useState } from 'react';
import { 
  Search, 
  CalendarCheck, 
  Handshake, 
  RotateCcw, 
  CheckCircle, 
  QrCode, 
  ShieldCheck, 
  Star, 
  ArrowRight,
  Clock,
  MapPin,
  Sparkles
} from 'lucide-react';

interface Step {
  number: number;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  actionText: string;
  details: string[];
}

const STEPS: Step[] = [
  {
    number: 1,
    id: 'search',
    title: '1. Search',
    subtitle: 'Discover items by location and price',
    description: 'Browse verified neighborhood gear, check real-time availability in your city corridor, and filter by budget or technical specifications.',
    actionText: 'Filter by Location & Price',
    details: [
      'Interactive geo-radius search around your campus or hotel',
      'Filter by daily price, item condition, and student discount',
      'Real-time availability calendar with zero ghost listings'
    ]
  },
  {
    number: 2,
    id: 'book',
    title: '2. Book',
    subtitle: 'Select dates and secure duration',
    description: 'Pick exact rental dates, configure optional doorstep delivery, review transparent deposits, and instantly lock in your hardware reservation.',
    actionText: 'Select Dates & Lock Duration',
    details: [
      'Transparent itemized pricing with optional delivery fee',
      'Instant escrow deposit hold (100% refundable upon return)',
      'Digital rental agreement backed by platform guarantee'
    ]
  },
  {
    number: 3,
    id: 'borrow',
    title: '3. Borrow',
    subtitle: 'Collect item for seamless usage',
    description: 'Pick up your gear at a 24/7 automated smart locker pod or meet the verified host with a secure one-time 6-digit passcode and QR verification.',
    actionText: 'Unlock Locker or Verify Host',
    details: [
      'Encrypted 6-digit handover code & optical QR verification',
      'Interactive 60-second cosmetic & power inspection checklist',
      'Direct peer messaging & 24/7 emergency customer care'
    ]
  },
  {
    number: 4,
    id: 'return',
    title: '4. Return',
    subtitle: 'Return on time and leave feedback',
    description: 'Drop off the equipment at the scheduled hub, complete the return condition check, instantly unlock your security deposit, and rate the experience.',
    actionText: 'Release Deposit & Leave Rating',
    details: [
      'One-tap drop-off confirmation with tamper-proof receipt',
      'Instant automated deposit release to original payment method',
      'Mutual community reputation rating and badges'
    ]
  }
];

export const WorkflowSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = STEPS[activeStepIndex];

  return (
    <section id="workflow" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/60 px-3 py-1 rounded-full border border-teal-200">
            The Core User Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-heading tracking-tight mt-3">
            Introducing BorrowHub
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-2">
            Connecting temporary needs with verified local inventory through a seamless 4-step process.
          </p>
        </div>

        {/* 4 Steps Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-2xl text-left transition-all border cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'bg-white border-teal-500 shadow-lg shadow-teal-500/10 ring-2 ring-teal-500/20'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-teal-500" />
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                    isActive ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {step.number}
                  </span>
                  {idx === 0 && <Search className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />}
                  {idx === 1 && <CalendarCheck className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />}
                  {idx === 2 && <Handshake className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />}
                  {idx === 3 && <RotateCcw className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />}
                </div>

                <div className="text-sm font-bold text-slate-900 font-heading">
                  {step.title.replace(`${step.number}. `, '')}
                </div>
                <div className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {step.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Step Preview Stage */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Step Explanations & Value points */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                  <span>Step {activeStep.number} of 4</span>
                  <span>·</span>
                  <span>{activeStep.subtitle}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 font-heading">
                  {activeStep.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeStep.description}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="space-y-3 pt-2">
                {activeStep.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    const next = (activeStepIndex + 1) % STEPS.length;
                    setActiveStepIndex(next);
                  }}
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all shadow-sm shadow-teal-600/20"
                >
                  <span>Next Step: {STEPS[(activeStepIndex + 1) % STEPS.length].title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#catalog"
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2"
                >
                  Jump to Live Catalog →
                </a>
              </div>
            </div>

            {/* Right: Realistic Interactive UI Stage for the Selected Step */}
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-inner">
              
              {/* Step 1 Mockup: Search & Discovery */}
              {activeStepIndex === 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-teal-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Search Simulation</span>
                    </div>
                    <span className="text-[11px] text-teal-400 font-mono">342 Items Available</span>
                  </div>

                  <div className="p-3 bg-slate-800/80 rounded-xl space-y-2">
                    <div className="text-xs font-semibold text-slate-300">Active Filters</div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2.5 py-1 bg-teal-500/20 text-teal-300 rounded-md border border-teal-500/30">City: San Francisco (0.8 mi)</span>
                      <span className="px-2.5 py-1 bg-slate-700 text-slate-300 rounded-md">Price: Under $35/day</span>
                      <span className="px-2.5 py-1 bg-slate-700 text-slate-300 rounded-md">Category: Laptops & Cameras</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Apple MacBook Pro 16" M3 Max</div>
                      <div className="text-[11px] text-slate-400">Silicon Gear Collective · 0.8 mi away</div>
                      <div className="text-[11px] text-teal-400 font-semibold mt-1">★ 4.96 (42 rentals) · Instant Locker Pickup</div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold font-mono text-white">$34/day</div>
                      <span className="text-[10px] text-slate-400">Save $3,465</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 Mockup: Book & Duration */}
              {activeStepIndex === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4 text-teal-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Booking Checkout Engine</span>
                    </div>
                    <span className="text-[11px] text-teal-400 font-mono">Secured Escrow</span>
                  </div>

                  <div className="p-3 bg-slate-800/80 rounded-xl space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Base Rental (3 Days @ $34/day)</span>
                      <span className="font-mono text-white">$102.00</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Doorstep Delivery & Pickup</span>
                      <span className="font-mono text-white">$12.00</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Platform Trust Fee (10%)</span>
                      <span className="font-mono text-white">$10.20</span>
                    </div>
                    <div className="flex justify-between text-teal-300 font-semibold border-t border-slate-700 pt-2">
                      <span>Refundable Security Deposit</span>
                      <span className="font-mono">$150.00 (Released on Return)</span>
                    </div>
                  </div>

                  <div className="p-3 bg-teal-900/30 border border-teal-500/30 rounded-xl text-xs text-teal-200 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>$1,000 Host Protection Guarantee applied automatically.</span>
                  </div>
                </div>
              )}

              {/* Step 3 Mockup: Borrow & Handover */}
              {activeStepIndex === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Handshake className="w-4 h-4 text-teal-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Item Collection & Passcode</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-mono">Ready for Pickup</span>
                  </div>

                  <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-center gap-4">
                    <div className="p-3 bg-white rounded-lg text-slate-900 shrink-0">
                      <QrCode className="w-12 h-12" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Locker / Handover Passcode</span>
                      <div className="text-2xl font-mono font-extrabold text-teal-400 tracking-wider">
                        849-216
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Scan at Rentora Smart Locker #4 or show to host Marcus.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                    <div className="p-2.5 bg-slate-800/80 rounded-lg flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" />
                      <span>525 Market St, Hub #4</span>
                    </div>
                    <div className="p-2.5 bg-slate-800/80 rounded-lg flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-teal-400" />
                      <span>24/7 Smart Access</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4 Mockup: Return & Feedback */}
              {activeStepIndex === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-teal-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Return & Deposit Settlement</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-mono">100% On-Time</span>
                  </div>

                  <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Inspection Verified: Item in pristine condition</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      $150.00 security deposit refunded to Visa ending in 4242.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">Leave Community Feedback:</span>
                      <div className="flex text-amber-400">
                        {'★'.repeat(5)}
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-400 italic">
                      "Smooth handover, laptop was in mint condition with battery fully charged. Saved me over $3,000 for my thesis presentation!"
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
