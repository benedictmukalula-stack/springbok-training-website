'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote:
      'Springbok Training transformed our leadership team. The programmes were practical, engaging, and delivered measurable results.',
    name: 'Thabo M.',
    title: 'CEO',
    company: 'TechVentures SA',
    rating: 5,
  },
  {
    quote:
      'The compliance training was exactly what we needed. Our team now navigates regulatory requirements with confidence.',
    name: 'Sarah K.',
    title: 'HR Director',
    company: 'FinanceHub',
    rating: 5,
  },
  {
    quote:
      'Outstanding facilitators who truly understand the South African business landscape. Highly recommend!',
    name: 'David N.',
    title: 'Operations Manager',
    company: 'MiningCorp',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  const handleManualNav = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false);
    if (direction === 'prev') prev();
    else next();
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#111111] to-[#0d0d0d]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#c9a84c] text-sm font-semibold tracking-wider uppercase mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f5]">
            What Our{' '}
            <span className="text-gold-gradient">Clients</span> Say
          </h2>
        </motion.div>

        {/* Desktop: 3-column grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-[#141414] border border-white/5 rounded-xl p-6 hover:border-[#c9a84c]/15 transition-all duration-500"
            >
              <Quote className="w-8 h-8 text-[#c9a84c]/30 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-[#c9a84c] fill-[#c9a84c]"
                  />
                ))}
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#a8873a] flex items-center justify-center text-[#0d0d0d] font-bold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#f5f5f5]">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {testimonial.title}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile/Tablet: Carousel */}
        <div className="lg:hidden">
          <div className="relative bg-[#141414] border border-white/5 rounded-xl p-6 min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Quote className="w-8 h-8 text-[#c9a84c]/30 mb-4" />

                <div className="flex gap-1 mb-4">
                  {Array.from({
                    length: testimonials[current].rating,
                  }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[#c9a84c] fill-[#c9a84c]"
                    />
                  ))}
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#a8873a] flex items-center justify-center text-[#0d0d0d] font-bold text-sm">
                    {testimonials[current].name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#f5f5f5]">
                      {testimonials[current].name}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {testimonials[current].title},{' '}
                      {testimonials[current].company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrent(index);
                      setIsAutoPlaying(false);
                      setTimeout(() => setIsAutoPlaying(true), 10000);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === current
                        ? 'bg-[#c9a84c] w-6'
                        : 'bg-zinc-700 hover:bg-zinc-500'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-zinc-400 hover:text-white hover:bg-white/5"
                  onClick={() => handleManualNav('prev')}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-zinc-400 hover:text-white hover:bg-white/5"
                  onClick={() => handleManualNav('next')}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
