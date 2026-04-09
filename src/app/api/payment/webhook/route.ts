import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * Payment Webhook Endpoint
 * 
 * In production, this handles callbacks from payment providers
 * (e.g. Stripe, PayFast, Mobile Money APIs).
 * 
 * Currently supports a manual trigger for testing/demo purposes.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingReference, status, providerRef, providerPayload } = body;

    if (!bookingReference || !status) {
      return NextResponse.json(
        { error: 'bookingReference and status are required' },
        { status: 400 }
      );
    }

    const validStatuses = ['completed', 'failed', 'refunded'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    // ── Find booking ──
    const booking = await db.booking.findUnique({
      where: { reference: bookingReference },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // ── Find pending payment for this booking ──
    const pendingPayment = await db.payment.findFirst({
      where: {
        bookingId: booking.id,
        status: 'processing',
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!pendingPayment) {
      // Create a new payment record if none exists
      if (status === 'completed') {
        await db.payment.create({
          data: {
            bookingId: booking.id,
            paymentMethod: booking.paymentMethod || 'card',
            amount: booking.totalAmount,
            status: 'completed',
            providerRef: providerRef || `WEBHOOK-${Date.now().toString(36).toUpperCase()}`,
            providerPayload: JSON.stringify(providerPayload || {}),
            completedAt: new Date(),
          },
        });

        await db.booking.update({
          where: { reference: bookingReference },
          data: {
            status: 'paid',
            paidAt: new Date(),
          },
        });

        console.log(`[WEBHOOK] Booking ${bookingReference} marked as PAID via webhook`);
      }

      return NextResponse.json({ success: true, message: 'Webhook processed' });
    }

    // ── Update payment status ──
    const updateData: {
      status: string;
      completedAt?: Date;
      providerRef?: string;
      providerPayload?: string;
    } = { status };

    if (status === 'completed') {
      updateData.completedAt = new Date();
    }
    if (providerRef) updateData.providerRef = providerRef;
    if (providerPayload) updateData.providerPayload = JSON.stringify(providerPayload);

    await db.payment.update({
      where: { id: pendingPayment.id },
      data: updateData,
    });

    // ── Update booking status based on payment ──
    if (status === 'completed') {
      await db.booking.update({
        where: { reference: bookingReference },
        data: { status: 'paid', paidAt: new Date() },
      });
      console.log(`[WEBHOOK] Booking ${bookingReference} → PAID (via ${providerRef || 'webhook'})`);
    } else if (status === 'failed') {
      await db.booking.update({
        where: { reference: bookingReference },
        data: { status: 'pending' }, // Reset to pending so they can retry
      });
      console.warn(`[WEBHOOK] Booking ${bookingReference} payment FAILED`);
    } else if (status === 'refunded') {
      await db.booking.update({
        where: { reference: bookingReference },
        data: { status: 'cancelled' },
      });
      console.warn(`[WEBHOOK] Booking ${bookingReference} REFUNDED`);
    }

    return NextResponse.json({ success: true, message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('[WEBHOOK ERROR]', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
