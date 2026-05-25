'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.12, ease }}
      style={{
        background: 'var(--bg-card)',
        border: index === 0 ? '1px solid var(--border-gold)' : '1px solid var(--border-subtle)',
        borderRadius: 12, padding: 20,
        display: 'flex', gap: 16, alignItems: 'flex-start',
      }}
    >
      <span style={{ fontFamily: "Georgia, serif", fontSize: 24, color: 'var(--gold)', opacity: 0.7, lineHeight: 1, flexShrink: 0 }}>
        {index + 1}
      </span>

      {!imgErr && image ? (
        <div style={{ width: 60, height: 80, flexShrink: 0, position: 'relative', background: 'var(--bg-secondary)', borderRadius: 6, overflow: 'hidden' }}>
          <Image src={image} alt={`${rec.name}`} fill sizes="60px" className="object-contain" onError={() => setImgErr(true)} />
        </div>
      ) : (
        <div style={{ width: 60, height: 80, flexShrink: 0, background: 'var(--bg-secondary)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "Georgia, serif", fontSize: 24, color: 'var(--text-muted)' }} aria-hidden="true">
            {rec.house.charAt(0)}
          </span>
        </div>
      )}

      <div style={{ flex: 1, minWidth: 0 }} dir="rtl">
        <p style={{ fontSize: 9, letterSpacing: 2, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>{rec.house}</p>
        <h3 style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.2 }}>{rec.name}</h3>
        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.65, marginBottom: 10 }}>{rec.reason}</p>
        {rec.inCatalog && rec.id && (
          <Link href={`/fragrance/${toSlug(rec.name)}`} style={{ fontSize: 10, color: 'var(--gold)', borderBottom: '1px solid var(--border-gold)', paddingBottom: 1, textDecoration: 'none' }}>
            פרטים נוספים
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export default function QuizResultsPreview() {
  const router = useRouter();
  const [data, setData] = useState<ResultsData | null>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setLoading(true);
    try {
      const existing = sessionStorage.getItem('scentory-quiz-results');
      if (existing) {
        const parsed = JSON.parse(existing);
        sessionStorage.setItem('scentory-quiz-results', JSON.stringify({ ...parsed, email }));
      }
    } catch {}
    router.push('/quiz/results');
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

  const top3 = data.recommendations.slice(0, 3);

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }} dir="rtl">
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: "Georgia, serif", fontSize: 12, letterSpacing: 4, color: 'var(--gold)', textDecoration: 'none' }}>SCENTORY</Link>
        <button onClick={handleRetake} aria-label="התחל מחדש" style={{ background: 'none', border: '1px solid var(--border-default)', padding: 8, cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', borderRadius: 6 }}>
          <RotateCcw size={15} />
        </button>
      </header>

      <main style={{ maxWidth: 600, margin: '0 auto', padding: '40px 20px 80px' }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          style={{ marginBottom: 32, textAlign: 'center' }}
        >
          <p style={{ fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>התוצאות שלך</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 10, lineHeight: 1.15 }}>
            3 ההתאמות המובילות
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {data.knownNames.length > 0
              ? `על בסיס תשובותיך ו-${data.knownNames.length} הבשמים שציינת`
              : 'על בסיס תשובותיך'}
          </p>
        </motion.div>

        {/* Top 3 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {top3.map((rec, i) => (
            <RecCard key={rec.id ?? rec.name} rec={rec} index={i} />
          ))}
        </div>

        {/* Email gate upsell */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease }}
          style={{
            background: 'linear-gradient(135deg, #1a1410, #0f0a05)',
            border: '1px solid rgba(201,169,97,0.3)',
            borderRadius: 14, padding: 24, textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
            7 התאמות נוספות מחכות
          </p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.2 }}>
            רוצה את שאר 7 ההתאמות?
          </h2>
          <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 18, lineHeight: 1.6 }}>
            השאר אימייל ותקבל מיד.
          </p>
          <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
            <input
              type="email"
              placeholder="האימייל שלך"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              dir="rtl"
              style={{
                padding: '12px 16px', borderRadius: 8,
                border: '1px solid rgba(201,169,97,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--text-primary)', fontSize: 14, width: '100%', boxSizing: 'border-box',
              }}
            />
            <button
              type="submit"
              disabled={loading || !email.includes('@')}
              style={{
                padding: '12px', borderRadius: 8, border: 'none',
                background: email.includes('@') ? 'var(--gold)' : 'rgba(201,169,97,0.3)',
                color: '#050505', fontSize: 13, fontWeight: 600,
                cursor: email.includes('@') && !loading ? 'pointer' : 'not-allowed',
              }}
            >
              {loading ? '...' : 'חשוף את כל ה-10 ←'}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
