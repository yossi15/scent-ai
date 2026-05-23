'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { UserButton, useAuth } from '@clerk/nextjs';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { label: 'איך זה עובד', href: '#how-it-works' },
  { label: 'קולקציה',    href: '#collection' },
  { label: 'מסלולים',    href: '#subscription' },
  { label: 'קהילה',      href: '#testimonials' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn } = useAuth();

  const linkStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '11px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: 'var(--ink)',
    transition: 'opacity 0.2s',
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <nav
        className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between"
        aria-label="Primary"
      >
        {/* ── Logo (RTL: appears on right) ─────────────── */}
        <Link href="/" aria-label="SCENTORY home">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px' }}>
            <span
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 400,
                fontSize: '18px',
                letterSpacing: '6px',
                color: 'var(--accent-gold)',
                lineHeight: 1,
              }}
            >
              SCENTORY
            </span>
            <span
              style={{
                display: 'block',
                height: '1.5px',
                width: '70%',
                background: 'var(--accent-gold)',
                alignSelf: 'flex-end',
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                fontSize: '8px',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
                opacity: 0.7,
                lineHeight: 1,
              }}
            >
              KNOW YOUR SCENT.
            </span>
          </div>
        </Link>

        {/* ── Desktop nav links (center) ────────────────── */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={linkStyle}
                className="hover:opacity-50 transition-opacity"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Desktop right actions ─────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle variant="icon" />

          {!isSignedIn ? (
            <Link
              href="/sign-in"
              style={{
                ...linkStyle,
                fontSize: '10px',
                letterSpacing: '1.5px',
              }}
              className="hover:opacity-50 transition-opacity"
            >
              כניסה
            </Link>
          ) : (
            <UserButton />
          )}

          <Link
            href="/quiz"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '10px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              padding: '9px 18px',
              background: 'var(--accent-gold)',
              color: '#0a0a0a',
              whiteSpace: 'nowrap',
            }}
            className="transition-opacity hover:opacity-85 active:scale-[0.97]"
          >
            התחל שאלון
          </Link>
        </div>

        {/* ── Mobile: Theme + hamburger ─────────────────── */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle variant="icon" />
          {isSignedIn && <UserButton />}
          <button
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'סגור תפריט' : 'פתח תפריט'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            style={{ color: 'var(--ink)', padding: '6px' }}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ───────────────────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}
        >
          <ul className="px-6 py-4 space-y-1" role="list">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    ...linkStyle,
                    display: 'block',
                    padding: '10px 0',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
            {!isSignedIn && (
              <li>
                <Link
                  href="/sign-in"
                  style={{ ...linkStyle, display: 'block', padding: '10px 0' }}
                >
                  כניסה
                </Link>
              </li>
            )}
            <li style={{ paddingTop: '12px' }}>
              <Link
                href="/quiz"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '12px',
                  background: 'var(--accent-gold)',
                  color: '#0a0a0a',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '11px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
                onClick={() => setMobileOpen(false)}
              >
                התחל שאלון
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
