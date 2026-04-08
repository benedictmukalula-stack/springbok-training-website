import { NextRequest, NextResponse } from 'next/server';
import { calculatePricing, getPromoDiscount, getVolumeDiscountRate } from '@/lib/pricing-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      basePricePerDay,
      deliveryMode,
      delegates,
      days,
      promoCode,
      selectedAddOns,
      addOns = [],
    } = body;

    // Validate required fields
    if (!basePricePerDay || !deliveryMode || !delegates || !days) {
      return NextResponse.json(
        { error: 'Missing required fields: basePricePerDay, deliveryMode, delegates, days' },
        { status: 400 }
      );
    }

    if (delegates < 1 || delegates > 100) {
      return NextResponse.json(
        { error: 'Delegates must be between 1 and 100' },
        { status: 400 }
      );
    }

    if (days < 1 || days > 30) {
      return NextResponse.json(
        { error: 'Days must be between 1 and 30' },
        { status: 400 }
      );
    }

    // Validate delivery mode
    const validModes = ['public', 'inhouse', 'online'];
    if (!validModes.includes(deliveryMode)) {
      return NextResponse.json(
        { error: `Invalid delivery mode. Must be one of: ${validModes.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate promo code
    if (promoCode) {
      const rate = getPromoDiscount(promoCode);
      if (rate === 0) {
        return NextResponse.json(
          { error: 'Invalid promo code', validPromoCode: false },
          { status: 400 }
        );
      }
    }

    const config = {
      deliveryMode,
      delegates,
      days,
      location: body.location || '',
      promoCode: promoCode || '',
      selectedAddOns: selectedAddOns || [],
    };

    const pricing = calculatePricing(config, basePricePerDay, addOns);
    const volumeInfo = getVolumeDiscountRate(delegates);

    return NextResponse.json({
      success: true,
      pricing,
      volumeDiscount: volumeInfo,
      config,
    });
  } catch (error) {
    console.error('[PRICING API ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to calculate pricing' },
      { status: 500 }
    );
  }
}
