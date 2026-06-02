# The Reallocation Engine
## A Working Method for Targeting a Job Search With Verified Data

**Working title:** The Reallocation Engine — Spend Less Time Applying, More Time on What Actually Gets You Hired
**Series:** Irreducibly Human: What AI Can and Can't Do · Humanitarians AI
**Author:** Nik Bear Brown · ni.brown@neu.edu · Bear Brown & Company
**Publisher:** Bear Brown, LLC · 2026
**Document:** Full TOC Draft — compiled from the repository (book.md, README.md, projects/, modes/, SCRIPTS/)
**Version:** 1.0
**Status:** Pre-proposal — planning files (vision/architecture/chapters-spec/risks) were empty templates; this TOC is synthesized from the working system. Two blockers before proposal (see Risks 1 and 6).

> **Note on synthesis.** The four Tik TOC phase files in this directory were
> unfilled templates at compile time. This document was synthesized by reading
> the actual system — the introduction draft, the plain-language summary, the
> Boondoggle build score, the `modes/` recipes, and the `SCRIPTS/` subsystems.
> Content extracted from those sources is stated plainly. Content inferred to
> complete the architecture is marked `[INFERRED]`. Genuine gaps that need the
> author's decision are marked `[NEEDS HUMAN INPUT]`.

---

## Document structure

1. Book Concept and Thesis
2. Learner Profile
3. Book Type and Deployment Specification
4. Field Positioning
5. Three-Act Learning Arc
6. The System Map (what lives in this directory)
7. Prerequisite Map
8. Learning Outcomes by Chapter
9. Chapter-by-Chapter TOC
10. Chapter Anatomy Template
11. Case Study and Worked-Example Strategy
12. Hard Topics, Contested Claims, Aging Risk
13. Market Positioning
14. Feature List
15. Out of Scope
16. Adoption Risk Register and Open Questions

---

# PART 1 — BOOK CONCEPT AND THESIS

## Book concept summary

> This book teaches **a verified-data method for deciding where to spend a
> job search** — which applications are worth sending and which time should be
> reallocated to networking and portfolio work — to **international students on
> F-1 OPT who are losing a race against a visa clock**, by **building a personal
> tool in Claude Code that scores every role against public government data
> (SEC Form D, DOL LCA, USCIS H-1B, BLS/O\*NET) before a single prompt is
> written**, filling the gap left by job boards that show postings but hide
> the only facts that matter — who sponsors, whether the role is real, and
> whether the timeline fits the clock. It succeeds if the reader can **stand up
> the five-component engine, produce a defensible Apply / Consider / Skip
> decision for a real posting, and hold a skip rate above 50% with the time it
> frees redirected to the activities that actually produce offers.**

**One-sentence pitch (from the manuscript):**
The first sign of trouble is usually not failure. It is fluency. This book is
about the gap between a polished artifact and a trustworthy one — and the part
of the work that cannot be delegated.

## Central thesis

"This book argues that **the judgment layer of a job search — deciding whether
an application is worth sending — currently requires verified data and human
domain knowledge that no job board and no fluent LLM supplies**, which means
that a candidate who applies on brand recognition and gut feel is spending the
scarcest resource they have (time against a visa deadline) on the wrong
problem, and this matters because the cost of being wrong is not a bad grade —
it is running out of work authorization while solving the wrong problem with
the wrong strategy and no data."

The book carries two arguments at once, and the design depends on holding both:

- **The general argument** (the series argument): the boundary between
  *execution* and *judgment*. Execution is producing an artifact — a cover
  letter, a score, a ranked list. Judgment is the disciplined decision about
  whether that artifact should exist, whether it is right, what it leaves out,
  and who is responsible when it leaves the screen. AI makes execution cheap.
  The book is about the work that remains.
- **The specific argument** (the engine): reallocation. Fewer applications,
  better targeted, freeing the hours that actually produce hires — 3 hours of
  networking and 3 hours of portfolio against 2 hours of applying. A tool that
  makes *applying* faster without improving *targeting* has missed the point.

## Thesis test

The TOC reflects the thesis at every act:

- **ACT ONE** establishes the fluency trap and the reallocation principle
  before any tool is built. The reader feels the cost of the wrong strategy
  before they are handed a scoring formula. ✓
- **ACT TWO** builds each engine on *verified data first* — every component is
  introduced by the public dataset and the maintained script that grounds it,
  not by a prompt. The "use data before you prompt" rule is enforced in every
  chapter. ✓
- **ACT THREE** runs the system end-to-end and lands on the irreducibly human
  decisions: auditing whether the probability math makes sense, supplying the
  domain knowledge the machine cannot have, and owning the honest run. ✓

**Thesis test: PASS**

---

# PART 2 — LEARNER PROFILE

## Primary reader

A graduate international student on F-1 OPT or STEM OPT — most often a master's
student in a STEM field (engineering, data science, biotech, AI) at a U.S.
university — who is spending eight hours a day applying to the same five hundred
brand-name companies as everyone else, getting auto-rejected by software before
a human reads anything, and watching an OPT clock run down.

**Specific person:** A second-year MS student with roughly twelve months of OPT
remaining, comfortable in a terminal, able to run a Python script when told the
command, who has heard of Claude Code but has never built a system with it. They
do not know which companies sponsor, cannot tell a live posting from a ghost
job, and have no feedback loop telling them whether anything they do is working.
They are not failing for lack of talent. They are solving the wrong problem.

## Prior knowledge assumed

- Command-line comfort: can run `python3 script.py` and `npm run` when shown
- Basic file literacy: can read a CSV, a JSON file, a Markdown document
- Their own situation: visa status, OPT expiration, target roles, comp floor
- Enough statistics to read a probability and a weighted score without fear

## Prior knowledge NOT assumed

- Python authorship (the scripts are maintained; the reader runs and inspects)
- Immigration law (the book gives operational facts, not legal advice)
- Data engineering (the SEC/ATS/BLS pipelines are provided, not built from zero)
- Bayesian statistics formalism (the scorer is explained from intuition up)

## Prior misconceptions (what they think they know that is wrong)

1. "A famous company is a safe bet." — A brand-name employer with a 0%
   historical sponsorship rate is worth exactly zero to this reader, no matter
   how good the fit.
2. "More applications means more chances." — Every application to a company that
   will never sponsor quietly degrades the candidate's algorithmic score on
   platforms like Eightfold, making every *future* application harder.
3. "If the posting exists, the job is real." — Ghost jobs are maintained to
   signal growth with no intent to fill. The posting is not evidence of a hire.
4. "Mentioning OPT will sink my application." — Sometimes true, sometimes
   exactly backwards. On OPT the candidate is *already authorized*, costs the
   employer nothing for 1–3 years, and is FICA-exempt (~7.65% payroll saving).
   The error is treating one framing as universal.
5. "The AI's confident answer is the answer." — The fluency trap. A confident
   sponsorship estimate from an unverified prompt is the single most dangerous
   artifact the reader can produce.

## Motivation type

Primarily **professional and existential** — this is a job search against a
legal deadline, not a course requirement. The design honors it: the terminal
deliverable is not an exam, it is a working engine the reader will stake their
actual job search on. Secondary **intellectual** motivation (the reader is
already skeptical of spray-and-pray and wants the repair kit) and secondary
**academic** motivation (the book is adoptable into a course; see Part 3).

---

# PART 3 — BOOK TYPE AND DEPLOYMENT SPECIFICATION

## Book type

**PRIMARY TYPE:** Practitioner handbook — used to build and run a real system,
consulted by task, each component chapter self-contained enough to return to
when that part of the engine needs work.

**SECONDARY TYPE:** Course-adoptable text — the three-act arc and graduated
exercises map to a project-based graduate module or a career-services intensive.

**NOT:** A field-defining monograph (it does not advance a research argument for
specialists), a comprehensive immigration manual (it is operational, not legal),
or a general "how to job hunt" book (the constraints are specific to
sponsorship-seeking candidates and the method is data-first).

## Deployment specification

**Primary deployment context:**
A single reader at a terminal, building the engine in Claude Code on their own
machine over days, then running it daily through the OPT job search. The
`modes/` recipes are the runtime; the chapters are the build-and-understand
layer; Medhavy/Medhavi can wrap it as an adaptive intelligent-textbook.

**Secondary deployment context:**
A graduate course or university career-services program in applied AI,
data-for-decisions, or international-student career development. Acts One and
Two transfer cleanly to a 10–14 session module; Act Three becomes the project.

**What the book is NOT designed for:**
Domestic candidates with no visa constraint (the dominant scoring factor
disappears); non-technical readers who cannot run a script (the engine assumes
a terminal); legal advice (the book states operational facts and routes
genuinely legal questions to counsel).

**How the TOC signals book type to a reviewer:**
Each Act Two chapter is anchored to a named public dataset and a maintained
script subsystem (`SCRIPTS/sec`, `SCRIPTS/ats`, `SCRIPTS/bls`,
`SCRIPTS/resumes`), with a runnable command and an inspectable output. A
reviewer can see in under ten minutes that this is a build-it handbook, not a
survey.

---

# PART 4 — FIELD POSITIONING

## The gap this book fills

No existing book teaches a sponsorship-aware, verified-data method for
allocating a job search, built as a personal AI tool, that scores a posting on
*who sponsors, whether the role is real, whether the timeline fits the visa
clock,* and *how well the candidate matches* — using public government data the
job boards do not surface.

The competitive landscape splits cleanly into three groups that each miss this:

- **Job boards and ATS platforms (LinkedIn, Indeed, Handshake)** show postings
  and hide the decisive facts. They have the listings; they will not tell you
  who sponsors or whether the role is a ghost.
- **Career and job-search books (e.g., *What Color Is Your Parachute?*, *The 2-Hour
  Job Search*)** teach process and psychology for a general audience with no
  visa constraint and no data pipeline. They are right that targeting beats
  volume; they have no engine to do the targeting.
- **Immigration and OPT guides** explain the law but stop at the threshold of
  the job search itself — they tell you what OPT *is*, not which thousand
  funded startups have a documented history of sponsoring it.

## Positioning statements by comparable

**vs. *The 2-Hour Job Search* (Steve Dalton):** `[INFERRED]`
"Unlike *The 2-Hour Job Search*, which gives a general reader a disciplined
prioritization process, this book gives a sponsorship-constrained reader a
*data engine* — the targeting is computed from SEC, DOL, and USCIS records, not
estimated by hand, because the constraint that dominates this reader's score
is invisible to a manual method."

**vs. job boards (LinkedIn / Indeed / Handshake):**
"Unlike a job board, which optimizes for application volume and hides
sponsorship history, ghost-job risk, and timeline fit, this book builds a tool
that surfaces exactly those three facts and recommends *skipping* most of what
the board shows you."

**vs. OPT / immigration guides:** `[INFERRED]`
"Unlike an OPT guide, which explains work authorization, this book operates on
it — turning FICA exemption and authorization windows into framing decisions
and turning sponsorship history into a rankable score."

**vs. *The Book of Why* / the series' own causal-reasoning volume:**
"This book is the applied sibling. Where the series argues in general for the
boundary between execution and judgment, this volume makes the reader *live*
that boundary in the highest-stakes decision a graduating international student
faces — and proves in every chapter what the machine could not know."

---

# PART 5 — THREE-ACT LEARNING ARC

## The arc statement

This book takes the reader from **an exhausted applicant sending eight hours of
ungrounded applications into the void** to **the operator of a verified-data
engine that tells them where their time is worth spending** by first
establishing why fluency is a trap and reallocation is the win (Act One), then
building the engine one verified dataset at a time so every score rests on a
public record rather than a guess (Act Two), then running the whole system
against real postings and owning the judgments the machine cannot make
(Act Three).

## The pebble-in-the-pond opening

Chapter 1 hands the reader a single polished artifact — a confident,
well-formatted application recommendation produced with no data behind it — and
asks what would have to be true for it to be trusted. The reader experiences the
fluency trap before any apparatus exists. Chapter 2 gives them the reallocation
target (the 3-3-2 day) as the shape of the whole book. By the end of Act One
the reader has felt the problem the engine exists to solve.

## Act One — Establish (Chapters 1–3)

**Starting state:** The reader equates effort with applications sent and trusts
a fluent answer.
**Ending state:** The reader can name the execution/judgment boundary, state the
reallocation principle, and articulate the verified-data contract — *use the
data and the script before you prompt.*
**Inciting question:** "This recommendation looks right. How do I know it is?"
**Act One → Act Two transition:** The reader can look at any score the engine
will later produce and ask the right question of it: what public record grounds
this, and what did a human have to decide?

## Act Two — Build (Chapters 4–11)

**Starting state:** The reader accepts the contract but cannot yet operate any
component.
**Ending state:** The reader can run each subsystem, read its audit, and explain
what domain knowledge the data could not supply for that component.
**Hardest conceptual moment:** Chapter 9 (the Bayesian Role Scorer) — combining
four probabilities into one decision, and accepting that a perfect-fit
application to a non-sponsor is worth zero.
**Act Two → Act Three transition:** The reader has all five components
operational and can state, for any role, where each factor in its score came
from — a record, a model judgment, or their own input.

## Act Three — Apply (Chapters 12–14)

**Starting state:** The reader has working components but has not run them as one
system under real pressure.
**Ending state:** The reader runs the daily loop, holds a skip rate above 50%,
logs every decision including skips, and produces an honest first real run with
a written account of what the machine could not know.
**The transfer test:** This is not hypothetical. For the intended reader the
transfer happens *during* the book — they build the engine on their own live
job search and the terminal deliverable is the search itself, reallocated.

## The verified-data spine across the arc

| Chapter | Dataset / subsystem grounding it |
|---|---|
| 4 | SEC Form D — `SCRIPTS/sec/` (who just raised money) |
| 5 | SEC + DOL LCA + USCIS H-1B — the 80 Days sponsorship tiers |
| 6 | ATS detection & liveness — `SCRIPTS/ats/` (is the role real) |
| 7 | BLS / O\*NET / OEWS — `SCRIPTS/bls/` (is the role any good) |
| 8 | Visa timeline rules (OPT / STEM OPT / H-1B windows) |
| 9 | All four probabilities combined → Apply / Consider / Skip |
| 10 | OPT framing rules calibrated by sponsorship tier |
| 11 | `SCRIPTS/resumes/` — ATS-safe PDF from Markdown CV |
| 12–13 | `modes/` recipes + `data/ats/applications.md` tracker |
| 14 | The Gru/Minion build score; the honest run |

---

# PART 6 — THE SYSTEM MAP (what lives in this directory)

The book is documentation for a working system. The repository has five layers,
governed by `DATA_CONTRACT.md`:

- **Source data** (`data/`) — provenance, never casually rewritten:
  `data/80-days-to-stay/` (sponsorship/company source), `data/bls/`
  (O\*NET/OEWS role-quality reference), `data/sec/form-d/` (downloaded and
  extracted Form D quarters), `data/ats/` (scanner config, pipeline, tracker).
- **Maintained scripts** (`SCRIPTS/`) — the engine's moving parts: `sec/`
  (Form D pipeline → company JSON/CSV, entity resolution against DOL LCA),
  `ats/` (Greenhouse/Lever/Ashby providers, unified detector, Playwright
  liveness, pattern audit), `bls/` (compact SOC/OEWS extract), `resumes/`
  (Markdown CV → ATS-safe PDF via Playwright).
- **Generated data** (`*-audit.md`, processed JSON/CSV) — reproducible outputs
  written next to the data they describe.
- **Book content** — `chapters/`, `book.md`, `outline.md`, the four Tik TOC
  phase files, `images/`, `d3/`, `styles/`, `pantry/`.
- **Private/user-specific** — `.env*`, `data/ats/applications.md`,
  `data/ats/pipeline.md`, `data/ats/scan-history.tsv`. **Privacy-reviewed
  before any commit.**

**The `modes/` layer is the runtime.** Modes are student-facing operating
recipes — `scan`, `pipeline`, `oferta`, `tracker`, `pdf` (active);
`apply`, `contacto`, `deep`, `followup`, `interview-prep`, `ofertas`,
`project`, `training` (draft/helper). Their **prime directive**: *run a script,
read an audit, inspect the output, record what happened — then explain or
decide.* Never ask the model to guess sponsorship likelihood or invent
labor-market statistics when a script or dataset can answer.

---

# PART 7 — PREREQUISITE MAP

| Prerequisite | Safe to assume? | If not: where addressed |
|---|---|---|
| Command-line basics (`python3`, `npm run`) | Probably | Ch 4 establishes the run-inspect-log loop |
| Reading CSV / JSON / Markdown | Yes | — |
| Claude Code installed and authorized | Probably | Ch 1 setup; institution-provisioned per the build score |
| The reader's own visa facts (8 questions) | No | Ch 8 — and required as Step 1 of the build (see Part 14) |
| Probability literacy (weights, 0–1 factors) | Probably | Ch 9 builds the scorer from intuition |
| Python authorship | Not required | Excluded — scripts are maintained, reader runs them |
| Immigration law | Not required | Excluded — operational facts only; legal Qs → counsel |

**Front-loading decision:** The single hard prerequisite is the reader's own
situation — visa status, exact OPT expiration, STEM eligibility, target roles,
geography, comp floor, deal-breakers, strongest proof point. The build score
makes answering these eight questions in writing **Step 1, before Claude sees
anything.** The book front-loads this as Chapter 8's intake and as a setup task
in Chapter 1. No separate foundations chapter is required.

---

# PART 8 — LEARNING OUTCOMES BY CHAPTER (abbreviated map)

| Ch | Highest Bloom's outcome | Assessable artifact |
|---|---|---|
| 1 | (Analyze) Diagnose a fluent-but-ungrounded artifact | Written "what would make this trustworthy?" audit |
| 2 | (Evaluate) Justify a time allocation against expected return | A personal 3-3-2 plan with reasoning |
| 3 | (Apply) Apply the verified-data contract to a decision | A mode run logged in `RUN_LOG.md` |
| 4 | (Apply) Run the SEC Form D pipeline and read its output | A funded-company shortlist from real filings |
| 5 | (Evaluate) Assign and defend a sponsorship tier | Tiered company list with evidence per tier |
| 6 | (Analyze) Classify a posting's liveness and ATS | A live/ghost call with the signals that justify it |
| 7 | (Evaluate) Judge role quality from BLS/O\*NET features | A role-quality read on a real target |
| 8 | (Apply) Compute a visa timeline factor for a role | A 0–1 factor with the dates that produce it |
| 9 | (Create) Produce an Apply/Consider/Skip decision | A composite score with all four factors sourced |
| 10 | (Create) Generate tier-calibrated application framing | Materials that never misrepresent authorization |
| 11 | (Apply) Produce an ATS-safe PDF from a Markdown CV | A rendered CV that survives a parser |
| 12 | (Apply) Operate the modes as a verified-data runtime | A logged scan→pipeline→oferta sequence |
| 13 | (Evaluate) Read the tracker and hold skip rate ≥ 50% | A daily allocation summary with skip rate |
| 14 | (Create) Execute and defend an honest first real run | A run plus a written "what the machine could not know" |

Every chapter carries at least one outcome at Apply or above. No chapter is
pure comprehension. Full per-chapter outcomes (3–5 each, Bloom-labeled) live in
the chapter specs. `[INFERRED — outcomes synthesized from component behavior in
the plain-summary and build score; confirm wording before drafting.]`

---

# PART 9 — CHAPTER-BY-CHAPTER TOC

---

## ACT ONE — ESTABLISH (Chapters 1–3)

*What this act does: makes the reader feel the cost of the wrong strategy and
hands them the two ideas the whole engine serves — the execution/judgment
boundary and the reallocation principle — before any tool exists.*

---

### CHAPTER 1 — The Fluency Trap

**One-line:** The reader learns to distrust a polished artifact on principle and
to ask what would have to be true for it to be trusted.

**Outcomes:** (Understand) Describe the execution/judgment boundary. (Analyze)
Diagnose a fluent, ungrounded recommendation and name what it leaves out.

**Opening:** A clean, confident application recommendation — well-formatted,
plausible, and produced with no data behind it. The reader is asked to act on it.
Then: what did the machine not know?

**Core content:** Fluency as the first sign of trouble; execution vs. judgment;
"avoidance is not a strategy — the strategy is disciplined use"; the setup of
Claude Code as the workbench for the rest of the book.

**Worked example:** Two recommendations for the same posting — one from a prompt
alone, one grounded in the engine's data — side by side.

**Exercises:** (Analyze) Audit a provided ungrounded artifact. (Apply) Install
and authorize the workbench; confirm the directory layout against `DATA_CONTRACT.md`.

**Bridge:** If disciplined use beats avoidance, what discipline? The first
discipline is *where the time goes.*

---

### CHAPTER 2 — The Reallocation Principle

**One-line:** The reader learns why fewer, better-targeted applications win, and
adopts the 3-3-2 day as the shape of the whole method.

**Outcomes:** (Understand) Explain why application volume is the wrong target.
(Evaluate) Justify a personal time allocation against expected return.

**Opening:** The eight-hour applicant — 500 brand-name companies, auto-rejected
before a human reads anything, no time left for the two activities that actually
produce hires.

**Core content:** The 3-3-2 allocation — 2 hours applying, 3 networking, 3
portfolio; referrals are 4–10× more likely to convert and 54% of hires come
through connections; validated-AI-skill workers command a ~56% wage premium; the
engine exists to compress the "2" so the "3+3" becomes possible.

**Worked example:** A week of spray-and-pray vs. a week of reallocation, with
the expected-value reasoning made explicit.

**Exercises:** (Apply) Draft a personal 3-3-2 plan. (Evaluate) Defend one role
you would *skip* and say where the freed time goes.

**Bridge:** Reallocation needs a filter trustworthy enough to skip on. A filter
is only trustworthy if it rests on data, not on a prompt.

---

### CHAPTER 3 — The Verified-Data Contract

**One-line:** The reader learns the rule that governs every later chapter: run
the script and read the audit before you prompt.

**Outcomes:** (Understand) State the prime directive and the sources of truth.
(Apply) Run one mode end-to-end and log it; (Analyze) distinguish a
data-grounded claim from a model judgment and label each.

**Opening:** Two ways to estimate whether a company sponsors — ask the model, or
query the records. One is fluent. One is true.

**Core content:** The `modes/_shared.md` contract; sources of truth
(`DATA_CONTRACT.md`, the `SCRIPTS/` subsystems, the `*-audit.md` reports); the
ten verified-data rules; never invent counts, rates, or coverage; the run log
as memory.

**Worked example:** The same sponsorship question answered both ways, with the
discrepancy surfaced and explained.

**Exercises:** (Apply) Run a mode against real data and write a `RUN_LOG.md`
entry. (Analyze) Take a mixed claim and split it into "from the data" vs. "from
the model," labeling each.

**Bridge:** The contract is set. Now build the first source of truth: who just
got the money to hire.

---

## ACT TWO — BUILD (Chapters 4–11)

*What this act does: builds the engine one verified dataset at a time. Each
chapter is anchored to a public dataset and a maintained script subsystem, runs
a real command, inspects a real output, and names the domain judgment the data
could not supply.*

---

### CHAPTER 4 — Where the Money Went: SEC Form D

**One-line:** The reader learns to turn raw SEC Form D filings into a shortlist
of companies that just raised money and therefore need to hire.

**Outcomes:** (Apply) Run the Form D pipeline (`download → refresh → combine →
filter → unique → domain inference → flatten`). (Analyze) Read the processed
output and identify recently funded firms in a target geography.

**Opening:** Thousands of funded startups and small labs — many in Boston
biotech and AI — that have money and need talent and are invisible to anyone
looking only at brand-name employers.

**Core content:** What Form D is; the `SCRIPTS/sec/` flow and the `data/sec/form-d/`
`raw/`→`extracted/`→`processed/` layout; deduplication and entity resolution
against DOL LCA records; funding recency as a hiring signal.

**Worked example:** A real quarter processed into a ranked list of funded
companies, with one surprising small firm surfaced next to the obvious names.

**Exercises:** (Apply) Refresh the current quarters and produce a company JSON.
(Analyze) Pull ten funded firms in your target city and note which you'd never
have found on a job board.

**Bridge:** Funded is not the same as *will sponsor you.* The next layer joins
the money to the visa record.

---

### CHAPTER 5 — Who Sponsors: The 80 Days Sponsorship Scorer

**One-line:** The reader learns to assign every company a sponsorship tier —
Proven, Likely, Unknown, or Avoid — from three public government datasets.

**Outcomes:** (Evaluate) Assign and defend a tier from LCA, H-1B, and funding
evidence. (Analyze) Explain why a famous non-sponsor scores below an unknown
small lab with a filing history.

**Opening:** Two companies — one a household name with a 0% sponsorship history,
one a Cambridge biotech with fifteen LCA filings and an 85% H-1B approval rate.
The board ranks them backwards.

**Core content:** The 80 Days pipeline (SEC Form D + DOL LCA + USCIS H-1B); the
four tiers; the scoring weights — **LCA filing rate 40%, H-1B approval rate 30%,
funding recency 20%, company-size signals 10%**; why this data exists in public
records but requires a pipeline to use.

**Worked example:** One company walked from raw records to a defended tier, with
the weight contribution of each factor shown.

**Exercises:** (Evaluate) Tier ten target companies with evidence. (Analyze)
Find one Proven-tier company you had never heard of and say what made it
invisible.

**Bridge:** A company that will sponsor is worthless if the posting is fiction.
Next: is the role even real?

---

### CHAPTER 6 — Is the Job Real: ATS Detection and Liveness

**One-line:** The reader learns to detect which applicant-tracking system a
company uses and to classify whether a posting is live or a ghost.

**Outcomes:** (Analyze) Detect the ATS (Greenhouse, Lever, Ashby) for a company.
(Analyze) Classify a posting's liveness from posting age and portal signals and
defend the call.

**Opening:** A role posted six weeks ago, never updated, at a company with no
recent funding — next to a role posted last week at a firm that just closed a
Series B. One is probably a ghost.

**Core content:** The `SCRIPTS/ats/` subsystem — the unified `detect_ats.py`,
the zero-token provider `scan.mjs`, Playwright liveness (`check-liveness.mjs`,
`liveness-core.mjs`); the Greenhouse and Lever production scrapers; ghost jobs
as growth theater; `analyze_patterns.py` for tracker/scan/pipeline audits.

**Worked example:** A single company scanned end-to-end — ATS detected, jobs
pulled, one posting classified live and one flagged stale, with the signals
named.

**Exercises:** (Apply) Detect the ATS and scan one company's portal. (Analyze)
Classify three postings live/ghost and justify each from the signals.

**Bridge:** Real and sponsoring is still not enough. Is the role *worth* having?

---

### CHAPTER 7 — Is the Role Any Good: BLS / O\*NET Role Quality

**One-line:** The reader learns to read a role's quality and labor-market
direction from BLS and O\*NET data rather than from the job title alone.

**Outcomes:** (Evaluate) Judge a role's quality and trajectory from the compact
SOC/OEWS features. (Apply) Map a posting to its SOC occupation and pull its
wage and employment estimates.

**Opening:** Two postings with the same flattering title and very different
futures — one in an occupation with rising employment and a strong wage band,
one in a shrinking one.

**Core content:** `SCRIPTS/bls/extract_soc_occupation_table.py` and the compact
table (O\*NET identity, alternate titles, job zones, ability/skill levels, BLS
OEWS national employment and wage estimates); SOC classification; using
role-quality as a scoring feature, not a vibe.

**Worked example:** A target role mapped to its SOC code with the
employment-and-wage read that changes whether it belongs on the list.

**Exercises:** (Apply) Generate the compact table and look up two target roles.
(Evaluate) Rank three roles by quality-and-direction with the features cited.

**Bridge:** Four facts now exist about every role — sponsorship, liveness,
quality, and fit. But none of them matter if the clock runs out first.

---

### CHAPTER 8 — The Visa Timeline Manager

**One-line:** The reader learns to compute a visa timeline factor that zeroes
out any role whose hiring process would outrun their work authorization.

**Outcomes:** (Apply) Compute the 0–1 timeline factor from OPT, STEM OPT, and
H-1B dates. (Evaluate) Decide skip-regardless when expected start exceeds
authorization.

**Opening:** A student with three months of OPT left applying to a company with
a four-month hiring process — an offer they could never accept, and no tool
surfaced the conflict before the application went out.

**Core content:** OPT, STEM OPT extension eligibility, and the H-1B lottery
window; the timeline factor between 0 and 1; factor = 0 ⇒ skip regardless of
fit; buffer-based scaling; the eight intake questions as the factor's
foundation.

**Worked example:** Three roles for the same student — one zeroed by timeline,
two scaled by remaining buffer — with the dates shown.

**Exercises:** (Apply) Compute your own timeline factor for two real postings.
(Evaluate) Identify a high-fit role you must skip on timeline alone and say why.

**Bridge:** Five numbers now describe every role. The engine has to fuse them
into one decision.

---

### CHAPTER 9 — The Bayesian Role Scorer

**One-line:** The reader learns to combine sponsorship, fit, liveness, and
timeline into a single composite score that recommends Apply, Consider, or Skip.

**Outcomes:** (Create) Produce a composite Apply/Consider/Skip decision with
every factor sourced. (Evaluate) Defend the dominant weighting of sponsorship.
(Analyze) Explain why a perfect-fit application to a non-sponsor scores zero.

**Opening:** "Google is a great company, so I should apply." The scorer replaces
that sentence with math — and the math says no.

**Core content:** The four inputs (sponsorship probability, fit from CV-vs-JD,
role liveness, timeline factor); **sponsorship weighted highest at 35%** — above
fit, liveness, and timeline — because the constraint unique to this reader
dominates; ghost-job liveness folded into the score; Apply / Consider / Skip
thresholds. This is the hardest chapter: it inverts the reader's instinct that
fit comes first.

**Worked example:** One posting scored fully — each factor traced to its source
(a record, a model judgment, or the reader's input) — landing on a recommendation.

**Exercises:** (Create) Score five real postings and produce a recommendation
for each. (Evaluate) Find a case where the scorer disagrees with your gut and
decide who is right, with reasons.

**Bridge:** When the score says Apply, the application still has to be written —
and visa framing is where most candidates get it wrong.

---

### CHAPTER 10 — The OPT Framing Generator

**One-line:** The reader learns to generate application materials with
visa-aware framing calibrated to what each employer tier actually understands
about OPT — without ever misrepresenting their authorization.

**Outcomes:** (Create) Generate tier-appropriate framing for a real role.
(Evaluate) Choose what to disclose, when, by sponsorship tier. (Understand)
Explain the FICA-exemption employer benefit accurately.

**Opening:** Most employers think OPT means immediate sponsorship, cost, and
legal risk. None of that is true in the OPT/STEM OPT window — the candidate is
already authorized and is FICA-exempt (~7.65% employer saving). Candidates do
not know how to say this, or that they should.

**Core content:** Framing by tier — **Proven:** state authorization directly;
**Likely:** lead with work authorization and the FICA benefit, avoid the acronym;
**Unknown:** no visa mention in initial written materials — framing moves to the
interview; **Avoid:** no materials, the engine already said skip. The hard rule:
framing is accurate information presented strategically — **never** fabricated
credentials, invented metrics, or misrepresented status.

**Worked example:** The same candidate, the same role, framed three ways across
three tiers, with the rationale for each.

**Exercises:** (Create) Generate framing for one role at each of the three
material-producing tiers. (Evaluate) Catch and fix a framing that crosses from
strategic into misrepresentation.

**Bridge:** Good framing dies in a bad PDF. The materials have to survive the
parser that reads them first.

---

### CHAPTER 11 — Resumes That Survive the Filter

**One-line:** The reader learns to produce an ATS-safe PDF from a Markdown CV so
the application a human eventually reads is the one the parser passed.

**Outcomes:** (Apply) Render an ATS-friendly PDF from a Markdown CV with
`SCRIPTS/resumes/`. (Analyze) Identify CV structures that break parsers and fix
them.

**Opening:** A beautifully designed resume that the ATS reads as a wall of
garbled text — rejected before a human sees it.

**Core content:** The `SCRIPTS/resumes/generate-pdf.mjs` pipeline (Playwright/
Chromium, resume-safe Markdown rendering); `npm run resumes:pdf`; ATS-safe
structure; anonymized example CVs as templates.

**Worked example:** One Markdown CV rendered, run against a parser's view, and
corrected where the structure failed.

**Exercises:** (Apply) Render your own CV to an ATS-safe PDF. (Analyze) Diff a
"designed" resume against the safe version and list what broke.

**Bridge:** Every component now works alone. Act Three runs them as one system,
under real pressure, with a log.

---

## ACT THREE — APPLY (Chapters 12–14)

*What this act does: stops handing the reader clean single-component tasks and
starts running the whole engine against a live job search — through the modes,
the tracker, and an honest first real run.*

---

### CHAPTER 12 — Modes: Operating the Engine

**One-line:** The reader learns to run the engine through its modes as a
verified-data runtime — scan, pipeline, evaluate, render — logging every step.

**Outcomes:** (Apply) Operate a `scan → pipeline → oferta` sequence end-to-end.
(Analyze) Distinguish active modes from draft modes and check whether a mode
calls real scripts before trusting it.

**Opening:** The difference between a mode that runs a script and reads an audit,
and a mode that quietly turns into "ask the model what it thinks."

**Core content:** The `modes/` taxonomy — active (`scan`, `pipeline`, `oferta`,
`tracker`, `pdf`) vs. draft/helper (`apply`, `contacto`, `deep`, `followup`,
`interview-prep`, `ofertas`, `project`, `training`); the run-inspect-record
loop; `RUN_LOG.md`; the rule that a draft mode is checked for real scripts and
logging before use.

**Worked example:** One target taken from URL through scan, pipeline scoring,
and an `oferta` evaluation, with each step logged.

**Exercises:** (Apply) Run a full mode sequence on a real role and log it.
(Analyze) Audit one draft mode: does it call scripts, does it log?

**Bridge:** Running the engine produces decisions. Decisions are only worth
making if you can see whether they worked.

---

### CHAPTER 13 — The Pipeline Tracker and the Skip Rate

**One-line:** The reader learns to log every decision including skips, watch the
skip rate, and read the daily allocation summary as the engine's health check.

**Outcomes:** (Apply) Maintain `data/ats/applications.md` and produce a daily
allocation summary. (Evaluate) Hold a skip rate ≥ 50% and read it as evidence
the filter is working.

**Opening:** Without a tracker there is no feedback loop — no response rate, no
sense of whether Proven-tier applications outperform Unknown-tier ones, no way
to know you have drifted back to eight hours of clicking.

**Core content:** The Pipeline Tracker; logging the composite score, tier,
timeline flag, and outcome for every decision *including skips*; the
counterintuitive target — **skip rate ≥ 50%**: if you apply to everything the
engine evaluates, the filter is too loose and you are back to spray-and-pray; the
daily summary that reminds you how much networking and portfolio time remains.

**Worked example:** A week of tracker data read for what it says about targeting
quality and allocation drift.

**Exercises:** (Apply) Log a week of decisions and generate the summary.
(Evaluate) Diagnose your own skip rate — too low, too high, or healthy — and
say what to change.

**Bridge:** The numbers can run. The last question is the one the machine cannot
answer: should you trust this enough to stake your search on it?

---

### CHAPTER 14 — The Build and the Honest Run

**One-line:** The reader learns to build the whole engine with AI doing what it
is superhuman at and the human doing what is irreducibly human — then to execute
and defend a first real run.

**Outcomes:** (Create) Execute a first real run of the full engine on a live
search. (Evaluate) Audit the engine's probability math for sense. (Create)
Write the "what the machine could not know" account that closes the loop the
book opened.

**Opening:** The conductor's score — two parts in dependency order. The Minion
part: exact prompts for what Claude builds (scaffolding, schemas, scoring
formulas, boilerplate). The Gru part: the human decisions — what your visa
situation requires, whether the math makes sense, the domain knowledge Claude
cannot have, and the integration of all five components into a system you will
stake your job search on.

**Core content:** The build phases — Foundation, Core Skeleton, Integration,
Full Feature Build, Hardening, Release; the execution/judgment boundary made
operational; the eight intake questions as first-class constraints; ethics and
honesty — accurate framing, no fabrication, privacy review before any commit of
`data/ats/` files; the first real run.

**Worked example:** The instructor's own end-to-end run — build to first batch
of real decisions — with the human-judgment checkpoints called out.

**Exercises:** (Create) Stand up your own engine and make ten real, logged
decisions. (Evaluate) Audit one of its scores for a math error the fluency would
otherwise hide. (Create) Write the honest-run account: what would have to be
true for this to be trusted, and what are you now responsible for.

**Closing return:** Return to the polished artifact from Chapter 1. Do not ask
whether it is impressive. Ask what would have to be true for it to be trusted,
what the machine could not know, and what you are now responsible for. Then
begin.

---

# PART 10 — CHAPTER ANATOMY TEMPLATE

All chapters follow this structure (adapted to a practitioner handbook):

1. One-line capability statement (what the reader can DO after, not READ about)
2. Learning outcomes (Bloom's level explicit)
3. Opening case — a real failure or a backwards ranking, before any apparatus
4. "What you need first" — prerequisites stated as specific capabilities
5. The dataset/subsystem this chapter rests on (Act Two chapters)
6. Core content sections (4–6), each: concept → command/example → application
7. A runnable command with an inspectable output (Act Two and Three)
8. Worked example — end-to-end on one real target
9. Mid-chapter checkpoint (ungraded; surfaces the common error early)
10. Decision rules — when to choose A vs. B (e.g., framing by tier)
11. "What the machine could not know" box — the irreducibly human judgment
12. Assessable exercises (min 3; at least one at Apply+; at least one produces
    an artifact)
13. AI Use / verified-data disclosure — what came from data vs. model judgment
14. Chapter summary — capabilities gained, not topics covered
15. Key terms (plain-language)
16. Bridge question — the question this chapter raises that the next answers
17. Run-log prompt — what to record in `RUN_LOG.md` after this chapter's run

**Enforcement:** A draft chapter missing items 3, 8, 11, or 16 is incomplete.
For Act Two/Three, a chapter missing item 7 (a runnable, inspectable command) is
incomplete. Do not advance to review without resolving these.

---

# PART 11 — CASE STUDY AND WORKED-EXAMPLE STRATEGY

## Domain coverage map

| Domain | Chapters | Notes |
|---|---|---|
| Funded startups / biotech / AI labs | 4, 5 | The invisible-but-sponsoring core case |
| Brand-name non-sponsors | 1, 5, 9 | The backwards-ranking foil |
| Ghost / stale postings | 6, 13 | Liveness and skip-rate evidence |
| The reader's own live search | 8–14 | The continuing case — their real job hunt |

## Case escalation

- **Act One:** single, vivid failures (the ungrounded artifact; the eight-hour
  applicant) — one idea, clear lesson.
- **Act Two:** one real company or role per chapter, single component, with the
  domain judgment the data could not supply named explicitly.
- **Act Three:** one continuing case — the reader's own search — carried across
  modes, tracker, and the honest run. No single right answer; the reader owns
  the judgment.

## Worked-example format (every chapter)

Situation → the command run and the output inspected → the decision → the lesson
(one sentence) → the limit (where this component fails) → what the machine could
not know.

## Sourcing requirement

Every statistic is either traced to a dataset/script in the repo or labeled an
illustrative figure. The plain-summary's figures (3-3-2 returns, 54% of hires
via connections, 4–10× referral conversion, ~56% AI-skill wage premium, ~7.65%
FICA) **must be source-cited or labeled before publication** — see Risk 8.

---

# PART 12 — HARD TOPICS, CONTESTED CLAIMS, AGING RISK

## Contested / sensitive claims

| Claim | Status | Book's position |
|---|---|---|
| A model can estimate sponsorship likelihood | Disputed | No — sponsorship comes from LCA/H-1B records; the model never guesses it |
| Withholding visa status from Unknown-tier employers | Ethically sensitive | Framed as *what to disclose and when*, never as misrepresentation; status is never falsified |
| Public sponsorship/LCA data identifies "Avoid" companies | Defensible but reputationally sensitive | Tiering is from public records; presented as probability, not a verdict on a company |
| Ghost-job detection from posting signals | Probabilistic | Liveness is an estimate with named signals, labeled as such — not a certainty |
| Job-search statistics (3-3-2, referral multipliers) | Needs sourcing | Treated as requiring citation; see Risk 8 |
| This is career strategy, not legal/immigration advice | Boundary claim | Stated explicitly; genuinely legal questions routed to counsel |

## Hard chapters

- **Chapter 9 (Bayesian Role Scorer):** inverts the reader's fit-first instinct
  and asks them to trust a weighting (sponsorship 35%) that feels wrong until it
  is felt. Do not draft without the side-by-side worked example.
- **Chapter 10 (OPT Framing):** the disclosure-by-tier rules are the book's
  sharpest ethical edge. The "never fabricate / never misrepresent" rule is
  load-bearing and must be stated before the tactics.
- **Chapter 14 (The Honest Run):** integration plus the ethics of staking a real
  search on an engine the reader built. Easy to write as triumphalism; must be
  written as accountability.

## Aging risk

| Content | Risk | Review cadence |
|---|---|---|
| Immigration rules (OPT/STEM/H-1B windows, FICA) | High | Before each printing; rules change |
| ATS provider internals (Greenhouse/Lever/Ashby) | High | Before each offering; APIs drift |
| SEC/DOL/USCIS data formats and access | Medium-High | Each refresh cycle |
| Specific tool/runtime references (Claude Code) | Medium | Before each offering |
| Job-search statistics | Medium | Re-verify each edition |
| The execution/judgment thesis | Low | Stable core |
| The reallocation principle and method | Low | Stable core |

**Structural mitigation:** keep each chapter's stable method separate from its
"current tools / current rules" section so the durable part survives a data or
policy change. **Nothing in this book is legal advice; immigration rules must be
verified against primary sources at use time.**

---

# PART 13 — MARKET POSITIONING

The gap: no book teaches a sponsorship-aware, verified-data, build-it-yourself
method for allocating an international student's job search. Career books lack
the data engine; job boards hide the decisive facts; immigration guides stop at
the threshold of the search.

**Primary market:** International graduate students on F-1 OPT in U.S. STEM
programs, reached through university career services, international-student
offices, and the Humanitarians AI / 80 Days to Stay channels.

**Secondary market:** Graduate courses and career-services intensives in applied
AI and data-for-decisions; domestic candidates who want the targeting method
minus the visa layer (a smaller, derivative use).

**Market size estimate:** `[NEEDS HUMAN INPUT — the planning files carried no
figure. Anchor candidates: ~250k+ international students on OPT/STEM OPT in the
U.S. annually; sizing depends on the 80 Days to Stay distribution channel and
whether the book is sold, bundled with the tool, or used in courses.]`

---

# PART 14 — FEATURE LIST

| Feature | Priority | Production effort |
|---|---|---|
| Three-act build arc (14 chapters) | ESSENTIAL | Low |
| The five-component engine, documented to build | ESSENTIAL | Medium |
| SEC Form D pipeline (`SCRIPTS/sec/`) | ESSENTIAL | Built; maintain |
| 80 Days sponsorship scorer + tiers | ESSENTIAL | Medium (data ops) |
| ATS detection & liveness (`SCRIPTS/ats/`) | ESSENTIAL | Built; maintain |
| Visa Timeline Manager | ESSENTIAL | Medium |
| Bayesian Role Scorer | ESSENTIAL | Medium |
| OPT Framing Generator + tier rules | ESSENTIAL | Medium |
| Pipeline Tracker + skip-rate metric | ESSENTIAL | Built; maintain |
| BLS/O\*NET role-quality extract (`SCRIPTS/bls/`) | IMPORTANT | Built; maintain |
| Resume → ATS-safe PDF (`SCRIPTS/resumes/`) | IMPORTANT | Built; maintain |
| `modes/` runtime recipes | IMPORTANT | Drafts exist; harden |
| The Gru/Minion build score (Ch 14) | IMPORTANT | Drafted |
| `RUN_LOG.md` + verified-data disclosure habit | IMPORTANT | Low |
| Medhavy/Medhavi adaptive integration | VALUABLE | High (platform) |
| Instructor / facilitator guide (course path) | IMPORTANT* | High |
| Worked dataset snapshots for offline teaching | VALUABLE | Medium |

\*Treat the facilitator guide as ESSENTIAL for any adoption where the reader is
not building solo with live data access.

**Minimum Viable Book:** the ESSENTIAL set delivers a reader who can build and
run the full engine on their own search. The IMPORTANT set makes it teachable
and durable.

---

# PART 15 — OUT OF SCOPE

| Topic | Reason | Covered better by |
|---|---|---|
| Immigration legal advice | Liability; not the book's competence | Licensed immigration counsel |
| Writing the scraper/pipeline code from scratch | Reader runs maintained scripts | The `SCRIPTS/` subsystems themselves |
| General (non-sponsorship) career coaching | Dilutes the dominant constraint | *The 2-Hour Job Search*, *Parachute* |
| Comprehensive ATS coverage beyond GH/Lever/Ashby | Diminishing returns; provider drift | Future provider modules |
| Interview performance coaching | Adjacent; out of the reallocation core | `interview-prep` draft mode + external |
| Non-U.S. job markets | Data spine is U.S. government records | Out of scope this edition |

All major exclusions are acknowledged in the preface with a pointer to the
better source. The recurring boundary — *operational facts, not legal advice* —
is stated once, plainly, and repeated wherever the reader might forget it.

---

# PART 16 — ADOPTION RISK REGISTER AND OPEN QUESTIONS

## Risk register

| # | Risk | Likelihood | Impact | Status |
|---|---|---|---|---|
| 1 | Privacy: committing `data/ats/` job-search files exposes the reader's targets/activity | High | High | **BLOCKER** — DATA_CONTRACT privacy rule must be enforced in the build instructions before release |
| 2 | Immigration rules change (OPT/STEM/H-1B/FICA), dating the book | High | High | Isolate "current rules" sections; "verify against primary sources" banner |
| 3 | Ethics: framing-by-tier read as "hiding" status | Medium | High | Lead with the never-misrepresent rule; legal/ethics review of Ch 10 |
| 4 | ATS provider APIs drift, breaking the scanners | High | Medium | Provider modules isolated; maintenance cadence in facilitator guide |
| 5 | SEC/DOL/USCIS data access or format changes | Medium | High | Pipeline is modular; refresh scripts documented; audit-on-refresh |
| 6 | Tool/runtime dependency (Claude Code) and dataset access for non-NEU readers | High | High | **BLOCKER for general release** — specify the runtime and data-access path for readers outside the provisioning institution |
| 7 | Unsourced job-search statistics undermine credibility | Medium-High | Medium | Source-cite or label every figure before publication (ties to Risk 8) |
| 8 | Claims of "probability of hire" overpromise precision | Medium | High | Frame scores as decision aids, not predictions; show the limits in every worked example |
| 9 | Reader can't run scripts (terminal barrier) | Medium | Medium | Ch 1 setup; consider a guided-setup mode; facilitator support |
| 10 | "Avoid"-tier tiering of named companies invites dispute | Low-Medium | Medium | Present as public-record probability, not a verdict; document method |

## Open questions

| # | Question | Stakes | Owner |
|---|---|---|---|
| 1 | Distribution model — sold book, free with the 80 Days tool, or course-bundled? | Market sizing; whole positioning | Author + Humanitarians AI |
| 2 | Runtime/data access for readers outside NEU provisioning | General adoptability (Risk 6) | Author |
| 3 | How are `data/ats/` privacy rules enforced in the reader's own repo? | Risk 1 blocker | Author + system |
| 4 | Which figures get primary-source citations vs. illustrative labels? | Credibility (Risks 7–8) | Author |
| 5 | Is there a facilitator/instructor guide, and is the course path a separate volume? | Secondary market | Author + publisher |
| 6 | Legal/ethics review owner for Chapter 10 framing rules | Ethics exposure (Risk 3) | Author + reviewer |
| 7 | The four empty Tik TOC phase files — fill from this TOC, or run `/i1–/m4` to build them properly? | Planning integrity | Author |

---

*Full TOC Draft v1.0 — synthesized from the working repository.*
*Source files: `chapters/00-introduction.md`, `README.md`,
`projects/the-reallocation-engine-plain-summary.md`,
`projects/the-reallocation-engine-boondoggle-score.md`, `modes/`, `SCRIPTS/`,
`DATA_CONTRACT.md`.*
*Two blockers before publisher proposal: Risk 1 (privacy) and Risk 6 (runtime/*
*data access for general readers). The four Tik TOC phase files remain empty*
*templates — see Open Question 7.*
