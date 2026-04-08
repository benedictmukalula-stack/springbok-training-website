'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import PricingCalculator from '@/components/PricingCalculator';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tiers = [
  {
    name: 'Public Course',
    description: 'Join one of our scheduled public training sessions. Ideal for individuals or small teams wanting to develop specific skills.',
    price: 'K3,500',
    period: 'per participant / day',
    features: [
      'Scheduled training dates across Zambia',
      'Professional course materials included',
      'Certificate of completion',
      'Networking with professionals from other organizations',
      'Lunch and refreshments provided',
      'Post-training support',
    ],
    cta: 'View Programmes',
    href: '/programmes',
    popular: false,
  },
  {
    name: 'In-House Training',
    description: '100% customized training delivered at your location. Cost effective for teams of 5 or more participants.',
    price: 'K4,200',
    period: 'per participant / day',
    features: [
      'Training at your location',
      'Fully customized content',
      'Flexible scheduling',
      'Certificate of completion',
      'No travel costs for participants',
      'Volume discounts available',
      'Post-training support',
      'Dedicated account manager',
    ],
    cta: 'Request a Quote',
    href: '/contact',
    popular: true,
  },
  {
    name: 'Customized Programme',
    description: 'Bespoke training designed from scratch for your organization. Perfect for unique challenges and specific competency gaps.',
    price: 'K5,250',
    period: 'per participant / day',
    features: [
      'Fully bespoke course design',
      'Industry-specific content',
      'Training at your location',
      'Flexible scheduling',
      'Certificate of completion',
      'Comprehensive needs analysis',
      'Post-training impact assessment',
      'Dedicated project manager',
      'Ongoing partnership support',
    ],
    cta: 'Get Started',
    href: '/contact',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="page-transition min-h-screen bg-white">
      {/* Page Header with Image */}
      <section className="relative py-32 sm:py-40 overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/images/pricing-consultation.jpg"
            alt="Professional business consultation and training proposal review"
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
              Pricing
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Training Investment{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] to-[#4ade80]">Options</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Transparent pricing with no hidden costs. All prices in Zambian Kwacha (ZMW). Volume discounts available for large groups. Contact us for custom quotes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl ${
                  tier.popular
                    ? 'border-2 border-[#16a34a] shadow-lg shadow-green-600/10'
                    : 'border border-gray-200 hover:border-[#16a34a]/20 hover:shadow-green-600/5'
                }`}
              >
                {tier.popular && (
                  <div className="bg-[#16a34a] text-white text-center text-sm font-semibold py-2">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{tier.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">{tier.period}</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-[#16a34a] mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full font-semibold text-base py-3 group ${
                      tier.popular
                        ? 'bg-[#16a34a] hover:bg-[#15803d] text-white shadow-lg shadow-green-600/20'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                    asChild
                  >
                    <Link href={tier.href}>
                      {tier.cta}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-20 sm:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingCalculator />
        </div>
      </section>

      {/* Volume Discounts */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-[#16a34a] text-sm font-semibold tracking-wider uppercase mb-4">
              Save More
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Volume <span className="text-brand-gradient">Discounts</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-500">
              The more participants you register, the more you save per person.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { participants: '10-19', discount: '5%', color: 'from-[#16a34a]/10 to-[#22c55e]/10' },
              { participants: '20-29', discount: '10%', color: 'from-[#16a34a]/15 to-[#22c55e]/15' },
              { participants: '30+', discount: '15%', color: 'from-[#16a34a]/20 to-[#22c55e]/20' },
            ].map((item) => (
              <div
                key={item.participants}
                className={`bg-gradient-to-br ${item.color} border border-[#16a34a]/20 rounded-xl p-6 text-center`}
              >
                <div className="text-4xl font-bold text-brand-gradient mb-2">{item.discount}</div>
                <div className="text-sm text-gray-600 font-medium">{item.participants} participants</div>
                <div className="text-xs text-gray-400 mt-1">Discount applied</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-[#16a34a] via-[#15803d] to-[#22c55e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Invest in Your Team?
          </h2>
          <p className="max-w-2xl mx-auto text-white/80 mb-8">
            Contact us for a personalized quote tailored to your training needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white hover:bg-gray-100 text-[#16a34a] font-semibold text-base px-8 py-6 shadow-xl group"
              asChild
            >
              <Link href="/contact">
                Get a Free Quote
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 py-6 group"
              asChild
            >
              <a href="tel:+260966135560">
                <Phone className="w-4 h-4 mr-2" />
                Call Us Now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
