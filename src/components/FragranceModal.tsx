'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { X, Star, Clock, Wind, Droplets, Plus, Check, ShoppingBag } from 'lucide-react';
import type { Fragrance } from '@/data/fragrances';

interface Props {
  fragrance: Fragrance | null;
  onClose: () => void;
  inCollection?: boolean;
  onToggleCollection?: (f: Fragrance) => void;
  onBuy?: (f: Fragrance) => void;
}

const noteStyles = {
  top: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  heart: 'bg-rose-50 text-rose-700 border-rose-200',
  base: 'bg-amber-50 text-amber-700 border-amber-200',
};

const familyGradients: Record<string, string> = {
  'Fruity Chypre': 'from-amber-100 via-yellow-50 to-lime-50',
  'Oriental Spicy': 'from-red-100 via-orange-50 to-amber-50',
  'Oriental Gourmand': 'from-amber-100 via-orange-50 to-yellow-50',
  'Aromatic Citrus': 'from-teal-100 via-cyan-50 to-blue-50',
  'Oriental Floral': 'from-purple-100 via-pink-50 to-rose-50',
  'Woody Aromatic': 'from-emerald-100 via-green-50 to-lime-50',
  'Woody Oriental': 'from-stone-200 via-amber-50 to-orange-50',
  'Floral Woody': 'from-rose-100 via-pink-50 to-amber-50',
  'Citrus Aromatic': 'from-yellow-100 via-lime-50 to-green-50',
  'Aromatic Fougère': 'from-green-100 via-emerald-50 to-teal-50',
  'Oriental Woody': 'from-amber-200 via-stone-100 to-orange-50',
  'Woody Spicy': 'from-stone-200 via-red-50 to-amber-50',
  'Green Aromatic': 'from-green-100 via-emerald-50 to-lime-50',
  'Musky Woody': 'from-stone-200 via-neutral-100 to-stone-50',
  'Leather': 'from-stone-300 via-amber-100 to-stone-100',
  'Smoky Woody': 'from-gray-200 via-stone-100 to-amber-50',
  'Amber Woody': 'from-amber-200 via-yellow-100 to-orange-50',
};

function getGradient(family: string): string {
  return familyGradients[family] || 'from-stone-100 via-amber-50 to-stone-50';
}

export default function FragranceModal({ fragrance, onClose, inCollection, onToggleCollection, onBuy }: Props) {
  const [imgError, setImgError] = useState(false);
  const showImage = !!fragrance?.image && !imgError;

  useEffect(() => {
    setImgError(false);
    if (!fragrance) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [fragrance, onClose]);

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
        role="dialog"
        aria-modal="true"
        aria-labelledby="fragrance-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
        >
          {/* Gradient header */}
          <div className={`relative h-48 bg-gradient-to-br ${getGradient(fragrance.family)} flex items-center justify-center`}>
            <div className="absolute inset-0 opacity-[0.07]">
              <div className="absolute top-6 right-6 w-32 h-32 rounded-full border border-current" />
              <div className="absolute bottom-4 left-8 w-20 h-20 rounded-full border border-current" />
            </div>
            {showImage ? (
              <div className="relative w-36 h-44">
                <Image
                  src={fragrance.image}
                  alt={`${fragrance.name} by ${fragrance.house}`}
                  fill
                  sizes="200px"
                  className="object-contain drop-shadow-xl"
                  onError={() => setImgError(true)}
                  priority
                />
              </div>
            ) : (
              <div className="text-center" aria-hidden="true">
                <Droplets className="w-10 h-10 text-ink/15 mx-auto mb-2" />
                <p className="font-serif text-4xl text-ink/10 font-bold tracking-widest" dir="ltr">
                  {fragrance.house.split(' ').map(w => w[0]).join('')}
                </p>
              </div>
            )}
            <button
              onClick={onClose}
              aria-label="סגור חלון"
              className="absolute top-4 left-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-ink-muted hover:text-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
            <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
              <Star className="w-3.5 h-3.5 text-gold fill-gold" />
              <span className="text-ink text-sm font-sans font-semibold">{fragrance.rating}</span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <p className="text-gold text-[10px] tracking-[0.25em] uppercase font-sans font-medium" dir="ltr">
              {fragrance.house} &middot; {fragrance.year}
            </p>
            <h2 id="fragrance-modal-title" className="font-serif text-3xl text-ink mt-1 font-bold" dir="ltr">{fragrance.name}</h2>
            <p className="text-ink-faint text-xs font-sans mt-1 mb-4" dir="ltr">
              {fragrance.family} &middot; {fragrance.concentration} &middot; {fragrance.gender}
            </p>

            <p className="text-ink-muted text-base leading-relaxed mb-5 italic font-serif" dir="ltr">
              &ldquo;{fragrance.description}&rdquo;
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { icon: <Star className="w-4 h-4" />, val: fragrance.rating, label: 'דירוג' },
                { icon: <Clock className="w-4 h-4" />, val: `${fragrance.longevity}/10`, label: 'עמידות' },
                { icon: <Wind className="w-4 h-4" />, val: `${fragrance.sillage}/10`, label: 'הקרנה' },
              ].map((s) => (
                <div key={s.label} className="bg-bg-secondary rounded-xl p-3 text-center">
                  <div className="text-gold mx-auto mb-1 flex justify-center">{s.icon}</div>
                  <span className="text-ink font-serif text-lg font-semibold">{s.val}</span>
                  <p className="text-ink-faint text-[10px] font-hebrew">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Olfactory Pyramid */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Droplets className="w-4 h-4 text-gold" />
                <h3 className="font-serif text-lg text-ink font-semibold">פירמידת הריח</h3>
              </div>
              {(['top', 'heart', 'base'] as const).map((type) => (
                groupedNotes[type].length > 0 && (
                  <div key={type} className="mb-2.5">
                    <p className="text-ink-muted text-[11px] font-hebrew mb-1.5">
                      {type === 'top' ? 'תווי ראש' : type === 'heart' ? 'תווי לב' : 'תווי בסיס'}
                    </p>
                    <div className="flex flex-wrap gap-1.5" dir="ltr">
                      {groupedNotes[type].map((note) => (
                        <span key={note.name} className={`text-xs px-3 py-1 border rounded-full font-sans font-medium ${noteStyles[type]}`}>
                          {note.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5" dir="ltr">
              {fragrance.tags.map((tag) => (<span key={tag} className="tag">{tag}</span>))}
            </div>

            {/* Price & Actions */}
            <div className="pt-4 border-t border-black/[0.05] flex items-center gap-3">
              {onToggleCollection && (
                <button
                  onClick={() => onToggleCollection(fragrance)}
                  className={`flex-1 py-3 rounded-lg text-sm font-hebrew font-medium flex items-center justify-center gap-2 transition-all ${
                    inCollection
                      ? 'bg-bg-secondary text-gold border border-gold-border'
                      : 'btn-gold'
                  }`}
                >
                  {inCollection ? <><Check className="w-4 h-4" /> באוסף שלי</> : <><Plus className="w-4 h-4" /> הוסף לאוסף</>}
                </button>
              )}
              <button
                onClick={() => {
                  if (onBuy) onBuy(fragrance);
                  else window.open(`https://www.google.com/search?tbm=shop&q=${encodeURIComponent(fragrance.name + ' ' + fragrance.house + ' perfume')}`, '_blank');
                }}
                className="btn-outline flex-1 py-3 rounded-lg text-sm font-hebrew font-medium flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                השווה מחירים - ₪{fragrance.price.toLocaleString()}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
