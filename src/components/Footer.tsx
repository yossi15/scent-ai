'use client';

import Link from 'next/link';
import { fragrances } from '@/data/fragrances';

const TOTAL = fragrances.length;
const HOUSES = new Set(fragrances.map(f => f.house)).size;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-black/[0.05] pt-14 pb-8 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-2xl font-bold text-ink mb-2">SCENTORY</p>
            <p className="text-ink-faint text-xs font-hebrew leading-relaxed">
              פלטפורמת AI לגילוי בשמים נישתיים. {TOTAL} בשמים מ-{HOUSES}+ בתי בושם.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] font-sans text-ink-faint uppercase tracking-wider mb-3">ניווט</p>
            <ul className="space-y-2" role="list">
              {[
                { label: 'הקולקציה',    href: '#collection' },
                { label: 'איך זה עובד', href: '#how-it-works' },
                { label: 'שאלון טעמים', href: '#quiz' },
                { label: 'מנוי',         href: '#subscription' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="text-ink-muted text-xs font-hebrew hover:text-gold transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[10px] font-sans text-ink-faint uppercase tracking-wider mb-3">משפטי</p>
            <ul className="space-y-2" role="list">
              {[
                { label: 'תנאי שימוש',  href: '/terms' },
                { label: 'מדיניות פרטיות', href: '/privacy' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-ink-muted text-xs font-hebrew hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-sans text-ink-faint uppercase tracking-wider mb-3">יצירת קשר</p>
            <a
              href="mailto:hello@scentory.co.il"
              className="text-ink-muted text-xs font-hebrew hover:text-gold transition-colors"
            >
              hello@scentory.co.il
            </a>
          </div>
        </div>

        <div className="border-t border-black/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ink-faint text-[11px] font-sans" dir="ltr">
            © {year} SCENTORY. All rights reserved.
          </p>
          <p className="text-ink-faint text-[10px] font-hebrew">
            בנוי עם AI · עיצוב ופיתוח בישראל
          </p>
        </div>
      </div>
    </footer>
  );
}
