'use client';

import Link from 'next/link';
import Logo from './shared/Logo';

const LINKS = {
  product: [
    { href: '/collection', label: 'קולקציה' },
    { href: '#how-it-works', label: 'איך זה עובד' },
    { href: '#pricing', label: 'מסלולים' },
  ],
  company: [
    { href: '/about', label: 'אודות' },
    { href: '/blog', label: 'בלוג' },
    { href: '/contact', label: 'צור קשר' },
  ],
  legal: [
    { href: '/privacy', label: 'פרטיות' },
    { href: '/terms', label: 'תנאי שימוש' },
    { href: '/cookies', label: 'עוגיות' },
  ],
};

const linkStyle = {
  fontSize: 12,
  color: 'var(--text-faint)',
  textDecoration: 'none',
  display: 'block',
  padding: '3px 0',
  transition: 'color 0.2s',
} as const;

function ColHeader({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 12, textTransform: 'uppercase' }}>
      {children}
    </p>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-deepest)', borderTop: '1px solid var(--border-subtle)' }}>
      <div
        className="section-inner"
        style={{ padding: '48px 32px 32px' }}
      >
        {/* Top grid: 2fr 1fr 1fr 1fr */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '32px 24px',
          marginBottom: 40,
        }}
          className="footer-grid"
        >
          {/* Col 1: Logo + description */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 12 }}>
              <Logo size="md" />
            </Link>
            <p style={{ fontSize: 12, color: 'var(--text-faint)', lineHeight: 1.6, maxWidth: 240, margin: 0 }}>
              פלטפורמת AI לגילוי בשמים. תשע שאלות. ניתוח מעל 1,000 בשמים. עשר התאמות אישיות.
            </p>
          </div>

          {/* Col 2: מוצר */}
          <div>
            <ColHeader>מוצר</ColHeader>
            {LINKS.product.map(l => (
              <Link
                key={l.href}
                href={l.href}
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Col 3: חברה */}
          <div>
            <ColHeader>חברה</ColHeader>
            {LINKS.company.map(l => (
              <Link
                key={l.href}
                href={l.href}
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Col 4: משפטי */}
          <div>
            <ColHeader>משפטי</ColHeader>
            {LINKS.legal.map(l => (
              <Link
                key={l.href}
                href={l.href}
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 8,
        }}>
          <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>
            &copy; 2026 SCENTORY
          </span>
          <a
            href="mailto:hello@scentory.co.il"
            style={{ fontSize: 11, color: 'var(--text-faint)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}
          >
            hello@scentory.co.il
          </a>
        </div>
      </div>
    </footer>
  );
}
