import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      bookingReference,
      paymentMethod,
      amount,
      mobileNumber,
      cardDetails,
    } = body;

    // ── Validate ──
    if (!bookingReference || !paymentMethod) {
      return NextResponse.json(
        { error: 'Booking reference and payment method are required' },
        { status: 400 }
      );
    }

    const validMethods = ['mobile', 'bank', 'card'];
    if (!validMethods.includes(paymentMethod)) {
      return NextResponse.json(
        { error: `Invalid payment method. Must be one of: ${validMethods.join(', ')}` },
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

    if (booking.status === 'paid') {
      return NextResponse.json({ error: 'Booking already paid' }, { status: 400 });
    }

    // ── Validate payment method specifics ──
    if (paymentMethod === 'mobile' && !mobileNumber) {
      return NextResponse.json(
        { error: 'Mobile number is required for mobile money payment' },
        { status: 400 }
      );
    }

    if (paymentMethod === 'card' && (!cardDetails?.number || !cardDetails?.expiry || !cardDetails?.cvv)) {
      return NextResponse.json(
        { error: 'Card details are incomplete' },
        { status: 400 }
      );
    }

    // ── Create payment record ──
    const payment = await db.payment.create({
      data: {
        bookingId: booking.id,
        paymentMethod,
        amount: amount || booking.totalAmount,
        status: 'processing',
        providerRef: `TXN-${Date.now().toString(36).toUpperCase()}`,
        providerPayload: JSON.stringify({
          paymentMethod,
          mobileNumber: paymentMethod === 'mobile' ? mobileNumber?.replace(/.(?=.{4})/g, '•') : undefined,
          cardLast4: paymentMethod === 'card' ? cardDetails?.number?.slice(-4) : undefined,
          timestamp: new Date().toISOString(),
        }),
      },
    });

    console.log(`[PAYMENT PROCESSING] ${payment.providerRef} | ${bookingReference} | ${paymentMethod} | K${payment.amount.toLocaleString()}`);

    // ── Simulate payment processing (replace with real provider) ──
    // In production, this would redirect to payment provider and handle via webhook
    const isSuccessful = Math.random() > 0.05; // 95% success rate simulation

    if (isSuccessful) {
      // Update payment to completed
      const completedPayment = await db.payment.update({
        where: { id: payment.id },
        data: {
          status: 'completed',
          completedAt: new Date(),
        },
      });

      // Update booking to paid
      const updatedBooking = await db.booking.update({
        where: { reference: bookingReference },
        data: {
          status: 'paid',
          paidAt: new Date(),
          paymentMethod,
        },
      });

      console.log(`[PAYMENT SUCCESS] ${payment.providerRef} → ${bookingReference} is now PAID`);

      return NextResponse.json({
        success: true,
        payment: {
          id: completedPayment.id,
          providerRef: completedPayment.providerRef,
          status: 'completed',
          amount: completedPayment.amount,
        },
        booking: {
          reference: updatedBooking.reference,
          status: updatedBooking.status,
          paidAt: updatedBooking.paidAt,
        },
      });
    } else {
      // Payment failed
      await db.payment.update({
        where: { id: payment.id },
        data: { status: 'failed' },
      });

      console.warn(`[PAYMENT FAILED] ${payment.providerRef} → ${bookingReference}`);

      return NextResponse.json({
        success: false,
        error: 'Payment processing failed. Please try again.',
        payment: {
          id: payment.id,
          providerRef: payment.providerRef,
          status: 'failed',
        },
      }, { status: 402 });
    }
  } catch (error) {
    console.error('[PAYMENT PROCESS ERROR]', error);
    return NextResponse.json(
      { error: 'Payment processing failed. Please try again.' },
      { status: 500 }
    );
  }
}
