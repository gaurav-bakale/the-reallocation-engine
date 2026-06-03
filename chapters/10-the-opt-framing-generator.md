# Chapter 10 — The OPT Framing Generator

<!-- voice-anchored: root style/VOICE.md. Anatomy: TIKTOC Part 10.
     Sourced from SDD Component 4, plain-summary, CHAPTER-RESEARCH-MAP. Ethics-sensitive (TIKTOC Risk 3).
     Draft. Never published. Hard rule: never misrepresent authorization. -->

Here is what happens in the first screen. A recruiter sees "international student" and a set of associations fires before a single question gets asked: sponsorship, cost, legal risk, delay. The candidate is filtered out. Not for their ability. Not for anything true. Because in the OPT and STEM-OPT window, none of those associations are accurate. The candidate is already authorized to work in the United States. They need no immediate sponsorship. They actually save the employer money. The candidate lost the role not to a competitor but to a misunderstanding they did nothing to correct — and in many cases didn't know they could.

This is a framing problem, and it has a solution. The solution is not to obscure your status. It is to present the accurate facts in the order and language that gives the person reading them the best chance of understanding what is actually true. What is actually true happens to be good news for the employer. Most candidates never say it.

---

Start with the fact most candidates can state but almost none deploy. Students on F-1 status working under OPT are generally exempt from FICA taxes — Social Security and Medicare — for the duration of the OPT period. The employer is also exempt from the matching contribution, which runs to roughly seven and a half percent of wages.[^fica] Hiring an OPT candidate is, for that window, cheaper than hiring an equivalent domestic worker. Not more expensive. Cheaper. The assumption in the first screen is not just wrong — it is backwards. And the candidate who says this clearly, in a first written contact, has changed the entire frame of the conversation.

That is the core fact. Everything else in this chapter is about when and how to say it.

---

The answer depends on who is reading it, which is why the chapter rests on the sponsorship tier from Chapter 5. A company that has sponsored dozens of H-1B visas understands OPT. A company with no sponsorship history may not know the acronym exists. Calibrating what you say to the audience's existing knowledge is not evasion — it is competent communication. The same true information can land as reassuring or confusing depending on the vocabulary you use to deliver it.

The tier ladder works as follows.

For a **Proven** employer — one that sponsors and knows the terrain — state your authorization directly. They understand OPT, they know the H-1B timeline, and clarity is an asset. Write it plainly: authorized to work in the U.S. on STEM OPT, familiar with the path forward. No softening needed. Softening would actually signal that you're uncertain about your own status.

For a **Likely** employer — some sponsorship history, but possibly not fluent in the details — lead with work authorization and the FICA benefit without leading with the acronym. The sentence that works is something like: "I'm authorized to work in the U.S. and, as an OPT employee, I'm FICA-exempt — a roughly seven-and-a-half-percent payroll saving for the coming period." Authorization first, benefit second, acronym explained rather than assumed. This defuses the opening-screen assumption before it can form.

For an **Unknown** employer — no signal either way — the written application says nothing about visa status. This is not concealment; it is timing. The first screen is the wrong place to raise a topic the employer may misread without context. Your materials sell your fit. When authorization comes up in an interview — and it will — you explain OPT, the FICA exemption, and the timeline in a conversation where you can answer questions as they arise and correct misreadings in real time. Paper cannot do that. You can.

The logic underlying the ladder is one idea: **disclose in proportion to the audience's understanding.** Where they understand OPT, be direct. Where they half-understand, lead with the benefit. Where they don't understand and have given no signal, let it surface in conversation. What never changes across the ladder is the hard rule: framing is accurate information presented strategically. It is never fabricated credentials, invented metrics, or misrepresented status. The moment a framing requires you to state something untrue, or to deny your authorization when directly asked, the tool has failed and you stop.

The line between strategy and misrepresentation is not subtle once you look at it directly. "Authorized to work in the U.S." is true and leads with the relevant fact. "I don't anticipate any issues with work authorization" is fine if you believe it. "I'm a permanent resident" is fraud if you aren't. The tool lives entirely on one side of that line. It has no use on the other side, and it will not help you cross it.

---

The table below summarizes the rules in compact form:

| Tier | Visa mention in written materials? | Lead with | Hard rule |
|---|---|---|---|
| Proven | Yes, direct | "Authorized; I/we know the OPT→H-1B path" | Never overstate the timeline you can offer |
| Likely | Yes, framed | "Authorized to work + FICA-exempt (~7.65% saving)" | Never imply you need no future sponsorship if you will |
| Unknown | No (initial) | Your fit; visa handled in interview | Never conceal authorization if directly asked |
| Avoid | — | (no materials) | — |

The hard rule cuts symmetrically. You do not over-claim — no implying permanent authorization you don't have, no stretching the OPT clock beyond its actual dates. And you do not deny or hide when directly asked. Strategic timing of true information is the entire toolkit. A false impression is not a variant of the toolkit. It is a different thing entirely.

---

What the generator cannot do is also worth stating plainly. It knows the sponsorship tier and the general OPT facts. It cannot know that the specific recruiter you're writing to was themselves an international student and will respond best to total directness regardless of tier. It cannot know that an Unknown-tier company was burned by a visa timeline problem last year and will ask about work authorization in the first email no matter what your materials say. It cannot make the ethical call for you in the gray moment when a framing that is technically accurate might leave a false impression in a careful reader's mind.

Framing is a starting calibration. The actual human across the table — and your willingness to hold the honesty line when it would be easy not to — is irreducibly yours to manage. The generator gets you to the conversation. What you do in it is not automatable.

This chapter also requires a legal and ethics reviewer before publication. The disclosure rules here touch employment and immigration law, and the hard rule against misrepresentation is not negotiable regardless of any framing suggestion the generator produces.[^ethics]

## LLM Exercises

1. **(Create) Three framings.** Generate visa framing for one real role at each of the three material-producing tiers (Proven, Likely, Unknown). Keep every claim true.
2. **(Evaluate) Catch the crossing.** Take a framing — yours or a provided one — that has crossed from strategic into misrepresentation. Identify the exact phrase that crosses the line and rewrite it to be both honest and effective.
3. **(Understand) Explain FICA in one sentence.** Write the FICA-exemption benefit as you would say it to a non-expert hiring manager — accurate, concrete, and not jargon.

## Key terms

- **Framing:** presenting accurate information strategically, calibrated to the audience's understanding — never fabrication.
- **FICA exemption:** OPT employees are generally exempt from Social Security and Medicare tax, saving the employer roughly seven and a half percent for the period — a real hiring benefit.
- **Disclosure-by-tier:** direct for Proven, benefit-led for Likely, interview-deferred for Unknown.
- **The hard rule:** never fabricate credentials, invent metrics, or misrepresent status; never deny authorization when asked.

## Run-log prompt

Record, per application, the tier, the framing approach used, and a one-line confirmation that every claim is accurate and no status was misrepresented.

[^fica]: F-1/OPT students are generally exempt from FICA (Social Security and Medicare) taxes, removing the employer's matching ~7.65% for the OPT period. Stated across the project's plain-summary and résumé/3-3-2 essays. **[verify]** against IRS guidance (e.g., IRS Publication 519 / FICA exemption for F-1) before publication.

[^ethics]: This chapter requires a legal/ethics review owner before publication (TIKTOC Risk 3 / Open Question 6). The hard rule against misrepresentation is non-negotiable and overrides any framing suggestion.
