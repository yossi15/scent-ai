'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { fragrances } from '@/data/fragrances';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Props {
  query: string;
  onReset?: () => void;
}

type RequestStatus = 'idle' | 'sending' | 'sent' | 'error';

export default function EmptyResults({ query, onReset }: Props) {
  const [requestText, setRequestText] = useState(query);
  const [status, setStatus] = useState<RequestStatus>('idle');

  /* 3 top-rated suggestions, shuffled from top-20 for variety */
  const suggestions = useMemo(() => {
    const top20 = [...fragrances]
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 20);
    // stable shuffle keyed to query so same query → same suggestions
    const seed = query.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const shuffled = top20
      .map((f, i) => ({ f, sort: (i * 7 + seed) % 20 }))
      .sort((a, b) => a.sort - b.sort)
      .map(x => x.f);
    return shuffled.slice(0, 3);
  }, [query]);

  const handleRequest = async () => {
    if (!requestText.trim() || status === 'sending' || status === 'sent') return;
    setStatus('sending');
    try {
      const res = await fetch('/api/fragrance-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query_text: requestText.trim() }),
      });
      if (!res.ok) throw new Error('server error');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
      dir="rtl"
      style={{ maxWidth: '600px', margin: '0 auto', padding: '48px 24px' }}
    >
      {/* ── Header ──────────────────────────────────────────────── */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{
          width: '40px', height: '40px',
          background: 'var(--gold-faint)',
          border: '1px solid var(--gold-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '20px',
        }}>
          <Search size={16} style={{ color: 'var(--accent-gold)' }} />
        </div>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '9px',
          letterSpacing: '3.5px',
          textTransform: 'uppercase',
          color: 'var(--accent-gold)',
          marginBottom: '10px',
        }}>
          אין תוצאות
        </p>

        <h2 style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontWeight: 300,
          fontSize: 'clamp(24px, 4vw, 34px)',
          color: 'var(--ink)',
          letterSpacing: '-0.015em',
          lineHeight: 1.15,
          marginBottom: '10px',
        }}>
          {`"${query}" לא נמצא במאגר.`}
        </h2>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 300,
          fontSize: '13px',
          color: 'var(--ink-muted)',
          lineHeight: 1.7,
        }}>
          אנחנו מוסיפים בשמים חדשים בקביעות.
          {' '}
          {onReset && (
            <button
              onClick={onReset}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: '13px',
                fontWeight: 400, color: 'var(--accent-gold)',
                textDecoration: 'underline', padding: 0,
              }}
            >
              נסה חיפוש אחר
            </button>
          )}
        </p>
      </div>

      {/* ── Suggestions ─────────────────────────────────────────── */}
      <div style={{ marginBottom: '48px' }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '9px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--ink-muted)',
          marginBottom: '16px',
        }}>
          מה שאחרים אוהבים עכשיו
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {suggestions.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.08 + i * 0.08, ease }}
            >
              <Link
                href={`/fragrance/${f.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s',
                  gap: '16px',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--gold-border)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '9px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)',
                    marginBottom: '3px',
                  }}>
                    {f.house}
                  </p>
                  <p style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontWeight: 400,
                    fontSize: '18px',
                    color: 'var(--ink)',
                    lineHeight: 1.2,
                  }}>
                    {f.name}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    color: 'var(--ink-muted)',
                    letterSpacing: '0.5px',
                  }}>
                    {f.family}
                  </span>
                  <ArrowRight size={14} style={{ color: 'var(--ink-muted)', transform: 'rotate(180deg)' }} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Request form ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease }}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          padding: '28px',
        }}
      >
        <AnimatePresence mode="wait">
          {status === 'sent' ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease }}
              style={{ textAlign: 'center', padding: '8px 0' }}
            >
              <CheckCircle
                size={28}
                style={{ color: 'var(--accent-gold)', margin: '0 auto 14px', display: 'block' }}
              />
              <p style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontWeight: 400,
                fontSize: '20px',
                color: 'var(--ink)',
                marginBottom: '8px',
              }}>
                הבקשה התקבלה.
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '12px',
                color: 'var(--ink-muted)',
                lineHeight: 1.65,
              }}>
                נבדוק ונוסיף לקטלוג בהקדם — תודה שעוזר לנו לגדול.
              </p>
            </motion.div>
          ) : (
            <motion.div key="form">
              <p style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontWeight: 400,
                fontSize: '18px',
                color: 'var(--ink)',
                marginBottom: '6px',
              }}>
                רוצה שנוסיף אותו?
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '12px',
                color: 'var(--ink-muted)',
                lineHeight: 1.65,
                marginBottom: '18px',
              }}>
                שלח לנו את שם הבושם ובית הבושם — נבדוק ונוסיף לקטלוג.
              </p>

              <textarea
                value={requestText}
                onChange={e => setRequestText(e.target.value)}
                placeholder="לדוגמה: Baccarat Rouge 540 מאת Maison Francis Kurkdjian"
                rows={3}
                dir="rtl"
                style={{
                  width: '100%',
                  resize: 'none',
                  padding: '12px 14px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  fontFamily: 'Heebo, Inter, sans-serif',
                  fontSize: '13px',
                  color: 'var(--ink)',
                  lineHeight: 1.6,
                  outline: 'none',
                  marginBottom: '12px',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold-border)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                aria-label="תיאור הבושם המבוקש"
              />

              {status === 'error' && (
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  color: '#c0392b',
                  marginBottom: '10px',
                }}>
                  משהו השתבש. נסה שוב.
                </p>
              )}

              <button
                onClick={handleRequest}
                disabled={!requestText.trim() || status === 'sending'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 24px',
                  background: requestText.trim() ? 'var(--accent-gold)' : 'var(--border)',
                  color: requestText.trim() ? '#0a0a0a' : 'var(--ink-muted)',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '10px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: requestText.trim() && status !== 'sending' ? 'pointer' : 'not-allowed',
                  transition: 'opacity 0.2s',
                  opacity: status === 'sending' ? 0.6 : 1,
                }}
              >
                <Send size={12} />
                {status === 'sending' ? 'שולח...' : 'שלח בקשה'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
