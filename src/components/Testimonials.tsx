'use client';

import { motion } from 'framer-motion';

const reviews = [
  {
    name: 'דניאל מ.',
    city: 'תל אביב',
    badge: 'חבר 4 חודשים',
    initials: 'דמ',
    quote: 'מצאתי דרך SCENTORY את Kirke של Tiziana Terenzi — הבושם שחיפשתי שנתיים. לא הייתי מגיע אליו לבד בחיים.',
  },
  {
    name: 'יעל ר.',
    city: 'חיפה',
    badge: 'אספנית מאומתת',
    initials: 'יר',
    quote: 'השאלון הצליח לתפוס בדיוק את הסגנון שלי. ההמלצה הראשונה הייתה פגיעה ישירה — Molecule 01 של Escentric.',
  },
  {
    name: 'עמית כ.',
    city: 'רמת גן',
    badge: 'חבר 7 חודשים',
    initials: 'עכ',
    quote: 'קניתי Tobacco Vanille של Tom Ford בזכות ה-DNA שחיברתי לאוסף. לא האמנתי שאני בן אדם של גורמנד עד שניסיתי.',
  },
  {
    name: 'שירה ל.',
    city: 'ירושלים',
    badge: 'חברה 2 חודשים',
    initials: 'של',
    quote: 'סוף סוף יש מקום שמסביר הבדל בין EDT לEDP בלי לתת לי פרסומת. המידע אמיתי ועוזר.',
  },
  {
    name: 'נועם ב.',
    city: 'פתח תקווה',
    badge: 'אספן מאומת',
    initials: 'נב',
    quote: 'יש לי 40 בשמים באוסף. SCENTORY עזר לי לזהות שחסר לי בשם ים קיצי — ומצאתי בדיוק את מה שחיפשתי.',
  },
  {
    name: 'מיכל ד.',
    city: 'באר שבע',
    badge: 'חברה 5 חודשים',
    initials: 'מד',
    quote: 'ה"חתימה" שבניתי מהאוסף שלי הייתה מדויקת להפליא. הראיתי לבעלי וגם הוא התחיל להשתמש.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4" style={{ background: '#FAFAF7' }}>
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#999] mb-3">
            מה אומרים חברי SCENTORY
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] font-light">
            גילויים אמיתיים
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white border border-[#EBEBEB] p-6 flex flex-col gap-4"
              style={{ borderRadius: '2px' }}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, s) => (
                  <span key={s} className="text-[#C4A882] text-sm">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="font-hebrew text-sm text-[#3D3D3D] leading-relaxed flex-1">
                &ldquo;{r.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#F0EDE8]">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-sans font-medium text-white shrink-0"
                  style={{ background: '#C4A882' }}
                >
                  {r.initials}
                </div>
                <div>
                  <p className="text-xs font-sans font-medium text-[#1a1a1a]">{r.name}, {r.city}</p>
                  <p className="text-[10px] font-hebrew text-[#999] mt-0.5">{r.badge}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
