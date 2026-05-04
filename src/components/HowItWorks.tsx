'use client';

import { motion } from 'framer-motion';
import { UserCircle, Brain, Heart } from 'lucide-react';

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
    desc: 'האלגוריתם שלנו סורק מאות בשמים, מנתח את פירמידת הריח של כל אחד, ומוצא את ההתאמה המושלמת לפרופיל שלך.',
  },
  {
    num: '03',
    icon: <Heart className="w-6 h-6" />,
    title: 'בנה את האוסף שלך',
    desc: 'שמור את הבשמים שדיברו אליך, נהל יומן ריחות אישי, והשווה מחירים בין חנויות עם לחיצה אחת.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 px-4 bg-[#FAF8F5]">
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

        <div className="relative grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Connector line — desktop */}
          <div className="hidden md:block absolute top-10 right-[16.66%] left-[16.66%] h-px bg-[#E8E4DC]" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center relative"
            >
              {/* Step number circle */}
              <div className="w-20 h-20 rounded-full bg-white border border-[#E8E4DC] shadow-sm flex flex-col items-center justify-center mx-auto mb-5 relative z-10">
                <span className="font-serif text-xs text-[#C4A882] font-medium tracking-widest uppercase" dir="ltr">0{i + 1}</span>
                <span className="text-[#8B7355] mt-0.5">{step.icon}</span>
              </div>

              <h3 className="font-serif text-xl text-[#0D0D0D] font-semibold mb-2">{step.title}</h3>
              <p className="text-[#6B6B6B] text-sm font-hebrew leading-relaxed font-light max-w-xs mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
