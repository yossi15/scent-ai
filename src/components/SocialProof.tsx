'use client';

import { motion } from 'framer-motion';
import { fragrances } from '@/data/fragrances';

const HOUSES = new Set(fragrances.map(f => f.house)).size;
const TOTAL  = fragrances.length;

const STATS = [
  { num: String(TOTAL), label: 'בשמים בקולקציה' },
  { num: String(HOUSES) + '+', label: 'בתי בושם נישתיים' },
  { num: '100%', label: 'בשמים מקוריים' },
  { num: 'AI', label: 'התאמה אישית חכמה' },
];

export default function SocialProof() {
  return (
    <section className="py-20 px-4 section-accent" aria-labelledby="socialproof-heading">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">המספרים</p>
          <h2 id="socialproof-heading" className="font-serif text-3xl md:text-4xl gold-text font-bold">
            הפלטפורמה בנתונים
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ num, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-6 text-center"
            >
              <p className="font-serif text-4xl font-bold gold-text mb-1">{num}</p>
              <p className="text-ink-muted text-xs font-hebrew">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
