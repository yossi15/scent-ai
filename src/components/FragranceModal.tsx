'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Clock, Wind, Droplets } from 'lucide-react';
import type { Fragrance } from '@/data/fragrances';

interface Props {
  fragrance: Fragrance | null;
  onClose: () => void;
}

const noteColors = {
  top: 'border-emerald-600/25 text-emerald-700/70 bg-emerald-50/50',
  heart: 'border-rose-600/25 text-rose-700/70 bg-rose-50/50',
  base: 'border-amber-600/25 text-amber-700/70 bg-amber-50/50',
};

const noteLabels = {
  top: 'תווי ראש',
  heart: 'תווי לב',
  base: 'תווי בסיס',
};

export default function FragranceModal({ fragrance, onClose }: Props) {
  if (!fragrance) return null;

  const groupedNotes = {
    top: fragrance.notes.filter((n) => n.type === 'top'),
    heart: fragrance.notes.filter((n) => n.type === 'heart'),
    base: fragrance.notes.filter((n) => n.type === 'base'),
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-warm-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl border border-gold/10"
        >
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-ink-muted/40 hover:text-ink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <span className="text-5xl block mb-3">{fragrance.image}</span>
            <p className="text-gold/70 text-[10px] tracking-[0.25em] uppercase font-sans" dir="ltr">
              {fragrance.house}
            </p>
            <h2 className="font-serif text-3xl text-ink mt-1" dir="ltr">{fragrance.name}</h2>
            <p className="text-ink-muted/50 text-xs font-sans mt-1" dir="ltr">
              {fragrance.family} &middot; {fragrance.year} &middot; {fragrance.concentration}
            </p>
          </div>

          <p className="text-ink-muted/70 text-sm font-hebrew leading-relaxed text-center mb-6 italic" dir="ltr">
            &ldquo;{fragrance.description}&rdquo;
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-shell rounded-lg p-3 text-center">
              <Star className="w-4 h-4 text-gold mx-auto mb-1" />
              <span className="text-gold text-lg font-serif">{fragrance.rating}</span>
              <p className="text-ink-muted/40 text-[10px] font-hebrew">דירוג</p>
            </div>
            <div className="bg-shell rounded-lg p-3 text-center">
              <Clock className="w-4 h-4 text-gold mx-auto mb-1" />
              <span className="text-gold text-lg font-serif">{fragrance.longevity}/10</span>
              <p className="text-ink-muted/40 text-[10px] font-hebrew">עמידות</p>
            </div>
            <div className="bg-shell rounded-lg p-3 text-center">
              <Wind className="w-4 h-4 text-gold mx-auto mb-1" />
              <span className="text-gold text-lg font-serif">{fragrance.sillage}/10</span>
              <p className="text-ink-muted/40 text-[10px] font-hebrew">הקרנה</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="w-4 h-4 text-gold" />
              <h3 className="font-serif text-lg text-ink">פירמידת הריח</h3>
            </div>

            {(['top', 'heart', 'base'] as const).map((type) => (
              <div key={type} className="mb-3">
                <p className="text-ink-muted/60 text-[10px] tracking-wider font-hebrew mb-1.5">
                  {noteLabels[type]}
                </p>
                <div className="flex flex-wrap gap-1.5" dir="ltr">
                  {groupedNotes[type].map((note) => (
                    <span
                      key={note.name}
                      className={`text-xs px-2.5 py-1 border rounded-full font-sans ${noteColors[type]}`}
                    >
                      {note.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-6" dir="ltr">
            {fragrance.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-wider uppercase px-3 py-1 border border-gold/20 text-gold/70 font-sans"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-ink/5">
            <button className="px-6 py-2.5 gold-gradient-bg text-white font-hebrew font-medium text-xs tracking-wide hover:opacity-90 transition-opacity rounded-sm">
              הוסף לאוסף
            </button>
            <div dir="ltr">
              <span className="text-gold font-serif text-2xl">₪{fragrance.price.toLocaleString()}</span>
              <span className="text-ink-muted/40 text-sm font-sans ml-1">/ {fragrance.size}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
