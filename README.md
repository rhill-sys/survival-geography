# Survival Geography

An interactive world map scoring **186 states** on resilience to the four physical threats most likely to come from AI — and a rejection of the premise that geography is what saves you.

**→ [View the map](https://rhill-sys.github.io/survival-geography/)**

---

## The premise

"AI apocalypse" collapses several very different scenarios into one. They have different geographies, and one of them has no geography at all.

In the scenario most people mean — a capable, misaligned system that wants humans gone — location is irrelevant. Anything able to do that can route around terrain. Bunkers and islands are theater. That scenario is not on this map, because there is nothing to map.

The four that *are* on this map are the ones where geography changes the odds:

| Lens | What it models | Why it's here |
|---|---|---|
| **Infrastructure attack** | Grid, water treatment, hospital systems | Lowest bar of the four. Offense scales better than defense right now; patching is an organizational problem and organizations are slow. People die of cold, of dialysis they don't get, of insulin that warmed up. |
| **Engineered pathogen** | Mass-casualty bio | Highest expected fatalities. The only catastrophic category where the primary barrier was *knowledge* rather than industry — which is precisely the barrier that's eroding. A small group reaching state-level lethality is new in human history. |
| **Autonomous weapons** | Cheap drones, proxy conflict | Already killing people. Gets worse decoupled from a military and pointed at a crowd. |
| **Nuclear exchange** | The low-probability tail | Not AI launching anything. Humans compressing their own decision time because the other side did. Unbounded severity keeps it on the list. |

## Method

Every state carries a 0–10 rating on seven measures:

| Measure | Definition |
|---|---|
| `iso` | Isolation — how controllable the borders and approaches are |
| `food` | Calories produced against calories eaten, without imported inputs |
| `energy` | Domestic generation that survives a fuel cutoff (hydro, geothermal, nuclear) plus refining capacity |
| `gov` | State capacity and rule of law under stress |
| `target` | **Low** strategic value — 10 means nobody's target list includes you |
| `dens` | Dispersal (inverse population density) |
| `clim` | Survivability without industrial inputs — can you heat, grow, and get water |

Each lens weights those seven differently; the weights live in `LENSES` in `template.html`. The nuclear lens adds `+0.6` for the southern hemisphere, where both fallout and the agricultural effects of nuclear winter fall considerably lighter.

The composite index runs roughly 2.0–9.5 and the map's color domain is fixed to that range, so scores stay comparable when you switch lenses.

**The ratings are judgment calls.** They're grounded in real figures — food self-sufficiency ratios, renewable share of generation, refining capacity, population density, basing and alliance structure — but the scoring and especially the weighting are arguable. That's why the assessment panel exposes the per-measure breakdown: you can see what's driving any number instead of taking it on faith. Disagree with a weight, change it, rebuild.

## What the map says

- **New Zealand wins three of four lenses** and it isn't close. The hole is real: 100% of liquid fuel imported, and the country's only refinery closed in 2022. No diesel, no farm machinery, and the food surplus stops being a surplus a few months later.
- **Uruguay is the finding.** Second on the composite, first on infrastructure, and it gets there without being an island — large food surplus, ~95% renewable grid, stable, and of strategic interest to precisely nobody.
- **Competence doesn't rescue a bad position.** Singapore, the UAE, Japan and South Korea are among the best-run places on earth and rank near the bottom. Density plus import dependence plus a target profile is a combination no amount of state capacity fixes.
- **Endowment doesn't either.** Venezuela and Zimbabwe fail from the opposite direction — resources without institutions.
- **The lenses disagree usefully.** Canada is top-five against a pathogen and mid-pack against nuclear. Same country; what changes is proximity to the United States.

## The caveat that outranks the map

This scores geography, and geography is the *second* variable.

The best-documented predictor of who comes through a collapse is whether you're embedded in a community that cooperates under stress — a function of how long you've lived somewhere and who knows your name, not of hydroelectric capacity. Someone who relocates to a top-decile square as a stranger is very plausibly worse off than someone who stays put in a mid-tier square among twenty years of relationships.

Which makes the honest conclusion closer to: stay where people know you, and pick a place that can feed and power itself.

## Build

```bash
npm install
node build.js             # scores.js + world-atlas → data.json (Equal Earth SVG paths)
node build-standalone.js  # template.html + data.json → dist/index.html
```

`dist/index.html` is committed at the repo root as `index.html` for GitHub Pages. It is fully self-contained apart from Google Fonts — no build step, no external data, no framework.

| File | What it is |
|---|---|
| `scores.js` | The dataset. One entry per state, keyed by ISO 3166-1 numeric. Edit here to change a rating. |
| `build.js` | Projects `world-atlas` country geometry to Equal Earth and emits `data.json` |
| `build-standalone.js` | Splices data into the template and wraps it as a complete document |
| `template.html` | The page — markup, tokens, lens weights, and render logic |

## Sources

Ratings are informed by FAO food-balance data, IEA and Our World in Data generation mixes, World Bank density figures, and public reporting on basing, alliance structure and refining capacity. They are *informed by* those sources, not mechanically derived from them — no figure here should be cited as a measurement.

Geometry: [world-atlas](https://github.com/topojson/world-atlas) (Natural Earth, 110m).

## License

MIT for the code. The ratings and commentary are one person's analysis — take them as argument, not data.
