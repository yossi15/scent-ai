'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { label: 'שאלון טעמים', href: '#quiz' },
  { label: 'קולקציה', href: '#collection' },
  { label: 'התאמת חתימה', href: '#match' },
  { label: 'רדאר ריחות', href: '#radar' },
  { label: 'היומן', href: '#diary' },
  { label: 'מנוי', href: '#subscribe' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className={`transition-all duration-500 ${
        scrolled
          ? 'bg-bg-primary/90 backdrop-blur-xl shadow-sm border-b border-black/[0.04]'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#">
              <Logo size="sm" />
            </a>

            <div className="hidden md:flex items-center gap-10">
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
              <a href="#match" className="btn-gold px-5 py-2 text-xs font-hebrew rounded-lg tracking-wide inline-block">
                התחל עכשיו
              </a>
            </div>

            <button
              className="md:hidden text-ink-muted p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

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
              <a href="#match" onClick={() => setMobileOpen(false)} className="btn-gold w-full py-3 text-sm font-hebrew rounded-lg tracking-wide mt-3 block text-center">
                התחל עכשיו
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
