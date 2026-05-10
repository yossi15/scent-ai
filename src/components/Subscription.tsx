'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { fragrances } from '@/data/fragrances';

const TOTAL = fragrances.length;

const TIERS = [
  {
    id: 'discovery',
    name: 'Discovery',
    nameHe: 'גילוי',
    price: 179,
    desc: 'לגולשים סקרנים',
    color: 'border-black/[0.08]',
    featured: false,
    features: [
      `גישה לכל ${TOTAL} הבשמים`,
      'שאלון טעמים חכם',
      'שמירת אוסף אישי',
      'השוואת מחירים',
    ],
  },
  {
    id: 'collector',
    name: 'Collector',
    nameHe: 'אספן',
    price: 549,
    desc: 'למי שרוצה להעמיק',
    color: 'border-gold',
    featured: true,
    features: [
      'כל יתרונות Discovery',
      'המלצות AI מתקדמות',
      'יומן ריחות אישי',
      'פרופיל ריח מפורט',
      'עדיפות לבשמים חדשים',
    ],
  },
  {
    id: 'expert',
    name: 'Expert',
    nameHe: 'מומחה',
    price: 1459,
    desc: 'לאוהבי בשמים מושבעים',
    color: 'border-black/[0.08]',
    featured: false,
    features: [
      'כל יתרונות Collector',
      'ייעוץ אישי מומחה',
      'גישה מוקדמת לבשמים',
      'הנחות בלעדיות',
      'תמיכה ישירה 24/7',
    ],
  },
];

export default function Subscription() {
  return (
    <section id="subscription" className="py-28 px-4" aria-labelledby="subscription-heading">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">מנוי</p>
          <h2 id="subscription-heading" className="font-serif text-4xl md:text-5xl gold-text font-bold mb-3">
            תוכניות מנוי
          </h2>
          <p className="text-ink-muted text-sm font-hebrew font-light max-w-md mx-auto">
            בחר את התוכנית המתאימה לך. ביטול בכל עת.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map(({ id, name, nameHe, price, desc, color, featured, features }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`card relative p-8 flex flex-col ${featured ? `border-2 ${color} shadow-[0_12px_40px_rgba(196,168,130,0.18)]` : `border ${color}`}`}
            >
              {featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 bg-gold text-ink text-[10px] font-sans font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    <Sparkles className="w-3 h-3" />
                    הכי פופולרי
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className="text-gold text-[10px] tracking-[0.2em] uppercase font-sans font-medium mb-1" dir="ltr">
                  {name}
                </p>
                <h3 className="font-serif text-2xl text-ink font-bold mb-1">{nameHe}</h3>
                <p className="text-ink-muted text-xs font-hebrew">{desc}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1" dir="ltr">
                  <span className="font-serif text-4xl font-bold gold-text">₪{price}</span>
                  <span className="text-ink-faint text-sm font-sans">/חודש</span>
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8" role="list">
                {features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm font-hebrew text-ink-secondary">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="/subscribe"
                className={`block text-center py-3 rounded-xl font-hebrew text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  featured
                    ? 'btn-gold'
                    : 'btn-outline'
                }`}
              >
                התחל עכשיו
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-ink-faint text-xs font-hebrew mt-8">
          ניתן לבטל בכל עת · ללא התחייבות · תשלום מאובטח
        </p>
      </div>
    </section>
  );
}
