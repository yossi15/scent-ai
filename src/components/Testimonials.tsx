'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'ניר כהן',
    initials: 'נ',
    rating: 5,
    text: 'מצאתי את הבושם המושלם אחרי שנים של חיפוש. השאלון והאלגוריתם עבדו מדהים — ממש הבינו את הטעם שלי.',
    detail: 'גילה את Dior Sauvage EDP',
  },
  {
    name: 'מיכל לוי',
    initials: 'מ',
    rating: 5,
    text: 'הפלטפורמה הכי טובה לבשמים שיצא לי להשתמש בה. הפירמידות, ביצועים, המחירים — הכל במקום אחד.',
    detail: 'אספה 12 בשמים לקולקציה',
  },
  {
    name: 'יובל אברהם',
    initials: 'י',
    rating: 5,
    text: 'הייתי בחנות בלי מושג מה לקנות. נכנסתי לשאלון, קיבלתי 3 המלצות — קניתי את הראשונה ואני מרוצה מאוד.',
    detail: 'חסך ₪400 בעזרת השוואת מחירים',
  },
  {
    name: 'שירה אוחיון',
    initials: 'ש',
    rating: 5,
    text: 'החיפוש לפי עונה ואירוע מדהים. מצאתי בשמים לקיץ, לחורף וכמה בשמים לערב — הכל תוך דקות.',
    detail: 'גילתה קולקציה שלמה לחורף',
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 px-4 section-accent" aria-labelledby="testimonials-heading">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">חוות דעת</p>
          <h2 id="testimonials-heading" className="font-serif text-4xl md:text-5xl gold-text font-bold">
            מה אומרים המשתמשים
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map(({ name, initials, rating, text, detail }, i) => (
            <motion.blockquote
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-6 flex flex-col"
            >
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: rating }, (_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-gold fill-gold" aria-hidden="true" />
                ))}
              </div>
              <p className="text-ink-secondary text-sm font-hebrew leading-relaxed font-light flex-1 mb-4">
                &ldquo;{text}&rdquo;
              </p>
              <footer className="flex items-center gap-3 pt-3 border-t border-black/[0.05]">
                <div className="w-8 h-8 rounded-full bg-gold-faint border border-gold-border flex items-center justify-center shrink-0">
                  <span className="text-gold text-sm font-serif font-bold">{initials}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-ink text-xs font-semibold font-hebrew">{name}</p>
                  <p className="text-ink-faint text-[10px] font-hebrew truncate">{detail}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
