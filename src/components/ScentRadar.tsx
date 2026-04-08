'use client';

import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Target } from 'lucide-react';

const userProfile = [
  { axis: 'עצי', value: 7, fullMark: 10 },
  { axis: 'פרחוני', value: 4, fullMark: 10 },
  { axis: 'מזרחי', value: 8, fullMark: 10 },
  { axis: 'רענן', value: 5, fullMark: 10 },
  { axis: 'גורמה', value: 6, fullMark: 10 },
  { axis: 'אנימלי', value: 3, fullMark: 10 },
];

const insights = [
  { label: 'נטייה עיקרית', value: 'מזרחי-עצי', desc: 'אתה נמשך לקומפוזיציות חמות ומורכבות' },
  { label: 'נטייה משנית', value: 'גורמה', desc: 'אקורדים מתוקים ואכילים מוסיפים נוחות לבחירות שלך' },
  { label: 'נקודה עיוורת', value: 'אנימלי', desc: 'שקול לחקור ציבט, קסטוריאום ובשמים דומיננטיים במוסק' },
  { label: 'גיוון', value: '7.2/10', desc: 'האוסף שלך מכסה את רוב משפחות הריח היטב' },
];

export default function ScentRadar() {
  return (
    <section id="radar" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold/60 text-[10px] tracking-[0.3em] uppercase font-sans mb-2">
            OLFACTORY ANALYTICS
          </p>
          <h2 className="font-serif text-4xl md:text-5xl gold-gradient mb-3">
            רדאר ריחות
          </h2>
          <p className="text-ink-muted/60 text-sm font-hebrew max-w-md mx-auto font-light">
            טביעת האצבע הריחנית שלך — ויזואליזציה של ה-DNA הייחודי שלך
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="glass-card rounded-2xl p-6 luxury-shadow"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-gold" />
              <h3 className="font-serif text-lg text-ink">הפרופיל שלך</h3>
            </div>

            <div className="w-full aspect-square max-w-sm mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={userProfile} cx="50%" cy="50%" outerRadius="75%">
                  <PolarGrid
                    stroke="rgba(154,123,63,0.12)"
                    strokeDasharray="3 3"
                  />
                  <PolarAngleAxis
                    dataKey="axis"
                    tick={{ fill: '#6b6560', fontSize: 12, fontFamily: 'Heebo' }}
                  />
                  <Radar
                    name="פרופיל"
                    dataKey="value"
                    stroke="#9a7b3f"
                    fill="#9a7b3f"
                    fillOpacity={0.12}
                    strokeWidth={1.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="space-y-4">
            {insights.map((insight, i) => (
              <motion.div
                key={insight.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card glass-card-hover rounded-xl p-4 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-ink-muted/50 text-[10px] tracking-wider font-hebrew">
                    {insight.label}
                  </span>
                  <span className="text-gold font-serif text-sm" dir="ltr">{insight.value}</span>
                </div>
                <p className="text-ink-muted/70 text-xs font-hebrew leading-relaxed font-light">
                  {insight.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
