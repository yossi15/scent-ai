'use client';

import { fragrances } from '@/data/fragrances';

const TOTAL = fragrances.length;
const HOUSES = new Set(fragrances.map(f => f.house)).size;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ background: 'var(--bg-primary)', paddingTop: '140px', paddingBottom: '140px' }}
      aria-labelledby="hero-heading"
    >
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 400,
          fontSize: '10px',
          letterSpacing: '3.5px',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '36px',
        }}
      >
        ריחות נישה · {TOTAL} בשמים · {HOUSES} בתי בושם
      </p>

      <h1
        id="hero-heading"
        className="max-w-3xl"
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 600,
          fontSize: 'clamp(44px, 7vw, 72px)',
          lineHeight: 1.0,
          letterSpacing: '-0.025em',
          color: 'var(--ink)',
          marginBottom: '28px',
        }}
      >
        גלה את חתימת הריח שלך.
      </h1>

      <p
        className="max-w-md"
        style={{
          fontFamily: 'var(--font-hebrew)',
          fontWeight: 300,
          fontSize: '15px',
          lineHeight: 1.75,
          color: 'var(--ink-muted)',
          marginBottom: '56px',
        }}
        dir="rtl"
      >
        {TOTAL} בשמים נבחרים. שאלון AI. המלצות מדויקות.
      </p>

      <div className="flex flex-col sm:flex-row gap-5 items-center">
        <a
          href="#quiz"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: '11px',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            minWidth: '196px',
            padding: '16px 36px',
            background: 'var(--ink)',
            color: 'var(--bg-primary)',
            borderRadius: '2px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="transition-opacity duration-200 hover:opacity-75 active:scale-[0.97]"
        >
          התחל את השאלון
        </a>
        <a
          href="#collection"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 400,
            fontSize: '11px',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
          }}
          className="transition-opacity duration-200 hover:opacity-50"
        >
          חקור את הקולקציה
        </a>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 divider" />
    </section>
  );
}
