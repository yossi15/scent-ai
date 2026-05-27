'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, BookOpen, FlaskConical } from 'lucide-react';
import Navigation from '@/components/home/Navigation';
import Footer from '@/components/home/Footer';
import { fragrances } from '@/data/fragrances';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function NotFound() {
  /* Same fragrance all day, rotates daily — stable across re-renders */
  const daily = useMemo(() => {
    const d = new Date();
    const start = new Date(d.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((d.getTime() - start.getTime()) / 86_400_000);
    return fragrances[dayOfYear % fragrances.length];
  }, []);

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      <Navigation />

      {/* ── Main ─────────────────────────────────────────────────── */}
      <main
        style={{ flex: 1, paddingTop: '57px' }}
        dir="rtl"
        aria-label="דף שגיאה 404"
      >
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '64px 24px 80px' }}>

          {/* ── 404 watermark ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            aria-hidden="true"
            style={{ textAlign: 'center', marginBottom: '-24px', position: 'relative', zIndex: 0 }}
          >
            <span style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(100px, 22vw, 172px)',
              color: 'var(--accent-gold)',
              opacity: 0.13,
              lineHeight: 1,
              userSelect: 'none',
              display: 'block',
            }}>
              404
            </span>
          </motion.div>

          {/* ── Heading ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease }}
            style={{ textAlign: 'center', marginBottom: '40px', position: 'relative', zIndex: 1 }}
          >
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '9px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              marginBottom: '14px',
            }}>
              עמוד לא נמצא
            </p>
            <h1 style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: 'clamp(30px, 5vw, 46px)',
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}>
              הדף הזה התאדה.
            </h1>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '14px',
              color: 'var(--ink-muted)',
              lineHeight: 1.7,
            }}>
              אבל הריח של הקולקציה שלנו עדיין כאן.
            </p>
          </motion.div>

          {/* ── CTAs ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '56px',
            }}
          >
            {/* Primary — quiz */}
            <Link
              href="/quiz"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 36px',
                background: 'var(--accent-gold)',
                color: '#0a0a0a',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              גלה את הריח שלך
              <ArrowRight size={13} />
            </Link>

            {/* Secondary row */}
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <Link
                href="/#collection"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '2px',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                לקולקציה
              </Link>
              <span style={{ color: 'var(--border)', fontSize: '14px' }}>·</span>
              <Link
                href="/"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                חזרה לבית
              </Link>
            </div>
          </motion.div>

          {/* ── Cards row ─────────────────────────────────────────── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
          }}>

            {/* Bug report card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                padding: '28px',
              }}
            >
              <div style={{
                width: '36px', height: '36px',
                background: 'var(--gold-faint)',
                border: '1px solid var(--gold-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <Mail size={16} style={{ color: 'var(--accent-gold)' }} />
              </div>
              <p style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontWeight: 400,
                fontSize: '18px',
                color: 'var(--ink)',
                marginBottom: '8px',
                lineHeight: 1.2,
              }}>
                הגעת לכאן בטעות?
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '12px',
                color: 'var(--ink-muted)',
                lineHeight: 1.65,
                marginBottom: '18px',
              }}>
                אם קישור השתבש — נשמח לדעת.
                <br />
                כתוב לנו ונטפל מיד.
              </p>
              <a
                href="mailto:hello@scentory.co.il?subject=קישור שבור ב-SCENTORY"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--gold-border)',
                  paddingBottom: '2px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                hello@scentory.co.il
              </a>
            </motion.div>

            {/* Fragrance of the day */}
            {daily && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  padding: '28px',
                }}
              >
                <div style={{
                  width: '36px', height: '36px',
                  background: 'var(--gold-faint)',
                  border: '1px solid var(--gold-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px',
                }}>
                  <FlaskConical size={16} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '9px',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                  marginBottom: '8px',
                }}>
                  בושם היום
                </p>
                <p style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 400,
                  fontSize: '20px',
                  color: 'var(--ink)',
                  lineHeight: 1.15,
                  marginBottom: '4px',
                }}>
                  {daily.name}
                </p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                  marginBottom: '18px',
                }}>
                  {daily.house}
                </p>
                <Link
                  href={`/fragrance/${daily.id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'var(--accent-gold)',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--gold-border)',
                    paddingBottom: '2px',
                  }}
                >
                  לעמוד הבושם
                  <BookOpen size={10} />
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
