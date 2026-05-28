'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    label: 'ממפה את הפרופיל הריחי שלך',
    detail: 'קוסינוס-דמיון מול מעל 1,000 בשמים',
  },
  {
    label: 'מסנן לפי טעם, עמידות ותקציב',
    detail: '25 מועמדים מדויקים נבחרו',
  },
  {
    label: 'מייעץ עם ה-Master Perfumer',
    detail: 'מנתח את הפרופיל הריחי',
  },
  {
    label: 'מכין את ההמלצות הסופיות',
    detail: 'בוחר 3 בשמים מגוונים בשבילך',
  },
] as const;

interface Props {
  /** 0 = step 1 active · 3 = step 4 active · 4 = all done */
  currentStep: number;
  estimatedSecondsLeft: number;
}

/* ── Spinner ring ───────────────────────────────────────────────── */
function Spinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        border: '2px solid var(--border)',
        borderTopColor: 'var(--accent-gold)',
        flexShrink: 0,
      }}
      aria-hidden="true"
    />
  );
}

/* ── Pending circle ─────────────────────────────────────────────── */
function PendingDot() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        border: '1.5px solid var(--border)',
        flexShrink: 0,
      }}
    />
  );
}

/* ── Done checkmark ─────────────────────────────────────────────── */
function DoneCheck() {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'var(--accent-gold)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <Check size={11} style={{ color: '#0a0a0a', strokeWidth: 2.5 }} />
    </motion.div>
  );
}

/* ── Main component ─────────────────────────────────────────────── */
export default function AnalyzingLoader({ currentStep, estimatedSecondsLeft }: Props) {
  const [seconds, setSeconds] = useState(estimatedSecondsLeft);

  /* Reset countdown whenever parent updates the estimate */
  useEffect(() => {
    setSeconds(estimatedSecondsLeft);
  }, [estimatedSecondsLeft]);

  /* Tick down */
  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const allDone = currentStep >= STEPS.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
      dir="rtl"
      style={{
        maxWidth: '480px',
        margin: '0 auto',
        padding: '48px 24px',
      }}
      role="status"
      aria-live="polite"
      aria-label={allDone ? 'ניתוח הושלם' : `מנתח — שלב ${currentStep + 1} מתוך ${STEPS.length}`}
    >
      {/* ── Eyebrow ───────────────────────────────────────────────── */}
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '9px',
        letterSpacing: '3.5px',
        textTransform: 'uppercase',
        color: 'var(--accent-gold)',
        marginBottom: '12px',
      }}>
        {allDone ? 'ניתוח הושלם' : 'ה-AI עובד'}
      </p>

      {/* ── Title ─────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={allDone ? 'done' : currentStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease }}
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300,
            fontSize: 'clamp(22px, 3.5vw, 30px)',
            color: 'var(--ink)',
            letterSpacing: '-0.015em',
            lineHeight: 1.15,
            marginBottom: '36px',
          }}
        >
          {allDone
            ? 'ההמלצות מוכנות.'
            : STEPS[Math.min(currentStep, STEPS.length - 1)].label}
        </motion.h2>
      </AnimatePresence>

      {/* ── Steps ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {STEPS.map((step, i) => {
          const status =
            i < currentStep ? 'done'
            : i === currentStep ? 'active'
            : 'pending';

          return (
            <motion.div
              key={i}
              layout
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '14px 0',
                borderBottom: i < STEPS.length - 1 ? '1px solid var(--border)' : 'none',
                opacity: status === 'pending' ? 0.4 : 1,
                transition: 'opacity 0.4s ease',
              }}
            >
              {/* Status indicator */}
              <div style={{ paddingTop: '2px' }}>
                {status === 'done'   && <DoneCheck />}
                {status === 'active' && <Spinner />}
                {status === 'pending' && <PendingDot />}
              </div>

              {/* Step text */}
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: status === 'active' ? 500 : 400,
                  fontSize: '13px',
                  color: status === 'active' ? 'var(--ink)' : 'var(--ink-muted)',
                  marginBottom: '3px',
                  lineHeight: 1.4,
                  transition: 'color 0.3s ease, font-weight 0.3s ease',
                }}>
                  {step.label}
                </p>
                <AnimatePresence>
                  {status === 'done' && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease }}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 300,
                        fontSize: '11px',
                        color: 'var(--accent-gold)',
                        lineHeight: 1.4,
                        overflow: 'hidden',
                      }}
                    >
                      {step.detail}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Timer ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {!allDone && seconds > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {/* Pulsing dot */}
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent-gold)',
                display: 'inline-block',
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '12px',
              color: 'var(--ink-muted)',
              letterSpacing: '0.3px',
            }}>
              כ-{seconds} {seconds === 1 ? 'שנייה' : 'שניות'} נוספות
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
