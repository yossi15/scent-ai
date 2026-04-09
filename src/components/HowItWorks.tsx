'use client';

import { motion } from 'framer-motion';
import { UserCircle, Brain, Package } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: <UserCircle className="w-6 h-6" />,
    title: 'בנה את הפרופיל שלך',
    desc: 'ספר לנו אילו בשמים אתה אוהב, מה המצב רוח שלך, ואיזה ריחות תופסים אותך. ה-AI בונה מפת DNA ריחנית ייחודית.',
  },
  {
    num: '02',
    icon: <Brain className="w-6 h-6" />,
    title: 'ה-AI מנתח ומתאים',
    desc: 'האלגוריתם שלנו סורק מאות בשמי נישה, מנתח את פירמידת הריח של כל אחד, ומוצא את ההתאמה המושלמת לפרופיל שלך.',
  },
  {
    num: '03',
    icon: <Package className="w-6 h-6" />,
    title: 'קבל את הבושם הבא שלך',
    desc: 'דגימות מבוקרות מגיעות עד הדלת. התנסה, דרג ביומן, וצפה איך ה-AI משתפר עם כל פידבק שאתה נותן.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">
            HOW IT WORKS
          </p>
          <h2 className="font-serif text-4xl md:text-5xl gold-text mb-3 font-bold">
            איך זה עובד
          </h2>
          <p className="text-ink-muted text-sm font-hebrew max-w-md mx-auto font-light">
            שלושה צעדים פשוטים לגלות את הבושם המושלם עבורך
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center"
            >
              {/* Number */}
              <span className="font-serif text-5xl text-gold/10 font-bold block mb-2" dir="ltr">
                {step.num}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gold-faint flex items-center justify-center text-gold mx-auto mb-4">
                {step.icon}
              </div>

              <h3 className="font-serif text-xl text-ink font-semibold mb-2">{step.title}</h3>
              <p className="text-ink-muted text-sm font-hebrew leading-relaxed font-light">{step.desc}</p>

              {/* Connector line on desktop */}
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -left-4 w-8 h-px bg-gold-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
