import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { calculatePricing } from '@/lib/pricing-engine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      programmeSlug,
      company,
      authoriser,
      delegates,
      pricingConfig,
      pricingSnapshot,
      basePricePerDay,
      addOns,
      isInvoiceOnly = false,
    } = body;

    // ── Validate required fields ──
    if (!programmeSlug) {
      return NextResponse.json({ error: 'programmeSlug is required' }, { status: 400 });
    }
    if (!company?.companyName || !company?.billingEmail) {
      return NextResponse.json({ error: 'Company name and billing email are required' }, { status: 400 });
    }
    if (!authoriser?.fullName || !authoriser?.email) {
      return NextResponse.json({ error: 'Authoriser name and email are required' }, { status: 400 });
    }
    if (!delegates || delegates.length === 0) {
      return NextResponse.json({ error: 'At least one delegate is required' }, { status: 400 });
    }
    if (!delegates[0]?.fullName || !delegates[0]?.email) {
      return NextResponse.json({ error: 'First delegate must have a name and email' }, { status: 400 });
    }

    // ── Verify pricing on server (never trust client) ──
    const serverPricing = calculatePricing(
      pricingConfig,
      basePricePerDay,
      addOns || []
    );

    // Compare totals — allow small rounding differences
    if (Math.abs(serverPricing.total - pricingSnapshot.total) > 2) {
      console.warn('[BOOKING] Pricing mismatch detected', {
        clientTotal: pricingSnapshot.total,
        serverTotal: serverPricing.total,
      });
      // Use server pricing (more authoritative)
    }

    // ── Generate references ──
    const reference = 'SBK-' + Date.now().toString(36).toUpperCase();
    const invoiceNumber = 'INV-' + Date.now().toString(36).toUpperCase();
    const now = new Date();
    const dueDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // ── Create booking with delegates in transaction ──
    const finalTotal = serverPricing.total;

    const booking = await db.booking.create({
      data: {
        reference,
        programmeId: programmeSlug, // using slug as programmeId (can be mapped later)
        companyName: company.companyName,
        industry: company.industry || '',
        billingEmail: company.billingEmail,
        phone: company.phone || '',
        billingAddress: company.billingAddress || '',
        authoriserName: authoriser.fullName || '',
        authoriserJob: authoriser.jobTitle || '',
        authoriserEmail: authoriser.email || '',
        authoriserPhone: authoriser.phone || '',
        pricingConfig: JSON.stringify(pricingConfig),
        pricingSnapshot: JSON.stringify(serverPricing),
        totalAmount: finalTotal,
        status: isInvoiceOnly ? 'pending' : 'confirmed',
        isInvoiceOnly,
        invoiceNumber: isInvoiceOnly ? invoiceNumber : invoiceNumber,
        invoiceDate: now,
        dueDate,
        delegates: {
          create: delegates.map((d: { fullName: string; email: string; role?: string; phone?: string; location?: string }) => ({
            fullName: d.fullName,
            email: d.email,
            role: d.role || '',
            phone: d.phone || '',
            location: d.location || '',
          })),
        },
      },
      include: {
        delegates: true,
      },
    });

    console.log(`[BOOKING CREATED] ${reference} | ${company.companyName} | ${delegates.length} delegates | K${finalTotal.toLocaleString()} | ${isInvoiceOnly ? 'INVOICE' : 'PAYMENT'}`);

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        reference: booking.reference,
        invoiceNumber: booking.invoiceNumber,
        status: booking.status,
        totalAmount: booking.totalAmount,
        delegateCount: booking.delegates.length,
        createdAt: booking.createdAt,
        dueDate: booking.dueDate,
      },
    });
  } catch (error) {
    console.error('[BOOKING CREATE ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to create booking. Please try again.' },
      { status: 500 }
    );
  }
}
