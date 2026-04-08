'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Clock, Wind, Droplets } from 'lucide-react';
import type { Fragrance } from '@/data/fragrances';

interface Props {
  fragrance: Fragrance | null;
  onClose: () => void;
}

const noteStyles = {
  top: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  heart: 'bg-rose-50 text-rose-700 border-rose-200',
  base: 'bg-amber-50 text-amber-700 border-amber-200',
};

const noteLabels = {
  top: 'תווי ראש',
  heart: 'תווי לב',
  base: 'תווי בסיס',
};

const noteIcons = {
  top: '🌿',
  heart: '🌸',
  base: '🪵',
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
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-ink-faint hover:text-ink p-1 rounded-full hover:bg-bg-secondary transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <span className="text-5xl block mb-3">{fragrance.image}</span>
            <p className="text-gold text-[10px] tracking-[0.25em] uppercase font-sans font-medium" dir="ltr">
              {fragrance.house}
            </p>
            <h2 className="font-serif text-3xl text-ink mt-1 font-semibold" dir="ltr">{fragrance.name}</h2>
            <p className="text-ink-faint text-xs font-sans mt-1" dir="ltr">
              {fragrance.family} &middot; {fragrance.year} &middot; {fragrance.concentration}
            </p>
          </div>

          {/* Description */}
          <p className="text-ink-muted text-sm leading-relaxed text-center mb-6 italic font-serif text-lg" dir="ltr">
            &ldquo;{fragrance.description}&rdquo;
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { icon: <Star className="w-4 h-4" />, val: fragrance.rating.toString(), label: 'דירוג' },
              { icon: <Clock className="w-4 h-4" />, val: `${fragrance.longevity}/10`, label: 'עמידות' },
              { icon: <Wind className="w-4 h-4" />, val: `${fragrance.sillage}/10`, label: 'הקרנה' },
            ].map((s) => (
              <div key={s.label} className="bg-bg-secondary rounded-xl p-3 text-center">
                <div className="text-gold mx-auto mb-1 flex justify-center">{s.icon}</div>
                <span className="text-ink font-serif text-lg font-semibold">{s.val}</span>
                <p className="text-ink-faint text-[10px] font-hebrew mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Olfactory Pyramid */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="w-4 h-4 text-gold" />
              <h3 className="font-serif text-xl text-ink font-semibold">פירמידת הריח</h3>
            </div>

            {(['top', 'heart', 'base'] as const).map((type) => (
              groupedNotes[type].length > 0 && (
                <div key={type} className="mb-3">
                  <p className="text-ink-muted text-[11px] font-hebrew mb-1.5 flex items-center gap-1.5">
                    <span>{noteIcons[type]}</span>
                    {noteLabels[type]}
                  </p>
                  <div className="flex flex-wrap gap-1.5" dir="ltr">
                    {groupedNotes[type].map((note) => (
                      <span
                        key={note.name}
                        className={`text-xs px-3 py-1 border rounded-full font-sans font-medium ${noteStyles[type]}`}
                      >
                        {note.name}
                      </span>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6" dir="ltr">
            {fragrance.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-black/[0.05]">
            <button className="btn-gold px-6 py-2.5 font-hebrew text-xs tracking-wide rounded-lg">
              הוסף לאוסף
            </button>
            <div dir="ltr">
              <span className="text-gold font-serif text-2xl font-semibold">₪{fragrance.price.toLocaleString()}</span>
              <span className="text-ink-faint text-sm font-sans ml-1">/ {fragrance.size}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
