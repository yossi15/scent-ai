'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Target, TrendingUp, AlertCircle, Compass, BarChart3 } from 'lucide-react';
import type { Fragrance } from '@/data/fragrances';

interface Props {
  collection?: Fragrance[];
}

const DIMENSION_LABELS: Record<string, string> = {
  woody: 'עצי',
  floral: 'פרחוני',
  oriental: 'מזרחי',
  fresh: 'רענן',
  gourmand: 'גורמה',
  animalic: 'אנימלי',
};

const DIMENSION_KEYS = ['woody', 'floral', 'oriental', 'fresh', 'gourmand', 'animalic'] as const;

const DEFAULT_PROFILE = { woody: 7, floral: 4, oriental: 8, fresh: 5, gourmand: 6, animalic: 3 };

function computeProfile(collection: Fragrance[]) {
  if (collection.length === 0) return DEFAULT_PROFILE;
  const avg = { woody: 0, floral: 0, oriental: 0, fresh: 0, gourmand: 0, animalic: 0 };
  collection.forEach((f) => {
    DIMENSION_KEYS.forEach((k) => { avg[k] += f.radarProfile[k]; });
  });
  DIMENSION_KEYS.forEach((k) => { avg[k] = Math.round((avg[k] / collection.length) * 10) / 10; });
  return avg;
}

function computeDiversity(profile: typeof DEFAULT_PROFILE): number {
  // Diversity = how evenly spread the values are (0-10)
  const values = DIMENSION_KEYS.map(k => profile[k]);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
  // Low variance = high diversity (all dimensions used evenly)
  return Math.round((10 - Math.min(variance, 10)) * 10) / 10;
}

export default function ScentRadar({ collection = [] }: Props) {
  const profile = useMemo(() => computeProfile(collection), [collection]);

  const radarData = DIMENSION_KEYS.map(k => ({
    axis: DIMENSION_LABELS[k],
    value: profile[k],
    fullMark: 10,
  }));

  const sorted = [...DIMENSION_KEYS].sort((a, b) => profile[b] - profile[a]);
  const dominant = sorted[0];
  const secondary = sorted[1];
  const weakest = sorted[sorted.length - 1];
  const diversity = computeDiversity(profile);
  const hasCollection = collection.length > 0;

  const insights = [
    {
      icon: <TrendingUp className="w-4 h-4" />,
      label: 'נטייה עיקרית',
      value: `${DIMENSION_LABELS[dominant]}-${DIMENSION_LABELS[secondary]}`,
      desc: hasCollection
        ? `מבוסס על ${collection.length} בשמים — ה-DNA שלך נוטה לקומפוזיציות ${DIMENSION_LABELS[dominant].toLowerCase()} ו${DIMENSION_LABELS[secondary].toLowerCase()}`
        : 'בחר בשמים בסקשן "התאמת חתימה" לפרופיל אישי',
    },
    {
      icon: <Compass className="w-4 h-4" />,
      label: 'ממד משנה',
      value: DIMENSION_LABELS[secondary],
      desc: hasCollection
        ? `${DIMENSION_LABELS[secondary]} (${profile[secondary]}/10) — הבחירות שלך מעידות על העדפה לאקורדים ${DIMENSION_LABELS[secondary].toLowerCase()}`
        : 'יתעדכן לפי הבשמים שתבחר',
    },
    {
      icon: <AlertCircle className="w-4 h-4" />,
      label: 'נקודה עיוורת',
      value: DIMENSION_LABELS[weakest],
      desc: hasCollection
        ? `${DIMENSION_LABELS[weakest]} (${profile[weakest]}/10) — שקול לחקור בשמים עם ממד ${DIMENSION_LABELS[weakest].toLowerCase()} חזק יותר`
        : 'הממד החלש ביותר יזוהה לפי האוסף שלך',
    },
    {
      icon: <BarChart3 className="w-4 h-4" />,
      label: 'גיוון האוסף',
      value: `${diversity}/10`,
      desc: hasCollection
        ? diversity >= 7
          ? 'האוסף שלך מאוזן ומגוון — מכסה מגוון רחב של משפחות ריח'
          : diversity >= 5
          ? 'האוסף שלך בעל פרסונליות ברורה — ניתן להרחיב לכיוונים חדשים'
          : 'האוסף שלך ממוקד מאוד — אתה יודע מה אתה אוהב'
        : 'בחר לפחות 2 בשמים לחישוב גיוון',
    },
  ];

  return (
    <section id="radar" className="py-24 px-4 section-accent">
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
            {hasCollection
              ? `טביעת האצבע הריחנית שלך — מבוסס על ${collection.length} בשמ${collection.length === 1 ? '' : 'ים'} שבחרת`
              : 'בחר בשמים בסקשן "התאמת חתימה" כדי לראות את הפרופיל האישי שלך'}
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
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-gold" />
                <h3 className="font-serif text-xl text-ink font-semibold">הפרופיל שלך</h3>
              </div>
              {!hasCollection && (
                <span className="text-[10px] font-hebrew text-ink-faint bg-bg-secondary rounded-full px-2 py-0.5">
                  דוגמה
                </span>
              )}
            </div>

            <div className="w-full aspect-square max-w-sm mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                  <PolarGrid stroke="rgba(150,121,58,0.1)" strokeDasharray="3 3" />
                  <PolarAngleAxis
                    dataKey="axis"
                    tick={{ fill: '#8a8279', fontSize: 12, fontFamily: 'Heebo' }}
                  />
                  <Radar
                    name="פרופיל"
                    dataKey="value"
                    stroke="#96793a"
                    fill="#96793a"
                    fillOpacity={hasCollection ? 0.2 : 0.08}
                    strokeWidth={hasCollection ? 2 : 1.5}
                  />
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
                      <span className="text-gold font-serif text-sm font-semibold">{insight.value}</span>
                    </div>
                    <p className="text-ink-secondary text-xs font-hebrew leading-relaxed font-light">
                      {insight.desc}
                    </p>
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
