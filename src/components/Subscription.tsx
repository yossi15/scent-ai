'use client';

import { motion } from 'framer-motion';
import { Crown, Check, ArrowLeft, Package, Sparkles, Calendar } from 'lucide-react';
import { subscriptionTiers } from '@/data/fragrances';

const hebrewTiers = [
  {
    name: 'גילוי',
    tagline: 'התחל את המסע',
    features: [
      '3 דגימות 8מ"ל בקיור AI חודשי',
      'פרופיל ריח מותאם אישית',
      'אנליטיקת רדאר ריחות',
      'גישה ליומן',
      'תווי טעימה קהילתיים',
    ],
  },
  {
    name: 'אספן',
    tagline: 'העלה את האוסף שלך',
    features: [
      '5 דגימות 8מ"ל בקיור AI חודשי',
      'עדיפות לגישה לבקבוקים מלאים',
      'גישה לכספת הדגימות הנדירות',
      'התאמת חתימה AI בלעדית',
      'מאסטרקלאס וידאו חודשי',
      'קונסיירז\' אישי',
    ],
  },
  {
    name: 'הכספת',
    tagline: 'פסגת הבלעדיות',
    features: [
      'הכל בחבילת אספן',
      'מהדורות מוגבלות וסדרות שהופסקו',
      'גישה ראשונה להשקות חדשות',
      'ייעוץ ריחני אישי',
      'סשן בלנדינג בהתאמה אישית (רבעוני)',
      'אריזת יוקרה מפוארת',
      'הזמנה לאירועים בלעדיים',
    ],
  },
];

export default function Subscription() {
  return (
    <section id="subscribe" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold/60 text-[10px] tracking-[0.3em] uppercase font-sans mb-2">
            MEMBERSHIP
          </p>
          <h2 className="font-serif text-4xl md:text-5xl gold-gradient mb-3">
            הצטרף למעגל הפנימי
          </h2>
          <p className="text-ink-muted/60 text-sm font-hebrew max-w-md mx-auto font-light">
            בחר את המסלול שלך לשליטה ריחנית עם סלקציה חודשית בקיור AI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {subscriptionTiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`glass-card rounded-2xl p-6 md:p-8 relative transition-all duration-500 ${
                tier.highlight ? 'border-gold/20 luxury-shadow' : ''
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 gold-gradient-bg text-white text-[10px] font-hebrew font-semibold tracking-wide px-4 py-1 rounded-sm">
                  הכי פופולרי
                </div>
              )}

              <div className="text-center mb-6">
                <Crown className={`w-6 h-6 mx-auto mb-3 ${tier.highlight ? 'text-gold' : 'text-ink-muted/30'}`} />
                <h3 className="font-serif text-2xl text-ink mb-1">{hebrewTiers[i].name}</h3>
                <p className="text-ink-muted/40 text-xs font-hebrew italic font-light">{hebrewTiers[i].tagline}</p>
              </div>

              <div className="text-center mb-6" dir="ltr">
                <span className="text-gold font-serif text-4xl">₪{tier.price}</span>
                <span className="text-ink-muted/40 text-sm font-sans">/חודש</span>
              </div>

              <ul className="space-y-3 mb-8">
                {hebrewTiers[i].features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" />
                    <span className="text-ink-muted text-sm font-hebrew font-light">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 text-xs font-hebrew font-medium tracking-wide flex items-center justify-center gap-2 transition-all duration-300 rounded-sm ${
                  tier.highlight
                    ? 'gold-gradient-bg text-white hover:opacity-90'
                    : 'border border-gold/25 text-gold hover:bg-gold/5'
                }`}
              >
                התחל את המסע
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-2xl p-6 md:p-8 luxury-shadow"
        >
          <div className="flex items-center gap-2 mb-6">
            <Package className="w-4 h-4 text-gold" />
            <h3 className="font-serif text-lg text-ink">לוח בקרה</h3>
            <span className="mr-auto text-[10px] tracking-wider text-gold/70 font-hebrew px-2 py-0.5 border border-gold/15 rounded-full">
              חבילת אספן
            </span>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-shell-dark/40 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-gold" />
                <span className="text-ink-muted/50 text-[10px] tracking-wider font-hebrew">
                  משלוח הבא
                </span>
              </div>
              <p className="text-gold font-serif text-xl mb-1" dir="ltr">15 April, 2026</p>
              <p className="text-ink-muted/40 text-xs font-hebrew font-light">נותרו 7 ימים</p>
              <div className="mt-3 h-1 bg-shell-dark rounded-full overflow-hidden">
                <div className="h-full bg-gold/50 rounded-full" style={{ width: '73%' }} />
              </div>
            </div>

            <div className="bg-shell-dark/40 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-ink-muted/50 text-[10px] tracking-wider font-hebrew">
                  בחירת AI של החודש
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🥃</span>
                <div>
                  <p className="font-serif text-ink text-sm" dir="ltr">Side Effect</p>
                  <p className="text-ink-muted/40 text-xs font-sans" dir="ltr">Initio</p>
                  <p className="text-gold/60 text-[10px] font-hebrew mt-0.5">דגימת 8מ״ל</p>
                </div>
              </div>
            </div>

            <div className="bg-shell-dark/40 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-4 h-4 text-gold" />
                <span className="text-ink-muted/50 text-[10px] tracking-wider font-hebrew">
                  תצוגה מקדימה — אפריל
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { emoji: '🥃', name: 'Side Effect', house: 'Initio' },
                  { emoji: '🌙', name: 'Grand Soir', house: 'MFK' },
                  { emoji: '🍯', name: 'Naxos', house: 'Xerjoff' },
                  { emoji: '🕌', name: 'Oud for Greatness', house: 'Initio' },
                  { emoji: '🌸', name: 'Ani', house: 'Nishane' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-2" dir="ltr">
                    <span className="text-sm">{item.emoji}</span>
                    <span className="text-ink-muted/70 text-xs font-sans">{item.name}</span>
                    <span className="text-ink-muted/30 text-[10px] font-sans ml-auto">{item.house}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
