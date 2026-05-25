'use client';

import Link from 'next/link';
import Logo from './shared/Logo';

const FOOTER_LINKS = {
  מוצר: [
    { label: 'קולקציה', href: '/collection' },
    { label: 'איך זה עובד', href: '#how-it-works' },
    { label: 'מסלולים', href: '#pricing' },
  ],
  חברה: [
    { label: 'אודות', href: '/about' },
    { label: 'בלוג', href: '/blog' },
    { label: 'צור קשר', href: 'mailto:hello@scentory.co.il' },
  ],
  משפטי: [
    { label: 'פרטיות', href: '/privacy' },
    { label: 'תנאי שימוש', href: '/terms' },
    { label: 'עוגיות', href: '/cookies' },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-deepest)',
        borderTop: '1px solid var(--border-subtle)',
        padding: 'clamp(28px, 4vw, 36px) clamp(20px, 4vw, 32px) 16px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Main grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 'clamp(24px, 4vw, 48px)',
            marginBottom: 32,
          }}
          className="max-sm:grid-cols-2 max-sm:gap-y-8"
        >
          {/* Brand col */}
          <div>
            <Logo size="sm" />
            <p
              style={{
                fontSize: 11,
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                marginTop: 14,
                maxWidth: 200,
              }}
            >
              פלטפורמת AI לגילוי בשמים.
              <br />
              עברית. מאז 2026.
            </p>
          </div>

          {/* Link cols */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: 14,
                }}
              >
                {section}
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: 12,
                        color: 'var(--text-tertiary)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = 'var(--text-secondary)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = 'var(--text-tertiary)')
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>
            &copy; 2026 SCENTORY
          </span>
          <a
            href="mailto:hello@scentory.co.il"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontStyle: 'italic',
              fontSize: 11,
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = 'var(--gold)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = 'var(--text-muted)')
            }
          >
            hello@scentory.co.il
          </a>
        </div>
      </div>
    </footer>
  );
}
