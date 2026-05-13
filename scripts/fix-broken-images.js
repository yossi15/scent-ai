#!/usr/bin/env node
/**
 * Reads scripts/audit-broken.json and updates fragrances.json:
 *   - For entries whose image is broken, replaces the image URL with a
 *     deterministic family-themed gradient placeholder served from /api/og or
 *     a local CDN. We use /placeholders/{family-slug}.svg which is generated
 *     once and committed (see scripts/generate-placeholders.js).
 *   - Also clears the fragrantica_id so the detail page does NOT try to
 *     reconstruct the canonical URL from a known-bad id.
 *
 * Usage: node scripts/fix-broken-images.js
 */
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/data/fragrances.json');
const BROKEN_FILE = path.join(__dirname, 'audit-broken.json');

if (!fs.existsSync(BROKEN_FILE)) {
  console.error('No audit-broken.json found. Run audit-images.js first.');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const broken = JSON.parse(fs.readFileSync(BROKEN_FILE, 'utf8'));
const brokenKeys = new Set(broken.map(b => `${b.name}|${b.house}`));

function slugFamily(family) {
  return (family || 'default').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

let fixed = 0;
for (const f of data) {
  if (brokenKeys.has(`${f.name}|${f.house}`)) {
    f.image = `/placeholders/${slugFamily(f.family)}.svg`;
    delete f.fragrantica_id; // prevent detail page from rebuilding the broken canonical URL
    fixed++;
  }
}

fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
console.log(`Patched ${fixed} entries to use placeholder images.`);
