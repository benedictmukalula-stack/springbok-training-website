import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';
import { db } from '@/lib/db';

// Handoff trigger keywords
const HANDOFF_KEYWORDS = [
  'quote', 'proposal', 'discount', 'invoice', 'urgent',
  'negotiate', 'negotiation', 'procurement', 'tender',
  'custom pricing', 'customized pricing', 'bulk pricing',
  'vat', 'tax exemption', 'payment plan', 'credit terms',
];

const WHATSAPP_NUMBER = '260966135560';

function buildSystemPrompt(programmes: { title: string; slug: string; categoryTitle: string; shortDescription: string; duration: string; basePricePerDay: number; deliveryModes: string; targetAudience: string; level: string }[]) {
  const programmeList = programmes
    .slice(0, 40)
    .map((p) => `  - ${p.title} (${p.categoryTitle}) | ${p.duration} | K${p.basePricePerDay.toLocaleString()}/day | ${p.deliveryModes.replace(/[\[\]"]/g, '')} | Level: ${p.level} | ${p.shortDescription.slice(0, 120)}`)
    .join('\n');

  return `You are the AI Assistant for **Springbok Training & Business Solutions**, Zambia's premier corporate training academy. Be warm, professional, and helpful. Always use a friendly but expert tone.

## Company Overview
- **Company**: Springbok Training & Business Solutions
- **Experience**: 17+ years in corporate training
- **Clients**: 500+ organizations across Zambia
- **Facilitators**: 50+ expert facilitators
- **Coverage**: All 10 provinces of Zambia
- **Accreditation**: BCI accredited training provider
- **Registration**: Cert No 320180002598, TP No 1005238205

## Pricing (always reference these)
- **Public Training**: K3,500 per participant per day
- **In-House Training**: K4,200 per participant per day (delivered at client's venue)
- **Customized Training**: K5,250 per participant per day (tailored content)
- **Volume Discounts**: 5% for 10-19 delegates, 10% for 20-29 delegates, 15% for 30+ delegates

## Contact Information
- **Phone**: +260 966 135 560, +260 955 135 560
- **Email**: info@springboktraining.net, registration@springboktraining.net, accounts@springboktraining.net
- **Office**: Jezmondine 13th Central Street, Lusaka, Zambia
- **Working Hours**: Mon-Fri 08:00-17:00, Sat 09:00-13:00

## Our Active Programmes (${programmes.length} programmes)
${programmeList}

## Categories
1. Leadership & Management (7 programmes)
2. Sales & Customer Service (5 programmes)
3. Personal Development (7 programmes)
4. Administration & Operations (5 programmes)
5. Human Resources (3 programmes)
6. Corporate Solutions (4 programmes)

## Response Guidelines
1. Be concise but thorough — aim for 2-4 short paragraphs max per response
2. When recommending programmes, reference specific programmes from the list above
3. If someone asks about pricing, give the standard rates and mention volume discounts
4. If they mention a specific programme by name, give detailed info about it
5. For programme recommendations, ask about: team size, industry, current skill gaps, preferred dates
6. Always mention that in-house training can be customized to their specific needs
7. If you don't know something specific, be honest and suggest contacting the team
8. Never make up pricing, dates, or programme details not in your knowledge
9. Format responses with bullet points or numbered lists when appropriate
10. If the user seems ready to book or needs a formal quote, suggest they talk to the training consultants via WhatsApp or request a proposal`;
}

function detectHandoff(message: string): boolean {
  const lower = message.toLowerCase();

  // Check for handoff keywords
  for (const keyword of HANDOFF_KEYWORDS) {
    if (lower.includes(keyword)) return true;
  }

  // Check for large delegate count mentions
  const delegatePatterns = [
    /(\d{2,})\s*(delegates?|participants?|people|staff|employees?|team\s*members?)/i,
    /(\d{2,})\s*(or\s*more|plus|\+)/i,
  ];
  for (const pattern of delegatePatterns) {
    const match = lower.match(pattern);
    if (match && parseInt(match[1]) >= 10) return true;
  }

  return false;
}

function detectIntent(message: string): string {
  const lower = message.toLowerCase();

  if (/recommend|suggest|which programme|what programme|best course|suitable/i.test(lower)) {
    return 'programme_recommendation';
  }
  if (/price|pricing|cost|how much|budget|rate|fee|quote|discount/i.test(lower)) {
    return 'pricing';
  }
  if (/proposal|quote|formal|document|tender|procurement|bid/i.test(lower)) {
    return 'proposal';
  }
  if (/whatsapp|talk to someone|human|agent|real person|call me|phone/i.test(lower)) {
    return 'handoff';
  }
  return 'general';
}

function getSuggestedActions(intent: string): string[] {
  switch (intent) {
    case 'programme_recommendation':
      return ['Ask About Pricing', 'Request a Proposal', 'Talk on WhatsApp'];
    case 'pricing':
      return ['Get a Custom Quote', 'Request a Proposal', 'Talk on WhatsApp'];
    case 'proposal':
      return ['Continue on WhatsApp', 'Email Us Directly'];
    case 'handoff':
      return ['Chat on WhatsApp', 'Request a Call Back'];
    default:
      return ['Browse Programmes', 'Ask About Pricing', 'Talk on WhatsApp'];
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, sessionId, page, programmeSlug } = body;

    if (!messages || !sessionId) {
      return NextResponse.json(
        { error: 'Messages and sessionId are required' },
        { status: 400 }
      );
    }

    const lastUserMessage = messages.filter((m: { role: string }) => m.role === 'user').pop();
    const userText = lastUserMessage?.content || '';

    // Detect intent and handoff
    const intent = detectIntent(userText);
    const handoffDetected = detectHandoff(userText);

    // Load programmes from DB for context
    let programmeContext = '';
    let relevantProgramme = null;

    if (programmeSlug) {
      relevantProgramme = await db.programme.findUnique({
        where: { slug: programmeSlug },
      });
    }

    if (!relevantProgramme) {
      // Try to find programme by name in user message
      const allProgrammes = await db.programme.findMany({
        where: { active: true },
        select: {
          title: true, slug: true, categoryTitle: true,
          shortDescription: true, duration: true, basePricePerDay: true,
          deliveryModes: true, targetAudience: true, level: true,
        },
      });

      for (const prog of allProgrammes) {
        const titleWords = prog.title.toLowerCase().split(' ').filter((w: string) => w.length > 3);
        if (titleWords.some((w: string) => userText.toLowerCase().includes(w))) {
          relevantProgramme = prog;
          break;
        }
      }

      programmeContext = buildSystemPrompt(allProgrammes);
    } else {
      const allProgrammes = await db.programme.findMany({
        where: { active: true },
        select: {
          title: true, slug: true, categoryTitle: true,
          shortDescription: true, duration: true, basePricePerDay: true,
          deliveryModes: true, targetAudience: true, level: true,
        },
      });
      programmeContext = buildSystemPrompt(allProgrammes);
    }

    // Add programme-specific context if found
    let systemMessage = programmeContext;
    if (relevantProgramme) {
      systemMessage += `\n\n## Current Programme Context (user is viewing this programme)\n- **${relevantProgramme.title}** (${relevantProgramme.categoryTitle})\n- Duration: ${relevantProgramme.duration}\n- Price: K${relevantProgramme.basePricePerDay.toLocaleString()}/day\n- Delivery: ${relevantProgramme.deliveryModes}\n- Level: ${relevantProgramme.level}\n- Description: ${relevantProgramme.shortDescription}\n\nThe user is currently viewing this programme page. Provide specific details about it when relevant.`;
    }

    // Add page context
    if (page) {
      systemMessage += `\n\nThe user is currently on page: ${page}`;
    }

    // Create or update conversation
    const conversation = await db.assistantConversation.upsert({
      where: { sessionId },
      create: {
        sessionId,
        lastPage: page || '',
        intent,
        status: handoffDetected ? 'handoff' : 'active',
        handoffRequested: handoffDetected,
        messageCount: messages.length,
      },
      update: {
        lastPage: page || '',
        intent,
        status: handoffDetected ? 'handoff' : 'active',
        handoffRequested: handoffDetected,
        messageCount: { increment: 1 },
      },
    });

    // Call AI
    let reply = '';

    try {
      const zai = await ZAI.create();
      const completion = await zai.chat.completions.create({
        model: 'default',
        messages: [
          { role: 'system', content: systemMessage },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
          })),
        ],
        temperature: 0.7,
        max_tokens: 800,
      });

      reply = completion.choices?.[0]?.message?.content || "I'd be happy to help you with that. Could you please provide more details about what you're looking for?";

      // Trim and clean up
      reply = reply.trim();
    } catch (aiError) {
      console.error('AI SDK Error:', aiError);
      reply = "I'm having trouble connecting right now. Please try again in a moment, or contact our team directly:\n\n- **Phone**: +260 966 135 560\n- **Email**: info@springboktraining.net\n- **WhatsApp**: Chat with us instantly\n\nOur working hours are Mon-Fri 08:00-17:00, Sat 09:00-13:00.";
    }

    return NextResponse.json({
      reply,
      handoff: handoffDetected,
      suggestedActions: getSuggestedActions(intent),
      conversationId: conversation.id,
      programmeInfo: relevantProgramme ? {
        title: relevantProgramme.title,
        slug: relevantProgramme.slug,
      } : null,
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      {
        reply: "I'm sorry, something went wrong. Please try again or contact us at +260 966 135 560 or info@springboktraining.net.",
        handoff: false,
        suggestedActions: ['Chat on WhatsApp', 'Browse Programmes'],
        error: true,
      },
      { status: 500 }
    );
  }
}
