'use client';

import { motion } from 'framer-motion';
import BottleRound from '@/components/svg/BottleRound';

const POINTS = [
  'פירוק תווים מלא לכל המלצה — ראש, לב ובסיס — בשפה ברורה, בלי ז׳רגון.',
  'הסבר ריחני שמדבר אליך, לא מלל שיווקי ולא קסם.',
  'השוואת מחירים שקטה מול ספקים בארץ ובחו״ל.',
  'פרופיל שלומד ומתעדן ככל שאתה מספר לו מה אהבת.',
];

export default function WhyFeature() {
  return (
    <section
      style={{
        padding: 'var(--s10) var(--s3)',
        background: 'var(--bg-elev)',
        borderTop: '1px solid var(--border-default)',
        borderBottom: '1px solid var(--border-default)',
      }}
    >
      <div className="note-grid">

        {/* Left text column */}
        <motion.div
          className="note-lede"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
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
            השכבה החסרה
          </span>

          <h2 className="ed-h">
            לא רק מה.{' '}
            <em style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: 'var(--gold)' }}>
              גם למה.
            </em>
          </h2>

          <p>
            רוב האפליקציות יזרקו לך רשימה. SCENTORY כותב לך פתק — כמו יועץ שמכיר אותך,
            מסביר בשקט למה דווקא הבושם הזה יישב עליך, איך תווי הלב נפגשים עם הטעם שלך,
            ומה יישאר על העור בסוף היום.
          </p>

          <ul className="note-points">
            {POINTS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </motion.div>

        {/* The boutique consultant's note card */}
        <motion.figure
          className="note-card"
          aria-label="דוגמת המלצה"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ margin: 0 }}
        >
          <figcaption className="note-corner">ההתאמה הקרובה ביותר שלך</figcaption>

          <div className="note-bottle-wrap" aria-hidden="true">
            <BottleRound width={58} height={82} />
          </div>

          <div className="note-brand-label">Tom Ford</div>
          <div className="note-name-label">Tobacco Vanille</div>

          <div className="note-rule" />

          <p className="note-quote">
            ״הבחירה הזו כמעט מושלמת בשבילך.{' '}
            <span className="note-gold">החום של הטבק והוונילה</span>{' '}
            יושב בדיוק על מה שאמרת שאתה אוהב — אותו ׳חמים ועוטף׳ שסימנת בשאלון.
            הוא יישאר איתך עד הערב, וקרוב, לא צועק.״
          </p>

          <div className="note-sign">
            <span className="note-sign-name">— SCENTORY</span>
            <span className="note-sign-meta">EDP · 50ml · השארות לערב שלם</span>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
