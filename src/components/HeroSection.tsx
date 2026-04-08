'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#16a34a]/8 rounded-full blur-[128px] animate-pulse-green" />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#22c55e]/5 rounded-full blur-[128px] animate-pulse-green"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#16a34a]/3 rounded-full blur-[200px]"
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(22,163,74,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(22,163,74,0.4) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating Particles */}
        <div className="absolute top-20 left-[15%] w-2 h-2 bg-[#16a34a]/30 rounded-full animate-float" />
        <div className="absolute top-40 right-[20%] w-1.5 h-1.5 bg-[#22c55e]/20 rounded-full animate-float-slow" />
        <div className="absolute bottom-40 left-[25%] w-1 h-1 bg-[#16a34a]/40 rounded-full animate-float-delay" />
        <div className="absolute top-[60%] right-[10%] w-2.5 h-2.5 bg-[#16a34a]/15 rounded-full animate-float-slow" />
        <div className="absolute top-[30%] left-[60%] w-1.5 h-1.5 bg-[#22c55e]/15 rounded-full animate-float" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-[#16a34a]/20 bg-green-50 text-[#16a34a] text-sm font-medium"
        >
          <Award className="w-3.5 h-3.5" />
          Zambia&apos;s Premier Corporate Training Academy
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 text-gray-900"
        >
          Elevate Your Workforce
          <br />
          with{' '}
          <span className="text-brand-gradient">Expert-Led</span>{' '}
          Training
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500 leading-relaxed mb-10"
        >
          From Lusaka to all 10 provinces — Zambia&apos;s trusted partner for
          Soft Skills, Technical &amp; Corporate Training, Conferencing &amp;
          Consultancy. Accredited by The Business Continuity Institute.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-base px-8 py-6 shadow-xl shadow-green-600/20 hover:shadow-green-600/30 transition-all duration-300 group"
            asChild
          >
            <a href="#programmes">
              Explore Programmes
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-[#16a34a] font-semibold text-base px-8 py-6 transition-all duration-300"
            asChild
          >
            <a href="#contact">Contact Us</a>
          </Button>
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 sm:mt-20 pt-8 border-t border-gray-200"
        >
          <p className="text-sm text-gray-400 mb-6">
            Trusted by leading organisations across Zambia
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-40">
            {['Oil & Gas', 'Banking', 'Mining', 'Government', 'Hospitality', 'Retail'].map(
              (company) => (
                <span
                  key={company}
                  className="text-sm sm:text-base font-semibold text-gray-400 tracking-wide"
                >
                  {company}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
