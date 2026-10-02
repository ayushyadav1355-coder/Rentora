import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Globe2, 
  Cpu, 
  ScanFace, 
  MapPin, 
  CheckCircle2, 
  Sliders, 
  ArrowRight,
  Send,
  Zap,
  Vote
} from 'lucide-react';
import { CityHub, RentalItem } from '../types';

interface FutureTechSectionProps {
  availableCities: CityHub[];
  onSelectCityHub: (city: string) => void;
  onSelectItemFromAI: (item: RentalItem) => void;
  allItems: RentalItem[];
}

export const FutureTechSection: React.FC<FutureTechSectionProps> = ({
  availableCities,
  onSelectCityHub,
  onSelectItemFromAI,
  allItems,
}) => {
  const [activeFeature, setActiveFeature] = useState<'ai' | 'identity' | 'pricing' | 'expansion'>('ai');

  // AI Recommendation interactive states
  const [aiQuery, setAiQuery] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [matchedItem, setMatchedItem] = useState<RentalItem | null>(allItems[0]);
  const [aiRecommendationText, setAiRecommendationText] = useState(
    'Based on creative performance and budget constraints, the Apple MacBook Pro 16" M3 Max bundled with the 4K Portable Display is the optimal match.'
  );

  // Digital Identity Verification states
  const [idVerified, setIdVerified] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  // Dynamic pricing visualizer state
  const [demandFactor, setDemandFactor] = useState<number>(1.15); // 1.15 = Weekend surge

  // Urban expansion voting state
  const [votedCity, setVotedCity] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>({
    'Austin, TX': 412,
    'Amsterdam, NL': 389,
    'Toronto, CA': 295,
    'Seoul, KR': 540,
    'Sydney, AU': 310,
  });

  // AI prompt triggers
  const handleRunAiRecommendation = (presetQuery?: string) => {
    const q = presetQuery || aiQuery;
    if (!q.trim()) return;

    setIsAiThinking(true);
    setTimeout(() => {
      setIsAiThinking(false);
      const lower = q.toLowerCase();
      if (lower.includes('bike') || lower.includes('travel') || lower.includes('scooter') || lower.includes('mobility')) {
        setMatchedItem(allItems.find((i) => i.category === 'mobility') || allItems[1]);
        setAiRecommendationText('Identified high-mobility travel scenario: Specialized Turbo Vado E-Bike provides 50-mile range and eliminates taxi costs.');
      } else if (lower.includes('photo') || lower.includes('video') || lower.includes('film') || lower.includes('camera') || lower.includes('drone')) {
        setMatchedItem(allItems.find((i) => i.category === 'cameras') || allItems[2]);
        setAiRecommendationText('Identified creative production workflow: Sony Alpha 7 IV Cinema Kit matched with 4K recording capabilities.');
      } else {
        setMatchedItem(allItems.find((i) => i.category === 'laptops') || allItems[0]);
        setAiRecommendationText('Identified heavy computing workload: Apple MacBook Pro 16" M3 Max matched for fast project compilation.');
      }
    }, 500);
  };

  // Simulate Biometric & ID verification
  const handleStartVerification = () => {
    setIsVerifying(true);
    setVerificationProgress(10);
    const interval = setInterval(() => {
      setVerificationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsVerifying(false);
          setIdVerified(true);
          return 100;
        }
        return prev + 30;
      });
    }, 300);
  };

  // Handle City Vote
  const handleVote = (city: string) => {
    if (votedCity) return;
    setVotedCity(city);
    setVotes({
      ...votes,
      [city]: (votes[city] || 0) + 1,
    });
  };

  return (
    <section id="future-tech" className="py-16 md:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800">
            <Cpu className="w-3.5 h-3.5" />
            <span>Future Enhancements & Platform Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight mt-3 text-white">
            Next-Generation Rental Architecture
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mt-2 text-balance">
            Explore the four cornerstone technologies scaling Rentora into an intelligent, secure, and borderless sharing network.
          </p>
        </div>

        {/* 4 Tech Pillars Tabs from Slide 7 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          
          <button
            type="button"
            onClick={() => setActiveFeature('ai')}
            className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
              activeFeature === 'ai'
                ? 'bg-slate-800 border-teal-500 shadow-lg shadow-teal-500/10 ring-2 ring-teal-500/20'
                : 'bg-slate-850/60 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-xl ${activeFeature === 'ai' ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-teal-400'}`}>
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold font-heading text-white">AI Recommendations</span>
            </div>
            <p className="text-xs text-slate-400">Intelligent product & price matching algorithms.</p>
          </button>

          <button
            type="button"
            onClick={() => setActiveFeature('identity')}
            className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
              activeFeature === 'identity'
                ? 'bg-slate-800 border-sky-500 shadow-lg shadow-sky-500/10 ring-2 ring-sky-500/20'
                : 'bg-slate-850/60 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-xl ${activeFeature === 'identity' ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-sky-400'}`}>
                <ScanFace className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold font-heading text-white">Digital Identity</span>
            </div>
            <p className="text-xs text-slate-400">Biometric security and smart deposit reduction.</p>
          </button>

          <button
            type="button"
            onClick={() => setActiveFeature('pricing')}
            className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
              activeFeature === 'pricing'
                ? 'bg-slate-800 border-amber-500 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/20'
                : 'bg-slate-850/60 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-xl ${activeFeature === 'pricing' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-amber-400'}`}>
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold font-heading text-white">Dynamic Pricing</span>
            </div>
            <p className="text-xs text-slate-400">Demand-based algorithm rate adjustments.</p>
          </button>

          <button
            type="button"
            onClick={() => setActiveFeature('expansion')}
            className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
              activeFeature === 'expansion'
                ? 'bg-slate-800 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-500/20'
                : 'bg-slate-850/60 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-xl ${activeFeature === 'expansion' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-emerald-400'}`}>
                <Globe2 className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold font-heading text-white">Urban Expansion</span>
            </div>
            <p className="text-xs text-slate-400">Scaling network across multiple global cities.</p>
          </button>

        </div>

        {/* Dynamic Display Panel for Selected Tech Feature */}
        <div className="bg-slate-850 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl">
          
          {/* FEATURE 1: AI Recommendations */}
          {activeFeature === 'ai' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-400 bg-teal-950/80 px-2.5 py-1 rounded-md border border-teal-800">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Engine: Intelligent Product & Price Matching</span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Find the Exact Gear Match for Your Specific Scenario
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Rentora’s AI models analyze your project duration, location, baggage constraints, and skill level to output the exact recommended bundle with fair market price parity.
                </p>

                {/* Quick Scenario Buttons */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Try A Sample Scenario:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAiQuery('Student filming 3-day graduation documentary');
                        handleRunAiRecommendation('Student filming 3-day graduation documentary');
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors border border-slate-700"
                    >
                      🎓 Student graduation documentary (3 days)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAiQuery('Traveler weekend cycling along waterfront');
                        handleRunAiRecommendation('Traveler weekend cycling along waterfront');
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors border border-slate-700"
                    >
                      🚴 Traveler weekend coastal cycling
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAiQuery('Remote engineer doing 5-day client off-site');
                        handleRunAiRecommendation('Remote engineer doing 5-day client off-site');
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors border border-slate-700"
                    >
                      💼 Remote dev client sprint setup
                    </button>
                  </div>
                </div>

                {/* Query Input */}
                <div className="pt-2">
                  <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-700 rounded-2xl focus-within:ring-2 focus-within:ring-teal-500">
                    <input
                      type="text"
                      placeholder="Describe what you're doing (e.g. 'drone photography in Presidio')..."
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      className="w-full text-xs px-3 py-2 text-white bg-transparent focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRunAiRecommendation()}
                      disabled={isAiThinking}
                      className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
                    >
                      {isAiThinking ? (
                        <span>Analyzing...</span>
                      ) : (
                        <>
                          <span>Match Gear</span>
                          <Send className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Matched Result Card */}
              <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
                <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
                  <span className="font-bold text-teal-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Recommendation Match</span>
                  </span>
                  <span className="font-mono text-slate-400 text-[11px]">Confidence: 98.4%</span>
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  "{aiRecommendationText}"
                </p>

                {matchedItem && (
                  <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between gap-3">
                    <img
                      src={matchedItem.image}
                      alt={matchedItem.title}
                      className="w-14 h-14 rounded-lg object-cover bg-slate-700 shrink-0"
                    />
                    <div className="overflow-hidden flex-1">
                      <div className="text-xs font-bold text-white truncate">
                        {matchedItem.title}
                      </div>
                      <div className="text-[11px] text-teal-400 font-mono font-bold mt-0.5">
                        ${matchedItem.dailyRate}/day · {matchedItem.condition}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {matchedItem.pickupAddress}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectItemFromAI(matchedItem)}
                      className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shrink-0"
                    >
                      Book This
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FEATURE 2: Digital Identity Verification */}
          {activeFeature === 'identity' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 bg-sky-950/80 px-2.5 py-1 rounded-md border border-sky-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Biometric Security & Smart Deposits</span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Zero Paperwork, Biometric Trust & 50% Reduced Deposits
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Rentora eliminates predatory security deposits through encrypted biometric identity checks. Verified members unlock access to thousands of dollars of hardware with minimal friction.
                </p>

                <div className="space-y-2 text-xs text-slate-300 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>Instant Government ID parsing (Passport / Driver's License)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>Liveness biometric verification preventing synthetic fraud</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>Smart dynamic deposit reduction (up to 50% off deposit holds)</span>
                  </div>
                </div>

                <div className="pt-3">
                  {!idVerified ? (
                    <button
                      type="button"
                      onClick={handleStartVerification}
                      disabled={isVerifying}
                      className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 disabled:bg-sky-600 text-slate-950 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <ScanFace className="w-4 h-4" />
                      <span>{isVerifying ? 'Running Biometric Scan...' : 'Simulate Biometric Verification'}</span>
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-bold rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Verified Digital Identity: 50% Deposit Discount Unlocked!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive ID Scanner Simulation */}
              <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-6 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-sky-950 border-2 border-dashed border-sky-400 flex items-center justify-center mx-auto text-sky-400 relative">
                  <ScanFace className="w-10 h-10" />
                  {isVerifying && (
                    <div className="absolute inset-0 rounded-full border-2 border-sky-400 animate-ping" />
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">
                    {idVerified ? 'Biometric Identity Verified' : isVerifying ? 'Scanning Security Invariants...' : 'Ready for Verification'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {idVerified 
                      ? 'Trust Score: 99.8/100 · Escrow Tier: Low Risk'
                      : 'Encrypted with zero plain-text storage'}
                  </p>
                </div>

                {isVerifying && (
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-sky-400 h-full transition-all duration-300"
                      style={{ width: `${verificationProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FEATURE 3: Dynamic Pricing */}
          {activeFeature === 'pricing' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-800">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Demand-Based Algorithm Rate Adjustments</span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Intelligent Pricing That Balances Supply & Fairness
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Rentora’s dynamic algorithm prevents price-gouging while incentivizing owners to make inventory available during peak demand windows like graduation weeks, conferences, and sunny weekends.
                </p>

                {/* Interactive Factor Adjusters */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Simulate Market Condition:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setDemandFactor(0.90)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        demandFactor === 0.90
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">Midweek Off-Peak</div>
                      <div className="text-[10px]">-10% Campus Discount</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDemandFactor(1.0)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        demandFactor === 1.0
                          ? 'bg-slate-800 border-teal-500 text-teal-300'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">Standard Baseline</div>
                      <div className="text-[10px]">1.0x Normal Supply</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDemandFactor(1.15)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        demandFactor === 1.15
                          ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">Weekend Peak</div>
                      <div className="text-[10px]">+15% High Utilization</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Rate Preview Widget */}
              <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Simulated Daily Rate on MacBook Pro ($34 Base):
                </span>
                
                <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">Calculated Dynamic Rate:</div>
                    <div className="text-3xl font-extrabold text-amber-400 font-mono mt-0.5">
                      ${(34 * demandFactor).toFixed(2)}
                      <span className="text-xs text-slate-400 font-normal"> / day</span>
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <span className="font-mono text-slate-300">Factor: {demandFactor}x</span>
                    <div className="text-[10px] text-teal-400 mt-1">Guaranteed owner payout</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 leading-relaxed">
                  Rentora caps dynamic adjustments to a maximum of ±20% to prevent excessive price jumps.
                </div>
              </div>
            </div>
          )}

          {/* FEATURE 4: Urban Expansion */}
          {activeFeature === 'expansion' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>Scaling the Network Across Multiple Global Cities</span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Decentralized 24/7 Smart Hubs in 8+ Metros
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Rentora partners with local transit points, co-working facilities, and independent physical rental shops to deploy modular smart lockers and pickup zones across the globe.
                </p>

                {/* Hub List */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  {availableCities.map((hub) => (
                    <button
                      key={hub.id}
                      type="button"
                      onClick={() => onSelectCityHub(hub.city)}
                      className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-left transition-colors cursor-pointer"
                    >
                      <div className="text-xs font-bold text-white">{hub.city}</div>
                      <div className="text-[10px] text-teal-400 font-mono mt-0.5">{hub.activeItems} items</div>
                      <div className="text-[10px] text-slate-400">{hub.lockersAndHubs} hubs</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* City expansion voting simulation */}
              <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Vote className="w-3.5 h-3.5" />
                    <span>Vote for Next Launch City</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Q1 2027 Pipeline</span>
                </div>

                <div className="space-y-2">
                  {Object.entries(votes).map(([city, count]) => {
                    const isVoted = votedCity === city;
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => handleVote(city)}
                        disabled={!!votedCity}
                        className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors cursor-pointer ${
                          isVoted
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold'
                            : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>{city}</span>
                        <span className="font-mono text-slate-400">{count} votes</span>
                      </button>
                    );
                  })}
                </div>

                {votedCity && (
                  <p className="text-[11px] text-emerald-400 text-center font-semibold">
                    Thank you! Your vote for {votedCity} has been recorded.
                  </p>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
