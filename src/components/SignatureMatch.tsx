'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ChevronLeft, Sparkles, Droplets } from 'lucide-react';
import { fragrances, type Fragrance } from '@/data/fragrances';

function getSignatureMatch(collection: Fragrance[]): { match: Fragrance; reasoning: string } | null {
  if (collection.length === 0) return null;

  const avg = { woody: 0, floral: 0, oriental: 0, fresh: 0, gourmand: 0, animalic: 0 };
  collection.forEach((f) => {
    (Object.keys(avg) as (keyof typeof avg)[]).forEach((k) => {
      avg[k] += f.radarProfile[k];
    });
  });
  (Object.keys(avg) as (keyof typeof avg)[]).forEach((k) => {
    avg[k] /= collection.length;
  });

  const candidates = fragrances.filter((f) => !collection.find((c) => c.id === f.id));
  if (candidates.length === 0) return null;

  let best = candidates[0];
  let bestScore = -Infinity;

  candidates.forEach((c) => {
    let similarity = 0;
    let novelty = 0;
    (Object.keys(avg) as (keyof typeof avg)[]).forEach((k) => {
      const diff = Math.abs(c.radarProfile[k] - avg[k]);
      if (diff <= 2) similarity += (3 - diff);
      if (c.radarProfile[k] > avg[k] + 2) novelty += (c.radarProfile[k] - avg[k]);
    });
    const score = similarity * 2 + novelty * 3 + c.rating * 2;
    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  });

  const dimensionNames: Record<string, string> = {
    woody: 'עצי', floral: 'פרחוני', oriental: 'מזרחי',
    fresh: 'רענן', gourmand: 'גורמה', animalic: 'אנימלי',
  };

  const collectionNotes = new Set(collection.flatMap((f) => f.notes.map((n) => n.name)));
  const newNotes = best.notes.filter((n) => !collectionNotes.has(n.name));

  const dominantKeys = (Object.keys(avg) as (keyof typeof avg)[])
    .filter((k) => best.radarProfile[k] > avg[k] + 1)
    .sort((a, b) => best.radarProfile[b] - best.radarProfile[a]);

  const topTwo = Object.entries(avg).sort((a, b) => b[1] - a[1]).slice(0, 2);
  const profileDesc = topTwo.map(([k]) => dimensionNames[k]).join(' ו');

  const dimensionWord = dominantKeys.length > 0 ? dimensionNames[dominantKeys[0]] : 'מאוזן';

  const heartNotes = best.notes.filter(n => n.type === 'heart').map(n => n.name).join(', ');
  const newNotesStr = newNotes.length > 0
    ? newNotes.slice(0, 3).map(n => n.name).join(', ')
    : 'אקורדים מוכרים בעומק חדש';

  const reasoning = `בהתבסס על ה-DNA הריחני שלך — שנוטה ל${profileDesc} — ${best.name} של ${best.house} מציג ממד ${dimensionWord} מרתק. תווי הלב של ${heartNotes} יוצרים גשר להעדפות הקיימות שלך, תוך הכנסת ${newNotesStr} לאוצר המילים הריחני שלך.`;

  return { match: best, reasoning };
}

const quickSelectOptions = [
  { id: 1, label: 'Aventus' },
  { id: 8, label: 'BR540' },
  { id: 9, label: 'Tobacco Vanille' },
  { id: 7, label: 'Oud Wood' },
  { id: 5, label: 'Portrait of a Lady' },
  { id: 11, label: 'Layton' },
  { id: 3, label: 'Naxos' },
  { id: 23, label: 'Hacivat' },
  { id: 49, label: 'Santal 33' },
  { id: 28, label: 'Pegasus' },
  { id: 35, label: 'Green Irish Tweed' },
  { id: 43, label: "Bal d'Afrique" },
];

export default function SignatureMatch() {
  const [myCollection, setMyCollection] = useState<Fragrance[]>([]);
  const [result, setResult] = useState<{ match: Fragrance; reasoning: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const toggleInCollection = (id: number) => {
    const frag = fragrances.find((f) => f.id === id);
    if (!frag) return;
    setMyCollection((prev) =>
      prev.find((f) => f.id === id)
        ? prev.filter((f) => f.id !== id)
        : [...prev, frag]
    );
    setResult(null);
  };

  const analyze = () => {
    setIsAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      const match = getSignatureMatch(myCollection);
      setResult(match);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <section id="match" className="py-20 px-4 section-accent">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">
            AI INTELLIGENCE
          </p>
          <h2 className="font-serif text-4xl md:text-5xl gold-text mb-3 font-bold">
            התאמת חתימה
          </h2>
          <p className="text-ink-muted text-sm font-hebrew max-w-md mx-auto font-light">
            בחר את הבשמים שבאוסף שלך ותן ל-AI לגלות את יצירת המופת הבאה
          </p>
        </motion.div>

        <div className="card p-6 md:p-8 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gold-faint flex items-center justify-center">
              <Brain className="w-4 h-4 text-gold" />
            </div>
            <h3 className="font-serif text-xl text-ink font-semibold">האוסף שלך</h3>
          </div>
          <p className="text-ink-muted text-xs font-hebrew mb-4 font-light">
            בחר את הבשמים שאתה מחזיק כרגע:
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {quickSelectOptions.map((opt) => {
              const isSelected = myCollection.find((f) => f.id === opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => toggleInCollection(opt.id)}
                  className={`px-4 py-2 text-xs font-sans border rounded-full transition-all duration-200 ${
                    isSelected
                      ? 'bg-gold text-white border-gold shadow-sm'
                      : 'bg-bg-card border-black/[0.06] text-ink-muted hover:border-gold-border hover:text-gold'
                  }`}
                  dir="ltr"
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={analyze}
            disabled={myCollection.length < 2 || isAnalyzing}
            className="btn-gold w-full py-3.5 font-hebrew text-sm tracking-wide rounded-lg disabled:opacity-25 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                מנתח DNA ריחני...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                מצא את יצירת המופת הבאה שלי
              </>
            )}
          </button>

          {myCollection.length < 2 && myCollection.length > 0 && (
            <p className="text-ink-faint text-xs font-hebrew text-center mt-2">
              בחר לפחות 2 בשמים לניתוח
            </p>
          )}
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="card-gold p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-gold" />
                <p className="text-gold text-xs font-hebrew font-medium">
                  יצירת המופת הבאה שלך
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <span className="text-5xl block mb-3">{result.match.image}</span>
                  <p className="text-gold text-[10px] tracking-[0.25em] uppercase font-sans font-medium" dir="ltr">
                    {result.match.house}
                  </p>
                  <h3 className="font-serif text-3xl text-ink mt-1 mb-2 font-semibold" dir="ltr">{result.match.name}</h3>
                  <p className="text-ink-faint text-xs font-sans mb-4" dir="ltr">
                    {result.match.family} &middot; {result.match.concentration} &middot; ₪{result.match.price.toLocaleString()}
                  </p>

                  <div className="bg-bg-secondary rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-3 h-3 text-gold" />
                      <span className="text-gold text-[10px] font-hebrew font-medium">ניתוח AI</span>
                    </div>
                    <p className="text-ink-secondary text-sm font-hebrew leading-relaxed font-light">
                      {result.reasoning}
                    </p>
                  </div>
                </div>

                <div className="md:w-64">
                  <div className="flex items-center gap-2 mb-3">
                    <Droplets className="w-4 h-4 text-gold" />
                    <h4 className="font-serif text-base text-ink font-semibold">פירמידת הריח</h4>
                  </div>

                  {(['top', 'heart', 'base'] as const).map((type) => {
                    const notes = result.match.notes.filter((n) => n.type === type);
                    if (notes.length === 0) return null;
                    const labels = { top: '🌿 ראש', heart: '🌸 לב', base: '🪵 בסיס' };
                    const noteStyles = {
                      top: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                      heart: 'bg-rose-50 text-rose-700 border-rose-200',
                      base: 'bg-amber-50 text-amber-700 border-amber-200',
                    };
                    return (
                      <div key={type} className="mb-3">
                        <p className="text-[11px] font-hebrew mb-1.5 text-ink-muted">{labels[type]}</p>
                        <div className="flex flex-wrap gap-1" dir="ltr">
                          {notes.map((n) => (
                            <span key={n.name} className={`text-[11px] px-2 py-0.5 border rounded-full font-sans ${noteStyles[type]}`}>
                              {n.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  <button className="btn-outline w-full mt-4 py-2.5 text-xs font-hebrew rounded-lg">
                    הוסף לרשימת המשאלות
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
