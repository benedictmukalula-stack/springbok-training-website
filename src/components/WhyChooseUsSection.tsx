'use client';

import { motion } from 'framer-motion';
import { Award, Users, Clock, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Accredited Programmes',
    description:
      'Fully accredited as a Training Partner by The Business Continuity Institute with 17+ years of collective expertise.',
  },
  {
    icon: Users,
    title: 'Expert Facilitators',
    description:
      'Industry professionals who have successfully worked in their field of expertise for years, ensuring the most relevant learning experience.',
  },
  {
    icon: Clock,
    title: 'Flexible In-House Delivery',
    description:
      '100% customized in-house training delivered at your location, at your preferred time, across all 10 provinces of Zambia.',
  },
  {
    icon: BarChart3,
    title: 'Cost Effective Solutions',
    description:
      'Cost effectiveness is a priority. We provide quality training that delivers real business benefits and high returns on investment.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-[#16a34a] text-sm font-semibold tracking-wider uppercase mb-4">
              Why Springbok
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Why Choose{' '}
              <span className="text-brand-gradient">Springbok</span>?
            </h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-10">
              With over 17 years of collective experience in training and
              development facilitation, Springbok Training and Business Solutions
              delivers programmes that create lasting impact across Zambia. Our
              team of experts is approachable, professional, and leaders in their
              fields.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    className="flex gap-4 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#16a34a]" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main decorative card */}
              <div className="relative bg-white border border-gray-200 rounded-2xl p-8 overflow-hidden shadow-xl shadow-green-600/5">
                {/* Background pattern */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(22,163,74,0.5) 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                <div className="relative z-10 space-y-6">
                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                      <div className="text-2xl font-bold text-brand-gradient mb-1">
                        17+
                      </div>
                      <div className="text-xs text-gray-500">Years Experience</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                      <div className="text-2xl font-bold text-brand-gradient mb-1">
                        4.9/5
                      </div>
                      <div className="text-xs text-gray-500">Average Rating</div>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-4">
                    {[
                      { label: 'Leadership', value: 95 },
                      { label: 'Customer Service', value: 92 },
                      { label: 'Administration', value: 88 },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-700">{item.label}</span>
                          <span className="text-[#16a34a] font-medium">
                            {item.value}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-[#16a34a] to-[#22c55e] rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial snippet */}
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <p className="text-sm text-gray-600 italic leading-relaxed">
                      &ldquo;Springbok delivered beyond our expectations. The
                      training transformed our team&apos;s performance across
                      Lusaka and Copperbelt.&rdquo;
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#16a34a] to-[#22c55e]" />
                      <span className="text-xs text-gray-500">
                        — CEO, Zambezi Mining Group
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating accent elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-[#16a34a]/15 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-[#16a34a]/10 rounded-2xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
