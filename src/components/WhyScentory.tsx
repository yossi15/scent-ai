'use client';

import { motion } from 'framer-motion';
import { Brain, Library, ShoppingCart, Users } from 'lucide-react';
import { fragrances } from '@/data/fragrances';

const TOTAL  = fragrances.length;
const HOUSES = new Set(fragrances.map(f => f.house)).size;

const ITEMS = [
  {
    icon: Brain,
    title: 'אישי ומדויק',
    desc: `AI שלומד מהאוסף שלך - לא ממוצעים גנריים. ככל שמוסיפים יותר, ההמלצות מדויקות יותר.`,
  },
  {
    icon: Library,
    title: 'קולקציה ענקית',
    desc: `${TOTAL.toLocaleString()} בשמים מ-${HOUSES} בתי בושם מובילים — נישה ומיינסטרים, כולם תחת קורת גג אחת.`,
  },
  {
    icon: ShoppingCart,
    title: 'השוואת מחירים',
    desc: 'תמיד יודע איפה הכי משתלם לקנות. מחיר ראלי מול מחיר המלצה — שקיפות מלאה.',
  },
  {
    icon: Users,
    title: 'קהילה ויומן',
    desc: 'פלטפורמה עברית עם קהילת אספנים משולבת. יומן ריחות אישי, דירוגים, תגיות.',
  },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function WhyScentory() {
  return (
    <section
      className="py-28 px-6"
      style={{ background: 'var(--bg-primary)' }}
      aria-labelledby="why-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '9px',
              fontWeight: 400,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              marginBottom: '16px',
            }}
          >
            למה SCENTORY
          </p>
          <h2
            id="why-heading"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 400,
              fontSize: 'clamp(28px, 4vw, 42px)',
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: 'var(--ink)',
            }}
          >
            מה מייחד אותנו
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="card"
              style={{ padding: '32px 28px' }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'var(--gold-faint)',
                  border: '1px solid var(--gold-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <Icon size={18} style={{ color: 'var(--accent-gold)' }} />
              </div>

              <h3
                style={{
                  fontFamily: 'Heebo, Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: 'var(--ink)',
                  marginBottom: '10px',
                  letterSpacing: '-0.01em',
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  fontSize: '13px',
                  lineHeight: 1.7,
                  color: 'var(--ink-secondary)',
                }}
              >
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
