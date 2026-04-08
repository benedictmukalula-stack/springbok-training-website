'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
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
  { label: 'Contact Us', href: '/contact' },
];

const companyLinks = [
  { label: 'About Springbok', href: '/about' },
  { label: 'Our Facilitators', href: '/about' },
  { label: 'Accreditation', href: '/about' },
  { label: 'Mission & Vision', href: '/about' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 relative overflow-hidden rounded-lg bg-white flex items-center justify-center group-hover:border-green-300 transition-colors duration-300">
                <Image
                  src="/logo.png"
                  alt="Springbok Training and Business Solutions"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-wide text-white leading-tight">
                  SPRINGBOK
                </span>
                <span className="text-xs text-[#16a34a] tracking-widest uppercase leading-tight">
                  Training &amp; Business Solutions
                </span>
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
                href="mailto:admin@springboktraining.net"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#16a34a] transition-colors group"
              >
                <Mail className="w-4 h-4 text-gray-500 group-hover:text-[#16a34a] transition-colors" />
                admin@springboktraining.net
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

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Springbok Training and Business Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:admin@springboktraining.net?subject=Privacy Policy Request"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="mailto:admin@springboktraining.net?subject=Terms of Service Request"
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
