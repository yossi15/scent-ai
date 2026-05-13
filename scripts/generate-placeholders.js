#!/usr/bin/env node
/**
 * Generates SVG placeholder bottles for every fragrance family.
 * Output: public/placeholders/{family-slug}.svg
 */
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../public/placeholders');
fs.mkdirSync(OUT_DIR, { recursive: true });

// Gradient palettes per family (boutique aesthetic — muted, sophisticated)
const PALETTES = {
  'amber':            ['#C9A55C', '#8B6F33'],
  'amber-floral':     ['#D4A574', '#A06B4F'],
  'amber-spicy':      ['#B8763A', '#6B3D17'],
  'amber-vanilla':    ['#E8C8A0', '#A77B4A'],
  'amber-woody':      ['#A8794A', '#5C3D1E'],
  'animalic':         ['#6B4423', '#2F1A0D'],
  'aromatic':         ['#A8B89E', '#5D6E55'],
  'aromatic-aquatic': ['#9EC8D9', '#3E6B85'],
  'aromatic-citrus':  ['#E8D67A', '#8C7A2E'],
  'aromatic-floral':  ['#D9C2D4', '#876B81'],
  'aromatic-fougere': ['#A8C295', '#4F6B3F'],
  'aromatic-spicy':   ['#C29655', '#704F1E'],
  'chypre-leather':   ['#7A5235', '#3D2517'],
  'citrus':           ['#F2D858', '#A88B1F'],
  'citrus-aromatic':  ['#E8D67A', '#8C7A2E'],
  'citrus-green':     ['#C8DA7A', '#6B7F2E'],
  'floral':           ['#E8C2D4', '#A06784'],
  'floral-fruity':    ['#F2B8B8', '#A85F5F'],
  'floral-green':     ['#C8D9A8', '#6B855B'],
  'floral-powdery':   ['#E8D4DA', '#A88894'],
  'floral-woody':     ['#C29978', '#704F35'],
  'leather':          ['#7A4A2E', '#3D2517'],
  'woody':            ['#8B6F4A', '#4A3320'],
  'woody-aromatic':   ['#9E8556', '#5D4A2E'],
  'woody-spicy':      ['#A87A48', '#5C3D1E'],
  'default':          ['#D4C8B8', '#7A6B58'],
};

function svgFor(slug, [light, dark]) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${light}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${dark}" stop-opacity="0.32"/>
    </linearGradient>
    <linearGradient id="bottle" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${light}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="${dark}" stop-opacity="0.92"/>
    </linearGradient>
  </defs>
  <rect width="400" height="500" fill="url(#bg)"/>
  <!-- Bottle silhouette -->
  <rect x="155" y="90" width="90" height="32" rx="3" fill="${dark}" opacity="0.6"/>
  <rect x="170" y="122" width="60" height="18" fill="${dark}" opacity="0.5"/>
  <path d="M 145 140 L 145 410 Q 145 430 165 430 L 235 430 Q 255 430 255 410 L 255 140 Z" fill="url(#bottle)" stroke="${dark}" stroke-width="1" stroke-opacity="0.4"/>
  <rect x="165" y="230" width="70" height="120" fill="white" opacity="0.08"/>
</svg>`;
}

let count = 0;
for (const [slug, palette] of Object.entries(PALETTES)) {
  fs.writeFileSync(path.join(OUT_DIR, `${slug}.svg`), svgFor(slug, palette), 'utf8');
  count++;
}
console.log(`Generated ${count} placeholder SVGs in ${OUT_DIR}`);
