import { NextRequest, NextResponse } from 'next/server';

/**
 * Email Notification API
 * 
 * Sends booking confirmation / invoice notification emails.
 * In production, integrate with:
 *   - SendGrid
 *   - AWS SES
 *   - Resend
 *   - or any SMTP provider
 * 
 * For now, this logs the email and returns success (simulation mode).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      type,         // 'booking_confirmation' | 'invoice' | 'payment_receipt'
      to,           // recipient email
      bookingRef,
      invoiceNumber,
      companyName,
      courseTitle,
      delegateCount,
      totalAmount,
      status,
    } = body;

    if (!to || !type) {
      return NextResponse.json(
        { error: 'Recipient email and notification type are required' },
        { status: 400 }
      );
    }

    const validTypes = ['booking_confirmation', 'invoice', 'payment_receipt'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // ── Log notification (simulated) ──
    const subject =
      type === 'booking_confirmation'
        ? `Booking Confirmed: ${bookingRef} — Springbok Training Academy`
        : type === 'invoice'
        ? `Invoice ${invoiceNumber} — Springbok Training Academy`
        : `Payment Receipt: ${bookingRef} — Springbok Training Academy`;

    console.log(`
═══════════════════════════════════════
📧 EMAIL NOTIFICATION
═══════════════════════════════════════
Type: ${type}
To: ${to}
Subject: ${subject}
───────────────────────────────────────
Company: ${companyName || 'N/A'}
Course: ${courseTitle || 'N/A'}
Delegates: ${delegateCount || 'N/A'}
Amount: K${(totalAmount || 0).toLocaleString()}
Status: ${status || 'N/A'}
Booking Ref: ${bookingRef || 'N/A'}
Invoice No: ${invoiceNumber || 'N/A'}
═══════════════════════════════════════
    `);

    // ── In production, send actual email here ──
    // Email routing:
    //   info@springboktraining.net        — Visitor contact form (general inquiries)
    //   registration@springboktraining.net — Programme registration confirmations
    //   subscribe@springboktraining.net    — Newsletter subscriptions
    //   accounts@springboktraining.net     — Payments & invoices
    //
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // const fromAddress = type === 'invoice' || type === 'payment_receipt'
    //   ? 'Springbok Accounts <accounts@springboktraining.net>'
    //   : 'Springbok Training <registration@springboktraining.net>';
    // await resend.emails.send({
    //   from: fromAddress,
    //   to,
    //   subject,
    //   html: generateEmailTemplate(type, body),
    // });

    return NextResponse.json({
      success: true,
      message: `Notification (${type}) logged for ${to}`,
      simulated: true,
    });
  } catch (error) {
    console.error('[NOTIFICATION ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}
