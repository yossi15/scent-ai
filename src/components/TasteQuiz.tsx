'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, RotateCcw, Droplets, ExternalLink } from 'lucide-react';
import { fragrances, type Fragrance } from '@/data/fragrances';

interface QuizAnswer {
  questionId: number;
  value: string;
}

const questions = [
  {
    id: 1,
    title: 'מה האווירה שמדברת אליך?',
    subtitle: 'בחר את הסגנון שהכי מתאים לך',
    options: [
      { value: 'elegant', label: 'אלגנטי וקלאסי', desc: 'עדין, מלוטש, נצחי' },
      { value: 'bold', label: 'נועז ודומיננטי', desc: 'חזק, בולט, משאיר רושם' },
      { value: 'fresh', label: 'רענן וספורטיבי', desc: 'קל, נקי, אנרגטי' },
      { value: 'mysterious', label: 'מסתורי ואקזוטי', desc: 'עמוק, מורכב, מרתק' },
    ],
  },
  {
    id: 2,
    title: 'לאיזה אירוע אתה מחפש בושם?',
    subtitle: 'אפשר לבחור אחד',
    options: [
      { value: 'daily', label: 'יומיומי', desc: 'עבודה, פגישות, כל יום' },
      { value: 'evening', label: 'ערב ויציאות', desc: 'דייטים, מסיבות, אירועים' },
      { value: 'special', label: 'אירועים מיוחדים', desc: 'חתונות, גאלות, טקסים' },
      { value: 'versatile', label: 'כל מטרה', desc: 'בושם אחד שעובד תמיד' },
    ],
  },
  {
    id: 3,
    title: 'איזה עולם ריחות מושך אותך?',
    subtitle: 'מה גורם לך להרגיש הכי טוב?',
    options: [
      { value: 'woody', label: 'עצי וחם', desc: 'סנדל, ארז, עוד, ותיבר' },
      { value: 'floral', label: 'פרחוני ורומנטי', desc: 'ורד, יסמין, אירוס' },
      { value: 'oriental', label: 'מזרחי ותבליני', desc: 'וניל, קינמון, עמבר' },
      { value: 'fresh', label: 'ציטרוסי וימי', desc: 'ברגמוט, לימון, מלח ים' },
    ],
  },
  {
    id: 4,
    title: 'כמה חזק אתה רוצה שהבושם יהיה?',
    subtitle: 'עוצמת ההקרנה שמתאימה לך',
    options: [
      { value: 'intimate', label: 'אינטימי', desc: 'רק מי שקרוב מריח' },
      { value: 'moderate', label: 'מתון', desc: 'הקרנה נעימה, לא מוגזם' },
      { value: 'strong', label: 'חזק', desc: 'נכנס לחדר לפניך' },
      { value: 'beast', label: 'חיה', desc: 'מורגש ממטרים, מעל 10 שעות' },
    ],
  },
  {
    id: 5,
    title: 'באיזו עונה תשתמש הכי הרבה?',
    subtitle: 'מזג האוויר משפיע על איך שבושם מתנהג',
    options: [
      { value: 'summer', label: 'קיץ', desc: 'חם ולח, רצוי קל ומרענן' },
      { value: 'winter', label: 'חורף', desc: 'קר ויבש, מעדיף חם ועשיר' },
      { value: 'transition', label: 'אביב / סתיו', desc: 'טמפרטורות מתונות' },
      { value: 'all', label: 'כל השנה', desc: 'בושם שעובד תמיד' },
    ],
  },
  {
    id: 6,
    title: 'איזה כיוון מגדרי מושך אותך?',
    subtitle: 'בחר את מה שהכי מדבר אליך',
    options: [
      { value: 'masculine', label: 'גברי', desc: 'חזק, עוצמתי, בוטח' },
      { value: 'feminine', label: 'נשי', desc: 'עדין, רומנטי, פרחוני' },
      { value: 'unisex', label: 'יוניסקס', desc: 'מודרני, ללא גבולות' },
      { value: 'any', label: 'לא משנה', desc: 'הריח קודם לכל' },
    ],
  },
  {
    id: 7,
    title: 'מה התקציב שלך?',
    subtitle: 'עבור בקבוק 100ml',
    options: [
      { value: 'budget', label: 'עד 300 ₪', desc: 'ריח מעולה, מחיר נגיש' },
      { value: 'mid', label: '300-700 ₪', desc: 'איזון בין איכות למחיר' },
      { value: 'premium', label: '700-1200 ₪', desc: 'בתי בישום מובילים' },
      { value: 'luxury', label: 'מעל 1200 ₪', desc: 'ניש יוקרתי, ללא פשרות' },
    ],
  },
];

const TOTAL_QUESTIONS = 7;
const MAX_POSSIBLE_SCORE = 100;

interface ScoredFragrance {
  fragrance: Fragrance;
  score: number;
  matchPercent: number;
  reason: string;
}

function scoreFragrance(fragrance: Fragrance, answers: QuizAnswer[]): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  const mood = answers.find(a => a.questionId === 1)?.value;
  const occasion = answers.find(a => a.questionId === 2)?.value;
  const scentWorld = answers.find(a => a.questionId === 3)?.value;
  const intensity = answers.find(a => a.questionId === 4)?.value;
  const season = answers.find(a => a.questionId === 5)?.value;
  const gender = answers.find(a => a.questionId === 6)?.value;
  const budget = answers.find(a => a.questionId === 7)?.value;

  // Mood scoring (max ~15)
  if (mood === 'elegant') {
    const s = fragrance.radarProfile.floral * 1.2 + fragrance.radarProfile.woody * 0.8;
    score += s;
    if (fragrance.sillage <= 6) { score += 3; reasons.push('אלגנטי ומלוטש'); }
    else if (s >= 8) reasons.push('פרופיל קלאסי');
  } else if (mood === 'bold') {
    score += fragrance.radarProfile.oriental * 1.5 + fragrance.radarProfile.animalic * 1.5;
    if (fragrance.sillage >= 7) { score += 4; reasons.push('עוצמתי ובולט'); }
  } else if (mood === 'fresh') {
    score += fragrance.radarProfile.fresh * 2.5;
    if (fragrance.radarProfile.fresh >= 6) reasons.push('רענן ואנרגטי');
  } else if (mood === 'mysterious') {
    score += fragrance.radarProfile.oriental * 1.3 + fragrance.radarProfile.gourmand + fragrance.radarProfile.animalic;
    if (fragrance.radarProfile.oriental >= 6 || fragrance.radarProfile.gourmand >= 5) reasons.push('מסתורי ומרתק');
  }

  // Occasion scoring (max ~15)
  if (occasion === 'daily') {
    if (fragrance.sillage <= 6 && fragrance.longevity >= 5) { score += 6; reasons.push('מושלם ליומיום'); }
    if (fragrance.radarProfile.fresh >= 5) score += 3;
  } else if (occasion === 'evening') {
    if (fragrance.sillage >= 6) { score += 4; reasons.push('אידיאלי לערב'); }
    score += fragrance.radarProfile.oriental + fragrance.radarProfile.gourmand;
  } else if (occasion === 'special') {
    if (fragrance.sillage >= 7 && fragrance.longevity >= 7) { score += 6; reasons.push('מרשים לאירועים'); }
    score += fragrance.radarProfile.oriental * 0.5;
  } else if (occasion === 'versatile') {
    const balance = Object.values(fragrance.radarProfile).filter(v => v >= 3 && v <= 7).length;
    score += balance * 2;
    if (balance >= 4) reasons.push('רב-שימושי');
  }

  // Scent world scoring (max ~18)
  if (scentWorld === 'woody') {
    score += fragrance.radarProfile.woody * 2.5;
    if (fragrance.radarProfile.woody >= 6) reasons.push('תווי עץ דומיננטיים');
  } else if (scentWorld === 'floral') {
    score += fragrance.radarProfile.floral * 2.5;
    if (fragrance.radarProfile.floral >= 6) reasons.push('לב פרחוני מרשים');
  } else if (scentWorld === 'oriental') {
    score += fragrance.radarProfile.oriental * 2.5;
    if (fragrance.radarProfile.oriental >= 6) reasons.push('עומק מזרחי');
  } else if (scentWorld === 'fresh') {
    score += fragrance.radarProfile.fresh * 2.5;
    if (fragrance.radarProfile.fresh >= 6) reasons.push('פתיחה רעננה');
  }

  // Intensity scoring (max 10)
  if (intensity === 'intimate' && fragrance.sillage <= 4) { score += 8; reasons.push('הקרנה אינטימית'); }
  else if (intensity === 'moderate' && fragrance.sillage >= 4 && fragrance.sillage <= 7) { score += 8; reasons.push('הקרנה מאוזנת'); }
  else if (intensity === 'strong' && fragrance.sillage >= 7) { score += 8; reasons.push('נוכחות חזקה'); }
  else if (intensity === 'beast' && fragrance.sillage >= 8 && fragrance.longevity >= 8) { score += 12; reasons.push('חיה אמיתית'); }

  // Season scoring (max 8)
  if (season === 'summer') {
    if (fragrance.radarProfile.fresh >= 5) { score += 6; reasons.push('מתאים לקיץ'); }
    if (fragrance.radarProfile.oriental >= 7) score -= 3;
  } else if (season === 'winter') {
    if (fragrance.radarProfile.oriental >= 5 || fragrance.radarProfile.gourmand >= 5 || fragrance.radarProfile.woody >= 6) {
      score += 6;
      reasons.push('חם לחורף');
    }
    if (fragrance.radarProfile.fresh >= 7 && fragrance.longevity <= 5) score -= 3;
  } else if (season === 'transition') {
    const balanced = fragrance.radarProfile.fresh >= 3 && fragrance.radarProfile.woody >= 3;
    if (balanced) { score += 5; reasons.push('מושלם לעונות מעבר'); }
  } else if (season === 'all') {
    if (fragrance.longevity >= 6 && fragrance.sillage >= 5 && fragrance.sillage <= 8) {
      score += 5;
      reasons.push('מתאים כל השנה');
    }
  }

  // Gender scoring (max 8)
  const g = fragrance.gender.toLowerCase();
  if (gender === 'masculine' && (g.includes('masculine') || g === 'men')) { score += 8; }
  else if (gender === 'feminine' && (g.includes('feminine') || g === 'women')) { score += 8; }
  else if (gender === 'unisex' && g.includes('unisex')) { score += 8; reasons.push('יוניסקס מודרני'); }
  else if (gender === 'any') { score += 4; }
  else if (gender === 'masculine' && g.includes('unisex')) score += 4;
  else if (gender === 'feminine' && g.includes('unisex')) score += 4;

  // Budget scoring (max 12 — strong signal)
  if (budget === 'budget' && fragrance.price <= 300) { score += 10; reasons.push('במסגרת התקציב'); }
  else if (budget === 'mid' && fragrance.price > 300 && fragrance.price <= 700) { score += 10; reasons.push('יחס מחיר-ערך'); }
  else if (budget === 'premium' && fragrance.price > 700 && fragrance.price <= 1200) { score += 10; reasons.push('בית בישום מוביל'); }
  else if (budget === 'luxury' && fragrance.price > 1200) { score += 10; reasons.push('יוקרה ללא פשרות'); }
  else if (budget === 'budget' && fragrance.price > 700) score -= 10;
  else if (budget === 'mid' && fragrance.price > 1500) score -= 8;

  // Rating bonus (max 10)
  score += fragrance.rating * 2;
  if (fragrance.rating >= 4.7) reasons.push('דירוג גבוה מאוד');

  return { score, reasons };
}

function getRecommendations(answers: QuizAnswer[]): ScoredFragrance[] {
  const scored = fragrances.map(f => {
    const { score, reasons } = scoreFragrance(f, answers);
    return { fragrance: f, score, reasons };
  });
  scored.sort((a, b) => b.score - a.score);

  // Normalize to 0-100% based on top score
  const topScore = scored[0]?.score || 1;
  const minDisplay = 60; // Never show below 60% to keep it encouraging

  const results: ScoredFragrance[] = [];
  const seenHouses = new Set<string>();
  const seenFamilies = new Set<string>();

  for (const item of scored) {
    if (results.length >= 5) break;
    // Enforce diversity: skip duplicates unless we're running out
    if (results.length < 4) {
      if (seenHouses.has(item.fragrance.house)) continue;
      if (seenFamilies.has(item.fragrance.family) && results.length < 3) continue;
    }

    const normalized = (item.score / topScore) * 40 + minDisplay;
    const matchPercent = Math.min(99, Math.round(normalized));
    const reason = item.reasons.slice(0, 2).join(' · ') || 'התאמה אלגוריתמית לטעם שלך';

    results.push({
      fragrance: item.fragrance,
      score: item.score,
      matchPercent,
      reason,
    });
    seenHouses.add(item.fragrance.house);
    seenFamilies.add(item.fragrance.family);
  }
  return results;
}

const familyGradients: Record<string, string> = {
  'Fruity Chypre': 'from-amber-100 via-yellow-50 to-lime-50',
  'Oriental Spicy': 'from-red-100 via-orange-50 to-amber-50',
  'Oriental Woody': 'from-amber-100 via-stone-100 to-orange-50',
  'Woody Aromatic': 'from-emerald-50 via-stone-100 to-amber-50',
  'Floral': 'from-pink-50 via-rose-50 to-fuchsia-50',
  'Floral Oriental': 'from-rose-100 via-pink-50 to-amber-50',
  'Oriental Floral': 'from-rose-100 via-amber-50 to-orange-50',
  'Oud': 'from-amber-100 via-yellow-100 to-stone-200',
  'Woody Spicy': 'from-orange-100 via-amber-50 to-stone-100',
  'Leather': 'from-stone-200 via-amber-50 to-red-50',
  'Gourmand': 'from-amber-100 via-orange-50 to-yellow-50',
  'Citrus Aromatic': 'from-lime-50 via-yellow-50 to-emerald-50',
  'Fresh Spicy': 'from-teal-50 via-emerald-50 to-amber-50',
  'Woody': 'from-stone-100 via-amber-50 to-emerald-50',
  'Aromatic Fougere': 'from-emerald-50 via-teal-50 to-stone-100',
  'Marine': 'from-blue-50 via-cyan-50 to-teal-50',
  'Amber Woody': 'from-amber-100 via-orange-50 to-stone-100',
};

export default function TasteQuiz() {
  const [step, setStep] = useState(0); // 0 = intro, 1-7 = questions, 8 = results
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [results, setResults] = useState<ScoredFragrance[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const currentQuestion = step >= 1 && step <= TOTAL_QUESTIONS ? questions[step - 1] : null;

  const selectAnswer = (value: string) => {
    if (!currentQuestion) return;
    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== currentQuestion.id);
      return [...filtered, { questionId: currentQuestion.id, value }];
    });

    // Auto-advance after selection
    if (step < TOTAL_QUESTIONS) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      // Last question — calculate results
      setIsCalculating(true);
      setTimeout(() => {
        const finalAnswers = [...answers.filter(a => a.questionId !== currentQuestion.id), { questionId: currentQuestion.id, value }];
        const recs = getRecommendations(finalAnswers);
        setResults(recs);
        setIsCalculating(false);
        setStep(TOTAL_QUESTIONS + 1);
      }, 1500);
    }
  };

  const getSelectedValue = (questionId: number) => {
    return answers.find(a => a.questionId === questionId)?.value;
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResults([]);
  };

  return (
    <section id="quiz" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">
            TASTE QUIZ
          </p>
          <h2 className="font-serif text-4xl md:text-5xl gold-text mb-3 font-bold">
            שאלון טעמים
          </h2>
          <p className="text-ink-muted text-sm font-hebrew max-w-md mx-auto font-light">
            ענה על 7 שאלות קצרות וגלה אילו בשמים מתאימים בדיוק לך
          </p>
        </motion.div>

        <div className="card p-6 md:p-8 min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            {/* Intro */}
            {step === 0 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gold-faint flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-serif text-2xl text-ink mb-3 font-semibold">
                  גלה את הבושם המושלם עבורך
                </h3>
                <p className="text-ink-muted text-sm font-hebrew mb-8 max-w-sm font-light leading-relaxed">
                  האלגוריתם שלנו מנתח את ההעדפות שלך ומתאים לך בשמים מתוך מאגר של 100 יצירות מ-35 בתי בישום מובילים
                </p>
                <button
                  onClick={() => setStep(1)}
                  className="btn-gold px-10 py-3.5 font-hebrew text-sm rounded-lg flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  בוא נתחיל
                </button>
              </motion.div>
            )}

            {/* Questions */}
            {currentQuestion && !isCalculating && (
              <motion.div
                key={`q-${currentQuestion.id}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                {/* Progress */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setStep(step - 1)}
                    className="text-ink-muted hover:text-gold transition-colors flex items-center gap-1 text-xs font-hebrew"
                  >
                    <ChevronRight className="w-4 h-4" />
                    חזור
                  </button>
                  <div className="flex gap-1.5">
                    {questions.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i < step ? 'w-6 bg-gold' : i === step - 1 ? 'w-6 bg-gold' : 'w-3 bg-black/[0.06]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-ink-faint text-xs font-sans">{step}/{TOTAL_QUESTIONS}</span>
                </div>

                <div className="mb-6">
                  <h3 className="font-serif text-xl text-ink mb-1 font-semibold">
                    {currentQuestion.title}
                  </h3>
                  <p className="text-ink-muted text-xs font-hebrew font-light">
                    {currentQuestion.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = getSelectedValue(currentQuestion.id) === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => selectAnswer(opt.value)}
                        className={`p-4 rounded-xl border text-right transition-all duration-200 hover:shadow-md ${
                          isSelected
                            ? 'border-gold bg-gold-faint shadow-sm'
                            : 'border-black/[0.06] bg-bg-card hover:border-gold-border'
                        }`}
                      >
                        <p className={`font-hebrew text-sm font-medium mb-0.5 ${isSelected ? 'text-gold' : 'text-ink'}`}>
                          {opt.label}
                        </p>
                        <p className="text-ink-muted text-xs font-hebrew font-light">{opt.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Calculating */}
            {isCalculating && (
              <motion.div
                key="calc"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="mb-6"
                >
                  <Sparkles className="w-10 h-10 text-gold" />
                </motion.div>
                <h3 className="font-serif text-xl text-ink mb-2 font-semibold">מנתח את הטעם שלך...</h3>
                <p className="text-ink-muted text-xs font-hebrew font-light">
                  סורק 100 בשמים מ-35 בתי בישום
                </p>
              </motion.div>
            )}

            {/* Results */}
            {step === TOTAL_QUESTIONS + 1 && !isCalculating && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <h3 className="font-serif text-xl text-ink font-semibold">הבשמים שמתאימים לך</h3>
                  </div>
                  <button
                    onClick={reset}
                    className="text-ink-muted hover:text-gold transition-colors flex items-center gap-1 text-xs font-hebrew"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    התחל מחדש
                  </button>
                </div>

                <div className="space-y-3">
                  {results.map((item, i) => {
                    const frag = item.fragrance;
                    const gradient = familyGradients[frag.family] || 'from-stone-100 to-amber-50';
                    return (
                      <motion.div
                        key={frag.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 rounded-xl border border-black/[0.06] bg-bg-card hover:shadow-md hover:border-gold-border transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 relative`}>
                            <Droplets className="w-7 h-7 text-gold/50" />
                            {i === 0 && (
                              <span className="absolute -top-2 -right-2 text-[9px] font-sans bg-gold text-white px-1.5 py-0.5 rounded-full shadow-sm">
                                #1
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="min-w-0 flex-1">
                                <p className="font-serif text-base text-ink font-semibold truncate" dir="ltr">
                                  {frag.name}
                                </p>
                                <p className="text-ink-muted text-xs font-sans truncate" dir="ltr">
                                  {frag.house} &middot; {frag.family} &middot; ₪{frag.price.toLocaleString()}
                                </p>
                              </div>
                              {/* Match percentage */}
                              <div className="flex-shrink-0 text-center">
                                <div className="text-gold font-serif text-xl font-bold leading-none">
                                  {item.matchPercent}%
                                </div>
                                <div className="text-[9px] text-ink-faint font-hebrew mt-0.5">התאמה</div>
                              </div>
                            </div>
                            {/* Reason */}
                            <p className="text-[11px] font-hebrew text-ink-secondary mt-1.5 leading-relaxed">
                              <Sparkles className="w-3 h-3 text-gold inline ml-1 -mt-0.5" />
                              {item.reason}
                            </p>
                            <a
                              href={`https://www.google.com/search?tbm=shop&q=${encodeURIComponent(frag.name + ' ' + frag.house + ' perfume')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-gold text-xs font-hebrew hover:underline mt-2"
                            >
                              קנה ב-Google Shopping
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <button
                  onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-gold w-full mt-6 py-3 font-hebrew text-sm rounded-lg"
                >
                  צפה בקולקציה המלאה
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
