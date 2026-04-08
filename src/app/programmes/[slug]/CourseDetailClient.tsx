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
  AlertCircle, Check, BadgeCheck, Printer,
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
  const [step, setStep] = useState<'details' | 'register' | 'checkout' | 'confirmed'>('details');

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
    { fullName: '', role: '', email: '', phone: '', location: '' },
  ]);

  // UI state
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

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

  // Add to cart + proceed
  const handleProceedToRegister = () => {
    setStep('register');
    syncDelegates(pricingConfig.delegates);
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

  // Confirm booking
  const handleConfirmBooking = () => {
    setBookingStatus('pending');

    // Simulate booking
    setTimeout(() => {
      const ref = 'SBK-' + Date.now().toString(36).toUpperCase();
      setBookingReference(ref);
      setBookingStatus('confirmed');
      setStep('confirmed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  // Back nav
  const handleBack = () => {
    if (step === 'register') setStep('details');
    else if (step === 'checkout') setStep('register');
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
                  <span className="text-xs text-gray-400">{pricingConfig.delegates} delegate{pricingConfig.delegates !== 1 ? 's' : ''}</span>
                </div>
                <div className="space-y-6">
                  {delegates.map((del, i) => (
                    <div key={i} className="border border-gray-100 rounded-xl p-4 sm:p-5">
                      <p className="text-xs font-semibold text-gray-500 mb-3">Delegate {i + 1} {i === 0 && <span className="text-red-400">*</span>}</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div><label className="block text-[10px] font-medium text-gray-400 mb-0.5">Full Name</label><input type="text" value={del.fullName} onChange={(e) => { const d = [...delegates]; d[i] = { ...d[i], fullName: e.target.value }; setDelegates(d); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30" placeholder="Full name" /></div>
                        <div><label className="block text-[10px] font-medium text-gray-400 mb-0.5">Role</label><input type="text" value={del.role} onChange={(e) => { const d = [...delegates]; d[i] = { ...d[i], role: e.target.value }; setDelegates(d); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30" placeholder="Job title" /></div>
                        <div><label className="block text-[10px] font-medium text-gray-400 mb-0.5">Email</label><input type="email" value={del.email} onChange={(e) => { const d = [...delegates]; d[i] = { ...d[i], email: e.target.value }; setDelegates(d); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30" placeholder="email@company.com" /></div>
                        <div><label className="block text-[10px] font-medium text-gray-400 mb-0.5">Phone</label><input type="tel" value={del.phone} onChange={(e) => { const d = [...delegates]; d[i] = { ...d[i], phone: e.target.value }; setDelegates(d); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30" placeholder="+260" /></div>
                        <div className="sm:col-span-2"><label className="block text-[10px] font-medium text-gray-400 mb-0.5">Location</label><input type="text" value={del.location} onChange={(e) => { const d = [...delegates]; d[i] = { ...d[i], location: e.target.value }; setDelegates(d); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30" placeholder="Lusaka, Zambia" /></div>
                      </div>
                    </div>
                  ))}
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

      {/* ═══════ CHECKOUT STEP ═══════ */}
      {step === 'checkout' && (
        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Checkout</h1>
              <p className="text-sm text-gray-500 mt-1">Review your booking before confirmation</p>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <ShoppingCart className="w-5 h-5 text-[#16a34a]" />
                  <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{course.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{course.categoryTitle} · {course.duration}</p>
                      <p className="text-xs text-gray-500">{pricingConfig.deliveryMode === 'inhouse' ? 'In-House' : pricingConfig.deliveryMode === 'online' ? 'Online' : 'Public'} · {pricingConfig.delegates} delegates · {pricingConfig.days} days</p>
                    </div>
                  </div>
                </div>

                {/* Company & Authoriser */}
                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Company</p>
                    <p className="text-sm font-medium text-gray-900">{company.companyName}</p>
                    <p className="text-xs text-gray-500">{company.industry} · {company.billingEmail}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Authoriser</p>
                    <p className="text-sm font-medium text-gray-900">{authoriser.fullName}</p>
                    <p className="text-xs text-gray-500">{authoriser.jobTitle} · {authoriser.email}</p>
                  </div>
                </div>

                {/* Delegates count */}
                <div className="mb-5">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Delegates ({pricingConfig.delegates})</p>
                  <div className="flex flex-wrap gap-1">
                    {delegates.map((d, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                        {d.fullName || `Delegate ${i + 1}`}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing breakdown */}
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-xs text-gray-500"><span>Base cost</span><span>{formatZMW(pricing.baseCost)}</span></div>
                  {pricing.surcharge > 0 && <div className="flex justify-between text-xs text-amber-600"><span>Delivery surcharge</span><span>+{formatZMW(pricing.surcharge)}</span></div>}
                  {pricing.volumeDiscount > 0 && <div className="flex justify-between text-xs text-[#16a34a]"><span>Volume discount</span><span>-{formatZMW(pricing.volumeDiscount)}</span></div>}
                  {pricing.addOnsCost > 0 && <div className="flex justify-between text-xs text-gray-500"><span>Add-ons</span><span>+{formatZMW(pricing.addOnsCost)}</span></div>}
                  {pricing.promoDiscount > 0 && <div className="flex justify-between text-xs text-[#16a34a]"><span>Promo discount</span><span>-{formatZMW(pricing.promoDiscount)}</span></div>}
                  <div className="flex justify-between text-xs text-gray-500"><span>VAT (16%)</span><span>{formatZMW(pricing.vat)}</span></div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-sm font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-[#16a34a]">{formatZMW(pricing.total)}</span>
                  </div>
                </div>
              </div>

              {/* Confirm */}
              <Button onClick={handleConfirmBooking} size="lg" className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm py-5 shadow-lg shadow-green-600/20 gap-2" disabled={bookingStatus === 'pending'}>
                {bookingStatus === 'pending' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Processing Booking...</>
                ) : (
                  <>Confirm Booking · {formatZMW(pricing.total)}</>
                )}
              </Button>
              <p className="text-[10px] text-gray-400 text-center">By confirming, you agree to our terms and conditions</p>
            </div>
          </div>
        </section>
      )}

      {/* ═══════ CONFIRMED STEP ═══════ */}
      {step === 'confirmed' && bookingReference && (
        <section className="py-16 sm:py-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <div className="w-20 h-20 rounded-full bg-[#16a34a]/10 flex items-center justify-center mx-auto mb-6">
                <BadgeCheck className="w-10 h-10 text-[#16a34a]" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Booking Confirmed!</h1>
              <p className="text-gray-500 mb-8">Your training booking has been successfully submitted.</p>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 text-left mb-8">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Reference</p>
                    <p className="font-bold text-[#16a34a] text-lg">{bookingReference}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Course</p>
                    <p className="font-semibold text-gray-900">{course.title}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Company</p>
                    <p className="text-gray-700">{company.companyName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Amount</p>
                    <p className="font-semibold text-gray-900">{formatZMW(pricing.total)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Delegates</p>
                    <p className="text-gray-700">{pricingConfig.delegates} registered</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Delivery</p>
                    <p className="text-gray-700">{pricingConfig.deliveryMode === 'inhouse' ? 'In-House' : pricingConfig.deliveryMode === 'online' ? 'Online' : 'Public'} · {pricingConfig.days} days</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-6">A confirmation email will be sent to {company.billingEmail}</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button asChild className="bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold gap-2">
                  <Link href="/programmes">
                    Browse More Courses
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <Link href="/contact">
                    Contact Us
                    <Phone className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
