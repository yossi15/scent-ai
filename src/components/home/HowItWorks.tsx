'use client';

import { motion } from 'framer-motion';

/* ── Mini screen mockups ─────────────────────────────────────── */

function QuizMockup() {
  return (
    <div style={{ padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, height: 3, background: 'var(--border-default)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ width: '33%', height: '100%', background: 'var(--gold)', borderRadius: 2 }} />
        </div>
        <span style={{ fontSize: 8, color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>3 / 9</span>
      </div>
      {/* Question */}
      <p style={{ fontSize: 9, color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
        איזה סיטואציה מתאר אותך הכי טוב?
      </p>
      {/* Choices */}
      {['חם ומחבק', 'נקי ורענן'].map((c, i) => (
        <div
          key={c}
          style={{
            fontSize: 9, padding: '6px 10px', borderRadius: 6, textAlign: 'center',
            border: `1px solid ${i === 0 ? 'var(--gold-text)' : 'var(--border-default)'}`,
            background: i === 0 ? 'rgba(201,169,97,0.08)' : 'transparent',
            color: i === 0 ? 'var(--gold)' : 'var(--text-tertiary)',
          }}
        >
          {c}
        </div>
      ))}
    </div>
  );
}

function AIMockup() {
  const steps = [
    { label: 'העדפות שלך', done: true },
    { label: 'סורק 1,000+ בשמים', done: false, active: true },
    { label: 'מחשב התאמה', done: false },
  ];
  return (
    <div style={{ padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
      {/* Spinner */}
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        border: '2px solid rgba(201,169,97,0.2)',
        borderTop: '2px solid var(--gold)',
        animation: 'spin-slow 1.5s linear infinite',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4" />
          <path d="M12 14a8 8 0 0 1 8 8H4a8 8 0 0 1 8-8" />
        </svg>
      </div>
      <p style={{ fontSize: 9, color: 'var(--gold-text)', margin: 0, fontWeight: 500 }}>Claude מנתח...</p>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {steps.map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              fontSize: 8,
              color: s.done ? 'var(--gold)' : s.active ? 'var(--text-secondary)' : 'var(--text-faint)',
            }}>
              {s.done ? '✓' : s.active ? '⟳' : '·'}
            </span>
            <span style={{ fontSize: 8, color: s.done ? 'var(--text-secondary)' : s.active ? 'var(--text-secondary)' : 'var(--text-faint)' }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultsMockup() {
  const matches = [
    { pct: '96%', house: 'MFK', name: 'Baccarat Rouge 540' },
    { pct: '94%', house: 'Tom Ford', name: 'Tobacco Vanille' },
    { pct: '91%', house: 'Tom Ford', name: 'Oud Wood' },
  ];
  return (
    <div style={{ padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
      {matches.map((m, i) => (
        <div
          key={m.name}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 8px', borderRadius: 6,
            border: `1px solid ${i === 0 ? 'var(--gold-text)' : 'var(--border-subtle)'}`,
            background: i === 0 ? 'rgba(201,169,97,0.05)' : 'transparent',
          }}
        >
          <span style={{
            fontSize: 8, fontWeight: 700,
            color: i === 0 ? 'var(--gold)' : 'var(--text-faint)',
            minWidth: 24,
          }}>{m.pct}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 7, color: 'var(--text-faint)', margin: 0 }}>{m.house}</p>
            <p style={{ fontSize: 9, color: 'var(--text-secondary)', margin: 0, fontWeight: i === 0 ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {m.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Step data ─────────────────────────────────────────────────── */
const STEPS = [
  {
    num: '01', tag: 'שאלון', title: 'תשע שאלות מדויקות',
    desc: 'שאלות שמבינות את הסגנון, האישיות, והסיטואציות שלך.',
    Mockup: QuizMockup,
  },
  {
    num: '02', tag: 'ניתוח', title: 'AI מעבד בעשר שניות',
    desc: 'Claude סורק מעל 1,000 בשמים ומוצא את ההתאמות הטובות ביותר.',
    Mockup: AIMockup,
  },
  {
    num: '03', tag: 'המלצות', title: 'עשר התאמות אישיות',
    desc: 'כל המלצה מגיעה עם הסבר מדוע היא מתאימה לך ספציפית.',
    Mockup: ResultsMockup,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad" style={{ background: 'var(--bg-primary)' }}>
      <div className="section-inner">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 9, color: 'var(--gold-text)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 12 }}>
            איך זה עובד
          </p>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
            מתשע שאלות לבושם שלך<span style={{ color: 'var(--gold-text)' }}>.</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid-3-cols">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderRadius: 12,
                border: '1px solid var(--border-default)',
                overflow: 'hidden',
                background: 'var(--bg-tertiary)',
              }}
            >
              {/* Top: screen mockup */}
              <div style={{
                background: 'var(--bg-card)',
                borderBottom: '1px solid var(--border-subtle)',
                minHeight: 130,
              }}>
                {/* Fake browser bar */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  padding: '7px 10px',
                  borderBottom: '1px solid var(--border-subtle)',
                }}>
                  {[0,1,2].map(d => (
                    <div key={d} style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--border-default)' }} />
                  ))}
                </div>
                <step.Mockup />
              </div>

              {/* Bottom: label */}
              <div style={{ padding: '14px 16px' }}>
                <p style={{ fontSize: 9, color: 'var(--gold-text)', letterSpacing: '0.05em', margin: '0 0 6px' }}>
                  {step.num} · {step.tag}
                </p>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px', lineHeight: 1.3 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 12, color: 'var(--text-tertiary)', margin: 0, lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
