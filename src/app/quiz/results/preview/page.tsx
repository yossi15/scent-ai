'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RotateCcw, Lock } from 'lucide-react';

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
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function RecCard({ rec, index }: { rec: Rec; index: number }) {
  const isTop = index === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.12, ease }}
      style={{
        background: isTop ? 'linear-gradient(135deg, #1a1410, #131310)' : 'var(--bg-card)',
        border: isTop ? '1px solid rgba(201,169,97,0.4)' : '1px solid var(--border-default)',
        borderRadius: 12, padding: 20, display: 'flex', gap: 14, alignItems: 'flex-start',
      }}
    >
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
        flexShrink: 0, paddingTop: 2,
      }}>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: 'var(--gold)', opacity: isTop ? 1 : 0.6, lineHeight: 1 }}>
          {rec.match_score}%
        </span>
        <span style={{ fontSize: 8, color: 'var(--text-faint)' }}>התאמה</span>
      </div>
      <div style={{ width: 50, height: 66, flexShrink: 0, background: isTop ? 'rgba(201,169,97,0.08)' : 'var(--bg-secondary)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: 'var(--text-muted)' }}>{rec.house.charAt(0)}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }} dir="rtl">
        <p style={{ fontSize: 9, letterSpacing: 2, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>{rec.house}</p>
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.2 }}>
          {rec.name}
        </h3>
        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.65 }}>{rec.why_text}</p>
      </div>
    </motion.div>
  );
}

function LockedCards({ count }: { count: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease }}
      style={{ position: 'relative', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 12, overflow: 'hidden' }}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'center',
            borderBottom: i < count - 1 ? '1px solid var(--border-subtle)' : 'none',
            filter: 'blur(4px)', userSelect: 'none',
          }}
        >
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--border-default)' }} />
          <div style={{ width: 50, height: 50, borderRadius: 6, background: 'var(--bg-secondary)' }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 8, width: '38%', background: 'var(--border-default)', borderRadius: 4, marginBottom: 8 }} />
            <div style={{ height: 13, width: '65%', background: 'var(--border-default)', borderRadius: 4, marginBottom: 6 }} />
            <div style={{ height: 10, width: '88%', background: 'var(--border-subtle)', borderRadius: 4 }} />
          </div>
        </div>
      ))}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(5,5,5,0.25) 0%, rgba(5,5,5,0.88) 45%, rgba(5,5,5,0.97) 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
        padding: '24px 20px', textAlign: 'center',
      }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(201,169,97,0.1)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
          <Lock size={16} color="var(--gold)" />
        </div>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4 }}>
          {count} המלצות נוספות נעולות
        </p>
        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>השאר אימייל למטה לגישה מלאה</p>
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
        const parsed = JSON.parse(raw);
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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setLoading(true);
    try {
      const existing = sessionStorage.getItem('scentory-quiz-results');
      if (existing) {
        const parsed = JSON.parse(existing);
        sessionStorage.setItem('scentory-quiz-results', JSON.stringify({ ...parsed, email, previewMode: false }));
      }
      await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: {}, email, marketingConsent: false }),
      });
    } catch {}
    router.push('/quiz/results');
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
            <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)' }} />
          ))}
        </div>
      </div>
    );
  }

  const FREE   = 3;
  const freeRecs   = data.recommendations.slice(0, FREE);
  const lockedCount = Math.max(0, data.recommendations.length - FREE);

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }} dir="rtl">
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: 'Georgia, serif', fontSize: 12, letterSpacing: 4, color: 'var(--gold)', textDecoration: 'none' }}>
          SCENTORY
        </Link>
        <button onClick={handleRetake} aria-label="התחל מחדש" style={{ background: 'none', border: '1px solid var(--border-default)', padding: 8, cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', borderRadius: 6 }}>
          <RotateCcw size={15} />
        </button>
      </header>

      <main style={{ maxWidth: 600, margin: '0 auto', padding: '36px 20px 80px' }}>
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}
          style={{ marginBottom: 28, textAlign: 'center' }}>
          <p style={{ fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>
            ה-DNA הריחני שלך
          </p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.15 }}>
            {data.profile_summary || '3 התאמות לתחילת הדרך'}
          </h1>
          {data.knownNames.length > 0 && (
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              על בסיס {data.knownNames.length} הבשמים שציינת + תשובותיך
            </p>
          )}
        </motion.div>

        {/* Free results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 12 }}>
          {freeRecs.map((rec, i) => (
            <RecCard key={rec.id ?? rec.name} rec={rec} index={i} />
          ))}
        </div>

        {/* Locked */}
        {lockedCount > 0 && (
          <div style={{ marginBottom: 24 }}>
            <LockedCards count={lockedCount} />
          </div>
        )}

        {/* Email upsell card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease }}
          style={{
            background: 'linear-gradient(135deg, #1a1410, #0f0a05)',
            border: '1px solid rgba(201,169,97,0.25)',
            borderRadius: 14, padding: '24px 20px', textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 9, color: 'var(--gold)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10 }}>
            {lockedCount > 0 ? `${lockedCount} התאמות נוספות` : 'הגישה המלאה'}
          </p>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.2 }}>
            רוצה את שאר {lockedCount} ההתאמות?
          </h2>
          <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 18, lineHeight: 1.6 }}>
            השאר אימייל ותקבל את כל 10 ההתאמות + הסבר מלא לכל אחת.
          </p>
          <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              type="email"
              placeholder="האימייל שלך"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              dir="rtl"
              aria-label="כתובת אימייל"
              style={{
                padding: '13px 16px', borderRadius: 8,
                border: '1px solid rgba(201,169,97,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--text-primary)', fontSize: 14,
                width: '100%', boxSizing: 'border-box', outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={loading || !email.includes('@')}
              style={{
                padding: '13px', borderRadius: 8, border: 'none',
                background: email.includes('@') ? 'var(--gold)' : 'rgba(201,169,97,0.3)',
                color: '#050505', fontSize: 13, fontWeight: 600,
                cursor: email.includes('@') && !loading ? 'pointer' : 'not-allowed',
                transition: 'opacity 0.2s', minHeight: 48,
              }}
            >
              {loading ? 'טוען...' : 'חשוף את כל 10 ההמלצות'}
            </button>
          </form>
          <p style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 10 }}>בלי spam. ביטול בכל עת.</p>
        </motion.div>
      </main>
    </div>
  );
}
