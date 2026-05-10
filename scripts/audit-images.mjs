// Audits all fragrance image URLs by issuing HEAD requests.
// Reports broken (non-200) and Fragrantica URLs (likely 403 in production).
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/data/fragrances.ts', import.meta.url), 'utf8');

// Match { id: N, name: "X", ... image: "URL", ... }
const entries = [];
const blockRe = /\{\s*id:\s*(\d+),\s*name:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"/g;
let m;
while ((m = blockRe.exec(src))) {
  entries.push({ id: +m[1], name: m[2], url: m[3] });
}

console.log(`Found ${entries.length} fragrances. Checking...`);

const results = await Promise.all(entries.map(async (e) => {
  try {
    const res = await fetch(e.url, { method: 'HEAD', redirect: 'follow' });
    return { ...e, status: res.status, ok: res.ok };
  } catch (err) {
    return { ...e, status: 0, ok: false, err: err.message };
  }
}));

const broken = results.filter(r => !r.ok);
const fragrantica = results.filter(r => r.url.includes('fimgs.net'));

console.log(`\n=== BROKEN (${broken.length}) ===`);
broken.forEach(r => console.log(`  ${r.id} | ${r.status} | ${r.name} | ${r.url}`));

console.log(`\n=== FRAGRANTICA URLs (${fragrantica.length}) ===`);
fragrantica.forEach(r => console.log(`  ${r.id} | ${r.status} | ${r.name}`));
