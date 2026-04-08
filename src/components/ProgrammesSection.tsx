'use client';

import { motion } from 'framer-motion';
import {
  Crown,
  TrendingUp,
  Settings,
  Shield,
  Brain,
  Target,
  ArrowRight,
} from 'lucide-react';

const programmes = [
  {
    icon: Crown,
    title: 'Leadership & Management',
    description:
      'Develop strategic leaders who drive organisational success through our comprehensive leadership frameworks.',
  },
  {
    icon: TrendingUp,
    title: 'Sales & Customer Service',
    description:
      'Equip your sales teams with cutting-edge techniques and customer-centric approaches that close deals.',
  },
  {
    icon: Settings,
    title: 'Operations & Administration',
    description:
      'Streamline operations and boost administrative efficiency with practical, hands-on training programmes.',
  },
  {
    icon: Shield,
    title: 'Compliance & Governance',
    description:
      'Navigate regulatory requirements confidently with our expert-led compliance and governance training.',
  },
  {
    icon: Brain,
    title: 'AI & Digital Skills',
    description:
      'Prepare your workforce for the future with cutting-edge AI literacy and digital transformation programmes.',
  },
  {
    icon: Target,
    title: 'Project Management',
    description:
      'Master project delivery with internationally recognised methodologies and practical tools.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function ProgrammesSection() {
  return (
    <section id="programmes" className="relative py-24 sm:py-32 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#16a34a] text-sm font-semibold tracking-wider uppercase mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Training{' '}
            <span className="text-brand-gradient">Programmes</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 text-base sm:text-lg">
            Comprehensive programmes designed to address every aspect of
            organisational development.
          </p>
        </motion.div>

        {/* Programme Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {programmes.map((programme) => {
            const Icon = programme.icon;
            return (
              <motion.div
                key={programme.title}
                variants={cardVariants}
                className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:border-[#16a34a]/30 transition-all duration-500 hover:shadow-lg hover:shadow-green-600/5"
              >
                {/* Green top accent */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#16a34a]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-5 group-hover:bg-green-100 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#16a34a]" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-[#15803d] transition-colors duration-300">
                  {programme.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  {programme.description}
                </p>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#16a34a] hover:text-[#15803d] group/link transition-colors duration-200"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
