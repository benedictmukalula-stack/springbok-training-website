'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
  Phone,
  ArrowRight,
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
  {
    src: '/images/gallery/real-13.jpg',
    alt: 'Two participants enjoying a casual outdoor networking moment',
    title: 'Outdoor Networking Moment',
    category: 'networking',
    description: 'Two participants at the Springbok Training Academy enjoy a casual outdoor gathering, dressed in vibrant attire and holding water bottles, embodying the relaxed yet engaging atmosphere of the academy\'s networking opportunities. The natural outdoor setting and easy smiles reflect the value Springbok places on building genuine professional connections beyond the classroom, fostering relationships that extend well beyond the training room.',
  },
];

const zipGalleryItems = [
  { src: '/images/gallery/zip-1.jpeg', alt: 'Springbok Training Graduation', title: 'Springbok Training Graduation', category: 'graduations', description: 'A graduation event at Springbok Training, Zambia, where participants and staff gather to celebrate completion of a program, with a certificate recipient at the center and a warm, professional atmosphere of achievement.' },
  { src: '/images/gallery/zip-2.jpeg', alt: 'Springbok Training Team', title: 'Springbok Training Team', category: 'team-building', description: 'A group of Springbok Training staff pose together outdoors in matching green shirts, showcasing camaraderie during a team-building event. The lush, scenic backdrop and relaxed yet professional atmosphere highlight collaboration and shared purpose.' },
  { src: '/images/gallery/zip-3.jpeg', alt: 'Springbok Training Workshop', title: 'Springbok Training Workshop', category: 'workshops', description: 'A group of participants engages in an interactive session during a Springbok Training workshop, with a collaborative and focused atmosphere as they gather around chairs in a bright, professional setting.' },
  { src: '/images/gallery/zip-4.jpeg', alt: 'Springbok Training Workshop', title: 'Springbok Training Workshop', category: 'workshops', description: 'Springbok Training hosts an intensive professional development workshop for secretarial and admin professionals, with staff and participants gathered around a welcoming banner. The atmosphere is warm and collaborative, reflecting the organization\'s commitment to corporate training excellence.' },
  { src: '/images/gallery/zip-5.jpeg', alt: 'Springbok Training Graduation', title: 'Springbok Training Graduation', category: 'graduations', description: 'Three Springbok Training participants celebrate completing an intensive professional development workshop, holding certificates in front of a welcoming banner. The atmosphere is warm and proud, reflecting their achievement in a bright, professional training facility.' },
  { src: '/images/gallery/zip-6.jpeg', alt: 'Professional Development Workshop', title: 'Professional Development Workshop', category: 'workshops', description: 'The photo captures a Springbok Training professional development workshop for secretaries and admin professionals, with a participant in a Springbok Training shirt seated near a welcoming banner. The atmosphere is warm and professional, reflecting the event\'s focus on skill enhancement and corporate growth.' },
  { src: '/images/gallery/zip-7.jpeg', alt: 'Professional Development Workshop', title: 'Professional Development Workshop', category: 'workshops', description: 'The photo captures a participant at Springbok Training\'s intensive professional development workshop for secretaries, PAs, and admin professionals, with a welcoming banner highlighting the event. The atmosphere is warm and professional, reflecting the training\'s focus on skill enhancement in a corporate setting.' },
  { src: '/images/gallery/zip-8.jpeg', alt: 'Springbok Training Certificate Presentation', title: 'Certificate Presentation', category: 'graduations', description: 'A certificate presentation event at Springbok Training, Zambia, where a participant receives their certificate from a trainer, with other team members and attendees observing. The atmosphere is warm and professional, highlighting achievement and collaboration.' },
  { src: '/images/gallery/zip-9.jpeg', alt: 'Springbok Training Graduation', title: 'Springbok Training Graduation', category: 'graduations', description: 'The photo captures a graduation event at Springbok Training, where a participant holds a certificate alongside two trainers, all in branded attire, with a professional and celebratory atmosphere.' },
  { src: '/images/gallery/zip-10.jpeg', alt: 'Professional Development Workshop', title: 'Professional Development Workshop', category: 'workshops', description: 'The photo captures a professional development workshop for secretaries, PAs, and admin professionals hosted by Springbok Training, with a participant seated beside a welcoming banner in a bright, organized venue that conveys a warm, focused atmosphere for learning and growth.' },
  { src: '/images/gallery/zip-11.jpeg', alt: 'Springbok Training Graduation', title: 'Springbok Training Graduation', category: 'graduations', description: 'The photo captures a Springbok Training graduation event, where a participant holds a certificate flanked by two facilitators, with other attendees in branded attire in the background. The atmosphere is warm and professional, celebrating learning and achievement.' },
  { src: '/images/gallery/zip-12.jpeg', alt: 'Springbok Training Graduation', title: 'Springbok Training Graduation', category: 'graduations', description: 'The photo captures a graduation event at Springbok Training, where a participant holds a certificate flanked by two instructors, with other attendees in branded attire, creating a warm, professional atmosphere celebrating skill development.' },
  { src: '/images/gallery/zip-13.jpeg', alt: 'Certificate Presentation', title: 'Certificate Presentation', category: 'graduations', description: 'The event is a certificate presentation at Springbok Training, with a participant holding a certificate flanked by two staff members, all smiling in a bright, professional atmosphere.' },
  { src: '/images/gallery/zip-14.jpeg', alt: 'Springbok Training Graduation', title: 'Springbok Training Graduation', category: 'graduations', description: 'A certificate presentation at a Springbok Training graduation, with participants and staff celebrating a learning milestone in a bright, professional setting.' },
  { src: '/images/gallery/zip-15.jpeg', alt: 'Certificate Presentation Event', title: 'Certificate Presentation Event', category: 'graduations', description: 'The photo captures a certificate presentation at a Springbok Training event, with a participant holding a certificate flanked by two staff members, while others in branded attire observe, creating a warm, professional atmosphere of achievement and recognition.' },
  { src: '/images/gallery/zip-16.jpeg', alt: 'Certificate Presentation', title: 'Certificate Presentation', category: 'graduations', description: 'A certificate presentation event at Springbok Training, Zambia, with participants and staff gathered around a banner, celebrating achievement in a warm, professional atmosphere.' },
  { src: '/images/gallery/zip-17.jpeg', alt: 'Springbok Training Graduation', title: 'Springbok Training Graduation', category: 'graduations', description: 'The photo captures a graduation event at Springbok Training, where a participant in a green Springbok shirt holds a certificate, flanked by two staff members in branded attire. The atmosphere is warm and professional, with attendees celebrating the achievement in a bright, welcoming facility.' },
  { src: '/images/gallery/zip-18.jpeg', alt: 'Springbok Training Workshop', title: 'Springbok Training Workshop', category: 'workshops', description: 'The photo captures a Springbok Training workshop for secretarial and admin professionals, with attendees gathered around a welcoming banner. The atmosphere is warm and professional, reflecting a collaborative learning environment.' },
  { src: '/images/gallery/zip-19.jpeg', alt: 'Springbok Training Workshop', title: 'Springbok Training Workshop', category: 'workshops', description: 'Participants in Springbok Training shirts gather for a group photo at an intensive professional development workshop, with a welcoming banner in the background and a bright, collaborative atmosphere.' },
  { src: '/images/gallery/zip-20.jpeg', alt: 'Springbok Training Workshop', title: 'Springbok Training Workshop', category: 'workshops', description: 'A group of professionals in Springbok-branded attire gathers for a photo at an intensive professional development workshop, with a welcoming banner and bright, collaborative atmosphere highlighting the event\'s focus on skill-building and engagement.' },
  { src: '/images/gallery/zip-21.jpeg', alt: 'Springbok Training Workshop Group', title: 'Springbok Workshop Group', category: 'workshops', description: 'A group of participants and facilitators from Springbok Training gather for a photo at an intensive professional development workshop, with a welcoming banner in the background. The atmosphere is collaborative and professional, reflecting engagement and shared learning among the attendees.' },
  { src: '/images/gallery/zip-22.jpeg', alt: 'Springbok Training Workshop Group', title: 'Springbok Workshop Group', category: 'workshops', description: 'A group of participants and facilitators from Springbok Training gather outside Seasons restaurant for a professional development workshop, creating a warm, collaborative atmosphere focused on learning and growth.' },
  { src: '/images/gallery/zip-23.jpeg', alt: 'Springbok Training Workshop', title: 'Springbok Training Workshop', category: 'workshops', description: 'The photo captures a group of participants and facilitators at a Springbok Training workshop, gathered in front of a restaurant with a welcoming banner. The atmosphere is collaborative and professional, reflecting engagement in a learning-focused event.' },
  { src: '/images/gallery/zip-24.jpeg', alt: 'Springbok Training Workshop', title: 'Springbok Training Workshop', category: 'workshops', description: 'A group of professionals in Springbok Training-branded attire gathers for a photo at an intensive professional development workshop, with a welcoming banner and bright, collaborative atmosphere highlighting engagement and learning.' },
  { src: '/images/gallery/zip-25.jpeg', alt: 'Springbok Training Workshop Group', title: 'Springbok Workshop Group', category: 'workshops', description: 'A group of Springbok Training participants and facilitators gather for a photo at a workshop, with a welcoming banner and branded attire, creating a collaborative, professional atmosphere focused on learning and engagement.' },
  { src: '/images/gallery/zip-26.jpeg', alt: 'Springbok Training Group Photo', title: 'Springbok Group Photo', category: 'workshops', description: 'This photo captures participants of a Springbok Training workshop, with attendees in branded shirts gathered for a group photo. The atmosphere is warm and professional, reflecting a collaborative learning environment.' },
  { src: '/images/gallery/zip-27.jpeg', alt: 'Springbok Training Workshop Group', title: 'Springbok Workshop Group', category: 'workshops', description: 'A group of Springbok Training participants and facilitators pose for a photo at an intensive professional development workshop, with a welcoming banner in the background. The atmosphere is collaborative and engaged, reflecting a positive learning environment.' },
  { src: '/images/gallery/zip-28.jpeg', alt: 'Springbok Training Group Photo', title: 'Springbok Group Photo', category: 'workshops', description: 'This photo captures a group of participants and trainers at a Springbok Training workshop, all wearing branded shirts, gathered in a bright, professional facility with a welcoming banner. The atmosphere is collaborative and positive, reflecting a successful learning event.' },
  { src: '/images/gallery/zip-29.jpeg', alt: 'Springbok Training Group Photo', title: 'Springbok Group Photo', category: 'workshops', description: 'A group of Springbok Training participants and facilitators pose outside Seasons a la carte restaurant, showcasing camaraderie after an intensive professional development workshop. The warm, collaborative atmosphere reflects the success of their training experience.' },
  { src: '/images/gallery/zip-30.jpeg', alt: 'Springbok Training Workshop Group', title: 'Springbok Workshop Group', category: 'workshops', description: 'A group of Springbok Training participants and facilitators pose in front of Seasons a la carte restaurant after a professional development workshop, with a warm, collaborative atmosphere highlighting team engagement and learning.' },
  { src: '/images/gallery/zip-31.jpeg', alt: 'Corporate Training Session', title: 'Corporate Training Session', category: 'workshops', description: 'A professional workshop at Springbok Training, Zambia, where a facilitator engages a diverse group of participants seated around a conference table, fostering an interactive and collaborative atmosphere.' },
  { src: '/images/gallery/zip-32.jpeg', alt: 'Corporate Training Session', title: 'Corporate Training Session', category: 'workshops', description: 'A professional workshop is underway with a facilitator addressing participants seated around a conference table, fostering an engaged and collaborative atmosphere focused on learning and development.' },
  { src: '/images/gallery/zip-33.jpeg', alt: 'Corporate Networking Dinner', title: 'Corporate Networking Dinner', category: 'networking', description: 'A group of professionals gathers around a table for a meal, engaging in conversation in a warm, professional atmosphere. The setting includes a bar in the background, with attendees dressed in business attire, fostering connection and collaboration.' },
  { src: '/images/gallery/zip-34.jpeg', alt: 'Springbok Training Team', title: 'Springbok Training Team', category: 'team-building', description: 'Two Springbok Training team members pose confidently outdoors, showcasing camaraderie and professionalism. The sunny, relaxed atmosphere reflects a positive team-building or collaborative event.' },
  { src: '/images/gallery/zip-35.jpeg', alt: 'Springbok Training Group Photo', title: 'Springbok Group Photo', category: 'workshops', description: 'A group of participants and facilitators pose together at a Springbok Training workshop, with a branded banner in the background, creating a warm, collaborative atmosphere focused on learning and connection.' },
  { src: '/images/gallery/zip-36.jpeg', alt: 'Springbok Training Workshop', title: 'Springbok Training Workshop', category: 'workshops', description: 'A group of professionals poses for a photo at a Springbok Training workshop, with a branded banner in the background. The atmosphere is warm and collaborative, reflecting engagement and shared learning.' },
  { src: '/images/gallery/zip-37.jpeg', alt: 'Springbok Team Photo', title: 'Springbok Team Photo', category: 'team-building', description: 'Three Springbok Training staff members pose confidently in front of a branded bus, showcasing camaraderie during a team-building event. The atmosphere is warm and professional, reflecting a collaborative spirit among colleagues.' },
  { src: '/images/gallery/zip-38.jpeg', alt: 'Springbok Team Photo', title: 'Springbok Team Photo', category: 'team-building', description: 'Three Springbok Training staff members pose confidently in matching branded shirts in front of a colorful bus, embodying a collaborative and professional atmosphere during a team-building event.' },
  { src: '/images/gallery/zip-39.jpeg', alt: 'Springbok Team Outing', title: 'Springbok Team Outing', category: 'team-building', description: 'Three Springbok Training staff members pose in front of a branded bus, suggesting a team-building event. The atmosphere is warm and professional, with participants dressed in matching company shirts, indicating camaraderie and collaboration.' },
  { src: '/images/gallery/zip-40.jpeg', alt: 'Springbok Team Photo', title: 'Springbok Team Photo', category: 'team-building', description: 'Three Springbok Training staff members pose confidently in front of a branded bus, showcasing camaraderie and professionalism. The bright, sunny setting and their coordinated attire reflect a positive, collaborative atmosphere typical of team-building events.' },
  { src: '/images/gallery/zip-41.jpeg', alt: 'Springbok Training Group Photo', title: 'Springbok Group Photo', category: 'workshops', description: 'A group of professionals gathers for a photo at Springbok Training, with a Welcome banner highlighting the corporate training partner. The atmosphere is warm and collaborative, reflecting a successful workshop or training session.' },
  { src: '/images/gallery/zip-42.jpeg', alt: 'Team by the Lakeshore', title: 'Team by the Lakeshore', category: 'team-building', description: 'A group of professionals from Springbok Training gathers on a sunny lakeshore, posing together in a relaxed, collaborative atmosphere that reflects camaraderie and shared purpose.' },
  { src: '/images/gallery/zip-43.jpeg', alt: 'Group Photo at Training Event', title: 'Group Photo at Training Event', category: 'workshops', description: 'A diverse group of professionals gathers for a group photo at a Springbok Training workshop, with participants dressed in business and semi-formal attire, creating a warm, collaborative atmosphere.' },
  { src: '/images/gallery/zip-44.jpeg', alt: 'Corporate Group Photo', title: 'Corporate Group Photo', category: 'workshops', description: 'A diverse group of professionals gathers for a group photo at a Springbok Training workshop, with two men seated and others standing around them, creating a warm, collaborative atmosphere in a bright, modern facility.' },
];

const galleryItems = [
  ...featuredPhotos,
  ...zipGalleryItems,
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

      {/* CTA Section */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-br from-[#16a34a] via-[#15803d] to-[#22c55e] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Inspired by What You See?
          </h2>
          <p className="max-w-2xl mx-auto text-white/80 mb-10 leading-relaxed">
            Join hundreds of professionals across Zambia who have transformed their careers through our accredited training programmes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              size="lg"
              className="bg-white hover:bg-gray-100 text-[#16a34a] font-semibold text-base px-8 py-6 shadow-xl shadow-black/10 hover:shadow-black/20 transition-all duration-300 group"
              asChild
            >
              <Link href="/programmes">
                Browse 31 Programmes
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 py-6 transition-all duration-300 group"
              asChild
            >
              <Link href="/contact">
                <Phone className="w-4 h-4 mr-2" />
                Enquire Now
              </Link>
            </Button>
          </div>
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-xs text-white/60 font-medium">Call Us Today</div>
              <a href="tel:+260966135560" className="text-base font-bold text-white hover:text-white/80 transition-colors">
                +260 966 135 560
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
