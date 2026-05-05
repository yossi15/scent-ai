'use client';

import Link from 'next/link';
import Logo from './Logo';

const links = [
  { label: 'קולקציה',         href: '#collection' },
  { label: 'שאלון טעמים',     href: '#quiz' },
  { label: 'מנוי',            href: '#subscribe' },
  { label: 'תקנון שימוש',     href: '/terms' },
  { label: 'מדיניות פרטיות',  href: '/privacy' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#F2F0EC' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-12">

          {/* Brand */}
          <div>
            <Logo size="sm" />
            <p className="mt-4 text-[11px] font-sans text-[#999] max-w-xs leading-relaxed">
              פלטפורמת גילוי בשמים חכמה.
              מצא את הבושם שמדבר אליך.
            </p>
            <a
              href="mailto:contact@scentory.co.il"
              className="mt-3 inline-block text-[11px] font-sans text-[#999] hover:text-[#1a1a1a] transition-colors"
              dir="ltr"
            >
              contact@scentory.co.il
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {links.map(l => (
              l.href.startsWith('/') ? (
                <Link key={l.label} href={l.href}
                  className="text-[11px] tracking-[0.12em] uppercase font-sans text-[#999] hover:text-[#1a1a1a] transition-colors">
                  {l.label}
                </Link>
              ) : (
                <a key={l.label} href={l.href}
                  className="text-[11px] tracking-[0.12em] uppercase font-sans text-[#999] hover:text-[#1a1a1a] transition-colors">
                  {l.label}
                </a>
              )
            ))}
          </div>
        </div>

        {/* Trust strip */}
        <div className="border-t border-[#E0DDD8] pt-8 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Trust badges */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#999]" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="text-[10px] tracking-[0.15em] uppercase font-sans text-[#999]">SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#999]" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="text-[10px] tracking-[0.15em] uppercase font-sans text-[#999]">Stripe Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#999]" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-[10px] tracking-[0.15em] uppercase font-sans text-[#999]">ביטול בכל עת</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-[10px] font-sans text-[#bbb]" dir="ltr">
              © 2026 SCENTORY. All rights reserved.
            </p>
            <p className="text-[10px] font-hebrew text-[#bbb]">
              כל הבשמים הם סימנים מסחריים של בעליהם.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
