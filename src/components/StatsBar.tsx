'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '745',  label: 'בשמים מובחרים', suffix: '+' },
  { value: '115',  label: 'בתי בושם',       suffix: '+' },
  { value: '7',    label: 'שאלות בלבד',     suffix: '' },
  { value: '100%', label: 'ללא תשלום',      suffix: '' },
];

export default function StatsBar() {
  return (
    <section className="py-10 px-4 border-y border-[#EDE9E2]" style={{ background: '#FFFFFF' }}>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center px-4 py-2 border-l border-[#EDE9E2] first:border-l-0 md:first:border-l-0 [&:nth-child(2)]:border-l-0 md:[&:nth-child(2)]:border-l"
            >
              <p className="font-serif text-3xl font-light text-[#0D0D0D] mb-1" dir="ltr">
                {s.value}<span className="text-[#C4A882]">{s.suffix}</span>
              </p>
              <p className="text-[11px] font-hebrew text-[#9A9A9A] font-light tracking-wide">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
