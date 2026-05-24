'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Plus, ArrowLeft } from 'lucide-react';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BULLETS = [
  'AI לומד מהאוסף שלך ומשפר עם כל בושם שמוסיפים',
  'המלצות מדויקות יותר ככל שהפרופיל שלך מתעשר',
  'תובנות על הפרופיל הריחי שלך — מה חוזר, מה חסר',
];

interface Props {
  /** Where to link for manual add — defaults to /collection */
  collectionHref?: string;
}

export default function EmptyCollection({ collectionHref = '/collection' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      dir="rtl"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '64px 24px',
        maxWidth: '520px',
        margin: '0 auto',
      }}
    >
      {/* Icon */}
      <div style={{
        width: '56px',
        height: '56px',
        background: 'var(--gold-faint)',
        border: '1px solid var(--gold-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '28px',
      }}>
        <Sparkles size={22} style={{ color: 'var(--accent-gold)' }} />
      </div>

      {/* Eyebrow */}
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '9px',
        letterSpacing: '3.5px',
        textTransform: 'uppercase',
        color: 'var(--accent-gold)',
        marginBottom: '12px',
      }}>
        האוסף שלך
      </p>

      {/* Heading */}
      <h2 style={{
        fontFamily: '"Cormorant Garamond", Georgia, serif',
        fontWeight: 300,
        fontSize: 'clamp(26px, 4vw, 36px)',
        color: 'var(--ink)',
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        marginBottom: '16px',
      }}>
        האוסף שלך מתחיל כאן.
      </h2>

      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 300,
        fontSize: '13px',
        color: 'var(--ink-muted)',
        lineHeight: 1.75,
        maxWidth: '380px',
        marginBottom: '32px',
      }}>
        סמן את הבשמים שאתה לובש — גם ישנים, גם מזדמנים. ה-AI בונה ממהם
        את הפרופיל הריחי שלך ומשתמש בו לכל המלצה עתידית.
      </p>

      {/* Value bullets */}
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: '0 0 36px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'flex-end',
        textAlign: 'right',
        width: '100%',
        maxWidth: '380px',
      }}>
        {BULLETS.map((b, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.1, ease }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '12px',
              color: 'var(--ink-muted)',
              lineHeight: 1.6,
            }}
          >
            <span style={{
              flexShrink: 0,
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: 'var(--accent-gold)',
              marginTop: '6px',
              opacity: 0.6,
            }} />
            {b}
          </motion.li>
        ))}
      </ul>

      {/* CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '320px' }}>
        {/* Primary — quiz */}
        <Link
          href="/quiz"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '14px 28px',
            background: 'var(--accent-gold)',
            color: '#0a0a0a',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '11px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          <Sparkles size={13} />
          גלה את הריח שלך
        </Link>

        {/* Secondary — manual add */}
        <Link
          href={collectionHref}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '13px 28px',
            background: 'transparent',
            color: 'var(--ink)',
            border: '1px solid var(--border)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '11px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'border-color 0.2s, opacity 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--gold-border)';
            e.currentTarget.style.opacity = '0.8';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.opacity = '1';
          }}
        >
          <Plus size={13} />
          הוסף בושם ידנית
        </Link>
      </div>

      {/* Hint */}
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '10px',
        color: 'var(--ink-faint)',
        marginTop: '20px',
        letterSpacing: '0.3px',
      }}>
        כל בושם שמוסיפים מחדד את ההמלצות הבאות
      </p>
    </motion.div>
  );
}
