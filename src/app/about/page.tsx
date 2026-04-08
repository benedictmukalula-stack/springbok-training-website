'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Award, Users, Globe, Target, Eye, Heart, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
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

const milestones = [
  { year: '2014', title: 'Founded in South Africa', description: 'Springbok began operations in South Africa, specializing in corporate training and business solutions.' },
  { year: '2017', title: 'Expanded to Zambia', description: 'Opened offices in Lusaka, bringing world-class corporate training to the Zambian market.' },
  { year: '2020', title: 'Copperbelt Operations', description: 'Extended services to the Copperbelt Province, serving mining and industrial clients across the region.' },
  { year: '2024', title: '17+ Years of Excellence', description: 'Collective team experience of over 17 years, with hundreds of organizations trained across all 10 provinces.' },
];

const industries = [
  'Oil & Gas', 'Manufacturing', 'Banking & Finance', 'Retail', 'Aviation',
  'Shipping', 'Hospitality', 'Trading', 'Mining', 'Government',
  'Telecommunications', 'Healthcare',
];

export default function AboutPage() {
  return (
    <div className="page-transition min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-green-50/50 to-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#16a34a]/5 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-[#22c55e]/5 rounded-full blur-[128px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[#16a34a] text-sm font-semibold tracking-wider uppercase mb-4">
              About Springbok
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Zambia&apos;s Trusted{' '}
              <span className="text-brand-gradient">Training Partner</span>
            </h1>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-500 leading-relaxed">
              Springbok Business Solutions was registered in accordance with the act of the laws of Zambia. Under the register of companies given the certificate No 320180002598. The company is also registered with the Zambia Revenue Authority for Income Tax purposes TP No. 1005238205. Our business involves corporate training, skills development and management consultancy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who Are We */}
      <AnimatedSection>
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block text-[#16a34a] text-sm font-semibold tracking-wider uppercase mb-4">
                  Who We Are
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  A Team of{' '}
                  <span className="text-brand-gradient">Industry Experts</span>
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    We demand the best from everyone at Springbok. Our training team members are carefully selected and assessed to ensure that they have the solid academic knowledge, combined with the necessary practical experience and communication skills to deliver a complete course experience.
                  </p>
                  <p>
                    This is an experience that is not just theory-led, but approaches the material with an emphasis on how to use its methods and techniques effectively in the real world. The Springbok team of experts has a collective experience of over 17 years in training and development facilitation.
                  </p>
                  <p>
                    All our facilitators are approachable, professional and experts in their fields, with experience in a wide range of industry sectors. As a leading provider of professional services through the delivery of accredited training courses, we are committed to helping you get the most from your management systems.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-[#16a34a] to-[#15803d] rounded-2xl p-8 text-white">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold">50+</div>
                        <div className="text-sm text-white/70">Expert Facilitators</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold">500+</div>
                        <div className="text-sm text-white/70">Organizations Trained</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                        <Globe className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold">10</div>
                        <div className="text-sm text-white/70">Provinces Covered</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-[#16a34a]/15 rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Mission & Vision */}
      <AnimatedSection>
        <section className="py-20 sm:py-24 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#16a34a]/20 transition-all duration-500 hover:shadow-lg hover:shadow-green-600/5">
                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-[#16a34a]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide the highest quality and most cost effective services, education and training to all our customers. Our customer relationships have been built up and all customers, large or small, are very important to us. We believe no customer should go away dissatisfied, and we always make every effort to ensure that each and every experience you have with us is an effective and rewarding one. We believe so much in upholding integrity and credibility to all our clients.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#16a34a]/20 transition-all duration-500 hover:shadow-lg hover:shadow-green-600/5">
                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-[#16a34a]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  Continued development of Zambians and Africans at all levels of the private and public sectors and always serving the client. We are constantly on the lookout to invest in the community. We have been giving back to some previously disadvantaged communities through soft skills where our organization is based and this has seen a number of success stories from the communities. This is an initiative we intend to extend to the entire Country of Zambia and African continent as indicated in our vision.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Community Investment */}
      <AnimatedSection>
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-[#16a34a]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Community Goals &amp;{' '}
                <span className="text-brand-gradient">Investment</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                We are constantly on the lookout to invest in the community. We have been giving back to some previously disadvantaged communities through soft skills where our organization is based and this has seen a number of success stories from the communities. This is an initiative we intend to extend to the entire Country of Zambia and African continent as indicated in our vision.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Accreditation */}
      <AnimatedSection>
        <section className="py-20 sm:py-24 bg-gradient-to-br from-[#16a34a] via-[#15803d] to-[#22c55e] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Accreditation &amp; Standards
              </h2>
              <p className="text-white/80 leading-relaxed text-lg">
                We have been awarded full accreditation as a Training Partner by The Business Continuity Institute. Furthermore, Springbok actively pursues excellence within our business processes. Our Skills Development Policy empowers our staff so that they can succeed in any operational or management position within the Company.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { title: 'Accredited Training Partner', desc: 'Recognized by The Business Continuity Institute as an accredited training provider.' },
                { title: 'Skills Development Policy', desc: 'Our internal policy ensures continuous professional development for all staff members.' },
                { title: 'Industry-Standard Curriculum', desc: 'All courses are designed to meet and exceed industry benchmarks and standards.' },
              ].map((item) => (
                <div key={item.title} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <CheckCircle2 className="w-6 h-6 mb-3 text-green-300" />
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Timeline */}
      <AnimatedSection>
        <section className="py-20 sm:py-24 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-[#16a34a] text-sm font-semibold tracking-wider uppercase mb-4">
                Our Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Key <span className="text-brand-gradient">Milestones</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#16a34a]/20 transition-all duration-500"
                >
                  <div className="text-2xl font-bold text-brand-gradient mb-3">{milestone.year}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{milestone.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Industries */}
      <AnimatedSection>
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-[#16a34a] text-sm font-semibold tracking-wider uppercase mb-4">
                Cross-Industry Expertise
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Industries We{' '}
                <span className="text-brand-gradient">Serve</span>
              </h2>
              <p className="max-w-2xl mx-auto text-gray-500 text-base">
                We have designed and conducted training projects across multiple industries, delivering specialized solutions for each sector.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="px-5 py-3 bg-green-50 border border-green-100 rounded-full text-sm font-medium text-[#15803d] hover:bg-green-100 hover:border-green-200 transition-all duration-300"
                >
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Work With Us?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 mb-8">
            Explore our programmes or get in touch to discuss your organisation&apos;s training needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-base px-8 py-6 shadow-lg shadow-green-600/20 group"
              asChild
            >
              <Link href="/programmes">
                View Programmes
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-[#16a34a] font-semibold text-base px-8 py-6"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
