# AI Use Disclosure — Setup Exercise: Your Search's Personal Layer

**Course:** INFO 7375 — Computational Skepticism for AI
**Student:** Gaurav Bakale
**Date:** 2026-06-25

> SKELETON — fill the [FILL] items. The course rubric is explicit: the "What the AI could
> not do" field must name a **specific instance** (one thing the agent got wrong about *my*
> situation that required *my* knowledge to catch) — a judgment, not a workflow description.
> If the course provides an official disclosure template/Canvas form, mirror these answers into it.

## Tools used
- **Claude Code** (Anthropic) — agent that read my résumé data and drafted the `search/` layer.
- Models / anything else: [FILL if applicable].

## What the AI did (execution — extract / draft / format)
- Extracted `search/resume.json` from my structured résumé data (`~/Documents/resumes/master/`), as fields not prose.
- Drafted `search/profile.yml` (freelance-framed) and `search/gaps.md` (gap table with evidence) from my skills + my own scraped gig postings.
- Reconciled the repo's privacy guard so `search/resume.json` is committable while `private/` protections stay intact.

## What I did (judgment — attest / correct / sign)
- Ran the attestation pass on `resume.json`: caught [FILL — number] errors and signed `attested: true`.
- Set the `CONFIRM` fields in `profile.yml` and corrected [FILL — which field].
- Killed one gap row and rewrote one in my own words in `gaps.md`.
- Answered the Step-4 verification questions honestly (see `logs/RUN_LOG.md`).

## What the AI could NOT do (the specific instance I had to catch)
[FILL — ONE concrete thing the agent got wrong about *my* situation that only my knowledge could
catch. Example shape: "The draft listed 'RLHF' and 'Computer Vision' as skills because they were in
my master skills file, but I have not actually built either to a level I could defend in an interview —
the agent had no way to know that; I removed them." Make it specific and true, not "AI drafted, I reviewed."]

## How I verified
- `node scripts/conformance.mjs search/resume.json search/profile.yml` → conforms (machine check).
- `npm run doctor` → no PII committed.
- Evidence in `gaps.md` traces to real Remotive posting URLs and to `scripts/score/gig-scorer.mjs`; anything I couldn't ground, I killed or moved to `private-notes.md`.
