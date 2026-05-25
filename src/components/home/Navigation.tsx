'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Logo from './shared/Logo';

const NAV_LINKS = [
  { href: '/collection', label: 'קולקציה' },
  { href: '#how-it-works', label: 'איך זה עובד' },
  { href: '#pricing', label: 'מסלולים' },
  { href: '/blog', label: 'בלוג' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('dark');
      localStorage.setItem('scent-ai-theme', 'light');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('scent-ai-theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50"
        style={{
          background: scrolled
            ? 'rgba(5,5,5,0.97)'
            : 'rgba(5,5,5,0.88)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '14px 24px',
          transition: 'background 0.3s ease',
        }}
      >
        <div
          className="mx-auto grid items-center"
          style={{
            maxWidth: 1100,
            gridTemplateColumns: '1fr auto 1fr',
            gap: 16,
          }}
        >
          {/* Col 1 - Right in RTL: Nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 13,
                  color: 'var(--text-tertiary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--text-primary)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'var(--text-tertiary)')
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Col 2 - Center: Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Logo size="md" />
          </Link>

          {/* Col 3 - Left in RTL: Auth + CTA */}
          <div className="hidden md:flex items-center gap-3 justify-end">
            <button
              onClick={toggleTheme}
              aria-label="החלף ערכת נושא"
              className="rounded-full flex items-center justify-center"
              style={{
                width: 32,
                height: 32,
                color: 'var(--text-muted)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button
                  style={{
                    fontSize: 12,
                    color: 'var(--text-tertiary)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '6px 12px',
                    transition: 'color 0.2s',
                  }}
                >
                  כניסה
                </button>
              </SignInButton>
            )}

            <Link
              href="/quiz"
              style={{
                fontSize: 12,
                fontWeight: 500,
                padding: '8px 16px',
                borderRadius: 6,
                background: 'var(--gold)',
                color: '#050505',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              התחל חינם
            </Link>
          </div>

          {/* Mobile right side */}
          <div className="md:hidden flex items-center justify-end gap-2">
            <button
              onClick={toggleTheme}
              style={{
                width: 32,
                height: 32,
                color: 'var(--text-muted)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            {isSignedIn && <UserButton />}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: 32,
                height: 32,
                color: 'var(--text-primary)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-x-0 z-40"
          style={{
            top: 57,
            background: 'rgba(3,3,3,0.98)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <nav className="flex flex-col p-6 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  textDecoration: 'none',
                  display: 'block',
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/quiz"
              style={{
                fontSize: 13,
                fontWeight: 500,
                padding: '10px 0',
                textAlign: 'center',
                marginTop: 12,
                borderRadius: 6,
                background: 'var(--gold)',
                color: '#050505',
                textDecoration: 'none',
                display: 'block',
              }}
              onClick={() => setMobileOpen(false)}
            >
              התחל חינם
            </Link>

            {!isSignedIn && (
              <SignInButton mode="modal">
                <button
                  style={{
                    fontSize: 13,
                    color: 'var(--text-tertiary)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '10px 0',
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  כניסה
                </button>
              </SignInButton>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
