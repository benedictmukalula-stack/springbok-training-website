'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  Target,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  Shield,
  Package,
  Handshake,
  BarChart3,
  Settings,
  Mail,
  ClipboardList,
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

const trainingTypes = [
  {
    icon: Package,
    title: 'Existing Standard Course',
    description: 'Choose from our extensive catalogue of proven training courses and have them delivered at your premises. Our standard courses cover leadership, customer service, administration, HR, and personal development — all adapted for in-house delivery to maximize relevance to your team.',
  },
  {
    icon: Target,
    title: 'Tailor-Made Training Course',
    description: 'Our team of experienced consultants can develop entirely new training courses that will meet your specific training needs. Whether it\'s a unique industry challenge or a specific competency gap, we design bespoke content from the ground up.',
  },
  {
    icon: Settings,
    title: 'Customized Existing Standard Course',
    description: 'Take one of our proven standard courses and have it customized to align perfectly with your organizational goals, industry context, and team dynamics. You get the reliability of a tested programme with the relevance of a tailored solution.',
  },
  {
    icon: Handshake,
    title: 'Training Partnership',
    description: 'Establish a long-term training partnership with Springbok. We work closely with your organization to continuously develop and deliver training programmes aligned with your evolving business needs, ensuring sustained workforce development.',
  },
];

const benefits = [
  {
    icon: BarChart3,
    title: 'Cost Effective',
    description: 'No travel, lodging, or location expenses for your team. In-house training eliminates per-person external costs while delivering the same high-quality instruction.',
  },
  {
    icon: Target,
    title: '100% Customized',
    description: 'Every programme is tailored to fit your specific learning objectives, industry context, and organizational culture for maximum relevance and impact.',
  },
  {
    icon: Users,
    title: 'Team Building',
    description: 'The synergistic effect of training together as a team strengthens bonds, improves communication, and creates shared understanding that translates to better workplace collaboration.',
  },
  {
    icon: Clock,
    title: 'Convenient Scheduling',
    description: 'Suit your schedule and plan training ahead of time. We deliver at your location, at your preferred time, with minimal disruption to your operations.',
  },
  {
    icon: Shield,
    title: 'Complete Learning Solution',
    description: 'A complete learning solution delivered at your location, at your preferred time. Our success is attributed to our ability to work closely with organizations.',
  },
  {
    icon: Building2,
    title: 'All 10 Provinces',
    description: 'We operate in all ten provinces of Zambia. Wherever your organization is based, we can deliver world-class training at your doorstep.',
  },
];

export default function CorporatePage() {
  return (
    <div className="page-transition min-h-screen bg-white">
      {/* Page Header with Image */}
      <section className="relative py-32 sm:py-40 overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/images/corporate-inhouse.jpg"
            alt="Springbok in-house corporate training session"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/60 to-gray-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-[#22c55e] text-sm font-semibold tracking-wider uppercase mb-4">
              Corporate Solutions
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              In-House Training{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] to-[#4ade80]">Solutions</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Our In-House Training Courses are 100% customized and developed with your organizational objectives as their core guideline. A complete learning solution delivered at your location, at your preferred time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits */}
      <AnimatedSection>
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-[#16a34a] text-sm font-semibold tracking-wider uppercase mb-4">
                Why Choose In-House Training
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                The In-House{' '}
                <span className="text-brand-gradient">Advantage</span>
              </h2>
              <p className="max-w-2xl mx-auto text-gray-500 text-base">
                Springbok In-House Training Courses are the most cost-effective and efficient way to train your team.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#16a34a]/20 transition-all duration-500 hover:shadow-lg hover:shadow-green-600/5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#16a34a]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Types of In-House Training */}
      <AnimatedSection>
        <section className="py-20 sm:py-24 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-[#16a34a] text-sm font-semibold tracking-wider uppercase mb-4">
                Flexible Formats
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Types of In-House{' '}
                <span className="text-brand-gradient">Training</span>
              </h2>
              <p className="max-w-2xl mx-auto text-gray-500 text-base">
                Whatever skills you want to develop, whatever the size of your organization, we can work with you to find a solution that fits your exact needs and your budget.
              </p>
            </div>

            <div className="space-y-6">
              {trainingTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <motion.div
                    key={type.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#16a34a]/20 transition-all duration-500 hover:shadow-lg hover:shadow-green-600/5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#16a34a]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{type.title}</h3>
                        <p className="text-gray-500 leading-relaxed">{type.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection>
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-[#16a34a] text-sm font-semibold tracking-wider uppercase mb-4">
                Process
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                How It <span className="text-brand-gradient">Works</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Consultation', description: 'We analyze your training needs, understand your goals, and identify specific requirements.' },
                { step: '02', title: 'Design', description: 'Our team designs a bespoke training programme aligned with your organizational objectives.' },
                { step: '03', title: 'Delivery', description: 'Experienced facilitators deliver training at your location, at your preferred time.' },
                { step: '04', title: 'Follow-Up', description: 'We provide post-training support and measure the impact on your team performance.' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-bold text-brand-gradient mb-4">{item.step}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Facilitators with Image */}
      <AnimatedSection>
        <section className="relative py-20 sm:py-24 overflow-hidden bg-gray-900">
          <div className="absolute inset-0">
            <Image
              src="/images/team-building.jpg"
              alt="Springbok corporate team building training"
              fill
              className="object-cover object-center"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-[#16a34a]/70 to-[#15803d]/60" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Industry-Professional Facilitators
              </h2>
              <p className="text-white/80 leading-relaxed text-lg mb-8">
                Our In-House Training facilitators are industry professionals who have successfully worked in their field of expertise for years. This ensures that you receive the most relevant learning experience. Our network of recognized consultants allows us to match the skills and experience of the facilitator with the required learning outcome.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mt-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <CheckCircle2 className="w-6 h-6 mb-2 text-green-300" />
                  <div className="font-semibold mb-1">17+ Years Experience</div>
                  <div className="text-sm text-white/70">Collective training expertise</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <CheckCircle2 className="w-6 h-6 mb-2 text-green-300" />
                  <div className="font-semibold mb-1">Industry Experts</div>
                  <div className="text-sm text-white/70">Real-world practitioners</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <CheckCircle2 className="w-6 h-6 mb-2 text-green-300" />
                  <div className="font-semibold mb-1">Matched to Needs</div>
                  <div className="text-sm text-white/70">Right expert for your goals</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Interested in In-House Training?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 mb-8">
            Numerous organizations have entrusted us with their teams&apos; In-House Training and benefited tremendously from this service.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-base px-8 py-6 shadow-lg shadow-green-600/20 group"
              asChild
            >
              <Link href="/contact">
                Request a Consultation
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-[#16a34a] font-semibold text-base px-8 py-6"
              asChild
            >
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Email Contact Cards */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-[#16a34a]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Ready to Register?</h3>
                  <p className="text-xs text-gray-500">Programme registration & delegate details</p>
                </div>
              </div>
              <a href="mailto:registration@springboktraining.net" className="text-sm font-medium text-[#16a34a] hover:underline">
                registration@springboktraining.net
              </a>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#16a34a]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">General Enquiries</h3>
                  <p className="text-xs text-gray-500">Questions about our training solutions</p>
                </div>
              </div>
              <a href="mailto:info@springboktraining.net" className="text-sm font-medium text-[#16a34a] hover:underline">
                info@springboktraining.net
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
