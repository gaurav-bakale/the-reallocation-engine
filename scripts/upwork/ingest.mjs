#!/usr/bin/env node
// ingest.mjs — Upwork gig ingest + evidence derivation (gig-finder domain).
//
// Reads raw gig listings and emits one EVIDENCE RECORD per gig — the input the
// gig-scorer combines. It mirrors scripts/ats/scan.mjs (discovery/normalize) +
// the upstream-feed idea from Ch.11: this script DERIVES the component signals;
// scripts/score/gig-scorer.mjs only COMBINES them.
//
// Every derived term is labeled with its source type so the scorer's audit
// trail is honest (P3 — provenance or it isn't evidence):
//   record         — read straight off the gig (budget, proposals, open, deadline)
//   model-judgment — a heuristic / would-be-Claude assessment (ai-can-do-it fit)
//   your-input     — depends on you (time-fit: how fast you deliver)
//
// Usage:
//   node scripts/upwork/ingest.mjs --sample        # read data/upwork/gigs.sample.json
//   node scripts/upwork/ingest.mjs --in <raw.json> --out <evidence.json>
//   node scripts/upwork/ingest.mjs                 # default: data/upwork/gigs.json -> gigs.evidence.json
//
// Zero Claude API tokens — pure JSON. The live Upwork API pull is a TODO seam below.

import fs from 'node:fs';
import path from 'node:path';

const SRC = { record: 'record', model: 'model-judgment', input: 'your-input' };

// ── ai-can-do-it fit [model-judgment] ───────────────────────────────────────
// v0 heuristic by category + title keywords. The real version asks Claude to
// read the description and judge "can I finish this well with AI?" — that call
// is a labeled model-judgment, so it slots in here without changing the schema.
const CATEGORY_FIT = {
  web: 0.9, slides: 0.85, database: 0.9, 'data-ml': 0.8,
  mobile: 0.7, design: 0.6, writing: 0.55, other: 0.4,
};
const FIT_KEYWORDS = [
  [/landing|demo|frontend|react|next\.?js|tailwind|html|css/i, 0.9],
  [/reveal\.?js|slides?|presentation|deck|ppt/i, 0.85],
  [/schema|postgres|sql|database|erd|ddl/i, 0.9],
  [/scrap(e|ing)|automat|script|etl|data ?pipeline/i, 0.82],
];
function aiFit(gig) {
  let p = CATEGORY_FIT[gig.category] ?? CATEGORY_FIT.other;
  const hay = `${gig.title} ${gig.description || ''}`;
  for (const [re, boost] of FIT_KEYWORDS) if (re.test(hay)) p = Math.max(p, boost);
  return { p: round(p), source: SRC.model, note: `${gig.category} task (v0 heuristic; real version asks Claude)` };
}

// ── pay quality [record] ─────────────────────────────────────────────────────
function payQuality(gig) {
  const b = gig.budget || {};
  if (b.type === 'hourly') {
    const r = num(b.rate_usd) ?? 0;
    const p = r >= 40 ? 0.9 : r >= 25 ? 0.6 : 0.3;
    return { p, source: SRC.record, note: `hourly $${r}/h` };
  }
  const a = num(b.amount_usd) ?? 0;
  const p = a >= 400 ? 0.9 : a >= 250 ? 0.6 : a >= 150 ? 0.5 : a >= 80 ? 0.35 : 0.2;
  return { p, source: SRC.record, note: `fixed $${a}` };
}

// ── client trust [record] ────────────────────────────────────────────────────
function clientTrust(gig) {
  const c = gig.client || {};
  const spent = num(c.total_spent_usd) ?? 0;
  const rev = num(c.reviews) ?? 0;
  let p, why;
  if (!c.payment_verified) { p = 0.25; why = 'payment NOT verified'; }
  else if (spent >= 10000 && rev >= 4.5) { p = 0.9; why = `verified, $${spent} spent, ${rev}★`; }
  else if (spent >= 1000) { p = 0.7; why = `verified, $${spent} spent`; }
  else { p = 0.55; why = 'verified, thin history'; }
  return { p, source: SRC.record, note: why };
}

// ── liveness GATE [record] — still open AND not flooded ──────────────────────
function liveness(gig) {
  if (gig.open === false) return { factor: 0.02, source: SRC.record, note: 'posting closed' };
  const n = num(gig.proposals) ?? 0;
  const factor = n > 50 ? 0.4 : n > 20 ? 0.7 : 1.0;
  const tag = n > 50 ? 'flooded' : n > 20 ? 'busy' : 'open';
  return { factor, source: SRC.record, note: `${tag} (${n} proposals)` };
}

// ── time-fit GATE [your-input] — can you deliver in the window ───────────────
// v0: deadline_days only. TODO: weigh against per-category effort + your speed.
function timeFit(gig) {
  const d = num(gig.deadline_days);
  if (d == null) return { factor: 1.0, source: SRC.input, note: 'no deadline given' };
  const factor = d <= 0 ? 0.04 : d < 3 ? 0.5 : 1.0;
  const tag = d <= 0 ? 'impossible' : d < 3 ? 'tight' : 'comfortable';
  return { factor, source: SRC.input, note: `${tag} (${d}d)` };
}

const num = (x) => (typeof x === 'number' && isFinite(x) ? x : null);
const round = (x) => Number(x.toFixed(3));

function toEvidence(gig) {
  return {
    gig_id: gig.gig_id ?? null,
    title: gig.title ?? null,
    url: gig.url ?? null,
    ai_fit: aiFit(gig),
    pay: payQuality(gig),
    client_trust: clientTrust(gig),
    liveness: liveness(gig),
    time_fit: timeFit(gig),
  };
}

function main() {
  const args = process.argv.slice(2);
  const sample = args.includes('--sample');
  const ii = args.indexOf('--in');
  const oi = args.indexOf('--out');
  const inPath = ii >= 0 ? args[ii + 1] : sample ? 'data/upwork/gigs.sample.json' : 'data/upwork/gigs.json';
  const outPath = oi >= 0 ? args[oi + 1]
    : sample ? 'data/upwork/gigs.sample.evidence.json' : 'data/upwork/gigs.evidence.json';

  // TODO[live]: when --live is added, fetch from the Upwork API (OAuth 2.0),
  //   respecting ToS + rate limits, and write the raw listings to inPath first.
  if (!fs.existsSync(inPath)) {
    console.error(`Error: ${inPath} not found. Use --sample, or pull raw gigs first.`);
    process.exit(1);
  }

  let gigs = JSON.parse(fs.readFileSync(inPath, 'utf8'));
  if (!Array.isArray(gigs)) gigs = gigs.gigs || [];
  const evidence = gigs.map(toEvidence);

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(evidence, null, 2));
  console.log(`✓ ingested ${gigs.length} gig(s) → ${evidence.length} evidence record(s)`);
  console.log(`  ${path.relative(process.cwd(), inPath)}  →  ${path.relative(process.cwd(), outPath)}`);
  console.log(`  next: npm run gig:score ${path.relative(process.cwd(), outPath)}`);
}

main();
