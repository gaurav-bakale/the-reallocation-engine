# Chapter 8 — The Visa Timeline Manager

<!-- voice-anchored: root style/VOICE.md. Anatomy: TIKTOC Part 10.
     Sourced from SDD Component 1, boondoggle-score intake questions, USCIS OPT rule (verified Ch1),
     CHAPTER-RESEARCH-MAP. Draft. Never published. -->

**What you'll be able to do:** Compute a visa timeline factor between 0 and 1 that zeroes out any role whose hiring process would outrun your work authorization — and decide, with dates on the page, which high-fit roles you must skip on the clock alone.

## Learning outcomes

- **(Apply)** Compute the 0–1 timeline factor from OPT, STEM OPT, and H-1B dates.
- **(Evaluate)** Decide skip-regardless when the expected start exceeds your authorization.

## Opening case — the offer you could never accept

A student has three months of work authorization left. They find a role that fits perfectly — sponsoring company, live posting, strong occupation — and they apply. They make it through. Four months of interviews, take-homes, and panels later, an offer arrives. And it is worthless, because the start date is past the day their authorization ended. They spent the scarcest months of their search chasing an offer that the calendar had already ruled out before they sent the first email.

No filter in Chapters 5 through 7 would have caught this. Sponsorship was real, the role was live, the quality was high. The thing that killed it was time — and time is the one constraint that is *yours specifically*, invisible to a company and to every scorer that doesn't know your dates.

## What you need first

From Chapter 1, the ninety-day fact: on post-completion OPT you may accrue no more than **90 cumulative calendar days of unemployment** (150 with a STEM OPT extension), and exceeding it terminates your status with no grace period.[^opt] From Chapter 3, the contract — here it applies to *your own dates*, which you must enter accurately, because this is the one input the public record cannot supply.

## The component this chapter rests on

This is the **Visa Timeline Manager**, the first of the engine's five components and the only one whose data comes entirely from you. Its job is to convert your authorization situation into a single number — a **timeline factor between 0 and 1** — that the composite scorer (Chapter 9) multiplies into every role's score.

The factor's foundation is the set of **eight intake questions** the system asks at setup (also the starting point of the build in Chapter 14): your visa type, key dates, STEM eligibility, field, and so on. These are first-class constraints, not profile decoration — they are what makes a score *yours* rather than generic.

## Core content — what the factor encodes

Three windows govern an international student's runway:

- **OPT** — the post-completion work authorization, with its 90-day unemployment ceiling.
- **STEM OPT extension** — if your degree qualifies, a 24-month extension (and a higher, 150-day aggregate unemployment ceiling). Eligibility changes the math entirely.
- **The H-1B lottery window** — the annual registration and its timing, which determines whether a path past OPT even exists with a given employer in a given year.

The timeline factor compresses these into one multiplier:

- **Factor = 0** — the role is *skip-regardless*. If a role's expected time-to-start exceeds your remaining authorization, no amount of fit, sponsorship, or quality can rescue it. Zero times anything is zero — and that is the correct answer, because an offer you can't accept is not an opportunity.
- **Factor near 1** — comfortable buffer: the expected hiring timeline finishes well inside your authorization with room to spare.
- **Factor between 0 and 1** — **buffer-based scaling**: as the expected start date creeps toward your cliff, the factor falls, gently penalizing roles that are *probably* fine but cut it close, so that — all else equal — the engine prefers the role you can safely land.

The crucial design choice is that the factor is a **multiplier**, not an addend. It cannot be outvoted by a great fit. That is deliberate: the clock is a hard constraint, and a hard constraint belongs in the math as a gate, not as a vote.

## A runnable command

The timeline factor is computed by the Visa Timeline Manager from your intake answers. In the engine's runtime (Chapter 12), it runs as part of scoring a role; conceptually:

```text
factor = timeline_factor(
    auth_type        = "OPT",            # or "STEM-OPT"
    auth_end_date    = "2026-08-30",     # your remaining authorization
    unemployment_days_used = 22,         # cumulative, from your records
    expected_time_to_start = "16 weeks", # estimated for this role/company
    stem_eligible    = True,
    buffer_target    = "80 days"         # the self-imposed margin below 90
)
# returns a value in [0, 1]; 0 = skip regardless
```

The inspectable output is the factor *and the dates that produced it* — never a bare number. A timeline factor you can't trace to specific dates is a number you can't defend, and this is the one factor where a silent error costs you the whole search.

## Worked example — three roles, one student

**Situation.** A STEM-eligible master's graduate, OPT ending in roughly five months, 22 unemployment days already used, targeting an 80-day buffer below the 90-day ceiling.

**The dates, computed.**
- *Role A* — a large firm whose hiring process historically runs ~5 months. Expected start lands past the authorization end. **Factor = 0 → skip regardless**, despite a strong tier and fit.
- *Role B* — a startup that can move in ~6 weeks. Expected start lands with months of buffer. **Factor ≈ 1.**
- *Role C* — a mid-size firm, ~12-week process. Expected start lands inside authorization but eats most of the buffer. **Factor ≈ 0.6** — kept, but penalized relative to B.

**The decision.** Drop A now (free those weeks for B and C and for networking, per Chapter 2); prioritize B; keep C with eyes open.

**The lesson (one sentence):** The clock is a gate, not a tiebreaker — a role you can't start in time scores zero no matter how good it is.

**The limit (where this fails):** "Expected time-to-start" is an estimate, and a company can move faster or slower than its history. STEM eligibility and H-1B timing involve legal specifics that change, and immigration rules themselves shift. The factor encodes *your* dates correctly only if you entered them correctly — and it cannot give legal advice. It is a planning multiplier, not a substitute for an immigration attorney.

## Mid-chapter checkpoint

The error almost everyone makes: optimizing for fit and treating timeline as something to "figure out later." Later is exactly when it's too late. If you find yourself excited about a role and mentally postponing the timeline question, that is the moment to compute the factor first — because a factor of 0 means the excitement is a trap, and you want to know before the four months, not after.

## Decision rules — what the timeline says to do

- **Factor = 0:** skip regardless. Reallocate the time (Chapter 2). Do not apply, however good the role.
- **Factor low but > 0:** apply only if the role is strong on the other factors *and* you can push for an accelerated process; otherwise deprioritize.
- **Factor high:** no timeline objection — let sponsorship, fit, liveness, and quality decide.
- **STEM-eligible but not yet filed:** confirm eligibility early; it can move a role from skip to keep by widening the whole runway.

## What the machine could not know

The factor knows your dates and a company's typical pace. It cannot know that this particular hiring manager will fast-track you because a team is on fire, collapsing a "5-month" process to three weeks. It cannot know that you'd be willing to accept a role in a different country if the U.S. clock runs out, changing what "skip" even means for you. And it cannot practice immigration law — the difference between eligible and ineligible for a STEM extension can hinge on a detail only a professional should rule on. The factor gates out the impossible; the negotiable edges and the legal specifics stay human.

## Exercises

1. **(Apply) Your own factor, twice.** Compute the timeline factor for two real postings using your actual authorization dates and each company's realistic process length. Show the dates.
2. **(Evaluate) The painful skip.** Identify one genuinely high-fit role you must skip on timeline alone. Write why, and where the freed time goes.
3. **(Apply) The STEM swing.** If you're STEM-eligible, recompute one borderline role's factor with and without the extension and note how the runway changes the decision.

## AI use / verified-data disclosure

The 90-day / 150-day unemployment rules are verified against the USCIS Policy Manual (see footnote). The timeline factor formula and buffer scaling are from the system design document (Component 1); the "80-day buffer" is the book's self-imposed margin, not a legal threshold. All personal dates are reader-supplied — the one input no public dataset provides — and nothing here is legal advice.

## Chapter summary — capabilities gained

You can compute a 0–1 timeline factor from your authorization dates, recognize a skip-regardless role before you waste months on it, and read how STEM eligibility reshapes your runway. Five numbers now describe every role: sponsorship, fit, liveness, quality, and timeline. The engine has to fuse them into one decision — and that fusion is the hardest idea in the book.

## Key terms

- **Timeline factor:** a 0–1 multiplier from your visa dates; 0 means skip regardless of everything else.
- **Skip-regardless:** a role whose expected start exceeds your authorization — gated out by a factor of 0.
- **Buffer-based scaling:** lowering the factor as the expected start nears your cliff, so safer-to-land roles are preferred.
- **Eight intake questions:** the setup answers (visa type, dates, STEM eligibility, field) that make a score yours.

## Bridge question

Five numbers now describe every role, and one of them can zero out all the others. How does the engine combine sponsorship, fit, liveness, and timeline into a single Apply / Consider / Skip — and why does sponsorship, not fit, get the loudest vote?

## Run-log prompt

Record, per role, the timeline factor and the exact dates behind it (authorization end, unemployment days used, expected time-to-start), and any skip-regardless role you dropped.

[^opt]: F-1 post-completion OPT: max 90 aggregate days of unemployment (150 with STEM OPT extension); exceeding it terminates the record with no grace period. USCIS Policy Manual, Vol. 2, Part F, Ch. 5: https://www.uscis.gov/policy-manual/volume-2-part-f-chapter-5
