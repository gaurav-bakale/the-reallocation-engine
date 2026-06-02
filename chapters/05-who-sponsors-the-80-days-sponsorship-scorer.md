# Chapter 5 — Who Sponsors: The 80 Days Sponsorship Scorer

<!-- voice-anchored: root style/VOICE.md. Anatomy: TIKTOC Part 10.
     Sourced from SDD Component 2, plain-summary, 80-days day logs, CHAPTER-RESEARCH-MAP.
     Note: tier-set discrepancy (Proven/Likely/Unknown/Avoid vs Proven/Likely/Unknown) flagged. Draft. Never published. -->

**What you'll be able to do:** Assign any company a sponsorship tier — Proven, Likely, Unknown, or Avoid — built from three public government datasets, and defend the tier with the evidence that produced it.

## Learning outcomes

- **(Evaluate)** Assign and defend a sponsorship tier from LCA, H-1B, and funding evidence.
- **(Analyze)** Explain why a famous non-sponsor scores below an unknown small lab with a filing history.

## Opening case — the backwards ranking

Put two companies side by side. The first is a household name — a logo you have worn on a t-shirt — with, in the visa record, a sponsorship history of essentially zero: it does not file for foreign workers in roles like yours. The second is a Cambridge biotech you have never heard of, with fifteen Labor Condition Applications filed over three years and an 85% H-1B approval rate.

Ask any job seeker which to prioritize and most will say the famous one. Ask the records, and the ranking flips. For a candidate who needs sponsorship, the unknown biotech is a *vastly* better target than the brand name, and the only reason that feels wrong is that prestige is loud and the visa record is quiet. The scorer's whole job is to make the quiet record louder than the prestige.

## What you need first

From Chapter 4, a shortlist of funded companies. From Chapter 3, the contract: tiers come from records, never from a model's sense of whether a company "seems like a sponsor." You'll also need the company names resolved well enough to match against government data — the same entity-resolution problem from Chapter 4, now load-bearing.

## The datasets and subsystem this chapter rests on

Three public datasets, joined:

- **SEC Form D** (Chapter 4) — funding recency.
- **DOL LCA disclosure data** — every Labor Condition Application an employer files to hire a foreign worker. An LCA is the step *before* an H-1B petition: it signals the employer is willing and set up to sponsor.
- **USCIS H-1B Employer Data Hub** — actual approvals and denials by employer and year, which yields an approval rate.

The subsystem is the **80 Days pipeline**, which joins these on resolved company names. The join is the hard part — "Google LLC," "Google Inc," and "Alphabet" must be recognized as one entity, or a real sponsor looks like a stranger.

## Core content — the four tiers and the scoring weights

The scorer reduces three datasets to one signal: the probability a company will sponsor. The composite is a weighted sum, and the weights are the heart of the chapter:

> **P(sponsorship) = LCA filing rate (3-yr) × 0.40 + H-1B approval rate × 0.30 + funding recency × 0.20 + company-size signals × 0.10**

Read those weights as a claim about evidence. The **LCA filing rate** carries the most weight (40%) because *filing* is the most direct revealed action: a company that files LCAs is a company that has built the legal machinery to sponsor and chooses to use it. The **H-1B approval rate** (30%) says those filings actually succeed. **Funding recency** (20%) says they have the money to keep doing it. **Company-size signals** (10%) capture that a fourteen-person lab and a ten-thousand-person firm behave differently. Each input is a number from a record, not a vibe.

The probability then maps to a **tier**:

- **Proven** — strong, recent filing history and high approval. State authorization directly later (Chapter 10).
- **Likely** — some evidence: a few filings, or strong funding plus partial history.
- **Unknown** — no evidence either way. Not "won't sponsor" — *we have no record.*
- **Avoid** — evidence the company does **not** sponsor in your kind of role (e.g., a clear zero-history non-sponsor), so the engine spends no time there.

> **`[contested — see TIKTOC Risk 8 / CHAPTER-RESEARCH-MAP]`** The system design document describes three tiers (Proven / Likely / Unknown); the plain-language summary adds **Avoid**. This chapter uses the four-tier version because "Avoid" does real work — it lets the engine actively deprioritize known non-sponsors rather than merely lacking data on them. **Reconcile the tier set across the SDD and summary before publication.** The exact probability thresholds for each tier must also be pinned from the SDD (e.g., Proven ≥ 0.65, Likely ≥ 0.35, Unknown < 0.35) and stated here once confirmed. `[verify]`

## A runnable command

The sponsorship data is built and audited before any company is tiered. From the project root, the join is validated against the H-1B records with:

```bash
cd SCRIPTS/sec
python validate_h1b_join_sample.py     # checks the company-name join against USCIS H-1B data
```

and the broader data integrity is checked with:

```bash
python SCRIPTS/audit_sec_dol_h1b_data.py   # audits the SEC + DOL + H-1B join coverage
```

The inspectable output is the join-coverage audit: how many companies matched, how many failed to match, and therefore how much of your shortlist the tier actually covers. You read that coverage number *before* trusting any tier — an "Unknown" caused by a failed name match is not the same as a true absence of filings.

## Worked example — one company from records to a defended tier

**Situation.** The Cambridge biotech from the opening.

**The data, inspected.** LCA filings: 15 over three years → a strong filing rate. H-1B approval rate: 85%. Funding: $12M raised eight weeks ago → high recency. Size: ~40 employees → mid-small.

**The weighted read.** High LCA rate (×0.40) dominates; strong approval (×0.30) confirms; fresh funding (×0.20) supports; size (×0.10) is neutral-to-positive. The composite lands well into **Proven**.

**The contrast.** The household name: LCA rate ≈ 0 (×0.40 contributes nothing), no relevant approvals, ample funding and size that cannot rescue a zero filing history. It lands in **Avoid** for your role type.

**The decision.** The unknown biotech is prioritized over the brand name — exactly the backwards ranking, now defended by four sourced numbers.

**The lesson (one sentence):** Sponsorship is a revealed behavior in public records, not a property of fame — and the record routinely ranks the unknown above the famous.

**The limit (where this fails):** The record is a rear-view mirror. A company that sponsored heavily for three years may have frozen sponsorship last month; a true sponsor may be missing because its name didn't match. The tier is a well-evidenced prior, not a guarantee, and "Unknown" is often a data-coverage artifact you must investigate before trusting.

## Mid-chapter checkpoint

The most common misread: treating **Unknown** as **Avoid**. They are opposites in evidence. *Avoid* means "the record shows they don't sponsor your kind of role." *Unknown* means "the record is silent — possibly because we couldn't match the name, possibly because they're young." Throwing away every Unknown discards exactly the small, recently funded firms Chapter 4 worked to surface. Unknown is a prompt to look closer, not a verdict.

## Decision rule — acting on a tier

- **Proven / Likely:** target actively; these justify the targeted "2 hours" of applying from Chapter 2.
- **Unknown:** keep if fit and funding are strong; resolve the name match and look for direct sponsorship signals (a careers page that says "visa sponsorship available") before deciding.
- **Avoid:** do not spend application time; this is precisely the kind of role the engine exists to let you *skip* (Chapter 2's freed hours).

## What the machine could not know

The pipeline knows a company filed fifteen LCAs. It cannot know those fifteen were all for senior principal scientists and the company has a hard rule against sponsoring entry-level hires. It knows an 85% approval rate; it cannot know the immigration attorney who drove those approvals left in March. It cannot know that an "Avoid" company just hired a new VP who is changing the policy this quarter. The tier tells you where the evidence points. Whether *this role, this month* matches the evidence is a question you carry into the conversation.

## Exercises

1. **(Evaluate) Tier ten companies.** Take ten targets from your Chapter 4 shortlist, run the join, and assign each a tier with the evidence (LCA count, approval rate, funding, size) written next to it. Note the coverage from the audit.
2. **(Analyze) The invisible Proven.** Find one Proven-tier company you had never heard of and write one sentence on what made it invisible — no consumer brand, no billboard, just a filing history.
3. **(Analyze) Diagnose an Unknown.** Pick one Unknown and determine whether it's a true absence of filings or a failed name match. Show how you'd tell the difference.

## AI use / verified-data disclosure

Tiers come from SEC Form D, DOL LCA, and USCIS H-1B records joined by the 80 Days pipeline. The scoring weights (0.40 / 0.30 / 0.20 / 0.10) are from the system design document; the four-tier set and exact thresholds are flagged `[contested]`/`[verify]` pending reconciliation between the SDD and the plain-summary. The 85% approval and 15-filing figures in the worked example are illustrative of the case structure, not a claim about a specific named firm.

## Chapter summary — capabilities gained

You can join three public datasets into a sponsorship probability, assign one of four tiers, and defend the tier — including explaining why an unknown lab outranks a famous logo. You can tell a true Unknown from a name-match artifact. What you still cannot tell: whether the role this company posted is even real.

## Key terms

- **LCA (Labor Condition Application):** the DOL filing an employer makes to hire a foreign worker; the most direct public signal of willingness to sponsor; weighted 40%.
- **H-1B approval rate:** the share of an employer's H-1B petitions approved (USCIS Data Hub); weighted 30%.
- **Sponsorship tier:** Proven / Likely / Unknown / Avoid — the scorer's reduction of the evidence into an action.
- **Coverage:** the fraction of your shortlist the join actually matched; read it before trusting any "Unknown."

## Bridge question

A company that will sponsor is worthless to you if the posting is a ghost. So before you spend the targeted application time a Proven tier earns — is the role even real?

## Run-log prompt

Record the join coverage from the audit, the tier you assigned each target with its four sourced inputs, and any Unknown you reclassified after resolving a name match.
