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
  color: 'var(--ink-faint)',
};

const nameStyle: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: 1.2,
  color: 'var(--ink)',
  letterSpacing: '-0.005em',
};

const metaStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 300,
  fontSize: '11px',
  color: 'var(--ink-faint)',
  letterSpacing: '0.5px',
};

const actionStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '11px',
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: 'var(--ink-secondary)',
  borderBottom: '1px solid transparent',
  paddingBottom: '2px',
};

export default function FragranceCard({ fragrance: f, onClick, inCollection, onToggleCollection, onBuy }: Props) {
  const [imgError, setImgError] = useState(false);
  const { isSignedIn } = useAuth();

  return (
    <article
      className="group cursor-pointer flex flex-col"
      style={{ borderBottom: '1px solid var(--border)' }}
      onClick={() => onClick(f)}
    >
      {/* Image */}
      <div
        className="relative aspect-[4/5] mb-5 overflow-hidden"
        style={{ background: 'var(--bg-accent)' }}
      >
        {!imgError && f.image ? (
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <div className="relative w-full h-full">
              <Image
                src={f.image}
                alt={`${f.name} מאת ${f.house} — בקבוק בושם`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                onError={() => setImgError(true)}
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
              {f.house.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Text */}
      <div dir="ltr" className="px-1 flex flex-col flex-1">
        <p style={houseStyle} className="mb-2 truncate">{f.house}</p>
        <h3 style={nameStyle} className="mb-2 truncate">{f.name}</h3>
        <p style={metaStyle} className="mb-4">
          {f.year} · {f.concentration} · {f.gender} · עמידות {f.longevity}/10
        </p>

        <div
          className="flex items-center justify-between pt-3 mt-auto"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <span style={{ ...nameStyle, fontSize: '15px', fontWeight: 500 }}>
            ₪{f.price.toLocaleString()}
          </span>

          <div className="flex items-center gap-5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => { e.stopPropagation(); onBuy(f); }}
              style={{ ...actionStyle, transition: 'color 0.2s, border-color 0.2s' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
                (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--gold)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--ink-secondary)';
                (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent';
              }}
              aria-label={`השווה מחירים עבור ${f.name}`}
            >
              השווה מחירים
            </button>
            {isSignedIn ? (
              <button
                onClick={(e) => { e.stopPropagation(); onToggleCollection(f); }}
                style={{
                  ...actionStyle,
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
                  style={{ ...actionStyle }}
                  className="transition-colors duration-200 hover:opacity-60"
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
