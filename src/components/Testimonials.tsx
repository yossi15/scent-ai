'use client';

import { motion } from 'framer-motion';
import { Star, Quote, User } from 'lucide-react';

const testimonials = [
  {
    name: 'דניאל כ.',
    role: 'Early Tester',
    scent: 'Aventus',
    stars: 5,
    text: 'ה-AI הציע לי את Grand Soir ולא האמנתי כמה הוא דומה לטעם שלי. שירות ברמה אחרת.',
    color: 'bg-gradient-to-br from-amber-100 to-amber-200',
  },
  {
    name: 'מיכל ל.',
    role: 'Early Tester',
    scent: 'Baccarat Rouge 540',
    stars: 5,
    text: 'ניתוח ה-DNA הראה לי שאני נמשכת ל-Iris פודרי ועור עשן - ומיד הציע 3 בשמים שלא הכרתי, אחד מהם נכנס לאוסף הקבוע.',
    color: 'bg-gradient-to-br from-rose-100 to-rose-200',
  },
  {
    name: 'אורי ש.',
    role: 'Early Tester',
    scent: 'Oud Wood',
    stars: 5,
    text: 'הרדאר ריחות פתח לי את העיניים. גיליתי שאני נוטה למזרחי-עצי ומאז כל קנייה מדויקת.',
    color: 'bg-gradient-to-br from-emerald-100 to-emerald-200',
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 px-4 section-accent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">
            EARLY TESTERS
          </p>
          <h2 className="font-serif text-4xl md:text-5xl gold-text mb-3 font-bold">
            מה אומרים הבודקים הראשונים
          </h2>
          <p className="text-ink-muted text-sm font-hebrew max-w-md mx-auto font-light">
            משובים מקבוצת הבודקים המוקדמים שלנו
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-5"
            >
              <Quote className="w-6 h-6 text-gold/20 mb-3" />

              <p className="text-ink-secondary text-sm font-hebrew leading-relaxed mb-4">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-3.5 h-3.5 ${j < Math.floor(t.stars) ? 'text-gold fill-gold' : 'text-ink-faint/20'}`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-black/[0.04]">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center`}>
                    <User className="w-4 h-4 text-ink/40" />
                  </div>
                  <div>
                    <p className="text-ink font-hebrew text-sm font-medium">{t.name}</p>
                    <p className="text-ink-faint text-[11px] font-sans" dir="ltr">{t.role}</p>
                  </div>
                </div>
                <div className="text-left" dir="ltr">
                  <p className="text-[10px] text-ink-faint font-sans">favorite</p>
                  <p className="text-gold text-xs font-serif font-semibold">{t.scent}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
