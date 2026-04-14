'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { X, ExternalLink, ShoppingBag, TrendingDown, Info } from 'lucide-react';
import type { Fragrance } from '@/data/fragrances';

interface Props {
  fragrance: Fragrance | null;
  onClose: () => void;
}

interface Retailer {
  name: string;
  region: string;
  estimate: number; // as fraction of base price (1.0 = full, 0.85 = 15% off)
  shipping: string;
  url: (query: string) => string;
  note?: string;
  featured?: boolean;
}

const retailers: Retailer[] = [
  {
    name: 'Notino',
    region: 'אירופה · משלוח לישראל',
    estimate: 0.78,
    shipping: 'משלוח חינם מעל ₪250',
    url: (q) => `https://www.notino.co.il/search/?q=${encodeURIComponent(q)}`,
    featured: true,
    note: 'בד"כ הכי משתלם',
  },
  {
    name: 'Terminal X',
    region: 'ישראל',
    estimate: 1.0,
    shipping: 'משלוח חינם מעל ₪299',
    url: (q) => `https://www.terminalx.com/catalogsearch/result/?q=${encodeURIComponent(q)}`,
    note: 'זמן אספקה מהיר בישראל',
  },
  {
    name: 'Google Shopping',
    region: 'השוואת מחירים גלובלית',
    estimate: 0.85,
    shipping: 'משתנה לפי ספק',
    url: (q) => `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(q)}`,
    featured: true,
    note: 'סריקה של כל החנויות',
  },
  {
    name: 'Amazon',
    region: 'בינלאומי',
    estimate: 0.82,
    shipping: 'משלוח לישראל',
    url: (q) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}`,
  },
  {
    name: 'FragranceNet',
    region: 'ארה"ב · מומחה בשמים',
    estimate: 0.65,
    shipping: 'משלוח לישראל',
    url: (q) => `https://www.fragrancenet.com/search?query=${encodeURIComponent(q)}`,
    note: 'הנחות עמוקות על ניש',
  },
  {
    name: 'eBay',
    region: 'בינלאומי',
    estimate: 0.75,
    shipping: 'משתנה',
    url: (q) => `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(q)}`,
    note: 'כולל אפשרויות decant',
  },
];

export default function BuyOptions({ fragrance, onClose }: Props) {
  useEffect(() => {
    if (!fragrance) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [fragrance, onClose]);

  if (!fragrance) return null;

  const query = `${fragrance.name} ${fragrance.house} ${fragrance.concentration}`;
  const basePrice = fragrance.price;

  // Sort: featured first, then by estimated price (cheapest first)
  const sorted = [...retailers].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.estimate - b.estimate;
  });

  const cheapestPrice = Math.round(basePrice * Math.min(...retailers.map(r => r.estimate)));
  const savings = basePrice - cheapestPrice;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="buy-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-bg-primary rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-5 border-b border-black/[0.06] flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <ShoppingBag className="w-4 h-4 text-gold" />
                <p className="text-gold text-[10px] tracking-[0.2em] uppercase font-sans font-semibold">
                  Price Comparison
                </p>
              </div>
              <h3 id="buy-modal-title" className="font-serif text-xl text-ink font-semibold truncate" dir="ltr">
                {fragrance.name}
              </h3>
              <p className="text-ink-muted text-xs font-sans" dir="ltr">
                {fragrance.house} · {fragrance.size}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="סגור חלון השוואת מחירים"
              className="text-ink-faint hover:text-ink p-1.5 rounded-lg hover:bg-black/[0.04] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Savings banner */}
          {savings > 0 && (
            <div className="bg-gradient-to-l from-gold-faint to-bg-primary px-5 py-3 border-b border-gold-border/30">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-gold" />
                <p className="text-ink text-xs font-hebrew">
                  חסוך עד <span className="text-gold font-bold">₪{savings.toLocaleString()}</span> לעומת מחיר מחירון
                  <span className="text-ink-muted"> (₪{basePrice.toLocaleString()})</span>
                </p>
              </div>
            </div>
          )}

          {/* Retailers */}
          <div className="flex-1 overflow-y-auto p-5 space-y-2.5">
            {sorted.map((r) => {
              const est = Math.round(basePrice * r.estimate);
              return (
                <a
                  key={r.name}
                  href={r.url(query)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-4 rounded-xl border transition-all duration-200 hover:shadow-md hover:border-gold-border group ${
                    r.featured
                      ? 'border-gold-border bg-gold-faint/30'
                      : 'border-black/[0.06] bg-bg-card'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-serif text-base text-ink font-semibold" dir="ltr">
                          {r.name}
                        </p>
                        {r.featured && (
                          <span className="text-[9px] font-sans bg-gold text-white px-1.5 py-0.5 rounded-full font-medium">
                            מומלץ
                          </span>
                        )}
                      </div>
                      <p className="text-ink-muted text-[11px] font-hebrew">{r.region}</p>
                      <p className="text-ink-faint text-[10px] font-hebrew mt-0.5">{r.shipping}</p>
                      {r.note && (
                        <p className="text-gold text-[10px] font-hebrew mt-1 flex items-center gap-1">
                          <Info className="w-2.5 h-2.5" />
                          {r.note}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end flex-shrink-0">
                      <div className="text-ink-faint text-[9px] font-hebrew mb-0.5">מחיר מוערך</div>
                      <div className="text-gold font-serif text-lg font-bold leading-none">
                        ~₪{est.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 text-gold text-[11px] font-hebrew mt-2 group-hover:underline">
                        פתח
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Footer disclaimer */}
          <div className="px-5 py-3 border-t border-black/[0.06] bg-bg-secondary">
            <p className="text-ink-faint text-[10px] font-hebrew text-center leading-relaxed">
              המחירים הם הערכה בלבד. הלחיצה על כל אחת תפתח חיפוש בחנות האמיתית עם המחיר העדכני.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
