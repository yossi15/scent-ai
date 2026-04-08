'use client';

import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Target, TrendingUp, AlertCircle, Compass, BarChart3 } from 'lucide-react';

const userProfile = [
  { axis: 'עצי', value: 7, fullMark: 10 },
  { axis: 'פרחוני', value: 4, fullMark: 10 },
  { axis: 'מזרחי', value: 8, fullMark: 10 },
  { axis: 'רענן', value: 5, fullMark: 10 },
  { axis: 'גורמה', value: 6, fullMark: 10 },
  { axis: 'אנימלי', value: 3, fullMark: 10 },
];

const insights = [
  { icon: <TrendingUp className="w-4 h-4" />, label: 'נטייה עיקרית', value: 'מזרחי-עצי', desc: 'אתה נמשך לקומפוזיציות חמות ומורכבות' },
  { icon: <Compass className="w-4 h-4" />, label: 'נטייה משנית', value: 'גורמה', desc: 'אקורדים מתוקים ואכילים מוסיפים נוחות לבחירות שלך' },
  { icon: <AlertCircle className="w-4 h-4" />, label: 'נקודה עיוורת', value: 'אנימלי', desc: 'שקול לחקור ציבט, קסטוריאום ובשמים דומיננטיים במוסק' },
  { icon: <BarChart3 className="w-4 h-4" />, label: 'גיוון', value: '7.2/10', desc: 'האוסף שלך מכסה את רוב משפחות הריח היטב' },
];

export default function ScentRadar() {
  return (
    <section id="radar" className="py-20 px-4 section-accent">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">
            OLFACTORY ANALYTICS
          </p>
          <h2 className="font-serif text-4xl md:text-5xl gold-text mb-3 font-bold">
            רדאר ריחות
          </h2>
          <p className="text-ink-muted text-sm font-hebrew max-w-md mx-auto font-light">
            טביעת האצבע הריחנית שלך — ויזואליזציה של ה-DNA הייחודי שלך
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card-gold p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-gold" />
              <h3 className="font-serif text-xl text-ink font-semibold">הפרופיל שלך</h3>
            </div>

            <div className="w-full aspect-square max-w-sm mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={userProfile} cx="50%" cy="50%" outerRadius="75%">
                  <PolarGrid stroke="rgba(150,121,58,0.1)" strokeDasharray="3 3" />
                  <PolarAngleAxis dataKey="axis" tick={{ fill: '#8a8279', fontSize: 12, fontFamily: 'Heebo' }} />
                  <Radar name="פרופיל" dataKey="value" stroke="#96793a" fill="#96793a" fillOpacity={0.1} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="space-y-3">
            {insights.map((insight, i) => (
              <motion.div
                key={insight.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gold-faint flex items-center justify-center text-gold shrink-0">
                    {insight.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-ink-muted text-[11px] font-hebrew">{insight.label}</span>
                      <span className="text-gold font-serif text-sm font-semibold" dir="ltr">{insight.value}</span>
                    </div>
                    <p className="text-ink-secondary text-xs font-hebrew leading-relaxed font-light">{insight.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
