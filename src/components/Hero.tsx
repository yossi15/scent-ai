'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fragrances } from '@/data/fragrances';

const TOTAL  = fragrances.length;
const HOUSES = new Set(fragrances.map(f => f.house)).size;

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const TRUST_PILLS = [
  `${TOTAL.toLocaleString()} בשמים`,
  `${HOUSES} בתי בושם`,
  '7 ימי ניסיון',
  'ביטול בכל עת',
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden flex flex-col items-center justify-center text-center px-6"
      style={{
        minHeight: '92vh',
        paddingTop: '100px',
        paddingBottom: '64px',
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,169,97,0.07) 0%, transparent 70%), var(--bg-primary)',
      }}
      aria-labelledby="hero-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="max-w-3xl mx-auto"
      >
        {/* Badge */}
        <div
          className="inline-flex items-center mb-8"
          style={{
            border: '1px solid var(--gold-border)',
            padding: '6px 18px',
            borderRadius: '100px',
          }}
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
            }}
          >
            פלטפורמת AI לגילוי בשמים
          </span>
        </div>

        {/* Heading */}
        <h1
          id="hero-heading"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300,
            fontSize: 'clamp(30px, 5.5vw, 56px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            marginBottom: '28px',
          }}
        >
          תפסיק לבזבז{' '}
          <span style={{ color: 'var(--accent-gold)', fontWeight: 400 }}>1,500&#8362;</span>
          {' '}על בשמים שלא מתאימים לך
        </h1>

        {/* Description */}
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            lineHeight: 1.8,
            color: 'var(--ink-muted)',
            maxWidth: '520px',
            margin: '0 auto 44px',
          }}
        >
          AI שלומד את ה-DNA הריחני שלך מהאוסף הקיים.{' '}
          {TOTAL.toLocaleString()} בשמים נישתיים מ-{HOUSES} בתי בושם.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/quiz"
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              background: 'var(--accent-gold)',
              color: '#0a0a0a',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
            className="transition-opacity hover:opacity-85 active:scale-[0.97]"
          >
            התחל שאלון של 3 דקות ←
          </Link>
          <a
            href="#how-it-works"
            style={{
              display: 'inline-block',
              padding: '13px 32px',
              background: 'transparent',
              color: 'var(--ink-secondary)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              border: '1px solid var(--border)',
              whiteSpace: 'nowrap',
            }}
            className="transition-all hover:border-gold-border hover:text-gold"
          >
            איך זה עובד?
          </a>
        </div>

        {/* Trust pills */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}
        >
          {TRUST_PILLS.map((pill) => (
            <span
              key={pill}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.5px',
                color: 'var(--ink-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ color: 'var(--accent-gold)', fontSize: '10px' }}>✓</span>
              {pill}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
