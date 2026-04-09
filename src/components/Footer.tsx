'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Send,
} from 'lucide-react';

const programmeLinks = [
  { label: 'Leadership & Management', href: '/programmes' },
  { label: 'Sales & Customer Service', href: '/programmes' },
  { label: 'Personal Development', href: '/programmes' },
  { label: 'Administration & Operations', href: '/programmes' },
  { label: 'Human Resources', href: '/programmes' },
  { label: 'Corporate Solutions', href: '/corporate' },
];

const solutionLinks = [
  { label: 'In-House Training', href: '/corporate' },
  { label: 'Pricing Calculator', href: '/pricing' },
  { label: 'Gallery', href: '/gallery' },
];

const companyLinks = [
  { label: 'About Springbok', href: '/about' },
  { label: 'Our Facilitators', href: '/about' },
  { label: 'Accreditation', href: '/about' },
  { label: 'Mission & Vision', href: '/about' },
];

const departmentEmails = [
  { label: 'General Enquiries', email: 'info@springboktraining.net', icon: Mail },
  { label: 'Programme Registration', email: 'registration@springboktraining.net' },
  { label: 'Newsletter Signup', email: 'subscribe@springboktraining.net' },
  { label: 'Payments & Invoices', email: 'accounts@springboktraining.net' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center mb-6 group">
              <div className="w-16 h-16 relative overflow-hidden rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo-cropped-hd.png"
                  alt="Springbok Training and Business Solutions"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
              Zambia&apos;s premier corporate training academy. Elevating
              workforces through expert-led, accredited programmes since 2014.
              Offices in Lusaka and Copperbelt Province.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+260966135560"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#16a34a] transition-colors group"
              >
                <Phone className="w-4 h-4 text-gray-500 group-hover:text-[#16a34a] transition-colors" />
                +260 966 135 560
              </a>
              <a
                href="tel:+260955135560"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#16a34a] transition-colors group"
              >
                <Phone className="w-4 h-4 text-gray-500 group-hover:text-[#16a34a] transition-colors" />
                +260 955 135 560
              </a>
              <a
                href="mailto:info@springboktraining.net"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#16a34a] transition-colors group"
              >
                <Mail className="w-4 h-4 text-gray-500 group-hover:text-[#16a34a] transition-colors" />
                info@springboktraining.net
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <span>
                  Jezmondine 13th Central Street,
                  <br />
                  Lusaka, Zambia
                </span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-300 mb-3">Subscribe to Our Newsletter</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = (e.target as HTMLFormElement).querySelector('input')?.value || '';
                  if (email) {
                    const subject = encodeURIComponent('Newsletter Subscription');
                    const body = encodeURIComponent(`Please subscribe me to the Springbok Training newsletter.\n\nEmail: ${email}`);
                    window.location.href = `mailto:subscribe@springboktraining.net?subject=${subject}&body=${body}`;
                  }
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  required
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#16a34a]/40 focus:border-[#16a34a] transition-all"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Subscribe</span>
                </button>
              </form>
            </div>
          </div>

          {/* Programmes Column */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">
              Programmes
            </h4>
            <ul className="space-y-3">
              {programmeLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#16a34a] transition-colors group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">
              Solutions
            </h4>
            <ul className="space-y-3">
              {solutionLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#16a34a] transition-colors group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#16a34a] transition-colors group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Department Email Directory */}
        <div className="py-8 border-t border-gray-800">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-4">Reach the Right Department</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="mailto:info@springboktraining.net" className="text-xs text-gray-400 hover:text-[#16a34a] transition-colors">
              <Mail className="w-3 h-3 inline mr-1" />
              info@springboktraining.net
            </a>
            <a href="mailto:registration@springboktraining.net" className="text-xs text-gray-400 hover:text-[#16a34a] transition-colors">
              registration@springboktraining.net
            </a>
            <a href="mailto:subscribe@springboktraining.net" className="text-xs text-gray-400 hover:text-[#16a34a] transition-colors">
              subscribe@springboktraining.net
            </a>
            <a href="mailto:accounts@springboktraining.net" className="text-xs text-gray-400 hover:text-[#16a34a] transition-colors">
              accounts@springboktraining.net
            </a>
          </div>
        </div>

        {/* Powered By Signature */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <span className="text-xs text-gray-600">Powered by:</span>
            <span className="text-sm font-semibold text-gray-400 tracking-wide">Knowledge Camp Corporate Solutions</span>
            <a
              href="mailto:info@knowledgecampglobal.co.za"
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#16a34a] transition-colors"
            >
              <Mail className="w-3 h-3" />
              info@knowledgecampglobal.co.za
            </a>
            <a
              href="tel:+27833910863"
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#16a34a] transition-colors"
            >
              <Phone className="w-3 h-3" />
              +27 833 910 863
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Springbok Training and Business Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:info@springboktraining.net?subject=Privacy Policy Request"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="mailto:info@springboktraining.net?subject=Terms of Service Request"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
