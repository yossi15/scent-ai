'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Lock, ExternalLink, Loader2, ArrowLeft, ShoppingBag, RotateCcw } from 'lucide-react';
import { fragrances } from '@/data/fragrances';
import type { MatchResponse } from '@/app/api/match/route';

const POPULAR = [
  'Dior Sauvage', 'Bleu de Chanel', 'YSL Y EDP',
  'Creed Aventus', 'Tom Ford Tobacco Vanille', 'Baccarat Rouge 540',
  'Le Labo Santal 33', 'Acqua di Gio', 'Versace Eros',
];

function scrollToSubscribe() {
  document.getElementById('subscribe')?.scrollIntoView({ behavior: 'smooth' });
}

export default function QuickMatch() {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MatchResponse | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build suggestion list from POPULAR + catalog (top 200, deduped)
  const allSuggestions = useMemo(() => {
    const fromCatalog = fragrances.slice(0, 200).map(f => `${f.house} ${f.name}`);
    const seen = new Set<string>();
    return [...POPULAR, ...fromCatalog].filter(s => {
      const k = s.toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }, []);

  const matchingSuggestions = useMemo(() => {
    const q = input.trim().toLowerCase();
    if (!q) return POPULAR.slice(0, 6);
    return allSuggestions
      .filter(s => s.toLowerCase().includes(q))
      .slice(0, 8);
  }, [input, allSuggestions]);

  const submit = async (value?: string) => {
    const fragrance = (value ?? input).trim();
    if (!fragrance) return;
    setShowSuggestions(false);
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fragrance }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'הניתוח נכשל');
      setResult(data as MatchResponse);
      // Scroll to result
      setTimeout(() => {
        document.getElementById('quickmatch-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'שגיאה');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setInput('');
    setTimeout(() => {
      document.getElementById('quickmatch')?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }, 50);
  };

  return (
    <section id="quickmatch" className="py-16 md:py-20 px-4 section-accent">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">
            QUICK MATCH
          </p>
          <h2 className="font-serif text-3xl md:text-5xl gold-text mb-3 font-bold">
            מצא את הבושם המושלם ב-30 שניות
          </h2>
          <p className="text-ink-muted text-sm md:text-base font-hebrew max-w-md mx-auto font-light">
            התאמת בשמים מבוססת AI לפי הטעם שלך
          </p>
        </motion.div>

        {/* Search input */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <div className="card !p-2 flex items-center gap-2 shadow-lg">
            <Search className="w-5 h-5 text-ink-faint mr-1 shrink-0" aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              placeholder="הכנס בושם שאתה מכיר... (לדוגמה: Dior Sauvage)"
              value={input}
              onChange={(e) => { setInput(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !loading) submit(); }}
              className="flex-1 bg-transparent text-ink text-base font-hebrew placeholder:text-ink-faint/60 focus:outline-none py-2.5 min-w-0"
              dir="auto"
              autoComplete="off"
              disabled={loading}
            />
            <button
              onClick={() => submit()}
              disabled={loading || !input.trim()}
              className="bg-[#0D0D0D] text-white text-sm font-hebrew font-semibold px-5 py-3 rounded-lg hover:bg-[#1a1a1a] transition-colors disabled:opacity-50 flex items-center gap-1.5 shrink-0 min-h-[44px]"
              data-cta-dark
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> מנתח...</>
              ) : (
                <><Sparkles className="w-4 h-4" /> התחל עכשיו</>
              )}
            </button>
          </div>

          {/* Autocomplete suggestions */}
          <AnimatePresence>
            {showSuggestions && !loading && matchingSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 card !p-2 shadow-xl z-30 max-h-72 overflow-y-auto"
              >
                <p className="text-[10px] font-hebrew text-ink-faint px-2 py-1 uppercase tracking-wider">
                  {input.trim() ? 'הצעות' : 'פופולריים'}
                </p>
                {matchingSuggestions.map((s) => (
                  <button
                    key={s}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => { setInput(s); submit(s); }}
                    className="w-full text-right px-3 py-2 text-sm font-hebrew text-ink hover:bg-bg-secondary rounded transition-colors flex items-center justify-between gap-2"
                    dir="ltr"
                  >
                    <span className="text-xs text-ink-faint">↵</span>
                    <span>{s}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {error && (
          <p className="text-red-500 text-sm font-hebrew text-center mb-6">{error}</p>
        )}

        {/* Loading state */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Loader2 className="w-8 h-8 animate-spin text-gold mx-auto mb-3" />
            <p className="text-ink-muted text-sm font-hebrew">מנתח את הטעם שלך...</p>
          </motion.div>
        )}

        {/* Result */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              id="quickmatch-result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Profile card */}
              <div className="card-gold !p-6 md:!p-8">
                <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                  <div>
                    <p className="text-[10px] font-hebrew text-gold uppercase tracking-wider mb-1">פרופיל הריח שלך</p>
                    <h3 className="font-serif text-xl md:text-2xl text-ink font-bold" dir="ltr">{result.input_fragrance}</h3>
                  </div>
                  <button
                    onClick={reset}
                    className="text-xs text-ink-muted hover:text-gold font-hebrew flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border min-h-[36px]"
                  >
                    <RotateCcw className="w-3 h-3" /> בדוק בושם אחר
                  </button>
                </div>

                {/* Traits */}
                {result.traits && result.traits.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {result.traits.map((t) => (
                      <span
                        key={t}
                        className="bg-gold/10 text-[#8B7355] text-xs font-hebrew font-semibold px-3 py-1.5 rounded-full border border-gold/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Insight */}
                <p className="text-ink-secondary text-sm md:text-base font-hebrew leading-relaxed">
                  <Sparkles className="inline w-4 h-4 text-gold ml-1.5 -mt-0.5" />
                  {result.insight}
                </p>

                {/* Profile chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5 pt-4 border-t border-gold/20">
                  <ProfileChip label="סוג" value={result.profile.scent_type} />
                  <ProfileChip label="עוצמה" value={result.profile.intensity} />
                  <ProfileChip label="עונה" value={result.profile.season?.join(', ')} />
                  <ProfileChip label="סגנון" value={result.profile.style} />
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-serif text-lg md:text-xl text-ink font-semibold mb-4 text-center">
                  ההמלצות שלנו עבורך
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {result.recommendations.map((rec, i) => (
                    <RecCard key={i} rec={rec} index={i} />
                  ))}
                </div>
              </div>

              {/* Premium upsell */}
              {result.premium_recommendations && result.premium_recommendations.length > 0 && (
                <div className="card !p-6 md:!p-8 relative overflow-hidden">
                  <div className="text-center mb-5">
                    <div className="inline-flex items-center gap-1.5 bg-gold/10 text-gold text-[11px] font-hebrew font-semibold px-3 py-1 rounded-full border border-gold/30 mb-3">
                      <Lock className="w-3 h-3" /> פרימיום
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl text-ink font-bold mb-1">
                      גלה התאמות פרימיום
                    </h3>
                    <p className="text-ink-muted text-sm font-hebrew">
                      קבל גישה לעסקאות בלעדיות והתאמה עמוקה יותר
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 mb-6">
                    {result.premium_recommendations.map((p, i) => (
                      <div
                        key={i}
                        className="relative bg-bg-secondary rounded-xl p-4 border border-border overflow-hidden"
                      >
                        <div className="filter blur-sm select-none pointer-events-none">
                          <div className="w-full h-16 bg-gradient-to-br from-gold/20 to-amber-100/20 rounded-lg mb-2" />
                          <p className="font-serif text-ink font-semibold text-sm" dir="ltr">{p.name}</p>
                          <p className="text-ink-muted text-xs mt-1">★★★★★ 4.8</p>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="w-6 h-6 text-gold/60" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <button
                      onClick={scrollToSubscribe}
                      data-cta-dark
                      className="inline-flex items-center gap-2 bg-[#0D0D0D] text-white text-sm font-hebrew font-semibold px-6 py-3 rounded-lg hover:bg-[#1a1a1a] transition-colors min-h-[48px] shadow-md"
                    >
                      שדרג מ-₪49 לחודש <ArrowLeft className="w-4 h-4" />
                    </button>
                    <p className="text-[11px] text-ink-faint font-hebrew mt-2">
                      ביטול בכל עת · 14 ימי החזר
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ProfileChip({ label, value }: { label: string; value?: string }) {
  return (
    <div className="text-center">
      <p className="text-[10px] font-hebrew text-ink-faint uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-xs font-hebrew text-ink font-medium" dir="auto">{value || '-'}</p>
    </div>
  );
}

function RecCard({ rec, index }: { rec: MatchResponse['recommendations'][number]; index: number }) {
  const [imgError, setImgError] = useState(false);
  const showImage = !!rec.image_url && !imgError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card !p-0 overflow-hidden flex flex-col"
    >
      {/* Image area */}
      <div className="relative h-44 bg-[#F5F3EE] dark:bg-bg-secondary flex items-center justify-center overflow-hidden">
        {showImage ? (
          <Image
            src={rec.image_url}
            alt={rec.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain p-4"
            onError={() => setImgError(true)}
          />
        ) : (
          <Sparkles className="w-10 h-10 text-gold/40" />
        )}
        {rec.in_catalog && (
          <span className="absolute top-2 right-2 text-[10px] font-hebrew bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
            במאגר שלנו
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <p className="font-serif text-base text-ink font-semibold leading-tight" dir="ltr">{rec.name}</p>
          <p className="text-[11px] text-ink-muted font-sans" dir="ltr">{rec.brand}</p>
        </div>

        <p className="text-xs font-hebrew text-ink-secondary leading-relaxed mb-2 line-clamp-2">
          {rec.description}
        </p>

        <p className="text-[11px] font-hebrew text-[#8B7355] leading-relaxed mb-3 italic">
          <Sparkles className="inline w-3 h-3 ml-1 -mt-0.5" />
          {rec.match_reason}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-border">
          <span className="font-serif text-base text-gold font-bold" dir="ltr">{rec.price_range}</span>
          <a
            href={rec.affiliate_link}
            target="_blank"
            rel="noopener nofollow sponsored"
            className="flex items-center gap-1.5 bg-[#0D0D0D] text-white text-xs font-hebrew font-semibold px-3 py-2 rounded-lg hover:bg-[#1a1a1a] transition-colors min-h-[36px]"
            data-cta-dark
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            קנה עכשיו
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
