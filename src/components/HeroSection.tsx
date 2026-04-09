'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-training.jpg"
          alt="Springbok corporate training workshop in Zambia"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Dark overlay with green tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-gray-900/30" />
      </div>

      {/* Green accent orbs */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#16a34a]/15 rounded-full blur-[128px] animate-pulse-green" />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#22c55e]/10 rounded-full blur-[128px] animate-pulse-green"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-[#16a34a]/30 bg-[#16a34a]/10 backdrop-blur-sm text-[#22c55e] text-sm font-medium"
          >
            <Award className="w-3.5 h-3.5" />
            Zambia&apos;s Premier Corporate Training Academy
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 text-white"
          >
            Elevate Your Workforce
            <br />
            with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] to-[#4ade80]">
              Expert-Led
            </span>{' '}
            Training
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="max-w-2xl text-base sm:text-lg text-gray-300 leading-relaxed mb-10"
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
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Button
              size="lg"
              className="bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-base px-8 py-6 shadow-xl shadow-green-600/30 hover:shadow-green-600/40 ring-2 ring-[#22c55e]/20 hover:ring-[#22c55e]/40 transition-all duration-300 group"
              asChild
            >
              <Link href="/programmes">
                Explore Programmes
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="border border-white/30 text-white hover:bg-white/10 hover:border-white/60 font-semibold text-base px-8 py-6 transition-all duration-300"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 sm:mt-20 pt-8 border-t border-white/10"
          >
            <p className="text-sm text-gray-400 mb-6">
              Trusted by leading organisations across Zambia
            </p>
            <div className="flex flex-wrap items-center gap-8 sm:gap-12">
              {['Oil & Gas', 'Banking', 'Mining', 'Government', 'Hospitality', 'Retail'].map(
                (company) => (
                  <span
                    key={company}
                    className="text-sm sm:text-base font-semibold text-gray-400/60 tracking-wide"
                  >
                    {company}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-[2]" />
    </section>
  );
}
