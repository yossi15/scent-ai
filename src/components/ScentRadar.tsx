'use client';

import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import type { Fragrance } from '@/data/fragrances';

const AXIS_LABELS: Record<string, string> = {
  woody:    'עצבי',
  floral:   'פרחוני',
  oriental: 'מזרחי',
  fresh:    'רענן',
  gourmand: 'גורמה',
  animalic: 'אנימלי',
};

interface Props {
  collection: Fragrance[];
}

export default function ScentRadar({ collection }: Props) {
  if (collection.length === 0) return null;

  const keys = Object.keys(AXIS_LABELS) as Array<keyof Fragrance['radarProfile']>;
  const avg = keys.reduce((acc, k) => {
    acc[k] = Math.round(
      collection.reduce((s, f) => s + (f.radarProfile[k] ?? 0), 0) / collection.length
    );
    return acc;
  }, {} as Record<string, number>);

  const data = keys.map(k => ({ subject: AXIS_LABELS[k], value: avg[k] }));

  return (
    <section className="py-20 px-4 section-accent" aria-labelledby="radar-heading">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">פרופיל ריח</p>
          <h2 id="radar-heading" className="font-serif text-3xl md:text-4xl gold-text font-bold">
            ה-DNA הריחני שלך
          </h2>
          <p className="text-ink-muted text-xs font-hebrew mt-2">
            בהתבסס על {collection.length} בשמים שבחרת
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card p-6"
          aria-hidden="true"
        >
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid stroke="rgba(196,168,130,0.15)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 11, fontFamily: 'Heebo, sans-serif', fill: '#6B6B6B' }}
              />
              <Radar
                name="פרופיל"
                dataKey="value"
                stroke="#C4A882"
                fill="#C4A882"
                fillOpacity={0.18}
                strokeWidth={1.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
}
