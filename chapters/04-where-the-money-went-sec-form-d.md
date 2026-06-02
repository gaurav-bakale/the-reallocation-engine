# Chapter 4 — Where the Money Went: SEC Form D

<!-- voice-anchored: root style/VOICE.md. Anatomy: TIKTOC Part 10.
     Sourced from SCRIPTS/sec/README.md, data/80-days-to-stay day logs, CHAPTER-RESEARCH-MAP,
     "80 Days to Stay" essay. Draft. Never published. -->

**What you'll be able to do:** Turn raw SEC Form D filings into a ranked shortlist of companies that just raised money — and therefore need to hire — including firms no job board would ever surface for you.

## Learning outcomes

- **(Apply)** Run the Form D pipeline end-to-end: `download → refresh → combine → filter → unique → domain inference → flatten`.
- **(Analyze)** Read the processed output and identify recently funded firms in a target geography.

## Opening case — the companies you can't see

Open any job board and search your field in your city. You will see the same names everyone sees — the billboards, the logos on the side of the building. Now consider a different population: the firms that filed paperwork with the Securities and Exchange Commission last quarter saying they had just raised capital. In one snapshot of the Form D record, there were over **568,000** companies that had reported raising money, and nearly **247,000** of them had raised at least $5 million.[^formd] Many are biotech labs in Cambridge, AI startups in a converted warehouse, climate-tech outfits with twelve employees and a fresh Series A.

They have money. Money that, for an early-stage company, exists largely to be turned into people. And they are nearly invisible to anyone looking only at brand-name employers, because a fourteen-person lab does not buy billboards or run a careers portal that ranks in search.

A company that just raised five million dollars is a company under pressure to hire. The job board hides it. The public record does not.

## What you need first

From Chapter 3: the verified-data contract — every number in this chapter comes from a script reading a public dataset, never from a guess. You will also need the project's Python environment set up (`SCRIPTS/sec/requirements.txt`) and disk space for the quarterly filing archives.

## The dataset and subsystem this chapter rests on

**The dataset:** SEC **Form D**. When a company raises money in a private offering (a seed round, a Series A) under Regulation D, it files a Form D with the SEC disclosing the offering — the company name, address, industry, the amount raised, and the date. It is public. It is structured. And almost no job seeker has ever read it.

**The subsystem:** `SCRIPTS/sec/`, which holds the pipeline. The data lands in `data/sec/form-d/` in three layers — `raw/` (what the SEC published), `extracted/` (parsed), and `processed/` (cleaned, deduplicated, ranked). The three-layer layout is itself part of the contract: you can always trace a processed number back to the raw filing it came from.

## Core content — funding recency as a hiring signal

The logic of the pipeline is one idea, made operational: **recent funding is a leading indicator of hiring.** A company that filed Form D for a $20M round eight weeks ago will be hiring in the next two quarters with near-certainty, because that is what the money is *for*. Funding recency, then, is not trivia — it is a predictor, and later (Chapter 5) it becomes one of the four weighted factors in the sponsorship tier, worth 20%.

But raw Form D is messy. The same company appears under three spellings. Offerings get amended and re-filed. A name has no website attached. So the pipeline does real work before the data is usable: it deduplicates filings to one record per company, resolves entities (matching "Acme Bio, Inc." to "Acme Bio LLC"), and infers each company's web domain so you can actually find them. In the build logs behind this book, domain inference reached roughly a **62% success rate** by guessing and verifying URLs — which also means about 38% of companies still need a human to find the website, the first place the data hands judgment back to you.[^domain]

## A runnable command

The pipeline runs as an ordered sequence of scripts in `SCRIPTS/sec/`. End to end:

```bash
cd SCRIPTS/sec

# 1. Download the Form D filing archives for the quarters you want
python download_form_d_quarters.py

# 2. Pull in the most recent quarters (keeps the archive current)
python refresh_recent_sec_quarters.py

# 3. Combine quarters into one dataset
python sec_combine_quarters.py

# 4. Filter to real offerings above your funding threshold
python sec_filter.py

# 5. Collapse to one record per company
python sec_unique.py

# 6. Infer each company's web domain
python sec_domain_inference.py

# 7. Flatten to the final processed table
python sec_flatten.py
```

Each step writes its output into the `data/sec/form-d/` layers, and an audit alongside it. The inspectable output is the flattened processed table: one row per funded company, with amount, date, industry, location, and (where inference succeeded) a domain.

## Worked example — one quarter to a shortlist

**Situation.** A data-science graduate targeting Boston, willing to consider biotech and AI.

**The command run, the output inspected.** Running the pipeline over the most recent quarters produces a processed table. Filtering to Massachusetts, raised ≥ $5M, filed within twelve months, sorted by recency, yields a ranked list. At the top sit a few names the graduate recognizes — and, three rows down, a Cambridge biotech with a $12M raise eight weeks ago that they had never heard of and that has no presence on any job board they use.

**The decision.** That unknown biotech goes on the target list *above* several brand names, because it just got the money and is small enough that a single hire matters.

**The lesson (one sentence):** The companies most likely to need you are often the ones you've never heard of — and the public funding record is how you find them.

**The limit (where this fails):** Form D tells you a company raised money. It does not tell you *what* they will hire for, whether the role fits you, whether they sponsor visas, or whether the posting you eventually find is even real. Funded is a necessary signal, not a sufficient one — the next three chapters add the missing facts.

## Mid-chapter checkpoint

A trap to catch now: the biggest raise is not the best target. A $200M late-stage round often means a company large enough to have a formal, parser-gated hiring machine and a thousand applicants per role. A $6M seed at a fourteen-person lab means a founder who will read your email. When you sort the table, resist sorting by dollar amount alone — recency and company *size* matter as much as the headline number.

## Decision rule — which funded firms make the list

- **On the list:** raised within ~12 months, above your funding floor, in a reachable geography, small-to-mid size, in an industry adjacent to your skills.
- **Off the list (for now):** raises older than ~18 months (the hiring surge has passed), or so large the company behaves like a brand-name non-sponsor (handle those in Chapter 5/9).
- **Flag for human follow-up:** any high-fit company where domain inference failed — you find the website yourself before discarding it.

## What the machine could not know

The pipeline can rank a company by how recently and how much it raised. It cannot know that the $12M biotech raised specifically to build a wet lab and will hire only bench scientists, not data people. It cannot know that the founder is winding the company down despite the cash, or that the round was a bridge to nowhere. Funding recency is a strong prior about hiring *intent*; it is silent on hiring *for what* and *whether it lasts*. You confirm the fit; the data only tells you where to look.

## Exercises

1. **(Apply) Refresh and produce.** Run the pipeline for the current quarters and generate the processed company table. Confirm the row count against the run's audit — the count should come from the audit, not your memory.
2. **(Analyze) Ten invisible firms.** Pull ten funded companies in your target city and note, for each, whether you would ever have found it on a job board. Mark the ones that exist only because you read the filings.
3. **(Apply) Fix a missing domain.** Find one high-fit company where domain inference failed, locate its real website by hand, and note how long it took — that's the human cost the 62% number hides.

## AI use / verified-data disclosure

Every company, amount, and date in a real run comes from SEC Form D filings via `SCRIPTS/sec/`. The aggregate counts (≈568K filers, ≈247K raising ≥$5M) and the 62% domain-inference rate are drawn from the project's "80 Days to Stay" build logs and are marked `[verify]` pending confirmation against a fresh pipeline run. No company is invented; thresholds and rankings are the reader's choices, not the data's.

## Chapter summary — capabilities gained

You can run the Form D pipeline, read its processed output, and assemble a shortlist of recently funded companies — including the invisible ones — in a target geography. You have a leading indicator of hiring intent. What you do not yet have is whether any of these companies will sponsor *you*.

## Key terms

- **Form D:** the SEC filing a company makes when it raises money in a private offering; public, structured, and rich with hiring signal.
- **Funding recency:** how recently a company raised; a leading indicator of near-term hiring and a 20% factor in the sponsorship tier.
- **Entity resolution:** collapsing the many spellings of one company into a single record.
- **Domain inference:** automatically guessing and verifying a company's website so a funded firm can actually be reached.

## Bridge question

You now have a list of companies with money and a reason to hire. But "funded" is not "will sponsor you." How do you turn a company name into evidence about whether it can hire someone on your visa at all?

## Run-log prompt

Record the quarters processed, the audited row count, your filter thresholds (geography, funding floor, recency), and the count of high-fit firms whose domains you had to find by hand.

[^formd]: Aggregate Form D counts (≈568,707 filers; ≈246,572 raising ≥$5M) from the "80 Days to Stay" build logs (`data/80-days-to-stay/`) and connecting essay. **[verify]** against a current pipeline run.

[^domain]: ~62% domain-inference success (≈38% requiring manual lookup) from the "80 Days to Stay" build logs and the "80 Days to Stay: Connecting Recent Funding" essay. **[verify]**
