'use client';

import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';

const programmeLinks = [
  { label: 'All Programmes', href: '#programmes' },
  { label: 'Leadership & Management', href: '#programmes' },
  { label: 'Sales & Customer Service', href: '#programmes' },
  { label: 'Operations & Admin', href: '#programmes' },
  { label: 'Compliance & Governance', href: '#programmes' },
  { label: 'AI & Digital Skills', href: '#programmes' },
];

const solutionLinks = [
  { label: 'Corporate Training', href: '#corporate' },
  { label: 'Training Calendar', href: '#calendar' },
  { label: 'Industries', href: '#industries' },
  { label: 'Contact Us', href: '#contact' },
];

const companyLinks = [
  { label: 'About Springbok', href: '#about' },
  { label: 'Our Facilitators', href: '#about' },
  { label: 'Careers', href: '#contact' },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a href="#" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#e8d5a0] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#0d0d0d]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wide text-[#f5f5f5] leading-tight">
                  SPRINGBOK
                </span>
                <span className="text-[10px] text-[#c9a84c] tracking-widest uppercase leading-tight">
                  Training Academy
                </span>
              </div>
            </a>
            <p className="text-sm text-zinc-500 leading-relaxed mb-6 max-w-sm">
              South Africa&apos;s premier corporate training academy. Elevating
              workforces through expert-led, SETA-accredited programmes since 2014.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+27112345678"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-[#c9a84c] transition-colors group"
              >
                <Phone className="w-4 h-4 text-zinc-600 group-hover:text-[#c9a84c] transition-colors" />
                +27 (0) 11 234 5678
              </a>
              <a
                href="mailto:info@springboktraining.co.za"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-[#c9a84c] transition-colors group"
              >
                <Mail className="w-4 h-4 text-zinc-600 group-hover:text-[#c9a84c] transition-colors" />
                info@springboktraining.co.za
              </a>
              <div className="flex items-start gap-3 text-sm text-zinc-400">
                <MapPin className="w-4 h-4 text-zinc-600 mt-0.5 flex-shrink-0" />
                Sandton City Office Park,
                <br />
                Rivonia Road, Sandton,
                <br />
                Johannesburg, 2196
              </div>
            </div>
          </div>

          {/* Programmes Column */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-[#f5f5f5] mb-4 tracking-wide">
              Programmes
            </h4>
            <ul className="space-y-3">
              {programmeLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-[#c9a84c] transition-colors group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-[#f5f5f5] mb-4 tracking-wide">
              Solutions
            </h4>
            <ul className="space-y-3">
              {solutionLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-[#c9a84c] transition-colors group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-[#f5f5f5] mb-4 tracking-wide">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-[#c9a84c] transition-colors group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © 2026 Springbok Training Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
