'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { Menu, X, Moon, Sun } from 'lucide-react';
import Logo from './shared/Logo';

const NAV_LINKS = [
  { href: '/collection', label: 'קולקציה' },
  { href: '#how-it-works', label: 'איך זה עובד' },
  { href: '#pricing', label: 'מסלולים' },
  { href: '/blog', label: 'בלוג' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const saved = localStorage.getItem('scent-ai-theme') || 'dark';
    const dark = saved !== 'light';
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);

    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('scent-ai-theme', newDark ? 'dark' : 'light');
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 nav-header${scrolled ? ' nav-scrolled' : ''}`}
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          height: 57,
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          transition: 'background 0.3s ease',
        }}
      >
        {/* Desktop: 3-col grid — RTL: col1=visual-right, col2=center, col3=visual-left */}
        <div
          className="hidden md:grid w-full mx-auto items-center"
          style={{ maxWidth: 1100, gridTemplateColumns: 'auto 1fr auto', gap: 16 }}
        >
          {/* Col 1 → visual RIGHT in RTL: Moon + Auth + CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'עבור למצב בהיר' : 'עבור למצב כהה'}
              style={{
                width: 28, height: 28, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: 'none',
                cursor: 'pointer', color: 'var(--text-muted)',
                borderRadius: 6, transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {isDark ? <Moon size={14} /> : <Sun size={14} />}
            </button>

            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button
                  style={{
                    fontSize: 11, color: 'var(--text-tertiary)',
                    background: 'transparent', border: 'none',
                    cursor: 'pointer', padding: '4px 8px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
                >
                  כניסה
                </button>
              </SignInButton>
            )}

            <Link
              href="/quiz"
              style={{
                fontSize: 11, fontWeight: 500,
                padding: '7px 14px', borderRadius: 5,
                background: 'var(--gold)', color: '#000',
                textDecoration: 'none', whiteSpace: 'nowrap',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              התחל חינם
            </Link>
          </div>

          {/* Col 2 → CENTER: Nav links */}
          <nav className="flex items-center justify-center gap-6">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 11, color: 'var(--text-tertiary)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Col 3 → visual LEFT in RTL: Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Logo size="md" />
          </Link>
        </div>

        {/* Mobile: logo right (RTL start), hamburger left (RTL end) */}
        <div
          className="md:hidden w-full mx-auto flex items-center justify-between"
          style={{ maxWidth: 1100 }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Logo size="md" />
          </Link>
          <div className="flex items-center gap-2">
            {isSignedIn && <UserButton />}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: 32, height: 32, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-primary)', background: 'transparent',
                border: 'none', cursor: 'pointer',
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-x-0 z-40 nav-mobile-dropdown"
          style={{
            top: 57,
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <nav className="flex flex-col p-6 gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 14, color: 'var(--text-secondary)',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  textDecoration: 'none', display: 'block',
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/quiz"
              style={{
                fontSize: 13, fontWeight: 500,
                padding: '10px 0', textAlign: 'center', marginTop: 12,
                borderRadius: 6, background: 'var(--gold)', color: '#050505',
                textDecoration: 'none', display: 'block',
              }}
              onClick={() => setMobileOpen(false)}
            >
              התחל חינם
            </Link>

            {!isSignedIn && (
              <SignInButton mode="modal">
                <button
                  style={{
                    fontSize: 13, color: 'var(--text-tertiary)',
                    background: 'transparent', border: 'none',
                    cursor: 'pointer', padding: '10px 0',
                    textAlign: 'center', width: '100%',
                  }}
                >
                  כניסה
                </button>
              </SignInButton>
            )}

            <button
              onClick={() => { toggleTheme(); setMobileOpen(false); }}
              style={{
                fontSize: 13, color: 'var(--text-tertiary)',
                background: 'transparent', border: 'none',
                cursor: 'pointer', padding: '10px 0',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              {isDark ? <Moon size={14} /> : <Sun size={14} />}
              {isDark ? 'מצב בהיר' : 'מצב כהה'}
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
