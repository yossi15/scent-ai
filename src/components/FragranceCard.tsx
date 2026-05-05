'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Plus, Check } from 'lucide-react';
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

export default function FragranceCard({
  fragrance,
  index,
  onClick,
  inCollection,
  onToggleCollection,
  onBuy,
}: Props) {
  const [imgError, setImgError] = useState(false);
  const { isSignedIn } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.03 }}
      className="group cursor-pointer"
    >
      {/* Image area */}
      <div
        className="relative overflow-hidden mb-3"
        style={{ aspectRatio: '3/4', background: '#F7F6F3' }}
        role="button"
        tabIndex={0}
        aria-label={`${fragrance.name} — פתח פרטים`}
        onClick={() => onClick(fragrance)}
        onKeyDown={e => { if (e.key === 'Enter') onClick(fragrance); }}
      >
        {fragrance.image && !imgError ? (
          <Image
            src={fragrance.image}
            alt={`${fragrance.name} by ${fragrance.house}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-4xl text-[#d4d0c8]">
              {fragrance.house.slice(0, 2)}
            </span>
          </div>
        )}

        {/* Collection toggle — top-right, minimal */}
        {onToggleCollection && (
          isSignedIn ? (
            <button
              onClick={e => { e.stopPropagation(); onToggleCollection(fragrance); }}
              aria-label={inCollection ? 'הסר מהאוסף' : 'הוסף לאוסף'}
              className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all ${
                inCollection
                  ? 'bg-[#1a1a1a] text-white'
                  : 'bg-white/80 text-[#999] opacity-0 group-hover:opacity-100'
              }`}
            >
              {inCollection
                ? <Check className="w-3.5 h-3.5" />
                : <Plus className="w-3.5 h-3.5" />}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button
                onClick={e => e.stopPropagation()}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/80 text-[#999] opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </SignInButton>
          )
        )}

        {/* Rating — top-left, minimal */}
        <div className="absolute top-3 left-3 text-[10px] font-sans text-[#999] bg-white/70 px-1.5 py-0.5">
          ★ {fragrance.rating}
        </div>
      </div>

      {/* Text block */}
      <div onClick={() => onClick(fragrance)}>
        {/* House */}
        <p
          className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#999] mb-1"
          dir="ltr"
        >
          {fragrance.house}
        </p>

        {/* Name */}
        <h3
          className="font-serif text-[19px] font-light text-[#1a1a1a] leading-tight mb-1 group-hover:opacity-60 transition-opacity"
          dir="ltr"
        >
          {fragrance.name}
        </h3>

        {/* Meta — year · gender · concentration */}
        <p className="text-[11px] font-sans text-[#bbb] mb-3" dir="ltr">
          {fragrance.year} · {fragrance.concentration}
        </p>

        {/* Price + buy */}
        <div className="flex items-center justify-between">
          <span className="font-sans text-sm text-[#1a1a1a] font-medium">
            ₪{fragrance.price.toLocaleString()}
          </span>
          <button
            onClick={e => {
              e.stopPropagation();
              if (onBuy) onBuy(fragrance);
              else window.open(
                `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(fragrance.name + ' ' + fragrance.house)}`,
                '_blank'
              );
            }}
            className="text-[10px] tracking-[0.15em] uppercase font-sans text-[#666] hover:text-[#1a1a1a] transition-colors border-b border-transparent hover:border-[#1a1a1a] pb-px"
          >
            השווה מחירים
          </button>
        </div>
      </div>
    </motion.div>
  );
}
