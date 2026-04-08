'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { ArrowRight, BookOpen, Users, Building2, Calculator } from 'lucide-react';

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

const quickLinks = [
  {
    icon: BookOpen,
    title: 'Our Programmes',
    description: 'Explore 30+ expert-led training courses across 6 professional categories designed for the Zambian market.',
    href: '/programmes',
    color: 'from-[#16a34a] to-[#22c55e]',
  },
  {
    icon: Building2,
    title: 'Corporate Training',
    description: '100% customized in-house training delivered at your location, tailored to your organisational objectives.',
    href: '/corporate',
    color: 'from-[#15803d] to-[#16a34a]',
  },
  {
    icon: Users,
    title: 'About Springbok',
    description: 'Learn about our 17+ years of experience, accreditation, and our mission to develop Zambians and Africans.',
    href: '/about',
    color: 'from-[#22c55e] to-[#16a34a]',
  },
  {
    icon: Calculator,
    title: 'Pricing Calculator',
    description: 'Plan your training budget with our transparent pricing tool. Starting from K3,500 per participant per day.',
    href: '/pricing',
    color: 'from-[#16a34a] to-[#15803d]',
  },
];

export default function Home() {
  return (
    <div className="page-transition min-h-screen bg-white">
      <HeroSection />
      <AnimatedSection>
        <StatsSection />
      </AnimatedSection>

      {/* Quick Links Section */}
      <section className="relative py-20 sm:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-block text-[#16a34a] text-sm font-semibold tracking-wider uppercase mb-4">
              Explore Springbok
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Discover What We{' '}
              <span className="text-brand-gradient">Offer</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-500 text-base sm:text-lg">
              From comprehensive training programmes to bespoke corporate solutions, find everything you need to elevate your team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="group block bg-white border border-gray-200 rounded-xl p-6 hover:border-[#16a34a]/30 transition-all duration-500 hover:shadow-lg hover:shadow-green-600/5 h-full"
                  >
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-[#16a34a]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#15803d] transition-colors duration-300">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      {link.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#16a34a] group-hover:text-[#15803d] transition-colors">
                      Learn More
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatedSection>
        <WhyChooseUsSection />
      </AnimatedSection>
      <AnimatedSection>
        <TestimonialsSection />
      </AnimatedSection>
    </div>
  );
}
