'use client';

import Image from 'next/image';
import { fragrances } from '@/data/fragrances';

const TOTAL = fragrances.length;
const HOUSES = new Set(fragrances.map(f => f.house)).size;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ background: '#FAF8F3', paddingTop: '72px' /* navbar height */ }}
      aria-labelledby="hero-heading"
    >
      {/* 50 / 50 grid — LTR so image stays physically left */}
      <div
        dir="ltr"
        className="grid grid-cols-1 md:grid-cols-2 min-h-[92vh]"
      >
        {/* ── LEFT: image ───────────────────────────── */}
        <div className="relative min-h-[60vw] md:min-h-0 overflow-hidden">
          <Image
            src="/hero.jpg"
            alt="בקבוק בושם יוקרתי על משטח שיש — SCENTORY"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Quote overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: '32px',
              right: '32px',
              background: '#C9A961',
              padding: '10px 16px',
              maxWidth: '220px',
            }}
          >
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: '11px',
                lineHeight: 1.55,
                color: '#FFFFFF',
                letterSpacing: '0.2px',
              }}
            >
              &ldquo;המהפכה האמיתית בעולם הבושם&rdquo;
            </p>
          </div>
        </div>

        {/* ── RIGHT: text ───────────────────────────── */}
        <div
          dir="rtl"
          className="flex flex-col justify-center px-10 md:px-16 lg:px-24 py-24 md:py-0"
          style={{ background: '#FAF8F3' }}
        >
          {/* eyebrow */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '9px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#6B6560',
              marginBottom: '28px',
            }}
          >
            פלטפורמת AI לגילוי בשמים
          </p>

          {/* Heading */}
          <h1
            id="hero-heading"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: 'clamp(38px, 5vw, 56px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#1C1C1A',
              marginBottom: '4px',
            }}
          >
            האלגוריתם שמבין את
          </h1>
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: 'clamp(38px, 5vw, 56px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#C9A961',
              marginBottom: '32px',
            }}
            aria-hidden="true"
          >
            הזכרון הריחני שלך
          </h1>

          {/* Description */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '14px',
              lineHeight: 1.8,
              color: '#6B6560',
              maxWidth: '380px',
              marginBottom: '44px',
            }}
          >
            {TOTAL.toLocaleString()} בשמים נבחרים מ-{HOUSES} בתי בושם. שאלון AI שבונה את פרופיל הריח האישי שלך ומוצא את ההתאמה המושלמת.
          </p>

          {/* CTA */}
          <div style={{ marginBottom: '56px' }}>
            <a
              href="#quiz"
              style={{
                display: 'inline-block',
                padding: '15px 36px',
                background: '#1C1C1A',
                color: '#FAF8F3',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
              className="transition-opacity duration-200 hover:opacity-75 active:scale-[0.97]"
            >
              גלה את חתימת הריח שלך
            </a>
          </div>

          {/* Stats */}
          <div
            dir="ltr"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, auto)',
              gap: '0',
              borderTop: '1px solid #E8E4DC',
              paddingTop: '28px',
              maxWidth: '360px',
            }}
          >
            {[
              { num: TOTAL.toLocaleString(), label: 'בשמים' },
              { num: String(HOUSES), label: 'בתי בושם' },
              { num: '98%', label: 'שביעות רצון' },
            ].map(({ num, label }, i) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  paddingLeft: i > 0 ? '24px' : 0,
                  marginLeft: i > 0 ? '24px' : 0,
                  borderLeft: i > 0 ? '1px solid #E8E4DC' : 'none',
                  textAlign: 'left',
                }}
              >
                <p
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontWeight: 400,
                    fontSize: '28px',
                    color: '#1C1C1A',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    marginBottom: '4px',
                  }}
                >
                  {num}
                </p>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '9px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: '#6B6560',
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
