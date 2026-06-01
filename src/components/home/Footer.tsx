'use client';

import Link from 'next/link';
import Logo from './shared/Logo';

const LINKS = {
  product: [
    { href: '#how-it-works', label: 'איך זה עובד' },
    { href: '/collection',    label: 'קטלוג' },
    { href: '#pricing',       label: 'מסלולים' },
    { href: '/collection',    label: 'השוואת מחירים' },
  ],
  company: [
    { href: '/about',   label: 'אודות' },
    { href: '/blog',    label: 'בלוג' },
    { href: '/careers', label: 'קריירה' },
    { href: '/contact', label: 'צור קשר' },
  ],
  legal: [
    { href: '/terms',        label: 'תנאי שימוש' },
    { href: '/privacy',      label: 'פרטיות' },
    { href: '/cookies',      label: 'Cookies' },
    { href: '/accessibility',label: 'נגישות' },
  ],
};

const linkStyle: React.CSSProperties = {
  fontSize: 13,
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  display: 'block',
  padding: '3px 0',
  transition: 'color 160ms',
};

function ColHeader({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 12, fontWeight: 600, letterSpacing: '0.22em',
      textTransform: 'uppercase', color: 'var(--text-muted)',
      margin: '0 0 16px',
    }}>
      {children}
    </p>
  );
}

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-elev, var(--bg-secondary))',
      borderTop: '1px solid var(--border-subtle)',
      padding: 'var(--s7) var(--s3) var(--s4)',
    }}>
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>

        {/* Top grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
            gap: 'var(--s5)',
            paddingBottom: 'var(--s4)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
          className="footer-grid"
        >
          {/* Col 1: Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <Logo size="md" />
            </Link>
            <p style={{
              fontSize: 12.5, color: 'var(--text-muted)',
              lineHeight: 1.65, maxWidth: 320, margin: '8px 0 0',
            }}>
              פלטפורמת גילוי הניחוחות הראשונה בישראל המשלבת ניתוח <bdi>AI</bdi>
              עם קטלוג של מעל 1,000 בשמים מכל העולם.
            </p>
          </div>

          {/* Col 2: מוצר */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ColHeader>מוצר</ColHeader>
            {LINKS.product.map(l => (
              <Link
                key={l.label}
                href={l.href}
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Col 3: חברה */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ColHeader>חברה</ColHeader>
            {LINKS.company.map(l => (
              <Link
                key={l.label}
                href={l.href}
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Col 4: משפטי */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ColHeader>משפטי</ColHeader>
            {LINKS.legal.map(l => (
              <Link
                key={l.label}
                href={l.href}
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 'var(--s3)', flexWrap: 'wrap', gap: 12,
          fontSize: 12, color: 'var(--text-muted)',
        }}>
          <span>&copy; 2026 SCENTORY · כל הזכויות שמורות</span>
          <a
            href="mailto:hello@scentory.co.il"
            style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 160ms' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            hello@scentory.co.il
          </a>
        </div>
      </div>
    </footer>
  );
}
