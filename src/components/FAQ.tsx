'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'איך ה-AI יודע איזה בושם מתאים לי?',
    a: 'האלגוריתם שלנו מנתח את הפרופיל הריחני שלך על בסיס הבשמים שאתה אוהב, תווי הריח המועדפים, ודירוגי הביצועים שלך ביומן. הוא מזהה דפוסים ברמת פירמידת הריח ומתאים בשמים שחולקים DNA ריחני דומה אבל גם מציגים ממדים חדשים.',
  },
  {
    q: 'מה מגיע בתוך חבילת המנוי?',
    a: 'כל חבילה כוללת דגימות 8מ"ל באריזת יוקרה, כרטיס ניתוח AI אישי שמסביר למה כל בושם נבחר עבורך, ותווי טעימה מקצועיים. חבילת אספן וכספת כוללות גם גישה לבשמים מוגבלים.',
  },
  {
    q: 'האם כל הבשמים אותנטיים?',
    a: 'ללא יוצא מן הכלל. אנחנו עובדים ישירות מול מפיצים מורשים ובתי בושם. כל בקבוק מגיע עם תעודת אותנטיות ואחריות מלאה.',
  },
  {
    q: 'אפשר לבטל מנוי?',
    a: 'כמובן. אפשר לבטל בכל עת ללא התחייבות. החבילה הנוכחית תגיע אלייך ולא יחויב תשלום נוסף. גם החזרות מתקבלות תוך 30 יום.',
  },
  {
    q: 'מה ההבדל בין EDP, EDT ו-Extrait?',
    a: 'EDT (Eau de Toilette) מכיל 5-15% שמנים ריחניים ומחזיק 3-5 שעות. EDP (Eau de Parfum) מכיל 15-20% ומחזיק 6-8 שעות. Extrait de Parfum מכיל 20-40% ויכול להחזיק 12+ שעות עם הקרנה חזקה יותר.',
  },
  {
    q: 'האם אתם שולחים לכל הארץ?',
    a: 'כן, משלוח חינם לכל רחבי ישראל. החבילה מגיעה תוך 3-5 ימי עסקים באריזה דיסקרטית ומוגנת. למנויי כספת — משלוח אקספרס תוך 24 שעות.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 flex items-center justify-between text-right"
      >
        <span className="font-hebrew text-sm text-ink font-medium flex-1">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="mr-3 shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-gold" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 pt-0">
          <p className="text-ink-muted text-sm font-hebrew leading-relaxed font-light">{a}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">
            FAQ
          </p>
          <h2 className="font-serif text-4xl md:text-5xl gold-text mb-3 font-bold">
            שאלות נפוצות
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <FaqItem q={faq.q} a={faq.a} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
