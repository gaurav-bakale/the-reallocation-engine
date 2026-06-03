# Chapter 5 — Who Sponsors: The 80 Days Sponsorship Scorer
*Why the record always outranks the reputation.*

Here is something that bothers me every time I see a job seeker's target list: the names on it are chosen for how they feel, not for what they've done. A household brand — a logo you've worn on a t-shirt — sits at the top. Fifteen companies you've never heard of sit nowhere, because you've never heard of them. And that ranking is exactly backwards, in a way that is measurable, sourced, and correctable.

A Cambridge biotech with no consumer presence files fifteen Labor Condition Applications over three years and maintains an 85% H-1B approval rate. The household brand files essentially zero LCAs for roles like yours. For a candidate who needs sponsorship, the unknown biotech is a vastly better target — not by opinion, not by vibe, but by the public record. The whole problem is that prestige is loud and the visa record is quiet. This chapter makes the quiet record louder.

<!-- → [CHART: horizontal bar chart showing a hypothetical pair of companies — "Famous Brand" vs. "Unknown Biotech" — with bars for LCA count, approval rate, funding recency, and composite score; the visual should make the ranking flip visceral and immediate] -->

What I want you to notice before we go further: this is not about dismissing well-known companies. Some famous companies are prolific sponsors. Some unknown biotechs file nothing. The point is that you do not know which is which from the name alone — you only know from the record. Everything in this chapter is about reading the record correctly.

---

The record lives in three datasets, all public, all free.

The first is **SEC Form D**, which you met in Chapter 4. It tells you when a company raised money and how much. Funding recency matters because a company that raised $12 million eight weeks ago is a different entity than one whose last round was three years ago and whose runway is unclear.

The second is the **DOL LCA disclosure data** — every Labor Condition Application an employer files with the Department of Labor as a precondition for hiring a foreign worker. An LCA is not the visa itself; it is the step before. It says: this employer is willing, organized, and legally set up to go through the process. A company with a filing history has built the machinery. A company with no filings either has not built it or has decided not to use it for roles like yours. Both conclusions matter.

The third is the **USCIS H-1B Employer Data Hub** — actual approvals and denials by employer and year. This is not intent; it is outcome. An employer can file LCAs and still fail at the H-1B stage. The approval rate tells you how the filings resolve.

<!-- → [DIAGRAM: three-node pipeline showing SEC Form D → DOL LCA Data → USCIS H-1B Hub flowing into a "Sponsorship Scorer" node, with arrows labeled "funding recency," "filing behavior," and "approval rate"; include a fourth node for "company-size signals" feeding in from below] -->

These three datasets are joined by the **80 Days pipeline** on resolved company names. That last phrase — resolved company names — is doing more work than it appears to. "Google LLC," "Google Inc.," and "Alphabet" must be recognized as one entity or a real sponsor looks like a stranger in the data. The join is the hard part. An "Unknown" tier caused by a failed name match is not the same as a true absence of filings, and I will return to that distinction because it is one of the two most important things in this chapter.

---

The scorer reduces those three datasets into a single number:

> **P(sponsorship) = LCA filing rate (3-yr) × 0.40 + H-1B approval rate × 0.30 + funding recency × 0.20 + company-size signals × 0.10**

Read those weights as a claim, and ask whether you agree with it.

The LCA filing rate carries 40% of the weight because filing is the most direct revealed action available in public data. A company that files LCAs has made a decision — to build the legal infrastructure, engage immigration counsel, pay the fees, and go through the process. That decision is load-bearing in a way that a company's reputation is not. You can be famous without ever filing an LCA. You can be unknown and file thirty.

The H-1B approval rate carries 30% because filings that don't succeed tell a different story than filings that do. An employer with a 40% approval rate and an employer with an 85% approval rate are both sponsors in name. In practice, they are different bets.

<!-- → [TABLE: side-by-side comparison of two hypothetical employers — one with high filing rate and low approval rate vs. one with moderate filing rate and high approval rate — showing how the composite score differs and what each profile implies about the employer's process] -->

Funding recency carries 20% because the question is not just whether a company has sponsored in the past but whether it has the resources and growth trajectory to do so now. A company that raised eight weeks ago is in a different hiring mode than one that is managing a quiet contraction.

Company-size signals carry 10% — not because size is unimportant, but because its effect is already partially captured by the other three. A fourteen-person lab and a ten-thousand-person firm behave differently on average, but the record is the record. A small lab with a strong filing history is better evidence than a large firm with none.

The composite probability then maps to a tier. **Proven** means strong, recent filing history and high approval — the evidence is unambiguous. **Likely** means some evidence: a few filings, or strong funding plus partial history. **Unknown** means no evidence either way. **Avoid** means evidence the company does *not* sponsor in your kind of role — a clear zero-history non-sponsor that the engine should actively skip rather than merely lack data on.

I should flag something here. The system design document underlying the 80 Days pipeline describes three tiers — Proven, Likely, Unknown. The plain-language summary of the same system adds Avoid as a fourth. This chapter uses four tiers because "Avoid" does real work: it lets the engine actively deprioritize known non-sponsors rather than merely lacking data on them. The tier set and exact probability thresholds for each boundary need to be reconciled against the SDD before this goes to print. I am being transparent about that because the tier labels and thresholds are the output a reader will act on, and the distinction between a system that has three modes and one that has four is not cosmetic.

<!-- → [INFOGRAPHIC: a horizontal spectrum from "Avoid" through "Unknown" through "Likely" to "Proven," with approximate probability ranges on the axis and brief action cues below each tier — what the engine does and what you do] -->

---

Now let me show you what this looks like on a real case — or rather, a case that is real in structure, with illustrative numbers, so you can see how the reasoning works before you run it on your own list.

Return to the Cambridge biotech. LCA filings: 15 over three years. That is a strong filing rate for a company of this size — they are not dabbling in sponsorship, they have built the process. H-1B approval rate: 85%. Funding: $12 million raised eight weeks ago, which puts the recency score near maximum. Size: roughly 40 employees, which is mid-small.

Running the weights: the LCA rate (×0.40) dominates because it is high and the weight is highest. The approval rate (×0.30) confirms the filings are not just optimistic paperwork. The funding recency (×0.20) says they have the resources to keep going. Size (×0.10) is neutral-to-positive — a 40-person lab is not so large that bureaucracy slows everything down and not so small that one departure breaks the immigration infrastructure. The composite lands well into Proven.

Now run the same logic on the household name. LCA rate: approximately zero for roles like yours. That ×0.40 term contributes nothing. No relevant H-1B approvals in your role category. The funding and size numbers are strong — they have the money, they have the infrastructure — but those terms together carry only 30% of the weight, and they cannot rescue a zero on the 70% that measures actual sponsorship behavior. The company lands in Avoid.

<!-- → [CHART: two stacked bar charts side-by-side showing the weighted score breakdown for each company — each bar segment labeled with its component and weight, making visible how the "Avoid" company's 70% goes to zero while the Proven company builds from all four components] -->

The decision is not close. The unknown biotech goes to the top of the active application list. The household name gets skipped. That is the backwards ranking, now defended by four sourced numbers.

But I want to be careful here. The record is a rear-view mirror. A company that sponsored heavily for three years may have frozen sponsorship last month. The immigration attorney who drove those 85% approvals may have left in March and taken the process knowledge with them. The LCA data is published on a lag. A company that raises a new round and starts hiring aggressively may look Unknown today and Proven in six months — and the record will not tell you that yet.

This is not a reason to distrust the tier. It is a reason to hold the tier correctly: as a well-evidenced prior, not a guarantee. You are Bayesian here. The tier tells you where the evidence points. The conversation you have with the recruiter is where you update.

---

The most common misread of this system is treating Unknown as Avoid. I want to spend a moment on this because it is not a subtle error — it is the error that throws away exactly the companies Chapter 4 worked to surface.

*Avoid* means the record shows this company does not sponsor your kind of role. The evidence is there; it is just negative. *Unknown* means the record is silent. Silent is different from negative. A company is Unknown for one of two reasons: either there is genuinely no filing history (they have never sponsored, or they are so young that the data does not exist yet), or the name did not match when the pipeline joined the datasets.

Those two causes of Unknown require opposite responses. A true absence of filings on a three-year-old company with strong funding is a prompt to look for direct sponsorship signals — a careers page that says "visa sponsorship available," a LinkedIn post about a recent hire on an H-1B, a direct question to the recruiter. A failed name match is a data problem you fix by resolving the entity and re-running. You cannot tell which you are dealing with by looking at the tier alone. You tell by reading the join-coverage audit.

<!-- → [TABLE: two-column table distinguishing "True Unknown" from "Name-Match Artifact Unknown" — rows for: how to identify it, what the record shows, what action it requires, and what the risk of treating it as Avoid would cost you] -->

The pipeline exposes this. From the project root:

```bash
cd SCRIPTS/sec
python validate_h1b_join_sample.py
```

checks the company-name join against USCIS H-1B data, and:

```bash
python SCRIPTS/audit_sec_dol_h1b_data.py
```

audits the full SEC + DOL + H-1B join coverage. The output is a number: how many companies on your shortlist matched, how many failed to match, and therefore how much of your list the tier actually covers. You read that coverage number before trusting any Unknown. If 30% of your shortlist failed to match, a significant fraction of your Unknowns are artifacts, not verdicts.

---

Let me say what I actually cannot see from this data, because intellectual honesty requires it.

The pipeline knows a company filed fifteen LCAs. It cannot know those fifteen were all for senior principal scientists and the company has a quiet policy against sponsoring entry-level hires. It knows an 85% approval rate; it cannot know that the attorney who drove those approvals left in March. It cannot know that an Avoid company just hired a new VP of Engineering who is changing the sponsorship policy this quarter. It cannot know that a Proven company just went through a round of layoffs and has frozen all new sponsorship for six months.

The tier is what the public record supports. What the public record cannot support is inference about a specific role, a specific month, a specific team. That is not a flaw in the scorer — it is the honest boundary of what any retrospective dataset can tell you. The boundary matters because crossing it silently is how you make bad decisions with confident numbers.

What the record can tell you, reliably, is: has this company demonstrated that it is willing and able to sponsor? That is the question the tier answers. Whether this company will sponsor you, in this role, right now — that is the question the tier informs but cannot answer.

<!-- → [DIAGRAM: a decision tree beginning at "Tier assigned" — branching from Proven/Likely to "Target actively" and then to "Verify role type matches filing history," from Unknown to "Check coverage / resolve name match" and "Look for direct signals," and from Avoid to "Skip — reallocate application time (see Chapter 2)"] -->

The last thing I want to leave you with is the decision rule, because knowing the tier is only useful if you know what to do with it.

Proven and Likely justify the targeted two hours of application effort from Chapter 2. These are companies where the evidence supports the investment. Unknown — if fit and funding are strong — stays on the list, but gets a different kind of attention: resolve the name match, find the direct signal, and only then decide. Avoid gets skipped. This is precisely the class of target the engine exists to let you skip. The hours you save on non-sponsors are the hours that fund the depth you put into Proven targets.

The puzzle the record cannot solve is one level up: a company that will sponsor is worthless to you if the posting they listed is a ghost. So before you spend the targeted application time a Proven tier earns — is the role even real?

---

## Exercises

**Warm-up**

1. *(Recall — single-concept)* The composite scoring formula weights four inputs. Without looking, name them and their weights. Then write a one-sentence explanation for why the LCA filing rate carries more weight than company-size signals.
   *Tests: understanding of weight rationale, not just memorization of numbers.*
   *Difficulty: Low*

2. *(Distinguish — single-concept)* A company appears as Unknown in your tier output. Describe two distinct reasons this could happen, and for each, state what action the correct interpretation requires.
   *Tests: the Unknown ≠ Avoid distinction and its practical consequences.*
   *Difficulty: Low*

3. *(Apply — single-concept)* You run the join-coverage audit and find that 40% of your shortlist failed to match. What does this tell you about the reliability of the Unknown tiers in that 40%? What is the first step?
   *Tests: reading coverage output before trusting tier assignments.*
   *Difficulty: Low*

**Application**

4. *(Compute — multi-input)* A company has the following inputs: LCA filing rate (3-yr) = 0.7, H-1B approval rate = 0.6, funding recency score = 0.9, company-size signal = 0.5. Compute the composite P(sponsorship) using the chapter's formula. Which tier would this place the company in, assuming standard thresholds?
   *Tests: mechanical application of the weighted formula.*
   *Difficulty: Medium*

5. *(Compare — multi-input)* Company A has a strong 3-year LCA history but a 45% approval rate. Company B has only 3 LCAs over three years but a 92% approval rate and recent Series B funding. Compute approximate scores for both. Which is the better target and why — and what does the comparison reveal about what the weights are actually measuring?
   *Tests: trade-off reasoning across inputs, not just formula execution.*
   *Difficulty: Medium*

6. *(Audit — procedure)* You assign a famous company an Avoid tier. A friend argues this is wrong because "everyone knows they hire internationally." Write the argument you make to defend the Avoid assignment, and name what single piece of new evidence would change the tier.
   *Tests: defending tier from evidence rather than reputation; updating on evidence.*
   *Difficulty: Medium*

**Synthesis**

7. *(Integrate — cross-chapter)* A company from your Chapter 4 shortlist scores Proven on sponsorship but has a funding event that is 26 months old. The LCA history is strong. How do you weight the stale funding against the filing history? What decision does the composite support, and what additional check does the stale funding prompt?
   *Tests: combining Chapter 4 funding logic with Chapter 5 scoring; not treating inputs as independent verdicts.*
   *Difficulty: High*

8. *(Diagnose — system behavior)* The 80 Days pipeline assigns Unknown to a company you know personally sponsors aggressively — you have a contact there who is on an H-1B. Walk through the two most likely explanations for the discrepancy, and describe the steps you would take to either correct the tier or confirm it as a pipeline limitation.
   *Tests: understanding name-match artifacts vs. true data absence; debugging system output against ground truth.*
   *Difficulty: High*

**Challenge**

9. *(Design — open-ended)* The current formula weights LCA filing rate at 0.40 and company-size signals at 0.10. Suppose you are building a version of this scorer specifically for targeting very early-stage startups (Series A and earlier). Make the case for at least one weight adjustment that would improve tier accuracy for this population, and explain what the adjustment reveals about what the original weights were implicitly assuming.
   *Tests: understanding the assumptions baked into the scoring model; applying the model's logic to a constrained subpopulation.*
   *Difficulty: High/Open-ended*
