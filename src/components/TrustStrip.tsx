'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, CreditCard, RotateCcw, Star } from 'lucide-react';

const ITEMS = [
  { icon: ShieldCheck, label: 'בשמים מקוריים בלבד' },
  { icon: CreditCard,  label: 'תשלום מאובטח' },
  { icon: RotateCcw,   label: 'ביטול בכל עת' },
  { icon: Star,        label: 'חוות דעת מאומתות' },
];

export default function TrustStrip() {
  return (
    <motion.aside
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-8 px-4 border-t border-b border-black/[0.05] bg-bg-secondary"
      aria-label="אותות אמינות"
    >
      <ul className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8" role="list">
        {ITEMS.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
            <span className="text-ink-muted text-xs font-hebrew">{label}</span>
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}
