'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProgrammesSection from '@/components/ProgrammesSection';
import StatsSection from '@/components/StatsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

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

export default function Home() {
  return (
    <div className="page-transition min-h-screen bg-[#0d0d0d]">
      <Header />
      <main>
        <HeroSection />
        <AnimatedSection>
          <ProgrammesSection />
        </AnimatedSection>
        <AnimatedSection>
          <StatsSection />
        </AnimatedSection>
        <AnimatedSection>
          <WhyChooseUsSection />
        </AnimatedSection>
        <AnimatedSection>
          <TestimonialsSection />
        </AnimatedSection>
        <AnimatedSection>
          <CTASection />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
