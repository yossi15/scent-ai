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

const linkStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '12px',
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: '#000',
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn } = useAuth();

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{ background: '#fff', borderBottom: '1px solid #eee' }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between" aria-label="Primary">
        {/* Logo on left */}
        <Link
          href="/"
          aria-label="SCENTORY home"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 600,
            fontSize: '22px',
            letterSpacing: '0.5px',
            color: '#000',
          }}
        >
          SCENTORY
        </Link>

        {/* Links on right (rendered after logo in DOM) */}
        <ul className="hidden md:flex items-center gap-10" role="list">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} style={linkStyle} className="hover:opacity-60 transition-opacity duration-200">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button style={linkStyle} className="hover:opacity-60 transition-opacity duration-200">
                  כניסה
                </button>
              </SignInButton>
            ) : (
              <UserButton />
            )}
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(v => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#eee] bg-white">
          <ul className="px-6 py-4 space-y-3" role="list">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  style={linkStyle}
                  className="block py-2"
                >
                  {l.label}
                </a>
              </li>
            ))}
            {!isSignedIn && (
              <li>
                <SignInButton mode="modal">
                  <button style={linkStyle} className="block py-2 w-full text-right">כניסה</button>
                </SignInButton>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
