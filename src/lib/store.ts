import { create } from 'zustand';

// ═══════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════

export interface CompanyDetails {
  companyName: string;
  industry: string;
  billingEmail: string;
  phone: string;
  billingAddress: string;
}

export interface AuthoriserDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
}

export interface DelegateDetails {
  fullName: string;
  role: string;
  email: string;
  phone: string;
  location: string;
}

export interface PricingConfig {
  deliveryMode: 'public' | 'inhouse' | 'online';
  delegates: number;
  days: number;
  location: string;
  promoCode: string;
  selectedAddOns: string[];
}

export interface PricingSnapshot {
  baseCost: number;
  surcharge: number;
  volumeDiscount: number;
  addOnsCost: number;
  promoDiscount: number;
  subtotal: number;
  vat: number;
  total: number;
  perDelegatePerDay: number;
  volumeDiscountRate: number;
}

export interface Registration {
  company: CompanyDetails;
  authoriser: AuthoriserDetails;
  delegates: DelegateDetails[];
}

export interface CartItem {
  courseId: string;
  courseTitle: string;
  categoryTitle: string;
  pricingConfig: PricingConfig;
  pricingSnapshot: PricingSnapshot;
  registration: Registration;
  addedAt: number;
}

export type BookingStatus = 'idle' | 'pending' | 'confirmed' | 'paid' | 'failed';

// ═══════════════════════════════════════════════
// PRICING CALCULATOR
// ═══════════════════════════════════════════════

const DELIVERY_MULTIPLIERS: Record<string, number> = {
  public: 1.0,
  inhouse: 1.2,
  online: 0.85,
};

const VOLUME_DISCOUNTS = [
  { min: 10, rate: 0.12, label: '12% Volume Discount (10+ delegates)' },
  { min: 5, rate: 0.07, label: '7% Volume Discount (5-9 delegates)' },
  { min: 3, rate: 0.04, label: '4% Volume Discount (3-4 delegates)' },
];

const PROMO_CODES: Record<string, number> = {
  SPRINGBOK10: 0.10,
  EARLYBIRD: 0.05,
  WELCOME15: 0.15,
};

export function getVolumeDiscountRate(delegates: number): { rate: number; label: string } {
  for (const tier of VOLUME_DISCOUNTS) {
    if (delegates >= tier.min) return { rate: tier.rate, label: tier.label };
  }
  return { rate: 0, label: '' };
}

export function getPromoDiscount(code: string): number {
  return PROMO_CODES[code.toUpperCase()] || 0;
}

export function calculatePricing(
  config: PricingConfig,
  basePricePerDay: number,
  addOns: { id: string; pricePerDelegate: number }[] = [],
  addOnDaysMultiplier: number = 1
): PricingSnapshot {
  const { deliveryMode, delegates, days, selectedAddOns, promoCode } = config;
  const multiplier = DELIVERY_MULTIPLIERS[deliveryMode] || 1.0;

  // Base cost
  const baseCost = delegates * days * basePricePerDay;

  // Delivery surcharge
  const grossCost = baseCost * multiplier;
  const surcharge = grossCost - baseCost;

  // Volume discount on gross
  const { rate: volumeRate } = getVolumeDiscountRate(delegates);
  const volumeDiscount = grossCost * volumeRate;

  // Add-ons
  let addOnsCost = 0;
  for (const addOnId of selectedAddOns) {
    const addOn = addOns.find((a) => a.id === addOnId);
    if (addOn) {
      addOnsCost += addOn.pricePerDelegate * delegates * addOnDaysMultiplier;
    }
  }

  // Subtotal (before promo and VAT)
  const subtotal = grossCost - volumeDiscount + addOnsCost;

  // Promo discount
  const promoRate = getPromoDiscount(promoCode);
  const promoDiscount = subtotal * promoRate;

  // Final subtotal after promo
  const afterPromo = subtotal - promoDiscount;

  // VAT (16%)
  const vat = afterPromo * 0.16;

  // Total
  const total = afterPromo + vat;

  // Per delegate per day
  const perDelegatePerDay = Math.round(total / delegates / days);

  return {
    baseCost: Math.round(baseCost),
    surcharge: Math.round(surcharge),
    volumeDiscount: Math.round(volumeDiscount),
    addOnsCost: Math.round(addOnsCost),
    promoDiscount: Math.round(promoDiscount),
    subtotal: Math.round(subtotal),
    vat: Math.round(vat),
    total: Math.round(total),
    perDelegatePerDay,
    volumeDiscountRate: volumeRate,
  };
}

export function formatZMW(amount: number): string {
  return `K${amount.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// ═══════════════════════════════════════════════
// STORE
// ═══════════════════════════════════════════════

interface AppState {
  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;

  // Registration (in-progress)
  currentRegistration: Registration | null;
  setCurrentRegistration: (reg: Registration | null) => void;

  // Booking
  bookingStatus: BookingStatus;
  setBookingStatus: (status: BookingStatus) => void;
  bookingReference: string | null;
  setBookingReference: (ref: string | null) => void;
  lastBooking: CartItem | null;

  // Last pricing config (persists between pages)
  lastPricingConfig: PricingConfig | null;
  setLastPricingConfig: (config: PricingConfig | null) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Cart
  cart: [],
  addToCart: (item: CartItem) => {
    const existing = get().cart.find((c) => c.courseId === item.courseId);
    if (existing) return; // Prevent duplicates
    set((state) => ({
      cart: [...state.cart, item],
      bookingStatus: 'idle',
      bookingReference: null,
      lastBooking: item,
    }));
  },
  removeFromCart: (courseId: string) => {
    set((state) => ({
      cart: state.cart.filter((c) => c.courseId !== courseId),
    }));
  },
  clearCart: () => {
    set({ cart: [], bookingStatus: 'idle', bookingReference: null, lastBooking: null });
  },

  // Registration
  currentRegistration: null,
  setCurrentRegistration: (reg: Registration | null) => {
    set({ currentRegistration: reg });
  },

  // Booking
  bookingStatus: 'idle',
  setBookingStatus: (status: BookingStatus) => {
    set({ bookingStatus: status });
  },
  bookingReference: null,
  setBookingReference: (ref: string | null) => {
    set({ bookingReference: ref });
  },
  lastBooking: null,

  // Last pricing config
  lastPricingConfig: null,
  setLastPricingConfig: (config: PricingConfig | null) => {
    set({ lastPricingConfig: config });
  },
}));
