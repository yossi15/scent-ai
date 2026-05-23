'use client';

import Link from 'next/link';

const NAV_LINKS = [
  { label: 'איך זה עובד', href: '#how-it-works' },
  { label: 'קולקציה',    href: '/collection' },
  { label: 'מסלולים',    href: '#subscription' },
  { label: 'שאלון',      href: '/quiz' },
];

const LEGAL_LINKS = [
  { label: 'תנאי שימוש',    href: '/terms' },
  { label: 'פרטיות',        href: '/privacy' },
  { label: 'שאלות נפוצות',  href: '/faq' },
  { label: 'הצהרת נגישות', href: '/accessibility' },
];

const linkStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '11px',
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: 'var(--ink-muted)',
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="px-6 py-16"
      style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top row: logo + nav + legal + email */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Logo */}
          <div>
            <Link href="/" aria-label="SCENTORY home">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    letterSpacing: '5px',
                    color: 'var(--accent-gold)',
                  }}
                >
                  SCENTORY
                </span>
                <span
                  style={{
                    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                    fontSize: '7px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)',
                    opacity: 0.7,
                  }}
                >
                  KNOW YOUR SCENT.
                </span>
              </div>
            </Link>
          </div>

          {/* Nav */}
          <div>
            <p
              style={{
                ...linkStyle,
                fontSize: '9px',
                letterSpacing: '3px',
                color: 'var(--ink-faint)',
                marginBottom: '16px',
              }}
            >
              ניווט
            </p>
            <ul className="space-y-3" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  {href.startsWith('#') ? (
                    <a href={href} style={linkStyle} className="hover:opacity-60 transition-opacity">{label}</a>
                  ) : (
                    <Link href={href} style={linkStyle} className="hover:opacity-60 transition-opacity">{label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p
              style={{
                ...linkStyle,
                fontSize: '9px',
                letterSpacing: '3px',
                color: 'var(--ink-faint)',
                marginBottom: '16px',
              }}
            >
              משפטי
            </p>
            <ul className="space-y-3" role="list">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} style={linkStyle} className="hover:opacity-60 transition-opacity">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                ...linkStyle,
                fontSize: '9px',
                letterSpacing: '3px',
                color: 'var(--ink-faint)',
                marginBottom: '16px',
              }}
            >
              צור קשר
            </p>
            <a
              href="mailto:hello@scentory.co.il"
              style={{ ...linkStyle, textTransform: 'none' }}
              className="hover:opacity-60 transition-opacity"
            >
              hello@scentory.co.il
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              color: 'var(--ink-faint)',
              letterSpacing: '1px',
            }}
            dir="ltr"
          >
            &copy; {year} SCENTORY
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              color: 'var(--ink-faint)',
              letterSpacing: '1px',
            }}
          >
            עשוי בישראל
          </p>
        </div>
      </div>
    </footer>
  );
}
