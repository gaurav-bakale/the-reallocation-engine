# Chapter 12 — Modes: Operating the Engine

<!-- voice-anchored: root style/VOICE.md. Anatomy: TIKTOC Part 10.
     Sourced from modes/ (README, _shared, scan/pipeline/oferta/tracker/pdf etc.), SDD, CHAPTER-RESEARCH-MAP.
     Draft. Never published. -->

**What you'll be able to do:** Run the engine through its modes as a verified-data runtime — scan, pipeline, evaluate, render — logging every step, and tell an active mode that runs real scripts from a draft mode that has quietly become "ask the model what it thinks."

## Learning outcomes

- **(Apply)** Operate a `scan → pipeline → oferta` sequence end to end.
- **(Analyze)** Distinguish active modes from draft modes, and check whether a mode calls real scripts before trusting it.

## Opening case — the mode that stopped running scripts

You run a mode called `oferta` to evaluate a role. It returns a confident assessment: sponsorship looks strong, fit is good, you should apply. It reads exactly like the verified output you've trusted all book. But under the hood, something has changed: this run never called the sponsorship pipeline, never read an audit. It asked a language model what it thought, and dressed the guess in the format of a finding. You can't tell from the output — that's the whole danger. The fluent surface from Chapter 1 has come back, this time wearing the engine's own uniform.

The difference between a mode that *runs a script and reads an audit* and a mode that *quietly turns into a chat prompt* is the difference between the entire method working and the entire method failing silently. Act Three begins by learning to tell them apart.

## What you need first

All five components (Chapters 4–11) and the verified-data contract (Chapter 3). You'll work in the `modes/` directory and write to `RUN_LOG.md`. Every mode opens by loading `modes/_shared.md` — the contract — so the runtime is supposed to be honest by construction. Your job is to verify that it actually is, run by run.

## The subsystem this chapter rests on

The `modes/` directory is the engine's runtime: a set of named operations you invoke, each declaring what scripts it calls and what it logs. They fall into two groups.

- **Active modes** — the ones that do verified work: **`scan`** (detect ATS, pull postings), **`pipeline`** (run the scoring pipeline), **`oferta`** (evaluate one role/offer into a composite), **`tracker`** (log decisions; Chapter 13), **`pdf`** (render the ATS-safe résumé; Chapter 11). These call real scripts and read real audits.
- **Draft / helper modes** — scaffolds that may *not* yet call scripts: e.g., `apply`, `contacto`, `deep`, `followup`, `interview-prep`, `ofertas`, `project`, `training`. They can be useful, but until you've confirmed a draft mode runs scripts and logs, you treat its output as a model judgment, not a finding.

This taxonomy is itself an application of the contract: a mode is trustworthy only insofar as it can show its work.

## Core content — the run-inspect-record loop

Operating the engine is one loop, repeated:

1. **Run** an active mode against a real target.
2. **Inspect** its output *and its provenance* — did it call the script? Is there an audit? Which numbers came from data and which are judgments?
3. **Record** the run in `RUN_LOG.md` — what you ran, what it returned, what you decided.

The loop is deliberately boring, and the boredom is the safety. Each pass leaves a trace, so a decision can be reconstructed and questioned later (the contract's "run log as memory" from Chapter 3). The moment you skip the inspect step — accepting a mode's output because it looks right — you've reopened the fluency trap.

## A runnable command — a full sequence

Take one role from URL to evaluation:

```bash
# 1. scan — detect the ATS and pull the company's current postings
npm run ats:scan

# 2. pipeline — score the pulled roles (sponsorship, fit, liveness, timeline)
#    (run via the pipeline mode / auto-pipeline)

# 3. oferta — evaluate one role into a composite + Apply/Consider/Skip
#    (oferta mode; returns the sourced composite from Chapter 9)

# 4. verify — confirm the pipeline's data is internally consistent
npm run ats:verify
```

The inspectable output is the chain: a scan result (postings + ATS), a pipeline scoring pass, an `oferta` composite with sourced factors, and a verification audit confirming consistency. You read each link's provenance, not just its conclusion.

## Worked example — one target, fully operated

**Situation.** A single role URL at a Likely-tier startup.

**The sequence run, each step logged.** `scan` detects Lever and pulls the posting. The `pipeline` pass scores it — sponsorship from the join, fit from CV-vs-JD (labeled judgment), liveness live, timeline factor 0.8. `oferta` returns a composite above threshold → Consider. `ats:verify` confirms the underlying data is consistent. Each step gets a `RUN_LOG.md` line: command, key output, provenance.

**The decision.** Consider → you compare it against your other Considers (Chapter 13's tracker) before spending an application slot.

**The lesson (one sentence):** Operating the engine is running active modes in a loop and inspecting provenance at every step — the runtime is only as honest as your habit of checking it.

**The limit (where this fails):** Modes can drift. A draft mode added later, or an active mode edited, can stop calling scripts without announcing it. The runtime doesn't enforce honesty on its own — your inspect-and-log habit does. Automation makes the loop fast; it does not make it self-policing.

## Mid-chapter checkpoint

The error that ends the method quietly: trusting a mode by its *name* rather than its *behavior*. "It's called `oferta`, so it must be evaluating with real data." Names are labels; behavior is evidence. Before you trust any mode — especially a draft one — confirm it calls the script and writes the log on *this* run. A mode that used to be active can become a chat prompt with one careless edit, and the output will look identical.

## Decision rule — trust this mode's output?

- **Active mode, provenance visible (script called, audit present):** treat as a finding; record and act.
- **Draft/helper mode, or provenance absent:** treat as a model judgment; useful for drafting, not for a skip/apply decision, until you verify it runs scripts and logs.
- **Any mode whose output you can't trace:** distrust the output, not your confusion (Chapter 9's rule), and re-run with inspection.

## What the machine could not know

The runtime can execute and log. It cannot know that today's scan hit a stale cache and pulled a posting that closed yesterday, or that a model-judgment fit score is confidently wrong for a role that needs exactly your unusual background. The loop guarantees you *can* see provenance; it cannot guarantee you *will* draw the right conclusion from it. The engine runs the components; the decision about whether a given run is trustworthy enough to act on remains the human's — every single time.

## Exercises

1. **(Apply) Run a full sequence.** Take one real role and run `scan → pipeline → oferta`, logging each step in `RUN_LOG.md` with its provenance. Confirm with `ats:verify`.
2. **(Analyze) Audit a draft mode.** Pick one draft/helper mode and determine whether it calls real scripts and logs. Write your verdict: finding-grade or judgment-grade?
3. **(Analyze) Catch a drift.** Describe how you would notice if an active mode stopped calling its script — what in the output or the log would tip you off?

## AI use / verified-data disclosure

Active modes call real scripts (`SCRIPTS/ats/`, the scoring pipeline) and read audits; their outputs are findings. Draft/helper modes may rely on model judgment and are labeled as such until verified. The active/draft taxonomy is from the `modes/` directory and the system design document. No mode's output should be treated as verified without visible provenance — that is the chapter's whole point.

## Chapter summary — capabilities gained

You can operate the engine as a verified-data runtime — running active modes in the run-inspect-record loop, logging every step, and separating findings from judgments by provenance rather than by a mode's name. Running the engine produces decisions. Decisions are only worth making if you can see whether they worked.

## Key terms

- **Mode:** a named engine operation that declares the scripts it calls and what it logs.
- **Active vs. draft mode:** active modes run verified scripts (scan, pipeline, oferta, tracker, pdf); draft modes may not yet — verify before trusting.
- **Run-inspect-record loop:** run an active mode, inspect output *and provenance*, record in `RUN_LOG.md`.
- **Provenance:** the traceable origin of an output — which script, which audit — that makes it a finding rather than a guess.

## Bridge question

The engine runs and produces decisions. But a decision you don't track is a decision you can't learn from. How do you log every choice — including the skips — and read the result as a health check on the whole search?

## Run-log prompt

Record the full `scan → pipeline → oferta` sequence: the command at each step, the key output, its provenance, and the resulting recommendation.
