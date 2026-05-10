'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Sparkles, Package } from 'lucide-react';

const STEPS = [
  {
    icon: ClipboardList,
    title: 'שאלון טעמים',
    desc: 'ענה על שאלות קצרות על העדפות הריח שלך — אנחנו מנתחים את התשובות בעזרת AI',
  },
  {
    icon: Sparkles,
    title: 'המלצה חכמה',
    desc: 'האלגוריתם שלנו מאתר את הבשמים המתאימים ביותר מתוך הקולקציה המיוחדת שלנו',
  },
  {
    icon: Package,
    title: 'גילוי ושמירה',
    desc: 'שמור בשמים לאוסף האישי שלך, השווה מחירים והזמן מהחנויות המובחרות בעולם',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-4" aria-labelledby="how-heading">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">איך זה עובד</p>
          <h2 id="how-heading" className="font-serif text-4xl md:text-5xl gold-text font-bold">
            התהליך
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="card p-8 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold-faint border border-gold-border flex items-center justify-center mx-auto mb-5">
                <Icon className="w-6 h-6 text-gold" />
              </div>
              <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold-border flex items-center justify-center mx-auto mb-4">
                <span className="text-gold text-xs font-sans font-bold">{i + 1}</span>
              </div>
              <h3 className="font-serif text-xl text-ink font-semibold mb-3">{title}</h3>
              <p className="text-ink-muted text-sm font-hebrew leading-relaxed font-light">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
