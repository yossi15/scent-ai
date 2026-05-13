#!/usr/bin/env node
/**
 * Audit all fragrance image URLs.
 * Runs HEAD requests in parallel batches and writes a Markdown report.
 *
 * Usage: node scripts/audit-images.js
 * Output:
 *   - scripts/audit-report.md   (human-readable summary)
 *   - scripts/audit-broken.json (machine-readable list of broken entries)
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_FILE = path.join(__dirname, '../src/data/fragrances.json');
const REPORT_MD = path.join(__dirname, 'audit-report.md');
const REPORT_JSON = path.join(__dirname, 'audit-broken.json');

const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const CONCURRENCY = 30;
const TIMEOUT_MS = 8000;

function checkUrl(url) {
  return new Promise(resolve => {
    const req = https.request(url, { method: 'HEAD', timeout: TIMEOUT_MS }, res => {
      const status = res.statusCode;
      const contentType = res.headers['content-type'] || '';
      const contentLength = parseInt(res.headers['content-length'] || '0', 10);
      resolve({ status, contentType, contentLength });
    });
    req.on('error', err => resolve({ status: 0, error: err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, error: 'timeout' }); });
    req.end();
  });
}

async function main() {
  const results = [];
  let done = 0;
  const total = data.length;
  console.log(`Auditing ${total} image URLs with concurrency=${CONCURRENCY}...`);

  // Process in batches
  for (let i = 0; i < data.length; i += CONCURRENCY) {
    const batch = data.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map(async (f, idx) => {
      const id = i + idx + 1; // 1-based id (matches transform())
      const url = f.image;
      const r = await checkUrl(url);
      return {
        id,
        name: f.name,
        house: f.house,
        url,
        status: r.status,
        contentType: r.contentType,
        contentLength: r.contentLength,
        error: r.error,
        ok: r.status === 200 && (r.contentType || '').startsWith('image/') && r.contentLength > 1000,
      };
    }));
    results.push(...batchResults);
    done += batch.length;
    if (done % 90 === 0 || done === total) {
      const broken = results.filter(r => !r.ok).length;
      console.log(`  ${done}/${total} checked, ${broken} broken so far`);
    }
  }

  const broken = results.filter(r => !r.ok);
  const okCount = results.length - broken.length;

  // Markdown report
  const md = [];
  md.push('# Image Audit Report');
  md.push('');
  md.push(`**Total checked:** ${results.length}`);
  md.push(`**OK:** ${okCount}`);
  md.push(`**Broken:** ${broken.length}`);
  md.push(`**Generated:** ${new Date().toISOString()}`);
  md.push('');
  md.push('## Broken images');
  md.push('');
  md.push('| ID | Name | House | Status | URL |');
  md.push('|---|---|---|---|---|');
  for (const b of broken) {
    md.push(`| ${b.id} | ${b.name} | ${b.house} | ${b.status || b.error} | ${b.url} |`);
  }
  fs.writeFileSync(REPORT_MD, md.join('\n'), 'utf8');
  fs.writeFileSync(REPORT_JSON, JSON.stringify(broken, null, 2), 'utf8');
  console.log(`\nDone. ${okCount}/${results.length} OK, ${broken.length} broken.`);
  console.log(`Report: ${REPORT_MD}`);
  console.log(`Broken list: ${REPORT_JSON}`);
}

main().catch(e => { console.error(e); process.exit(1); });
