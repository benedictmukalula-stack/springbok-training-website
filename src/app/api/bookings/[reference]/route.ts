import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;

    if (!reference) {
      return NextResponse.json({ error: 'Booking reference is required' }, { status: 400 });
    }

    const booking = await db.booking.findUnique({
      where: { reference },
      include: {
        delegates: true,
        payments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Parse JSON fields
    const parsedBooking = {
      ...booking,
      pricingConfig: JSON.parse(booking.pricingConfig || '{}'),
      pricingSnapshot: JSON.parse(booking.pricingSnapshot || '{}'),
    };

    return NextResponse.json({
      success: true,
      booking: parsedBooking,
    });
  } catch (error) {
    console.error('[BOOKING LOOKUP ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to retrieve booking' },
      { status: 500 }
    );
  }
}
