'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { fragrances } from '@/data/fragrances';

const TOTAL = fragrances.length;

const FAQS = [
  {
    q: `כמה בשמים יש בקולקציה?`,
    a: `הקולקציה כוללת כרגע ${TOTAL} בשמים מאת 46+ בתי בושם נישתיים מובחרים מרחבי העולם. אנחנו מוסיפים בשמים חדשים באופן שוטף.`,
  },
  {
    q: 'האם הבשמים אמיתיים ולא מזויפים?',
    a: 'כל הבשמים בפלטפורמה הם בשמים מקוריים 100%. אנחנו מקשרים רק לחנויות מורשות ומהימנות ומספקים השוואת מחירים שקופה.',
  },
  {
    q: 'איך השאלון עובד?',
    a: 'השאלון מנתח את טעמי הריח שלך ומשתמש באלגוריתם AI כדי למצוא מתוך הקולקציה שלנו את הבשמים שהכי מתאימים לפרופיל שלך.',
  },
  {
    q: 'האם אפשר לבטל מנוי?',
    a: 'כן, ניתן לבטל את המנוי בכל עת ללא עלות נוספת. אין התחייבות והביטול מיידי.',
  },
  {
    q: 'מה ההבדל בין EDP ל-EDT?',
    a: 'EDP (Eau de Parfum) מכיל ריכוז גבוה יותר של חומרי ריח ולכן מחזיק מעמד זמן ארוך יותר ומורגש ממרחק. EDT (Eau de Toilette) קליל יותר ומתאים ליומיום.',
  },
  {
    q: 'כיצד אשמור את הבשמים שאני מוצא?',
    a: 'תוכל להוסיף כל בושם לאוסף האישי שלך. הנתונים נשמרים בחשבון המשתמש שלך כך שתוכל לגשת אליהם מכל מכשיר.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-28 px-4" aria-labelledby="faq-heading">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">שאלות נפוצות</p>
          <h2 id="faq-heading" className="font-serif text-4xl md:text-5xl gold-text font-bold">
            יש לך שאלות?
          </h2>
        </motion.div>

        <dl className="space-y-2">
          {FAQS.map(({ q, a }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="card overflow-hidden"
            >
              <dt>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-expanded={open === i}
                  aria-controls={`faq-${i}`}
                >
                  <span className="font-hebrew text-sm font-semibold text-ink">{q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gold shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
              </dt>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.dd
                    id={`faq-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-ink-secondary text-sm font-hebrew leading-relaxed font-light">
                      {a}
                    </p>
                  </motion.dd>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
