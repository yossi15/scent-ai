'use client';

import { motion } from 'framer-motion';

/* ── Mini screen: Quiz ──────────────────────────────────────── */
function QuizMockup() {
  return (
    <div style={{ padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Progress bar */}
      <div style={{ height: 3, background: 'var(--border-default)', borderRadius: 2, overflow: 'hidden', marginBottom: 2 }}>
        <div style={{ width: '33%', height: '100%', background: 'var(--gold)', borderRadius: 2 }} />
      </div>
      <p style={{ fontSize: 8, color: 'var(--text-muted)', margin: 0, letterSpacing: '0.06em' }}>שאלה 3 מתוך 9</p>
      <p style={{
        fontFamily: 'var(--serif, Georgia, serif)', fontSize: 13,
        fontWeight: 500, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3,
      }}>
        מה מרגיש לך הכי טבעי?
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          { label: 'חמים ועוטף', on: true },
          { label: 'רענן וצלול', on: false },
          { label: 'חד וחושני',   on: false },
          { label: 'מתוק ונערי',  on: false },
        ].map(opt => (
          <div
            key={opt.label}
            style={{
              padding: '9px 12px', borderRadius: 8,
              border: `1px solid ${opt.on ? 'var(--gold)' : 'var(--border-default)'}`,
              background: opt.on ? 'var(--gold-faint)' : 'transparent',
              fontSize: 12, color: opt.on ? 'var(--gold)' : 'var(--text-secondary)',
              fontWeight: opt.on ? 600 : 400,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}
          >
            {opt.label}
            {opt.on && (
              <span style={{
                width: 14, height: 14, borderRadius: '50%',
                border: '1.5px solid var(--gold)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Mini screen: AI Processing ─────────────────────────────── */
function AIMockup() {
  return (
    <div style={{
      padding: '14px 12px', display: 'flex', flexDirection: 'column',
      gap: 14, alignItems: 'center', justifyContent: 'center', flex: 1,
    }}>
      {/* Animated orb */}
      <div style={{ position: 'relative', width: 48, height: 48 }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, var(--gold) 0%, transparent 60%)',
          filter: 'blur(6px)', opacity: 0.65,
          animation: 'orbPulse 2.4s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '1.5px solid var(--gold)',
          borderTopColor: 'transparent', borderRightColor: 'transparent',
          animation: 'spin-slow 1.6s linear infinite',
        }} />
      </div>
      <p style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 500, margin: 0, textAlign: 'center' }}>
        מנתח<span style={{ color: 'var(--gold)' }}>...</span>
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, textAlign: 'center' }}>
        {[
          { label: 'חילוץ פרופיל ארומטי', done: true },
          { label: 'סורק 1,000+ בשמים',  done: false, active: true },
          { label: 'מחשב התאמה',          done: false },
        ].map(s => (
          <span key={s.label} style={{
            fontSize: 10.5,
            color: s.done ? 'var(--text-secondary)' : s.active ? 'var(--gold)' : 'var(--text-muted)',
          }}>
            {s.done ? '✓ ' : s.active ? '● ' : '· '}{s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Mini screen: Results ───────────────────────────────────── */
function ResultsMockup() {
  return (
    <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
      {[
        { pct: '96%', house: 'MFK',       name: 'Baccarat Rouge 540', top: true },
        { pct: '94%', house: 'Tom Ford',  name: 'Tobacco Vanille',    top: false },
        { pct: '91%', house: 'Tom Ford',  name: 'Oud Wood',           top: false },
        { pct: '88%', house: 'M. Margiela', name: 'By the Fireplace', top: false },
      ].map((m) => (
        <div
          key={m.name}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '7px 9px', borderRadius: 8,
            border: `1px solid ${m.top ? 'var(--gold-soft)' : 'var(--border-subtle)'}`,
            background: m.top ? 'var(--gold-faint)' : 'transparent',
          }}
        >
          <span style={{
            fontSize: 12, fontWeight: 700, color: 'var(--gold)',
            minWidth: 32,
          }}>{m.pct}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontFamily: 'var(--serif)',
              fontSize: 8.5, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--text-muted)', margin: 0,
            }}>{m.house}</p>
            <p style={{
              fontFamily: 'var(--serif)',
              fontSize: 11.5, color: 'var(--text-primary)', margin: 0,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              fontWeight: m.top ? 600 : 400,
            }}>{m.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Step data ──────────────────────────────────────────────── */
const STEPS = [
  {
    num: '01', tag: 'שאלון',
    title: 'תשע שאלות מדויקות',
    desc: 'לא טיפוסים גנריים, לא צבעי עיניים. שאלות שמודדות תגובה ריחנית אמיתית.',
    Mockup: QuizMockup,
  },
  {
    num: '02', tag: 'ניתוח AI',
    title: 'מעבד בעשר שניות',
    desc: 'מודל ייעודי שמכיר תווי ראש, לב, בסיס ואקורדים - לא רק שמות בקבוקים.',
    Mockup: AIMockup,
  },
  {
    num: '03', tag: 'המלצות',
    title: 'עשר התאמות אישיות',
    desc: 'מדורגות לפי תאימות, עם הסבר ריחני מדויק לכל אחת. בעברית.',
    Mockup: ResultsMockup,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{ padding: 'var(--s7) var(--s3)', position: 'relative' }}
    >
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>

        {/* Section head */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--s7)', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
          <span style={{
            fontSize: 10.5, letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'var(--gold)', fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ width: 18, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
            איך זה עובד
          </span>
          <h2 style={{
            fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 40px)',
            lineHeight: 1.15, letterSpacing: '-0.025em', margin: 0,
            color: 'var(--text-primary)', maxWidth: 720,
          }}>
            מתשע שאלות לבושם שלך, בלי לצאת מהבית.
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 15.5, maxWidth: 540, margin: 0, lineHeight: 1.65 }}>
            שלב אחד, שלוש שכבות של AI, ועשר התאמות אישיות שמסבירות את עצמן.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s3)' }}
          className="how-grid-responsive"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-2, var(--border-default))',
                borderRadius: 16, overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                boxShadow: 'var(--shadow-card)',
                transition: 'transform 280ms, border-color 280ms',
              }}
              whileHover={{ y: -3 }}
            >
              {/* Screen area */}
              <div style={{
                background: 'var(--bg-card-2, var(--bg-elevated))',
                borderBottom: '1px solid var(--border-subtle)',
                minHeight: 250,
                display: 'flex', flexDirection: 'column',
                position: 'relative',
              }}>
                {/* Browser dots */}
                <div style={{
                  display: 'flex', gap: 4, padding: '8px 10px',
                  borderBottom: '1px solid var(--border-subtle)',
                }}>
                  {[0, 1, 2].map(d => (
                    <div key={d} style={{
                      width: 7, height: 7, borderRadius: '50%',
                      background: d === 0 ? 'var(--gold)' : 'var(--border-default)',
                    }} />
                  ))}
                </div>
                <step.Mockup />
              </div>

              {/* Footer */}
              <div style={{ padding: 'var(--s2) var(--s2) var(--s3)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <p style={{
                  fontFamily: 'var(--serif, Georgia, serif)', fontSize: 10,
                  color: 'var(--gold)', letterSpacing: '0.22em', margin: '0 0 2px',
                }}>
                  {step.num} · {step.tag}
                </p>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 12.5, color: 'var(--text-muted)', margin: '4px 0 0', lineHeight: 1.55 }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .how-grid-responsive { grid-template-columns: 1fr !important; }
        }
        @keyframes orbPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 0.9; }
        }
      `}</style>
    </section>
  );
}
