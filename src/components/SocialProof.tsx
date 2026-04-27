'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Shield, Award, Lock, CreditCard, BadgeCheck } from 'lucide-react';

const partners = [
  { icon: <CreditCard className="w-4 h-4" />,  label: 'Stripe',             sub: 'תשלומים מאובטחים' },
  { icon: <Lock className="w-4 h-4" />,        label: 'SSL / HTTPS',        sub: 'הצפנה מלאה' },
  { icon: <BadgeCheck className="w-4 h-4" />,  label: 'Verified Authentic', sub: 'אימות מקור' },
];

const stats = [
  { icon: <TrendingUp className="w-5 h-5" />, value: 'חדש',  label: 'משתמשים מצטרפים כל יום' },
  { icon: <Award className="w-5 h-5" />,      value: '342',  label: 'בשמים מובחרים במאגר' },
  { icon: <Shield className="w-5 h-5" />,     value: '100%', label: 'מוצרים אותנטיים' },
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

        {/* Powered by */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-ink-muted text-[11px] font-hebrew mb-6 font-light tracking-wider">
            מאובטח על ידי
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {partners.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-bg-card shadow-sm"
              >
                <span className="text-gold">{p.icon}</span>
                <div className="text-right">
                  <p className="font-serif text-sm text-ink font-semibold leading-tight" dir="ltr">{p.label}</p>
                  <p className="text-ink-secondary text-[10px] font-hebrew font-light">{p.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
