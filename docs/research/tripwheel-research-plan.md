# Tripwheel — Market Research Plan
> **Purpose:** Validate demand for a vertical SaaS platform for travel professionals
> **Date:** 2026-05-22
> **Participants:** Shad (Design Lead), Yousuf (COO)
> **Status:** Planning — pre-launch

---

## 1. Research Objective

Triple-duty research serving three goals simultaneously:

| Goal | Description |
|---|---|
| **Pipeline** | Survey funnels warm leads into qual sessions → early adopter pipeline |
| **Hypothesis validation** | Test 4 quantitative + 2 qualitative hypotheses from product brief |
| **Unbiased discovery** | Surface pain points without revealing product idea explicitly |

**Constraint:** Product idea not disclosed explicitly during survey. Version C framing: *"We're building something for travel professionals — help shape it."* Signals intent, not specifics. Partial reveal happens at end of qual session only.

---

## 2. Hypotheses

### Quantitative (validated via survey)

| ID | Hypothesis | Measured by |
|---|---|---|
| H1 | Travel professionals are frustrated with current website situation | A3/B2 (situation) + A7/B7 (top frustration) |
| H2 | Current tools are fragmented (3+ tool stack) | A4/B3 (tool multi-select — count of selections) |
| H3 | Professionals spend significant time/money on website maintenance | A4c/B4 (time) + sub-questions (cost if outsourced) |
| H7 | Client-facing presentation (proposals/itineraries) is a pain point | A5/B5 (method) + A6/B6 (satisfaction scale) |

### Qualitative (validated via deep-dive sessions)

| ID | Hypothesis | Why qual not quant |
|---|---|---|
| H4 | AI-referred traffic/discovery is on their radar | Requires conversational probing — awareness varies widely. Q9 "AI assistants" option provides early signal only. |
| H5 | Willingness to pay £49–99/mo for integrated solution | Stated price in surveys = unreliable. Live probing after establishing pain depth = real signal. |

---

## 3. Target Population

Two segments, both included via branching. Analysed separately.

| Segment | Profile | Beachhead priority |
|---|---|---|
| Independent advisors (1–3 people) | Fora-type independents, US/UK | High — per product brief beachhead thesis |
| Small agencies (4–15 people) | Boutique custom/luxury agencies | Medium — original Tripwheel ICP |

**Branching tool:** Tally Forms. Segment captured at Q1, routes to separate question paths, rejoins for shared tail (Q9–Q11).

---

## 4. Research Design

### Quantitative — Survey

| Dimension | Decision |
|---|---|
| **Tool** | Tally (branching logic, mobile-optimised) |
| **Version** | C — "We're building something for travel professionals — help shape it" |
| **Hosting** | Tripwheel homepage |
| **Structure** | Q1 segments → two separate paths (advisor / agency) → shared tail |
| **Length** | 13 questions per path (2 optional) — ~4.5 min |
| **CTA at end** | Opt-in for free 20-min consultation (qual pipeline) |

**Version A (industry report)** held in reserve for Phase 2 distribution if homepage traffic is insufficient.

### Qualitative — Deep-dive sessions

| Dimension | Decision |
|---|---|
| **Format** | 20-min video call |
| **Structure** | Problem-first (15 min) → reveal at end (5 min) |
| **Interviewers** | Shad (asks) + Yousuf COO (notes) — roles fixed per session |
| **Sourced from** | Survey opt-ins only (self-selected warm leads) |
| **Reveal script** | Vague enough to not anchor, specific enough to gauge reaction: *"A platform that gives travel professionals a stronger digital presence — website, proposals, and how clients find you — working as one system instead of five different tools."* |

---

## 5. Survey Question Map

### Flow

```
Q1 (segment)
    ├── Advisor / creator → ADVISOR PATH (A2–A8)  ─┐
    ├── Agency / operator → AGENCY PATH (B2–B8)  ──┤→ Q9 → Q10 → Q11 → Thank you
    └── Other → Exit screen
```

### Advisor Path

| # | Question | Type | Hypothesis |
|---|---|---|---|
| A2 | Host agency affiliation | Single select | Beachhead segmentation |
| A3 | Website situation | Single select | H1 baseline |
| A4 | Tools used | Multi-select | H2 |
| A4b | Monthly tool spend (optional) | Single select | H5 baseline |
| A4c | Time on online presence per month | Single select | H3 |
| A4c-sub | Cost of outsourcing (if A4c = pays someone) | Single select | H3 cost variant |
| A5 | Trip presentation method | Multi-select | H7 |
| A6 | Presentation satisfaction | Opinion scale 1–5 | H7 depth |
| A7 | Biggest frustration (pick ONE) | Single select | H1 depth |
| A8 | Monthly inquiry volume | Single select | Sizing |

### Agency Path

| # | Question | Type | Hypothesis |
|---|---|---|---|
| B2 | Website platform | Single select | H2 base |
| B3 | Tools used | Multi-select | H2 |
| B3b | Monthly tool spend (optional) | Single select | H5 baseline |
| B4 | Time on website maintenance per month | Single select | H3 |
| B4-sub | Cost of outsourcing (if B4 = pays someone) | Single select | H3 cost variant |
| B5 | Trip presentation method | Multi-select | H7 |
| B6 | Presentation satisfaction | Opinion scale 1–5 | H7 depth |
| B7 | Biggest frustration (pick ONE) | Single select | H1 depth |
| B8 | Monthly booking/inquiry volume | Single select | Sizing |

### Shared Tail

| # | Question | Type | Purpose |
|---|---|---|---|
| Q9 | How clients find you (max 3) | Multi-select | H4 early signal + acquisition baseline |
| Q10 | One thing you'd change (optional) | Long text | Voice-of-customer copy |
| Q11 | Qual opt-in | Single select | Pipeline funnel |

---

## 6. Validation Thresholds

### Quantitative — tiered per hypothesis

| Hypothesis | 🟢 Strong | 🟡 Inconclusive | 🔴 Weak |
|---|---|---|---|
| H1 — Frustration | 60%+ select pain options | 40–59% | Below 40% |
| H2 — Fragmentation | 50%+ select 3+ tools | 30–49% | Below 30% |
| H3 — Time cost | Median 3+ hrs/mo OR $150+/mo outsourced | 1.5–3 hrs/mo | Below 1.5 hrs/mo |
| H7 — Presentation pain | 50%+ use PDF/email/Canva AND avg satisfaction below 3 | 30–49% | Below 30% |

### Decision rules

| Outcome | Action |
|---|---|
| 3–4 green | Proceed confidently. Qual confirms depth. |
| 2 green + 2 amber | Proceed cautiously. Qual MUST resolve ambers. |
| Any red | Investigate in qual before committing build resources. |
| All amber or worse | "Not yet." Extend timeline or re-segment. |

### Qualitative gate

| Signal | Threshold |
|---|---|
| Strong pain + specific cost attached | 60%+ of sessions → proceed |
| 40–60% | Pain exists, positioning needs rework |
| Below 40% | Beachhead segment wrong |

### Sample size gate

Minimum 30 responses per segment for usable signal. Below 40 total after 3 weeks = distribution problem, not market problem.

---

## 7. Distribution Plan

### Phase 1 — Version C (Tripwheel homepage)

- Survey embedded or linked on Tripwheel homepage
- Direct outreach to known contacts from team
- Personal LinkedIn posts (Shad, Yousuf, Arnav)

### Phase 2 — Version A (if volume insufficient after 3 weeks)

- Reframed as "State of Travel Agency Digital Presence — 2026 Industry Report"
- Posted in travel advisor Facebook groups (Fora community, ASTA, Travel Agent Collective)
- Hosted on separate landing page (PIXELVEGA branded or neutral domain)
- Respondents receive the report as incentive
- Viral loop: "Share with a colleague" prompt at survey end

---

## 8. Qual Session Design

**Script:** See `tripwheel-qual-script.md`

**Structure:**
- Part 1 — Their world (5 min): business type, website situation, client acquisition
- Part 2 — Pain excavation (8 min): top frustration, proposal workflow, cost of problem, tool stack, AI awareness (H4)
- Part 3 — Reveal + reaction (4 min): vague product reveal, price willingness probe (H5)

**Scoring per session (max 12 points):**

| Signal | Strong (3) | Moderate (2) | Weak (1) |
|---|---|---|---|
| Pain depth | Specific story + cost | Vague frustration | "It's fine actually" |
| Reveal reaction | "When can I use this?" | "Interesting idea" | "I don't really need that" |
| Price willingness | Named a number unprompted | Said "depends" | Wouldn't engage |
| Referrals given | 2+ names | 1 name | None |

Score 10–12 → founding member pipeline. Score 6–9 → keep warm. Below 6 → note segment + reason.

---

## 9. Open Items

| Item | Status | Owner |
|---|---|---|
| Tally build instruction | Next | Shad |
| Landing page copy | Done — see `tripwheel-landing-page-copy.md` | Shad |
| Qual interview script | Done — see `tripwheel-qual-script.md` | Shad + Yousuf |
| Timeline — launch date, run duration, qual start | Not set | Team |
| Version A landing page + report template | Held for Phase 2 | — |
| Calendly or cal.com setup for Q11 booking link | Not set | Team |

---

## 10. Context Documents

| Document | Relevance |
|---|---|
| `travel-platform-product-team-brief.md` | Product vision, beachhead thesis, 50-conversation plan, metrics |
| `MVP_Priorities___Roadmap.md` | Original Tripwheel MVP scope and design direction |
| `COMPETITOR_ANALYSIS_DEEP.md` | 8 competitors, gap analysis, positioning statement |
| `COMPETITOR_MASTER_SHEET.md` | 14 competitors, scores, displacement target |
| `mvp-scope-comparison-analysis.md` | CXO alignment on features, workshop decisions |
| `island-maldives-agency-persona-research.md` | Agency website patterns, traveler pain points, opportunities |

