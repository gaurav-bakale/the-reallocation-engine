# Chapter 3 — The Verified-Data Contract

<!-- voice-anchored: root style/VOICE.md. Anatomy: TIKTOC Part 10.
     Thin-pantry: sourced from modes/_shared.md, modes/README.md, DATA_CONTRACT.md,
     CHAPTER-RESEARCH-MAP, and "What Is Computational Skepticism" / "The Limits of AI" essays.
     Draft. Never published. -->

**What you'll be able to do:** State the one rule that governs every later chapter — run the script and read the audit *before* you prompt — and apply it to a real decision, labeling which part of an answer came from data and which from a model's judgment.

## Learning outcomes

- **(Understand)** State the prime directive and name the system's sources of truth.
- **(Apply)** Run one mode end-to-end and record it in `RUN_LOG.md`.
- **(Analyze)** Split a mixed claim into "from the data" and "from the model," labeling each.

## Opening case — two ways to answer one question

You want to know whether a particular Cambridge biotech sponsors work visas. There are two ways to find out.

The first: you ask a capable language model. In three seconds it tells you, in fluent and well-organized prose, that "as a mid-size biotech in a competitive talent market, this company likely sponsors visas for specialized roles, particularly in research." It sounds like a person who knows. It cites nothing, because it is not reading anything — it is producing the most plausible-sounding sentence, and plausible is not the same as true.

The second: you query the public record. The Department of Labor publishes every Labor Condition Application an employer files to hire a foreign worker. The U.S. Citizenship and Immigration Services H-1B Employer Data Hub publishes approvals and denials by company and year. You run a script. It returns a number: this company filed fifteen LCAs in the last three years and had an 85% H-1B approval rate. Or it returns: zero filings, ever.

One of those answers is fluent. One of them is *true*. The whole discipline of this book is the decision, made in advance and held without exception, to build on the second.

## What you need first

From Chapter 1, the instinct that fluency is not evidence. From Chapter 2, the reason it matters here: you are going to *skip* real opportunities on the strength of this filter, so the filter cannot be a guess. A claim you would stake your search on has to rest on records.

## The prime directive

Every mode in this system opens by reading a shared contract, `modes/_shared.md`, and that contract states one rule above all others. I will give it to you in the plainest form:

> **Run the script and read the audit before you prompt. Never invent a count, a rate, or a coverage number.**

That is the verified-data contract. It sounds modest. It is the entire spine of the book. The reason a language model is dangerous as a *source* — as opposed to a tool — is precisely the thing it is best at: it will always give you a number, and the number will always sound reasonable, and it has no idea whether the number is real. The contract removes the model from the role of source and keeps it in the role of assistant. Counts and rates come from data. The model helps you *read* the data; it does not get to make the data up.

### Where truth lives in this system

The contract names specific sources of truth, and you should know them before you trust any output:

- **`DATA_CONTRACT.md`** — defines what data exists, where it lives, and which files are private (your own application records and credentials, which never get committed or published without a privacy review).
- **The `SCRIPTS/` subsystems** — `SCRIPTS/sec/` (funding), `SCRIPTS/ats/` (postings and liveness), `SCRIPTS/bls/` (role quality). These produce the numbers.
- **The `*-audit.md` reports** — written records of what a pipeline actually did on a given run: how many rows, what coverage, what was dropped. You read the audit, not your hopes.
- **`RUN_LOG.md`** — the system's memory. Every run leaves a trace, so that a decision made today can be reconstructed and questioned tomorrow.

This is the same ethic that good empirical work has always demanded, transplanted into a job search: state your method, show your coverage, and let a claim be checked. A fluent answer that cannot be checked is not a finding. It is a guess wearing the costume of one.

## A runnable command

The smallest honest thing you can do is run one verification and read what it reports. The repository ships a pipeline-verification script for exactly this:

```bash
# From the project root — confirm the ATS pipeline's data is internally consistent
npm run ats:verify
```

This calls `SCRIPTS/ats/verify-pipeline.mjs`, which checks the tracker and scan data for consistency and prints what it found. The point of running it now, before you understand every component, is to feel the difference between *being told* the data is fine and *seeing the check pass*. The output is the audit. The audit, not your confidence, is the evidence.

## Worked example — the same question, both ways, side by side

**Situation.** The Cambridge biotech from the opening.

**The command run, and the output inspected.** You run the sponsorship pipeline against the DOL LCA and USCIS H-1B records (built fully in Chapter 5). It returns: 15 LCA filings over three years; H-1B approval rate 85%; most recent filing within the last year.

**The model's version, for contrast.** Asked cold, the model said "likely sponsors… particularly in research." No number. No year. No source.

**The decision.** The two answers happen to agree in direction — but only one of them can be *defended* to a skeptical version of yourself, and only one would survive being wrong. You record the verified numbers and the source; you discard the fluent paragraph.

**The lesson (one sentence):** When data and a model's guess agree, trust the data — and when they disagree, the disagreement is the most useful thing on the screen.

**The limit (where this fails):** The records have coverage gaps. A company can sponsor and not appear in the window your data covers; a name can fail to match because "Google LLC," "Google Inc," and "Alphabet" are three strings for one firm. The contract does not promise the data is complete. It promises you will not paper over the gaps with invention — you will label them as gaps.

## Mid-chapter checkpoint

Here is the error that catches almost everyone, including me. You run the script, you get a real number, and then — while interpreting it — you let the model fill a small hole: "the script found 15 filings; the model says that's strong for a company this size." Did the model *count* anything? No. It estimated. The moment an unsourced number re-enters through interpretation, the contract has been quietly broken. Watch the seam between the data and the reading of it. That seam is where fluency sneaks back in.

## Decision rule — data claim vs. model judgment

For any sentence in an output, ask: *could this have been produced by counting records?*

- **Yes** → it is a **data claim**. It must trace to a script output or an audit. If it can't, it is not allowed to stand.
- **No** → it is a **model judgment** (a reading, a framing, a suggestion). It is allowed — but it must be *labeled as judgment*, never dressed as a fact.

Every later chapter applies this one rule. Sponsorship tier: data. "This is a strong tier for your field": judgment. Keep them visibly separate.

## What the machine could not know

The contract guarantees the numbers are real. It cannot tell you whether the *right* numbers were measured. The data knows a company filed fifteen LCAs; it does not know that those filings were all for one senior role they will never offer a new graduate. It knows an approval rate; it does not know the company was just acquired last month and the policy changed yesterday. Verified data is a floor, not a ceiling — it stops you from building on fiction, and then it hands the situated judgment back to you. A 94%-accurate system can still harm someone if no one asks what it failed to measure.[^limits] The contract makes you that someone.

## Exercises

1. **(Apply) Run and log.** Run `npm run ats:verify` (or any mode against real data). Read the output. Write a `RUN_LOG.md` entry: what you ran, what it reported, and one thing the audit told you that you would otherwise have assumed.
2. **(Analyze) Split the claim.** Take a mixed statement — e.g., "This well-funded startup probably sponsors and would be a great culture fit." Break it into its data claims and its model judgments. Label each. Note which ones you currently have no source for.
3. **(Apply) Find a coverage gap.** Name one company you believe sponsors that might *not* appear in public LCA/H-1B data, and say why (timing, name mismatch, role type). Write how you would label that uncertainty rather than guess past it.

## AI use / verified-data disclosure

This chapter is itself the disclosure policy for the whole book. Method judgments here (what counts as a source of truth, the seam where fluency re-enters) are the author's framework. The verification command is real and ships in the repo. The "94%-accurate system, three patients harmed" illustration is drawn from an uploaded essay and is used as a parable, not a cited case study — see footnote.

## Chapter summary — capabilities gained

You can state the prime directive, name the system's sources of truth, run one verification end-to-end and log it, and split any mixed claim into data and judgment with each labeled. You now have the rule that lets you trust a filter enough to skip on it. The next three chapters build the first sources of truth the filter will read — starting with the money.

## Key terms

- **Verified-data contract:** run the script and read the audit before you prompt; never invent counts, rates, or coverage.
- **Source of truth:** a script output or audit a claim can be traced to — as opposed to a model's plausible sentence.
- **Audit (`*-audit.md`):** the written record of what a pipeline actually did on a run; the evidence you read instead of trusting.
- **Data claim vs. model judgment:** could it have been produced by counting records? If yes, it must trace to data; if no, it must be labeled judgment.

## Bridge question

The contract is set, and it demands a source of truth to read. So build the first one: of all the companies in the world, which ones just got the money that forces them to hire?

## Run-log prompt

Record the verification you ran, its reported output, and one assumption the audit corrected. Note any claim you currently cannot source — that list is your honest starting debt.

[^limits]: The "94%-accurate clinical system that still harmed three patients / skepticism as the safety mechanism" illustration is from "The Limits of AI: What the Tools Cannot Do" (uploaded essay, N. Bear Brown). Used illustratively. **[verify]** if cited as a real case.
