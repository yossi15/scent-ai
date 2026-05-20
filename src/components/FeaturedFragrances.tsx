'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fragrances, type Fragrance } from '@/data/fragrances';

// Aventus=1015, BR540=1016, Sauvage EDP=846, Oud Wood=906
const FEATURED_IDS = [1015, 1016, 846, 906];
const FEATURED: Fragrance[] = FEATURED_IDS.map(id => fragrances.find(f => f.id === id)!).filter(Boolean);

const eyebrow: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '11px',
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: '#999',
};

const heading: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontWeight: 600,
  fontSize: 'clamp(32px, 5vw, 48px)',
  lineHeight: 1.1,
  letterSpacing: '-0.01em',
  color: '#000',
};

const houseStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '10px',
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: '#999',
};

const nameStyle: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontWeight: 500,
  fontSize: '22px',
  lineHeight: 1.2,
  color: '#000',
  letterSpacing: '-0.005em',
};

const linkStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '11px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: '#000',
  borderBottom: '1px solid #000',
  paddingBottom: '4px',
  display: 'inline-block',
};

function FeaturedCard({ fragrance }: { fragrance: Fragrance }) {
  const [err, setErr] = useState(false);
  return (
    <Link href={`/fragrance/${fragrance.id}`} className="group block">
      <div className="relative aspect-[3/4] bg-[#F5F2EC] mb-6 overflow-hidden">
        {!err && fragrance.image ? (
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="relative w-full h-full">
              <Image
                src={fragrance.image}
                alt={`${fragrance.name} מאת ${fragrance.house} — בקבוק בושם`}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                onError={() => setErr(true)}
              />
            </div>
          </div>
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: '#FAF8F3' }}
          >
            <span
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '60px',
                fontWeight: 400,
                color: '#6B6560',
                lineHeight: 1,
                userSelect: 'none',
              }}
              aria-hidden="true"
            >
              {fragrance.house.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div dir="ltr" className="text-center">
        <p style={houseStyle} className="mb-2">{fragrance.house}</p>
        <h3 style={nameStyle}>{fragrance.name}</h3>
      </div>
    </Link>
  );
}

export default function FeaturedFragrances() {
  return (
    <section
      className="py-32 px-6"
      style={{ background: '#FFFFFF' }}
      aria-labelledby="featured-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p style={eyebrow} className="mb-4">הקולקציה</p>
          <h2 id="featured-heading" style={heading}>נבחרים</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
          {FEATURED.map((f) => (
            <FeaturedCard key={f.id} fragrance={f} />
          ))}
        </div>

        <div className="text-center mt-20">
          <a href="#collection" style={linkStyle} className="hover:opacity-60 transition-opacity">
            לכל הקולקציה — {fragrances.length} ←
          </a>
        </div>
      </div>
    </section>
  );
}
