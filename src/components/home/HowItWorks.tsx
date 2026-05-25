'use client';

import { motion } from 'framer-motion';
import EyebrowText from './shared/EyebrowText';
import StepCard from './StepCard';

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay, ease },
});

/* ─── Mockup: Step 1 - Quiz ─────────────────────────────────────── */
function QuizMockup() {
  return (
    <div style={{ width: '100%', maxWidth: 210 }}>
      {/* Progress bar */}
      <div
        className="flex items-center gap-2"
        style={{ marginBottom: 14 }}
      >
        <span style={{ fontSize: 8, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
          שאלה 3/9 · ~2 דקות
        </span>
        <div
          style={{
            flex: 1,
            height: 3,
            background: 'rgba(255,255,255,0.07)',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '33%',
              height: '100%',
              background: 'linear-gradient(90deg, var(--gold-dark), var(--gold))',
              borderRadius: 4,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: 12,
          lineHeight: 1.4,
        }}
      >
        מה מרגיש לך הכי טבעי?
      </p>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          { label: 'חמים ועוטף', selected: true },
          { label: 'רענן וקליל', selected: false },
        ].map((opt) => (
          <div
            key={opt.label}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: opt.selected
                ? '1px solid var(--gold)'
                : '1px solid var(--border-default)',
              background: opt.selected
                ? 'rgba(201,169,97,0.07)'
                : 'transparent',
              fontSize: 10,
              color: opt.selected ? 'var(--gold)' : 'var(--text-tertiary)',
              cursor: 'pointer',
            }}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mockup: Step 2 - Analysis ─────────────────────────────────── */
function AnalysisMockup() {
  return (
    <div style={{ width: '100%', maxWidth: 210, textAlign: 'center' }}>
      {/* Spinner */}
      <div
        style={{
          position: 'relative',
          width: 54,
          height: 54,
          margin: '0 auto 14px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            border: '1.5px solid rgba(201,169,97,0.15)',
            borderTopColor: 'var(--gold)',
            borderRadius: '50%',
            animation: 'spin 1.5s linear infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: 'rgba(201,169,97,0.06)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.16Z"/>
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.16Z"/>
          </svg>
        </div>
      </div>

      <p
        style={{
          fontSize: 10,
          color: 'var(--text-tertiary)',
          marginBottom: 14,
        }}
      >
        Claude סורק מעל 1,000 בשמים
      </p>

      {/* Status rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'right' }}>
        {[
          { label: 'פרופיל הובן', done: true },
          { label: 'חישוב 60%', done: false },
        ].map((row) => (
          <div
            key={row.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 10px',
              borderRadius: 6,
              background: row.done
                ? 'rgba(201,169,97,0.06)'
                : 'rgba(255,255,255,0.03)',
              border: `1px solid ${row.done ? 'rgba(201,169,97,0.15)' : 'var(--border-subtle)'}`,
            }}
          >
            <span style={{ fontSize: 8, color: row.done ? 'var(--gold)' : 'var(--text-muted)' }}>
              {row.done ? '✓' : '···'}
            </span>
            <span style={{ fontSize: 9, color: row.done ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
              {row.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mockup: Step 3 - Results ───────────────────────────────────── */
function ResultsMockup() {
  return (
    <div style={{ width: '100%', maxWidth: 210 }}>
      {/* Top match */}
      <div
        style={{
          border: '1.5px solid var(--gold)',
          borderRadius: 10,
          padding: '8px 10px',
          marginBottom: 6,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(201,169,97,0.04)',
        }}
      >
        <div
          style={{
            width: 28,
            height: 36,
            borderRadius: 6,
            background:
              'linear-gradient(160deg, rgba(201,169,97,0.3), rgba(201,169,97,0.07))',
            border: '1px solid rgba(201,169,97,0.2)',
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 7, color: 'var(--text-muted)', marginBottom: 2 }}>MFK</p>
          <p style={{ fontSize: 9, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>
            Baccarat Rouge 540
          </p>
          <span
            style={{
              fontSize: 6,
              fontWeight: 700,
              background: 'var(--gold)',
              color: '#050505',
              padding: '2px 5px',
              borderRadius: 4,
            }}
          >
            96%
          </span>
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--gold)', flexShrink: 0 }}>
          1,580&#8362;
        </span>
      </div>

      {/* Compact matches */}
      {[
        { name: 'Tobacco Vanille', pct: '94%' },
        { name: 'Oud Wood', pct: '91%' },
      ].map((item) => (
        <div
          key={item.name}
          style={{
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
            padding: '6px 10px',
            marginBottom: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <span style={{ fontSize: 9, color: 'var(--text-secondary)' }}>
            {item.name}
          </span>
          <span style={{ fontSize: 8, fontWeight: 600, color: 'var(--gold)' }}>
            {item.pct}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */
export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        background: 'var(--bg-primary)',
        padding: 'clamp(36px, 5vw, 52px) clamp(20px, 4vw, 32px)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 36 }}>
          <EyebrowText>איך זה עובד</EyebrowText>
          <h2
            style={{
              fontSize: 'clamp(20px, 3vw, 24px)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginTop: 10,
              letterSpacing: '-0.3px',
            }}
          >
            מתשע שאלות לבושם שלך
            <span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </motion.div>

        {/* 3 Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 14,
          }}
        >
          <motion.div {...fadeUp(0.1)}>
            <StepCard
              number="01"
              eyebrow="שאלון"
              title="תשע שאלות מדויקות"
              description="משפחת ריח, עוצמה, עונה, מחיר. כל תשובה משפרת את הדיוק."
              mockup={<QuizMockup />}
            />
          </motion.div>
          <motion.div {...fadeUp(0.2)}>
            <StepCard
              number="02"
              eyebrow="ניתוח"
              title="AI מעבד בעשר שניות"
              description="סורק מעל 1,000 בשמים, מחבר תשובות עם DNA ריחני ייחודי."
              highlighted
              mockup={<AnalysisMockup />}
            />
          </motion.div>
          <motion.div {...fadeUp(0.3)}>
            <StepCard
              number="03"
              eyebrow="המלצות"
              title="עשר התאמות אישיות"
              description="כל המלצה עם הסבר אישי ומה שמתאים בדיוק לך."
              mockup={<ResultsMockup />}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
