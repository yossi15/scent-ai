'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { RotateCcw, Share2, ExternalLink } from 'lucide-react';
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

function RecCard({ rec, index }: { rec: Rec; index: number }) {
  const [imgErr, setImgErr] = useState(false);
  const frag = rec.id ? fragrances.find(f => f.id === rec.id) : null;
  const image = frag?.image ?? null;
  const buyUrl = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(rec.name + ' ' + rec.house)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.15, ease }}
      className="rec-card"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        padding: '32px',
        display: 'flex',
        gap: '24px',
        alignItems: 'flex-start',
      }}
    >
      {/* Rank */}
      <div style={{ flexShrink: 0 }}>
        <span style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontWeight: 300,
          fontSize: '36px',
          color: 'var(--accent-gold)',
          lineHeight: 1,
          opacity: 0.7,
        }}>
          {index + 1}
        </span>
      </div>

      {/* Image */}
      {!imgErr && image ? (
        <div className="rec-card-img" style={{ width: '80px', height: '100px', flexShrink: 0, position: 'relative', background: 'var(--bg-secondary)' }}>
          <Image
            src={image}
            alt={`${rec.name} מאת ${rec.house}`}
            fill
            sizes="80px"
            className="object-contain"
            onError={() => setImgErr(true)}
          />
        </div>
      ) : (
        <div className="rec-card-img" style={{
          width: '80px', height: '100px', flexShrink: 0,
          background: 'var(--bg-secondary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '32px', fontWeight: 300, color: 'var(--ink-muted)',
          }} aria-hidden="true">
            {rec.house.charAt(0)}
          </span>
        </div>
      )}

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }} dir="rtl">
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '3px',
          textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '4px',
        }}>
          {rec.house}
        </p>
        <h2 style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 400,
          fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.01em',
          marginBottom: '12px', lineHeight: 1.2,
        }}>
          {rec.name}
        </h2>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '13px',
          lineHeight: 1.75, color: 'var(--ink-secondary)', marginBottom: '16px',
        }}>
          {rec.reason}
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {rec.inCatalog && rec.id && (
            <Link
              href={`/fragrance/${toSlug(rec.name)}`}
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '1.5px',
                textTransform: 'uppercase', color: 'var(--accent-gold)',
                borderBottom: '1px solid var(--gold-border)', paddingBottom: '2px',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}
            >
              פרטים נוספים
            </Link>
          )}
          <a
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '1.5px',
              textTransform: 'uppercase', color: 'var(--ink-muted)',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}
          >
            השוואת מחירים <ExternalLink size={11} />
          </a>
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
    const text = `גיליתי את ה-DNA הריחני שלי עם SCENTORY - ${data?.recommendations[0]?.name} היה ההמלצה הראשונה.\nscentory.co.il/quiz`;
    if (navigator.share) {
      await navigator.share({ text });
    } else {
      await navigator.clipboard.writeText(text);
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
        <div style={{ display: 'flex', gap: '8px' }}>
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-gold)' }}
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
        background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)',
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{
          fontFamily: 'Georgia, serif', fontSize: '16px', letterSpacing: '5px',
          color: 'var(--accent-gold)', textDecoration: 'none',
        }}>
          SCENTORY
        </Link>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleShare}
            aria-label="שתף תוצאות"
            style={{ background: 'none', border: '1px solid var(--border)', padding: '8px', cursor: 'pointer', color: 'var(--ink-muted)', display: 'flex' }}
          >
            <Share2 size={16} />
          </button>
          <button
            onClick={handleRetake}
            aria-label="עשה שאלון מחדש"
            style={{ background: 'none', border: '1px solid var(--border)', padding: '8px', cursor: 'pointer', color: 'var(--ink-muted)', display: 'flex' }}
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 20px 80px' }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          style={{ marginBottom: '40px' }}
        >
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '4px',
            textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: '12px',
          }}>
            ההמלצות שלך
          </p>
          <h1 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300,
            fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--ink)',
            letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px',
          }}>
            ה-DNA הריחני שלך
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '13px',
            color: 'var(--ink-muted)', lineHeight: 1.7,
          }}>
            על בסיס תשובותיך{data.knownNames.length > 0 ? ` ו-${data.knownNames.length} הבשמים שציינת` : ''}, ה-AI בחר את ההתאמות הבאות:
          </p>
        </motion.div>

        {/* Rec cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
          {data.recommendations.map((rec, i) => (
            <RecCard key={rec.id ?? rec.name} rec={rec} index={i} />
          ))}
        </div>

        {/* Footer actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}
        >
          <button
            onClick={handleShare}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '13px 32px',
              background: 'var(--accent-gold)', color: '#0a0a0a',
              fontFamily: 'Inter, sans-serif', fontWeight: 500,
              fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
              border: 'none', cursor: 'pointer',
            }}
          >
            <Share2 size={14} />
            שתף תוצאות
          </button>
          <button
            onClick={handleRetake}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              fontFamily: 'Inter, sans-serif', fontSize: '11px',
              color: 'var(--ink-muted)', background: 'none', border: 'none',
              cursor: 'pointer', letterSpacing: '1px',
            }}
          >
            <RotateCcw size={13} />
            עשה שאלון מחדש
          </button>
        </motion.div>
      </main>
    </div>
  );
}
