'use client';

import { motion } from 'framer-motion';
import { Award, Users, Clock, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Accredited Programmes',
    description:
      'SETA-accredited programmes that meet national standards and requirements.',
  },
  {
    icon: Users,
    title: 'Expert Facilitators',
    description:
      'Industry veterans with real-world experience leading every session.',
  },
  {
    icon: Clock,
    title: 'Flexible Delivery',
    description:
      'Virtual, in-person, and corporate in-house options to suit your schedule.',
  },
  {
    icon: BarChart3,
    title: 'Measurable Results',
    description:
      'ROI-focused training with pre- and post-assessment metrics.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-[#c9a84c] text-sm font-semibold tracking-wider uppercase mb-4">
              Why Springbok
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f5] mb-6 leading-tight">
              Why Choose{' '}
              <span className="text-gold-gradient">Springbok</span>?
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-10">
              With over a decade of experience in corporate training, Springbok
              Training Academy delivers programmes that create lasting impact. We
              combine industry expertise with innovative learning methodologies to
              help your organisation thrive.
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
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center group-hover:bg-[#c9a84c]/15 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#c9a84c]" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#f5f5f5] mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">
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
              <div className="relative bg-[#141414] border border-white/5 rounded-2xl p-8 overflow-hidden">
                {/* Background pattern */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,168,76,0.5) 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                <div className="relative z-10 space-y-6">
                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5">
                      <div className="text-2xl font-bold text-gold-gradient mb-1">
                        12+
                      </div>
                      <div className="text-xs text-zinc-500">Years Experience</div>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5">
                      <div className="text-2xl font-bold text-gold-gradient mb-1">
                        4.9/5
                      </div>
                      <div className="text-xs text-zinc-500">Average Rating</div>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-4">
                    {[
                      { label: 'Leadership', value: 95 },
                      { label: 'Sales Excellence', value: 88 },
                      { label: 'Digital Skills', value: 92 },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-zinc-300">{item.label}</span>
                          <span className="text-[#c9a84c] font-medium">
                            {item.value}%
                          </span>
                        </div>
                        <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-[#c9a84c] to-[#e8d5a0] rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial snippet */}
                  <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5">
                    <p className="text-sm text-zinc-400 italic leading-relaxed">
                      &ldquo;Springbok delivered beyond our expectations. The
                      training transformed our team&apos;s performance.&rdquo;
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e8d5a0]" />
                      <span className="text-xs text-zinc-500">
                        — Executive Board, TechVentures SA
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating accent elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-[#c9a84c]/20 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-[#c9a84c]/10 rounded-2xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
