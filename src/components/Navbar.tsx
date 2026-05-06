'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'קולקציה',     href: '#collection' },
  { label: 'שאלון',       href: '#quiz' },
  { label: 'מנוי',        href: '#subscribe' },
  { label: 'הסיפור שלנו', href: '/about' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoaded, isSignedIn } = useUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#EBEBEB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14 md:h-16">

          {/* Logo */}
          <a href="#" aria-label="SCENTORY">
            <Logo size="sm" />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[11px] tracking-[0.15em] uppercase font-sans text-[#666] hover:text-[#1a1a1a] transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[11px] tracking-[0.15em] uppercase font-sans text-[#666] hover:text-[#1a1a1a] transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* Auth — desktop */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {!isLoaded ? (
              <div className="w-16 h-6 bg-[#f0eeea] animate-pulse" />
            ) : isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-[11px] tracking-[0.15em] uppercase font-sans px-4 py-2 bg-[#1a1a1a] text-white hover:opacity-75 transition-opacity"
                >
                  Dashboard
                </Link>
                <UserButton
                  appearance={{ elements: { avatarBox: 'w-7 h-7' } }}
                />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="text-[11px] tracking-[0.15em] uppercase font-sans text-[#666] hover:text-[#1a1a1a] transition-colors">
                    כניסה
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="text-[11px] tracking-[0.15em] uppercase font-sans px-5 py-2 bg-[#1a1a1a] text-white hover:opacity-75 transition-opacity">
                    הרשמה
                  </button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[#666]"
              aria-label={mobileOpen ? 'סגור תפריט' : 'פתח תפריט'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-[#EBEBEB]"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map(link =>
                link.href.startsWith('/') ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-[11px] tracking-[0.15em] uppercase font-sans text-[#666] py-3 border-b border-[#F5F5F5] last:border-0"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-[11px] tracking-[0.15em] uppercase font-sans text-[#666] py-3 border-b border-[#F5F5F5] last:border-0"
                  >
                    {link.label}
                  </a>
                )
              )}
              <div className="pt-3 flex flex-col gap-2">
                {isSignedIn ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="block text-center py-3 bg-[#1a1a1a] text-white text-[11px] tracking-[0.15em] uppercase font-sans"
                    >
                      Dashboard
                    </Link>
                    <div className="flex items-center gap-2 py-2">
                      <UserButton />
                      <span className="text-xs font-hebrew text-[#999]">הגדרות</span>
                    </div>
                  </>
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <button
                        onClick={() => setMobileOpen(false)}
                        className="w-full py-3 border border-[#1a1a1a] text-[11px] tracking-[0.15em] uppercase font-sans text-[#1a1a1a]"
                      >
                        כניסה
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button
                        onClick={() => setMobileOpen(false)}
                        className="w-full py-3 bg-[#1a1a1a] text-white text-[11px] tracking-[0.15em] uppercase font-sans"
                      >
                        הרשמה
                      </button>
                    </SignUpButton>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
