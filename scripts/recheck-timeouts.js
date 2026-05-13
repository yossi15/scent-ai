#!/usr/bin/env node
/**
 * Re-checks broken images one at a time with a long timeout, in case the
 * earlier batch hit rate limits.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const BROKEN = JSON.parse(fs.readFileSync(path.join(__dirname, 'audit-broken.json'), 'utf8'));
const TIMEOUT_MS = 20000;

function checkUrl(url) {
  return new Promise(resolve => {
    const req = https.request(url, { method: 'HEAD', timeout: TIMEOUT_MS }, res => {
      resolve({
        status: res.statusCode,
        contentType: res.headers['content-type'] || '',
        contentLength: parseInt(res.headers['content-length'] || '0', 10),
      });
    });
    req.on('error', err => resolve({ status: 0, error: err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, error: 'timeout' }); });
    req.end();
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const stillBroken = [];
  console.log(`Rechecking ${BROKEN.length} entries one-by-one (1s delay)...`);
  for (let i = 0; i < BROKEN.length; i++) {
    const b = BROKEN[i];
    await sleep(800);
    const r = await checkUrl(b.url);
    const ok = r.status === 200 && (r.contentType || '').startsWith('image/') && r.contentLength > 1000;
    if (ok) {
      console.log(`  [${i+1}/${BROKEN.length}] OK now: ${b.name} (${b.house})`);
    } else {
      console.log(`  [${i+1}/${BROKEN.length}] STILL BROKEN: ${b.name} (${b.house}) — ${r.status || r.error}`);
      stillBroken.push(b);
    }
  }
  fs.writeFileSync(path.join(__dirname, 'audit-broken.json'), JSON.stringify(stillBroken, null, 2), 'utf8');
  console.log(`\nFinal: ${stillBroken.length} truly broken out of ${BROKEN.length} suspects.`);
})();
