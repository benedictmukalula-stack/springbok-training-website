'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+260 966 135 560',
    href: 'tel:+260966135560',
    secondary: '+260 955 135 560',
    secondaryHref: 'tel:+260955135560',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'admin@springboktraining.net',
    href: 'mailto:admin@springboktraining.net',
  },
  {
    icon: MapPin,
    label: 'Office Address',
    value: 'Jezmondine 13th Central Street, Lusaka, Zambia',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Monday - Friday: 08:00 - 17:00',
    secondary: 'Saturday: 09:00 - 13:00',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    trainingType: '',
    participants: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', organization: '', trainingType: '', participants: '', message: '' });
  };

  return (
    <div className="page-transition min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-green-50/50 to-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#16a34a]/5 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-[#22c55e]/5 rounded-full blur-[128px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[#16a34a] text-sm font-semibold tracking-wider uppercase mb-4">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Contact{' '}
              <span className="text-brand-gradient">Springbok</span>
            </h1>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-500 leading-relaxed">
              Ready to transform your workforce? Get in touch with our training consultants to design a bespoke programme tailored to your organisation&apos;s needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Send Us an Enquiry
                </h2>
                <p className="text-gray-500 mb-8">
                  Fill out the form below and our training consultants will get back to you within 24 hours.
                </p>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#16a34a] flex-shrink-0" />
                    <p className="text-sm text-[#15803d] font-medium">
                      Thank you for your enquiry! We will get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Banda"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-all duration-200 bg-gray-50/50 hover:border-gray-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.co.zm"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-all duration-200 bg-gray-50/50 hover:border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+260 9XX XXX XXX"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-all duration-200 bg-gray-50/50 hover:border-gray-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Organization
                      </label>
                      <input
                        id="organization"
                        name="organization"
                        type="text"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Company name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-all duration-200 bg-gray-50/50 hover:border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="trainingType" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Training Type
                      </label>
                      <select
                        id="trainingType"
                        name="trainingType"
                        value={formData.trainingType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-all duration-200 bg-gray-50/50 hover:border-gray-300 appearance-none cursor-pointer"
                      >
                        <option value="">Select training type</option>
                        <option value="public">Public Course</option>
                        <option value="inhouse">In-House Training</option>
                        <option value="customized">Customized Programme</option>
                        <option value="partnership">Training Partnership</option>
                        <option value="other">Other / Not Sure</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Number of Participants
                      </label>
                      <input
                        id="participants"
                        name="participants"
                        type="number"
                        min={1}
                        value={formData.participants}
                        onChange={handleChange}
                        placeholder="e.g. 15"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-all duration-200 bg-gray-50/50 hover:border-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your training needs, preferred dates, and any specific requirements..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] transition-all duration-200 bg-gray-50/50 hover:border-gray-300 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-base py-3.5 shadow-lg shadow-green-600/20 hover:shadow-green-600/30 transition-all duration-300 group"
                  >
                    Send Enquiry
                    <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </motion.div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection>
                <div className="bg-gradient-to-br from-[#16a34a] to-[#15803d] rounded-2xl p-8 text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Springbok Training</h3>
                      <p className="text-sm text-white/70">&amp; Business Solutions</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {contactInfo.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs text-white/60 font-medium uppercase tracking-wide mb-0.5">
                              {item.label}
                            </div>
                            {item.href ? (
                              <a
                                href={item.href}
                                className="text-sm font-medium hover:text-green-200 transition-colors"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <div className="text-sm font-medium">{item.value}</div>
                            )}
                            {item.secondary && (
                              item.secondaryHref ? (
                                <a
                                  href={item.secondaryHref}
                                  className="block text-sm text-white/70 hover:text-green-200 transition-colors mt-0.5"
                                >
                                  {item.secondary}
                                </a>
                              ) : (
                                <div className="text-sm text-white/70 mt-0.5">{item.secondary}</div>
                              )
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    What Happens Next?
                  </h3>
                  <div className="space-y-4">
                    {[
                      { step: '1', desc: 'We receive your enquiry and review your requirements.' },
                      { step: '2', desc: 'Our training consultant contacts you within 24 hours.' },
                      { step: '3', desc: 'We discuss your needs and propose a tailored solution.' },
                      { step: '4', desc: 'You receive a detailed proposal and quote.' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-[#16a34a]">{item.step}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Quick Links
                  </h3>
                  <div className="space-y-3">
                    <Link
                      href="/programmes"
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#16a34a] transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#16a34a] transition-colors" />
                      Browse Training Programmes
                    </Link>
                    <Link
                      href="/corporate"
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#16a34a] transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#16a34a] transition-colors" />
                      In-House Training Solutions
                    </Link>
                    <Link
                      href="/pricing"
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#16a34a] transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#16a34a] transition-colors" />
                      Pricing &amp; Calculator
                    </Link>
                    <Link
                      href="/about"
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#16a34a] transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#16a34a] transition-colors" />
                      About Springbok
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Find Us
            </h2>
            <p className="text-gray-500">
              Visit our Lusaka office or contact us for training at your location across all 10 provinces.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3871.916!2d28.3168!3d-15.4166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLusaka%2C+Zambia!5e0!3m2!1sen!2s!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Springbok Training Office Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
