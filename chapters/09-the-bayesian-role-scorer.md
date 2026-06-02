# Chapter 9 — The Bayesian Role Scorer

<!-- voice-anchored: root style/VOICE.md. Anatomy: TIKTOC Part 10.
     Sourced from SDD Component 3, plain-summary, Eightfold essay (counter-case), CHAPTER-RESEARCH-MAP.
     Hardest chapter (TIKTOC Part 12). Draft. Never published. -->

**What you'll be able to do:** Combine sponsorship, fit, liveness, and timeline into a single composite score that recommends **Apply, Consider, or Skip** — with every factor traced to its source — and defend why sponsorship, not fit, dominates the math.

## Learning outcomes

- **(Create)** Produce a composite Apply/Consider/Skip decision with every factor sourced.
- **(Evaluate)** Defend the dominant weighting of sponsorship.
- **(Analyze)** Explain why a perfect-fit application to a non-sponsor scores zero.

## Opening case — "Google is a great company, so I should apply"

It is the most natural sentence in a job search, and it is wrong in a specific, costly way. "Google is a great company, so I should apply." Great by what measure, and for whom? For a candidate who needs visa sponsorship, "great company" and "good target" are different questions, and conflating them is how the eight-hour applicant from Chapter 2 spent a month applying to firms that would never sponsor the role. The scorer's job is to replace that sentence with arithmetic — and the arithmetic, for a non-sponsor, says no, however great the company.

This is the chapter that will most fight your instincts, because it demotes *fit* — the thing you've been told your whole life is what matters — below a constraint most candidates don't even put in the equation.

## What you need first

Everything before it. Sponsorship probability and tier (Chapter 5), liveness (Chapter 6), role quality and SOC (Chapter 7), the timeline factor (Chapter 8), and — new here — **fit**, the match between your CV and the job description. From Chapter 3, the contract, now at its most important: each factor in the final score must be labeled by where it came from, because a composite that hides its sources is exactly the fluent-but-ungrounded artifact Chapter 1 taught you to distrust.

## The component this chapter rests on

This is the **Bayesian Role Scorer**, the engine's third component and its decision core. It takes four inputs and returns one recommendation. The four inputs:

1. **P(sponsorship)** — the probability the company sponsors, from Chapter 5's tier.
2. **P(fit | CV, JD)** — the probability you're a fit, from comparing your CV to the job description.
3. **Liveness** — is the posting real (Chapter 6)?
4. **Timeline factor** — can you start in time (Chapter 8)?

## Core content — the composite, and why sponsorship wins

The score combines the factors, with two of them weighted as votes and two acting as gates:

> **Composite ≈ P(sponsorship) × 0.35  +  P(fit | CV, JD) × 0.30  +  [other weighted factors]**, the whole thing **multiplied by liveness and by the timeline factor**, with a default decision threshold around **0.3** mapping to **Apply / Consider / Skip**.[^weights]

Three design decisions are worth understanding from first principles.

**First: sponsorship is weighted highest, at 35% — above fit.** Why would a system put "will they sponsor?" above "am I right for the job?" Because weights should reflect *which constraint is most binding for this specific reader.* For a domestic applicant, fit dominates, because sponsorship isn't a question. For an international student, sponsorship is the constraint that silently kills the most applications, so it earns the loudest vote. The weighting is not a claim that sponsorship matters more than competence in the world; it's a claim that, for you, it's the factor most likely to be the reason for a rejection you can't see coming.

**Second: liveness and timeline are multipliers, not addends.** A ghost posting (liveness → 0) or a clock you can't beat (timeline → 0) zeroes the whole score, regardless of sponsorship and fit. This is the math expressing a truth: some constraints are gates, not preferences. A perfect role at a sponsoring company is worth nothing if the posting is fiction or you can't start in time.

**Third — the hardest one: a perfect-fit application to a non-sponsor scores near zero.** If P(sponsorship) ≈ 0, the 35% term contributes almost nothing, and no amount of fit can carry the role above the threshold. This is the scorer overruling "Google is a great company." It will feel wrong. It is the central inversion of the book: the constraint unique to you dominates the factor everyone told you was supreme.

## A runnable command

In the engine's runtime (Chapter 12), scoring a role runs through the `oferta` (offer/role evaluation) mode, which assembles the four factors and returns the composite:

```bash
npm run ats:scan          # ensure the posting and company data are current
# then, in the engine, evaluate the role:
#   mode: oferta  →  pulls sponsorship tier, computes fit from CV vs JD,
#                    folds in liveness and timeline, returns composite + recommendation
```

The inspectable output is the composite **with each factor traced to its source**: sponsorship from the LCA/H-1B join, fit from the CV-vs-JD comparison (a model judgment, labeled as such), liveness from the ATS signals, timeline from your dates. The recommendation (Apply/Consider/Skip) is the headline; the *sourced factors underneath it* are what make the headline trustworthy.

## Worked example — one posting scored fully

**Situation.** A live posting at the Cambridge biotech (Proven tier), data role, for our STEM-eligible graduate.

**Each factor traced.**
- P(sponsorship) ≈ 0.9 — *from the LCA/H-1B record* (Chapter 5).
- P(fit | CV, JD) ≈ 0.7 — *a model judgment* comparing CV to the posting, labeled as judgment.
- Liveness = live (≈1) — *from ATS signals* (Chapter 6).
- Timeline factor ≈ 0.85 — *from the reader's dates* (Chapter 8).

**The composite.** High sponsorship (the dominant term) × high fit, scaled by live posting and comfortable timeline → well above threshold → **Apply.**

**The contrast.** The same graduate, same fit (0.7), applied to the household-name non-sponsor: P(sponsorship) ≈ 0 collapses the dominant term; the composite falls below threshold → **Skip**, despite identical fit and a more famous employer.

**The lesson (one sentence):** The recommendation changes not because you got better or worse, but because the binding constraint — sponsorship — changed, which is exactly what the weighting is built to surface.

**The limit (where this fails):** The score is only as good as its inputs. Fit is a model judgment and can be wrong; sponsorship is a rear-view record; timeline rests on an estimate. The composite reduces four uncertain numbers to one — convenient, but it can launder a bad input into a confident recommendation. That risk is the subject of the "what the machine could not know" box, and it is not hypothetical.

## Mid-chapter checkpoint — the cautionary mirror

Here is a warning the book takes seriously. A different company, Eightfold AI, built a hiring-match score by training on real managers' past decisions — and in doing so it learned the managers' biases, treating "what we did before" as "what is correct." A lawsuit (*Kistler v. Eightfold*) now asks a court to require what good scoring should have required from the start: disclose the score, allow disputes, fix the audit.[^eightfold] Notice the difference from this scorer. Ours does not learn from opaque past decisions; its weights are *stated*, its factors are *sourced*, and you can see exactly why a role scored what it did. A composite score is a powerful tool and a dangerous one — the safety is not the math, it's the auditability. If you ever can't see why this scorer recommended Apply, distrust the recommendation, not your confusion.

## Decision rules — reading the recommendation

- **Apply:** above threshold with sponsorship and timeline both healthy — this earns the targeted "2 hours" of Chapter 2.
- **Consider:** near threshold, or strong on most factors with one soft spot (e.g., Likely-not-Proven sponsorship). Apply only if it beats your other Considers and you have buffer.
- **Skip:** below threshold, or zeroed by liveness or timeline. Reallocate the time.
- **Override (rare, documented):** if you hold private information the data can't (the hiring manager is a contact; the company just started sponsoring), override — but write down what you knew that the scorer didn't.

## What the machine could not know

The composite knows four numbers about a role. It cannot know that the "0.7 fit" undersells you because your one unusual project is exactly what this team needs and no keyword captured it. It cannot know that a "Skip" company quietly began sponsoring last month. It cannot know that you would thrive at a lower-scored role and burn out at a higher one. The scorer's gift is that it makes the *usual* case explicit and defensible; its danger is that a single confident number invites you to stop thinking. The discipline from Chapter 1 returns here in full: don't ask whether the score is impressive. Ask what it could not know, and whether you hold any of that knowledge. Then decide.

## Exercises

1. **(Create) Score five.** Run five real postings through the four factors and produce a recommendation for each, with every factor labeled by source (record / model judgment / your input).
2. **(Evaluate) Trust the math or your gut?** Find one case where the scorer disagrees with your instinct. Decide who's right and write the reasons — and if you override, document what you knew that the data didn't.
3. **(Analyze) The zero.** Take a perfect-fit role at a non-sponsor and show, term by term, why the composite lands on Skip. Explain it to yourself as if to the version of you who wrote "Google is a great company."

## AI use / verified-data disclosure

Sponsorship, liveness, and timeline factors trace to records and your dates (Chapters 5, 6, 8). **Fit is explicitly a model judgment** — a CV-vs-JD comparison — and is labeled as such in every score. The weights (sponsorship 0.35, fit 0.30) and the ~0.3 threshold are from the system design document and are marked `[verify]` pending confirmation of the exact composite form and per-tier thresholds. The Eightfold case is from an uploaded essay, used as a cautionary contrast, with the litigation reference marked `[verify]`.

## Chapter summary — capabilities gained

You can fuse four factors into a sourced composite, read Apply/Consider/Skip, defend why sponsorship outweighs fit for your situation, and explain why a perfect fit at a non-sponsor scores zero. You also know why a composite score is only as trustworthy as its auditability. When the score says Apply, the application still has to be written — and visa framing is where most candidates lose the role they just earned.

## Key terms

- **Composite score:** the weighted, gated combination of sponsorship, fit, liveness, and timeline into one number.
- **Weight vs. gate:** sponsorship and fit are weighted votes; liveness and timeline are multipliers that can zero the score.
- **Fit (P(fit | CV, JD)):** the CV-to-job-description match — a model judgment, always labeled.
- **Auditability:** the property that you can see why a score is what it is; the actual safety of a scoring system.

## Bridge question

The score says Apply. Now you have to write the application — and for an international candidate, *how you frame your work authorization* is where strong candidates get rejected for reasons that have nothing to do with their ability. How do you frame it honestly and well?

## Run-log prompt

Record each role's composite, its four sourced factors (with source labels), the recommendation, and any override with the private information that justified it.

[^weights]: Composite form and weights (sponsorship ×0.35, fit ×0.30, liveness and timeline as multipliers, decision threshold ≈0.3) from the system design document (Component 3, Bayesian Role Scorer) and plain-summary. **[verify]** — confirm the exact composite expression and per-tier thresholds before publication.

[^eightfold]: Eightfold AI's match score learning manager bias, and *Kistler v. Eightfold* (FCRA: disclose the score, allow disputes, fix the audit), from "The Eightfold AI Match Score" (uploaded essay, N. Bear Brown). **[verify]** the litigation specifics before publication.
