# Chapter 6 — Is the Job Real: ATS Detection and Liveness
*A posting is not a job opening — it is a signal, and signals can lie.*

Here is a number that should bother you. Somewhere between 28 and 42 percent of job postings, depending on the study and the year, are ghosts — listings a company has no active intention of filling. One survey found 81% of recruiters admitting to posting jobs they weren't actually hiring for. That figure has held roughly steady across five years of measurement, which means it is not an artifact of a particular labor market cycle. It is a structural feature of how hiring works, or rather, how it appears to work from the outside.

I want to sit with that for a moment before we get to the detection problem, because the number is stranger than it looks. A ghost job is not a mistake. It is not a posting that was live and then the position was cancelled. It is a posting that was never, at the moment of posting, connected to an intention to hire someone. It can be a pipeline hedge — the company isn't hiring now but wants résumés ready when it does. It can be a signal to investors that the firm is growing. It can be bureaucratic inertia, a posting that went up two quarters ago and no one has gotten around to taking down. Whatever the cause, the effect for a candidate on a finite clock is the same: a day spent writing a cover letter, tailoring a résumé, researching the company, and submitting an application — to a door that was never going to open.

This chapter is about detecting which doors are real.

<!-- → [CHART: Bar chart showing ghost-job prevalence estimates across multiple studies and years (2019–2024), y-axis 0–50%, with a shaded band at 28–42% and individual city/source data points labeled (e.g., LA 30.5%, Seattle 16.6%). Caption: "Ghost-job prevalence has held in the 28–42% range across five years — not a cycle artifact but a structural feature of the posting market."] -->

## The thing you're actually reading

When you look at a job posting on a careers page, you are not looking at a hiring decision. You are looking at a record in a database, served through a piece of software called an applicant-tracking system — an ATS — which the company uses to create, publish, and process applications. Greenhouse, Lever, Ashby are the names you'll encounter most. They are not interchangeable. Each exposes its data differently. Each has a structure you can read if you know what to look for.

This matters for a reason that's easy to miss: before you can ask whether a posting is real, you have to be able to read the posting as data rather than just as prose. A careers page rendered in a browser is a human-readable surface. What's underneath it — the ATS feeding that surface — is a structured feed with fields for posting date, last-updated timestamp, job ID, description, and status. Those fields are where the liveness signals live. The prose of the job description is marketing. The metadata is evidence.

The first thing the pipeline does is identify which ATS a company uses. `detect_ats.py` inspects how the company serves its postings and returns a label: Greenhouse, Lever, Ashby, or unknown. Once the system knows the ATS, it can read the feed correctly — because the production scrapers for Greenhouse and Lever know how each one structures its data, and a scraper built for the wrong system reads noise.

```bash
python SCRIPTS/ats/detect_ats.py --company "Example Bio"
```

The output is a single label. It is not exciting on its own. But it is the key that makes the next step readable.

<!-- → [DIAGRAM: Three ATS platforms (Greenhouse, Lever, Ashby) each shown as a box with their characteristic URL/feed structure beneath, all pointing to a unified "postings record" schema with fields: job_id, title, posted_date, last_updated, description, status. Caption: "Each ATS structures its data differently; detection tells the scraper which schema to read."] -->

## What a ghost looks like from the data side

The insight that structures the liveness detection in this system comes from an analogy that, once you see it, is hard to unsee: a ghost job is spam.

Not metaphorically. Behaviorally. Spam emails are not detected by reading them and deciding they seem dishonest — they are detected by scoring their behavioral fingerprints against the patterns of email that is actually wanted. Temporal anomalies: sent at 3 a.m. to ten thousand addresses in twelve seconds. Interaction voids: no one replies, no one clicks, no bounces in normal-looking ratios. Textual homogeneity: the same message reused with minor surface variation. Your inbox filters run these checks a billion times a day without reading a word.

Ghost postings have the same fingerprints. Temporal anomalies: a posting that has been up eleven weeks with no update, while the company's other listings sit frozen at similar ages. Interaction voids: a portal that has never advanced a candidate, has no closing date, and shows no sign of the back-and-forth that characterizes a live search. Textual homogeneity: a job description identical to three other listings at the same company, copy-pasted from a template and never customized to a real project or team.

No single signal is decisive. A genuinely open role can sit untouched for weeks at a slow-moving organization; a ghost can be freshly posted specifically to look active. But together — the way no single word makes an email spam, but the pattern does — they yield a classification you can defend. That is what the system asks you to produce: not confidence, but a call you can justify from the signals you actually observed.

<!-- → [INFOGRAPHIC: Three-column layout labeled "Temporal Anomalies," "Interaction Voids," "Textual Homogeneity." Under each: two or three bullet examples from job-posting context (e.g., "unchanged for 8+ weeks," "no portal activity," "description reused across 3 listings"). Footer: "Ghost detection scores behavioral patterns — the same move your spam filter makes."] -->

## Running the scan

With the ATS identified, the pipeline pulls the company's postings without calling any paid model — a zero-token scan, just the provider's feed read directly:

```bash
npm run ats:scan
```

And then classifies each posting's liveness using Playwright to load the portal as a browser would:

```bash
npm run ats:liveness
```

The liveness check reads five things: How old is the posting? When was it last updated? How do the company's other listings behave over time — are counts changing, or are they all frozen at the same age? Is the description specific to a named project or team, or is it templated language that reused across listings? And does the funding and sponsorship context from earlier chapters make an active search plausible?

Each of those is a variable. The classification comes from their combination.

## One company, end to end

Let me make this concrete with a single example. A biotech with a Proven sponsorship tier (Chapter 5) has two open data roles, both with the same title. `detect_ats.py` returns Greenhouse. The scan pulls both.

Posting A went up nine days ago. The description references a specific named project — a model being retrained on a new assay dataset — and names the team lead it would report to. The company's other roles show recent count changes; two listings that were there last week are gone this week. `ats:liveness` calls it live.

Posting B has been up eleven weeks. The description is word-for-word identical to a data scientist posting the company ran eighteen months ago, and to two others currently open under slightly different titles. No portal activity is detectable. The count for this listing has not changed in the three scans the system has run. `ats:liveness` flags it stale — likely ghost.

The decision is not about the company. The company is real, the sponsorship is real, and the title is the same on both listings. The decision is about the posting. One of these is a door; one is a picture of a door. You apply to A and skip B, even though they come from the same firm.

<!-- → [TABLE: Side-by-side comparison of Posting A vs. Posting B across five liveness signals: posting age, last-updated, description specificity, company hiring activity, portal movement. Color-coded green/red per signal. Final row: liveness classification. Caption: "Same employer, same title — the signals separate them. Liveness is a property of the listing, not the firm."] -->

## The seam where judgment re-enters

Here is the error that the classification is most likely to induce. You get a live call on a posting and stop thinking. You treat "live" the way you'd treat "verified" — as a fact with the same standing as a DOL filing count. It isn't. A liveness call is a probability, not a certification. The signals reduce the odds of wasting a day; they cannot read the hiring manager's intent.

A posting scored live can be a role that the company has been slow-walking through four rounds of internal headcount approval and will quietly kill if it doesn't close by quarter end. A posting scored ghost can be the one role where a slow-moving organization happens to have a genuinely active search underway, with a decision-maker who doesn't believe in updating job postings. The signals catch the pattern; the exception lives in intent the pattern cannot see.

The decision rule is this: live means *apply if the tier and fit hold*. Ghost means *skip*. The third category — investigate — is for mixed signals: recent posting but templated description, or stale posting at a company that just raised money. In those cases, one cheap check resolves faster than a blind application. A single direct message to a recruiter or a look at the company's LinkedIn for recent engineering posts takes ten minutes and gives you something the behavioral scores cannot: a human response.

The contract from Chapter 3 applies here too. The liveness classification is a data claim — built from observable posting signals, logged, auditable. The reading of what that classification means for *this particular company, this particular team, this particular moment* is a judgment call, and it belongs to you, not to the system.

## What the pipeline cannot see

The system measures what the posting does, not what the company intends. That gap is real and worth naming plainly.

A stale posting can be real. An organization buried in a product sprint may have a genuine open role that nobody on the recruiting side has had time to update in two months. The metrics say ghost; the actual answer is "we'd love to talk, we just haven't been on the careers page." Filtering this out is the cost of the filter — a real door missed because it didn't behave like a real door.

A fresh posting can be fake. A recruiter running a sourcing pipeline posts a crisp, specific, recently dated listing specifically because they know candidates screen for recency. The posting is a trap designed to beat the trap detector. The signals say live; the actual answer is résumé harvest.

Neither of these failures means the filter is broken. A filter that eliminates 35% of ghost applications and occasionally miscategorizes an outlier in both directions is worth running. But the miscategorizations are worth knowing about — not because you can fix them in the current architecture, but because when the signals conflict and the role genuinely matters, the right move is a human check, not confidence in the algorithm.

<!-- → [TABLE: Two columns — "What liveness detection catches" / "What liveness detection misses." Rows: stale-but-real (slow orgs), fresh-but-fake (harvesting postings), ATS-invisible postings (direct/referral roles), postings frozen mid-search (position on hold). Caption: "The filter reduces waste; it doesn't read intent. The residual cases are where a human check earns its keep."] -->

## The shape of what you now have

At the end of this chapter, three facts exist about a role: the company can sponsor, the posting is live, and the signals behind both claims are logged and traceable. The pipeline has been built on a ladder of verified claims — each chapter adding one rung, each rung resting on data rather than plausibility.

The thing the pipeline still cannot tell you is whether the job is actually worth having. A real, sponsoring role at a company whose postings are live is still a role in an occupation that might be contracting, at a salary band below what the market pays, in a geography you can't realistically reach. Sponsorship and liveness are necessary conditions. They are not sufficient ones.

That's the question the next chapter takes up. The role exists, and you can apply to it. Is it any good?

---

## Exercises

**Warm-up**

1. *(Recall, easy)* Name the three ATS platforms this chapter focuses on and explain why detecting the ATS is a prerequisite to reading the postings as data rather than prose. What does knowing the ATS unlock?
   *Tests whether you understand the detection step as necessary infrastructure, not just labeling.*

2. *(Recall, easy)* List the five liveness signals the pipeline checks. For each one, write one sentence describing what a "ghost" value looks like and one sentence describing what a "live" value looks like.
   *Tests whether you can articulate the signal space before applying it.*

3. *(Identify, easy)* What does "zero-token scan" mean, and why does it matter that the scan step costs no paid-model calls?
   *Tests the cost-structure reasoning behind the architecture choice.*

**Application**

4. *(Apply, moderate)* Run `detect_ats.py` on one of your target companies. Record: which ATS was detected, how you verified the result, and one thing the ATS label tells you about how to read that company's postings.
   *Tests the transition from knowing the command to interpreting its output.*

5. *(Analyze, moderate)* Take three postings from the same company — choose a company with multiple open roles. Classify each posting as live, ghost, or investigate. Write the specific signal values (posting age, update history, description specificity, portal activity, funding context) that drove each classification. Identify which classification you are least confident in and explain why.
   *Tests whether you can apply the multi-signal framework and acknowledge uncertainty.*

6. *(Analyze, moderate)* Find one posting that you would classify as "investigate" rather than committing to live or ghost. Describe the specific mixed signals that produced the ambiguity. Write the single cheapest check you could run to resolve it, and explain what response would push you toward live vs. ghost.
   *Tests the three-way decision rule and the reasoning behind the investigate category.*

**Synthesis**

7. *(Synthesize, harder)* A role passes the sponsorship check from Chapter 5 (Proven tier) and the liveness check from this chapter (classified live). A colleague argues that the two checks together are sufficient to justify a full application. Construct the strongest counter-argument: what third or fourth fact about the role would you want before committing a day of application effort, and what signal in the current pipeline — if any — approximates it?
   *Tests whether you understand the pipeline's layers as necessary-but-not-sufficient, not as a complete filter.*

8. *(Synthesize, harder)* The "ghost job as spam" analogy structures the liveness detection in this system. Spam filters have a well-known failure mode: sufficiently motivated senders learn the signals and game them. Describe one realistic way a recruiter running a ghost-posting campaign could specifically defeat the five liveness signals in this chapter — and then describe one additional signal not currently in the pipeline that would be harder to fake.
   *Tests adversarial reasoning about the detection model's limits.*

**Challenge**

9. *(Evaluate, open-ended)* The chapter states that the filter costs real opportunities: a stale-but-real posting at a slow organization gets classified ghost and filtered out. Design a research method — using only publicly available data and the tools already described — that would let you estimate the *false negative rate* of the liveness classifier for a specific industry or company size. What would you measure, over what time window, and what would the resulting estimate actually tell you about when to trust the filter and when to override it?
   *Tests whether you can reason about classifier quality as an empirical question, not just a design assumption.*
