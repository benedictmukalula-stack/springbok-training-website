'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Crown,
  TrendingUp,
  UserCheck,
  Settings,
  Users,
  Building2,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const programmes = [
  {
    id: 'leadership',
    icon: Crown,
    title: 'Leadership & Management',
    description: 'Develop strong leaders who can inspire teams, drive performance, and manage people effectively across your organisation.',
    color: 'from-[#16a34a] to-[#22c55e]',
    courses: [
      {
        title: 'Leadership and Team Building',
        description: 'Designed to improve leadership skills and allow delegates to lead successful and high performing teams. Our team building workshops are packed full of useful teamwork training exercises, tips and techniques that new and experienced managers will find essential.',
      },
      {
        title: 'Coaching for Managers',
        description: 'Shows delegates tried and tested methods about 1-2-1 training, executive coaching and how to develop people in order to improve productivity and motivation. We explain through discussion, role-play and case study how to coach staff.',
      },
      {
        title: 'Delegation Skills',
        description: 'Enables delegates to understand the techniques and strategies that will allow them to use delegation as a tool to achieve greater personal productivity, hit organizational deadlines, increase motivation and decrease stress levels.',
      },
      {
        title: 'Stress Management',
        description: 'Over the years we have trained thousands of people to enable them to recognize stress symptoms and causes. Our training has a proven track record in stress reduction and managing stress at work with practical tips and techniques.',
      },
      {
        title: 'Managing Meetings',
        description: 'Enables people to organize and chair meetings that are more effective and more motivating for those that attend. Learn to involve and focus the group, use the power of persuasion and reach agreement constructively.',
      },
      {
        title: 'Appraisal Skills',
        description: 'Teaches delegates how to raise the motivation of employees and improve performance through setting objectives, giving effective feedback and praise. Includes tips for managing conflict in appraisals and writing effective performance reviews.',
      },
      {
        title: 'Project Management for Non-Project Managers',
        description: 'Presents delegates with useful strategies for organizing projects, improving project management skills, managing projects effectively, project planning and becoming a great project manager.',
      },
    ],
  },
  {
    id: 'sales',
    icon: TrendingUp,
    title: 'Sales & Customer Service',
    description: 'Equip your team with proven sales techniques and exceptional customer service skills to drive business growth and client satisfaction.',
    color: 'from-[#16a34a] to-[#22c55e]',
    courses: [
      {
        title: 'Customer Service and Customer Care',
        description: 'Essential for developing a Customer Caring or \'Customers First\' attitude to delivering service effectively and consistently. Learn tips and techniques on how to handle different customers in face-to-face and telephone interactions.',
      },
      {
        title: 'Introduction to Selling',
        description: 'A highly structured, interactive foundation training that focuses on bringing out the best of delegates in a supportive environment. Our trainers use their 20 years of selling and training experience to increase confidence and competence.',
      },
      {
        title: 'Telesales and Telemarketing',
        description: 'Developed for telemarketers who make a significant number of prospecting calls and telesales professionals who handle large volumes of incoming sales calls. Written with both the customer and organization in mind.',
      },
      {
        title: 'Telephone Skills and Customer Care',
        description: 'For those wishing to learn telephone etiquette and handling customers on the telephone. Develop effective Customer Care training that enables you to deliver service consistently.',
      },
      {
        title: 'Account Management',
        description: 'Covers fostering client relationships, working with sales and marketing teams to prepare presentations and sales pitches, designing marketing strategies, handling client communications and writing client reports.',
      },
    ],
  },
  {
    id: 'personal',
    icon: UserCheck,
    title: 'Personal Development',
    description: 'Build confidence, communication skills, and personal effectiveness with our comprehensive personal development programmes.',
    color: 'from-[#16a34a] to-[#22c55e]',
    courses: [
      {
        title: 'Assertiveness Skills',
        description: 'Allows delegates to develop confidence and self-esteem so that their opinions will no longer go unnoticed in the workplace. Provides effective tactics to build courage and defy work bullies.',
      },
      {
        title: 'Dealing with Difficult People',
        description: 'Effectively demonstrates how to neutralize problem situations in the workplace. Covers scenarios such as working with aggressive people, handling bullies at work, and dealing with unreasonable people.',
      },
      {
        title: 'Time Management',
        description: 'Created to ensure that delegates can make their time keeping as efficient and effective as possible. Supplies a time management training course full of tools and tips for improving time management and time planning.',
      },
      {
        title: 'Time Management with Microsoft Outlook',
        description: 'Learn to use Outlook as a tool to manage your tasks, calendar, meetings, delegations, contacts and emails, while also being introduced to the latest features.',
      },
      {
        title: 'Advanced Presentation Skills',
        description: 'Gives you a platform to demonstrate your leadership qualities, communication skills, sales ability, influence and promotion potential. We teach proven skills that will enable you to perform at an advanced level.',
      },
      {
        title: 'PowerPoint Presentation Skills',
        description: 'Teaches the skills and techniques which will give you both the confidence and competence to enjoy making PowerPoint presentations, sharpen your image and increase your credibility with colleagues and clients.',
      },
      {
        title: 'Training the Trainer',
        description: 'Essential if you have just been promoted to a training or coaching role or wish to refresh your training skills. Benefits Training Managers who want to know the fundamentals of developing organizational training programmes.',
      },
    ],
  },
  {
    id: 'admin',
    icon: Settings,
    title: 'Administration & Operations',
    description: 'Strengthen operational efficiency with expert training in document management, financial modeling, and professional reporting.',
    color: 'from-[#16a34a] to-[#22c55e]',
    courses: [
      {
        title: 'Document Control and Records Management',
        description: 'Conveys practical methods for identifying and developing systems of records management and document control that every organization needs. Each participant will develop a plan of action and skills to implement an appropriate program.',
      },
      {
        title: 'Electronic Records Management',
        description: 'Tailor-made to provide detailed in-depth understanding of modern electronic records management for employees involved in records management across a wide range of organizations from private to public sectors.',
      },
      {
        title: 'Letter and Report Writing',
        description: 'Allows delegates to gain useful letter writing tools, tips and techniques including constructive letter and report templates. Also demonstrates the particulars of writing effective emails while improving punctuation and grammar.',
      },
      {
        title: 'Excel Dashboards and Reporting',
        description: 'Dashboards provide at-a-glance views of KPIs relevant to particular objectives or business processes. Business Intelligence is a highly sought-after commodity in today\'s world and dashboards are the most frequently used method.',
      },
      {
        title: 'Financial Modeling Using Excel',
        description: 'Effectively prepare and build financial models for different investment alternatives, understand time value of money, WACC, construct forecasted financial statement models, perform sensitivity analysis and use free cash flow techniques.',
      },
    ],
  },
  {
    id: 'hr',
    icon: Users,
    title: 'Human Resources',
    description: 'Develop critical HR competencies including interviewing, performance management, and disciplinary procedures to build stronger teams.',
    color: 'from-[#16a34a] to-[#22c55e]',
    courses: [
      {
        title: 'Interviewing Skills',
        description: 'Tailored for delegates who would like to gain better interviewing skills and learn how to conduct successful interviews for choosing the right employees. Also covers recruitment and employment law.',
      },
      {
        title: 'Disciplinary Procedures',
        description: 'Addresses the finding that 75% of managers were unaware of the correct procedures for disciplining employees. Covers how to deal with under-performing staff and conduct disciplinary meetings effectively.',
      },
    ],
  },
  {
    id: 'corporate',
    icon: Building2,
    title: 'Corporate Solutions',
    description: 'Bespoke in-house training programmes designed to meet your organization\'s specific learning objectives and business goals.',
    color: 'from-[#16a34a] to-[#22c55e]',
    courses: [
      {
        title: 'Existing Standard Course (In-House)',
        description: 'Our standard courses delivered at your location. Cost effective with no travel, lodging, or location expenses. A team building experience with the synergistic effect of being trained together.',
      },
      {
        title: 'Tailor-Made Training Course',
        description: 'Completely bespoke training courses developed to suit your specific learning objectives. Our team of experienced consultants can develop entirely new training courses that meet your training needs.',
      },
      {
        title: 'Customized Existing Standard Course',
        description: 'Our standard courses adapted and customized to align with your organizational goals and specific requirements while maintaining proven course structures.',
      },
      {
        title: 'Springbok Creating Training Partnership',
        description: 'A long-term training partnership model where we work closely with your organization to continuously develop and deliver training programmes aligned with your evolving business needs.',
      },
    ],
  },
];

export default function ProgrammesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProgrammes = activeCategory
    ? programmes.filter((p) => p.id === activeCategory)
    : programmes;

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
              Training Programmes
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Our Expert-Led{' '}
              <span className="text-brand-gradient">Programmes</span>
            </h1>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-500 leading-relaxed">
              Comprehensive training programmes across 6 categories designed to address every aspect of organisational and personal development. Each course is developed by industry professionals with years of practical experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === null
                  ? 'bg-[#16a34a] text-white shadow-lg shadow-green-600/20'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Programmes
            </button>
            {programmes.map((programme) => {
              const Icon = programme.icon;
              return (
                <button
                  key={programme.id}
                  onClick={() => setActiveCategory(activeCategory === programme.id ? null : programme.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeCategory === programme.id
                      ? 'bg-[#16a34a] text-white shadow-lg shadow-green-600/20'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{programme.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programme Listing */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory || 'all'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {filteredProgrammes.map((programme, pIndex) => {
                const Icon = programme.icon;
                return (
                  <motion.div
                    key={programme.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: pIndex * 0.05 }}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#16a34a]/20 transition-all duration-500 hover:shadow-lg hover:shadow-green-600/5"
                  >
                    {/* Category Header */}
                    <div className="p-6 sm:p-8 border-b border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-7 h-7 text-[#16a34a]" />
                        </div>
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            {programme.title}
                          </h2>
                          <p className="text-gray-500 leading-relaxed">
                            {programme.description}
                          </p>
                          <div className="mt-3 inline-flex items-center gap-1.5 text-sm text-[#16a34a] font-medium">
                            <CheckCircle2 className="w-4 h-4" />
                            {programme.courses.length} course{programme.courses.length !== 1 ? 's' : ''} available
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Course Cards */}
                    <div className="divide-y divide-gray-100">
                      {programme.courses.map((course, cIndex) => (
                        <motion.div
                          key={course.title}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: cIndex * 0.05 }}
                          className="p-6 sm:p-8 hover:bg-green-50/30 transition-colors duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <ChevronRight className="w-5 h-5 text-[#16a34a] mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {course.title}
                              </h3>
                              <p className="text-sm text-gray-500 leading-relaxed">
                                {course.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Need a Customized Programme?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 mb-8">
            We design training programmes tailored specifically to your organization. Contact us to discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-base px-8 py-6 shadow-lg shadow-green-600/20 group"
              asChild
            >
              <Link href="/corporate">
                Corporate Training Solutions
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
    </div>
  );
}
