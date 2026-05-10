'use client';

import { fragrances } from '@/data/fragrances';

const TOTAL = fragrances.length;

export default function Hero() {
  return (
    <section
      className="min-h-[88vh] flex flex-col items-center justify-center text-center px-6 py-32"
      style={{ background: '#FAF8F4' }}
      aria-labelledby="hero-heading"
    >
      <p
        className="mb-10 text-[#999]"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
        }}
      >
        Niche Fragrance Curation · {TOTAL} Scents
      </p>

      <h1
        id="hero-heading"
        className="text-black max-w-4xl"
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontWeight: 700,
          fontSize: 'clamp(40px, 7vw, 64px)',
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          marginBottom: '28px',
        }}
      >
        Know your scent.
      </h1>

      <p
        className="max-w-xl"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 300,
          fontSize: '15px',
          lineHeight: 1.7,
          color: '#666',
          marginBottom: '48px',
        }}
        dir="rtl"
      >
        קולקציה שקופה של {TOTAL} בשמים נישתיים מ-46 בתי בושם נבחרים. גלה את הריח שלך — בלי תיווך.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <a
          href="#quiz"
          className="px-10 py-4 bg-black text-white inline-flex items-center justify-center"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '12px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            minWidth: '200px',
          }}
        >
          Take the quiz
        </a>
        <a
          href="#collection"
          className="inline-flex items-center justify-center text-black"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            borderBottom: '1px solid #000',
            paddingBottom: '4px',
          }}
        >
          Discover the collection
        </a>
      </div>
    </section>
  );
}
