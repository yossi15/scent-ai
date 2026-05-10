'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { fragrances, type Fragrance } from '@/data/fragrances';

interface Props {
  onCollectionChange: (collection: Fragrance[]) => void;
}

export default function SignatureMatch({ onCollectionChange }: Props) {
  const [liked,    setLiked]    = useState<number[]>([]);
  const [disliked, setDisliked] = useState<number[]>([]);
  const [matches,  setMatches]  = useState<Fragrance[]>([]);
  const [computed, setComputed] = useState(false);
  const router = useRouter();

  const SAMPLE_COUNT = 8;
  const sampleIds = fragrances.slice(0, SAMPLE_COUNT).map(f => f.id);

  const toggle = (id: number, direction: 'like' | 'dislike') => {
    if (direction === 'like') {
      setLiked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
      setDisliked(prev => prev.filter(x => x !== id));
    } else {
      setDisliked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
      setLiked(prev => prev.filter(x => x !== id));
    }
    setComputed(false);
  };

  const compute = () => {
    const likedFrags  = fragrances.filter(f => liked.includes(f.id));
    const dislikeds   = fragrances.filter(f => disliked.includes(f.id));

    if (likedFrags.length === 0) return;

    const avgProfile = {
      woody:    likedFrags.reduce((s, f) => s + f.radarProfile.woody,    0) / likedFrags.length,
      floral:   likedFrags.reduce((s, f) => s + f.radarProfile.floral,   0) / likedFrags.length,
      oriental: likedFrags.reduce((s, f) => s + f.radarProfile.oriental, 0) / likedFrags.length,
      fresh:    likedFrags.reduce((s, f) => s + f.radarProfile.fresh,    0) / likedFrags.length,
      gourmand: likedFrags.reduce((s, f) => s + f.radarProfile.gourmand, 0) / likedFrags.length,
      animalic: likedFrags.reduce((s, f) => s + f.radarProfile.animalic, 0) / likedFrags.length,
    };

    const dislikedSet = new Set(dislikeds.map(f => f.id));
    const likedSet    = new Set(likedFrags.map(f => f.id));

    const results = fragrances
      .filter(f => !likedSet.has(f.id) && !dislikedSet.has(f.id))
      .map(f => {
        const dist = (Object.keys(avgProfile) as Array<keyof typeof avgProfile>)
          .reduce((s, k) => s + Math.abs(f.radarProfile[k] - avgProfile[k]), 0);
        return { f, score: -dist + f.rating * 2 };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(x => x.f);

    setMatches(results);
    setComputed(true);
    onCollectionChange([...likedFrags, ...results]);
  };

  return (
    <section className="py-28 px-4" aria-labelledby="signature-heading">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">
            אלגוריתם
          </p>
          <h2 id="signature-heading" className="font-serif text-4xl md:text-5xl gold-text font-bold mb-3">
            ה-Signature שלך
          </h2>
          <p className="text-ink-muted text-sm font-hebrew font-light max-w-md mx-auto">
            סמן אהוב / לא אהוב ונמצא לך בשמים דומים
          </p>
        </motion.div>

        {/* Sample fragrances */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {fragrances.filter(f => sampleIds.includes(f.id)).map((f, i) => {
            const isLiked    = liked.includes(f.id);
            const isDisliked = disliked.includes(f.id);
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`card p-4 text-center transition-all duration-200 ${isLiked ? 'border-gold' : isDisliked ? 'border-red-300 opacity-60' : ''}`}
              >
                <p className="font-serif text-sm text-ink font-semibold truncate mb-0.5" dir="ltr">{f.name}</p>
                <p className="text-[10px] text-ink-faint font-sans mb-3 truncate" dir="ltr">{f.house}</p>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => toggle(f.id, 'like')}
                    aria-label={`אהבתי את ${f.name}`}
                    aria-pressed={isLiked}
                    className={`p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${isLiked ? 'bg-gold/10 text-gold' : 'text-ink-faint hover:text-gold hover:bg-gold-faint'}`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-gold' : ''}`} />
                  </button>
                  <button
                    onClick={() => toggle(f.id, 'dislike')}
                    aria-label={`לא אהבתי את ${f.name}`}
                    aria-pressed={isDisliked}
                    className={`p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${isDisliked ? 'bg-red-50 text-red-400' : 'text-ink-faint hover:text-red-400 hover:bg-red-50'}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mb-8">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={compute}
            disabled={liked.length === 0}
            className="btn-gold px-8 py-3.5 rounded-xl font-hebrew text-sm font-semibold flex items-center gap-2 mx-auto disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Sparkles className="w-4 h-4" />
            מצא לי בשמים מתאימים
          </motion.button>
        </div>

        <AnimatePresence>
          {computed && matches.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="card p-6"
            >
              <h3 className="font-serif text-xl text-ink font-semibold mb-4">ההמלצות שלי עבורך</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {matches.map(f => (
                  <button
                    key={f.id}
                    onClick={() => router.push(`/fragrance/${f.id}`)}
                    className="p-3 rounded-xl border border-gold-border bg-gold-faint hover:bg-gold/10 transition-all text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <p className="font-serif text-sm text-ink font-semibold truncate" dir="ltr">{f.name}</p>
                    <p className="text-[10px] text-ink-muted font-sans truncate" dir="ltr">{f.house}</p>
                    <p className="text-gold font-serif text-base font-bold mt-1">₪{f.price.toLocaleString()}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
