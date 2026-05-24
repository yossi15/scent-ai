/**
 * fragrance-match.ts
 * Algorithmic pre-ranking before sending candidates to Claude.
 * Goal: Claude gets the TOP-25 most relevant candidates, not 80 random ones.
 */

import { type Fragrance } from '@/data/fragrances';

export type RadarVec = Record<string, number>;

/* ── Cosine similarity between two radar profiles ──────────────── */
export function cosineSim(a: RadarVec, b: RadarVec): number {
  const keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)]));
  let dot = 0, magA = 0, magB = 0;
  for (const k of keys) {
    const av = a[k] ?? 0, bv = b[k] ?? 0;
    dot  += av * bv;
    magA += av * av;
    magB += bv * bv;
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

/* ── Build taste vector from known fragrance IDs ────────────────── */
export function buildTasteVector(
  knownIds: number[],
  allFragrances: Fragrance[],
): RadarVec | null {
  if (!knownIds.length) return null;
  const frags = allFragrances.filter(f => knownIds.includes(f.id));
  if (!frags.length) return null;

  const keys = Object.keys(frags[0].radarProfile);
  const avg: RadarVec = {};
  for (const k of keys) {
    avg[k] = frags.reduce((sum, f) => sum + ((f.radarProfile as RadarVec)[k] ?? 0), 0) / frags.length;
  }
  return avg;
}

/* ── Extract signature notes (appear in 2+ loved fragrances) ────── */
export function signatureNotes(
  knownIds: number[],
  allFragrances: Fragrance[],
): string[] {
  if (knownIds.length < 2) return [];
  const frags = allFragrances.filter(f => knownIds.includes(f.id));
  const freq: Record<string, number> = {};
  for (const f of frags) {
    // Dedupe per fragrance so one boshm can't inflate a note
    const seen = new Set<string>();
    for (const n of f.notes ?? []) {
      const name = n.name.toLowerCase().trim();
      if (!seen.has(name)) { freq[name] = (freq[name] ?? 0) + 1; seen.add(name); }
    }
  }
  return Object.entries(freq)
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name)
    .slice(0, 8);
}

/* ── Map user-selected dislikes → filter criteria ───────────────── */
const DISLIKE_MAP: Record<string, {
  radarKey?: string; radarThreshold?: number;
  noteKeywords?: string[]; tags?: string[];
}> = {
  sweet:    { radarKey: 'gourmand', radarThreshold: 6, noteKeywords: ['vanilla', 'caramel', 'sugar', 'honey', 'praline', 'marshmallow'] },
  oud:      { noteKeywords: ['oud', 'agarwood', 'bakhoor'], tags: ['oud'] },
  smoky:    { noteKeywords: ['smoke', 'tobacco', 'incense', 'birch tar'], tags: ['smoky', 'tobacco'] },
  fresh:    { radarKey: 'fresh', radarThreshold: 7, noteKeywords: ['marine', 'ozone', 'aquatic', 'aldehyde'] },
  floral:   { radarKey: 'floral', radarThreshold: 7, noteKeywords: ['rose', 'jasmine', 'peony', 'lily', 'iris'] },
  detergent:{ noteKeywords: ['musk', 'white musk', 'clean musk', 'soapy'], tags: ['clean', 'fresh'] },
  animalic: { radarKey: 'animalic', radarThreshold: 6, noteKeywords: ['civet', 'musk', 'castoreum', 'ambergris'], tags: ['animalic'] },
  powdery:  { noteKeywords: ['iris', 'violet', 'powder', 'talc', 'heliotrope'] },
};

export function filterByDislikes(
  frags: Fragrance[],
  dislikes: string[],
): Fragrance[] {
  if (!dislikes.length) return frags;
  const rules = dislikes.map(d => DISLIKE_MAP[d]).filter(Boolean);
  if (!rules.length) return frags;

  return frags.filter(f => {
    for (const rule of rules) {
      // Radar threshold check
      if (rule.radarKey && rule.radarThreshold != null) {
        if (((f.radarProfile as RadarVec)[rule.radarKey] ?? 0) >= rule.radarThreshold) return false;
      }
      // Note keyword check
      if (rule.noteKeywords?.length) {
        const noteNames = (f.notes ?? []).map(n => n.name.toLowerCase());
        if (rule.noteKeywords.some(kw => noteNames.some(n => n.includes(kw)))) return false;
      }
      // Tag check
      if (rule.tags?.length) {
        const fTags = f.tags.map(t => t.toLowerCase());
        if (rule.tags.some(tag => fTags.includes(tag))) return false;
      }
    }
    return true;
  });
}

/* ── Main: rank candidates by algo score ────────────────────────── */
export interface ScoredCandidate extends Fragrance {
  similarityScore: number; // 0–1
  algoRank: number;        // 1 = best
}

export function rankCandidates(
  pool: Fragrance[],
  tasteVec: RadarVec | null,
  dislikes: string[],
  answers: {
    budget?: string;
    gender?: string;
    longevity?: string;
    sillage?: string;
    seasons?: string[];
    occasions?: string[];
  },
  topN = 25,
): ScoredCandidate[] {
  // 1. Hard filters (budget / gender / longevity)
  let filtered = pool.filter(f => {
    if (answers.budget === 'under500'  && f.price > 500)   return false;
    if (answers.budget === '500-1000'  && f.price > 1000)  return false;
    if (answers.budget === '1000-2000' && f.price > 2000)  return false;
    if (answers.gender === 'masculine' && f.gender === 'Feminine') return false;
    if (answers.gender === 'feminine'  && f.gender === 'Masculine') return false;
    if (answers.longevity === '10h+' && f.longevity < 7)  return false;
    if (answers.sillage  === 'discrete' && f.sillage > 6) return false;
    if (answers.sillage  === 'strong'   && f.sillage < 6) return false;
    return true;
  });

  // 2. Soft filter: remove disliked note/radar profiles
  filtered = filterByDislikes(filtered, dislikes);

  // 3. Score each candidate
  const scored = filtered.map(f => {
    let score = 0;

    // a) Radar cosine similarity (weight: 50%)
    if (tasteVec) {
      score += cosineSim(f.radarProfile as RadarVec, tasteVec) * 0.5;
    } else {
      score += 0.25; // neutral if no known fragrances
    }

    // b) Longevity match (weight: 15%)
    const longevityTarget: Record<string, number> = { '4-6h': 5, '6-10h': 7, '10h+': 9 };
    const targetL = longevityTarget[answers.longevity ?? ''] ?? 6;
    score += (1 - Math.abs(f.longevity - targetL) / 10) * 0.15;

    // c) Sillage match (weight: 10%)
    const sillageTarget: Record<string, number> = { discrete: 3, moderate: 6, strong: 8 };
    const targetS = sillageTarget[answers.sillage ?? ''] ?? 5;
    score += (1 - Math.abs(f.sillage - targetS) / 10) * 0.1;

    // d) Rating bonus (weight: 15%)
    score += ((f.rating ?? 0) / 5) * 0.15;

    // e) Recency bonus (newer = slightly preferred, weight: 10%)
    const yearScore = f.year ? Math.min((f.year - 1990) / 35, 1) : 0.5;
    score += yearScore * 0.1;

    return { ...f, similarityScore: score, algoRank: 0 };
  });

  // 4. Sort and assign ranks
  scored.sort((a, b) => b.similarityScore - a.similarityScore);
  return scored.slice(0, topN).map((c, i) => ({ ...c, algoRank: i + 1 }));
}
