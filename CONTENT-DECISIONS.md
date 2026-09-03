# Content Decisions

A running record of **why the site says what it says**, kept so Samuel can be
briefed on anything that differs from the source material.

Source: the "Website" Google Doc, in particular the *WELLNESS CORE, Complete
Program Framework* section (doc last updated 27 Aug 2026).

Nothing here is a style preference. Every entry is a call that changed meaning,
omitted something from the doc, or carries legal or commercial weight.

---

## 1. Things deliberately left off the public site

### 1.1 Specific lab vendors, omitted

**The doc names six:** WellnessFX, LabCorp, Quest, Function Health, Rhythm,
Health Institute, Superpower.

**The site says:** "a certified lab."

**Why:** naming a commercial lab on a public marketing page reads as an
endorsement or a partnership. If those relationships are not contractual, it
creates two problems: it implies a business arrangement that does not exist, and
it ties Samuel's brand to a vendor's pricing, availability, and reputation
without any agreement governing it. It also dates the page the moment a vendor
relationship changes.

**How to explain it to Samuel:** "We kept the lab names off the site because
listing them publicly suggests you have a formal partnership with them. Once any
of those are actually in place, we add them back in a sentence, and it will read
better then because it will be true."

**Reversible:** yes, trivially. One line in `biomarkers.process`.

### 1.2 Internal operating detail, omitted

The framework doc is roughly half client-facing and half back-office. The
following stayed internal:

| Left out | Why |
| --- | --- |
| Habit scoring rubrics (`10 = zero slip-ups, 7 = 80%+…`) | Operational grading criteria. Publishing invites clients to game the score instead of doing the work. |
| Internal exit-criteria checkboxes | Written as coach QA ("✓ Signed coaching agreement"), not as client benefit. Reframed instead, see 2.1. |
| "CHECKLIST, What to Have Ready" | Pure business setup: lab agreements, referral lists, templates. Not customer-facing. |
| "Biomarker interpretation guide (for coach, not shared with client)" | The doc itself marks this internal. |
| "Premium modalities included as optional upsells (extra revenue without core scope creep)" | Internal revenue rationale. Reads badly to a prospect. |

**How to explain it to Samuel:** "About half the framework doc is how you *run*
the business, not what you *sell*. We published the half a client needs to make a
decision and kept your operating playbook private."

### 1.3 Naming and tagline

The doc's TL;DR still says the tagline is "Wellness & Human Performance." The
site uses **Vivere Performance & Wellness**, per the rename made on 27 Aug 2026.
The framework section of the same doc already calls it a "Performance and
Wellness Coaching Program," so the newer name is consistent with the doc's own
later language.

---

## 2. Things rewritten rather than copied

### 2.1 Exit criteria became client outcomes

**Doc:** `✓ Complete biometric audit / ✓ Client commits to 90-day intensive /
✓ Signed coaching agreement & medical disclaimer`

**Site:** "You leave knowing your true starting point, with the leak identified
and your baseline numbers on record."

**Why:** the doc's criteria are written from the coach's side of the table and
describe compliance, not value. Same substance, aimed at the reader.

### 2.2 Recovery modality claims, materially softened

This is the most significant rewrite on the site, and the one most worth
understanding.

**Removed outright:** "detox," "age-reversal strategies," "100% absorption,"
"boosts dopamine and metabolism," "mitochondrial boost," "triggers systemic
anti-inflammatory response," "accelerate tissue repair."

**Kept:** what the practice physically is, how long a session runs, and how often
it is typically used.

**Pattern applied:** "commonly used to support recovery" replaces "reduces
inflammation and accelerates tissue repair."

**Why:** these are health-benefit claims about therapies, published by someone
who is explicitly not a licensed clinician. In the US that is FTC territory for
advertising substantiation, and for some claims FDA territory. A coach restating
a clinic's marketing copy adopts that claim as his own. Describing mechanism and
logistics carries the same useful information to a prospect with a fraction of
the exposure.

**How to explain it to Samuel:** "We describe what each therapy *is* and how it
is *used*, but we do not promise what it *does* to your body. You are not a
doctor, and health claims on your own website are claims you personally have to
be able to back up. The clinics can say those things. You linking to them is
different from you asserting them."

### 2.3 AI-assisted biomarker analysis, reframed not removed

**Doc:** repeats 5+ times that "Samuel will review the meaning of your biomarker
results using AI-assisted analysis."

**Site:** keeps it, but always in this order, human first:

> "Samuel is a performance and wellness coach, not a physician. Reviewing your
> results is educational interpretation to inform your coaching, and it is not
> medical advice, diagnosis, or treatment. AI-assisted analysis may be used to
> help structure that review, and a coach reads and explains every result with
> you."

**Why:** "AI reads your bloodwork" is the single most misreadable sentence in the
framework. Read uncharitably it sounds like automated medical interpretation by
an unlicensed party. The framing keeps it honest and disclosed while making
clear a human does the interpreting and the AI assists, never the reverse. The
referral path to the Functional Medicine Specialist is named in the same breath
every time, so the boundary is always visible.

**Recommend Samuel reads this section personally before launch.**

---

## 3. Contradictions in the source doc, and how they were resolved

All six approved on 27 Aug 2026.

| # | Contradiction in the doc | Resolution on the site |
| --- | --- | --- |
| 1 | Key message says "In 120 days," but programs are 3-month (~90 days) and 6-month. 120 matches neither. | Rewritten to **"In 90 days"**, matching the flagship. |
| 2 | 6-month final biomarker test is **Week 20** in the journey map but **Week 24** in the protocol section. | **Week 24.** Week 20 would end testing before the program does. |
| 3 | Phase 3 headed "Weeks 7-13, Days 50-90." Weeks 7-13 is days 43-91. | Published as **"Weeks 7 to 13"** only; the day range is dropped. |
| 4 | Phase 4 heading has no name: "PHASE 4: (Weeks 14+, The Graduation Phase)". | Named **Self-Reliance**, matching the home page. |
| 5 | Tagline conflict, see 1.3. | Vivere Performance & Wellness. |
| 6 | "WELLNESS CORE" is both a 3-offer track and a 4-phase program. | Wellness Core is now **the flagship program** (3 or 6 month). Weekly Coaching, Habits Workshop, and Clarity Session are lighter entry points. |

**Worth raising with Samuel:** items 1 to 4 are errors in his own document. If
that doc is ever sent to a client or used to brief anyone, it should be corrected
at source, not just on the site.

---

## 4. Long-outstanding doc notes now shipped

Two requests sat unactioned through earlier rounds:

- **The coins line.** The doc asked for "Three reminders for the days the
  wellness work gets heavy" in the "Carried, not framed" section. Now in
  `creed.note`.
- **Clarity Session.** Listed as offer 05 in the doc, dropped somewhere in an
  earlier build, never on the site. Restored to Track A. It was the only
  low-commitment entry point in the entire funnel, so its absence meant every
  visitor faced a 90-day commitment as the smallest possible yes.

---

## 5. Commercial gaps, flagged not invented

### 5.1 No pricing exists

The framework says only: "Customized based on program scope and client needs.
Contact Samuel for details."

The site therefore routes to the contact form rather than showing numbers. Two
honest cost disclosures were added, because both are real and both surprise
people late otherwise:

- Lab work is ordered and billed by the lab, not through coaching.
- Recovery practices are optional and paid to the provider directly.

**Recommendation:** on a page this long, a "starting from" anchor number
materially improves conversion. That is a decision for Samuel, not a copy fix.

---

## 6. The disclosures page

`/disclosures` puts the coaching agreement's key terms in plain language across
seven sections: coaching not medical care, biomarker interpretation, recovery
practices, assumption of risk, results and guarantees, confidentiality, and
termination.

**Why it exists at all:** before this build the site carried no disclaimers of
any kind. That was survivable while the site sold generic coaching. It stopped
being survivable the moment the site started advertising blood panels,
biomarker interpretation, and seven third-party medical-adjacent therapies. The
framework doc's own legal section is emphatic on all of this; none of it had
ever reached the website.

**Three deliberate choices:**

1. **Second person, not legalese.** "You assume full responsibility for any
   injury" rather than "the Client hereby acknowledges." A disclaimer nobody
   reads protects nobody. This is a plain-language summary for the website and
   is not a substitute for the signed agreement.
2. **Every clause is directly linkable.** Each section has a stable anchor
   (`/disclosures#assumption-of-risk`), so a specific term can be pointed to in
   an email rather than "it's on the disclosures page somewhere."
3. **A standing notice in the footer of every page**, not just this one:
   *"Coaching for generally healthy adults. Not medical care, and not a
   substitute for advice from your physician."* Someone can land on the program
   page from search, read about biomarker panels, and leave without ever
   visiting the terms. The boundary should not be reachable only by the people
   who go looking for it.

**How to explain it to Samuel:** "Your framework doc already says all of this,
it just had never made it onto the site. Now that the site talks about blood
panels and recovery clinics, the boundary between coaching and medical care has
to be visible to a visitor, not just present in the contract they sign later."

**Not legal advice.** This page reflects the framework doc's own language,
reorganised and plainly worded. Samuel should have a lawyer review it before
launch, particularly the biomarker and recovery-practice sections.

---

## 6b. One deviation from the approved plan

The plan said "Track A's card points to /wellness-core instead of #contact."
Building it revealed that would be wrong, so it was not done that way.

Track A lists **four** offers: Wellness Core, Weekly Mindset & Lifestyle, Habits
Workshop, and Clarity Session. Only the first has a page. Repointing the card's
single bottom CTA at `/wellness-core` would have sent someone interested in a
one-day Habits Workshop to a 90-day program page, and removed the only route to
the enquiry form from that card.

**What was built instead:** the Wellness Core *list item* carries its own inline
link ("See the full program"), placed directly under its description. The card's
bottom CTA stays "Start here" to the contact form, serving all four offers.

Net effect is the intent of the plan, two destinations serving two jobs:
contextual depth for the flagship, conversion for the track as a whole.

---

## 7. Navigation

**"Programs" in the top nav is now "Wellness Core"**, pointing at the new page
rather than scrolling to the programs section of the home page.

**Why:** the program page is the site's primary conversion asset, and the nav
only has room for five items before it crowds at tablet width. Wellness Core
earns the slot; the programs section is still reached by scrolling the home
page, and the Wellness Core card there links through.

The **footer keeps both**, since it has room for seven links. So the programs
section is still one click from anywhere.

**How to explain it to Samuel:** "Your flagship program now has its own page and
its own spot in the menu. Everything else is still reachable, it just is not
competing for the five slots that fit across the top."

---

## 8. House style

`app/content.ts` declares: **no em-dashes anywhere.** The source doc uses them
throughout, so all imported copy was converted to commas, colons, or full stops.
Verified: zero em-dashes in site copy. The only ones left in the repo are code
comments.
