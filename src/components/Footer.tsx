'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';
import Logo from './Logo';

const productLinks = [
  { label: 'קולקציה',       href: '#collection' },
  { label: 'התאמת חתימה',   href: '#match' },
  { label: 'היומן',         href: '#diary' },
  { label: 'מנוי',          href: '#subscribe' },
];

const legalLinks = [
  { label: 'תקנון שימוש',   href: '/terms' },
  { label: 'מדיניות פרטיות', href: '/privacy' },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.04] py-12 px-4 bg-bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand + email */}
          <div>
            <Logo size="sm" />
            <a
              href="mailto:contact@scentory.co.il"
              className="mt-4 inline-flex items-center gap-2 text-ink-muted hover:text-gold text-xs font-sans transition-colors"
              dir="ltr"
            >
              <Mail className="w-3.5 h-3.5" />
              contact@scentory.co.il
            </a>
          </div>

          {/* Product */}
          <div>
            <p className="text-ink-faint text-[11px] font-hebrew uppercase tracking-wider mb-3 font-medium">
              המוצר
            </p>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-ink-muted hover:text-gold text-xs font-hebrew transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-ink-faint text-[11px] font-hebrew uppercase tracking-wider mb-3 font-medium">
              משפטי
            </p>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-ink-muted hover:text-gold text-xs font-hebrew transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider my-6" />

        <div className="flex flex-col gap-2 text-center">
          <p className="text-ink-faint/60 text-[11px] font-hebrew font-light">
            כל הבשמים הם סימנים מסחריים של בעליהם.
          </p>
          <p className="text-ink-faint/60 text-[11px] font-sans font-light" dir="ltr">
            &copy; 2026 SCENTORY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
