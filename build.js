const fs = require('fs');
const topojson = require('topojson-client');
const d3 = require('d3-geo');
const raw = require('./scores.js');

const world = JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-110m.json', 'utf8'));
const countries = topojson.feature(world, world.objects.countries);

// clean scores: integer keys, non-null
const scores = {};
for (const [k, v] of Object.entries(raw)) {
  if (!v) continue;
  if (!/^\d+$/.test(k)) continue;
  scores[String(Number(k))] = v;
}

const feats = countries.features.filter(f => f.id !== '010' && f.id !== '260');

const W = 1120, H = 560;
const proj = d3.geoEqualEarth().fitExtent([[6, 10], [W - 6, H - 10]], { type: 'FeatureCollection', features: feats });
const path = d3.geoPath(proj);

const geo = [];
let matched = 0, unmatched = [];
for (const f of feats) {
  const d = path(f);
  if (!d) continue;
  const id = String(Number(f.id));
  if (scores[id]) matched++; else unmatched.push(f.properties.name);
  geo.push({ id, n: f.properties.name, d: d.replace(/(\.\d\d)\d+/g, '$1') });
}

const markers = [
  { n: 'South Island, NZ',        ll: [170.5, -44.5], t: 'The consensus pick, and it survives scrutiny. Hydro, food surplus, 1,100 km of ocean in every direction.' },
  { n: 'Tasmania',                ll: [146.8, -42.0], t: 'Hydro-dominant grid, food surplus, island quarantine, 550k people. Australia without the target profile.' },
  { n: 'Chilean Patagonia',       ll: [-72.5, -42.5], t: 'Desert to the north, Andes to the east, ocean to the west. Fjords, fish, hydro, and almost nobody.' },
  { n: 'Uruguayan interior',      ll: [-56.0, -32.8], t: 'Grassland that feeds several times the national population, on a wind-and-hydro grid nobody would bother attacking.' },
  { n: 'Interior Pacific NW',     ll: [-116.0, 47.3], t: 'US pick #1. Columbia Basin hydro, arable, 400 km from the coastal metros and their target list.' },
  { n: 'Upper Great Lakes',       ll: [-88.0, 46.4], t: 'US pick #2. A fifth of the world\'s fresh surface water, temperate, agricultural, and strategically invisible.' },
  { n: 'Central Norway',          ll: [9.5, 62.0],    t: 'The best-powered, best-governed square on the map — if the Russian border stays quiet.' },
  { n: 'Scottish Highlands',      ll: [-4.6, 57.4],   t: 'Hydro, fish, low density, mild. Attached to a nuclear-armed state with submarine bases on the same coast.' },
].map(m => { const p = proj(m.ll); return { ...m, x: +p[0].toFixed(1), y: +p[1].toFixed(1) }; });

const out = {
  W, H, geo, markers,
  scores: Object.fromEntries(Object.entries(scores).map(([k, v]) => [k, {
    n: v.n, iso: v.iso, food: v.food, energy: v.energy, gov: v.gov,
    target: v.target, dens: v.dens, clim: v.clim, south: v.south || 0, note: v.note || ''
  }])),
};

fs.writeFileSync('data.json', JSON.stringify(out));
console.log(`features: ${geo.length}  scored: ${matched}  unscored: ${unmatched.length}`);
console.log('largest unscored:', unmatched.slice(0, 25).join(', '));
console.log('bytes:', fs.statSync('data.json').size);
