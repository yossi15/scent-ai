'use client';

import { motion } from 'framer-motion';

const SHOW_TESTIMONIALS = process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS !== 'false';

const REVIEWS = [
  {
    quote: 'SCENTORY מצא לי את Oud Wood של Tom Ford — בדיוק ה-DNA שלי. לא האמנתי שאפשר לעשות את זה דיגיטלית.',
    name: 'דניאל כ.',
    city: 'תל אביב',
    count: 12,
    initial: 'ד',
  },
  {
    quote: 'ההסברים למה כל בושם מתאים לי שינו הכל. עכשיו אני קונה בביטחון ולא בהגרלה.',
    name: 'מיכל ר.',
    city: 'ירושלים',
    count: 8,
    initial: 'מ',
  },
  {
    quote: 'Baccarat Rouge 540 — SCENTORY הציע לי אותו ראשון. עכשיו זה הבושם היומיומי שלי.',
    name: 'איתי מ.',
    city: 'חיפה',
    count: 5,
    initial: 'א',
  },
];

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="var(--gold)" aria-hidden="true">
          <path d="M6 1l1.3 2.6L10.2 4l-2.1 2 .5 2.9L6 7.6 3.4 8.9l.5-2.9L2 4l2.9-.4L6 1z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  if (!SHOW_TESTIMONIALS) return null;

  return (
    <section className="section-pad" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="section-inner">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px' }}>
            מה אספנים אומרים
          </h2>
          <p style={{ fontSize: 12, color: 'var(--text-faint)', margin: 0 }}>
            מ-500 הראשונים.
          </p>
        </div>

        {/* Cards */}
        <div className="grid-3-cols">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderRadius: 12,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-default)',
                padding: '20px',
                display: 'flex', flexDirection: 'column', gap: 14,
              }}
            >
              <Stars />

              <p style={{
                fontSize: 13, color: 'var(--text-secondary)',
                lineHeight: 1.6, margin: 0, flex: 1,
              }}>
                &ldquo;{r.quote}&rdquo;
              </p>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {/* Avatar */}
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, var(--gold), #8b5c1a)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: '#050505',
                  }}>
                    {r.initial}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                      {r.name}
                    </p>
                    <p style={{ fontSize: 10, color: 'var(--text-faint)', margin: 0 }}>
                      {r.city} · {r.count} בשמים
                    </p>
                  </div>
                  <div style={{
                    fontSize: 9, color: 'var(--gold)',
                    border: '1px solid rgba(201,169,97,0.3)',
                    borderRadius: 100, padding: '2px 7px',
                    whiteSpace: 'nowrap',
                  }}>
                    ✓ מאומת
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
