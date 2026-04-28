'use client';

import { motion } from 'framer-motion';
import { Lock, BadgeCheck, XCircle } from 'lucide-react';

const items = [
  { icon: <Lock className="w-4 h-4" />,       text: 'תשלום מאובטח עם Stripe' },
  { icon: <BadgeCheck className="w-4 h-4" />, text: 'מידע אותנטי על כל בושם' },
  { icon: <XCircle className="w-4 h-4" />,    text: 'ביטול מנוי בכל עת' },
];

export default function TrustStrip() {
  return (
    <section className="py-10 px-4 border-t border-black/[0.04] bg-bg-secondary/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {items.map((it, i) => (
            <div key={i} className="flex items-center justify-center gap-2.5 text-ink-muted">
              <span className="text-gold">{it.icon}</span>
              <span className="text-xs md:text-sm font-hebrew font-light">{it.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
