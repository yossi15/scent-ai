'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Star, Clock, Wind, Plus, Check } from 'lucide-react';
import { useAuth, SignInButton } from '@clerk/nextjs';
import type { Fragrance } from '@/data/fragrances';

interface Props {
  fragrance: Fragrance;
  index: number;
  onClick: (f: Fragrance) => void;
  inCollection?: boolean;
  onToggleCollection?: (f: Fragrance) => void;
  onBuy?: (f: Fragrance) => void;
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

export default function FragranceCard({ fragrance, index, onClick, inCollection, onToggleCollection, onBuy }: Props) {
  const initials = fragrance.house.split(' ').map(w => w[0]).join('').slice(0, 3);
  const [imgError, setImgError] = useState(false);
  const showImage = !!fragrance.image && !imgError;
  const { isSignedIn } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4 }}
      className="relative group cursor-pointer"
    >
      {/* Light boutique card */}
      <div className="relative bg-white rounded-2xl overflow-hidden border border-[#E8E4DC] shadow-[0_2px_8px_rgba(13,13,13,0.04)] group-hover:shadow-[0_24px_48px_-16px_rgba(139,115,85,0.18)] group-hover:border-[#C4A882]/50 transition-all duration-500">
        {/* Bottle showcase area — cream */}
        <div
          role="button"
          tabIndex={0}
          aria-label={`${fragrance.name} מאת ${fragrance.house} — פתח פרטים`}
          className="relative h-64 w-full bg-[#F5F3EE] overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A882] focus-visible:ring-offset-2"
          onClick={() => onClick(fragrance)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(fragrance); } }}
        >
          {/* Soft radial highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.6),transparent_70%)] pointer-events-none" />

          {/* House name watermark */}
          <div className="absolute bottom-3 right-0 left-0 text-center opacity-[0.06] pointer-events-none">
            <p className="font-serif text-5xl font-bold tracking-tighter text-[#0D0D0D]" dir="ltr">
              {initials}
            </p>
          </div>

          {/* Bottle image — contain + 24px padding */}
          <div className="relative h-full flex items-center justify-center" style={{ padding: '24px' }}>
            {showImage ? (
              <div className="relative w-full h-full">
                <Image
                  src={fragrance.image}
                  alt={`${fragrance.name} by ${fragrance.house}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 240px"
                  className="object-contain drop-shadow-[0_8px_16px_rgba(13,13,13,0.12)] group-hover:scale-105 transition-transform duration-500"
                  onError={() => setImgError(true)}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0.3 }}
                whileHover={{ opacity: 0.5, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="text-[#8B7355]"
                aria-hidden="true"
              >
                <BottleSilhouette className="w-20 h-28 transition-all duration-500" />
              </motion.div>
            )}
          </div>

          {/* Rating badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-md rounded-full px-2.5 py-1 shadow-sm border border-[#E8E4DC]">
            <Star className="w-3 h-3 text-[#C4A882] fill-[#C4A882]" />
            <span className="text-[#0D0D0D] text-[11px] font-sans font-semibold">{fragrance.rating}</span>
          </div>

          {/* Add to collection */}
          {onToggleCollection && (
            isSignedIn ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onToggleCollection(fragrance); }}
                aria-label={inCollection ? `הסר את ${fragrance.name} מהאוסף שלי` : `הוסף את ${fragrance.name} לאוסף שלי`}
                aria-pressed={inCollection}
                className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md backdrop-blur-md border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A882] focus-visible:ring-offset-2 ${
                  inCollection
                    ? 'bg-[#8B7355] text-white border-[#8B7355]'
                    : 'bg-white/95 border-[#E8E4DC] text-[#4A4A4A] hover:bg-[#8B7355] hover:text-white hover:border-[#8B7355]'
                }`}
              >
                {inCollection ? <Check className="w-4 h-4" aria-hidden="true" /> : <Plus className="w-4 h-4" aria-hidden="true" />}
              </motion.button>
            ) : (
              <SignInButton mode="modal">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()}
                  aria-label="כנס כדי להוסיף לאוסף"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md backdrop-blur-md border bg-white/95 border-[#E8E4DC] text-[#4A4A4A] hover:bg-[#8B7355] hover:text-white hover:border-[#8B7355] transition-all duration-300"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                </motion.button>
              </SignInButton>
            )
          )}

          {/* Family tag */}
          <div className="absolute bottom-3 left-3">
            <span className="text-[10px] font-sans bg-[#ECEAE4] text-[#4A4A4A] px-2.5 py-1 rounded-full shadow-sm border border-[#D4D0C8]" dir="ltr">
              {fragrance.family}
            </span>
          </div>

          {/* Concentration badge */}
          <div className="absolute bottom-3 right-3">
            <span className="text-[10px] font-sans bg-[#0D0D0D] text-white px-2.5 py-1 rounded-full shadow-sm font-medium" dir="ltr">
              {fragrance.concentration}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 bg-white border-t border-[#E8E4DC]" onClick={() => onClick(fragrance)}>
          <p className="text-[#8B7355] text-[10px] tracking-[0.18em] uppercase font-sans font-semibold mb-1" dir="ltr">
            {fragrance.house}
          </p>

          <h3 className="font-serif text-xl text-[#0D0D0D] group-hover:text-[#8B7355] transition-colors duration-300 font-semibold leading-tight mb-1" dir="ltr">
            {fragrance.name}
          </h3>

          <p className="text-[#9A9A9A] text-[11px] font-sans mb-3" dir="ltr">
            {fragrance.year} &middot; {fragrance.gender} &middot; {fragrance.size}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex items-center gap-1.5 bg-[#F5F3EE] rounded-lg px-2.5 py-1.5 border border-[#E8E4DC]">
              <Clock className="w-3 h-3 text-[#8B7355] flex-shrink-0" />
              <div className="flex items-center gap-1 min-w-0">
                <span className="text-[10px] text-[#4A4A4A] font-hebrew">עמידות</span>
                <span className="text-[11px] font-sans font-semibold text-[#0D0D0D]">{fragrance.longevity}/10</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F5F3EE] rounded-lg px-2.5 py-1.5 border border-[#E8E4DC]">
              <Wind className="w-3 h-3 text-[#8B7355] flex-shrink-0" />
              <div className="flex items-center gap-1 min-w-0">
                <span className="text-[10px] text-[#4A4A4A] font-hebrew">הקרנה</span>
                <span className="text-[11px] font-sans font-semibold text-[#0D0D0D]">{fragrance.sillage}/10</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4" dir="ltr">
            {fragrance.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[10px] font-sans bg-[#ECEAE4] text-[#4A4A4A] px-2 py-0.5 rounded-full border border-[#D4D0C8]">
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-[#E8E4DC] flex items-center justify-between" dir="ltr">
            <div>
              <p className="text-[9px] text-[#9A9A9A] font-sans uppercase tracking-wider mb-0.5">Price</p>
              <span className="font-serif text-xl font-bold" style={{ color: '#8B7355' }}>₪{fragrance.price.toLocaleString()}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onBuy) onBuy(fragrance);
                else window.open(`https://www.google.com/search?tbm=shop&q=${encodeURIComponent(fragrance.name + ' ' + fragrance.house + ' perfume')}`, '_blank');
              }}
              aria-label={`השווה מחירים עבור ${fragrance.name}`}
              className="text-[11px] font-hebrew font-semibold text-white bg-[#8B7355] hover:bg-[#0D0D0D] transition-colors rounded-full px-4 py-2 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A882] focus-visible:ring-offset-2"
            >
              השווה מחירים
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
