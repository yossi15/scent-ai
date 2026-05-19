'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';

const NAV_LINKS = [
  { label: 'קולקציה', href: '#collection' },
  { label: 'שאלון',   href: '#quiz' },
  { label: 'מנוי',    href: '#subscription' },
];

const navLink: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '11px',
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: '#1A1A1A',
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn } = useAuth();

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 bg-white"
      style={{ borderBottom: '1px solid #eee' }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between" aria-label="Primary">
        <Link
          href="/"
          aria-label="SCENTORY home"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 500,
            fontSize: '20px',
            letterSpacing: '1.5px',
            color: '#1A1A1A',
          }}
        >
          SCENTORY
        </Link>

        <ul className="hidden md:flex items-center gap-10" role="list">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={navLink}
                className="transition-opacity duration-200 hover:opacity-50"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button style={navLink} className="transition-opacity duration-200 hover:opacity-50">
                  כניסה
                </button>
              </SignInButton>
            ) : (
              <UserButton />
            )}
          </li>
        </ul>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(v => !v)}
          aria-label={mobileOpen ? 'סגור תפריט' : 'פתח תפריט'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" style={{ color: '#1A1A1A' }} /> : <Menu className="w-5 h-5" style={{ color: '#1A1A1A' }} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-white" style={{ borderTop: '1px solid #eee' }}>
          <ul className="px-6 py-4 space-y-4" role="list">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setMobileOpen(false)} style={navLink} className="block py-2">
                  {l.label}
                </a>
              </li>
            ))}
            {!isSignedIn && (
              <li>
                <SignInButton mode="modal">
                  <button style={navLink} className="block py-2 w-full text-right">כניסה</button>
                </SignInButton>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
