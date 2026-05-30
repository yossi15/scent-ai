/**
 * Checks all fragrance image URLs and reports broken ones.
 * Uses HEAD requests in batches of 30 concurrent.
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const raw = JSON.parse(readFileSync(join(__dirname, '../src/data/fragrances.json'), 'utf8'));

// EXTRA_RAW entries (manually maintained)
const extras = [
  { name: 'Aventus', house: 'Creed', fragrantica_id: 25168 },
  { name: 'Baccarat Rouge 540', house: 'Maison Francis Kurkdjian', fragrantica_id: 55248 },
  { name: 'Halley', house: 'Tiziana Terenzi', fragrantica_id: 31840 },
  { name: 'Bal d\'Afrique', house: 'Byredo', fragrantica_id: 5143 },
  { name: 'L\'Homme à la Rose', house: 'Maison Francis Kurkdjian', fragrantica_id: 60099 },
];

const all = [
  ...raw.filter(f => f.fragrantica_id).map(f => ({ name: f.name, house: f.house, fragrantica_id: f.fragrantica_id })),
  ...extras,
];

console.log(`Checking ${all.length} image URLs...`);

async function checkUrl(fragrantica_id) {
  const url = `https://fimgs.net/mdimg/perfume/375x500.${fragrantica_id}.jpg`;
  try {
    const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(8000) });
    const size = parseInt(res.headers.get('content-length') || '0', 10);
    return { ok: res.ok, status: res.status, size };
  } catch (e) {
    return { ok: false, status: 0, size: 0, error: e.message };
  }
}

async function runBatch(items) {
  return Promise.all(items.map(async item => {
    const result = await checkUrl(item.fragrantica_id);
    return { ...item, ...result };
  }));
}

const BATCH = 30;
const broken = [];
const ok = [];

for (let i = 0; i < all.length; i += BATCH) {
  const batch = all.slice(i, i + BATCH);
  const results = await runBatch(batch);
  for (const r of results) {
    if (!r.ok || r.size < 5000) {
      broken.push(r);
    } else {
      ok.push(r);
    }
  }
  process.stdout.write(`\r${Math.min(i + BATCH, all.length)}/${all.length} checked — ${broken.length} broken so far`);
}

console.log('\n\n=== BROKEN IMAGES ===');
if (broken.length === 0) {
  console.log('None! All images OK.');
} else {
  broken.forEach(b => {
    console.log(`BROKEN | ${b.house} — ${b.name} | fragrantica_id: ${b.fragrantica_id} | status: ${b.status} | size: ${b.size}`);
  });
}

const log = broken.map(b => `${b.house} | ${b.name} | id: ${b.fragrantica_id} | status: ${b.status} | size: ${b.size}`).join('\n');
writeFileSync(join(__dirname, 'broken-images.log'), log || 'None');
console.log(`\nLog saved to scripts/broken-images.log`);
console.log(`Summary: ${ok.length} OK, ${broken.length} broken`);
