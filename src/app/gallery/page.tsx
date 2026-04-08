'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  Award,
  Briefcase,
  Lightbulb,
  Handshake,
  Presentation,
} from 'lucide-react';

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

const categories = [
  { id: 'all', label: 'All Photos', icon: Briefcase },
  { id: 'workshops', label: 'Workshops', icon: Presentation },
  { id: 'team-building', label: 'Team Building', icon: Users },
  { id: 'graduations', label: 'Graduations', icon: Award },
  { id: 'facilities', label: 'Our Facilities', icon: Lightbulb },
  { id: 'networking', label: 'Networking', icon: Handshake },
];

const featuredPhotos = [
  {
    src: '/images/gallery/real-1.jpeg',
    alt: 'Certificate presentation at Springbok Training programme',
    title: 'Certificate Presentation Ceremony',
    category: 'graduations',
    description: 'Participants from a Springbok Training programme gather for a certificate presentation, with a graduate proudly holding her certification at the centre. The group, dressed in branded Springbok shirts, exudes a sense of achievement and camaraderie, set against a backdrop of the company\'s promotional banner. The atmosphere is warm and professional, reflecting the success of a collaborative training event designed to empower professionals in Zambia.',
  },
  {
    src: '/images/gallery/real-2.jpeg',
    alt: 'Springbok Training team at an outdoor venue with scenic backdrop',
    title: 'Team Photo at Scenic Venue',
    category: 'team-building',
    description: 'The Springbok Training team poses confidently on a lush, grassy lawn with a scenic lake and distant hills in the background. Dressed in matching green branded shirts, the group embodies the collaborative spirit of professional development. The warm, natural setting complements the company\'s focus on fostering connection and growth through engaging training experiences.',
  },
  {
    src: '/images/gallery/real-3.jpeg',
    alt: 'Graduates displaying certificates after completing a professional workshop',
    title: 'Workshop Graduates Celebrating',
    category: 'graduations',
    description: 'Three participants proudly display their certificates after completing an intensive professional training workshop. Dressed in branded Springbok shirts, they stand together around a welcoming banner that highlights the training\'s focus on professional development, creating a warm, celebratory atmosphere of achievement. This moment captures the essence of Springbok\'s commitment to empowering professionals through impactful, hands-on learning experiences.',
  },
  {
    src: '/images/gallery/real-4.jpeg',
    alt: 'Participant at an intensive admin professional development workshop',
    title: 'Admin Professionals Workshop',
    category: 'workshops',
    description: 'A participant in a Springbok Training workshop sits alongside a banner for an Intensive Professional Development Workshop for Secretaries, PAs & Admin Professionals. The bright, modern indoor venue with glass doors and polished floor reflects a welcoming, professional atmosphere, capturing the collaborative and engaging spirit of Springbok\'s corporate training events.',
  },
  {
    src: '/images/gallery/real-5.jpeg',
    alt: 'Participant at the intensive PA and admin workshop venue',
    title: 'Training Venue Showcase',
    category: 'facilities',
    description: 'A participant sits beside a welcoming banner for Springbok Training\'s intensive professional development workshop for secretaries, PAs, and admin professionals. Set in a bright, modern venue with glass doors and outdoor greenery, the atmosphere is warm and professional, reflecting the company\'s commitment to empowering administrative professionals through tailored training in a supportive environment.',
  },
  {
    src: '/images/gallery/real-6.jpeg',
    alt: 'Certificate presentation moment at a Springbok Training event',
    title: 'Achievement Recognition',
    category: 'graduations',
    description: 'A certificate presentation unfolds at a Springbok Training event, with team members in branded shirts sharing a moment of recognition. The atmosphere is warm and celebratory, highlighting the company\'s commitment to professional development as attendees gather to honour achievements in a bright, welcoming venue.',
  },
  {
    src: '/images/gallery/real-7.jpeg',
    alt: 'Participants at a Springbok Training workshop banner setup',
    title: 'Workshop Welcome & Setup',
    category: 'workshops',
    description: 'Participants gather around a welcoming banner for Springbok Training\'s intensive professional development workshop, designed for secretarial and administrative professionals. Team members in branded shirts engage warmly with attendees, fostering an inviting, collaborative atmosphere that reflects the company\'s commitment to empowering corporate growth. The setting—bright, open, and professional—highlights Springbok\'s role as a trusted partner in delivering impactful training experiences.',
  },
  {
    src: '/images/gallery/real-8.jpeg',
    alt: 'Participant receiving certificate flanked by Springbok team members',
    title: 'Certificate Award Moment',
    category: 'graduations',
    description: 'A participant proudly holds a certificate while standing between two Springbok Training team members, all wearing branded shirts, in a bright, welcoming indoor space. The atmosphere is celebratory and professional, highlighting a successful training programme where learners are recognised for their achievements. This moment captures the essence of Springbok\'s commitment to empowering professionals through impactful, engaging learning experiences.',
  },
  {
    src: '/images/gallery/real-9.jpeg',
    alt: 'Professional seated at welcome banner for admin workshop',
    title: 'Workshop in Session',
    category: 'workshops',
    description: 'A professional sits poised in front of a vibrant welcome banner for Springbok Training\'s intensive professional development workshop for secretaries, PAs, and admin professionals. The setting—bright, modern, and inviting—reflects the company\'s commitment to fostering growth in a warm, approachable environment. This image captures the essence of Springbok\'s mission: empowering professionals through tailored, engaging training experiences.',
  },
  {
    src: '/images/gallery/real-10.jpeg',
    alt: 'Graduation ceremony with certificate recipient and team',
    title: 'Graduation Day Celebration',
    category: 'graduations',
    description: 'A participant proudly holds a certificate while standing between two Springbok Training team members during a graduation ceremony. The atmosphere is celebratory and professional, with other attendees in the background, highlighting the company\'s commitment to empowering professionals through impactful training. This moment captures the success of a training programme, showcasing Springbok\'s role in fostering growth and achievement in Zambia\'s business community.',
  },
  {
    src: '/images/gallery/real-11.jpeg',
    alt: 'Certificate recipient with Springbok team at training event',
    title: 'Professional Milestone',
    category: 'graduations',
    description: 'A participant proudly holds a certificate while standing between two Springbok Training team members, celebrating the successful completion of a professional training programme. Behind them, other attendees in branded green shirts engage with materials, creating a collaborative and achievement-focused atmosphere. The setting—featuring a company banner and polished indoor space—highlights Springbok\'s commitment to fostering skill development and recognition in Zambia\'s corporate training landscape.',
  },
  {
    src: '/images/gallery/real-12.jpeg',
    alt: 'Group of women engaged in interactive training activity',
    title: 'Collaborative Group Activity',
    category: 'workshops',
    description: 'A diverse group of women in Springbok Training branded shirts gather around two chairs, actively engaged in a collaborative activity. The atmosphere is dynamic and interactive, with participants leaning in, gesturing, and sharing ideas, reflecting the hands-on, participatory approach that defines Springbok\'s professional development workshops. This scene captures the essence of the company\'s commitment to fostering connection and skill-building in a supportive, engaging environment.',
  },
];

const galleryItems = [
  ...featuredPhotos,
  {
    src: '/images/gallery/workshop-session.jpg',
    alt: 'Corporate training workshop session with engaged participants',
    title: 'Interactive Workshop Session',
    category: 'workshops',
    description: 'Hands-on training workshops designed to build practical skills that delegates can apply immediately in their roles.',
  },
  {
    src: '/images/gallery/leadership-seminar.jpg',
    alt: 'Leadership seminar with keynote speaker addressing audience',
    title: 'Executive Leadership Seminar',
    category: 'workshops',
    description: 'Senior professionals gathered for our flagship leadership development programme covering strategic thinking and change management.',
  },
  {
    src: '/images/gallery/team-building.jpg',
    alt: 'Outdoor team building activity with corporate group',
    title: 'Outdoor Team Building',
    category: 'team-building',
    description: 'Collaborative team challenges that strengthen communication, trust, and problem-solving abilities across departments.',
  },
  {
    src: '/images/gallery/graduation-ceremony.jpg',
    alt: 'Certificate award ceremony for training graduates',
    title: 'Graduation & Certification',
    category: 'graduations',
    description: 'Celebrating the achievements of professionals who have successfully completed our accredited training programmes.',
  },
  {
    src: '/images/gallery/group-discussion.jpg',
    alt: 'Small group discussion during corporate training',
    title: 'Collaborative Learning',
    category: 'workshops',
    description: 'Small group discussions foster deeper understanding and encourage knowledge sharing among participants.',
  },
  {
    src: '/images/gallery/coaching-session.jpg',
    alt: 'One-on-one coaching session with facilitator',
    title: 'Personalised Coaching',
    category: 'workshops',
    description: 'Individual coaching sessions tailored to address specific professional development goals and challenges.',
  },
  {
    src: '/images/gallery/training-facility.jpg',
    alt: 'Modern training room setup with presentation equipment',
    title: 'State-of-the-Art Training Room',
    category: 'facilities',
    description: 'Our purpose-built training facilities in Lusaka feature modern audio-visual equipment and comfortable learning environments.',
  },
  {
    src: '/images/gallery/networking-event.jpg',
    alt: 'Corporate networking event during coffee break',
    title: 'Networking & Collaboration',
    category: 'networking',
    description: 'Coffee breaks and networking sessions connect professionals from diverse industries, fostering valuable business relationships.',
  },
  {
    src: '/images/gallery/facilitator-portrait.jpg',
    alt: 'Professional training facilitator and coach',
    title: 'Expert Facilitators',
    category: 'facilities',
    description: 'Our facilitators bring decades of industry experience and internationally recognised qualifications to every programme.',
  },
];

const stats = [
  { number: '500+', label: 'Training Sessions Delivered' },
  { number: '12,000+', label: 'Professionals Trained' },
  { number: '200+', label: 'Corporate Clients' },
  { number: '98%', label: 'Satisfaction Rate' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="page-transition min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative py-32 sm:py-40 overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/images/gallery/real-1.jpeg"
            alt="Springbok Training gallery"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50" />
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
              Our Story in Pictures
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Training{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] to-[#4ade80]">
                Gallery
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Browse moments from our training programmes, graduations, team building events,
              and corporate partnerships across Zambia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-[#16a34a] to-[#15803d] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-green-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Photos with Narratives */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block text-[#16a34a] text-sm font-semibold tracking-wider uppercase mb-3">
              Captured Moments
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Highlights from Our Programmes
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Real moments from our training sessions, graduations, and team events across Zambia. Each photo tells a story of professional growth and achievement.
            </p>
          </AnimatedSection>

          {/* Featured photo cards with full narratives */}
          <div className="space-y-16 mb-20">
            {featuredPhotos.map((item, index) => (
              <AnimatedSection key={item.src}>
                <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] group cursor-pointer" onClick={() => openLightbox(index)}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all duration-300 scale-75 group-hover:scale-100">
                          <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <span className="inline-block text-[#16a34a] text-xs font-semibold tracking-wider uppercase mb-2 bg-green-50 px-3 py-1 rounded-full">
                      {item.category === 'graduations' ? 'Graduation' : item.category === 'workshops' ? 'Workshop' : item.category === 'team-building' ? 'Team Building' : 'Facilities'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 pt-16">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                More from Our Gallery
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Browse additional photos from our programmes and events.
              </p>
            </AnimatedSection>
          </div>

          {/* Category Filters */}
          <AnimatedSection className="mb-12">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-[#16a34a] text-white shadow-lg shadow-green-600/20'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Photo Grid - only non-featured items */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const isFeatured = featuredPhotos.some((f) => f.src === item.src);
                return (
                <motion.div
                  key={`${item.src}-${activeCategory}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`group cursor-pointer ${isFeatured ? 'ring-2 ring-[#16a34a]/30 rounded-2xl' : ''}`}
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[16/10]">
                    {isFeatured && (
                      <div className="absolute top-3 left-3 z-10 bg-[#16a34a] text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-semibold text-base mb-1">{item.title}</h3>
                      <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    {/* Zoom indicator */}
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No photos in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Image + Caption */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                <Image
                  src={filteredItems[lightboxIndex].src}
                  alt={filteredItems[lightboxIndex].alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-white font-semibold text-lg mb-1">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                  {filteredItems[lightboxIndex].description}
                </p>
                <p className="text-gray-600 text-xs mt-3">
                  {lightboxIndex + 1} / {filteredItems.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
