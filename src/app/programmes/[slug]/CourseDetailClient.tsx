'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, ArrowRight, ChevronRight, Clock, Users, CheckCircle2, Award,
  Sparkles, ChevronDown, ChevronUp, Download, ShoppingCart,
  Building2, User, FileText, Plus, Minus, Loader2, ShieldCheck,
  Zap, Calculator, CreditCard, Mail, Phone, MapPin, Globe,
  AlertCircle, Check, BadgeCheck, Printer, UserPlus, Trash2, UserMinus,
  Receipt, Smartphone, Landmark, Wallet, Copy, CalendarDays, Send, PartyPopper, CircleDollarSign, Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Course } from '@/lib/courses-data';
import { useAppStore, calculatePricing, formatZMW, getVolumeDiscountRate, getPromoDiscount } from '@/lib/store';
import type { PricingConfig, DelegateDetails, PricingSnapshot } from '@/lib/store';

// ═══════════════════════════════════════════════
// LEVEL BADGES
// ═══════════════════════════════════════════════
const LEVEL_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Foundation: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Intermediate: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  Advanced: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  Custom: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
};

// ═══════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════
export default function CourseDetailClient({ course }: { course: Course }) {
  const router = useRouter();
  const { addToCart, setBookingStatus, setBookingReference, lastBooking, bookingReference, bookingStatus } = useAppStore();

  // Flow state
  const [step, setStep] = useState<'details' | 'register' | 'checkout' | 'payment' | 'confirmed'>('details');

  // Pricing config
  const [pricingConfig, setPricingConfig] = useState<PricingConfig>({
    deliveryMode: 'public',
    delegates: 5,
    days: course.duration === '1 Day' ? 1 : course.duration === '2 Days' ? 2 : 3,
    location: '',
    promoCode: '',
    selectedAddOns: [],
  });

  // Registration
  const [company, setCompany] = useState({ companyName: '', industry: '', billingEmail: '', phone: '', billingAddress: '' });
  const [authoriser, setAuthoriser] = useState({ fullName: '', jobTitle: '', email: '', phone: '' });
  const [delegates, setDelegates] = useState<DelegateDetails[]>([
    { fullName: '', role: '', email: '', phone: '', location: '' },
  ]);

  // UI state
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'mobile' | 'bank' | 'card'>('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');

  // Calculate pricing
  const pricing = useMemo(() => {
    const addOnDaysMultiplier = course.level === 'Custom' ? 1 : 1; // lunch addon per day
    return calculatePricing(pricingConfig, course.basePricePerDay, course.addOns, addOnDaysMultiplier);
  }, [pricingConfig, course.basePricePerDay, course.addOns, course.level]);

  const volDiscount = useMemo(() => getVolumeDiscountRate(pricingConfig.delegates), [pricingConfig.delegates]);

  const toggleModule = (i: number) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  // Promo code
  const applyPromo = () => {
    if (!pricingConfig.promoCode.trim()) return;
    const rate = getPromoDiscount(pricingConfig.promoCode);
    if (rate > 0) {
      setPromoSuccess(`${Math.round(rate * 100)}% discount applied!`);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setPromoSuccess('');
    }
  };

  // Sync delegate count
  const syncDelegates = useCallback((count: number) => {
    setDelegates((prev) => {
      while (prev.length < count) prev.push({ fullName: '', role: '', email: '', phone: '', location: '' });
      return prev.slice(0, count);
    });
    setPricingConfig((p) => ({ ...p, delegates: count }));
  }, []);

  // Add a new delegate
  const addDelegate = useCallback(() => {
    setDelegates((prev) => [...prev, { fullName: '', role: '', email: '', phone: '', location: '' }]);
    setPricingConfig((p) => ({ ...p, delegates: delegates.length + 1 }));
  }, [delegates.length]);

  // Remove a delegate by index
  const removeDelegate = useCallback((index: number) => {
    setDelegates((prev) => {
      const next = prev.filter((_, i) => i !== index);
      return next.length > 0 ? next : prev; // Keep at least 1
    });
    setPricingConfig((p) => ({ ...p, delegates: Math.max(1, delegates.length - 1) }));
  }, [delegates.length]);

  // Add to cart + proceed — reset to 1 delegate; user builds up from there
  const handleProceedToRegister = () => {
    setStep('register');
    setDelegates([{ fullName: '', role: '', email: '', phone: '', location: '' }]);
    setPricingConfig((p) => ({ ...p, delegates: 1 }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Validate registration
  const validateRegistration = (): boolean => {
    if (!company.companyName || !company.billingEmail || !authoriser.fullName || !authoriser.email) return false;
    const firstDelegate = delegates[0];
    if (!firstDelegate.fullName || !firstDelegate.email) return false;
    return true;
  };

  // Proceed to checkout
  const handleProceedToCheckout = () => {
    if (!validateRegistration()) return;
    setStep('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Proceed to payment (from checkout)
  const handleProceedToPayment = () => {
    const inv = 'INV-' + Date.now().toString(36).toUpperCase();
    setInvoiceNumber(inv);
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Process payment
  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const ref = 'SBK-' + Date.now().toString(36).toUpperCase();
      setBookingReference(ref);
      setBookingStatus('confirmed');
      setIsProcessing(false);
      setStep('confirmed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
  };

  // Back nav
  const handleBack = () => {
    if (step === 'register') setStep('details');
    else if (step === 'checkout') setStep('register');
    else if (step === 'payment') setStep('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // LEVEL_COLOR
  const levelColor = LEVEL_COLORS[course.level] || LEVEL_COLORS.Foundation;

  return (
    <div className="page-transition min-h-screen bg-white">
      {/* ═══════ BREADCRUMB ═══════ */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/programmes" className="hover:text-[#16a34a] transition-colors">Programmes</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700 font-medium truncate max-w-xs sm:max-w-md">{course.title}</span>
          </div>
        </div>
      </div>

      {/* ═══════ DETAILS STEP ═══════ */}
      {step === 'details' && (
        <>
          {/* Hero */}
          <section className="relative py-20 sm:py-28 overflow-hidden bg-gray-900">
            <div className="absolute inset-0">
              <Image src="/images/programmes-classroom.jpg" alt="" fill className="object-cover opacity-20" priority />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Link href="/programmes" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-6 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Programmes
                </Link>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#16a34a]/10 border border-[#16a34a]/30 text-[#22c55e] text-xs font-semibold">
                    {course.categoryTitle}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${levelColor.bg} ${levelColor.text} border ${levelColor.border}`}>
                    {course.level}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {course.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{course.duration}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{course.deliveryModes.join(' / ')}</span>
                  <span className="flex items-center gap-1.5"><Award className="w-4 h-4" />{course.accreditation}</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Main content: Left content + Right sticky pricing */}
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-10">
                {/* LEFT: Content */}
                <div className="lg:col-span-2 space-y-10">
                  {/* Description */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Course Overview</h2>
                    {course.fullDescription.split('\n\n').map((para, i) => (
                      <p key={i} className="text-sm text-gray-600 leading-relaxed mb-4">{para}</p>
                    ))}
                  </div>

                  {/* Target Audience */}
                  <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Who Should Attend</h2>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {course.targetAudience.map((ta) => (
                        <div key={ta} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0" />
                          <span>{ta}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learning Outcomes */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Learning Outcomes</h2>
                    <div className="space-y-3">
                      {course.learningOutcomes.map((lo, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-[#16a34a]/20 transition-colors">
                          <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-[#16a34a]">{i + 1}</span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{lo}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Course Modules */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Course Outline</h2>
                    <div className="space-y-2">
                      {course.modules.map((mod, mi) => {
                        const isOpen = expandedModules.has(mi);
                        return (
                          <div key={mi} className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#16a34a]/20 transition-colors">
                            <button
                              onClick={() => toggleModule(mi)}
                              className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#16a34a]/10 flex items-center justify-center flex-shrink-0">
                                  <span className="text-sm font-bold text-[#16a34a]">{mi + 1}</span>
                                </div>
                                <span className="text-sm font-semibold text-gray-900">{mod.title}</span>
                              </div>
                              {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                            </button>
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                                  <div className="px-5 pb-4 pt-0 ml-11 space-y-1.5">
                                    {mod.topics.map((topic) => (
                                      <div key={topic} className="flex items-center gap-2 text-xs text-gray-600">
                                        <div className="w-1 h-1 rounded-full bg-[#16a34a]" />
                                        <span>{topic}</span>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Accreditation */}
                  <div className="bg-gradient-to-r from-[#16a34a]/5 to-[#22c55e]/5 rounded-2xl p-6 sm:p-8 border border-[#16a34a]/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#16a34a]/10 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-[#16a34a]" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Accreditation</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{course.accreditation}</p>
                  </div>
                </div>

                {/* RIGHT: Sticky Pricing Panel */}
                <div className="lg:col-span-1">
                  <div className="sticky top-36">
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg shadow-black/5">
                      <div className="h-1 bg-gradient-to-r from-[#16a34a] via-[#22c55e] to-[#16a34a]" />
                      <div className="p-6 space-y-5">
                        <div className="flex items-center gap-2">
                          <Calculator className="w-5 h-5 text-[#16a34a]" />
                          <h3 className="text-lg font-bold text-gray-900">Pricing Calculator</h3>
                        </div>

                        {/* Delivery Mode */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Mode</label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {(['public', 'inhouse', 'online'] as const).map((mode) => (
                              <button
                                key={mode}
                                onClick={() => setPricingConfig((p) => ({ ...p, deliveryMode: mode }))}
                                className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                                  pricingConfig.deliveryMode === mode
                                    ? 'bg-[#16a34a] text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {mode === 'public' ? 'Public' : mode === 'inhouse' ? 'In-House' : 'Online'}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Delegates */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Delegates</label>
                          <div className="flex items-center gap-2">
                            <button onClick={() => syncDelegates(Math.max(1, pricingConfig.delegates - 1))} className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                            <input type="number" min={1} max={100} value={pricingConfig.delegates} onChange={(e) => syncDelegates(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))} className="flex-1 text-center px-2 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30" />
                            <button onClick={() => syncDelegates(Math.min(100, pricingConfig.delegates + 1))} className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                          </div>
                          {volDiscount.label && (
                            <p className="text-[10px] text-[#16a34a] font-medium flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              {volDiscount.label}
                            </p>
                          )}
                        </div>

                        {/* Days */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Duration (Days)</label>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setPricingConfig((p) => ({ ...p, days: Math.max(1, p.days - 1) }))} className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                            <input type="number" min={1} max={30} value={pricingConfig.days} onChange={(e) => setPricingConfig((p) => ({ ...p, days: Math.max(1, Math.min(30, parseInt(e.target.value) || 1)) }))} className="flex-1 text-center px-2 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30" />
                            <button onClick={() => setPricingConfig((p) => ({ ...p, days: Math.min(30, p.days + 1) }))} className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>

                        {/* Add-Ons */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Add-Ons</label>
                          <div className="space-y-1.5">
                            {course.addOns.map((addOn) => {
                              const isSelected = pricingConfig.selectedAddOns.includes(addOn.id);
                              return (
                                <label key={addOn.id} className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${isSelected ? 'border-[#16a34a]/30 bg-green-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                                  <div className="flex items-center gap-2">
                                    <input type="checkbox" checked={isSelected} onChange={() => setPricingConfig((p) => ({
                                      ...p,
                                      selectedAddOns: isSelected ? p.selectedAddOns.filter((a) => a !== addOn.id) : [...p.selectedAddOns, addOn.id],
                                    }))} className="rounded border-gray-300 text-[#16a34a] focus:ring-[#16a34a]" />
                                    <span className="text-xs text-gray-700">{addOn.name}</span>
                                  </div>
                                  <span className="text-xs font-medium text-gray-500">{formatZMW(addOn.pricePerDelegate)}/del</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/* Promo Code */}
                        <div>
                          <button onClick={() => setShowPromoInput(!showPromoInput)} className="text-xs text-[#16a34a] font-medium hover:underline">
                            {showPromoInput ? 'Hide promo code' : 'Have a promo code?'}
                          </button>
                          <AnimatePresence>
                            {showPromoInput && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <div className="flex gap-2 mt-2">
                                  <input type="text" placeholder="Enter code" value={pricingConfig.promoCode} onChange={(e) => { setPricingConfig((p) => ({ ...p, promoCode: e.target.value })); setPromoError(''); setPromoSuccess(''); }} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30" />
                                  <button onClick={applyPromo} className="px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800">Apply</button>
                                </div>
                                {promoError && <p className="text-[10px] text-red-500 mt-1">{promoError}</p>}
                                {promoSuccess && <p className="text-[10px] text-[#16a34a] mt-1 flex items-center gap-1"><Check className="w-3 h-3" />{promoSuccess}</p>}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Breakdown */}
                        <div className="border-t border-gray-100 pt-4 space-y-2.5">
                          <div className="flex justify-between text-xs text-gray-500"><span>Base ({pricingConfig.delegates}×{pricingConfig.days}×{formatZMW(course.basePricePerDay)})</span><span>{formatZMW(pricing.baseCost)}</span></div>
                          {pricing.surcharge > 0 && (<div className="flex justify-between text-xs text-amber-600"><span>Delivery surcharge</span><span>+{formatZMW(pricing.surcharge)}</span></div>)}
                          {pricing.volumeDiscount > 0 && (<div className="flex justify-between text-xs text-[#16a34a]"><span>Volume discount ({Math.round(pricing.volumeDiscountRate * 100)}%)</span><span>-{formatZMW(pricing.volumeDiscount)}</span></div>)}
                          {pricing.addOnsCost > 0 && (<div className="flex justify-between text-xs text-gray-500"><span>Add-ons</span><span>+{formatZMW(pricing.addOnsCost)}</span></div>)}
                          {pricing.promoDiscount > 0 && (<div className="flex justify-between text-xs text-[#16a34a]"><span>Promo discount</span><span>-{formatZMW(pricing.promoDiscount)}</span></div>)}
                          <div className="flex justify-between text-xs text-gray-500"><span>Subtotal</span><span>{formatZMW(pricing.subtotal - pricing.promoDiscount)}</span></div>
                          <div className="flex justify-between text-xs text-gray-500"><span>VAT (16%)</span><span>{formatZMW(pricing.vat)}</span></div>
                        </div>

                        {/* Total */}
                        <div className="bg-gradient-to-r from-[#16a34a] to-[#22c55e] rounded-xl p-5 text-white">
                          <p className="text-xs font-medium text-white/70 mb-1">Total Investment</p>
                          <p className="text-3xl font-bold">{formatZMW(pricing.total)}</p>
                          <p className="text-[10px] text-white/50 mt-1">{formatZMW(pricing.perDelegatePerDay)} per delegate/day incl. VAT</p>
                        </div>

                        {/* CTA */}
                        <Button onClick={handleProceedToRegister} size="lg" className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm py-5 shadow-lg shadow-green-600/20 gap-2">
                          Proceed to Register <ArrowRight className="w-4 h-4" />
                        </Button>
                        <p className="text-[10px] text-gray-400 text-center">No payment required until you confirm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ═══════ REGISTER STEP ═══════ */}
      {step === 'register' && (
        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back button */}
            <button onClick={handleBack} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#16a34a] mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to course details
            </button>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-sm font-bold">2</div>
                <div className="h-px flex-1 bg-gray-200" />
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold">3</div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Registration</h1>
              <p className="text-sm text-gray-500 mt-1">Complete the details below for <strong>{course.title}</strong></p>
            </div>

            <div className="space-y-8">
              {/* Company Details */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <Building2 className="w-5 h-5 text-[#16a34a]" />
                  <h2 className="text-lg font-bold text-gray-900">Company Details</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2"><label className="block text-xs font-medium text-gray-500 mb-1">Company Name *</label><input type="text" value={company.companyName} onChange={(e) => setCompany((c) => ({ ...c, companyName: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]" placeholder="e.g. Springbok Business Solutions" /></div>
                  <div><label className="block text-xs font-medium text-gray-500 mb-1">Industry</label><input type="text" value={company.industry} onChange={(e) => setCompany((c) => ({ ...c, industry: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]" placeholder="e.g. Banking & Finance" /></div>
                  <div><label className="block text-xs font-medium text-gray-500 mb-1">Billing Email *</label><input type="email" value={company.billingEmail} onChange={(e) => setCompany((c) => ({ ...c, billingEmail: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]" placeholder="billing@company.com" /></div>
                  <div><label className="block text-xs font-medium text-gray-500 mb-1">Phone</label><input type="tel" value={company.phone} onChange={(e) => setCompany((c) => ({ ...c, phone: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]" placeholder="+260 9XX XXX XXX" /></div>
                  <div className="sm:col-span-2"><label className="block text-xs font-medium text-gray-500 mb-1">Billing Address</label><input type="text" value={company.billingAddress} onChange={(e) => setCompany((c) => ({ ...c, billingAddress: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]" placeholder="Lusaka, Zambia" /></div>
                </div>
              </div>

              {/* Authoriser */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <User className="w-5 h-5 text-[#16a34a]" />
                  <h2 className="text-lg font-bold text-gray-900">Authoriser Details</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="block text-xs font-medium text-gray-500 mb-1">Full Name *</label><input type="text" value={authoriser.fullName} onChange={(e) => setAuthoriser((a) => ({ ...a, fullName: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]" placeholder="John Banda" /></div>
                  <div><label className="block text-xs font-medium text-gray-500 mb-1">Job Title</label><input type="text" value={authoriser.jobTitle} onChange={(e) => setAuthoriser((a) => ({ ...a, jobTitle: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]" placeholder="HR Manager" /></div>
                  <div><label className="block text-xs font-medium text-gray-500 mb-1">Email *</label><input type="email" value={authoriser.email} onChange={(e) => setAuthoriser((a) => ({ ...a, email: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]" placeholder="authoriser@company.com" /></div>
                  <div><label className="block text-xs font-medium text-gray-500 mb-1">Phone</label><input type="tel" value={authoriser.phone} onChange={(e) => setAuthoriser((a) => ({ ...a, phone: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]" placeholder="+260 9XX XXX XXX" /></div>
                </div>
              </div>

              {/* Delegates */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#16a34a]" />
                    <h2 className="text-lg font-bold text-gray-900">Delegate Details</h2>
                  </div>
                  <span className="text-xs text-gray-400">{delegates.length} delegate{delegates.length !== 1 ? 's' : ''} added</span>
                </div>

                {/* Summary of already-added delegates (filled ones shown as compact chips) */}
                {delegates.length > 0 && (
                  <div className="mb-5">
                    <div className="flex flex-wrap gap-2">
                      {delegates.map((del, i) => (
                        <div
                          key={i}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                            i === delegates.length - 1 && !del.fullName
                              ? 'border-[#16a34a]/30 bg-green-50/50 text-[#16a34a]'
                              : del.fullName
                              ? 'border-gray-200 bg-gray-50 text-gray-700'
                              : 'border-gray-200 bg-gray-50 text-gray-400'
                          }`}
                        >
                          <User className="w-3 h-3" />
                          <span>{del.fullName || `Delegate ${i + 1}`}</span>
                          {delegates.length > 1 && (
                            <button
                              onClick={() => removeDelegate(i)}
                              className="ml-0.5 text-gray-300 hover:text-red-500 transition-colors"
                              title="Remove delegate"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Active delegate form — always show the LAST delegate being edited */}
                <AnimatePresence mode="wait">
                  {delegates.length > 0 && (
                    <motion.div
                      key={delegates.length - 1}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-gray-700">
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-[#16a34a]/10 text-[#16a34a] text-[10px] font-bold mr-1.5">{delegates.length}</span>
                          Delegate {delegates.length}
                          {delegates.length === 1 && <span className="text-red-400 ml-1">*</span>}
                        </p>
                      </div>
                      {(() => {
                        const activeIdx = delegates.length - 1;
                        const del = delegates[activeIdx];
                        return (
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div><label className="block text-[10px] font-medium text-gray-400 mb-0.5">Full Name {activeIdx === 0 && <span className="text-red-400">*</span>}</label><input type="text" value={del.fullName} onChange={(e) => { const d = [...delegates]; d[activeIdx] = { ...d[activeIdx], fullName: e.target.value }; setDelegates(d); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]" placeholder="Full name" /></div>
                            <div><label className="block text-[10px] font-medium text-gray-400 mb-0.5">Role</label><input type="text" value={del.role} onChange={(e) => { const d = [...delegates]; d[activeIdx] = { ...d[activeIdx], role: e.target.value }; setDelegates(d); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]" placeholder="Job title" /></div>
                            <div><label className="block text-[10px] font-medium text-gray-400 mb-0.5">Email {activeIdx === 0 && <span className="text-red-400">*</span>}</label><input type="email" value={del.email} onChange={(e) => { const d = [...delegates]; d[activeIdx] = { ...d[activeIdx], email: e.target.value }; setDelegates(d); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]" placeholder="email@company.com" /></div>
                            <div><label className="block text-[10px] font-medium text-gray-400 mb-0.5">Phone</label><input type="tel" value={del.phone} onChange={(e) => { const d = [...delegates]; d[activeIdx] = { ...d[activeIdx], phone: e.target.value }; setDelegates(d); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]" placeholder="+260" /></div>
                            <div className="sm:col-span-2"><label className="block text-[10px] font-medium text-gray-400 mb-0.5">Location</label><input type="text" value={del.location} onChange={(e) => { const d = [...delegates]; d[activeIdx] = { ...d[activeIdx], location: e.target.value }; setDelegates(d); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]" placeholder="Lusaka, Zambia" /></div>
                          </div>
                        );
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Add Delegate Button */}
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={addDelegate}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:border-[#16a34a]/40 hover:text-[#16a34a] hover:bg-green-50/30 transition-all duration-200"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add Another Delegate
                  </button>
                  <p className="text-[10px] text-gray-400 text-center mt-1.5">
                    Add as many delegates as you need. Pricing updates automatically.
                  </p>
                </div>
              </div>

              {/* Proceed to checkout */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Button onClick={handleProceedToCheckout} size="lg" className="w-full sm:w-auto bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm px-10 py-5 shadow-lg shadow-green-600/20 gap-2">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Button>
                <p className="text-xs text-gray-400">Total: {formatZMW(pricing.total)} (incl. 16% VAT)</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════ CHECKOUT STEP (Invoice) ═══════ */}
      {step === 'checkout' && (
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={handleBack} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#16a34a] mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to registration
            </button>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-sm font-bold"><Check className="w-4 h-4" /></div>
                <div className="h-px flex-1 bg-[#16a34a]" />
                <div className="w-8 h-8 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-sm font-bold"><Check className="w-4 h-4" /></div>
                <div className="h-px flex-1 bg-[#16a34a]" />
                <div className="w-8 h-8 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-sm font-bold">3</div>
                <div className="h-px flex-1 bg-gray-200" />
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold">4</div>
                <div className="h-px flex-1 bg-gray-200" />
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold">5</div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Checkout & Invoice</h1>
              <p className="text-sm text-gray-500 mt-1">Review your invoice and proceed to payment</p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* LEFT: Invoice */}
              <div className="lg:col-span-3">
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  {/* Invoice header */}
                  <div className="bg-gray-50 border-b border-gray-200 p-6 sm:p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img src="/springbok-logo.png" alt="Springbok Training Academy" className="h-10 w-auto" />
                        <div>
                          <p className="text-sm font-bold text-gray-900">Springbok Training Academy</p>
                          <p className="text-[10px] text-gray-500">Professional Training Solutions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-gray-900">INVOICE</p>
                        <p className="text-xs text-gray-500">{invoiceNumber || 'INV-PENDING'}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Invoice Date</p>
                        <p className="text-xs text-gray-700 mt-0.5">{new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Due Date</p>
                        <p className="text-xs text-gray-700 mt-0.5">{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bill-to */}
                  <div className="px-6 sm:px-8 py-4 border-b border-gray-100">
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Bill To</p>
                    <p className="text-sm font-semibold text-gray-900">{company.companyName}</p>
                    <p className="text-xs text-gray-500">{company.billingEmail}</p>
                    {company.billingAddress && <p className="text-xs text-gray-500">{company.billingAddress}</p>}
                  </div>

                  {/* Line items */}
                  <div className="px-6 sm:px-8 py-4">
                    <div className="space-y-3">
                      {/* Course line */}
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{course.title}</p>
                          <p className="text-xs text-gray-500">{pricingConfig.delegates} delegates × {pricingConfig.days} days × {formatZMW(course.basePricePerDay)}/day</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{formatZMW(pricing.baseCost)}</p>
                      </div>
                      {/* Delivery surcharge */}
                      {pricing.surcharge > 0 && (
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-500">
                            Delivery mode surcharge ({pricingConfig.deliveryMode === 'inhouse' ? 'In-House' : pricingConfig.deliveryMode === 'online' ? 'Online' : 'Public'})
                          </p>
                          <p className="text-xs text-amber-600">+{formatZMW(pricing.surcharge)}</p>
                        </div>
                      )}
                      {/* Add-ons */}
                      {pricingConfig.selectedAddOns.length > 0 && course.addOns.filter(a => pricingConfig.selectedAddOns.includes(a.id)).map((addOn) => (
                        <div key={addOn.id} className="flex justify-between items-center">
                          <p className="text-xs text-gray-500">{addOn.name} × {pricingConfig.delegates} delegates</p>
                          <p className="text-xs text-gray-700">{formatZMW(addOn.pricePerDelegate * pricingConfig.delegates)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="px-6 sm:px-8 py-4 border-t border-gray-100 space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Subtotal</span>
                      <span>{formatZMW(pricing.subtotal)}</span>
                    </div>
                    {pricing.volumeDiscount > 0 && (
                      <div className="flex justify-between text-xs text-[#16a34a]">
                        <span>Volume discount ({Math.round(pricing.volumeDiscountRate * 100)}%)</span>
                        <span>-{formatZMW(pricing.volumeDiscount)}</span>
                      </div>
                    )}
                    {pricing.promoDiscount > 0 && (
                      <div className="flex justify-between text-xs text-[#16a34a]">
                        <span>Promo discount</span>
                        <span>-{formatZMW(pricing.promoDiscount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>VAT (16%)</span>
                      <span>{formatZMW(pricing.vat)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <span className="text-sm font-bold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-[#16a34a]">{formatZMW(pricing.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Order Summary */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <ShoppingCart className="w-4 h-4 text-[#16a34a]" />
                    <h3 className="text-sm font-bold text-gray-900">Order Summary</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Course</p>
                      <p className="text-sm font-medium text-gray-900">{course.title}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Company</p>
                        <p className="text-xs text-gray-700">{company.companyName}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Authoriser</p>
                        <p className="text-xs text-gray-700">{authoriser.fullName}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Delegates ({delegates.length})</p>
                      <div className="flex flex-wrap gap-1">
                        {delegates.map((d, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-md text-gray-600">
                            {d.fullName || `Delegate ${i + 1}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                  <Button onClick={handleProceedToPayment} size="lg" className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm py-5 shadow-lg shadow-green-600/20 gap-2">
                    <Wallet className="w-4 h-4" /> Pay Now · {formatZMW(pricing.total)}
                  </Button>
                  <Button variant="outline" className="w-full border-gray-200 text-gray-600 hover:text-gray-900 text-sm py-5 gap-2">
                    <Receipt className="w-4 h-4" /> Request Invoice Only
                  </Button>
                </div>
                <p className="text-[10px] text-gray-400 text-center">By proceeding, you agree to our terms and conditions</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════ PAYMENT STEP ═══════ */}
      {step === 'payment' && (
        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={handleBack} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#16a34a] mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to invoice
            </button>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-sm font-bold"><Check className="w-4 h-4" /></div>
                <div className="h-px flex-1 bg-[#16a34a]" />
                <div className="w-8 h-8 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-sm font-bold"><Check className="w-4 h-4" /></div>
                <div className="h-px flex-1 bg-[#16a34a]" />
                <div className="w-8 h-8 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-sm font-bold"><Check className="w-4 h-4" /></div>
                <div className="h-px flex-1 bg-[#16a34a]" />
                <div className="w-8 h-8 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-sm font-bold">4</div>
                <div className="h-px flex-1 bg-gray-200" />
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold">5</div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payment</h1>
              <p className="text-sm text-gray-500 mt-1">Choose your preferred payment method</p>
            </div>

            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-md mx-auto text-center py-16"
                >
                  <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-[#16a34a] border-t-transparent animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CircleDollarSign className="w-8 h-8 text-[#16a34a]" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Processing payment...</h2>
                  <p className="text-sm text-gray-500 mb-6">Please wait while we process your payment securely</p>
                  <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 flex items-center justify-center">
                        <Loader2 className="w-3 h-3 text-[#16a34a] animate-spin" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-700">Verifying payment details</p>
                        <div className="h-1 bg-gray-200 rounded-full mt-1 overflow-hidden">
                          <motion.div className="h-full bg-[#16a34a] rounded-full" initial={{ width: '0%' }} animate={{ width: '60%' }} transition={{ duration: 1.5 }} />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <Lock className="w-3 h-3 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-400">Confirming transaction...</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <BadgeCheck className="w-3 h-3 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-400">Finalizing booking...</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="payment-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Payment methods */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="grid sm:grid-cols-3 gap-3">
                        {/* Mobile Money */}
                        <button
                          onClick={() => setPaymentMethod('mobile')}
                          className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
                            paymentMethod === 'mobile'
                              ? 'border-[#16a34a] bg-green-50/50 shadow-sm'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${paymentMethod === 'mobile' ? 'bg-[#16a34a]/10' : 'bg-gray-100'}`}>
                            <Smartphone className={`w-5 h-5 ${paymentMethod === 'mobile' ? 'text-[#16a34a]' : 'text-gray-400'}`} />
                          </div>
                          <p className={`text-sm font-semibold ${paymentMethod === 'mobile' ? 'text-gray-900' : 'text-gray-700'}`}>Mobile Money</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">MTN / Airtel</p>
                        </button>

                        {/* Bank Transfer */}
                        <button
                          onClick={() => setPaymentMethod('bank')}
                          className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
                            paymentMethod === 'bank'
                              ? 'border-[#16a34a] bg-green-50/50 shadow-sm'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${paymentMethod === 'bank' ? 'bg-[#16a34a]/10' : 'bg-gray-100'}`}>
                            <Landmark className={`w-5 h-5 ${paymentMethod === 'bank' ? 'text-[#16a34a]' : 'text-gray-400'}`} />
                          </div>
                          <p className={`text-sm font-semibold ${paymentMethod === 'bank' ? 'text-gray-900' : 'text-gray-700'}`}>Bank Transfer</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">ZANACO</p>
                        </button>

                        {/* Card Payment */}
                        <button
                          onClick={() => setPaymentMethod('card')}
                          className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
                            paymentMethod === 'card'
                              ? 'border-[#16a34a] bg-green-50/50 shadow-sm'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${paymentMethod === 'card' ? 'bg-[#16a34a]/10' : 'bg-gray-100'}`}>
                            <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-[#16a34a]' : 'text-gray-400'}`} />
                          </div>
                          <p className={`text-sm font-semibold ${paymentMethod === 'card' ? 'text-gray-900' : 'text-gray-700'}`}>Card Payment</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">Visa / Mastercard</p>
                        </button>
                      </div>

                      {/* Payment form */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={paymentMethod}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8"
                        >
                          {paymentMethod === 'mobile' && (
                            <div>
                              <div className="flex items-center gap-2 mb-4">
                                <Smartphone className="w-5 h-5 text-[#16a34a]" />
                                <h3 className="text-lg font-bold text-gray-900">Mobile Money</h3>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-xs font-medium text-gray-500 mb-1">Select Network</label>
                                  <div className="grid grid-cols-2 gap-2">
                                    <button className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${true ? 'border-[#f59e0b] bg-amber-50 text-amber-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                                      MTN Mobile Money
                                    </button>
                                    <button className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${false ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                                      Airtel Money
                                    </button>
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-500 mb-1">Mobile Number *</label>
                                  <div className="flex">
                                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-200 rounded-l-xl bg-gray-50 text-xs text-gray-500">+260</span>
                                    <input
                                      type="tel"
                                      value={mobileNumber}
                                      onChange={(e) => setMobileNumber(e.target.value)}
                                      placeholder="9XX XXX XXX"
                                      className="flex-1 px-3 py-2.5 border border-gray-200 rounded-r-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]"
                                    />
                                  </div>
                                </div>
                                <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100">
                                  <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                  <p className="text-xs text-amber-700">You will receive an STS push notification on your phone to confirm the payment.</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {paymentMethod === 'bank' && (
                            <div>
                              <div className="flex items-center gap-2 mb-4">
                                <Landmark className="w-5 h-5 text-[#16a34a]" />
                                <h3 className="text-lg font-bold text-gray-900">Bank Transfer Details</h3>
                              </div>
                              <div className="space-y-3">
                                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">Bank</span>
                                    <span className="text-sm font-semibold text-gray-900">ZANACO</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">Account Name</span>
                                    <span className="text-sm font-semibold text-gray-900">Springbok Training Academy</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">Account Number</span>
                                    <span className="text-sm font-semibold text-gray-900">1094837261</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">Branch</span>
                                    <span className="text-sm font-semibold text-gray-900">Lusaka Main</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">Reference</span>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-sm font-semibold text-[#16a34a]">{invoiceNumber || 'INV-PENDING'}</span>
                                      <button className="text-gray-400 hover:text-[#16a34a] transition-colors"><Copy className="w-3.5 h-3.5" /></button>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                                  <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <p className="text-xs text-blue-700">Please use the invoice number as your payment reference. Your booking will be confirmed once payment is received.</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {paymentMethod === 'card' && (
                            <div>
                              <div className="flex items-center gap-2 mb-4">
                                <CreditCard className="w-5 h-5 text-[#16a34a]" />
                                <h3 className="text-lg font-bold text-gray-900">Card Payment</h3>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-xs font-medium text-gray-500 mb-1">Card Number *</label>
                                  <input
                                    type="text"
                                    value={cardDetails.number}
                                    onChange={(e) => setCardDetails((c) => ({ ...c, number: e.target.value }))}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength={19}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Expiry Date *</label>
                                    <input
                                      type="text"
                                      value={cardDetails.expiry}
                                      onChange={(e) => setCardDetails((c) => ({ ...c, expiry: e.target.value }))}
                                      placeholder="MM/YY"
                                      maxLength={5}
                                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">CVV *</label>
                                    <input
                                      type="text"
                                      value={cardDetails.cvv}
                                      onChange={(e) => setCardDetails((c) => ({ ...c, cvv: e.target.value }))}
                                      placeholder="123"
                                      maxLength={4}
                                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-500 mb-1">Cardholder Name *</label>
                                  <input
                                    type="text"
                                    value={cardDetails.name}
                                    onChange={(e) => setCardDetails((c) => ({ ...c, name: e.target.value }))}
                                    placeholder="Name on card"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]"
                                  />
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                  <Lock className="w-3.5 h-3.5" />
                                  <span>Your payment is secured with 256-bit SSL encryption</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Pay button */}
                      <Button onClick={handleProcessPayment} size="lg" className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm py-5 shadow-lg shadow-green-600/20 gap-2">
                        <Lock className="w-4 h-4" /> Pay {formatZMW(pricing.total)}
                      </Button>
                    </div>

                    {/* Order summary sidebar */}
                    <div className="lg:col-span-1">
                      <div className="sticky top-36">
                        <div className="bg-white border border-gray-200 rounded-2xl p-5">
                          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Order Summary</h3>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-900">{course.title}</p>
                            <p className="text-xs text-gray-500">{pricingConfig.delegates} delegates · {pricingConfig.days} days</p>
                            <div className="border-t border-gray-100 pt-2 mt-2">
                              <div className="flex justify-between text-xs text-gray-500"><span>Subtotal</span><span>{formatZMW(pricing.subtotal)}</span></div>
                              {pricing.volumeDiscount > 0 && <div className="flex justify-between text-xs text-[#16a34a]"><span>Discount</span><span>-{formatZMW(pricing.volumeDiscount + pricing.promoDiscount)}</span></div>}
                              <div className="flex justify-between text-xs text-gray-500"><span>VAT</span><span>{formatZMW(pricing.vat)}</span></div>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                              <span className="text-sm font-bold text-gray-900">Total</span>
                              <span className="text-lg font-bold text-[#16a34a]">{formatZMW(pricing.total)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* ═══════ CONFIRMED STEP ═══════ */}
      {step === 'confirmed' && bookingReference && (
        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Success animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
              className="text-center mb-10"
            >
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-[#16a34a]/10 animate-ping" style={{ animationDuration: '2s', animationIterationCount: '3' }} />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#16a34a] to-[#22c55e] flex items-center justify-center shadow-lg shadow-green-600/30">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}>
                    <Check className="w-12 h-12 text-white" strokeWidth={3} />
                  </motion.div>
                </div>
              </div>
              <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Booking Confirmed!</motion.h1>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-sm text-gray-500">Your training booking has been successfully processed.</motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-4">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Booking Reference</p>
                <p className="text-2xl font-bold text-[#16a34a]">{bookingReference}</p>
              </motion.div>
            </motion.div>

            <AnimatePresence>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                {/* Payment receipt */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-8 shadow-sm">
                  <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-[#16a34a]" />
                      <h2 className="text-sm font-bold text-gray-900">Payment Confirmation Receipt</h2>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-semibold">PAID</span>
                  </div>
                  <div className="px-6 py-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Receipt Number</p>
                        <p className="text-sm font-semibold text-gray-900">RCT-{Date.now().toString(36).toUpperCase()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Payment Date</p>
                        <p className="text-sm text-gray-700">{new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })} at {new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Amount Paid</p>
                        <p className="text-lg font-bold text-[#16a34a]">{formatZMW(pricing.total)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Payment Method</p>
                        <p className="text-sm text-gray-700">{paymentMethod === 'mobile' ? 'Mobile Money' : paymentMethod === 'bank' ? 'Bank Transfer' : 'Card Payment'}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Transaction Reference</p>
                        <p className="text-sm font-mono text-gray-700">TXN-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notification timeline */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <Send className="w-4 h-4 text-[#16a34a]" />
                    <h2 className="text-sm font-bold text-gray-900">Notifications</h2>
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: BadgeCheck, label: 'Booking confirmed', detail: bookingReference },
                      { icon: Mail, label: `Invoice sent to ${company.billingEmail}`, detail: invoiceNumber },
                      ...delegates.filter(d => d.email).map((d) => ({ icon: Mail, label: `Delegate welcome email sent to ${d.email}`, detail: d.fullName })),
                      { icon: Mail, label: `Payment receipt sent to ${company.billingEmail}`, detail: 'RCT-' + Date.now().toString(36).toUpperCase() },
                      { icon: CalendarDays, label: 'Calendar invitation sent to all delegates', detail: `${pricingConfig.days} days` },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.15 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-[#16a34a]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700">{item.label}</p>
                          <p className="text-[10px] text-gray-400">{item.detail}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                  <Button variant="outline" className="gap-2 border-gray-200 text-gray-600 hover:text-gray-900 text-sm">
                    <Download className="w-4 h-4" /> Download Invoice
                  </Button>
                  <Button variant="outline" className="gap-2 border-gray-200 text-gray-600 hover:text-gray-900 text-sm">
                    <Receipt className="w-4 h-4" /> Download Receipt
                  </Button>
                  <Button variant="outline" className="gap-2 border-gray-200 text-gray-600 hover:text-gray-900 text-sm">
                    <Printer className="w-4 h-4" /> Print Confirmation
                  </Button>
                </div>

                {/* Back to programmes */}
                <div className="text-center">
                  <Button asChild className="bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold gap-2">
                    <Link href="/programmes">
                      Back to Programmes
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                {/* Contact support */}
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-500">Need help? Contact support at </span>
                    <a href="mailto:training@springbok.co.zm" className="text-xs font-medium text-[#16a34a] hover:underline">training@springbok.co.zm</a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}
    </div>
  );
}
