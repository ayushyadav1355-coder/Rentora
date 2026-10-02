export type RentalCategory = 'all' | 'laptops' | 'mobility' | 'cameras' | 'tech' | 'travel';

export type UserSegment = 'students' | 'travelers' | 'professionals' | 'owners';

export interface RentalItem {
  id: string;
  title: string;
  brand: string;
  category: 'laptops' | 'mobility' | 'cameras' | 'tech' | 'travel';
  targetSegments: ('students' | 'travelers' | 'professionals')[];
  dailyRate: number;
  originalRetailPrice: number;
  deposit: number;
  rating: number;
  reviewCount: number;
  location: {
    city: string;
    neighborhood: string;
    distance?: string;
  };
  image: string;
  gallery?: string[];
  owner: {
    name: string;
    avatar: string;
    verified: boolean;
    rating: number;
    completedRentals: number;
    responseTime: string;
    isBusinessPartner?: boolean;
    partnerShopName?: string;
  };
  features: string[];
  condition: 'Brand New' | 'Like New' | 'Excellent' | 'Good';
  deliveryAvailable: boolean;
  deliveryFee: number;
  pickupAddress: string;
  popularWith: string;
  isPremiumListing: boolean;
  dynamicPricing?: {
    multiplier: number; // e.g., 1.15 for +15%
    label?: string; // e.g. "Weekend Surge" or "Campus Off-Peak"
    isDiscount?: boolean;
  };
  description: string;
  includedAccessories: string[];
}

export interface Booking {
  id: string;
  item: RentalItem;
  startDate: string;
  endDate: string;
  days: number;
  baseTotal: number;
  deliveryType: 'pickup' | 'delivery';
  deliveryFee: number;
  insuranceSelected: boolean;
  insuranceFee: number;
  serviceFee: number;
  deposit: number;
  grandTotal: number;
  status: 'active' | 'returned';
  pickupCode: string;
  qrCodeData: string;
  bookedAt: string;
  handoverCompleted: boolean;
  inspectionChecklist: {
    cosmeticsChecked: boolean;
    powerChecked: boolean;
    accessoriesConfirmed: boolean;
  };
  returnChecklist: {
    inspectedForDamage: boolean;
    allAccessoriesPacked: boolean;
    batteryCharged: boolean;
  };
  feedback?: {
    rating: number;
    tags: string[];
    comment: string;
    submittedAt: string;
  };
}

export interface OwnerListing {
  id: string;
  title: string;
  category: string;
  dailyRate: number;
  originalPrice: number;
  status: 'active' | 'rented' | 'draft';
  totalRentals: number;
  grossRevenue: number;
  commissionCut: number; // 12%
  netEarnings: number;
  isPremium: boolean;
  image: string;
}

export interface CityHub {
  id: string;
  city: string;
  country: string;
  region: string;
  activeItems: number;
  lockersAndHubs: number;
  status: 'live' | 'upcoming';
  headline: string;
}

export interface B2BPartner {
  id: string;
  businessName: string;
  city: string;
  category: string;
  fleetSize: number;
  joinedDate: string;
  status: 'active' | 'pending';
}
