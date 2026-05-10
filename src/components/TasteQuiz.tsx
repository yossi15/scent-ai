'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fragrances } from '@/data/fragrances';

interface Question {
  id: string;
  text: string;
  options: { value: string; label: string; scores: Partial<Record<string, number>> }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'mood',
    text: 'מה מרגיש לך הכי טבעי?',
    options: [
      { value: 'warm',  label: 'חמים ועוטף',   scores: { oriental: 3, gourmand: 2 } },
      { value: 'fresh', label: 'רענן ונקי',    scores: { fresh: 3, woody: 1 } },
      { value: 'dark',  label: 'אפל ומסתורי',  scores: { animalic: 2, oriental: 2, woody: 2 } },
      { value: 'light', label: 'קליל ופרחוני', scores: { floral: 3, fresh: 1 } },
    ],
  },
  {
    id: 'season',
    text: 'באיזו עונה תשתמש בבושם הזה?',
    options: [
      { value: 'summer', label: 'קיץ',  scores: { fresh: 3 } },
      { value: 'winter', label: 'חורף', scores: { oriental: 3, gourmand: 2 } },
      { value: 'spring', label: 'אביב', scores: { floral: 3 } },
      { value: 'fall',   label: 'סתיו', scores: { woody: 3, oriental: 1 } },
    ],
  },
  {
    id: 'occasion',
    text: 'לאיזו הזדמנות?',
    options: [
      { value: 'daily',    label: 'יומיומי',  scores: { fresh: 2, woody: 1 } },
      { value: 'evening',  label: 'ערב',       scores: { oriental: 2, gourmand: 2 } },
      { value: 'office',   label: 'עסקי',     scores: { fresh: 1, floral: 1, woody: 2 } },
      { value: 'romantic', label: 'רומנטי',   scores: { floral: 2, oriental: 2, animalic: 1 } },
    ],
  },
  {
    id: 'intensity',
    text: 'איזו עוצמת ריח?',
    options: [
      { value: 'subtle',  label: 'עדין',           scores: { fresh: 2 } },
      { value: 'moderate', label: 'מאוזן',         scores: { floral: 1, woody: 1 } },
      { value: 'strong',   label: 'חזק ונוכח',    scores: { oriental: 2, animalic: 1 } },
      { value: 'beast',    label: 'מקסימום',      scores: { animalic: 2, oriental: 3 } },
    ],
  },
];

type Scores = Record<string, number>;

function computeMatches(scores: Scores) {
  const keys = Object.keys(scores);
  return fragrances
    .map(f => {
      let score = 0;
      keys.forEach(k => {
        const val = f.radarProfile[k as keyof typeof f.radarProfile] ?? 0;
        score += val * (scores[k] ?? 0);
      });
      return { f, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(x => x.f);
}

const eyebrow: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '11px',
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: '#999',
};

const heading: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontWeight: 600,
  fontSize: 'clamp(32px, 5vw, 48px)',
  lineHeight: 1.1,
  letterSpacing: '-0.01em',
  color: '#000',
};

const qStyle: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontWeight: 500,
  fontSize: '28px',
  color: '#000',
  letterSpacing: '-0.005em',
  lineHeight: 1.3,
};

const optStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '14px',
  color: '#000',
  letterSpacing: '0.3px',
};

const metaStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 300,
  fontSize: '11px',
  color: '#999',
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
};

const linkStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '11px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: '#000',
  borderBottom: '1px solid #000',
  paddingBottom: '4px',
  display: 'inline-block',
};

export default function TasteQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Scores>({});
  const [done, setDone] = useState(false);
  const router = useRouter();

  const matches = done ? computeMatches(scores) : [];

  const answer = (opt: Question['options'][0]) => {
    const next = { ...scores };
    Object.entries(opt.scores).forEach(([k, v]) => { next[k] = (next[k] ?? 0) + (v ?? 0); });
    setScores(next);
    if (step + 1 < QUESTIONS.length) setStep(s => s + 1);
    else setDone(true);
  };

  const reset = () => { setStep(0); setScores({}); setDone(false); };

  const q = QUESTIONS[step];

  return (
    <section
      id="quiz"
      className="py-32 px-6"
      style={{ background: '#FAF8F4' }}
      aria-labelledby="quiz-heading"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-20">
          <p style={eyebrow} className="mb-4">Taste Quiz</p>
          <h2 id="quiz-heading" style={heading}>שאלון טעמים</h2>
        </div>

        {!done ? (
          <div>
            <p style={metaStyle} className="mb-6 text-center" dir="ltr">
              {step + 1} / {QUESTIONS.length}
            </p>

            <h3 style={qStyle} className="mb-12 text-center">{q.text}</h3>

            <div className="space-y-1" style={{ borderTop: '1px solid #eee' }}>
              {q.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => answer(opt)}
                  className="w-full text-right py-6 hover:opacity-60 transition-opacity"
                  style={{ ...optStyle, borderBottom: '1px solid #eee' }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p style={metaStyle} className="mb-6 text-center">Your matches</p>
            <h3 style={qStyle} className="mb-12 text-center">ההמלצות שלנו</h3>

            <div style={{ borderTop: '1px solid #eee' }}>
              {matches.map(f => (
                <button
                  key={f.id}
                  onClick={() => router.push(`/fragrance/${f.id}`)}
                  className="w-full flex items-baseline justify-between py-6 hover:opacity-60 transition-opacity"
                  style={{ borderBottom: '1px solid #eee' }}
                >
                  <span dir="ltr" className="text-left">
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        fontSize: '10px',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        color: '#999',
                        display: 'block',
                        marginBottom: '4px',
                      }}
                    >
                      {f.house}
                    </span>
                    <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 500, fontSize: '20px', color: '#000', letterSpacing: '-0.005em' }}>
                      {f.name}
                    </span>
                  </span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: '#000' }}>
                    View →
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-10 mt-12">
              <button onClick={reset} style={linkStyle} className="hover:opacity-60 transition-opacity">
                Restart
              </button>
              <a href="#collection" style={linkStyle} className="hover:opacity-60 transition-opacity">
                View collection
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
