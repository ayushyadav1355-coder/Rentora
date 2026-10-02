/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProblemSolutionSection } from './components/ProblemSolutionSection';
import { WorkflowSection } from './components/WorkflowSection';
import { SegmentSection } from './components/SegmentSection';
import { ItemCatalog } from './components/ItemCatalog';
import { ItemDetailModal } from './components/ItemDetailModal';
import { ActiveRentalsModal } from './components/ActiveRentalsModal';
import { HostPortalModal } from './components/HostPortalModal';
import { SocietalBenefitsSection } from './components/SocietalBenefitsSection';
import { FutureTechSection } from './components/FutureTechSection';
import { B2BPartnershipsModal } from './components/B2BPartnershipsModal';
import { Footer } from './components/Footer';

import { INITIAL_ITEMS, INITIAL_OWNER_LISTINGS, GLOBAL_HUBS } from './data/mockData';
import { RentalItem, Booking, OwnerListing, UserSegment } from './types';

export default function App() {
  // Core state
  const [items, setItems] = useState<RentalItem[]>(INITIAL_ITEMS);
  const [ownerListings, setOwnerListings] = useState<OwnerListing[]>(INITIAL_OWNER_LISTINGS);
  const [selectedCity, setSelectedCity] = useState<string>('San Francisco');
  const [activeSegmentFilter, setActiveSegmentFilter] = useState<'students' | 'travelers' | 'professionals' | null>(null);

  // Active bookings state (pre-populate 1 active booking so user can immediately experience Step 3 & 4)
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'book-demo-1',
      item: INITIAL_ITEMS[1], // Specialized Turbo Vado E-Bike
      startDate: '2026-10-01',
      endDate: '2026-10-04',
      days: 3,
      baseTotal: 78,
      deliveryType: 'pickup',
      deliveryFee: 0,
      insuranceSelected: true,
      insuranceFee: 13.5,
      serviceFee: 7.8,
      deposit: 120,
      grandTotal: 219.3,
      status: 'active',
      pickupCode: '492-817',
      qrCodeData: 'RENTORA-ESCROW-TURBO-VADO-817',
      bookedAt: 'Oct 1, 2026',
      handoverCompleted: true,
      inspectionChecklist: {
        cosmeticsChecked: true,
        powerChecked: true,
        accessoriesConfirmed: true,
      },
      returnChecklist: {
        inspectedForDamage: false,
        allAccessoriesPacked: false,
        batteryCharged: false,
      },
    },
    {
      id: 'book-demo-2',
      item: INITIAL_ITEMS[2], // Sony Alpha 7 IV
      startDate: '2026-09-20',
      endDate: '2026-09-23',
      days: 3,
      baseTotal: 114,
      deliveryType: 'delivery',
      deliveryFee: 10,
      insuranceSelected: true,
      insuranceFee: 13.5,
      serviceFee: 11.4,
      deposit: 160,
      grandTotal: 308.9,
      status: 'returned',
      pickupCode: '118-904',
      qrCodeData: 'RENTORA-ESCROW-SONY-A7IV-904',
      bookedAt: 'Sep 20, 2026',
      handoverCompleted: true,
      inspectionChecklist: {
        cosmeticsChecked: true,
        powerChecked: true,
        accessoriesConfirmed: true,
      },
      returnChecklist: {
        inspectedForDamage: true,
        allAccessoriesPacked: true,
        batteryCharged: true,
      },
      feedback: {
        rating: 5,
        tags: ['Mint Condition', 'Smooth Handover', 'Saved Me Tons of $'],
        comment: 'Phenomenal condition, lenses were pristine. Made our student festival documentary look like a studio film!',
        submittedAt: 'Sep 23, 2026',
      },
    }
  ]);

  // Modal states
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<RentalItem | null>(null);
  const [activeRentalsModalOpen, setActiveRentalsModalOpen] = useState(false);
  const [hostPortalModalOpen, setHostPortalModalOpen] = useState(false);
  const [b2bModalOpen, setB2bModalOpen] = useState(false);

  // Booking action handlers
  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings([newBooking, ...bookings]);
    setSelectedItemForDetail(null);
    setActiveRentalsModalOpen(true);
  };

  const handleCompleteHandover = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, handoverCompleted: true } : b))
    );
  };

  const handleReturnItem = (
    bookingId: string,
    feedback: { rating: number; tags: string[]; comment: string }
  ) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status: 'returned',
              feedback: {
                ...feedback,
                submittedAt: new Date().toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }),
              },
            }
          : b
      )
    );
  };

  // Host listing actions
  const handleTogglePremium = (id: string) => {
    setOwnerListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isPremium: !l.isPremium } : l))
    );
    setItems((prev) =>
      prev.map((item) =>
        item.id === id || item.title.includes('Sony Alpha 7')
          ? { ...item, isPremiumListing: !item.isPremiumListing }
          : item
      )
    );
  };

  const handleAddNewListing = (newItemData: Partial<RentalItem>) => {
    const newItem: RentalItem = {
      id: `item-${Date.now()}`,
      title: newItemData.title || 'Personal Gear Listing',
      brand: newItemData.brand || 'Custom',
      category: newItemData.category || 'tech',
      targetSegments: newItemData.targetSegments || ['students', 'professionals'],
      dailyRate: newItemData.dailyRate || 25,
      originalRetailPrice: newItemData.originalRetailPrice || 800,
      deposit: newItemData.deposit || 60,
      rating: 5.0,
      reviewCount: 1,
      location: {
        city: selectedCity,
        neighborhood: 'Downtown Hub',
        distance: '0.5 miles away',
      },
      image: newItemData.image || '/src/assets/images/rentora_hero_gear_1790533235373.jpg',
      owner: {
        name: 'You (Host)',
        avatar: '',
        verified: true,
        rating: 5.0,
        completedRentals: 0,
        responseTime: '< 5 mins',
      },
      features: newItemData.features || ['Verified Condition', 'Battery Included'],
      condition: newItemData.condition || 'Excellent',
      deliveryAvailable: newItemData.deliveryAvailable ?? true,
      deliveryFee: newItemData.deliveryFee || 10,
      pickupAddress: newItemData.pickupAddress || 'Rentora Smart Locker Hub #1',
      popularWith: 'Local community members seeking affordable short-term access',
      isPremiumListing: false,
      description: newItemData.description || 'High quality equipment available for rental.',
      includedAccessories: newItemData.includedAccessories || ['Power adapter', 'Pouch'],
    };

    setItems([newItem, ...items]);

    const newOwnerListing: OwnerListing = {
      id: newItem.id,
      title: newItem.title,
      category: newItem.category,
      dailyRate: newItem.dailyRate,
      originalPrice: newItem.originalRetailPrice,
      status: 'active',
      totalRentals: 0,
      grossRevenue: 0,
      commissionCut: 0,
      netEarnings: 0,
      isPremium: false,
      image: newItem.image,
    };

    setOwnerListings([newOwnerListing, ...ownerListings]);
  };

  // Search handler from Hero
  const handleHeroSearch = (query: string, category: string, city: string) => {
    if (city) setSelectedCity(city);
    // Catalog automatically filters by category or query
  };

  // Jump to AI recommendations
  const handleOpenAIRecommendations = () => {
    const el = document.getElementById('future-tech');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeRentalsCount = bookings.filter((b) => b.status === 'active').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      
      {/* 1. Header with strict 3-zone contract */}
      <Header
        activeRentalsCount={activeRentalsCount}
        onOpenActiveRentals={() => setActiveRentalsModalOpen(true)}
        onOpenHostPortal={() => setHostPortalModalOpen(true)}
        onOpenB2B={() => setB2bModalOpen(true)}
        onOpenAIRecommendations={handleOpenAIRecommendations}
        selectedCity={selectedCity}
        onSelectCity={(city) => setSelectedCity(city)}
        availableCities={GLOBAL_HUBS}
      />

      <main className="flex-1">
        {/* 2. Hero Section: Borrow. Use. Return. */}
        <Hero
          onSearch={handleHeroSearch}
          onSelectSegment={(seg: UserSegment) => {
            if (seg === 'owners') {
              setHostPortalModalOpen(true);
            } else {
              setActiveSegmentFilter(seg);
              const el = document.getElementById('catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onOpenAIRecommendations={handleOpenAIRecommendations}
          selectedCity={selectedCity}
        />

        {/* 3. Core Problem & Marketplace Gaps + Interactive Rent vs Buy Calculator */}
        <ProblemSolutionSection />

        {/* 4. The Core User Workflow: 1. Search 2. Book 3. Borrow 4. Return */}
        <WorkflowSection />

        {/* 5. Tailored Categories for Target User Segments */}
        <SegmentSection
          onSelectSegmentFilter={(seg) => {
            setActiveSegmentFilter(seg);
            const el = document.getElementById('catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenHostPortal={() => setHostPortalModalOpen(true)}
        />

        {/* 6. Robust Item Catalog & Search Engine */}
        <ItemCatalog
          items={items}
          onSelectItem={(item) => setSelectedItemForDetail(item)}
          selectedCity={selectedCity}
          activeSegmentFilter={activeSegmentFilter}
          onClearSegmentFilter={() => setActiveSegmentFilter(null)}
        />

        {/* 7. Societal Benefits & Circular Impact Section */}
        <SocietalBenefitsSection />

        {/* 8. Future Enhancements & Advanced Tech: AI, Identity, Dynamic Pricing, Global Hubs */}
        <FutureTechSection
          availableCities={GLOBAL_HUBS}
          onSelectCityHub={(city) => {
            setSelectedCity(city);
            const el = document.getElementById('catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectItemFromAI={(item) => setSelectedItemForDetail(item)}
          allItems={items}
        />
      </main>

      {/* 9. Branding & Footer: Connect. Empower. Sustain. & Team Maverick */}
      <Footer
        availableCities={GLOBAL_HUBS}
        onOpenB2B={() => setB2bModalOpen(true)}
        onOpenHostPortal={() => setHostPortalModalOpen(true)}
      />

      {/* MODALS */}
      
      {/* Item Detail & Booking Modal (Step 2: Book) */}
      <ItemDetailModal
        item={selectedItemForDetail}
        onClose={() => setSelectedItemForDetail(null)}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Active Rentals & Return Flow Modal (Step 3: Borrow & Step 4: Return) */}
      <ActiveRentalsModal
        isOpen={activeRentalsModalOpen}
        onClose={() => setActiveRentalsModalOpen(false)}
        bookings={bookings}
        onCompleteHandover={handleCompleteHandover}
        onReturnItem={handleReturnItem}
      />

      {/* Host & Owner Portal Modal (Monetize Idle Assets, Commission, Premium Listings) */}
      <HostPortalModal
        isOpen={hostPortalModalOpen}
        onClose={() => setHostPortalModalOpen(false)}
        listings={ownerListings}
        onTogglePremium={handleTogglePremium}
        onAddNewListing={handleAddNewListing}
      />

      {/* B2B Partnerships for Local Physical Rental Shops */}
      <B2BPartnershipsModal
        isOpen={b2bModalOpen}
        onClose={() => setB2bModalOpen(false)}
      />

    </div>
  );
}
