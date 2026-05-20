'use client';

import Link from 'next/link';
import { fragrances } from '@/data/fragrances';

const TOTAL = fragrances.length;
const HOUSES = new Set(fragrances.map(f => f.house)).size;

const eyebrow: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '10px',
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: 'var(--ink-faint)',
};

const linkStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '12px',
  color: 'var(--ink-secondary)',
  letterSpacing: '0.3px',
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="px-6 pt-24 pb-12"
      style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1">
            <p
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontWeight: 600,
                fontSize: '24px',
                letterSpacing: '0.5px',
                color: 'var(--ink)',
                marginBottom: '12px',
              }}
            >
              SCENTORY
            </p>
            <p style={{ ...linkStyle, color: 'var(--ink-muted)', fontWeight: 300, lineHeight: 1.7 }}>
              {TOTAL} בשמים · {HOUSES} בתי בושם
            </p>
          </div>

          <div>
            <p style={eyebrow} className="mb-5">ניווט</p>
            <ul className="space-y-3" role="list">
              {[
                { label: 'קולקציה',     href: '#collection' },
                { label: 'איך זה עובד', href: '#how-it-works' },
                { label: 'שאלון טעמים', href: '#quiz' },
                { label: 'מנוי',        href: '#subscription' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a href={href} style={linkStyle} className="hover:opacity-60 transition-opacity">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p style={eyebrow} className="mb-5">משפטי</p>
            <ul className="space-y-3" role="list">
              {[
                { label: 'תנאי שימוש', href: '/terms' },
                { label: 'פרטיות',     href: '/privacy' },
                { label: 'שאלות נפוצות', href: '/faq' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} style={linkStyle} className="hover:opacity-60 transition-opacity">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p style={eyebrow} className="mb-5">צור קשר</p>
            <a href="mailto:hello@scentory.co.il" style={linkStyle} className="hover:opacity-60 transition-opacity">
              hello@scentory.co.il
            </a>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p style={{ ...linkStyle, fontSize: '11px', color: 'var(--ink-faint)', letterSpacing: '1px' }} dir="ltr">
            © {year} SCENTORY
          </p>
          <p style={{ ...linkStyle, fontSize: '11px', color: 'var(--ink-faint)', letterSpacing: '1px' }}>
            עשוי בישראל
          </p>
        </div>
      </div>
    </footer>
  );
}
