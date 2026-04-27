'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, LayoutDashboard, User } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'שאלון טעמים',   href: '#quiz' },
  { label: 'קולקציה',       href: '#collection' },
  { label: 'התאמת חתימה',   href: '#match' },
  { label: 'רדאר ריחות',    href: '#radar' },
  { label: 'היומן',         href: '#diary' },
  { label: 'מנוי',          href: '#subscribe' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const { isLoaded, isSignedIn }    = useUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className={`transition-all duration-500 ${
        scrolled
          ? 'bg-bg-primary/95 backdrop-blur-xl shadow-sm border-b border-border'
          : 'bg-bg-primary/70 backdrop-blur-md border-b border-border'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <a href="#" aria-label="SCENTORY — דף הבית">
              <Logo size="sm" />
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-ink-muted hover:text-gold text-[13px] font-hebrew font-light transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 right-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Auth area — desktop */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              {!isLoaded ? (
                <div className="w-20 h-8 bg-gold-faint rounded-lg animate-pulse" />
              ) : isSignedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-1.5 text-ink-muted hover:text-gold text-[13px] font-hebrew font-light transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    הדשבורד שלי
                  </Link>
                  <Link
                    href="/account"
                    className="flex items-center gap-1.5 text-ink-muted hover:text-gold text-[13px] font-hebrew font-light transition-colors"
                  >
                    <User className="w-3.5 h-3.5" />
                    החשבון שלי
                  </Link>
                  <UserButton
                    appearance={{ elements: { avatarBox: 'w-9 h-9 ring-2 ring-gold-border' } }}
                                      />
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className="flex items-center gap-1.5 text-ink-muted hover:text-gold text-[13px] font-hebrew font-light transition-colors">
                      <LogIn className="w-3.5 h-3.5" />
                      כניסה
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="btn-gold px-5 py-2 text-xs font-hebrew rounded-lg tracking-wide">
                      הרשמה חינם
                    </button>
                  </SignUpButton>
                </>
              )}
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="md:hidden flex items-center gap-1">
              <ThemeToggle />
              <button
                className="text-ink-muted p-3 -m-1"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'סגור תפריט' : 'פתח תפריט'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
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
            transition={{ duration: 0.3 }}
            className="md:hidden bg-bg-primary/98 backdrop-blur-xl border-b border-black/[0.04]"
          >
            <div className="px-6 py-5 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-ink-secondary hover:text-gold text-base font-hebrew py-2.5 transition-colors border-b border-black/[0.03] last:border-0"
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile auth */}
              <div className="pt-3 flex flex-col gap-2">
                {isSignedIn ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 py-2.5 text-base font-hebrew text-ink-secondary hover:text-gold transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      הדשבורד שלי
                    </Link>
                    <Link
                      href="/account"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 py-2.5 text-base font-hebrew text-ink-secondary hover:text-gold transition-colors"
                    >
                      <User className="w-4 h-4" />
                      החשבון שלי
                    </Link>
                    <div className="flex items-center gap-3 py-1">
                      <UserButton />
                      <span className="text-sm font-hebrew text-ink-muted">הגדרות חשבון</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <button className="w-full py-3 text-sm font-hebrew border border-gold-border text-gold rounded-lg">
                        כניסה לחשבון
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="btn-gold w-full py-3 text-sm font-hebrew rounded-lg tracking-wide">
                        הרשמה חינם
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
