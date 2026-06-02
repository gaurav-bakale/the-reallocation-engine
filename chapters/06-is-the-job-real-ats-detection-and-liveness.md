# Chapter 6 — Is the Job Real: ATS Detection and Liveness

<!-- voice-anchored: root style/VOICE.md. Anatomy: TIKTOC Part 10.
     Sourced from SCRIPTS/ats/README.md, ghost-job essays, SDD, CHAPTER-RESEARCH-MAP.
     Draft. Never published. -->

**What you'll be able to do:** Detect which applicant-tracking system a company uses, and classify whether a given posting is live or a ghost — with the signals that justify the call.

## Learning outcomes

- **(Analyze)** Detect the ATS (Greenhouse, Lever, Ashby) a company uses.
- **(Analyze)** Classify a posting's liveness from posting age and portal signals, and defend the classification.

## Opening case — two postings, one ghost

Two roles, same title, same week you find them. The first was posted six weeks ago, has never been updated, at a company with no recent funding and a careers page full of identically aged listings. The second went up last week at a firm that just closed a Series B and whose other roles show recent edits and changing counts.

One of these is almost certainly a ghost — a posting the company has no active intention of filling. It might be collecting résumés for a future pipeline, signaling growth to investors, or left up out of bureaucratic inertia. Across five years, the share of postings that are ghosts has held remarkably steady, somewhere around 28–38% depending on the source — and in some reports up to 42%.[^ghostrate] One survey had **81% of recruiters admitting** to posting jobs they weren't actively filling.[^recruiters] For a candidate on a ninety-day clock, applying to a ghost is not a small waste. It is a day of the most finite resource you have, spent on a door that was never going to open.

## What you need first

From Chapter 5, a tier telling you a company *can* sponsor. From Chapter 3, the contract: liveness is a classification from observable signals, not a feeling that a posting "looks active." You'll need the ATS subsystem's runtime (Node, and Playwright/Chromium for browser checks; see `SCRIPTS/ats/requirements.txt`).

## The dataset/subsystem this chapter rests on

There is no single public "ghost job" dataset — the signal has to be *extracted*, posting by posting. That extraction lives in `SCRIPTS/ats/`:

- **`detect_ats.py`** — identifies which applicant-tracking system (ATS) hosts a company's jobs: Greenhouse, Lever, Ashby, and others. This matters because each ATS exposes postings differently, and knowing the system tells you how to read it.
- **`scan.mjs`** — a zero-token provider scan that pulls a company's current postings without calling any paid model.
- **`check-liveness.mjs`** and **`liveness-core.mjs`** / **`liveness-browser.mjs`** — Playwright-driven liveness checks that load the posting like a browser would and read its signals.
- **`analyze_patterns.py`** — audits tracker, scan, and pipeline data for patterns (e.g., a company whose postings never change).

The key idea borrowed from the ghost-job essays: **a ghost job is spam.** It exhibits the same behavioral fingerprints email spam does — temporal anomalies (a posting that never ages or updates), interaction voids (a portal that never advances anyone), and textual homogeneity (templated descriptions reused across many listings). Detecting it is the same move your email provider makes a billion times a day: score the behavior, not the surface.[^spam]

## Core content — from ATS to a liveness call

The pipeline runs in two stages.

**Stage one — detect the ATS.** `detect_ats.py` inspects how a company serves its jobs and returns the system: Greenhouse, Lever, Ashby. Each has a known structure, so detection turns an opaque careers page into a readable feed. The production scrapers for Greenhouse and Lever then pull the actual postings.

**Stage two — classify liveness.** With the postings in hand, `check-liveness.mjs` loads each like a browser and reads the signals that separate a live role from a ghost: How old is the posting, and has it been updated? Do the company's other postings change over time, or are they all frozen at the same age? Is the description templated and reused, or specific? Does the funding and hiring context (Chapters 4–5) make a real opening plausible? No single signal is decisive — a recent posting can still be a ghost — but together they yield a defensible classification, the same way no single word makes an email spam but the pattern does.

## A runnable command

From the project root, scan a company and check liveness end to end:

```bash
# Detect which ATS a company uses
python SCRIPTS/ats/detect_ats.py --company "Example Bio"

# Pull current postings (zero-token provider scan)
npm run ats:scan

# Classify liveness of the pulled postings (Playwright)
npm run ats:liveness
```

The inspectable output is a per-posting record with an ATS label and a liveness classification, plus the signals behind it. You read the *signals*, not just the label — a "ghost" call you can't justify from posting age, update history, and templating is a call you shouldn't trust.

## Worked example — one company, end to end

**Situation.** A Proven-tier biotech (from Chapter 5) with two open data roles.

**The commands run, the output inspected.** `detect_ats.py` returns Greenhouse. `ats:scan` pulls both postings. `ats:liveness` reports: posting A went up nine days ago, description specific to a named project, the company's other roles show recent count changes → **live**. Posting B has been up eleven weeks, description identical to three other listings, no portal movement → **flagged stale/ghost**.

**The decision.** Apply to A (it survives sponsorship *and* liveness); skip B despite the same employer and title.

**The lesson (one sentence):** A real company can host a fake posting — liveness is a property of the listing, not the firm.

**The limit (where this fails):** Liveness signals are probabilistic. A genuinely open role can sit untouched for weeks at a slow company; a ghost can be freshly posted to look active. The classification reduces your odds of wasting a day, but it cannot read the hiring manager's intent. It is a filter, not a verdict.

## Mid-chapter checkpoint

Watch this inversion: candidates often treat a *recent* posting as automatically real and an *old* one as automatically dead. Both are wrong on their own. Recency is one signal among several; a week-old templated posting at a company with frozen listings is more ghost than a three-week-old specific posting at a firm that just raised money. Read the pattern, not the single date.

## Decision rule — live, ghost, or investigate

- **Live** (apply, if tier and fit hold): recent or recently updated, specific description, company shows hiring activity, funding context plausible.
- **Ghost** (skip): old and unchanged, templated description shared across listings, no portal movement, no funding context.
- **Investigate** (one cheap check before deciding): mixed signals — e.g., recent but templated. A single direct query (a quick email, a check of the company's other channels) resolves it faster than a blind application.

## What the machine could not know

The signals can tell you a posting behaves like a ghost. They cannot know that this particular "stale" listing is real because the company has been slow-walking it while securing headcount approval, and will fill it next week from the pile it's quietly collecting. They cannot know a fresh, specific posting is a decoy written by a recruiter chasing a quota. Behavioral detection catches the pattern; the exception lives in intent the pattern can't see. When the signals conflict and the role matters, a human check beats a confident guess.

## Exercises

1. **(Apply) Scan one company.** Detect the ATS for a target and pull its postings. Record which ATS and how many open roles.
2. **(Analyze) Classify three.** Take three postings and classify each live / ghost / investigate, writing the specific signals (age, update history, templating, context) behind each call.
3. **(Analyze) Find a ghost at a good company.** Identify one stale or templated posting at a Proven- or Likely-tier firm — proof that a strong company is not a guarantee of a real role.

## AI use / verified-data disclosure

ATS labels and postings come from `SCRIPTS/ats/` reading companies' real careers portals; liveness classifications come from observable signals (posting age, update history, templating, portal movement). The ghost-job rates (~28–42%) and the 81%-of-recruiters figure are from the project's ghost-job essays and are marked `[verify]` pending primary-source tracing. The "ghost job is spam" framing is an analogy from those essays, used to structure the detection logic, not a dataset.

## Chapter summary — capabilities gained

You can detect a company's ATS, pull its real postings, and classify each posting's liveness from defensible signals — separating a real opening from a ghost even at a strong employer. Three facts now exist about a role: it sponsors, it's real. The third question is whether it's any good.

## Key terms

- **ATS (applicant-tracking system):** the software a company uses to host and process applications (Greenhouse, Lever, Ashby); detecting it makes a careers page readable.
- **Ghost job:** a posting the company has no active intent to fill; behaves like spam — stale, templated, inert.
- **Liveness:** a per-posting classification (live / ghost / investigate) from observable signals, not from the company's reputation.
- **Zero-token scan:** pulling postings via the provider directly, without spending paid-model calls.

## Bridge question

The role is real and the company can sponsor. But a real, sponsoring role can still be a bad job in a shrinking occupation. Is the role actually *worth* having?

## Run-log prompt

Record the ATS detected per company, the liveness call for each posting with its signals, and any "investigate" you resolved and how.

[^ghostrate]: Ghost-job prevalence (~28–38% steady over five years, up to 42% in some reports; city-level figures e.g. LA 30.5%, Seattle 16.6%) from "What Is a Ghost Job?" (uploaded essay, N. Bear Brown). **[verify]** against the underlying labor-market reports.

[^recruiters]: "81% of recruiters admit to posting ghost jobs"; "39.3% of seekers name fake/ghost jobs their biggest challenge" — "Can AI Help Detect Ghost Jobs?" (uploaded essay). **[verify]**

[^spam]: The "ghost-job-as-spam" framework (temporal anomalies, interaction voids, textual homogeneity; Hiring Likelihood Score 0–100) is developed in "Can AI Help Detect Ghost Jobs by Adapting Spam Detection?" (uploaded essay). Used as the structuring analogy for liveness detection.
