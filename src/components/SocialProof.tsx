'use client';

import { motion } from 'framer-motion';
import { Users, Shield, Award } from 'lucide-react';

const pressLogos = ['VOGUE', 'GQ', 'ESQUIRE', 'FORBES', 'ELLE', 'BAZAAR'];

const stats = [
  { icon: <Users className="w-5 h-5" />, value: '50,000+', label: 'חובבי בשמים פעילים' },
  { icon: <Award className="w-5 h-5" />, value: '200+', label: 'בשמי נישה במאגר' },
  { icon: <Shield className="w-5 h-5" />, value: '100%', label: 'מוצרים אותנטיים' },
];

export default function SocialProof() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-5 text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-gold-faint flex items-center justify-center text-gold mx-auto mb-3">
                {stat.icon}
              </div>
              <p className="font-serif text-2xl md:text-3xl text-gold font-bold" dir="ltr">{stat.value}</p>
              <p className="text-ink-muted text-xs font-hebrew font-light mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Press */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-ink-faint text-[11px] font-hebrew mb-6 font-light">כתבו עלינו ב</p>
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            {pressLogos.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="font-serif text-lg md:text-xl text-ink-faint/40 tracking-[0.1em] font-semibold select-none"
                dir="ltr"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
