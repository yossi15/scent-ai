'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'דניאל כהן',
    role: 'אספן בשמים',
    scent: 'Aventus',
    stars: 5,
    text: 'ה-AI הציע לי את Grand Soir ולא האמנתי כמה הוא דומה לטעם שלי. קניתי בקבוק מלא באותו שבוע. שירות ברמה אחרת.',
  },
  {
    name: 'מיכל לוי',
    role: 'בלוגרית יוקרה',
    scent: 'Baccarat Rouge 540',
    stars: 5,
    text: 'הדגימות מגיעות באריזה מפוארת עם כרטיס אישי שמסביר למה ה-AI בחר כל בושם. ההשקעה בפרטים פה היא מטורפת.',
  },
  {
    name: 'אורי שמעון',
    role: 'יזם טכנולוגיה',
    scent: 'Oud Wood',
    stars: 5,
    text: 'הרדאר ריחות פתח לי את העיניים. גיליתי שאני נוטה למזרחי-עצי ומאז כל קנייה שלי מדויקת. חוסך לי המון כסף.',
  },
  {
    name: 'נועה ברק',
    role: 'מעצבת פנים',
    scent: 'Portrait of a Lady',
    stars: 4.5,
    text: 'היומן הוא הפיצ\'ר הכי חכם. אני מתעדת כל יום ורואה דפוסים שלא שמתי לב אליהם. השירות הזה שינה את הגישה שלי לבשמים.',
  },
  {
    name: 'תומר אביב',
    role: 'שף ומומחה ריחות',
    scent: 'Tobacco Vanille',
    stars: 5,
    text: 'כמי שעובד עם ריחות כל יום, אני אומר שהאלגוריתם כאן לגיטימי. ההתאמות מדויקות ומפתיעות בטוב. ממליץ בחום.',
  },
  {
    name: 'ליאור גולדשטיין',
    role: 'מנהל קרן השקעות',
    scent: 'Layton',
    stars: 5,
    text: 'חבילת הכספת שווה כל שקל. קיבלתי גישה ל-3 בשמים מוגבלים שלא זמינים בארץ. התחושה של מועדון VIP אמיתי.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 section-accent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">
            TESTIMONIALS
          </p>
          <h2 className="font-serif text-4xl md:text-5xl gold-text mb-3 font-bold">
            מה אומרים עלינו
          </h2>
          <p className="text-ink-muted text-sm font-hebrew max-w-md mx-auto font-light">
            אלפי חובבי בשמים כבר גילו את החתימה הריחנית שלהם
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
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
                    className={`w-3.5 h-3.5 ${j < Math.floor(t.stars) ? 'text-gold fill-gold' : j < t.stars ? 'text-gold fill-gold/50' : 'text-ink-faint/20'}`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-black/[0.04]">
                <div>
                  <p className="text-ink font-hebrew text-sm font-medium">{t.name}</p>
                  <p className="text-ink-faint text-[11px] font-hebrew">{t.role}</p>
                </div>
                <div className="text-left" dir="ltr">
                  <p className="text-[10px] text-ink-faint font-sans">הבושם שלי</p>
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
