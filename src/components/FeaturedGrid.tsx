'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { fragrances } from '@/data/fragrances';

// Top 4 fragrances to feature
const FEATURED_IDS = [1, 8, 7, 3]; // Aventus, BR540, Oud Wood, Naxos

export default function FeaturedGrid() {
  const featured = FEATURED_IDS
    .map(id => fragrances.find(f => f.id === id))
    .filter(Boolean) as typeof fragrances;

  return (
    <section className="px-6 pb-24" style={{ background: '#FAFAF7' }}>
      <div className="max-w-6xl mx-auto">

        {/* Label row */}
        <div className="flex items-center justify-between mb-8 border-t border-[#EBEBEB] pt-6">
          <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#999]">
            Featured
          </p>
          <button
            onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#999] hover:text-[#1a1a1a] transition-colors"
          >
            View All →
          </button>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((f, i) => (
            <FeaturedCard key={f.id} fragrance={f} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

function FeaturedCard({
  fragrance,
  index,
}: {
  fragrance: (typeof fragrances)[0];
  index: number;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group cursor-pointer"
      onClick={() =>
        document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
      }
    >
      {/* Image — 3:4 aspect, cream bg */}
      <div
        className="relative overflow-hidden mb-3"
        style={{ aspectRatio: '3/4', background: '#F7F6F3' }}
      >
        {fragrance.image && !imgError ? (
          <Image
            src={fragrance.image}
            alt={`${fragrance.name} by ${fragrance.house}`}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-contain p-8 group-hover:scale-103 transition-transform duration-700"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-5xl text-[#ddd]">
              {fragrance.house[0]}
            </span>
          </div>
        )}
      </div>

      {/* Text */}
      <p
        className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#999] mb-1"
        dir="ltr"
      >
        {fragrance.house}
      </p>
      <h3 className="font-serif text-[18px] font-light text-[#1a1a1a] leading-tight" dir="ltr">
        {fragrance.name}
      </h3>
    </motion.div>
  );
}
