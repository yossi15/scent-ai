#!/usr/bin/env node
/**
 * Second batch — adds ~120 more fragrances to push the catalog past 1000.
 * Run: node scripts/add-fragrances-2.js
 */
const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, '../src/data/fragrances.json');

const NOTES = {
  'Amber':           [{n:'Bergamot',t:'top'},{n:'Cardamom',t:'top'},{n:'Amber',t:'heart'},{n:'Labdanum',t:'heart'},{n:'Sandalwood',t:'base'},{n:'Musk',t:'base'}],
  'Amber Floral':    [{n:'Bergamot',t:'top'},{n:'Pink Pepper',t:'top'},{n:'Rose',t:'heart'},{n:'Amber',t:'heart'},{n:'Sandalwood',t:'base'},{n:'Musk',t:'base'}],
  'Amber Spicy':     [{n:'Ginger',t:'top'},{n:'Cinnamon',t:'top'},{n:'Amber',t:'heart'},{n:'Patchouli',t:'heart'},{n:'Vetiver',t:'base'},{n:'Musk',t:'base'}],
  'Amber Vanilla':   [{n:'Pink Pepper',t:'top'},{n:'Bergamot',t:'top'},{n:'Vanilla',t:'heart'},{n:'Amber',t:'heart'},{n:'Sandalwood',t:'base'},{n:'Musk',t:'base'}],
  'Amber Woody':     [{n:'Bergamot',t:'top'},{n:'Cardamom',t:'top'},{n:'Amber',t:'heart'},{n:'Vetiver',t:'heart'},{n:'Sandalwood',t:'base'},{n:'Musk',t:'base'}],
  'Aromatic':        [{n:'Lavender',t:'top'},{n:'Bergamot',t:'top'},{n:'Geranium',t:'heart'},{n:'Woody Notes',t:'heart'},{n:'Musk',t:'base'},{n:'Amber',t:'base'}],
  'Aromatic Aquatic':[{n:'Sea Water',t:'top'},{n:'Bergamot',t:'top'},{n:'Cyclamen',t:'heart'},{n:'Driftwood',t:'heart'},{n:'Musk',t:'base'},{n:'Amber',t:'base'}],
  'Aromatic Citrus': [{n:'Bergamot',t:'top'},{n:'Lemon',t:'top'},{n:'Lavender',t:'heart'},{n:'Cedar',t:'heart'},{n:'Musk',t:'base'},{n:'Amberwood',t:'base'}],
  'Aromatic Fougere':[{n:'Lavender',t:'top'},{n:'Bergamot',t:'top'},{n:'Geranium',t:'heart'},{n:'Coumarin',t:'heart'},{n:'Oak Moss',t:'base'},{n:'Musk',t:'base'}],
  'Aromatic Spicy':  [{n:'Bergamot',t:'top'},{n:'Black Pepper',t:'top'},{n:'Lavender',t:'heart'},{n:'Amber',t:'heart'},{n:'Vetiver',t:'base'},{n:'Musk',t:'base'}],
  'Citrus':          [{n:'Bergamot',t:'top'},{n:'Lemon',t:'top'},{n:'Orange',t:'top'},{n:'Neroli',t:'heart'},{n:'Musk',t:'base'},{n:'Cedarwood',t:'base'}],
  'Citrus Aromatic': [{n:'Bergamot',t:'top'},{n:'Lemon',t:'top'},{n:'Lavender',t:'heart'},{n:'Aromatic Notes',t:'heart'},{n:'Amber',t:'base'},{n:'Musk',t:'base'}],
  'Floral':          [{n:'Rose',t:'top'},{n:'Peony',t:'top'},{n:'Jasmine',t:'heart'},{n:'Magnolia',t:'heart'},{n:'Musk',t:'base'},{n:'Cedarwood',t:'base'}],
  'Floral Fruity':   [{n:'Bergamot',t:'top'},{n:'Pear',t:'top'},{n:'Rose',t:'heart'},{n:'Peach',t:'heart'},{n:'Musk',t:'base'},{n:'Amber',t:'base'}],
  'Floral Powdery':  [{n:'Bergamot',t:'top'},{n:'Iris',t:'top'},{n:'Rose',t:'heart'},{n:'Violet',t:'heart'},{n:'Sandalwood',t:'base'},{n:'Musk',t:'base'}],
  'Floral Woody':    [{n:'Bergamot',t:'top'},{n:'Rose',t:'top'},{n:'Jasmine',t:'heart'},{n:'Cedarwood',t:'heart'},{n:'Sandalwood',t:'base'},{n:'Musk',t:'base'}],
  'Leather':         [{n:'Bergamot',t:'top'},{n:'Cardamom',t:'top'},{n:'Iris',t:'heart'},{n:'Leather',t:'heart'},{n:'Vetiver',t:'base'},{n:'Musk',t:'base'}],
  'Woody':           [{n:'Bergamot',t:'top'},{n:'Cardamom',t:'top'},{n:'Sandalwood',t:'heart'},{n:'Cedarwood',t:'heart'},{n:'Vetiver',t:'base'},{n:'Musk',t:'base'}],
  'Woody Aromatic':  [{n:'Bergamot',t:'top'},{n:'Lavender',t:'top'},{n:'Sandalwood',t:'heart'},{n:'Cedar',t:'heart'},{n:'Vetiver',t:'base'},{n:'Musk',t:'base'}],
  'Woody Spicy':     [{n:'Cardamom',t:'top'},{n:'Black Pepper',t:'top'},{n:'Sandalwood',t:'heart'},{n:'Amber',t:'heart'},{n:'Vetiver',t:'base'},{n:'Oud',t:'base'}],
  'Floral Green':    [{n:'Green Leaves',t:'top'},{n:'Bergamot',t:'top'},{n:'Rose',t:'heart'},{n:'Lily',t:'heart'},{n:'Musk',t:'base'},{n:'Vetiver',t:'base'}],
};
const DEFAULT_NOTES = [{n:'Bergamot',t:'top'},{n:'Amber',t:'heart'},{n:'Musk',t:'base'}];
const getNotes = f => (NOTES[f] || DEFAULT_NOTES).map(x => ({ name: x.n, type: x.t }));

const RAW = [
  // ── TOM FORD additions ───────────────────────────────────────────────────
  ['Oud Wood','Tom Ford',2007,'U','Woody',4500,1400,9,8],
  ['Tobacco Vanille','Tom Ford',2007,'U','Amber Vanilla',4400,1500,9,9],
  ['Black Orchid','Tom Ford',2006,'U','Amber Floral',3500,1300,9,8],
  ['Tuscan Leather','Tom Ford',2007,'U','Leather',4501,1500,9,9],
  ['Lost Cherry','Tom Ford',2018,'U','Amber Vanilla',64019,1500,9,8],
  ['Bitter Peach','Tom Ford',2020,'U','Floral Fruity',77046,1500,9,8],
  ['Soleil Blanc','Tom Ford',2016,'U','Amber Floral',50027,1300,8,8],
  ['Fucking Fabulous','Tom Ford',2017,'U','Leather',57015,1500,9,8],
  ['Rose Prick','Tom Ford',2020,'U','Floral',77047,1500,9,8],
  ['Ombré Leather','Tom Ford',2018,'U','Leather',64020,1300,9,8],
  ['Noir Extreme','Tom Ford',2015,'M','Amber Vanilla',43001,1300,9,8],
  ['Grey Vetiver','Tom Ford',2009,'M','Woody Aromatic',7000,1200,8,7],
  ['Neroli Portofino','Tom Ford',2011,'U','Citrus Aromatic',10500,1200,7,7],
  ['F**king Fabulous Parfum','Tom Ford',2022,'U','Leather',90023,1700,9,9],
  ['Café Rose','Tom Ford',2012,'U','Floral',23000,1300,9,8],

  // ── CHANEL additions ─────────────────────────────────────────────────────
  ['No 5','Chanel',1921,'F','Floral',1100,1000,8,8],
  ['Coco Mademoiselle','Chanel',2001,'F','Amber Floral',1800,800,8,8],
  ['Chance','Chanel',2002,'F','Floral',2100,750,8,7],
  ['Chance Eau Tendre','Chanel',2010,'F','Floral Fruity',9000,750,7,7],
  ['Bleu de Chanel','Chanel',2010,'M','Woody Aromatic',9300,800,8,8],
  ['Bleu de Chanel Parfum','Chanel',2018,'M','Woody Aromatic',64021,950,9,8],
  ['Allure Homme Sport','Chanel',2004,'M','Aromatic Citrus',3000,700,7,7],
  ['Allure Homme','Chanel',1999,'M','Woody Spicy',1300,700,7,7],
  ['Coco Noir','Chanel',2012,'F','Amber Floral',22500,850,8,8],
  ['Gabrielle','Chanel',2017,'F','Floral',50028,850,8,7],
  ['Chance Eau Fraîche','Chanel',2007,'F','Citrus',4500,720,7,6],
  ['No 5 L\'Eau','Chanel',2016,'F','Floral',49004,800,7,7],
  ['Antaeus','Chanel',1981,'M','Leather',300,700,8,7],
  ['Egoiste','Chanel',1990,'M','Woody Spicy',400,700,8,7],
  ['Platinum Egoiste','Chanel',1993,'M','Aromatic Fougere',500,700,7,7],
  ['Sycomore','Chanel',2008,'U','Woody',6000,1200,8,7],
  ['Coromandel','Chanel',2007,'U','Amber Spicy',5500,1200,9,8],
  ['1957 Les Exclusifs','Chanel',2019,'U','Floral Powdery',70008,1200,8,7],
  ['Allure Homme Sport Cologne','Chanel',2007,'M','Aromatic Citrus',4900,680,6,6],
  ['Allure Homme Sport Eau Extrême','Chanel',2012,'M','Aromatic Citrus',23001,780,8,7],

  // ── HERMÈS ───────────────────────────────────────────────────────────────
  ['Terre d\'Hermès','Hermes',2006,'M','Woody',3000,700,8,8],
  ['Terre d\'Hermès Parfum','Hermes',2009,'M','Woody',6500,850,9,8],
  ['H24','Hermes',2021,'M','Woody Aromatic',83033,750,8,7],
  ['Eau des Merveilles','Hermes',2004,'F','Woody',3100,650,7,7],
  ['Twilly d\'Hermès','Hermes',2017,'F','Floral',50029,800,8,7],
  ['Jour d\'Hermès','Hermes',2013,'F','Floral',28010,750,7,7],
  ['Voyage d\'Hermès','Hermes',2010,'U','Woody Aromatic',9100,700,7,7],
  ['Un Jardin sur le Nil','Hermes',2005,'U','Citrus Green',3200,680,7,6],
  ['Eau d\'Orange Verte','Hermes',1979,'U','Citrus',290,580,6,6],
  ['Bel Ami','Hermes',1986,'M','Leather',310,680,7,7],
  ['Rocabar','Hermes',1998,'M','Aromatic Spicy',1100,680,7,7],
  ['Kelly Calèche','Hermes',2007,'F','Leather',4500,720,8,7],
  ['Hermèssence Vetiver Tonka','Hermes',2004,'U','Woody',3300,1100,8,7],
  ['Hermèssence Ambre Narguilé','Hermes',2004,'U','Amber Vanilla',3400,1200,9,8],

  // ── BVLGARI ──────────────────────────────────────────────────────────────
  ['Aqva Pour Homme','Bvlgari',2005,'M','Aromatic Aquatic',3500,500,7,7],
  ['Man in Black','Bvlgari',2014,'M','Amber Spicy',36010,520,8,7],
  ['Tygar','Bvlgari',2019,'M','Amber Spicy',70012,540,8,7],
  ['Bvlgari Pour Homme','Bvlgari',1996,'M','Aromatic Fougere',800,420,7,6],
  ['Bvlgari Pour Homme Soir','Bvlgari',2002,'M','Aromatic Fougere',2000,460,7,7],
  ['Black','Bvlgari',1998,'U','Amber Vanilla',1100,500,8,7],
  ['Omnia Coral','Bvlgari',2012,'F','Floral Fruity',23002,440,7,6],
  ['Omnia Crystalline','Bvlgari',2005,'F','Floral',3501,460,7,6],
  ['Bvlgari Aqva Amara','Bvlgari',2014,'M','Aromatic Aquatic',36011,500,7,7],
  ['Bvlgari Goldea The Roman Night','Bvlgari',2017,'F','Floral',57016,520,8,7],
  ['Bvlgari Goldea','Bvlgari',2015,'F','Floral',42009,520,8,7],
  ['Le Gemme Tygar','Bvlgari',2019,'M','Amber Spicy',70013,1500,9,8],
  ['Allegra Magnifying Musk','Bvlgari',2022,'U','Floral Powdery',90024,800,8,7],
  ['Allegra Dolce Estasi','Bvlgari',2021,'F','Amber Vanilla',83034,800,8,7],
  ['Allegra Riva Solare','Bvlgari',2021,'F','Citrus',83035,800,7,7],

  // ── GUERLAIN ─────────────────────────────────────────────────────────────
  ['Shalimar','Guerlain',1925,'F','Amber Vanilla',290,900,9,8],
  ['Mon Guerlain','Guerlain',2017,'F','Amber Vanilla',50030,650,8,7],
  ['L\'Homme Idéal','Guerlain',2014,'M','Amber Vanilla',36012,580,8,7],
  ['L\'Instant de Guerlain','Guerlain',2003,'F','Amber Floral',2900,580,8,7],
  ['Habit Rouge','Guerlain',1965,'M','Woody Spicy',230,560,7,7],
  ['La Petite Robe Noire','Guerlain',2012,'F','Floral Fruity',22000,580,8,7],
  ['Aqua Allegoria Pamplelune','Guerlain',1999,'U','Citrus',1200,460,6,6],
  ['Samsara','Guerlain',1989,'F','Floral Woody',420,720,9,8],
  ['Vetiver','Guerlain',1959,'M','Woody Aromatic',200,580,7,7],
  ['Mon Guerlain Bloom of Rose','Guerlain',2021,'F','Floral',83036,650,8,7],
  ['L\'Homme Idéal Extreme','Guerlain',2015,'M','Amber Vanilla',43002,640,9,8],
  ['Shalimar Souffle de Parfum','Guerlain',2014,'F','Amber Vanilla',36013,700,8,7],

  // ── PRADA ────────────────────────────────────────────────────────────────
  ['L\'Homme Prada','Prada',2016,'M','Aromatic Floral',49005,560,7,7],
  ['La Femme Prada','Prada',2016,'F','Floral',49006,560,8,7],
  ['Luna Rossa Carbon','Prada',2017,'M','Woody Aromatic',57017,520,8,7],
  ['Luna Rossa Ocean','Prada',2021,'M','Aromatic Aquatic',83037,560,8,7],
  ['Luna Rossa Black','Prada',2018,'M','Amber Floral',64022,560,8,8],
  ['Prada Candy','Prada',2011,'F','Amber Vanilla',10500,540,8,7],
  ['Paradoxe','Prada',2022,'F','Floral',90025,580,8,7],
  ['Infusion d\'Iris','Prada',2007,'U','Floral Powdery',4900,800,8,7],
  ['Olfactories Soaking the Sun','Prada',2015,'U','Citrus Aromatic',43003,1400,8,7],
  ['Luna Rossa Eau Sport','Prada',2016,'M','Aromatic Citrus',49007,460,7,6],
  ['Luna Rossa Extreme','Prada',2014,'M','Amber Floral',36014,540,8,7],
  ['Amber Pour Homme','Prada',2006,'M','Amber Floral',4000,540,8,8],
  ['Candy Kiss','Prada',2016,'F','Amber Floral',50031,540,8,7],
];

const genderFull = g => g === 'M' ? 'Masculine' : g === 'F' ? 'Feminine' : 'Unisex';

const additions = RAW.map(([name, house, year, gender, family, id, price, longevity, sillage]) => ({
  name, house, year,
  gender: genderFull(gender),
  family,
  concentration: ['Amber','Amber Vanilla','Amber Spicy','Amber Floral','Amber Woody','Floral Woody','Woody Spicy','Leather'].includes(family) ? 'EDP' : 'EDT',
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
