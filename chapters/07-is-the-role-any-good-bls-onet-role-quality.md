# Chapter 7 — Is the Role Any Good: BLS / O\*NET Role Quality

<!-- voice-anchored: root style/VOICE.md. Anatomy: TIKTOC Part 10.
     Sourced from SCRIPTS/bls/README.md, projects/soc_classification_draft.md, CHAPTER-RESEARCH-MAP.
     Draft. Never published. -->

**What you'll be able to do:** Read a role's quality and labor-market direction from BLS and O\*NET data instead of from its title — and map a real posting to its occupation, then pull the wage and employment estimates that decide whether it belongs on your list.

## Learning outcomes

- **(Evaluate)** Judge a role's quality and trajectory from compact SOC/OEWS features.
- **(Apply)** Map a posting to its SOC occupation and pull its wage and employment estimates.

## Opening case — two titles, two futures

Two postings cross your screen, and both say "Analyst." Same flattering word, same vague glamour. But one of them sits in an occupation where national employment is rising and the wage band is strong and widening; the other sits in an occupation that is quietly shrinking, where the median wage has stalled and the headcount has fallen for three years. The titles are identical. The futures are not.

A job title is marketing. It is chosen by whoever wrote the posting, and it tells you almost nothing reliable about pay, growth, or what you'd actually do. The U.S. labor statistics system, by contrast, classifies the real *occupation* underneath the title — and once you can see the occupation, you can see the future the title was hiding.

## What you need first

From Chapter 6, a live posting at a sponsoring company. From Chapter 3, the contract: role quality is a read from official statistics, not a guess about whether a job "sounds good." You'll need the BLS data files (`data/bls/`, which already contains multiple years of OEWS national estimates) and the Python environment for `SCRIPTS/bls/`.

## The datasets/subsystem this chapter rests on

Two official systems, joined:

- **O\*NET** — the Occupational Information Network: for each occupation, it lists alternate titles, job zones (how much preparation a job needs), and rated ability and skill levels. It answers "what is this work, really?"
- **BLS OEWS** — the Bureau of Labor Statistics' Occupational Employment and Wage Statistics: national employment counts and wage estimates per occupation. It answers "how many of these jobs exist, and what do they pay?"

Both are organized by **SOC code** — the Standard Occupational Classification, a government taxonomy that assigns every kind of work a stable identifier. The subsystem is `SCRIPTS/bls/extract_soc_occupation_table.py`, which builds a **compact table**: one row per occupation joining the O\*NET identity (alternate titles, job zones, ability/skill levels) with the BLS national employment and wage estimates. That compact table is what turns a marketing title into a labor-market fact.

## Core content — SOC classification as the hinge

Everything in this chapter turns on one operation: mapping a posting's title to the correct SOC code. Get the SOC right and the entire compact row — wages, employment, trajectory, skill profile — comes for free. Get it wrong and every downstream number describes a different job than the one you're considering.

This is harder than it sounds, and it is where a model genuinely helps *within* the contract. The model is good at reading a messy posting and proposing a SOC match (it has seen thousands of titles); the data is what confirms or corrects it. So the division of labor is exact: the model proposes the classification, the compact table supplies the verified features, and you judge whether the match is right. (This same SOC-classification problem is the subject of one of the project's research papers, where misclassification is treated as a measurable error rate, not a footnote.)[^soc]

Once the SOC is fixed, role quality stops being a vibe and becomes features you can rank on: Is national employment in this occupation rising or falling? Where does this role's likely pay sit in the wage band? What job zone is it — does it match your preparation? Those features become an input to the composite score in Chapter 9; here, you learn to read them on their own.

## A runnable command

Build the compact table and look up an occupation:

```bash
cd SCRIPTS/bls
python extract_soc_occupation_table.py     # builds the compact SOC/OEWS/O*NET table into data/bls/compact/
```

Then inspect the compact output for your target occupation's row — alternate titles (to confirm the match), job zone, ability/skill levels, and the BLS employment and wage estimates. The inspectable output is that single compact row: the occupation behind the title, with its numbers attached.

## Worked example — a title mapped to its future

**Situation.** A posting titled "Data Analyst" at a Likely-tier, live-posting startup.

**The command run, the output inspected.** The model proposes a SOC match; you confirm it against the compact table's alternate-title list. The matched row shows: national employment in the thousands and rising over recent OEWS years, a wage band whose median comfortably clears your floor, a job zone consistent with a master's-level entrant.

**The contrast.** A second "Analyst" posting maps to a different SOC whose employment has declined across the same OEWS years and whose median wage has flattened.

**The decision.** The first role stays on the list with confidence; the second is downgraded — same title, worse occupation.

**The lesson (one sentence):** Rank roles by the occupation underneath the title, because the title was written to attract you and the occupation was measured to describe reality.

**The limit (where this fails):** National OEWS estimates are national and lagging — they don't capture this company's actual pay, your city's local market, or a brand-new role type the SOC taxonomy hasn't caught up to. And a wrong SOC match silently poisons every feature. Role quality is a strong directional read, not a salary quote.

## Mid-chapter checkpoint

The error to catch: accepting the model's SOC classification without checking it against the alternate-title list. The model is fluent and will confidently map "Growth Analyst" to whatever seems closest — and if it's wrong, you'll then read the wages and trajectory of an occupation you're not actually considering. Always confirm the match against the compact row's alternate titles before you trust the numbers hanging off it. This is the verified-data contract applied to classification.

## Decision rule — does role quality keep it on the list?

- **Keep / upgrade:** SOC confirmed, employment stable-to-rising, wage band clears your floor, job zone matches your preparation.
- **Downgrade:** declining employment or a stalled wage band, even with a strong title.
- **Re-classify before deciding:** the alternate-title list doesn't clearly contain your posting's title — fix the SOC match first; everything downstream depends on it.

## What the machine could not know

The compact table knows the national wage band for an occupation. It cannot know that *this* startup pays at the top of it because it just raised, or at the bottom because it's pre-revenue. It knows employment is rising nationally; it cannot know the one team you'd join is being wound down. And the SOC taxonomy itself lags reality — it may have no clean code for a genuinely new kind of work, so the "best match" understates a frontier role. Official statistics give you the occupation's gravity; the specific role's orbit around it is yours to judge.

## Exercises

1. **(Apply) Build and look up.** Generate the compact table and pull the rows for two of your target roles. Record SOC code, employment trend, and wage band for each.
2. **(Evaluate) Rank three.** Take three real postings, map each to its SOC, and rank them by quality-and-direction, citing the specific features (not the titles) behind the ranking.
3. **(Analyze) Catch a misclassification.** Find one posting whose obvious title maps to a SOC that the alternate-title list says is wrong, and show the correct match.

## AI use / verified-data disclosure

Employment and wage figures come from BLS OEWS files (`data/bls/`) via `SCRIPTS/bls/`; occupation identity comes from O\*NET. The model is used only to *propose* a SOC classification, which is then confirmed against the compact table's alternate-title list — a model judgment explicitly checked against data, per the contract. The SOC-misclassification research paper is cited as a parallel project, not as a source of numbers used here; its figures carry `[verify]`/`[TO DO]` placeholders in draft.

## Chapter summary — capabilities gained

You can map a posting's title to its real SOC occupation, build and read the compact table, and judge a role's quality and trajectory from official employment and wage features rather than the title's marketing. Four facts now exist about every role — sponsorship, liveness, quality, and (with your CV) fit. But a perfect role you can't accept in time is no role at all.

## Key terms

- **SOC code:** the Standard Occupational Classification identifier for the real occupation underneath a job title; the hinge of the whole chapter.
- **O\*NET:** the occupational database of alternate titles, job zones, and ability/skill ratings — "what is this work?"
- **BLS OEWS:** national employment and wage estimates per occupation — "how many exist and what do they pay?"
- **Compact table:** the joined O\*NET + OEWS row per occupation produced by `extract_soc_occupation_table.py`.

## Bridge question

You now know whether a role sponsors, is real, and is worth having. But none of it matters if the hiring process would outrun your work authorization. How do you put the clock itself into the decision?

## Run-log prompt

Record each target's confirmed SOC code, the employment trend and wage band you read, and any title you had to re-classify against the alternate-title list.

[^soc]: SOC classification (and its measurable misclassification rate) is the subject of `projects/soc_classification_draft.md` + `_methods.md` in this repository — a parallel research track. Its quantitative results contain `[TO DO]` placeholders and must not be cited as final numbers. **[verify]**
