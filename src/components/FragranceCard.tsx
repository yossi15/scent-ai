'use client';

import { motion } from 'framer-motion';
import { Star, Clock, Wind, Plus, Check, Droplets } from 'lucide-react';
import type { Fragrance } from '@/data/fragrances';

interface Props {
  fragrance: Fragrance;
  index: number;
  onClick: (f: Fragrance) => void;
  inCollection?: boolean;
  onToggleCollection?: (f: Fragrance) => void;
}

const familyGradients: Record<string, string> = {
  'Fruity Chypre': 'from-amber-100 via-yellow-50 to-lime-50',
  'Oriental Spicy': 'from-red-100 via-orange-50 to-amber-50',
  'Oriental Gourmand': 'from-amber-100 via-orange-50 to-yellow-50',
  'Aromatic Citrus': 'from-teal-100 via-cyan-50 to-blue-50',
  'Oriental Floral': 'from-purple-100 via-pink-50 to-rose-50',
  'Woody Aromatic': 'from-emerald-100 via-green-50 to-lime-50',
  'Woody Oriental': 'from-stone-200 via-amber-50 to-orange-50',
  'Floral Woody': 'from-rose-100 via-pink-50 to-amber-50',
  'Citrus Aromatic': 'from-yellow-100 via-lime-50 to-green-50',
  'Aromatic Fougère': 'from-green-100 via-emerald-50 to-teal-50',
  'Oriental Woody': 'from-amber-200 via-stone-100 to-orange-50',
  'Woody Spicy': 'from-stone-200 via-red-50 to-amber-50',
  'Green Aromatic': 'from-green-100 via-emerald-50 to-lime-50',
  'Musky Woody': 'from-stone-200 via-neutral-100 to-stone-50',
  'Leather': 'from-stone-300 via-amber-100 to-stone-100',
  'Smoky Woody': 'from-gray-200 via-stone-100 to-amber-50',
  'Amber Woody': 'from-amber-200 via-yellow-100 to-orange-50',
};

function getGradient(family: string): string {
  return familyGradients[family] || 'from-stone-100 via-amber-50 to-stone-50';
}

export default function FragranceCard({ fragrance, index, onClick, inCollection, onToggleCollection }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      className="card overflow-hidden cursor-pointer group"
    >
      {/* Gradient header */}
      <div
        className={`relative h-44 bg-gradient-to-br ${getGradient(fragrance.family)} overflow-hidden flex items-center justify-center`}
        onClick={() => onClick(fragrance)}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-4 right-4 w-24 h-24 rounded-full border border-current" />
          <div className="absolute bottom-6 left-6 w-16 h-16 rounded-full border border-current" />
        </div>

        {/* House initial + icon */}
        <div className="text-center relative z-10">
          <Droplets className="w-8 h-8 text-ink/20 mx-auto mb-2 group-hover:text-gold/40 transition-colors duration-500" />
          <p className="font-serif text-3xl text-ink/15 font-bold tracking-wider group-hover:text-ink/25 transition-colors duration-500" dir="ltr">
            {fragrance.house.split(' ').map(w => w[0]).join('')}
          </p>
        </div>

        {/* Rating badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full px-2 py-0.5 shadow-sm">
          <Star className="w-3 h-3 text-gold fill-gold" />
          <span className="text-ink text-[11px] font-sans font-semibold">{fragrance.rating}</span>
        </div>

        {/* Add to collection button */}
        {onToggleCollection && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleCollection(fragrance); }}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all ${
              inCollection
                ? 'bg-gold text-white'
                : 'bg-white/80 backdrop-blur-sm text-ink-muted hover:bg-gold hover:text-white'
            }`}
          >
            {inCollection ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        )}

        {/* Family tag */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] font-sans bg-white/70 backdrop-blur-sm text-ink-muted px-2 py-0.5 rounded-full" dir="ltr">
            {fragrance.family}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4" onClick={() => onClick(fragrance)}>
        <p className="text-gold text-[10px] tracking-[0.15em] uppercase font-sans font-medium mb-0.5" dir="ltr">
          {fragrance.house}
        </p>

        <h3 className="font-serif text-lg text-ink group-hover:text-gold transition-colors duration-300 font-semibold leading-tight mb-1" dir="ltr">
          {fragrance.name}
        </h3>

        <p className="text-ink-faint text-[11px] font-sans mb-2.5" dir="ltr">
          {fragrance.concentration} &middot; {fragrance.gender}
        </p>

        <div className="flex items-center gap-3 mb-3" dir="ltr">
          <span className="stat-badge"><Clock className="w-3 h-3 text-gold/60" /><span className="font-medium">{fragrance.longevity}</span>/10</span>
          <span className="stat-badge"><Wind className="w-3 h-3 text-gold/60" /><span className="font-medium">{fragrance.sillage}</span>/10</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3" dir="ltr">
          {fragrance.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <div className="pt-3 border-t border-black/[0.04] flex items-center justify-between" dir="ltr">
          <span className="text-gold font-serif text-lg font-semibold">₪{fragrance.price.toLocaleString()}</span>
          <a
            href={`https://www.google.com/search?tbm=shop&q=${encodeURIComponent(fragrance.name + ' ' + fragrance.house + ' perfume')}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[11px] font-hebrew text-gold hover:text-gold/80 transition-colors no-underline border border-gold-border rounded-full px-3 py-1 hover:bg-gold-faint"
          >
            קנה עכשיו
          </a>
        </div>
      </div>
    </motion.div>
  );
}
