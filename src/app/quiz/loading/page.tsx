'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  'הבנת הפרופיל שלך',
  'טעינת קולקציה',
  'חישוב התאמות',
  'יצירת הסבר אישי',
];

export default function QuizLoading() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(8);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft(s => Math.max(0, s - 1));
    }, 1000);

    const stepTimer = setInterval(() => {
      setCurrentStep(s => Math.min(s + 1, STEPS.length - 1));
    }, 1800);

    let payload: Record<string, unknown> | null = null;
    try {
      const raw = sessionStorage.getItem('scentory-quiz-payload');
      if (raw) payload = JSON.parse(raw);
    } catch {}

    if (!payload) {
      router.replace('/quiz');
      return;
    }

    const hasEmail = !!payload.email;

    fetch('/api/quiz', {
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
        sessionStorage.setItem('scentory-quiz-results', JSON.stringify({
          recommendations: data.recommendations,
          knownNames:      payload?.knownNames ?? [],
          email:           payload?.email ?? null,
        }));
        sessionStorage.removeItem('scentory-quiz-state');
        sessionStorage.removeItem('scentory-quiz-payload');

        clearInterval(countdown);
        clearInterval(stepTimer);

        if (hasEmail) {
          router.replace('/quiz/results');
        } else {
          router.replace('/quiz/results/preview');
        }
      })
      .catch(() => {
        setError('אירעה שגיאה בניתוח. נסה שוב.');
      });

    return () => {
      clearInterval(countdown);
      clearInterval(stepTimer);
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
      {/* Spinner */}
      <div style={{ position: 'relative', width: 80, height: 80, marginBottom: 28 }}>
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
          position: 'absolute', inset: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '50%', background: 'rgba(201,169,97,0.06)',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.16Z"/>
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.16Z"/>
          </svg>
        </div>
      </div>

      <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 28, textAlign: 'center' }}>
        Claude סורק מעל 1,000 בשמים
      </p>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 320, marginBottom: 28 }}>
        {STEPS.map((label, i) => {
          const done    = i < currentStep;
          const current = i === currentStep;
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
              <span style={{ fontSize: 13, color: done ? 'var(--gold)' : current ? 'var(--text-muted)' : 'var(--text-faint)', width: 16, textAlign: 'center', flexShrink: 0 }}>
                {done ? '✓' : current ? '⟳' : '◯'}
              </span>
              <span style={{ fontSize: 12, color: done ? 'var(--text-secondary)' : current ? 'var(--text-tertiary)' : 'var(--text-faint)' }}>
                {label}
              </span>
              {i === 2 && current && (
                <span style={{ fontSize: 11, color: 'var(--gold)', marginRight: 'auto' }}>60%</span>
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
