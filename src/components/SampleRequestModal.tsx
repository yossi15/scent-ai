'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Check, Loader2, Droplets } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  fragranceName: string;
  brand: string;
}

export default function SampleRequestModal({ open, onClose, fragranceName, brand }: Props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;

    // Remember the element that opened the modal so we can restore focus on close
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    // Auto-focus first input
    setTimeout(() => firstFieldRef.current?.focus(), 50);

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Focus trap on Tab
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
      // Restore focus to the element that opened the modal
      previouslyFocusedRef.current?.focus?.();
    };
  }, [open, onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/sample-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, fragrance_name: fragranceName, brand }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Request failed');
      }
      setStatus('success');
      setTimeout(() => {
        onClose();
        setTimeout(() => { setStatus('idle'); setEmail(''); setName(''); }, 300);
      }, 1600);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'שגיאה');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            ref={dialogRef}
            className="relative w-full sm:max-w-md bg-[#FAF8F4] dark:bg-bg-card sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sample-request-title"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-gold" />
                <span id="sample-request-title" className="font-serif text-sm text-ink font-semibold">בקשת דגימה</span>
              </div>
              <button
                onClick={onClose}
                aria-label="סגור"
                className="w-7 h-7 flex items-center justify-center rounded-full text-ink-muted hover:text-ink hover:bg-black/[0.06] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              {status === 'success' ? (
                <div className="flex flex-col items-center text-center py-6 gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="font-serif text-lg text-ink font-semibold">הבקשה התקבלה!</p>
                  <p className="text-xs text-ink-muted font-hebrew">נחזור אליך כשהדגימה תהיה זמינה</p>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-4">
                  <div className="bg-gold-faint/40 rounded-xl p-3 border border-gold/20">
                    <p className="text-[11px] text-ink-muted font-hebrew mb-0.5">בושם מבוקש:</p>
                    <p className="font-serif text-sm text-ink font-semibold" dir="ltr">{fragranceName}</p>
                    <p className="text-xs text-ink-muted font-sans" dir="ltr">{brand}</p>
                  </div>

                  <div>
                    <label htmlFor="sample-name" className="block text-xs font-hebrew text-ink-muted mb-1.5">שם מלא</label>
                    <input
                      id="sample-name"
                      ref={firstFieldRef}
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      autoComplete="name"
                      className="w-full px-3 py-2.5 rounded-lg border border-black/[0.1] bg-white/80 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="sample-email" className="block text-xs font-hebrew text-ink-muted mb-1.5">אימייל</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint" aria-hidden />
                      <input
                        id="sample-email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        dir="ltr"
                        placeholder="you@example.com"
                        className="w-full pl-3 pr-10 py-2.5 rounded-lg border border-black/[0.1] bg-white/80 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                      />
                    </div>
                  </div>

                  {status === 'error' && (
                    <p className="text-xs text-red-600 font-hebrew text-center">{errorMsg || 'שגיאה, נסה שוב'}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-gold py-3 rounded-xl font-hebrew text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> שולח...</>
                    ) : (
                      <>שלח בקשה</>
                    )}
                  </button>

                  <p className="text-[11px] text-ink-faint font-hebrew text-center -mt-1">
                    נצור איתך קשר כשהדגימה תגיע למאגר שלנו
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
