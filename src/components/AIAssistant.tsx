'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  X,
  Send,
  MessageSquare,
  Phone,
  BookOpen,
  DollarSign,
  FileText,
  Users,
  HelpCircle,
  ChevronRight,
  Loader2,
} from 'lucide-react';

/* ─── Types ─── */
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface QuickAction {
  label: string;
  icon: React.ReactNode;
  prompt: string;
}

/* ─── Context-Aware Quick Actions ─── */
function getQuickActions(pathname: string): QuickAction[] {
  if (pathname.startsWith('/programmes/') && pathname.split('/').filter(Boolean).length >= 2) {
    return [
      { label: 'About This Programme', icon: <BookOpen className="w-4 h-4" />, prompt: "Tell me more about this programme — who should attend and what will I learn?" },
      { label: 'Check Pricing', icon: <DollarSign className="w-4 h-4" />, prompt: "What is the pricing for this programme, including group discounts?" },
      { label: 'Who Should Attend?', icon: <Users className="w-4 h-4" />, prompt: "Who is this programme designed for? What roles and experience levels?" },
      { label: 'Continue on WhatsApp', icon: <Phone className="w-4 h-4" />, prompt: "whatsapp" },
    ];
  }
  if (pathname === '/corporate' || pathname === '/solutions') {
    return [
      { label: 'Discuss Training Needs', icon: <Users className="w-4 h-4" />, prompt: "I'd like to discuss in-house training solutions for my team." },
      { label: 'Request a Proposal', icon: <FileText className="w-4 h-4" />, prompt: "I'd like to request a formal training proposal for our organization." },
      { label: 'Ask About Pricing', icon: <DollarSign className="w-4 h-4" />, prompt: "What are the pricing options for in-house and customized training?" },
      { label: 'Talk on WhatsApp', icon: <Phone className="w-4 h-4" />, prompt: "whatsapp" },
    ];
  }
  if (pathname === '/gallery') {
    return [
      { label: 'Browse Programmes', icon: <BookOpen className="w-4 h-4" />, prompt: "What training programmes does Springbok offer?" },
      { label: 'Request a Proposal', icon: <FileText className="w-4 h-4" />, prompt: "I'd like to request a training proposal." },
      { label: 'Talk on WhatsApp', icon: <Phone className="w-4 h-4" />, prompt: "whatsapp" },
    ];
  }
  // Default / homepage
  return [
    { label: 'Recommend a Programme', icon: <BookOpen className="w-4 h-4" />, prompt: "Can you recommend a programme for my team?" },
    { label: 'Ask About Pricing', icon: <DollarSign className="w-4 h-4" />, prompt: "What are your training prices and do you offer group discounts?" },
    { label: 'Request a Proposal', icon: <FileText className="w-4 h-4" />, prompt: "I'd like to request a formal training proposal." },
    { label: 'Talk on WhatsApp', icon: <Phone className="w-4 h-4" />, prompt: "whatsapp" },
  ];
}

function getWhatsAppMessage(pathname: string): string {
  if (pathname.startsWith('/programmes/')) {
    const slug = pathname.split('/').pop()?.replace(/-/g, ' ') || 'training';
    return `Hello Springbok Training, I'm interested in the ${slug.replace(/\b\w/g, c => c.toUpperCase())} programme. Please share more details on dates, format, and pricing.`;
  }
  if (pathname === '/corporate') {
    return "Hello Springbok Training, we would like a proposal for corporate training for our team. Please assist with the next steps.";
  }
  if (pathname === '/gallery') {
    return "Hello Springbok Training, I visited your website gallery and would like to learn about your training programmes.";
  }
  return "Hello Springbok Training, I would like to learn more about your corporate training solutions.";
}

/* ─── Main Component ─── */
export default function AIAssistant() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showHandoff, setShowHandoff] = useState(false);
  const [handoffUrl, setHandoffUrl] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastActionRef = useRef(0);

  // Initialize session
  useEffect(() => {
    let sid = sessionStorage.getItem('sbk_ai_session');
    if (!sid) {
      sid = 'sbk_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      sessionStorage.setItem('sbk_ai_session', sid);
    }
    setSessionId(sid);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Show lead form after 4 messages
  useEffect(() => {
    const userMsgs = messages.filter(m => m.role === 'user').length;
    if (userMsgs >= 4 && !showLeadForm && !showHandoff) {
      setShowLeadForm(true);
    }
  }, [messages, showLeadForm, showHandoff]);

  // Reset lead form on page change
  useEffect(() => {
    setShowLeadForm(false);
    setShowHandoff(false);
  }, [pathname]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Rate limit: 1 message per 2 seconds
    const now = Date.now();
    if (now - lastActionRef.current < 2000) return;
    lastActionRef.current = now;

    // Handle WhatsApp shortcut
    if (text.trim().toLowerCase() === 'whatsapp') {
      const msg = getWhatsAppMessage(pathname);
      const url = `https://wa.me/260966135560?text=${encodeURIComponent(msg)}`;
      setHandoffUrl(url);
      setShowHandoff(true);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'll connect you with our training consultants on WhatsApp for a quick response.\n\n",
        timestamp: Date.now(),
      }]);
      try {
        await fetch('/api/assistant/handoff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            programmeInterest: pathname.startsWith('/programmes/') ? pathname.split('/').pop() : '',
            handoffReason: 'user_requested',
            prefilledMessage: msg,
          }),
        });
      } catch (e) { /* silent */ }
      return;
    }

    const userMsg: Message = { role: 'user', content: text.trim(), timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          sessionId,
          page: pathname,
          programmeSlug: pathname.startsWith('/programmes/') ? pathname.split('/').pop() : undefined,
        }),
      });

      const data = await res.json();
      const assistantMsg: Message = {
        role: 'assistant',
        content: data.reply || "I'm sorry, I couldn't process that. Please try again.",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, assistantMsg]);

      // Handle handoff
      if (data.handoff) {
        const msg = getWhatsAppMessage(pathname);
        const url = `https://wa.me/260966135560?text=${encodeURIComponent(msg)}`;
        setHandoffUrl(url);
        setShowHandoff(true);

        try {
          await fetch('/api/assistant/handoff', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sessionId,
              programmeInterest: data.programmeInfo?.title || '',
              handoffReason: 'complex_enquiry',
              prefilledMessage: msg,
            }),
          });
        } catch (e) { /* silent */ }
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again or contact us at **+260 966 135 560** or **info@springboktraining.net**.",
        timestamp: Date.now(),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, sessionId, pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickAction = (action: QuickAction) => {
    sendMessage(action.prompt);
  };

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('lead-name') as HTMLInputElement)?.value || '',
      email: (form.elements.namedItem('lead-email') as HTMLInputElement)?.value || '',
      phone: (form.elements.namedItem('lead-phone') as HTMLInputElement)?.value || '',
      company: (form.elements.namedItem('lead-company') as HTMLInputElement)?.value || '',
      sourcePage: pathname,
      programmeInterest: pathname.startsWith('/programmes/') ? pathname.split('/').pop() : '',
      enquiryType: 'assistant_chat',
      message: `AI Assistant conversation with ${messages.filter(m => m.role === 'user').length} messages`,
      sessionId,
    };

    try {
      await fetch('/api/assistant/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setShowLeadForm(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Thank you! Our training consultants will reach out to you shortly. Is there anything else I can help with?",
        timestamp: Date.now(),
      }]);
    } catch {
      /* silent */
    }
  };

  const skipLeadForm = () => setShowLeadForm(false);

  const resetChat = () => {
    setMessages([]);
    setShowLeadForm(false);
    setShowHandoff(false);
    setIsOpen(false);
  };

  const quickActions = getQuickActions(pathname);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors duration-300 ${
          isOpen
            ? 'bg-gray-800 hover:bg-gray-700'
            : 'bg-[#16a34a] hover:bg-[#15803d] shadow-green-600/30'
        }`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={!isOpen ? { boxShadow: ['0 0 0 0 rgba(22,163,74,0.4)', '0 0 0 12px rgba(22,163,74,0)', '0 0 0 0 rgba(22,163,74,0)'] } : {}}
        transition={!isOpen ? { duration: 2, repeat: Infinity, repeatDelay: 3 } : {}}
        aria-label={isOpen ? 'Close assistant' : 'Open AI assistant'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Sparkles className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] max-h-[560px] bg-white rounded-2xl shadow-2xl shadow-black/20 border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#16a34a] to-[#15803d] text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Springbok AI Assistant</h3>
                  <p className="text-[10px] text-white/70">Ask about programmes, pricing & more</p>
                </div>
              </div>
              <button
                onClick={resetChat}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-[200px] max-h-[340px]">
              {messages.length === 0 && (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 mx-auto mb-3 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#16a34a]" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Hi! How can I help you?</p>
                  <p className="text-xs text-gray-500 mb-5">Ask about programmes, pricing, or get a recommendation.</p>

                  {/* Quick Actions Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => handleQuickAction(action)}
                        className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-[#16a34a]/20 rounded-xl text-xs font-medium text-gray-700 hover:text-[#16a34a] transition-all duration-200 text-left"
                      >
                        {action.icon}
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#16a34a] text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Handoff Card */}
              {showHandoff && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-[#16a34a]/20 rounded-xl p-4"
                >
                  <p className="text-xs font-semibold text-[#15803d] mb-2">Connect with Our Team</p>
                  <p className="text-xs text-gray-600 mb-3">Our training consultants are ready to help you with a personalized response.</p>
                  <div className="flex gap-2">
                    <a
                      href={handoffUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-medium rounded-lg transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                    <a
                      href={`mailto:info@springboktraining.net?subject=${encodeURIComponent('Training Enquiry')}&body=${encodeURIComponent(getWhatsAppMessage(pathname))}`}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Email Us
                    </a>
                  </div>
                </motion.div>
              )}

              {/* Lead Capture Form */}
              {showLeadForm && !showHandoff && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4"
                >
                  <p className="text-xs font-semibold text-gray-900 mb-1">Get a Personalized Response</p>
                  <p className="text-[10px] text-gray-500 mb-3">Share your details and our consultants will reach out.</p>
                  <form onSubmit={handleLeadSubmit} className="space-y-2">
                    <input
                      name="lead-name"
                      type="text"
                      placeholder="Your name"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        name="lead-email"
                        type="email"
                        placeholder="Email"
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]"
                      />
                      <input
                        name="lead-phone"
                        type="tel"
                        placeholder="Phone / WhatsApp"
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]"
                      />
                    </div>
                    <input
                      name="lead-company"
                      type="text"
                      placeholder="Company (optional)"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 px-3 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-medium rounded-lg transition-colors"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={skipLeadForm}
                        className="px-3 py-2 text-gray-500 text-xs hover:text-gray-700 transition-colors"
                      >
                        Skip
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {messages.length > 0 && (
              <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-gray-100 bg-white">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    disabled={isLoading}
                    className="flex-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] disabled:opacity-50 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="w-10 h-10 bg-[#16a34a] hover:bg-[#15803d] disabled:bg-gray-300 text-white rounded-xl flex items-center justify-center transition-colors"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
