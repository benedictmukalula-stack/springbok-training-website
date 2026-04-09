// ═══════════════════════════════════════════════
// SERVER-SIDE PRICING ENGINE
// Identical logic to client-side store.ts — single source of truth
// ═══════════════════════════════════════════════

export interface ServerPricingConfig {
  deliveryMode: 'public' | 'inhouse' | 'online';
  delegates: number;
  days: number;
  location: string;
  promoCode: string;
  selectedAddOns: string[];
}

export interface ServerPricingSnapshot {
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

export interface AddOnItem {
  id: string;
  name: string;
  pricePerDelegate: number;
}

const DELIVERY_MULTIPLIERS: Record<string, number> = {
  public: 1.0,
  inhouse: 1.2,
  online: 0.85,
};

const VOLUME_DISCOUNTS = [
  { min: 10, rate: 0.12 },
  { min: 5, rate: 0.07 },
  { min: 3, rate: 0.04 },
];

export function getVolumeDiscountRate(delegates: number): { rate: number; label: string } {
  for (const tier of VOLUME_DISCOUNTS) {
    if (delegates >= tier.min) {
      return {
        rate: tier.rate,
        label:
          tier.min >= 10
            ? '12% Volume Discount (10+ delegates)'
            : tier.min >= 5
            ? '7% Volume Discount (5-9 delegates)'
            : '4% Volume Discount (3-4 delegates)',
      };
    }
  }
  return { rate: 0, label: '' };
}

// Promo code rates — matches client-side
const PROMO_CODES: Record<string, number> = {
  SPRINGBOK10: 0.10,
  EARLYBIRD: 0.05,
  WELCOME15: 0.15,
};

export function getPromoDiscount(code: string): number {
  return PROMO_CODES[code.toUpperCase()] || 0;
}

export function calculatePricing(
  config: ServerPricingConfig,
  basePricePerDay: number,
  addOns: AddOnItem[] = [],
  addOnDaysMultiplier: number = 1
): ServerPricingSnapshot {
  const { deliveryMode, delegates, days, selectedAddOns, promoCode } = config;
  const multiplier = DELIVERY_MULTIPLIERS[deliveryMode] || 1.0;

  const baseCost = delegates * days * basePricePerDay;
  const grossCost = baseCost * multiplier;
  const surcharge = grossCost - baseCost;

  const { rate: volumeRate } = getVolumeDiscountRate(delegates);
  const volumeDiscount = grossCost * volumeRate;

  let addOnsCost = 0;
  for (const addOnId of selectedAddOns) {
    const addOn = addOns.find((a) => a.id === addOnId);
    if (addOn) {
      addOnsCost += addOn.pricePerDelegate * delegates * addOnDaysMultiplier;
    }
  }

  const subtotal = grossCost - volumeDiscount + addOnsCost;
  const promoRate = getPromoDiscount(promoCode);
  const promoDiscount = subtotal * promoRate;
  const afterPromo = subtotal - promoDiscount;
  const vat = afterPromo * 0.16;
  const total = afterPromo + vat;
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
