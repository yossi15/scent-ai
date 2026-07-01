'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    tag: 'השאלון',
    title: 'תשע שאלות שמקשיבות באמת.',
    desc: 'לא טיפוסים גנריים ולא צבע עיניים. תשע שאלות מדויקות שמודדות איך אתה מגיב לריח — מה עוטף אותך, מה דוחה אותך, ומה גורם לך לעצור באמצע הרחוב.',
    gold: null,
  },
  {
    num: '02',
    tag: 'הניתוח',
    title: 'קריאה שקטה של אלף בשמים.',
    desc: 'המודל קורא את התשובות שלך מול קטלוג של מעל 1,000 בשמים — תווי ראש, לב ובסיס, אקורדים ומשפחות ריח. לא שמות בקבוקים, אלא מה שיש בתוכם.',
    gold: null,
  },
  {
    num: '03',
    tag: 'ההמלצות',
    title: 'עשרה בשמים, וסיבה לכל אחד.',
    desc: 'לא דירוג ולא אחוזים. עשר התאמות מסודרות מהקרובה ביותר אליך כלפי מטה — כל אחת עם הסבר ריחני בעברית למה דווקא היא תיישב עליך.',
    gold: '״זה מתאים לך כי…״',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{ padding: 'var(--s10) var(--s3)', position: 'relative' }}
    >
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>

        {/* Section head — left-aligned editorial */}
        <div className="ed-vs-head" style={{ marginBottom: 'var(--s6)' }}>
          <span
            style={{
              fontSize: 10.5,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span aria-hidden="true" style={{ width: 18, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
            איך זה עובד
          </span>
          <h2 className="ed-h">
            שלושה שלבים,{' '}
            <em style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: 'var(--gold)' }}>
              לפני שאתה מתחייב.
            </em>
          </h2>
        </div>

        {/* Editorial numbered sequence */}
        <div className="flow">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="flow-row"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flow-num">
                {step.num}
                <small>{step.tag}</small>
              </div>
              <div className="flow-body">
                <h3 className="flow-title">{step.title}</h3>
                <p className="flow-desc">
                  {step.desc}
                  {step.gold && (
                    <> <span className="flow-gold">{step.gold}</span></>
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing note — AI narrows down, it doesn't replace smelling */}
        <p
          style={{
            marginTop: 'var(--s6)',
            fontSize: 13,
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            maxWidth: 520,
          }}
        >
          מכאן הכדור אצלך — תבקש דוגמית לכל המלצה ותריח בעצמך, לפני שאתה משלם על בקבוק שלם.
        </p>
      </div>
    </section>
  );
}
