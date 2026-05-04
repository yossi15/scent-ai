'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'ספר לנו על הטעם שלך',
    desc: 'שבע שאלות קצרות — מה שאתה אוהב, איפה תרצה ללבוש, ואיזה ריח תופס אותך. כל תשובה בונה את הפרופיל הריחני שלך.',
  },
  {
    num: '02',
    title: 'אנחנו מוצאים את ההתאמה',
    desc: 'המערכת עוברת על מאות בשמים, מנתחת פירמידות ריח, ומדאיגה לך שלוש המלצות מדויקות מתוך הקולקציה.',
  },
  {
    num: '03',
    title: 'בנה את האוסף שלך',
    desc: 'שמור בשמים שאהבת, נהל יומן ריחות אישי, והשווה מחירים בין חנויות — הכל במקום אחד.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-28 px-4" style={{ background: '#FFFFFF' }}>
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] tracking-[0.22em] uppercase font-sans text-[#C4A882] mb-3">
            THE PROCESS
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#0D0D0D] font-light mb-4">
            איך זה עובד
          </h2>
          <p className="text-[#8B7355] text-sm font-hebrew max-w-sm mx-auto font-light leading-relaxed">
            שלושה צעדים פשוטים לגלות את הבושם שמדבר אליך
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-10 md:gap-16">
          {/* Thin connector line */}
          <div
            className="hidden md:block absolute"
            style={{
              top: '28px',
              right: 'calc(16.66% + 40px)',
              left: 'calc(16.66% + 40px)',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #E0D8CC 20%, #E0D8CC 80%, transparent)',
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="text-center relative"
            >
              {/* Number circle */}
              <div
                className="w-14 h-14 flex items-center justify-center mx-auto mb-6 relative z-10"
                style={{
                  border: '1px solid #E0D8CC',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                }}
              >
                <span
                  className="font-sans text-xs font-light tracking-[0.18em]"
                  style={{ color: '#C4A882' }}
                  dir="ltr"
                >
                  {step.num}
                </span>
              </div>

              <h3
                className="font-serif text-xl font-light mb-3"
                style={{ color: '#0D0D0D' }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm font-hebrew leading-relaxed font-light max-w-xs mx-auto"
                style={{ color: '#6B6B6B' }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <a
            href="#quiz"
            className="inline-flex items-center gap-2 text-sm font-hebrew text-[#8B7355] hover:text-[#0D0D0D] transition-colors duration-300 group"
          >
            <span>התחל עם השאלון</span>
            <span className="group-hover:translate-x-[-3px] transition-transform duration-200 inline-block">←</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
