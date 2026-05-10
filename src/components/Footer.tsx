'use client';

import Link from 'next/link';
import { fragrances } from '@/data/fragrances';

const TOTAL = fragrances.length;

const eyebrow: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '10px',
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: '#999',
};

const linkStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '12px',
  color: '#000',
  letterSpacing: '0.3px',
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="px-6 pt-24 pb-12"
      style={{ background: '#FAF8F4', borderTop: '1px solid #eee' }}
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
                color: '#000',
                marginBottom: '12px',
              }}
            >
              SCENTORY
            </p>
            <p style={{ ...linkStyle, color: '#666', fontWeight: 300, lineHeight: 1.7 }}>
              {TOTAL} Niche Fragrances · 46 Houses
            </p>
          </div>

          <div>
            <p style={eyebrow} className="mb-5">Navigate</p>
            <ul className="space-y-3" role="list">
              {[
                { label: 'Collection',  href: '#collection' },
                { label: 'Process',     href: '#how-it-works' },
                { label: 'Quiz',        href: '#quiz' },
                { label: 'Membership',  href: '#subscription' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a href={href} style={linkStyle} className="hover:opacity-60 transition-opacity">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p style={eyebrow} className="mb-5">Legal</p>
            <ul className="space-y-3" role="list">
              {[
                { label: 'Terms',   href: '/terms' },
                { label: 'Privacy', href: '/privacy' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} style={linkStyle} className="hover:opacity-60 transition-opacity">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p style={eyebrow} className="mb-5">Contact</p>
            <a href="mailto:hello@scentory.co.il" style={linkStyle} className="hover:opacity-60 transition-opacity">
              hello@scentory.co.il
            </a>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid #eee' }}
        >
          <p style={{ ...linkStyle, fontSize: '11px', color: '#999', letterSpacing: '1px' }} dir="ltr">
            © {year} SCENTORY
          </p>
          <p style={{ ...linkStyle, fontSize: '11px', color: '#999', letterSpacing: '1px' }} dir="ltr">
            Made in Israel
          </p>
        </div>
      </div>
    </footer>
  );
}
