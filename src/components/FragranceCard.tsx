'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAuth, SignInButton } from '@clerk/nextjs';
import type { Fragrance } from '@/data/fragrances';

interface Props {
  fragrance: Fragrance;
  index: number;
  onClick: (f: Fragrance) => void;
  inCollection: boolean;
  onToggleCollection: (f: Fragrance) => void;
  onBuy: (f: Fragrance) => void;
}

function BottleSilhouette({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 140" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="38" y="8" width="24" height="12" rx="1" stroke="currentColor" strokeWidth="1" />
      <rect x="36" y="18" width="28" height="6" rx="1" stroke="currentColor" strokeWidth="1" />
      <path d="M30 34 Q22 36 22 48 L22 118 Q22 128 32 128 L68 128 Q78 128 78 118 L78 48 Q78 36 70 34 L30 34 Z"
            stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

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
  fontSize: '20px',
  lineHeight: 1.2,
  color: '#000',
  letterSpacing: '-0.005em',
};

const metaStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 300,
  fontSize: '11px',
  color: '#999',
  letterSpacing: '0.5px',
};

const linkStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '11px',
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: '#000',
  borderBottom: '1px solid #000',
  paddingBottom: '2px',
};

const FAMILY_COLORS: Record<string, string> = {
  'Amber':            '#C4A16A',
  'Amber Floral':     '#C4A16A',
  'Amber Spicy':      '#B87333',
  'Amber Vanilla':    '#D4956A',
  'Amber Woody':      '#9B7540',
  'Animalic':         '#7A6555',
  'Aromatic':         '#5A8A6A',
  'Aromatic Aquatic': '#4A8A9A',
  'Aromatic Citrus':  '#8AAA4A',
  'Aromatic Floral':  '#8A9A5A',
  'Aromatic Fougere': '#6A8A5A',
  'Aromatic Spicy':   '#9A7A4A',
  'Chypre Leather':   '#8A6A4A',
  'Citrus':           '#C4A84A',
  'Citrus Aromatic':  '#AAA84A',
  'Citrus Green':     '#8AAA5A',
  'Floral':           '#C4708A',
  'Floral Fruity':    '#C47A8A',
  'Floral Green':     '#8AAA6A',
  'Floral Powdery':   '#C4A4AA',
  'Floral Woody':     '#AA8A6A',
  'Leather':          '#7A6050',
  'Woody':            '#8A7060',
  'Woody Aromatic':   '#7A8060',
  'Woody Spicy':      '#8A6A50',
};

export default function FragranceCard({ fragrance: f, onClick, inCollection, onToggleCollection, onBuy }: Props) {
  const [imgError, setImgError] = useState(false);
  const { isSignedIn } = useAuth();
  const familyColor = FAMILY_COLORS[f.family] ?? '#9A9A9A';

  return (
    <article
      className="group cursor-pointer flex flex-col transition-all duration-300"
      style={{ borderBottom: '1px solid var(--border)' }}
      onClick={() => onClick(f)}
    >
      {/* Image — warm bg, subtle scale on hover */}
      <div
        className="relative aspect-[4/5] mb-5 overflow-hidden"
        style={{ background: 'var(--bg-accent)' }}
      >
        {/* Family tag */}
        <div
          className="absolute top-3 end-3 z-10 px-2 py-1"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 400,
            fontSize: '9px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: familyColor,
            background: 'rgba(245,243,238,0.88)',
            backdropFilter: 'blur(4px)',
            border: `1px solid ${familyColor}33`,
          }}
        >
          {f.family}
        </div>

        {!imgError && f.image ? (
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <div className="relative w-full h-full">
              <Image
                src={f.image}
                alt={`${f.name} by ${f.house}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                onError={() => setImgError(true)}
              />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BottleSilhouette className="w-20 h-28" style={{ color: familyColor + '66' }} />
          </div>
        )}
      </div>

      {/* Text — house, name, meta */}
      <div dir="ltr" className="px-1 flex flex-col flex-1">
        <p style={houseStyle} className="mb-2 truncate">{f.house}</p>
        <h3 style={nameStyle} className="mb-2 truncate">{f.name}</h3>
        <p style={metaStyle} className="mb-4">
          {f.year} · {f.concentration} · {f.gender} · עמידות {f.longevity}/10
        </p>

        {/* Actions row */}
        <div
          className="flex items-center justify-between pt-3 mt-auto"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <span style={{ ...nameStyle, fontSize: '15px', fontWeight: 500, color: 'var(--ink)' }}>
            ₪{f.price.toLocaleString()}
          </span>

          <div className="flex items-center gap-5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => { e.stopPropagation(); onBuy(f); }}
              style={{
                ...linkStyle,
                color: 'var(--ink-secondary)',
                borderBottomColor: 'var(--border)',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
                (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--gold)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--ink-secondary)';
                (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--border)';
              }}
              aria-label={`השווה מחירים עבור ${f.name}`}
            >
              השווה מחירים
            </button>
            {isSignedIn ? (
              <button
                onClick={(e) => { e.stopPropagation(); onToggleCollection(f); }}
                style={{
                  ...linkStyle,
                  color: inCollection ? 'var(--gold)' : 'var(--ink-secondary)',
                  borderBottomColor: inCollection ? 'var(--gold)' : 'transparent',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => {
                  if (!inCollection) {
                    (e.currentTarget as HTMLElement).style.color = 'var(--ink)';
                    (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--border)';
                  }
                }}
                onMouseLeave={e => {
                  if (!inCollection) {
                    (e.currentTarget as HTMLElement).style.color = 'var(--ink-secondary)';
                    (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent';
                  }
                }}
                aria-pressed={inCollection}
              >
                {inCollection ? 'באוסף' : 'הוסף'}
              </button>
            ) : (
              <SignInButton mode="modal">
                <button
                  onClick={(e) => e.stopPropagation()}
                  style={{ ...linkStyle, color: 'var(--ink-secondary)', borderBottom: '1px solid transparent' }}
                  className="transition-colors duration-200 hover:text-[var(--ink)]"
                >
                  הוסף
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
