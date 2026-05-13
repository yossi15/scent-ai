#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, '../src/data/fragrances.json');

const NOTES = {
  'Amber Vanilla': [{n:'Pink Pepper',t:'top'},{n:'Bergamot',t:'top'},{n:'Vanilla',t:'heart'},{n:'Amber',t:'heart'},{n:'Sandalwood',t:'base'},{n:'Musk',t:'base'}],
  'Woody':         [{n:'Bergamot',t:'top'},{n:'Cardamom',t:'top'},{n:'Sandalwood',t:'heart'},{n:'Cedarwood',t:'heart'},{n:'Vetiver',t:'base'},{n:'Musk',t:'base'}],
  'Floral':        [{n:'Rose',t:'top'},{n:'Peony',t:'top'},{n:'Jasmine',t:'heart'},{n:'Magnolia',t:'heart'},{n:'Musk',t:'base'},{n:'Cedarwood',t:'base'}],
  'Amber Spicy':   [{n:'Ginger',t:'top'},{n:'Cinnamon',t:'top'},{n:'Amber',t:'heart'},{n:'Patchouli',t:'heart'},{n:'Vetiver',t:'base'},{n:'Musk',t:'base'}],
  'Amber Woody':   [{n:'Bergamot',t:'top'},{n:'Cardamom',t:'top'},{n:'Amber',t:'heart'},{n:'Vetiver',t:'heart'},{n:'Sandalwood',t:'base'},{n:'Musk',t:'base'}],
  'Floral Fruity': [{n:'Bergamot',t:'top'},{n:'Pear',t:'top'},{n:'Rose',t:'heart'},{n:'Peach',t:'heart'},{n:'Musk',t:'base'},{n:'Amber',t:'base'}],
  'Citrus Aromatic': [{n:'Bergamot',t:'top'},{n:'Lemon',t:'top'},{n:'Lavender',t:'heart'},{n:'Aromatic Notes',t:'heart'},{n:'Amber',t:'base'},{n:'Musk',t:'base'}],
};
const getNotes = f => (NOTES[f] || [{n:'Bergamot',t:'top'},{n:'Amber',t:'heart'},{n:'Musk',t:'base'}]).map(x => ({ name: x.n, type: x.t }));

const RAW = [
  // ── XERJOFF (niche additions) ─────────────────────────────────────────────
  ['Naxos','Xerjoff',2015,'U','Amber Vanilla',41001,1600,9,8],
  ['Erba Pura','Xerjoff',2014,'U','Floral Fruity',36015,1500,9,8],
  ['Alexandria II','Xerjoff',2010,'U','Amber Vanilla',9300,1700,9,8],
  ['Coro','Xerjoff',2015,'U','Amber Spicy',43004,1600,9,8],
  ['Casamorati Mefisto','Xerjoff',2012,'M','Citrus Aromatic',23003,1500,8,7],
  ['Casamorati Lira','Xerjoff',2012,'F','Amber Vanilla',23004,1500,9,8],
  ['Casamorati Bouquet Ideale','Xerjoff',2012,'F','Floral',23005,1500,8,7],
  ['Casamorati Dama Bianca','Xerjoff',2012,'F','Floral',23006,1500,8,7],
  ['Casamorati Italica','Xerjoff',2012,'U','Floral Fruity',23007,1500,8,7],
  ['Casamorati Regio','Xerjoff',2012,'M','Woody',23008,1500,8,7],
  ['Casamorati Fiero','Xerjoff',2012,'M','Amber Spicy',23009,1500,8,8],

  // ── PARFUMS DE MARLY (niche additions) ────────────────────────────────────
  ['Layton','Parfums de Marly',2016,'M','Amber Vanilla',49008,1500,9,8],
  ['Pegasus','Parfums de Marly',2011,'M','Amber Vanilla',10006,1500,9,8],
  ['Herod','Parfums de Marly',2012,'M','Amber Spicy',23010,1500,9,8],
  ['Carlisle','Parfums de Marly',2014,'U','Amber Spicy',36016,1500,9,8],
  ['Delina','Parfums de Marly',2017,'F','Floral',57018,1500,8,8],
  ['Delina Exclusif','Parfums de Marly',2018,'F','Floral',64023,1700,9,8],
  ['Galloway','Parfums de Marly',2011,'M','Citrus Aromatic',10007,1400,8,7],
  ['Akaster','Parfums de Marly',2014,'M','Woody',36017,1500,8,7],
  ['Cassili','Parfums de Marly',2017,'F','Floral Fruity',57019,1500,8,7],
  ['Pegasus Exclusif','Parfums de Marly',2018,'M','Amber Vanilla',64024,1700,9,8],
];

const genderFull = g => g === 'M' ? 'Masculine' : g === 'F' ? 'Feminine' : 'Unisex';

const additions = RAW.map(([name, house, year, gender, family, id, price, longevity, sillage]) => ({
  name, house, year,
  gender: genderFull(gender),
  family,
  concentration: 'EDP',
  price, longevity, sillage,
  fragrantica_id: id,
  image: `https://fimgs.net/mdimg/perfume/375x500.${id}.jpg`,
  notes: getNotes(family),
}));

const existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const existingKeys = new Set(existing.map(f => `${f.name}|${f.house}`));
const newEntries = additions.filter(f => !existingKeys.has(`${f.name}|${f.house}`));
const merged = [...existing, ...newEntries];

fs.writeFileSync(DATA_FILE, JSON.stringify(merged, null, 2), 'utf8');
console.log(`Added ${newEntries.length} new fragrances. Total: ${merged.length}`);
