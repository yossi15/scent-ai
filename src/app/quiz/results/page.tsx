'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { RotateCcw, Share2, ExternalLink, ShoppingBag, ChevronDown } from 'lucide-react';
import { fragrances } from '@/data/fragrances';

/* ─── Types ─────────────────────────────────────────────────────────── */
interface Rec {
  id: number | null;
  name: string;
  house: string;
  family: string;
  match_score: number;
  why_text: string;
  in_catalog: boolean;
}

interface ResultsData {
  profile_summary: string;
  dna_bars: { label: string; value: number }[];
  recommendations: Rec[];
  knownNames: string[];
  email: string | null;
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

/* ─── Animated DNA bar ───────────────────────────────────────────────── */
function DnaBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setAnimated(true), delay);
      return () => clearTimeout(t);
    }
  }, [inView, delay]);

  const prefersReduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const displayValue = prefersReduced ? value : (animated ? value : 0);

  return (
    <div ref={ref} style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontSize: 11, color: 'var(--gold)' }}>{value}%</span>
      </div>
      <div style={{ height: 6, background: 'var(--border-default)', borderRadius: 3, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${displayValue}%`,
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
            borderRadius: 3,
            transition: prefersReduced ? 'none' : 'width 800ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
    </div>
  );
}

/* ─── Recommendation card ────────────────────────────────────────────── */
function RecCard({ rec, index }: { rec: Rec; index: number }) {
  const frag = rec.id ? fragrances.find(f => f.id === rec.id) : null;
  const buyUrl = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(rec.name + ' ' + rec.house + ' fragrance')}`;
  const isTop = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.08, ease }}
      style={{
        background: isTop
          ? 'linear-gradient(135deg, var(--top-rec-bg-start, #1a1410), var(--top-rec-bg-end, #131310))'
          : 'var(--bg-card)',
        border: isTop ? '1px solid rgba(201,169,97,0.4)' : '1px solid var(--border-default)',
        borderRadius: 14, padding: 20, position: 'relative', overflow: 'hidden',
        boxShadow: isTop ? '0 0 40px rgba(201,169,97,0.08)' : 'none',
      }}
    >
      {isTop && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          background: 'var(--gold)', color: '#050505',
          fontSize: 9, fontWeight: 700, letterSpacing: 1.5,
          textTransform: 'uppercase', padding: '4px 10px', borderBottomLeftRadius: 8,
        }}>
          ההתאמה המושלמת
        </div>
      )}

      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        {/* Score badge */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 2, flexShrink: 0, paddingTop: isTop ? 22 : 2,
        }}>
          <span style={{
            fontFamily: 'Georgia, serif',
            fontSize: isTop ? 26 : 20,
            color: 'var(--gold)', opacity: isTop ? 1 : 0.6, lineHeight: 1,
          }}>
            {rec.match_score}%
          </span>
          <span style={{ fontSize: 8, color: 'var(--text-faint)', letterSpacing: 0.5 }}>התאמה</span>
        </div>

        {/* Bottle placeholder */}
        <div style={{
          width: 56, height: 74, flexShrink: 0,
          background: isTop ? 'rgba(201,169,97,0.08)' : 'var(--bg-secondary)',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: isTop ? '1px solid var(--border-gold)' : 'none',
          marginTop: isTop ? 22 : 0,
        }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 24, color: isTop ? 'var(--gold)' : 'var(--text-muted)', opacity: 0.7 }}>
            {rec.house.charAt(0)}
          </span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0, paddingTop: isTop ? 22 : 0 }} dir="rtl">
          <p style={{
            fontSize: 9, letterSpacing: 2.5, textTransform: 'uppercase',
            color: isTop ? 'rgba(201,169,97,0.7)' : 'var(--text-muted)', marginBottom: 4,
          }}>
            {rec.house}
          </p>
          <h2 style={{
            fontFamily: 'Georgia, serif', fontWeight: 400,
            fontSize: 'clamp(16px, 3vw, 20px)', color: 'var(--text-primary)',
            lineHeight: 1.2, marginBottom: 10,
          }}>
            {rec.name}
          </h2>

          {/* Why text */}
          <div style={{
            background: isTop ? 'rgba(201,169,97,0.06)' : 'transparent',
            border: isTop ? 'none' : 'none',
            borderRight: isTop ? '2px solid var(--border-gold)' : '2px solid var(--border-default)',
            paddingRight: 10, marginBottom: 14,
          }}>
            <p style={{
              fontSize: 12.5, lineHeight: 1.75,
              color: isTop ? 'rgba(245,245,245,0.8)' : 'var(--text-tertiary)',
            }}>
              {rec.why_text}
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            {rec.in_catalog && rec.id && frag && (
              <Link
                href={`/fragrance/${toSlug(rec.name)}`}
                style={{
                  fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase',
                  color: 'var(--gold)',
                  borderBottom: '1px solid var(--border-gold)',
                  paddingBottom: 2, textDecoration: 'none',
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
                color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4,
                textDecoration: 'none',
              }}
              aria-label={`השוואת מחירים עבור ${rec.name}`}
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

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function QuizResults() {
  const router = useRouter();
  const [data, setData] = useState<ResultsData | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('scentory-quiz-results');
      if (raw) {
        const parsed = JSON.parse(raw);
        // Support both old format (recommendations[].reason) and new format (recommendations[].why_text)
        const recs = (parsed.recommendations ?? []).map((r: Rec & { reason?: string }) => ({
          ...r,
          why_text: r.why_text ?? r.reason ?? '',
          match_score: r.match_score ?? 85,
        }));
        setData({ ...parsed, recommendations: recs });
      } else {
        router.replace('/quiz');
      }
    } catch {
      router.replace('/quiz');
    }
  }, [router]);

  const handleShare = async () => {
    const text = `מצאתי את הבושם שלי עם SCENTORY — ${data?.recommendations[0]?.name} הייתה ההמלצה הראשונה.\nscentory.co.il/quiz`;
    if (navigator.share) await navigator.share({ text });
    else try { await navigator.clipboard.writeText(text); } catch {}
  };

  const handleRetake = () => {
    sessionStorage.removeItem('scentory-quiz-results');
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
        background: 'var(--nav-bg)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ fontFamily: 'Georgia, serif', fontSize: 12, letterSpacing: 5, color: 'var(--gold)', textDecoration: 'none' }}>
          SCENTORY
        </Link>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handleShare}
            aria-label="שתף תוצאות"
            style={{ background: 'none', border: '1px solid var(--border-default)', padding: '7px 10px', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 6, fontSize: 11 }}
          >
            <Share2 size={14} />
            שתף
          </button>
          <button
            onClick={handleRetake}
            aria-label="עשה שאלון מחדש"
            style={{ background: 'none', border: '1px solid var(--border-default)', padding: 8, cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', borderRadius: 6 }}
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 640, margin: '0 auto', padding: '40px 20px 80px' }}>
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          style={{ marginBottom: 32, textAlign: 'center' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 14px', borderRadius: 100,
            background: 'rgba(201,169,97,0.08)', border: '1px solid var(--border-gold)',
            marginBottom: 16,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} className="animate-gold-pulse" />
            <span style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: 1.5 }}>הפרופיל הריחני שלך</span>
          </div>
          <h1 style={{
            fontFamily: 'Georgia, serif', fontWeight: 400,
            fontSize: 'clamp(24px, 4vw, 34px)',
            color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 8,
          }}>
            {data.profile_summary || 'הפרופיל הריחני שלך'}
          </h1>
          {data.knownNames.length > 0 && (
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              על בסיס {data.knownNames.length} הבשמים שציינת + תשובותיך
            </p>
          )}
        </motion.div>

        {/* DNA Bars */}
        {data.dna_bars.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-default)',
              borderRadius: 14, padding: 24, marginBottom: 32,
            }}
          >
            <p style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 18 }}>
              פרופיל DNA ריחני
            </p>
            {data.dna_bars.map((bar, i) => (
              <DnaBar key={bar.label} label={bar.label} value={bar.value} delay={i * 120} />
            ))}
          </motion.div>
        )}

        {/* Top match header */}
        <p style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16, textAlign: 'center' }}>
          הבשמים שנבחרו עבורך
        </p>

        {/* Recommendations */}
        <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
          {data.recommendations.map((rec, i) => (
            <RecCard key={rec.id ?? rec.name + i} rec={rec} index={i} />
          ))}
        </div>

        {/* Scroll to full list */}
        {data.recommendations.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ textAlign: 'center', marginBottom: 32 }}
          >
            <button
              onClick={() => listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '10px 24px', borderRadius: 8,
                border: '1px solid var(--border-default)', background: 'transparent',
                color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer',
              }}
              aria-label="צפה בכל ההתאמות"
            >
              <ChevronDown size={15} />
              צפה בכל 10 ההתאמות
            </button>
          </motion.div>
        )}

        {/* Bottom actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}
        >
          <button
            onClick={handleShare}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '13px 36px', background: 'var(--gold)', color: '#050505',
              fontWeight: 600, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase',
              border: 'none', cursor: 'pointer', borderRadius: 8, transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <Share2 size={14} />
            שתף את הפרופיל הריחני שלך
          </button>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Link href="/collection" style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'none', letterSpacing: 1, borderBottom: '1px solid var(--border-default)', paddingBottom: 1 }}>
              עיין בקולקציה
            </Link>
            <span style={{ color: 'var(--border-default)' }}>·</span>
            <button onClick={handleRetake} style={{ fontSize: 11, color: 'var(--text-faint)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: 1 }}>
              עשה שאלון מחדש
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
