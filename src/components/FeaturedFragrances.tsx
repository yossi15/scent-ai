'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fragrances, type Fragrance } from '@/data/fragrances';

// Sauvage Elixir=858, Oud Wood=906, BR540=1016, Aventus=1015
const FEATURED_IDS = [858, 906, 1016, 1015];
const FEATURED: Fragrance[] = FEATURED_IDS.map(id => fragrances.find(f => f.id === id)!).filter(Boolean);

const TAGLINES: Record<number, string> = {
  858:  'עמוק, גולמי, בלתי נשכח — המהדורה האינטנסיבית',
  906:  'עץ ענוגה מהמזרח עם עדינות מערבית',
  1016: 'הניחוח הכי מדובר בעולם — ייחוסי ובלתי ניתן להתנגדות',
  1015: 'לאיש עם חזון — פרי ועשן, כוח ועדינות',
};

function FeaturedCard({ fragrance }: { fragrance: Fragrance }) {
  const [err, setErr] = useState(false);

  return (
    <Link href={`/fragrance/${fragrance.id}`} className="group block" aria-label={`${fragrance.name} מאת ${fragrance.house}`}>
      {/* Image */}
      <div
        className="relative overflow-hidden mb-6"
        style={{ aspectRatio: '3/4', background: '#F5F2EC' }}
      >
        {!err && fragrance.image ? (
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <div className="relative w-full h-full">
              <Image
                src={fragrance.image}
                alt={`${fragrance.name} מאת ${fragrance.house} — בקבוק בושם`}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                onError={() => setErr(true)}
              />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#FAF8F3' }}>
            <span
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '60px',
                fontWeight: 300,
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

      {/* Text */}
      <div dir="rtl">
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '9px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#6B6560',
            marginBottom: '6px',
          }}
        >
          {fragrance.house}
        </p>
        <h3
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 400,
            fontSize: '18px',
            color: '#1C1C1A',
            letterSpacing: '-0.005em',
            lineHeight: 1.2,
            marginBottom: '8px',
          }}
        >
          {fragrance.name}
        </h3>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: '11px',
            lineHeight: 1.6,
            color: '#6B6560',
          }}
        >
          {TAGLINES[fragrance.id] ?? `${fragrance.family} · ${fragrance.concentration}`}
        </p>
      </div>
    </Link>
  );
}

export default function FeaturedFragrances() {
  return (
    <section
      className="py-28 px-6"
      style={{ background: '#FFFFFF' }}
      aria-labelledby="featured-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20" dir="rtl">
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '9px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#6B6560',
              marginBottom: '12px',
            }}
          >
            הקולקציה שלנו
          </p>
          <h2
            id="featured-heading"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 400,
              fontSize: 'clamp(28px, 4vw, 40px)',
              color: '#1C1C1A',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              display: 'inline-block',
              paddingBottom: '10px',
              borderBottom: '1px solid #C9A961',
            }}
          >
            נבחרים
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
          {FEATURED.map((f) => (
            <FeaturedCard key={f.id} fragrance={f} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20" dir="rtl">
          <a
            href="#collection"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '10px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: '#1C1C1A',
              borderBottom: '1px solid #1C1C1A',
              paddingBottom: '4px',
              display: 'inline-block',
            }}
            className="hover:opacity-50 transition-opacity"
          >
            לכל הקולקציה ←
          </a>
        </div>
      </div>
    </section>
  );
}
