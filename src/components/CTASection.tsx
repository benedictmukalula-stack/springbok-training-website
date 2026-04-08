'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c] via-[#b8973e] to-[#a8873a]" />
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.2) 1px, transparent 0)`,
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d0d0d] mb-6 leading-tight">
              Ready to Transform
              <br />
              Your Team?
            </h2>
            <p className="text-base sm:text-lg text-[#0d0d0d]/70 mb-10 leading-relaxed max-w-2xl mx-auto">
              Get in touch with our training consultants to design a bespoke
              programme tailored to your organisation&apos;s needs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Button
                size="lg"
                className="bg-[#0d0d0d] hover:bg-[#1a1a1a] text-[#c9a84c] font-semibold text-base px-8 py-6 shadow-xl shadow-black/20 hover:shadow-black/30 transition-all duration-300 group"
                asChild
              >
                <a href="#contact">
                  Get a Free Consultation
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#0d0d0d]/30 text-[#0d0d0d] hover:bg-[#0d0d0d]/10 font-semibold text-base px-8 py-6 transition-all duration-300 group"
                asChild
              >
                <a href="#calendar">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Training Calendar
                </a>
              </Button>
            </div>

            {/* Phone Number */}
            <div className="inline-flex items-center gap-3 bg-[#0d0d0d]/10 backdrop-blur-sm rounded-full px-6 py-3 border border-[#0d0d0d]/10">
              <div className="w-10 h-10 rounded-full bg-[#0d0d0d]/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#0d0d0d]" />
              </div>
              <div className="text-left">
                <div className="text-xs text-[#0d0d0d]/60 font-medium">
                  Call Us Today
                </div>
                <a
                  href="tel:+27112345678"
                  className="text-base font-bold text-[#0d0d0d] hover:text-[#0d0d0d]/80 transition-colors"
                >
                  +27 (0) 11 234 5678
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
