'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  'הטעם שלך הובן',
  'הבשמים שאהבת נלמדו',
  'בוחר את ההתאמות שלך...',
  'מכין את ההמלצות האישיות',
];

const MIN_DISPLAY_MS = 4000;

export default function QuizLoading() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress]       = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(8);
  const [error, setError]             = useState<string | null>(null);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft(s => Math.max(0, s - 1));
    }, 1000);

    const stepTimer = setInterval(() => {
      setCurrentStep(s => Math.min(s + 1, STEPS.length - 1));
    }, 1700);

    const progressTimer = setInterval(() => {
      setProgress(p => Math.min(p + Math.random() * 8, 92));
    }, 300);

    let payload: Record<string, unknown> | null = null;
    try {
      const raw = sessionStorage.getItem('scentory-quiz-payload');
      if (raw) payload = JSON.parse(raw);
    } catch {}

    if (!payload) {
      router.replace('/quiz');
      return;
    }

    const { email, previewMode } = payload as { email: string | null; previewMode?: boolean };

    // Fire submit in background (non-blocking)
    if (email) {
      fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: payload.answers, email, marketingConsent: payload.marketing }),
      }).catch(() => {});
    }

    fetch('/api/quiz/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answers:     payload.answers,
        candidates:  payload.candidates,
        tasteVector: payload.tasteVector,
        sigNotes:    payload.sigNotes,
        dislikes:    [],
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const elapsed = Date.now() - startRef.current;
        const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

        setTimeout(() => {
          setProgress(100);
          setCurrentStep(STEPS.length - 1);

          sessionStorage.setItem('scentory-quiz-results', JSON.stringify({
            profile_summary:  data.profile_summary,
            dna_bars:         data.dna_bars,
            recommendations:  data.recommendations,
            knownNames:       (payload as Record<string, unknown>).knownNames ?? [],
            email:            email ?? null,
            previewMode:      previewMode ?? false,
          }));
          sessionStorage.removeItem('scentory-quiz-payload');

          clearInterval(countdown);
          clearInterval(stepTimer);
          clearInterval(progressTimer);

          setTimeout(() => {
            if (previewMode) {
              router.replace('/quiz/results/preview');
            } else {
              router.replace('/quiz/results');
            }
          }, 600);
        }, remaining);
      })
      .catch(err => {
        console.error('[loading] API error:', err);
        setError('אירעה שגיאה בניתוח. נסה שוב.');
        clearInterval(countdown);
        clearInterval(stepTimer);
        clearInterval(progressTimer);
      });

    return () => {
      clearInterval(countdown);
      clearInterval(stepTimer);
      clearInterval(progressTimer);
    };
  }, [router]);

  if (error) {
    return (
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 }}>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', textAlign: 'center' }}>{error}</p>
        <button
          onClick={() => router.push('/quiz')}
          style={{ padding: '10px 24px', background: 'var(--gold)', color: '#050505', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          נסה שוב
        </button>
      </div>
    );
  }

  return (
    <div
      style={{ minHeight: '100dvh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}
      dir="rtl"
    >
      {/* Spinner with brain icon */}
      <div style={{ position: 'relative', width: 72, height: 72, marginBottom: 28 }}>
        <div
          className="animate-spin-slow"
          style={{
            position: 'absolute', inset: 0,
            border: '2px solid rgba(201,169,97,0.15)',
            borderTopColor: 'var(--gold)',
            borderRadius: '50%',
          }}
        />
        <div style={{
          position: 'absolute', inset: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '50%',
          background: 'rgba(201,169,97,0.06)',
          boxShadow: '0 0 20px rgba(201,169,97,0.15)',
        }}>
          {/* Brain-like icon */}
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.16Z"/>
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.16Z"/>
          </svg>
        </div>
      </div>

      <h1 style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 6, textAlign: 'center' }}>
        מגלה את הפרופיל הריחני שלך
      </h1>
      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 32, textAlign: 'center' }}>
        מאות בשמים עוברים לפני עינינו...
      </p>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 340, marginBottom: 28 }}>
        {STEPS.map((label, i) => {
          const done    = i < currentStep;
          const current = i === currentStep;
          const isProgress = i === 2 && current;
          return (
            <div
              key={label}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 12px', borderRadius: 8,
                background: done ? 'rgba(201,169,97,0.06)' : current ? 'rgba(255,255,255,0.03)' : 'transparent',
                border: `1px solid ${done ? 'rgba(201,169,97,0.15)' : current ? 'var(--border-subtle)' : 'transparent'}`,
                transition: 'all 0.4s',
              }}
            >
              <span style={{
                fontSize: 13,
                color: done ? 'var(--gold)' : current ? 'var(--text-muted)' : 'var(--text-faint)',
                width: 16, textAlign: 'center', flexShrink: 0,
              }}>
                {done ? '✓' : current ? '⟳' : '◯'}
              </span>
              <span style={{ fontSize: 12, color: done ? 'var(--text-secondary)' : current ? 'var(--text-tertiary)' : 'var(--text-faint)', flex: 1 }}>
                {label}
              </span>
              {isProgress && (
                <span style={{ fontSize: 11, color: 'var(--gold)', flexShrink: 0 }}>
                  {Math.round(progress)}%
                </span>
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={secondsLeft}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ fontSize: 11, color: 'var(--text-faint)' }}
        >
          {secondsLeft > 0 ? `בערך ${secondsLeft} שניות נותרו` : 'כמעט מוכן...'}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
