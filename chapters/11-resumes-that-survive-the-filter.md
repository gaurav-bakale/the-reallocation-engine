# Chapter 11 — Resumes That Survive the Filter

<!-- voice-anchored: root style/VOICE.md. Anatomy: TIKTOC Part 10.
     Sourced from SCRIPTS/resumes/README.md, "The Collapse of the Traditional Résumé" essay, CHAPTER-RESEARCH-MAP.
     Thin chapter in repo; essay is the richest new source. Draft. Never published. -->

**What you'll be able to do:** Turn a Markdown CV into an ATS-safe PDF — so the application a human eventually reads is the one the parser actually passed — and spot the document structures that quietly break parsers.

## Learning outcomes

- **(Apply)** Render an ATS-friendly PDF from a Markdown CV using `SCRIPTS/resumes/`.
- **(Analyze)** Identify CV structures that break parsers and fix them.

## Opening case — the beautiful résumé the machine couldn't read

A candidate spends a weekend on a résumé. Two columns, a sidebar of skill bars, a tasteful icon next to each section, the name in a header graphic. It is the best-looking document they have ever made. They submit it to forty companies. It is rejected by most before a human ever opens it — not because the content was weak, but because the applicant-tracking system that read it first saw a scrambled wall of text: the two columns interleaved into nonsense, the skill bars invisible, the name (trapped in an image) simply absent. The parser couldn't find a job title, so it scored the candidate as unqualified for everything.

This is not rare. By 2025, around 82% of companies screened résumés with software, and roughly one in five candidates were auto-rejected with no human review.[^screening] The first reader of your résumé is a parser, and the parser does not care that the document is beautiful. It cares whether it can extract structured text. A résumé that a human would admire and a machine cannot read is a résumé that no human will ever see.

## What you need first

From Chapter 10, framing that's honest and well-aimed — now it has to survive into a readable document. From Chapter 3, the contract, applied to your own materials: don't *assume* the PDF parses; *check* it against the parser's view, the way you'd read an audit instead of trusting a number.

## The subsystem this chapter rests on

`SCRIPTS/resumes/`, whose core is `generate-pdf.mjs`: a pipeline that takes a Markdown CV and renders it to PDF through Playwright/Chromium, using a resume-safe rendering path — single-column, real text (not images), standard section headings, no exotic layout the parser will trip on. The whole point is that you author content in plain Markdown and let the pipeline produce a document engineered to parse, rather than hand-building a layout that looks good and reads as garbage.

The deeper idea, from the résumé essay: in an AI-saturated market, the résumé is no longer where you win — it's a gate you must not lose at. The winning moves (portfolio, proof of capability, the 56% wage premium for *validated* AI skills) happen elsewhere (Chapters 2 and 14). The résumé's job is narrower and absolute: **pass the parser, then say something true and specific to the human behind it.**[^proof]

## A runnable command

From the project root:

```bash
# Render an ATS-safe PDF from your Markdown CV
npm run resumes:pdf      # runs SCRIPTS/resumes/generate-pdf.mjs
```

The inspectable output is the rendered PDF. But the *real* check is not "does it look right" — it's "does it parse." So the second, essential step is to view the document the way the ATS does: copy all text from the PDF (Ctrl/Cmd-A, Ctrl/Cmd-C) and paste it into a plain text editor. **What you see pasted is roughly what the parser sees.** If your name, titles, and dates come through as clean linear text in the right order, the document passes. If they scramble or vanish, you've found the break before a company did.

## Worked example — one CV, rendered and stress-tested

**Situation.** Our graduate's Markdown CV, rendered via `resumes:pdf`.

**The command run, the output inspected.** The PDF looks clean. Then the paste-into-plain-text test: name, contact, each role's title and dates, and the bullet content all come through as ordered linear text. Section headings ("Experience," "Education," "Skills") survive as plain words a parser keys on.

**The contrast (what breaks).** The same content force-fit into a two-column designed template: pasted out, the left and right columns interleave line-by-line — "Data Analyst" lands in the middle of an unrelated bullet — and the skills, rendered as little bars, produce no text at all. A parser reading that cannot reliably find a single job title.

**The decision.** Ship the single-column rendered version; keep the pretty one for nothing, or for a human-only context like a portfolio site.

**The lesson (one sentence):** Author content, not layout — let a resume-safe pipeline produce the document, and verify it by reading what the parser reads.

**The limit (where this fails):** Passing the parser is necessary, not sufficient. An ATS-safe PDF with weak content still fails the human. And ATS systems vary — what one parses cleanly another may not — so the paste-test is a strong heuristic, not a certificate. The pipeline gets you past the gate; what you put through it still has to earn the interview.

## Mid-chapter checkpoint

The instinct to fight: "but a distinctive design will make me stand out." Against a human, sometimes. Against the parser that reads first, a distinctive design is how you disappear. Standing out is the job of your *content and your portfolio*, not your column count. If you feel resistance to a plain single-column résumé, that resistance is aimed at the wrong reader — the one who never gets to see the document if the first reader can't parse it.

## Decision rule — keep it or fix it

- **Keep:** single-column, real text, standard headings, dates in a consistent parseable format, no critical info trapped in images or graphics.
- **Fix:** anything that scrambles or disappears in the paste-into-plain-text test — multi-column flow, text-as-image, skill bars, header graphics, tables used for layout.
- **Move elsewhere:** genuinely visual proof (designs, dashboards) belongs in a portfolio link, not baked into the résumé's parseable body.

## What the machine could not know

The pipeline can guarantee a parseable document. It cannot know which of your true accomplishments will land with *this* hiring manager, or that a particular phrase in your summary is the thing that makes a reader lean in. It cannot tell you that your most parser-friendly bullet is also your most forgettable one. ATS-safety is a floor — it ensures the human gets to read you at all. What you say once you're through the gate, and whether it's specific and true enough to earn the interview, is judgment the parser was never measuring.

## Exercises

1. **(Apply) Render and verify.** Render your own CV to an ATS-safe PDF with `npm run resumes:pdf`, then run the paste-into-plain-text test. Confirm your name, titles, and dates survive in order.
2. **(Analyze) Diff the designed version.** Take a "designed," multi-column résumé and paste it into plain text beside the safe version. List exactly what broke — interleaved columns, missing image-text, vanished skill bars.
3. **(Apply) Fix one break.** Find one structure in your own materials that fails the paste test and rewrite it into a parseable form without losing the content.

## AI use / verified-data disclosure

The rendering pipeline (`generate-pdf.mjs`, `npm run resumes:pdf`) is real and ships in the repo. The screening/auto-rejection rates (~82% / ~21%) and the ~56% validated-AI-skill wage premium are from "The Collapse of the Traditional Résumé" and are marked `[verify]` pending primary-source tracing. The paste-into-plain-text method is a practitioner heuristic for approximating a parser's view, not a guarantee of any specific ATS's behavior.

## Chapter summary — capabilities gained

You can render an ATS-safe PDF from Markdown, verify it against the parser's view, and recognize and fix the structures that scramble a résumé before a human sees it. Every component now works on its own: funding, sponsorship, liveness, role quality, timeline, scoring, framing, and a résumé that survives the filter. Act Three stops handing you clean single tasks and runs the whole engine — under real pressure, with a log.

## Key terms

- **ATS-safe:** structured so an applicant-tracking parser can extract your name, titles, and dates as clean linear text.
- **Parser's view:** what the ATS extracts — approximated by pasting the PDF's text into a plain editor.
- **Resume-safe rendering:** the single-column, real-text path `generate-pdf.mjs` uses to produce a parseable PDF from Markdown.
- **Gate, not the win:** the résumé's job is to pass the parser and reach a human; the winning happens in portfolio and proof.

## Bridge question

Every part works alone. But a job search isn't run one component at a time — it's run as a system, fast, under a clock. How do you operate all of this as one verified-data runtime without quietly sliding back into "ask the model what it thinks"?

## Run-log prompt

Record that you rendered the ATS-safe PDF, the result of the paste-into-plain-text test (passed / what scrambled), and any structure you fixed.

[^screening]: ~82% of companies screen résumés with AI; ~21% auto-reject without human review; only ~21% of applicants reach a human — "The Collapse of the Traditional Résumé" (uploaded essay, N. Bear Brown). **[verify]**

[^proof]: The "résumé is a gate, not the win; proof of capability and the ~56% validated-AI-skill wage premium are where you win" framing is from "The Collapse of the Traditional Résumé." **[verify]** the wage-premium figure.
