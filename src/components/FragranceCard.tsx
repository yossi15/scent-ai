'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { useAuth, SignInButton } from '@clerk/nextjs';
import type { Fragrance } from '@/data/fragrances';

const familyGradients: Record<string, string> = {
  'Amber':           'from-amber-200/80 via-orange-100/60 to-yellow-100/50',
  'Amber Floral':    'from-rose-200/60 via-amber-100/50 to-pink-100/50',
  'Amber Spicy':     'from-red-200/70 via-orange-100/60 to-amber-100/50',
  'Amber Vanilla':   'from-amber-200/80 via-orange-100/60 to-yellow-100/50',
  'Amber Woody':     'from-amber-300/60 via-stone-100/50 to-orange-100/50',
  'Animalic':        'from-stone-400/60 via-amber-200/50 to-stone-100/50',
  'Aromatic':        'from-green-200/60 via-emerald-100/50 to-teal-100/50',
  'Aromatic Aquatic':'from-blue-200/60 via-cyan-100/50 to-teal-100/50',
  'Aromatic Citrus': 'from-teal-200/60 via-cyan-100/50 to-blue-100/40',
  'Aromatic Floral': 'from-emerald-200/60 via-green-100/50 to-lime-100/50',
  'Aromatic Fougere':'from-green-200/60 via-emerald-100/50 to-teal-100/50',
  'Aromatic Spicy':  'from-teal-100/60 via-emerald-100/50 to-amber-100/40',
  'Chypre Leather':  'from-stone-400/60 via-amber-200/50 to-stone-100/50',
  'Citrus':          'from-yellow-200/70 via-lime-100/60 to-green-100/50',
  'Citrus Aromatic': 'from-yellow-200/70 via-lime-100/60 to-green-100/50',
  'Citrus Green':    'from-lime-200/70 via-green-100/60 to-emerald-100/50',
  'Floral':          'from-pink-200/60 via-rose-100/50 to-fuchsia-100/50',
  'Floral Fruity':   'from-rose-200/60 via-pink-100/50 to-fuchsia-100/50',
  'Floral Green':    'from-green-200/60 via-emerald-100/50 to-lime-100/50',
  'Floral Powdery':  'from-rose-200/60 via-pink-100/50 to-amber-100/50',
  'Floral Woody':    'from-rose-200/60 via-pink-100/50 to-amber-100/50',
  'Leather':         'from-stone-400/60 via-amber-200/50 to-stone-100/50',
  'Woody':           'from-stone-200/60 via-amber-100/40 to-emerald-100/40',
  'Woody Aromatic':  'from-emerald-200/60 via-green-100/50 to-lime-100/50',
  'Woody Spicy':     'from-stone-300/60 via-red-100/50 to-amber-100/50',
};

const getGradient = (family: string) =>
  familyGradients[family] ?? 'from-stone-200/60 via-amber-100/50 to-stone-100/50';

interface Props {
  fragrance: Fragrance;
  index: number;
  onClick: (f: Fragrance) => void;
  inCollection: boolean;
  onToggleCollection: (f: Fragrance) => void;
  onBuy: (f: Fragrance) => void;
}

function BottleSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="38" y="8" width="24" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="36" y="18" width="28" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M44 24 L44 32 L56 32 L56 24" stroke="currentColor" strokeWidth="1.5" />
      <path d="M30 34 Q22 36 22 48 L22 118 Q22 128 32 128 L68 128 Q78 128 78 118 L78 48 Q78 36 70 34 L30 34 Z"
        stroke="currentColor" strokeWidth="1.5" />
      <rect x="32" y="60" width="36" height="40" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
    </svg>
  );
}

export default function FragranceCard({ fragrance: f, index, onClick, inCollection, onToggleCollection, onBuy }: Props) {
  const [imgError, setImgError] = useState(false);
  const { isSignedIn } = useAuth();
  const gradient = getGradient(f.family);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.4) }}
      className="card overflow-hidden group cursor-pointer hover:shadow-[0_20px_40px_-12px_rgba(196,168,130,0.22)] hover:border-gold-border hover:-translate-y-1 transition-all duration-500 flex flex-col"
      onClick={() => onClick(f)}
    >
      {/* Gradient header with bottle */}
      <div className={`relative h-44 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden shrink-0`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.5),transparent_70%)] pointer-events-none" />
        {!imgError && f.image ? (
          <div className="relative w-16 h-28 z-10 drop-shadow-lg group-hover:scale-105 transition-transform duration-500">
            <Image
              src={f.image}
              alt={f.name}
              fill
              sizes="96px"
              className="object-contain"
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          <BottleSilhouette className="w-14 h-24 text-ink opacity-20 z-10" />
        )}
        {/* Rating badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-1.5 py-0.5">
          <Star className="w-2.5 h-2.5 text-gold fill-gold" />
          <span className="text-[10px] font-sans font-semibold text-ink">{f.rating}</span>
        </div>
        {/* Family badge */}
        <div className="absolute top-2.5 right-2.5">
          <span className="text-[9px] font-sans bg-white/90 backdrop-blur-sm text-ink-muted px-2 py-0.5 rounded-full" dir="ltr">
            {f.family}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-gold text-[9px] tracking-[0.2em] uppercase font-sans font-semibold mb-0.5 truncate" dir="ltr">
          {f.house}
        </p>
        <h3 className="font-serif text-[15px] text-ink group-hover:text-gold-dark transition-colors duration-300 font-semibold leading-tight mb-1 truncate" dir="ltr">
          {f.name}
        </h3>
        <p className="text-ink-faint text-[10px] font-sans mb-3" dir="ltr">
          {f.year} · {f.concentration} · {f.gender}
        </p>

        {/* Performance micro-bars */}
        <div className="space-y-1 mb-3">
          {[
            { label: 'עמידות', val: f.longevity },
            { label: 'הקרנה', val: f.sillage },
          ].map(({ label, val }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-[9px] font-hebrew text-ink-faint w-8 shrink-0">{label}</span>
              <div className="flex-1 h-1 bg-bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(val / 10) * 100}%`,
                    background: 'linear-gradient(to right, #8B7355, #C4A882)',
                  }}
                />
              </div>
              <span className="text-[9px] font-sans text-gold font-semibold w-4 text-left">{val}</span>
            </div>
          ))}
        </div>

        {/* Price + actions */}
        <div className="mt-auto pt-3 border-t border-black/[0.05] flex items-center justify-between gap-2" dir="ltr">
          <span className="font-serif text-lg text-gold font-bold">₪{f.price.toLocaleString()}</span>
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {/* Buy */}
            <button
              aria-label={`השווה מחירים עבור ${f.name}`}
              onClick={(e) => { e.stopPropagation(); onBuy(f); }}
              className="p-1.5 rounded-lg text-ink-faint hover:text-gold hover:bg-gold-faint transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </button>
            {/* Collect */}
            {isSignedIn ? (
              <button
                aria-label={inCollection ? `הסר מהאוסף` : `הוסף לאוסף`}
                onClick={(e) => { e.stopPropagation(); onToggleCollection(f); }}
                className={`p-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${inCollection ? 'text-gold' : 'text-ink-faint hover:text-gold hover:bg-gold-faint'}`}
              >
                <Heart className={`w-3.5 h-3.5 ${inCollection ? 'fill-gold' : ''}`} />
              </button>
            ) : (
              <SignInButton mode="modal">
                <button
                  aria-label="כנס להוספה לאוסף"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg text-ink-faint hover:text-gold hover:bg-gold-faint transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Heart className="w-3.5 h-3.5" />
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
