# Chapter 14 — The Build and the Honest Run

<!-- voice-anchored: root style/VOICE.md. Anatomy: TIKTOC Part 10.
     Sourced from boondoggle-score.md (Gru/Minion, build phases), SDD, modes/, DATA_CONTRACT.md,
     "Boondoggling: You Are the Conductor" essay, CHAPTER-RESEARCH-MAP. Hard chapter (TIKTOC Risk 1,3).
     Draft. Never published. -->

**What you'll be able to do:** Build the whole engine with AI doing what it is superhuman at and you doing what is irreducibly human — then execute a first real run on a live search and write the account that closes the loop this book opened.

## Learning outcomes

- **(Create)** Execute a first real run of the full engine on a live search.
- **(Evaluate)** Audit the engine's probability math for sense — catch an error the fluency would otherwise hide.
- **(Create)** Write the "what the machine could not know" account that answers Chapter 1's question.

## Opening case — the conductor's score

Think of an orchestra. The musicians are extraordinary — each can execute passages no conductor could play. But the conductor never touches an instrument. The conductor decides what the piece *means*, hears the wrong note before the score confirms it, and holds a hundred parts toward one intention. Remove the musicians and nothing gets played. Remove the conductor and you get a hundred fluent parts that don't add up to music.

That is the shape of building this engine. There is a **Minion part** — the exact prompts for what the AI builds: scaffolding, schemas, the scoring formulas, the boilerplate, the glue. The AI is superhuman at this; left to itself it produces clean, confident, internally consistent code in minutes. And there is a **Gru part** — the human decisions the AI cannot make: what your visa situation actually requires, whether the probability math makes sense, the domain knowledge the model can't have, and the integration of five components into one system you will stake your job search — and your status — on.[^boondoggle]

The whole book has been preparing you to be the conductor. This chapter is where you pick up the baton.

## What you need first

Everything. All five components (Chapters 4–11), the runtime and modes (Chapter 12), the tracker and skip rate (Chapter 13), and above all the discipline from Chapters 1 and 3: distrust fluency, run the script, read the audit, label every claim. You'll also need a working AI coding environment (Claude Code or equivalent) and your eight intake answers (Chapter 8) — they are first-class constraints on the build, not setup trivia.

## Core content — the build, and the boundary made operational

### The build phases

You don't ask the AI to "build a job-search engine." You conduct it through phases, each with a clear handoff:

1. **Foundation** — the directory layout, the data contract, the intake questions, the environment. The Minion scaffolds; the Gru decides what the eight intake answers must constrain.
2. **Core skeleton** — the data structures and the five component stubs. Minion writes the schemas; Gru confirms they encode *your* situation (visa dates, field, STEM eligibility).
3. **Integration** — wiring the components into the composite scorer (Chapter 9) and the modes (Chapter 12). Minion connects; Gru checks that liveness and timeline act as gates, not votes.
4. **Full feature build** — the pipelines (SEC, ATS, BLS), the framing generator, the résumé renderer. Minion builds each; Gru verifies each against its real dataset.
5. **Hardening** — error handling, the verification scripts (`ats:verify`), the audits. Minion implements; Gru decides what "correct" means and what must never silently fail.
6. **Release** — the first real run.

The **handoff condition** is the most important element of the whole score: at each phase, what must be true before the next phase begins? "The scan returns real postings with provenance" is a handoff condition. "It looks done" is not. A handoff you can't state precisely is a phase you haven't actually finished.

### The boundary, made operational

This is where the abstract idea from Chapter 1 — execution versus judgment — becomes a checklist you can run. **The model can verify that code is internally consistent. It cannot verify that the code is grounded in the specific reality at hand.** It will produce a sponsorship formula that compiles and a timeline factor that returns a number; it cannot know whether the weights match *your* binding constraint or whether the dates are yours. So the irreducibly human moves, made concrete:

- **Plausibility auditing** — reading the output and asking "could this be right?" *before* trusting the verification. The model said the composite is 0.7; does 0.7 make sense given a non-sponsor? (Chapter 9 says no — catch it.)
- **Problem formulation** — deciding what the engine is even for, and re-engaging it when an audit finding shifts the goal.
- **Interpretive judgment** — supplying the meaning the model can't: that an "Unknown" tier is a coverage gap, not a verdict; that a skipped role had a connection the data never saw.
- **Orchestration** — holding all of it toward one end: a job, landed in time, honestly.

## A runnable command — the first real run

Release is not a demo. It is the engine, on your actual search:

```bash
# Stand up and verify the engine end to end
npm run ats:scan        # real postings from real companies
npm run ats:liveness    # classify them live/ghost
npm run ats:verify      # confirm pipeline data is consistent
# then, in the engine: pipeline → oferta on real roles → tracker logs every decision
python SCRIPTS/ats/analyze_patterns.py   # skip rate + allocation summary (Chapter 13)
```

The inspectable output is a batch of real, logged decisions — Apply/Consider/Skip on actual roles, each factor sourced, each decision in the tracker, a skip rate you can read.

## Worked example — the instructor's own run, with checkpoints called out

**Situation.** Standing up the full engine and producing a first batch of real decisions.

**The run, with the human checkpoints.** The build proceeds through the phases; at integration, a plausibility audit catches that a draft composite was treating timeline as a weighted vote instead of a multiplier — a role that should have zeroed on the clock was scoring "Consider." That is exactly the kind of error fluency hides: the code ran, the number looked reasonable, and it was wrong in a way only domain judgment catches. Fixed. The first batch then runs: 30 roles, ~57% skipped, the Applies concentrated in Proven/Likely tiers with beatable timelines.

**The decision.** Apply to the handful that survived every gate; skip the rest without guilt; send the freed time to networking and portfolio (Chapter 2).

**The lesson (one sentence):** Building the engine doesn't remove the judgment — it relocates it from doing the work to deciding whether the work is right.

**The limit (where this fails):** A first real run can be wrong in ways no audit catches — a systematically miscalibrated fit score, a dataset stale across the board, a weight that's defensible but suboptimal for you. The engine reduces the search's error rate; it does not eliminate it. And it stakes something real — your time, and decisions touching your status — so the honesty rules below are not optional polish.

## Mid-chapter checkpoint — the ethics gate

Before any first real run, two hard rules, both non-negotiable:

1. **Privacy.** Your `data/ats/` files — `applications.md`, `pipeline.md`, scan history — contain your real targets and activity, and your environment may contain credentials. Per `DATA_CONTRACT.md`, these are **private**: review for privacy and size before *any* commit, and never publish them. Building in public does not mean exposing your job search.[^privacy]
2. **Honesty.** Everything from Chapter 10 holds at the system level: accurate framing, no fabricated credentials, no invented metrics, no misrepresented status. An engine that optimizes your search by shading the truth is the failure mode this book exists to prevent — fluency in the service of a false impression.

If a run would breach either gate, you don't run it. The gate is the conductor's first responsibility.

## Decision rules — Minion or Gru?

- **Give it to the Minion (AI executes):** scaffolding, schemas, boilerplate, formula implementation, glue code, documentation drafts — anything where correctness is checkable and the domain reality is already pinned.
- **Keep it for the Gru (you decide):** what the weights should be for your constraint, whether a score is plausible, what an "Unknown" means here, whether the math makes sense, every privacy and honesty call, and the final go/no-go on a real decision.
- **The test:** *can the model verify this against reality, or only against itself?* If only against itself, it's yours.

## What the machine could not know

This is the box the whole book was built to fill, so fill it honestly. The engine knows what it measured: funding, filings, postings, occupations, dates. It could not know that the founder of a skipped startup is your former lab partner. It could not know that its own fit score missed the one project that makes you perfect for a role. It could not know that you'd rather take a lower-scored job you believe in. It could not know whether staking your search on its math is wise — that judgment was never in the data. You built a machine that is superhuman at execution precisely so that you could spend your scarce, human attention on the questions it cannot reach. That was the point all along.

## Exercises

1. **(Create) Stand it up.** Build your own engine through the phases and make **ten real, logged decisions** on live roles. Record each with its sourced factors in the tracker.
2. **(Evaluate) Audit for a hidden error.** Take one of the engine's scores and audit the math for a mistake the fluent output would otherwise hide (a gate treated as a vote, a miscalibrated weight, a stale input). Report what you found or how you confirmed it was sound.
3. **(Create) Write the honest run.** Write the "what the machine could not know" account for your run: what would have to be true for these decisions to be trusted, and what are you now responsible for once they leave the screen?

## AI use / verified-data disclosure

The build model (Gru/Minion, the phases, the handoff condition) is from the project's build score and the "Boondoggling: You Are the Conductor" essay. The runtime commands are real. The privacy constraint on `data/ats/` files is a hard rule from `DATA_CONTRACT.md` (TIKTOC Risk 1). The honesty rules carry over from Chapter 10 (TIKTOC Risk 3) and require the same legal/ethics review owner before publication. No real personal data appears in this chapter; the worked run is structural.

## Chapter summary — capabilities gained

You can conduct the build of the full engine — assigning execution to the AI and reserving judgment for yourself — execute and audit a first real run, and write the honest account that answers the question Chapter 1 asked. You have, in other words, the working method the introduction promised: a way to use AI for everything it's superhuman at while keeping the human competence the whole search depends on.

## Key terms

- **Minion part / Gru part:** the split between what the AI executes (checkable against itself) and what the human decides (checkable only against reality).
- **Handoff condition:** the precisely stated thing that must be true before a build phase is done — the score's most important element.
- **Plausibility auditing:** judging whether an output could be right *before* trusting its verification.
- **The ethics gate:** the privacy and honesty rules that must pass before any real run.

## Closing return

Return to the polished artifact from Chapter 1 — the clean recommendation that arrived in three confident seconds. You know now what to do with it. Do not ask whether it is impressive. Ask what would have to be true for it to be trusted. Ask what the machine could not know. Ask what you are now responsible for. Then begin.

## Bridge question

There is no next chapter — this is the one the book was climbing toward. The bridge now runs outward: you have the engine and the method, and a live search on a real clock. The only remaining question is the one you'll answer with your own decisions. What will you stake on it, and what will you keep for yourself to judge?

## Run-log prompt

Record the build phases completed with their handoff conditions, the first real run's batch (decisions, skip rate), one math error you audited for, and your written "what the machine could not know" account.

[^boondoggle]: The conductor model — Gru (human orchestration) / Minion (exact AI prompts), the Boondoggle Score, plausibility auditing, and the handoff condition — is from `projects/the-reallocation-engine-boondoggle-score.md` and "Boondoggling: You Are the Conductor" (uploaded essay, N. Bear Brown).

[^privacy]: Privacy constraint on `data/ats/applications.md`, `pipeline.md`, and scan history (review privacy and size before committing; never publish) from `DATA_CONTRACT.md` (TIKTOC Risk 1 — BLOCKER for any public build).
