import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name, email, phone, company, sourcePage,
      programmeInterest, delegatesCount, enquiryType, message, sessionId,
    } = body;

    // Basic validation
    if (!email && !phone && !name) {
      return NextResponse.json(
        { error: 'Please provide at least a name, email, or phone number' },
        { status: 400 }
      );
    }

    // Create lead
    const lead = await db.lead.create({
      data: {
        name: name || '',
        email: email || '',
        phone: phone || '',
        company: company || '',
        sourcePage: sourcePage || '',
        programmeInterest: programmeInterest || '',
        delegatesCount: delegatesCount || 0,
        enquiryType: enquiryType || 'general',
        message: message || '',
        status: 'new',
      },
    });

    // Link conversation to lead if sessionId provided
    if (sessionId) {
      try {
        await db.assistantConversation.update({
          where: { sessionId },
          data: { leadId: lead.id },
        });
      } catch {
        // Conversation may not exist, that's okay
      }
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Thank you! Our training consultants will reach out to you shortly.',
    });
  } catch (error) {
    console.error('Lead Capture Error:', error);
    return NextResponse.json(
      { error: 'Failed to save your information. Please try again.' },
      { status: 500 }
    );
  }
}
