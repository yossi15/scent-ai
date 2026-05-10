import rawJson from './fragrances.json';

export interface Fragrance {
  id: number;
  name: string;
  house: string;
  year: number;
  gender: string;
  family: string;
  concentration: string;
  price: number;
  longevity: number;
  sillage: number;
  fragrantica_id?: number;
  image: string;
  notes: { name: string; type: 'top' | 'heart' | 'base' }[];
  radarProfile: {
    woody: number;
    floral: number;
    oriental: number;
    fresh: number;
    gourmand: number;
    animalic: number;
  };
  tags: string[];
  rating: number;
  description: string;
  size: string;
}

// ── Radar profiles by family ─────────────────────────────────────────────────
const RADAR: Record<string, Fragrance['radarProfile']> = {
  'Amber':           { woody: 3, floral: 2, oriental: 8, fresh: 1, gourmand: 4, animalic: 2 },
  'Amber Floral':    { woody: 2, floral: 6, oriental: 7, fresh: 2, gourmand: 3, animalic: 2 },
  'Amber Spicy':     { woody: 3, floral: 1, oriental: 8, fresh: 1, gourmand: 3, animalic: 3 },
  'Amber Vanilla':   { woody: 2, floral: 2, oriental: 7, fresh: 1, gourmand: 8, animalic: 2 },
  'Amber Woody':     { woody: 6, floral: 1, oriental: 7, fresh: 1, gourmand: 3, animalic: 2 },
  'Animalic':        { woody: 2, floral: 1, oriental: 4, fresh: 1, gourmand: 2, animalic: 9 },
  'Aromatic':        { woody: 3, floral: 2, oriental: 2, fresh: 7, gourmand: 1, animalic: 1 },
  'Aromatic Aquatic':{ woody: 2, floral: 2, oriental: 1, fresh: 8, gourmand: 1, animalic: 1 },
  'Aromatic Citrus': { woody: 2, floral: 2, oriental: 1, fresh: 9, gourmand: 1, animalic: 1 },
  'Aromatic Floral': { woody: 2, floral: 6, oriental: 2, fresh: 6, gourmand: 1, animalic: 1 },
  'Aromatic Fougere':{ woody: 3, floral: 3, oriental: 2, fresh: 7, gourmand: 1, animalic: 2 },
  'Aromatic Spicy':  { woody: 3, floral: 1, oriental: 5, fresh: 6, gourmand: 2, animalic: 2 },
  'Chypre Leather':  { woody: 4, floral: 3, oriental: 4, fresh: 3, gourmand: 1, animalic: 6 },
  'Citrus':          { woody: 1, floral: 2, oriental: 1, fresh: 9, gourmand: 2, animalic: 1 },
  'Citrus Aromatic': { woody: 2, floral: 2, oriental: 1, fresh: 8, gourmand: 1, animalic: 1 },
  'Citrus Green':    { woody: 2, floral: 3, oriental: 1, fresh: 9, gourmand: 1, animalic: 1 },
  'Floral':          { woody: 2, floral: 9, oriental: 2, fresh: 4, gourmand: 1, animalic: 1 },
  'Floral Fruity':   { woody: 1, floral: 7, oriental: 2, fresh: 5, gourmand: 4, animalic: 1 },
  'Floral Green':    { woody: 2, floral: 7, oriental: 1, fresh: 6, gourmand: 1, animalic: 1 },
  'Floral Powdery':  { woody: 2, floral: 8, oriental: 4, fresh: 2, gourmand: 3, animalic: 1 },
  'Floral Woody':    { woody: 6, floral: 7, oriental: 2, fresh: 2, gourmand: 1, animalic: 1 },
  'Leather':         { woody: 5, floral: 1, oriental: 4, fresh: 1, gourmand: 1, animalic: 7 },
  'Woody':           { woody: 8, floral: 2, oriental: 3, fresh: 2, gourmand: 1, animalic: 1 },
  'Woody Aromatic':  { woody: 7, floral: 2, oriental: 2, fresh: 5, gourmand: 1, animalic: 1 },
  'Woody Spicy':     { woody: 7, floral: 1, oriental: 5, fresh: 2, gourmand: 2, animalic: 2 },
};

const DEFAULT_RADAR: Fragrance['radarProfile'] = { woody: 4, floral: 4, oriental: 4, fresh: 4, gourmand: 2, animalic: 2 };

// ── Description templates ────────────────────────────────────────────────────
const DESC: Record<string, string> = {
  'Amber':           'ענברי חם ומפתה עם עומק מזרחי מתמשך',
  'Amber Floral':    'שילוב מושלם של ענבר חמה ועדינות פרחונית',
  'Amber Spicy':     'ענבר עשיר עם תבלינים חריפים ואינטנסיביים',
  'Amber Vanilla':   'ונילה שמנתית ועמוקה על בסיס ענברי מפנק',
  'Amber Woody':     'ענבר זהוב עם עצב יקר ועושר חושני',
  'Animalic':        'עמוק ואנימלי, בושם שמשאיר חותם בלתי נשכח',
  'Aromatic':        'ארומטי נקי ואלגנטי עם עשבי תיבול טריים',
  'Aromatic Aquatic':'ארומטי ימי ורענן עם משב אוויר ים תיכוני',
  'Aromatic Citrus': 'הדרי ורענן עם ניחוח ארומטי מרומם',
  'Aromatic Floral': 'פרחוני עם נגיעות ארומטיות ירוקות ורעננות',
  'Aromatic Fougere':'פוז\'ר קלאסי עם לוונדר, אימוס ורוח יער',
  'Aromatic Spicy':  'ארומטי ותבלינים עם אישיות חזקה ונוכחות',
  'Chypre Leather':  'שייפר עורני מתוחכם עם עומק ונוכחות',
  'Citrus':          'הדרי טרי ומרענן, אנרגטי ומעורר',
  'Citrus Aromatic': 'הדרי עם בסיס ארומטי עמוק ומורכב',
  'Citrus Green':    'הדרי ירוק, טרי כמו גינה לאחר הגשם',
  'Floral':          'פרחוני מפואר ועשיר, לאישה אלגנטית',
  'Floral Fruity':   'פרחוני פירותי, שמח ואופטימי',
  'Floral Green':    'פרחוני ירוק, טבעי ועדין',
  'Floral Powdery':  'פרחוני אבקתי קלאסי עם חן נצחי',
  'Floral Woody':    'פרחים יקרים על בסיס עצב חם ועמוק',
  'Leather':         'עורני אמיץ, מסוגנן וחד אישיות',
  'Woody':           'עצבי יקר ואדמתי עם עומק ובגרות',
  'Woody Aromatic':  'עצבי ארומטי ומתוחכם, נוכחות חזקה',
  'Woody Spicy':     'עצבי חריף עם תבלינים מזרחיים',
};

// ── Tags derivation ──────────────────────────────────────────────────────────
function deriveTags(
  family: string,
  gender: string,
  longevity: number,
  sillage: number,
  notes: { name: string; type: string }[]
): string[] {
  const tags: string[] = [];
  const fam = family.toLowerCase();
  const noteNames = notes.map(n => n.name.toLowerCase());

  if (fam.includes('floral')) tags.push('floral');
  if (fam.includes('woody')) tags.push('woody');
  if (fam.includes('amber') || fam.includes('oriental')) tags.push('oriental', 'warm');
  if (fam.includes('citrus') || fam.includes('aromatic')) tags.push('fresh');
  if (fam.includes('gourmand') || fam.includes('vanilla')) tags.push('sweet', 'gourmand');
  if (fam.includes('leather') || fam.includes('animalic')) tags.push('dark', 'sensual');
  if (fam.includes('spicy')) tags.push('spicy');
  if (fam.includes('aquatic')) tags.push('marine', 'fresh');

  if (noteNames.some(n => ['rose', 'jasmine', 'lily', 'iris'].includes(n))) tags.push('romantic', 'elegant');
  if (noteNames.some(n => ['vanilla', 'caramel', 'praline', 'chocolate', 'coffee'].includes(n))) tags.push('gourmand', 'addictive');
  if (noteNames.some(n => ['oud', 'agarwood'].includes(n))) tags.push('oud', 'luxurious');
  if (noteNames.some(n => ['vetiver', 'patchouli', 'moss', 'oakmoss'].includes(n))) tags.push('earthy', 'sophisticated');
  if (noteNames.some(n => ['bergamot', 'lemon', 'orange', 'grapefruit', 'lime'].includes(n))) tags.push('citrus', 'fresh');
  if (noteNames.some(n => ['musk', 'ambergris', 'civet'].includes(n))) tags.push('sensual', 'smooth');
  if (noteNames.some(n => ['sandalwood', 'cedar', 'guaiac'].includes(n))) tags.push('woody', 'creamy');

  if (longevity >= 9 && sillage >= 8) tags.push('beast mode', 'power scent');
  if (longevity >= 8) tags.push('long-lasting');
  if (sillage >= 8) tags.push('strong sillage');
  if (longevity >= 7 && sillage <= 6) tags.push('versatile');

  const g = gender.toLowerCase();
  if (g.includes('unisex')) tags.push('unisex', 'versatile');
  if (g.includes('feminine') || g.includes('women')) tags.push('feminine');
  if (g.includes('masculine') || g.includes('men')) tags.push('masculine');

  return [...new Set(tags)].slice(0, 8);
}

// ── Rating derivation ────────────────────────────────────────────────────────
function deriveRating(longevity: number, sillage: number, id: number): number {
  const base = 4.0 + ((longevity + sillage) / 18) * 0.85;
  const micro = ((id * 7919) % 100) / 1000 - 0.05; // tiny ±0.05 variation
  return Math.round(Math.min(5.0, Math.max(4.0, base + micro)) * 10) / 10;
}

// ── Raw extras (Halley + Bal d'Afrique not in scraped JSON) ─────────────────
const EXTRA_RAW = [
  {
    name: "Halley",
    house: "Tiziana Terenzi",
    year: 2015,
    gender: "Unisex",
    family: "Floral Fruity",
    concentration: "EDP",
    price: 1200,
    longevity: 8,
    sillage: 8,
    fragrantica_id: 31840,
    image: "https://fimgs.net/mdimg/perfume/375x500.31840.jpg",
    notes: [
      { name: "Bergamot", type: "top" },
      { name: "Pear", type: "top" },
      { name: "Melon", type: "top" },
      { name: "Rose", type: "heart" },
      { name: "Jasmine", type: "heart" },
      { name: "Freesia", type: "heart" },
      { name: "Musk", type: "base" },
      { name: "Amber", type: "base" },
      { name: "Vanilla", type: "base" },
    ],
  },
  {
    name: "Bal d'Afrique",
    house: "Byredo",
    year: 2009,
    gender: "Unisex",
    family: "Floral Woody",
    concentration: "EDP",
    price: 1400,
    longevity: 7,
    sillage: 7,
    fragrantica_id: 5143,
    image: "https://fimgs.net/mdimg/perfume/375x500.5143.jpg",
    notes: [
      { name: "Bergamot", type: "top" },
      { name: "Cyclamen", type: "top" },
      { name: "Neroli", type: "top" },
      { name: "Marigold", type: "heart" },
      { name: "Lily", type: "heart" },
      { name: "Jasmine", type: "heart" },
      { name: "Sandalwood", type: "base" },
      { name: "Musk", type: "base" },
      { name: "Vetiver", type: "base" },
      { name: "Amber", type: "base" },
    ],
  },
  {
    name: "L'Homme à la Rose",
    house: "Maison Francis Kurkdjian",
    year: 2020,
    gender: "Masculine",
    family: "Amber Floral",
    concentration: "EDP",
    price: 1500,
    longevity: 7,
    sillage: 7,
    fragrantica_id: 60099,
    image: "https://fimgs.net/mdimg/perfume/375x500.60099.jpg",
    notes: [
      { name: "Damascena Rose", type: "top" },
      { name: "Egyptian Geranium", type: "top" },
      { name: "Cinnamon", type: "top" },
      { name: "Centifolia Rose", type: "heart" },
      { name: "Honey", type: "heart" },
      { name: "Patchouli", type: "base" },
      { name: "Papyrus", type: "base" },
      { name: "Amber", type: "base" },
    ],
  },
];

// ── Build final array ────────────────────────────────────────────────────────
type RawEntry = typeof rawJson[0];

function transform(raw: RawEntry, index: number): Fragrance {
  const radar = RADAR[raw.family] ?? DEFAULT_RADAR;
  const notes = raw.notes as { name: string; type: 'top' | 'heart' | 'base' }[];
  const id = index + 1;
  return {
    id,
    name: raw.name,
    house: raw.house,
    year: raw.year,
    gender: raw.gender,
    family: raw.family,
    concentration: raw.concentration,
    price: raw.price,
    longevity: raw.longevity,
    sillage: raw.sillage,
    fragrantica_id: raw.fragrantica_id,
    image: raw.image,
    notes,
    radarProfile: radar,
    tags: deriveTags(raw.family, raw.gender, raw.longevity, raw.sillage, notes),
    rating: deriveRating(raw.longevity, raw.sillage, id),
    description: DESC[raw.family] ?? 'בושם ייחודי ומורכב מבית אחד מיוצרי הבשמים המובחרים בעולם',
    size: '100ml',
  };
}

function transformExtra(raw: typeof EXTRA_RAW[0], index: number): Fragrance {
  const baseId = rawJson.length + index + 1;
  const radar = RADAR[raw.family] ?? DEFAULT_RADAR;
  const notes = raw.notes as { name: string; type: 'top' | 'heart' | 'base' }[];
  return {
    id: baseId,
    name: raw.name,
    house: raw.house,
    year: raw.year,
    gender: raw.gender,
    family: raw.family,
    concentration: raw.concentration,
    price: raw.price,
    longevity: raw.longevity,
    sillage: raw.sillage,
    fragrantica_id: raw.fragrantica_id,
    image: raw.image,
    notes,
    radarProfile: radar,
    tags: deriveTags(raw.family, raw.gender, raw.longevity, raw.sillage, notes),
    rating: deriveRating(raw.longevity, raw.sillage, baseId),
    description: DESC[raw.family] ?? 'בושם ייחודי ומורכב מבית אחד מיוצרי הבשמים המובחרים בעולם',
    size: '100ml',
  };
}

export const subscriptionTiers = [
  { id: 'discovery', nameHe: 'גילוי',  price: 179,  priceEnv: 'NEXT_PUBLIC_STRIPE_PRICE_DISCOVERY' },
  { id: 'collector', nameHe: 'אספן',   price: 549,  priceEnv: 'NEXT_PUBLIC_STRIPE_PRICE_COLLECTOR' },
  { id: 'expert',    nameHe: 'מומחה',  price: 1459, priceEnv: 'NEXT_PUBLIC_STRIPE_PRICE_EXPERT' },
] as const;

export const fragrances: Fragrance[] = [
  ...rawJson.map((r, i) => transform(r as RawEntry, i)),
  ...EXTRA_RAW.map((r, i) => transformExtra(r, i)),
];
