'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '745+',   label: 'בשמים מובחרים' },
  { value: '115',    label: 'בתי בושם נבחרים' },
  { value: 'AI',     label: 'מנוע התאמה חכם' },
  { value: '🇮🇱',    label: 'זמין בישראל' },
];

export default function StatsBar() {
  return (
    <section className="py-8 px-4 border-y border-[#E8E4DC] bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-x-reverse divide-[#E8E4DC]">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center px-4"
            >
              <p className="font-serif text-2xl md:text-3xl font-semibold text-[#8B7355] mb-1">
                {s.value}
              </p>
              <p className="text-[11px] font-hebrew text-[#6B6B6B] font-light tracking-wide">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
