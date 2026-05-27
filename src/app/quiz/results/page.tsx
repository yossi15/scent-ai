'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { RotateCcw, Share2, ExternalLink, ShoppingBag } from 'lucide-react';
import { fragrances } from '@/data/fragrances';

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

interface Rec {
  id: number | null;
  name: string;
  house: string;
  family: string;
  reason: string;
  inCatalog: boolean;
}

interface ResultsData {
  recommendations: Rec[];
  knownNames: string[];
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const RANK_LABELS: Record<number, string> = {
  0: 'התאמה מושלמת',
  1: 'התאמה גבוהה',
  2: 'המלצה משלימה',
  3: 'גיוון מומלץ',
  4: 'בחירת נישה',
};

function RecCard({ rec, index }: { rec: Rec; index: number }) {
  const [imgErr, setImgErr] = useState(false);
  const frag = rec.id ? fragrances.find(f => f.id === rec.id) : null;
  const image = frag?.image ?? null;
  const buyUrl = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(rec.name + ' ' + rec.house + ' fragrance')}`;
  const isTop = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.1, ease }}
      style={{
        background: isTop
          ? 'linear-gradient(135deg, #1a1410, #131310)'
          : 'var(--bg-card)',
        border: isTop
          ? '1px solid rgba(201,169,97,0.35)'
          : '1px solid var(--border-default)',
        borderRadius: 14,
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top badge */}
      {isTop && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          background: 'var(--gold)', color: '#050505',
          fontSize: 9, fontWeight: 700, letterSpacing: 1.5,
          textTransform: 'uppercase',
          padding: '4px 10px',
          borderBottomLeftRadius: 8,
        }}>
          #1 — הכי מתאים לך
        </div>
      )}

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* Rank */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0, paddingTop: isTop ? 20 : 2 }}>
          <span style={{
            fontFamily: "Georgia, serif",
            fontSize: isTop ? 28 : 22,
            color: 'var(--gold)',
            opacity: isTop ? 1 : 0.55,
            lineHeight: 1,
          }}>
            {index + 1}
          </span>
          {RANK_LABELS[index] && (
            <span style={{ fontSize: 8, color: 'var(--text-faint)', letterSpacing: 0.5, textAlign: 'center', maxWidth: 40 }}>
              {RANK_LABELS[index]}
            </span>
          )}
        </div>

        {/* Image */}
        {!imgErr && image ? (
          <div style={{
            width: 60, height: 78, flexShrink: 0,
            position: 'relative',
            background: 'var(--bg-secondary)',
            borderRadius: 8, overflow: 'hidden',
            marginTop: isTop ? 20 : 0,
          }}>
            <Image
              src={image}
              alt={`${rec.name} מאת ${rec.house}`}
              fill
              sizes="60px"
              style={{ objectFit: 'contain' }}
              onError={() => setImgErr(true)}
            />
          </div>
        ) : (
          <div style={{
            width: 60, height: 78, flexShrink: 0,
            background: isTop ? 'rgba(201,169,97,0.08)' : 'var(--bg-secondary)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: isTop ? '1px solid var(--border-gold)' : 'none',
            marginTop: isTop ? 20 : 0,
          }}>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 26, color: isTop ? 'var(--gold)' : 'var(--text-muted)', opacity: 0.7 }} aria-hidden="true">
              {rec.house.charAt(0)}
            </span>
          </div>
        )}

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0, paddingTop: isTop ? 20 : 0 }} dir="rtl">
          <p style={{
            fontSize: 9, letterSpacing: 2.5, textTransform: 'uppercase',
            color: isTop ? 'rgba(201,169,97,0.7)' : 'var(--text-muted)',
            marginBottom: 5,
          }}>
            {rec.house}
          </p>
          <h2 style={{
            fontFamily: "Georgia, serif", fontWeight: 400,
            fontSize: 'clamp(17px, 3vw, 21px)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 10,
          }}>
            {rec.name}
          </h2>
          <p style={{
            fontSize: 12.5, lineHeight: 1.75,
            color: isTop ? 'rgba(245,245,245,0.75)' : 'var(--text-tertiary)',
            marginBottom: 14,
          }}>
            {rec.reason}
          </p>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            {rec.inCatalog && rec.id && (
              <Link
                href={`/fragrance/${toSlug(rec.name)}`}
                style={{
                  fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase',
                  color: 'var(--gold)',
                  borderBottom: '1px solid var(--border-gold)',
                  paddingBottom: 2,
                  display: 'flex', alignItems: 'center', gap: 4,
                  textDecoration: 'none',
                }}
              >
                פרטי הבושם
              </Link>
            )}
            <a
              href={buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase',
                color: 'var(--text-muted)',
                display: 'flex', alignItems: 'center', gap: 4,
                textDecoration: 'none',
              }}
            >
              <ShoppingBag size={11} />
              השוואת מחירים
              <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function QuizResults() {
  const router = useRouter();
  const [data, setData] = useState<ResultsData | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('scentory-quiz-results');
      if (raw) {
        setData(JSON.parse(raw));
      } else {
        router.replace('/quiz');
      }
    } catch {
      router.replace('/quiz');
    }
  }, [router]);

  const handleShare = async () => {
    const text = `גיליתי את ה-DNA הריחני שלי עם SCENTORY — ${data?.recommendations[0]?.name} היה ההמלצה הראשונה.\nscentory.co.il/quiz`;
    if (navigator.share) {
      await navigator.share({ text });
    } else {
      try { await navigator.clipboard.writeText(text); } catch {}
    }
  };

  const handleRetake = () => {
    sessionStorage.removeItem('scentory-quiz-results');
    sessionStorage.removeItem('scentory-quiz-state');
    router.push('/quiz');
  };

  if (!data) {
    return (
      <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)' }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }} dir="rtl">
      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{
          fontFamily: "Georgia, serif", fontSize: 12, letterSpacing: 5,
          color: 'var(--gold)', textDecoration: 'none',
        }}>
          SCENTORY
        </Link>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handleShare}
            aria-label="שתף תוצאות"
            style={{
              background: 'none', border: '1px solid var(--border-default)',
              padding: '7px 10px', cursor: 'pointer', color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', gap: 6, borderRadius: 6,
              fontSize: 11,
            }}
          >
            <Share2 size={14} />
            שתף
          </button>
          <button
            onClick={handleRetake}
            aria-label="עשה שאלון מחדש"
            style={{
              background: 'none', border: '1px solid var(--border-default)',
              padding: 8, cursor: 'pointer', color: 'var(--text-muted)',
              display: 'flex', borderRadius: 6,
            }}
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 640, margin: '0 auto', padding: '40px 20px 80px' }}>
        {/* Hero title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          style={{ marginBottom: 36, textAlign: 'center' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 14px', borderRadius: 100,
            background: 'rgba(201,169,97,0.08)', border: '1px solid var(--border-gold)',
            marginBottom: 16,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} className="animate-gold-pulse" />
            <span style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: 1.5 }}>ניתוח הושלם</span>
          </div>

          <h1 style={{
            fontFamily: "Georgia, serif", fontWeight: 400,
            fontSize: 'clamp(24px, 4vw, 34px)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 12,
          }}>
            ה-DNA הריחני שלך
          </h1>
          <p style={{
            fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7,
            maxWidth: 380, margin: '0 auto',
          }}>
            {data.knownNames.length > 0
              ? `על בסיס ${data.knownNames.length} הבשמים שציינת ותשובותיך, ה-AI בחר עבורך:`
              : 'על בסיס תשובותיך, ה-AI בחר עבורך:'}
          </p>
        </motion.div>

        {/* Rec cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 44 }}>
          {data.recommendations.map((rec, i) => (
            <RecCard key={rec.id ?? rec.name + i} rec={rec} index={i} />
          ))}
        </div>

        {/* Bottom actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}
        >
          <button
            onClick={handleShare}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '13px 36px',
              background: 'var(--gold)', color: '#050505',
              fontWeight: 600, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase',
              border: 'none', cursor: 'pointer', borderRadius: 8,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <Share2 size={14} />
            שתף את הפרופיל הריחני שלך
          </button>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Link
              href="/collection"
              style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'none', letterSpacing: 1, borderBottom: '1px solid var(--border-default)', paddingBottom: 1 }}
            >
              עיין בקולקציה
            </Link>
            <span style={{ color: 'var(--border-default)' }}>·</span>
            <button
              onClick={handleRetake}
              style={{ fontSize: 11, color: 'var(--text-faint)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: 1 }}
            >
              עשה שאלון מחדש
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
