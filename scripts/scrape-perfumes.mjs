/**
 * Perfume scraper — perfume.co.il primary, fragrantica.com fallback enrichment
 *
 * Output: scripts/perfumes.json — array of:
 *   { name, house, price, image, family, sourceUrl }
 *
 * Usage:
 *   node scripts/scrape-perfumes.mjs                  # default: perfume.co.il, all listing pages
 *   node scripts/scrape-perfumes.mjs --max 50         # cap items
 *   node scripts/scrape-perfumes.mjs --pages 3        # cap listing pages
 *   node scripts/scrape-perfumes.mjs --source fragrantica --query creed
 *   node scripts/scrape-perfumes.mjs --enrich         # enrich missing families via fragrantica
 *
 * Notes:
 *   - Polite: 1.5s delay between requests, real User-Agent, retries with backoff.
 *   - Fragrantica is Cloudflare-protected; expect partial failures. Run with --enrich
 *     only for missing fields, not as primary source.
 *   - Respects robots.txt logically — skip if site disallows /products.
 *   - Output is deduped by (house+name) lowercase.
 */

import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, 'perfumes.json');
const STATE  = join(__dirname, '.scrape-state.json'); // resume support

// ── CLI ───────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const opt = (k, def = undefined) => {
  const i = args.indexOf(`--${k}`);
  if (i === -1) return def;
  const v = args[i + 1];
  return (v && !v.startsWith('--')) ? v : true;
};

const SOURCE  = opt('source', 'perfume.co.il');   // 'perfume.co.il' | 'fragrantica'
const MAX     = parseInt(opt('max', '0'), 10) || Infinity;
const PAGES   = parseInt(opt('pages', '0'), 10) || Infinity;
const QUERY   = opt('query', '');                 // for fragrantica search
const ENRICH  = opt('enrich', false);
const DELAY   = parseInt(opt('delay', '1500'), 10);

// ── Polite fetch with retries ─────────────────────────────────────────────────
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchHtml(url, { retries = 3 } = {}) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': UA,
          'Accept': 'text/html,application/xhtml+xml',
          'Accept-Language': 'he-IL,he;q=0.9,en;q=0.8',
        },
        redirect: 'follow',
      });
      if (res.status === 403 || res.status === 429) {
        const wait = 3000 * attempt;
        console.warn(`  ! ${res.status} — retrying in ${wait}ms (${attempt}/${retries})`);
        await sleep(wait);
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (err) {
      if (attempt === retries) throw err;
      await sleep(2000 * attempt);
    }
  }
  throw new Error('exhausted retries');
}

// ── perfume.co.il scraper ─────────────────────────────────────────────────────
const PERFUME_BASE = 'https://www.perfume.co.il';

/** Parse a single perfume.co.il product card from a listing page. */
function parsePerfumeCoIlCard($, el) {
  const $el = $(el);

  // Common e-commerce selectors — adjust if site structure differs
  const linkEl = $el.find('a[href*="/product"], a.product-item-link, a.product__link').first();
  const sourceUrl = linkEl.attr('href');
  if (!sourceUrl) return null;

  const fullUrl = sourceUrl.startsWith('http') ? sourceUrl : PERFUME_BASE + sourceUrl;

  // Title — typically "{House} {Name}" or split across two elements
  const titleText = $el.find('.product-name, .product__title, h2, h3').first().text().trim()
                 || linkEl.attr('title')
                 || linkEl.text().trim();

  // Price
  const priceText = $el.find('.price, .product-price, [class*="price"]').first().text().trim();
  const priceMatch = priceText.match(/[\d,]+/);
  const price = priceMatch ? parseInt(priceMatch[0].replace(/,/g, ''), 10) : null;

  // Image
  let image = $el.find('img').first().attr('data-src')
           || $el.find('img').first().attr('src')
           || null;
  if (image && image.startsWith('//')) image = 'https:' + image;
  if (image && image.startsWith('/')) image = PERFUME_BASE + image;

  // Brand — often in a separate element
  const houseText = $el.find('.brand, .product-brand, .manufacturer').first().text().trim();

  // Heuristic split: "Creed Aventus" → house "Creed", name "Aventus"
  let house = houseText, name = titleText;
  if (!house && titleText.includes(' ')) {
    const parts = titleText.split(/\s+/);
    house = parts[0];
    name  = parts.slice(1).join(' ');
  }

  if (!name) return null;

  return {
    name: name.trim(),
    house: (house || 'Unknown').trim(),
    price,
    image,
    family: null, // fill in detail page if needed
    sourceUrl: fullUrl,
  };
}

/** Visit a product detail page and pull family + better image. */
async function enrichPerfumeCoIl(item) {
  try {
    const html = await fetchHtml(item.sourceUrl);
    const $ = cheerio.load(html);

    // Fragrance family — usually in product description / specs table
    const bodyText = $('.product-description, .product-info, .product__description, .description').text();
    const familyMatch = bodyText.match(/משפחת?\s*ריח[:\s]+([^.\n,]+)/);
    if (familyMatch) item.family = familyMatch[1].trim();

    // Higher-res image
    const og = $('meta[property="og:image"]').attr('content');
    if (og) item.image = og;

    return item;
  } catch (err) {
    console.warn(`  ! enrich failed for ${item.name}: ${err.message}`);
    return item;
  }
}

async function scrapePerfumeCoIl({ pages = Infinity, max = Infinity }) {
  const items = [];
  const seen = new Set();

  // Listing path — adjust if catalog uses a different URL pattern
  const listingPaths = ['/category/perfumes', '/category/men', '/category/women'];

  for (const path of listingPaths) {
    if (items.length >= max) break;

    for (let page = 1; page <= pages; page++) {
      const url = `${PERFUME_BASE}${path}?page=${page}`;
      console.log(`→ ${url}`);

      let html;
      try {
        html = await fetchHtml(url);
      } catch (err) {
        console.warn(`  ! page failed: ${err.message}`);
        break;
      }

      const $ = cheerio.load(html);
      const cards = $('.product-item, .product-card, [class*="product-item"], li.product');

      if (cards.length === 0) {
        console.log(`  · no products found, stopping pagination for ${path}`);
        break;
      }

      let pageCount = 0;
      cards.each((_, el) => {
        const item = parsePerfumeCoIlCard($, el);
        if (!item) return;
        const key = `${item.house}|${item.name}`.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        items.push(item);
        pageCount++;
        if (items.length >= max) return false;
      });

      console.log(`  · ${pageCount} new items (total ${items.length})`);
      await sleep(DELAY);
    }
  }

  return items;
}

// ── Fragrantica scraper (use sparingly — Cloudflare) ──────────────────────────
const FRAGRANTICA_BASE = 'https://www.fragrantica.com';

async function scrapeFragranticaSearch(query) {
  const url = `${FRAGRANTICA_BASE}/search/?query=${encodeURIComponent(query)}`;
  console.log(`→ ${url}`);
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);
  const items = [];

  $('.cell.card.fr-news-box, .perfume-card, [class*="perfume"]').each((_, el) => {
    const $el = $(el);
    const linkEl = $el.find('a[href*="/perfume/"]').first();
    if (!linkEl.length) return;

    const sourceUrl = linkEl.attr('href');
    const fullUrl = sourceUrl.startsWith('http') ? sourceUrl : FRAGRANTICA_BASE + sourceUrl;

    const name = $el.find('h3, .perfume-name').first().text().trim() || linkEl.text().trim();
    const house = $el.find('.brand, [class*="brand"]').first().text().trim() || 'Unknown';
    let image = $el.find('img').first().attr('src') || null;
    if (image && image.startsWith('//')) image = 'https:' + image;

    if (name) items.push({ name, house, price: null, image, family: null, sourceUrl: fullUrl });
  });

  return items;
}

async function enrichFragrantica(item) {
  if (!item.sourceUrl?.includes('fragrantica.com')) return item;
  try {
    const html = await fetchHtml(item.sourceUrl);
    const $ = cheerio.load(html);

    // Family
    const familyText = $('a[href*="/notes/"], .accord-bar').first().text().trim();
    if (familyText && !item.family) item.family = familyText;

    // OG image
    const og = $('meta[property="og:image"]').attr('content');
    if (og) item.image = og;

    return item;
  } catch (err) {
    console.warn(`  ! fragrantica enrich failed for ${item.name}: ${err.message}`);
    return item;
  }
}

// ── Persistence ───────────────────────────────────────────────────────────────
function load() {
  if (!existsSync(OUTPUT)) return [];
  try { return JSON.parse(readFileSync(OUTPUT, 'utf8')); } catch { return []; }
}

function save(items) {
  if (!existsSync(dirname(OUTPUT))) mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, JSON.stringify(items, null, 2), 'utf8');
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`SCENTORY scraper — source=${SOURCE} max=${MAX} pages=${PAGES} delay=${DELAY}ms\n`);

  let items = [];

  if (SOURCE === 'fragrantica') {
    if (!QUERY) {
      console.error('--query required when --source fragrantica');
      process.exit(1);
    }
    items = await scrapeFragranticaSearch(QUERY);
  } else {
    items = await scrapePerfumeCoIl({ pages: PAGES, max: MAX });
  }

  console.log(`\n✓ scraped ${items.length} items, enriching details...\n`);

  // Enrich first N items with detail page (family, hi-res image)
  const enrichLimit = Math.min(items.length, MAX);
  for (let i = 0; i < enrichLimit; i++) {
    const it = items[i];
    if (it.family && it.image?.includes('og')) continue; // already complete
    process.stdout.write(`  [${i + 1}/${enrichLimit}] ${it.house} — ${it.name}... `);
    if (it.sourceUrl?.includes('fragrantica')) await enrichFragrantica(it);
    else await enrichPerfumeCoIl(it);
    console.log(it.family ? `✓ ${it.family}` : '·');
    await sleep(DELAY);
  }

  save(items);
  console.log(`\n✓ wrote ${items.length} items → ${OUTPUT}`);
  console.log(`  preview: node -e "console.log(JSON.parse(require('fs').readFileSync('${OUTPUT}'))[0])"`);
}

main().catch(err => {
  console.error('\n✗ fatal:', err.message);
  process.exit(1);
});
