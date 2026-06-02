# Chapter 13 — The Pipeline Tracker and the Skip Rate

<!-- voice-anchored: root style/VOICE.md. Anatomy: TIKTOC Part 10.
     Sourced from SDD Component 5, plain-summary (skip rate ≥50%, 3-3-2), modes/tracker.md,
     "The 3-3-2 Split" essay, CHAPTER-RESEARCH-MAP. Privacy note: data/ats/ files are private (DATA_CONTRACT). Draft. Never published. -->

**What you'll be able to do:** Log every decision — including the ones where you *don't* apply — produce a daily allocation summary, and read your skip rate as the single best health check on whether the whole engine is working.

## Learning outcomes

- **(Apply)** Maintain `data/ats/applications.md` and produce a daily allocation summary.
- **(Evaluate)** Hold a skip rate ≥ 50% and read it as evidence the filter is working.

## Opening case — flying with no instruments

Imagine running the entire engine — scanning, scoring, framing, applying — and keeping no record of any of it. You'd have no response rate. No way to know whether your Proven-tier applications outperform your Unknown-tier ones. No signal that, three weeks in, you've quietly drifted back to eight hours of clicking *Submit*. You'd be flying with no instruments, feeling busy, learning nothing. The decisions would still happen; you just couldn't see whether any of them worked, or correct course when they didn't.

A search without a tracker isn't a disciplined search with a gap. It's the eight-hour applicant again, now with better tools and the same blindness.

## What you need first

From Chapter 12, the run-inspect-record loop and `RUN_LOG.md`. From Chapter 2, the 3-3-2 allocation and the idea of skip as a first-class action. A privacy note up front, from `DATA_CONTRACT.md`: your tracker files (`data/ats/applications.md`, `pipeline.md`, scan history) contain your real targets and activity. They are **private** — never committed or shared without a privacy review (this becomes a hard rule in Chapter 14).

## The component this chapter rests on

The **Pipeline Tracker**, the engine's fifth component. It logs, for every decision the engine produces, the fields that make a search legible: the company and role, the composite score and tier, the timeline flag, the recommendation — and, crucially, the **outcome**, including a recorded **skip**. Skips are not absences; they are decisions, and a tracker that only logs applications is missing half the data about how well your filter works.

`analyze_patterns.py` (from Chapter 6's ATS subsystem) and the `tracker` mode turn that log into the daily allocation summary.

## Core content — the skip rate as health metric

Here is the counterintuitive heart of the chapter: **the target is a skip rate of at least 50%.** Of the roles the engine evaluates, you should be deciding *not* to apply to half or more.

Sit with why that's the goal and not a failure. If you apply to nearly everything the engine surfaces, your filter is too loose — you've recreated spray-and-pray with extra steps, and the targeted "2 hours" of Chapter 2 has swollen back toward eight. A high skip rate means the filter is doing its job: separating the few roles worth your scarcest resource (a day off the ninety-day clock) from the many that aren't. The skip rate is the dial that tells you whether the whole reallocation principle is actually operating or has quietly collapsed.

So the tracker reads in two directions:

- **Skip rate too low (well under 50%):** the filter is too permissive (or you're overriding it constantly). You're back to volume. Tighten thresholds or trust the score.
- **Skip rate very high (almost everything skipped):** either your targeting upstream is bad (no good roles reaching the scorer — fix Chapters 4–5) or your thresholds are too strict. Either way, the funnel needs attention.
- **Skip rate ≥ 50% with a healthy flow of Applies:** the engine is working as designed.

And the **daily allocation summary** closes the loop back to 3-3-2: it shows how your hours actually split across apply / network / portfolio, so the tracker doesn't just measure targeting quality — it catches allocation drift before a week is gone.

## A runnable command

The tracker is maintained through the `tracker` mode and analyzed with the patterns script:

```bash
# Maintain / update the decision log (tracker mode writes data/ats/applications.md)
npm run ats:scan        # feeds new postings into the pipeline for decisions
# tracker mode: log each decision (company, role, score, tier, timeline flag, outcome incl. skip)

# Analyze tracker/scan/pipeline data for patterns and the allocation summary
python SCRIPTS/ats/analyze_patterns.py
```

The inspectable output is the allocation summary plus your skip rate and per-tier response rates. You read the skip rate first — it's the fastest signal that the method is or isn't operating.

## Worked example — a week of tracker data, read

**Situation.** A week of logged decisions: 30 roles evaluated, 17 skipped, 13 applied; of the 13, 9 were Proven/Likely tier.

**The output inspected.** Skip rate = 17/30 ≈ **57%** — healthy: the filter is doing real work. Per-tier: early response data shows Proven-tier applications drawing replies at several times the rate of the few Unknown-tier ones — evidence the tiering is predictive, not decorative. Allocation summary: apply hours crept to ~3.5/day, networking dipped — a drift warning.

**The decision.** Keep the thresholds (skip rate is healthy), but reclaim an hour from applying back to networking next week (Chapter 2's decision rule).

**The lesson (one sentence):** The skip rate tells you the filter is working; the allocation summary tells you *you* are — and you need both.

**The limit (where this fails):** Early on, response-rate samples are tiny and noisy — don't over-read a 3-application "trend." The skip rate is a process metric, not an outcome metric: a healthy skip rate with zero responses still means something upstream is wrong (bad targeting, weak materials). The tracker measures discipline and targeting quality; it can't, by itself, conjure offers.

## Mid-chapter checkpoint

The reflex to resist: feeling *good* about a low skip rate because "I'm applying to lots of things." That feeling is the volume instinct (Chapter 2) wearing a tracker. A low skip rate is not productivity; it's the filter failing. If your skip rate is 20% and you feel busy and productive, that pairing is exactly the warning sign — busy and unfiltered is the state the whole book exists to end.

## Decision rule — reading your own skip rate

- **< 40%:** too loose. You're drifting to spray-and-pray. Trust the scorer's Skips; tighten thresholds; stop overriding to Apply.
- **40–50%:** borderline. Watch it; check whether your overrides are justified or habitual.
- **≥ 50% with steady Applies and rising per-tier response:** healthy. Hold.
- **≥ ~85% (almost all skips):** the funnel is starved or over-tight. Fix upstream targeting (Chapters 4–5) or loosen slightly.

## What the machine could not know

The tracker knows your skip rate and your response rates. It cannot know that this week's low responses are because of a hiring freeze across your sector, not your method — the numbers would look identical to a targeting failure. It cannot know that the one role you skipped on a borderline score was secretly perfect because of a connection it never saw. It measures the search's vital signs; it cannot diagnose every cause behind them. A healthy skip rate is strong evidence the filter works — but you still read it in the context of a market the tracker can't see.

## Exercises

1. **(Apply) Log a week.** Record a week of decisions in the tracker — every Apply *and* every Skip with its score, tier, and timeline flag — and generate the daily allocation summary.
2. **(Evaluate) Diagnose your skip rate.** Compute your skip rate. Is it too low, too high, or healthy? Name the one change that moves it toward a working range, using the decision rule.
3. **(Evaluate) Tier vs. response.** Once you have enough data, compare response rates across tiers. Does Proven outperform Unknown? Say what that implies about trusting the scorer.

## AI use / verified-data disclosure

The skip rate and response rates come from your own logged decisions (`data/ats/applications.md`) analyzed by `analyze_patterns.py` — verified data about your search, and **private** per `DATA_CONTRACT.md`. The ≥50% skip-rate target and the 3-3-2 allocation are method choices from the system design document and plain-summary; the referral/connection figures behind 3-3-2 carry `[verify]` (Chapter 2). Early per-tier response numbers are illustrative of how to read the tracker, not published results.

## Chapter summary — capabilities gained

You can log every decision including skips, produce a daily allocation summary, and read your skip rate as the engine's health check — recognizing that a low skip rate is a failure, not a productivity win. The numbers can run, the components work, and you can see whether they're working. One question remains, and it's the one the machine can't answer: should you trust all this enough to stake your real search on it?

## Key terms

- **Pipeline Tracker:** the component that logs every decision — score, tier, timeline flag, outcome, including skips.
- **Skip rate:** the share of evaluated roles you decide not to apply to; target ≥ 50% as evidence the filter works.
- **Daily allocation summary:** the read-out of how your hours split across apply / network / portfolio (3-3-2).
- **Process vs. outcome metric:** skip rate measures discipline/targeting; it must be read alongside response rate and market context.

## Bridge question

You can run the engine and read whether it's working. The last question isn't technical at all: you built this, the math is fluent, the dashboard is green — should you trust it enough to stake your job search, and your status, on its decisions?

## Run-log prompt

Record the week's skip rate, the per-tier response rates (with sample sizes), the allocation summary, and the one adjustment you're making next week.
