'use client';

import { motion } from 'framer-motion';
import { Star, Clock, Wind, Plus, Check } from 'lucide-react';
import type { Fragrance } from '@/data/fragrances';

interface Props {
  fragrance: Fragrance;
  index: number;
  onClick: (f: Fragrance) => void;
  inCollection?: boolean;
  onToggleCollection?: (f: Fragrance) => void;
}

const familyGradients: Record<string, string> = {
  'Fruity Chypre': 'from-amber-200/80 via-yellow-100/60 to-lime-100/50',
  'Oriental Spicy': 'from-red-200/70 via-orange-100/60 to-amber-100/50',
  'Oriental Gourmand': 'from-amber-200/80 via-orange-100/60 to-yellow-100/50',
  'Aromatic Citrus': 'from-teal-200/60 via-cyan-100/50 to-blue-100/40',
  'Oriental Floral': 'from-purple-200/60 via-pink-100/50 to-rose-100/50',
  'Woody Aromatic': 'from-emerald-200/60 via-green-100/50 to-lime-100/50',
  'Woody Oriental': 'from-stone-300/60 via-amber-100/50 to-orange-100/50',
  'Floral Woody': 'from-rose-200/60 via-pink-100/50 to-amber-100/50',
  'Citrus Aromatic': 'from-yellow-200/70 via-lime-100/60 to-green-100/50',
  'Aromatic Fougère': 'from-green-200/60 via-emerald-100/50 to-teal-100/50',
  'Oriental Woody': 'from-amber-300/60 via-stone-100/50 to-orange-100/50',
  'Woody Spicy': 'from-stone-300/60 via-red-100/50 to-amber-100/50',
  'Green Aromatic': 'from-green-200/60 via-emerald-100/50 to-lime-100/50',
  'Musky Woody': 'from-stone-300/60 via-neutral-100/50 to-stone-100/50',
  'Leather': 'from-stone-400/60 via-amber-200/50 to-stone-100/50',
  'Smoky Woody': 'from-gray-300/60 via-stone-100/50 to-amber-100/50',
  'Amber Woody': 'from-amber-300/60 via-yellow-100/50 to-orange-100/50',
  'Floral': 'from-pink-200/60 via-rose-100/50 to-fuchsia-100/50',
  'Oud': 'from-amber-300/70 via-yellow-200/50 to-stone-200/50',
  'Gourmand': 'from-amber-200/70 via-orange-100/50 to-yellow-100/50',
  'Fresh Spicy': 'from-teal-100/60 via-emerald-100/50 to-amber-100/40',
  'Woody': 'from-stone-200/60 via-amber-100/40 to-emerald-100/40',
  'Marine': 'from-blue-200/60 via-cyan-100/50 to-teal-100/50',
};

function getGradient(family: string): string {
  return familyGradients[family] || 'from-stone-200/60 via-amber-100/50 to-stone-100/50';
}

// Elegant perfume bottle silhouette
function BottleSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cap */}
      <rect x="38" y="8" width="24" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="36" y="18" width="28" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      {/* Neck */}
      <path d="M44 24 L44 32 L56 32 L56 24" stroke="currentColor" strokeWidth="1.5" />
      {/* Bottle body */}
      <path
        d="M30 34 Q22 36 22 48 L22 118 Q22 128 32 128 L68 128 Q78 128 78 118 L78 48 Q78 36 70 34 L30 34 Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Label area */}
      <rect x="32" y="60" width="36" height="40" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
      {/* Shine */}
      <line x1="30" y1="50" x2="30" y2="100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

export default function FragranceCard({ fragrance, index, onClick, inCollection, onToggleCollection }: Props) {
  const initials = fragrance.house.split(' ').map(w => w[0]).join('').slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4 }}
      className="relative group cursor-pointer"
    >
      {/* Card container with shadow */}
      <div className="relative bg-bg-card rounded-2xl overflow-hidden border border-black/[0.04] shadow-[0_2px_8px_rgba(150,121,58,0.04)] group-hover:shadow-[0_20px_40px_-12px_rgba(150,121,58,0.18)] group-hover:border-gold-border transition-all duration-500">
        {/* Gradient header with bottle silhouette */}
        <div
          className={`relative h-56 bg-gradient-to-br ${getGradient(fragrance.family)} overflow-hidden`}
          onClick={() => onClick(fragrance)}
        >
          {/* Radial highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.6),transparent_70%)]" />

          {/* Decorative circles */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
            <div className="absolute top-4 right-4 w-28 h-28 rounded-full border border-current" />
            <div className="absolute top-8 right-8 w-20 h-20 rounded-full border border-current" />
            <div className="absolute bottom-6 left-6 w-14 h-14 rounded-full border border-current" />
          </div>

          {/* House name watermark */}
          <div className="absolute bottom-2 right-0 left-0 text-center opacity-[0.06] pointer-events-none">
            <p className="font-serif text-5xl font-bold tracking-tighter text-ink" dir="ltr">
              {initials}
            </p>
          </div>

          {/* Bottle silhouette — centered */}
          <div className="relative h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0.25 }}
              whileHover={{ opacity: 0.4, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="text-ink"
            >
              <BottleSilhouette className="w-20 h-28 transition-all duration-500 group-hover:text-gold" />
            </motion.div>
          </div>

          {/* Rating badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-md rounded-full px-2.5 py-1 shadow-sm border border-white/60">
            <Star className="w-3 h-3 text-gold fill-gold" />
            <span className="text-ink text-[11px] font-sans font-semibold">{fragrance.rating}</span>
          </div>

          {/* Add to collection button */}
          {onToggleCollection && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); onToggleCollection(fragrance); }}
              className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md backdrop-blur-md border transition-all duration-300 ${
                inCollection
                  ? 'bg-gold text-white border-gold'
                  : 'bg-white/90 border-white/60 text-ink-muted hover:bg-gold hover:text-white hover:border-gold'
              }`}
            >
              {inCollection ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </motion.button>
          )}

          {/* Family tag */}
          <div className="absolute bottom-3 left-3">
            <span className="text-[10px] font-sans bg-white/90 backdrop-blur-md text-ink-muted px-2.5 py-1 rounded-full shadow-sm border border-white/60" dir="ltr">
              {fragrance.family}
            </span>
          </div>

          {/* Concentration badge */}
          <div className="absolute bottom-3 right-3">
            <span className="text-[10px] font-sans bg-ink/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full shadow-sm" dir="ltr">
              {fragrance.concentration}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5" onClick={() => onClick(fragrance)}>
          <p className="text-gold text-[10px] tracking-[0.18em] uppercase font-sans font-semibold mb-1" dir="ltr">
            {fragrance.house}
          </p>

          <h3 className="font-serif text-xl text-ink group-hover:text-gold transition-colors duration-300 font-semibold leading-tight mb-1" dir="ltr">
            {fragrance.name}
          </h3>

          <p className="text-ink-faint text-[11px] font-sans mb-3" dir="ltr">
            {fragrance.year} &middot; {fragrance.gender} &middot; {fragrance.size}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex items-center gap-1.5 bg-bg-secondary rounded-lg px-2.5 py-1.5">
              <Clock className="w-3 h-3 text-gold/70 flex-shrink-0" />
              <div className="flex items-center gap-1 min-w-0">
                <span className="text-[10px] text-ink-faint font-hebrew">עמידות</span>
                <span className="text-[11px] font-sans font-semibold text-ink">{fragrance.longevity}/10</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-bg-secondary rounded-lg px-2.5 py-1.5">
              <Wind className="w-3 h-3 text-gold/70 flex-shrink-0" />
              <div className="flex items-center gap-1 min-w-0">
                <span className="text-[10px] text-ink-faint font-hebrew">הקרנה</span>
                <span className="text-[11px] font-sans font-semibold text-ink">{fragrance.sillage}/10</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4" dir="ltr">
            {fragrance.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[10px] font-sans bg-gold-faint text-gold px-2 py-0.5 rounded-full border border-gold-border/50">
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between" dir="ltr">
            <div>
              <p className="text-[9px] text-ink-faint font-sans uppercase tracking-wider mb-0.5">Price</p>
              <span className="text-gold font-serif text-xl font-bold">₪{fragrance.price.toLocaleString()}</span>
            </div>
            <a
              href={`https://www.google.com/search?tbm=shop&q=${encodeURIComponent(fragrance.name + ' ' + fragrance.house + ' perfume')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] font-hebrew font-medium text-white bg-gold hover:bg-ink transition-colors no-underline rounded-full px-4 py-2 shadow-sm"
            >
              קנה עכשיו
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
