'use client';

import { motion } from 'framer-motion';
import { Star, Clock, Wind } from 'lucide-react';
import type { Fragrance } from '@/data/fragrances';

interface Props {
  fragrance: Fragrance;
  index: number;
  onClick: (f: Fragrance) => void;
}

export default function FragranceCard({ fragrance, index, onClick }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={() => onClick(fragrance)}
      className="glass-card glass-card-hover rounded-2xl p-5 cursor-pointer group transition-all duration-500"
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">
        {fragrance.image}
      </div>

      <p className="text-gold/70 text-[10px] tracking-[0.2em] uppercase font-sans mb-1" dir="ltr">
        {fragrance.house}
      </p>

      <h3 className="font-serif text-lg text-ink group-hover:text-gold transition-colors duration-300 mb-1" dir="ltr">
        {fragrance.name}
      </h3>

      <p className="text-ink-muted/50 text-xs font-sans mb-3" dir="ltr">
        {fragrance.family} &middot; {fragrance.year}
      </p>

      <div className="flex items-center gap-1 mb-3" dir="ltr">
        <Star className="w-3 h-3 text-gold fill-gold" />
        <span className="text-gold text-xs font-sans font-medium">{fragrance.rating}</span>
        <span className="text-ink-muted/40 text-xs font-sans mr-1">{fragrance.concentration}</span>
      </div>

      <div className="flex items-center gap-4 text-ink-muted/50 text-[10px] font-hebrew" dir="ltr">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {fragrance.longevity}/10
        </span>
        <span className="flex items-center gap-1">
          <Wind className="w-3 h-3" />
          {fragrance.sillage}/10
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3" dir="ltr">
        {fragrance.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-[9px] tracking-wider uppercase px-2 py-0.5 border border-gold/15 text-gold/60 font-sans"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-ink/5" dir="ltr">
        <span className="text-gold font-serif text-lg">₪{fragrance.price.toLocaleString()}</span>
        <span className="text-ink-muted/40 text-xs font-sans ml-1">/ {fragrance.size}</span>
      </div>
    </motion.div>
  );
}
