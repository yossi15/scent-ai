'use client';

import { motion } from 'framer-motion';
import { Lock, CreditCard, BadgeCheck } from 'lucide-react';

const partners = [
  { icon: <CreditCard className="w-4 h-4" />,  label: 'Stripe',             sub: 'תשלומים מאובטחים' },
  { icon: <Lock className="w-4 h-4" />,        label: 'SSL / HTTPS',        sub: 'הצפנה מלאה' },
  { icon: <BadgeCheck className="w-4 h-4" />,  label: 'Verified Authentic', sub: 'אימות מקור' },
];

export default function SocialProof() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
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
