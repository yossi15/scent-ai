#!/usr/bin/env node
/**
 * Convert /placeholders/{family}.svg references in fragrances.json to
 * inline data: URIs so they render even if public/ static serving is broken.
 */
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/data/fragrances.json');
const PLACEHOLDERS_DIR = path.join(__dirname, '../public/placeholders');

// Cache: slug -> data: URI
const cache = {};
function loadDataUri(slug) {
  if (cache[slug] !== undefined) return cache[slug];
  const file = path.join(PLACEHOLDERS_DIR, `${slug}.svg`);
  if (!fs.existsSync(file)) {
    cache[slug] = null;
    return null;
  }
  const svg = fs.readFileSync(file, 'utf8');
  const b64 = Buffer.from(svg, 'utf8').toString('base64');
  cache[slug] = `data:image/svg+xml;base64,${b64}`;
  return cache[slug];
}

const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
let patched = 0;
for (const f of data) {
  const m = typeof f.image === 'string' && f.image.match(/^\/placeholders\/([^./]+)\.svg$/);
  if (m) {
    const uri = loadDataUri(m[1]) || loadDataUri('default');
    if (uri) {
      f.image = uri;
      patched++;
    }
  }
}
fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
console.log(`Inlined ${patched} placeholder image refs as data: URIs.`);
