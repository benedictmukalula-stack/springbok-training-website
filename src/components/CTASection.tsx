'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#16a34a] via-[#15803d] to-[#22c55e]" />
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Transform
              <br />
              Your Team?
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
              Get in touch with our training consultants to design a bespoke
              programme tailored to your organisation&apos;s needs across Zambia.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Button
                size="lg"
                className="bg-white hover:bg-gray-50 text-[#16a34a] font-bold text-base px-10 py-6 shadow-2xl shadow-black/15 hover:shadow-black/25 ring-2 ring-white/30 hover:ring-white/60 transition-all duration-300 group"
                asChild
              >
                <Link href="/contact">
                  Get a Free Consultation
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/15 hover:border-white/60 font-semibold text-base px-8 py-6 backdrop-blur-sm transition-all duration-300 group"
                asChild
              >
                <Link href="/pricing">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Pricing
                </Link>
              </Button>
            </div>

            {/* Phone Number */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-xs text-white/60 font-medium">
                  Call Us Today
                </div>
                <a
                  href="tel:+260966135560"
                  className="text-base font-bold text-white hover:text-white/80 transition-colors"
                >
                  +260 966 135 560
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
