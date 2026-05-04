'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    initials: 'ד.כ',
    name: 'דניאל כ.',
    scent: 'Maison Francis Kurkdjian — Grand Soir',
    stars: 5,
    text: 'הגעתי עם שמות מוכרים בלבד. אחרי השאלון גיליתי Grand Soir — ולא האמנתי כמה הוא קרוב לטעם שלי. חסך לי חודשים של ניסויים.',
  },
  {
    initials: 'מ.ל',
    name: 'מיכל ל.',
    scent: 'Baccarat Rouge 540',
    stars: 5,
    text: 'אף פעם לא הצלחתי להסביר מה בדיוק אני מחפשת. הפרופיל שיצרתי כאן הוביל אותי ל-Iris פודרי ועור — ומאז אני יודעת לחפש.',
  },
  {
    initials: 'א.ש',
    name: 'אורי ש.',
    scent: 'Tom Ford — Oud Wood',
    stars: 5,
    text: 'הרדאר ריחות פתח לי עיניים. מאז שגיליתי שאני נוטה למזרחי-עצי כל קנייה הרבה יותר מדויקת.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 px-4" style={{ background: '#F5EDE3' }}>
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] tracking-[0.22em] uppercase font-sans text-[#C4A882] mb-3">
            EARLY TESTERS
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#0D0D0D] font-light mb-4">
            מה אומרים הבודקים
          </h2>
          <p className="text-[#8B7355] text-sm font-hebrew font-light max-w-xs mx-auto leading-relaxed">
            משובים ממשתמשים שהצטרפו לפני ההשקה הרשמית
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="bg-white p-7 flex flex-col"
              style={{ borderRadius: '2px' }}
            >
              {/* Quote mark */}
              <span
                className="font-serif text-5xl leading-none mb-4 select-none"
                style={{ color: '#E0D8CC' }}
                aria-hidden
              >
                &ldquo;
              </span>

              <p className="text-sm font-hebrew text-[#3D3D3D] leading-relaxed flex-1 mb-6">
                {t.text}
              </p>

              {/* Stars */}
              <div className="flex gap-0.5 mb-5" dir="ltr">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} className="w-3 h-3" viewBox="0 0 12 12" fill="#C4A882">
                    <polygon points="6,0.5 7.6,4.2 11.7,4.5 8.7,7.1 9.7,11.1 6,8.9 2.3,11.1 3.3,7.1 0.3,4.5 4.4,4.2" />
                  </svg>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#F0EDE8]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: '#F5EDE3', border: '1px solid #E0D8CC' }}
                >
                  <span className="text-xs font-sans text-[#8B7355]" dir="ltr">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-hebrew text-[#0D0D0D] font-medium">{t.name}</p>
                  <p className="text-[11px] font-sans text-[#BFBAB4] font-light" dir="ltr">{t.scent}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
