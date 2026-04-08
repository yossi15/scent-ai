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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={() => onClick(fragrance)}
      className="card p-5 cursor-pointer group"
    >
      {/* Emoji + Rating row */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl group-hover:scale-110 transition-transform duration-400">
          {fragrance.image}
        </span>
        <div className="flex items-center gap-1 bg-gold-faint rounded-full px-2 py-0.5">
          <Star className="w-3 h-3 text-gold fill-gold" />
          <span className="text-gold text-[11px] font-sans font-semibold">{fragrance.rating}</span>
        </div>
      </div>

      {/* House */}
      <p className="text-ink-faint text-[10px] tracking-[0.15em] uppercase font-sans mb-0.5" dir="ltr">
        {fragrance.house}
      </p>

      {/* Name */}
      <h3 className="font-serif text-xl text-ink group-hover:text-gold transition-colors duration-300 font-semibold mb-0.5 leading-tight" dir="ltr">
        {fragrance.name}
      </h3>

      {/* Family */}
      <p className="text-ink-faint text-[11px] font-sans mb-3" dir="ltr">
        {fragrance.family}
      </p>

      {/* Performance stats */}
      <div className="flex items-center gap-4 mb-3" dir="ltr">
        <span className="stat-badge">
          <Clock className="w-3 h-3 text-gold/60" />
          <span className="font-medium">{fragrance.longevity}</span>/10
        </span>
        <span className="stat-badge">
          <Wind className="w-3 h-3 text-gold/60" />
          <span className="font-medium">{fragrance.sillage}</span>/10
        </span>
        <span className="stat-badge text-[10px] text-ink-faint">{fragrance.concentration}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4" dir="ltr">
        {fragrance.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {/* Price */}
      <div className="pt-3 border-t border-black/[0.04]" dir="ltr">
        <span className="text-gold font-serif text-xl font-semibold">₪{fragrance.price.toLocaleString()}</span>
        <span className="text-ink-faint text-[11px] font-sans ml-1">/ {fragrance.size}</span>
      </div>
    </motion.div>
  );
}
