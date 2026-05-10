'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';

const NAV_LINKS = [
  { label: 'הקולקציה',    href: '#collection' },
  { label: 'איך זה עובד', href: '#how-it-works' },
  { label: 'שאלון טעמים', href: '#quiz' },
  { label: 'מנוי',         href: '#subscription' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg-primary/92 backdrop-blur-md border-b border-black/[0.05] shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between" aria-label="ניווט ראשי">
        {/* Logo */}
        <Link href="/" className="font-serif text-xl font-bold text-ink tracking-tight hover:text-gold transition-colors" aria-label="SCENTORY - עמוד הבית">
          SCENTORY
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[13px] font-hebrew text-ink-muted hover:text-gold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Auth + mobile toggle */}
        <div className="flex items-center gap-3">
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <button className="hidden sm:block text-[13px] font-hebrew px-4 py-1.5 rounded-full border border-gold-border text-gold hover:bg-gold-faint transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                כניסה
              </button>
            </SignInButton>
          ) : (
            <UserButton  />
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-ink-muted hover:text-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'סגור תפריט' : 'פתח תפריט'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden bg-bg-primary/96 backdrop-blur-md border-b border-black/[0.05] overflow-hidden"
          >
            <ul className="px-4 py-3 space-y-1" role="list">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm font-hebrew text-ink-muted hover:text-gold hover:bg-gold-faint rounded-lg transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              {!isSignedIn && (
                <li>
                  <SignInButton mode="modal">
                    <button className="w-full text-right px-3 py-2.5 text-sm font-hebrew text-gold hover:bg-gold-faint rounded-lg transition-colors">
                      כניסה / הרשמה
                    </button>
                  </SignInButton>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
