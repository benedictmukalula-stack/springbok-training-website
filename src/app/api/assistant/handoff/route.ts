import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const WHATSAPP_NUMBER = '260966135560';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, programmeInterest, handoffReason, prefilledMessage, leadId } = body;

    if (!sessionId && !leadId) {
      return NextResponse.json(
        { error: 'Session ID or Lead ID is required' },
        { status: 400 }
      );
    }

    // Build WhatsApp URL with prefilled message
    const defaultMessage = prefilledMessage || `Hello Springbok Training, I'd like to speak with a training consultant${programmeInterest ? ` about ${programmeInterest}` : ''}. Thank you!`;
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Create handoff record
    const handoff = await db.whatsappHandoff.create({
      data: {
        leadId: leadId || null,
        programmeInterest: programmeInterest || '',
        handoffReason: handoffReason || 'general',
        prefilledMessage: defaultMessage,
        conversationId: sessionId || '',
      },
    });

    // Update conversation status if sessionId provided
    if (sessionId) {
      try {
        await db.assistantConversation.update({
          where: { sessionId },
          data: {
            status: 'handoff',
            handoffRequested: true,
          },
        });
      } catch {
        // Conversation may not exist
      }
    }

    // If leadId provided, update lead status
    if (leadId) {
      try {
        await db.lead.update({
          where: { id: leadId },
          data: { status: 'contacted' },
        });
      } catch {
        // Lead may not exist
      }
    }

    return NextResponse.json({
      success: true,
      handoffId: handoff.id,
      whatsappUrl,
    });
  } catch (error) {
    console.error('Handoff Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process handoff request.',
        whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Springbok Training, I have an enquiry about your training programmes.')}`,
      },
      { status: 500 }
    );
  }
}
