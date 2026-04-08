'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Programmes', href: '#programmes', hasDropdown: true },
  { label: 'Corporate Training', href: '#corporate' },
  { label: 'Calendar', href: '#calendar' },
  { label: 'Industries', href: '#industries' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 relative overflow-hidden rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:border-green-300 transition-colors duration-300">
              <Image
                src="/logo.png"
                alt="Springbok Training Academy"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm md:text-base font-bold tracking-wide text-gray-900 leading-tight">
                SPRINGBOK
              </span>
              <span className="text-[10px] md:text-xs text-[#16a34a] tracking-widest uppercase leading-tight font-medium">
                Training Academy
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-[#16a34a] hover:bg-green-50 rounded-lg transition-all duration-200"
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                )}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex text-gray-600 hover:text-[#16a34a] hover:bg-green-50 gap-2"
              asChild
            >
              <a href="tel:+27112345678">
                <Phone className="w-4 h-4" />
                <span className="text-xs">+27 11 234 5678</span>
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex text-gray-600 hover:text-[#16a34a] hover:bg-green-50"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              className="hidden sm:inline-flex bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm px-5 shadow-lg shadow-green-600/20 hover:shadow-green-600/30 transition-all duration-300"
              asChild
            >
              <a href="#contact">Enquire</a>
            </Button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-[#16a34a] hover:bg-green-50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white/98 backdrop-blur-lg border-b border-gray-200"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:text-[#16a34a] hover:bg-green-50 rounded-lg transition-all duration-200"
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown className="w-4 h-4 opacity-60" />
                  )}
                </a>
              ))}
              <div className="pt-3 border-t border-gray-200">
                <a
                  href="tel:+27112345678"
                  className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600"
                >
                  <Phone className="w-4 h-4 text-[#16a34a]" />
                  +27 (0) 11 234 5678
                </a>
                <div className="px-4 pt-2">
                  <Button className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold">
                    Enquire Now
                  </Button>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
