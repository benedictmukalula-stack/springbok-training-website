'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Clock,
  Users,
  ArrowRight,
  CheckCircle2,
  X,
  SlidersHorizontal,
  BookOpen,
  Building2,
  Crown,
  TrendingUp,
  UserCheck,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllCourses, getAllCategories, searchCourses, getRelevanceInsight } from '@/lib/courses-data';
import type { Course, CategoryInfo } from '@/lib/courses-data';

const ICON_MAP: Record<string, React.ElementType> = {
  Crown, TrendingUp, UserCheck, Settings, Users, Building2,
};

const LEVEL_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Foundation: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Intermediate: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  Advanced: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  Custom: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
};

export default function ProgrammesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const categories = getAllCategories();

  const filteredCourses = useMemo(() => {
    let courses = getAllCourses();

    if (searchQuery.trim()) {
      const results = searchCourses(searchQuery);
      courses = results.map((r) => r.course);
    }

    if (activeCategory) {
      courses = courses.filter((c) => c.categoryId === activeCategory);
    }

    if (activeLevel) {
      courses = courses.filter((c) => c.level === activeLevel);
    }

    return courses;
  }, [searchQuery, activeCategory, activeLevel]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchCourses(searchQuery);
  }, [searchQuery]);

  const toggleCourse = useCallback((slug: string) => {
    setExpandedCourses((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }, []);

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory(null);
    setActiveLevel(null);
    setExpandedCourses(new Set());
  };

  const hasActiveFilters = searchQuery.trim() || activeCategory || activeLevel;

  // Group filtered courses by category
  const groupedCourses = useMemo(() => {
    const groups: Record<string, Course[]> = {};
    for (const course of filteredCourses) {
      if (!groups[course.categoryId]) groups[course.categoryId] = [];
      groups[course.categoryId].push(course);
    }
    return groups;
  }, [filteredCourses]);

  return (
    <div className="page-transition min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-32 sm:py-40 overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/images/programmes-classroom.jpg"
            alt="Professional corporate training classroom session"
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
              Training Programmes
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Our Expert-Led{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] to-[#4ade80]">Programmes</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              {filteredCourses.length} courses across 6 categories designed to address every aspect
              of organisational and personal development. Each course is developed by industry
              professionals with years of practical experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="AI-powered search: try 'course for supervisors' or 'customer complaints training'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] focus:bg-white transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[#16a34a]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-semibold tracking-wider uppercase">AI</span>
            </div>
          </div>

          {/* Filter Row */}
          <div className="flex items-center gap-3 mt-3 overflow-x-auto pb-1">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors whitespace-nowrap"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
            </button>

            {/* Category pills */}
            {categories.map((cat) => {
              const Icon = ICON_MAP[cat.icon] || BookOpen;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(isActive ? null : cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#16a34a] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {cat.title}
                </button>
              );
            })}

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors whitespace-nowrap"
              >
                <X className="w-3 h-3" />
                Clear all
              </button>
            )}

            <div className="ml-auto text-xs text-gray-400 whitespace-nowrap">
              {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Expanded filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2 border-t border-gray-100 mt-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Level
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Foundation', 'Intermediate', 'Advanced', 'Custom'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setActiveLevel(activeLevel === level ? null : level)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          activeLevel === level
                            ? 'bg-[#16a34a] text-white'
                            : LEVEL_COLORS[level]
                            ? `${LEVEL_COLORS[level].bg} ${LEVEL_COLORS[level].text} border ${LEVEL_COLORS[level].border}`
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Course Listing */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCourses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-sm text-gray-500 mb-6">
                Try adjusting your search or filters to find what you&apos;re looking for.
              </p>
              <Button onClick={clearFilters} variant="outline" className="gap-2">
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${activeLevel}-${searchQuery}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-10"
              >
                {Object.entries(groupedCourses).map(([catId, courses]) => {
                  const cat = categories.find((c) => c.id === catId);
                  const CatIcon = cat ? ICON_MAP[cat.icon] || BookOpen : BookOpen;
                  return (
                    <div key={catId}>
                      {/* Category header */}
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                          <CatIcon className="w-5 h-5 text-[#16a34a]" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                            {cat?.title || catId}
                          </h2>
                          <p className="text-xs text-gray-500">
                            {courses.length} course{courses.length !== 1 ? 's' : ''} available
                          </p>
                        </div>
                      </div>

                      {/* Course cards */}
                      <div className="space-y-3">
                        {courses.map((course, cIndex) => {
                          const isExpanded = expandedCourses.has(course.slug);
                          const levelColor = LEVEL_COLORS[course.level] || LEVEL_COLORS.Foundation;
                          const searchScore = searchQuery.trim()
                            ? searchResults.find((r) => r.course.slug === course.slug)?.score || 0
                            : 0;

                          return (
                            <motion.div
                              key={course.slug}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: cIndex * 0.03 }}
                              className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#16a34a]/20 ${
                                isExpanded ? 'border-[#16a34a]/30 shadow-md' : 'border-gray-200'
                              }`}
                            >
                              <div className="p-5 sm:p-6">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1 min-w-0">
                                    {/* Title row */}
                                    <div className="flex items-center gap-2 flex-wrap mb-2">
                                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                        {course.title}
                                      </h3>
                                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${levelColor.bg} ${levelColor.text} border ${levelColor.border}`}>
                                        {course.level}
                                      </span>
                                    </div>

                                    {/* Meta badges */}
                                    <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-gray-500">
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        {course.duration}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Users className="w-3.5 h-3.5" />
                                        {course.deliveryModes.join(' / ')}
                                      </span>
                                      <span className="font-semibold text-[#16a34a]">
                                        From {course.basePricePerDay.toLocaleString()} ZMW/day
                                      </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                      {course.shortDescription}
                                    </p>

                                    {/* AI relevance */}
                                    {searchScore > 0 && (
                                      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-[10px] font-medium text-[#16a34a]">
                                        <Sparkles className="w-3 h-3" />
                                        {getRelevanceInsight(searchScore)} · Score: {searchScore.toFixed(0)}
                                      </div>
                                    )}
                                  </div>

                                  {/* Actions */}
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => toggleCourse(course.slug)}
                                      className="hidden sm:flex gap-1 text-xs"
                                    >
                                      {isExpanded ? (
                                        <>
                                          <ChevronDown className="w-3.5 h-3.5" />
                                          Less
                                        </>
                                      ) : (
                                        <>
                                          <ChevronRight className="w-3.5 h-3.5" />
                                          Outline
                                        </>
                                      )}
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-xs gap-1 shadow-sm"
                                      asChild
                                    >
                                      <Link href={`/programmes/${course.slug}`}>
                                        View Details
                                        <ArrowRight className="w-3.5 h-3.5" />
                                      </Link>
                                    </Button>
                                  </div>
                                </div>

                                {/* Expandable outline (mobile + click) */}
                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="mt-5 pt-5 border-t border-gray-100">
                                        {/* Target audience */}
                                        <div className="mb-4">
                                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                            Who Should Attend
                                          </p>
                                          <div className="flex flex-wrap gap-1.5">
                                            {course.targetAudience.map((ta) => (
                                              <span key={ta} className="px-2.5 py-1 bg-gray-50 rounded-md text-xs text-gray-600">
                                                {ta}
                                              </span>
                                            ))}
                                          </div>
                                        </div>

                                        {/* Learning outcomes */}
                                        <div className="mb-4">
                                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                            Key Outcomes
                                          </p>
                                          <ul className="space-y-1.5">
                                            {course.learningOutcomes.slice(0, 4).map((lo) => (
                                              <li key={lo} className="flex items-start gap-2 text-xs text-gray-600">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] mt-0.5 flex-shrink-0" />
                                                <span>{lo}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>

                                        {/* Modules accordion */}
                                        <div>
                                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                            Course Outline
                                          </p>
                                          <div className="space-y-2">
                                            {course.modules.map((mod, mi) => (
                                              <div key={mi} className="bg-gray-50 rounded-lg p-3">
                                                <p className="text-xs font-semibold text-gray-700 mb-1.5">
                                                  {mi + 1}. {mod.title}
                                                </p>
                                                <div className="flex flex-wrap gap-1">
                                                  {mod.topics.map((topic) => (
                                                    <span key={topic} className="text-[10px] text-gray-500 bg-white px-2 py-0.5 rounded">
                                                      {topic}
                                                    </span>
                                                  ))}
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>

                                        <div className="mt-4">
                                          <Button
                                            size="sm"
                                            className="w-full sm:w-auto bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-xs gap-1"
                                            asChild
                                          >
                                            <Link href={`/programmes/${course.slug}`}>
                                              View Full Details & Register
                                              <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                          </Button>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Need a Customized Programme?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 mb-8">
            We design training programmes tailored specifically to your organization. Contact us to
            discuss your requirements.
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
          </div>
        </div>
      </section>
    </div>
  );
}
