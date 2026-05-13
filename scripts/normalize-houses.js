#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, '../src/data/fragrances.json');

const HOUSE_MAP = {
  'Hermes': 'Hermès',
  'Mont Blanc': 'Montblanc',
  'YSL': 'Yves Saint Laurent',
  'Initio': 'Initio Parfums Privés',
};

const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
let changed = 0;
for (const f of data) {
  if (HOUSE_MAP[f.house]) {
    f.house = HOUSE_MAP[f.house];
    changed++;
  }
}
fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
console.log(`Normalized ${changed} entries. Total: ${data.length}, Houses: ${new Set(data.map(x=>x.house)).size}`);
