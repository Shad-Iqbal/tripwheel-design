# Itinerary Builder — Trip Brief (Spec vc1.3)
### The missing front door: capture the client's ask before planning

**Date:** June 27, 2026 · **Builds on:** vc1.2 (MVP), `prototypes/v0.5.0-states.html`
**Adds:** a lightweight **Trip Brief** that opens the workflow and powers the AI.

---

## 1. The job it fills

> *"Before I plan, capture what the client actually wants — so the plan, and the AI draft, reflect their real ask."*

Today the builder jumps straight to stops, and the AI drafts generically. The Brief is the cheapest fix to the biggest MVP gap (see vc1.2 critique): it anchors planning, makes "Draft this day" genuinely useful, and is the natural home for the requirements an advisor already collects on a discovery call.

Scope guard: this is **intake, not a CRM**. One brief per itinerary. No client history, no questionnaires sent to clients (that's later).

---

## 2. Principles

- **One short form, not a wizard.** The brief is ~8 fields on one screen. If it feels like paperwork, advisors skip it.
- **Optional but rewarded.** You can still start blank; a filled brief visibly improves the AI draft and the day suggestions.
- **It travels with the trip.** Always editable from the builder, never a dead one-time step.
- **Reuse atoms.** Same tokens, `.field`, chips, `.modal-overlay` as the rest of the feature.

---

## 3. Where it slots

### 3.1 New-itinerary flow — unify around the brief
Replace the current three-tab modal (Blank / Template / AI) with **one brief form + a "Start from" choice** at the bottom. The brief is shared; the start mode just decides how the days get seeded.

```
New itinerary  ▸ modal
┌───────────────────────────────────────────────┐
│ Trip name*            Destination(s)*          │
│ Dates (start → length)        Client ▾         │
│ Travellers  [2 adults] [+ kids/ages]           │
│ Budget      ( $  $$  $$$ )                      │
│ Pace        ( Relaxed · Balanced · Packed )    │
│ Interests   [Food][Culture][Nature][Nightlife] │
│             [Shopping][Relax][Adventure][History]│
│ Must-dos    free text / chips                  │
│ Notes/limits  dietary, mobility, "no early AM" │
│ ───────────────────────────────────────────── │
│ Start from:  ( ◉ Blank )( ○ Template )( ○ AI ) │
│   • Template → inline template picker          │
│   • AI       → "Generate draft" uses the brief │
│                                [Cancel][Create]│
└───────────────────────────────────────────────┘
```

- **Blank** → opens builder with empty days + the brief saved.
- **Template** → picker appears; chosen template prefills days; brief still captured/edited.
- **AI** → "Generate draft" builds the prompt **from the brief** (party, pace, budget, interests) → preview → Create.

This removes the awkward field duplication in today's Blank tab and makes AI non-generic.

### 3.2 Builder — a persistent, editable brief
- A slim **brief summary bar** under the day tabs: chips for party · budget · pace · top interests, plus an **Edit brief** affordance. Collapsible.
- If no brief: a calm nudge — *"Add a trip brief to get sharper AI drafts"* (one line, dismissable), not a blocker.
- **Edit brief** opens the same form as a modal.

### 3.3 AI — read the brief
Both **"Generate draft"** (new flow) and **"Draft this day"** (builder) consume the brief:
- Pace → number of stops/day + buffer (Relaxed = fewer, more gaps; Packed = denser).
- Interests → suggestion category mix (Foodie → more food stops).
- Travellers → suitability ("teen-friendly", "stroller-ok").
- Budget → tier of suggestions.
- Must-dos → pinned first; Avoid → filtered out.

(For the prototype, this is mocked convincingly: the seed suggestion pools get tagged so the mock can *show* the brief changing the mix — e.g., "Relaxed pace · trimmed to 1 anchor + 1 option.")

---

## 4. Data model

```
Itinerary.brief = {
  travellers: { adults:int, kids:int, notes:str },   // "2 adults, 2 teens"
  budget: "value" | "mid" | "premium",
  pace: "relaxed" | "balanced" | "packed",
  interests: [str],          // chip ids
  mustDos: [str],
  avoid: str,                // constraints: dietary, mobility, timing
  client: { name, initials, color }
}
```
Destination, dates, name already live on the itinerary. `brief` is additive — nothing else changes.

---

## 5. Fields (MVP set)

| Field | Control | Why an advisor needs it |
|---|---|---|
| Trip name * | text | identity |
| Destination(s) * | text | scope; multi-city allowed |
| Dates | start + length | structure |
| Client | select | who it's for |
| Travellers | steppers (adults/kids) + note | suitability, room/seat counts later |
| Budget | 3-way toggle ($/$$/$$$) | tiers suggestions; sets up future pricing |
| Pace | 3-way toggle | the #1 driver of over/under-scheduling |
| Interests | chips (multi) | drives AI mix + relevance |
| Must-dos | chips/free text | non-negotiables, pinned |
| Notes / limits | text | dietary, mobility, timing constraints |

Required for "Create": name + destination only. Everything else optional but feeds the draft.

---

## 6. States

- **Empty brief** (blank start): builder nudge to add one; AI still works but flags "generic — add a brief for tailored results."
- **Partial**: AI uses what's there.
- **Complete**: summary bar shows full chip set; AI references it explicitly in the draft preview.
- **Edited after planning**: changing pace/interests offers (optional) "re-draft suggestions" — does **not** silently rewrite existing days.

---

## 7. Out of scope (vc1.3)

Client-facing intake forms, client records/history, supplier preferences, budget *amounts*/pricing math (that's the separate cost spec), saving briefs as reusable presets.

---

## 8. Build steps

1. Add `brief` to the itinerary model + a shared brief form component (modal body).
2. Rework New-itinerary modal → brief form + "Start from" selector (Blank/Template/AI); keep template picker + AI generate, both reading the brief.
3. Builder: brief summary bar under day tabs + Edit-brief modal + empty nudge.
4. Wire brief → mock AI (tag seed pools; vary count/mix by pace/interests; pin must-dos).
5. Show brief context in viewer header (optional, subtle: "Planned for 2 adults + 2 teens · relaxed pace") — reinforces personalization for the traveller.
6. Validate; update changelog entry when built.

---

## 9. Why this first (recap)

It's the smallest addition that (a) fills the top JTBD gap, (b) upgrades the AI from gimmick to useful, and (c) sets the schema hooks for the next two advisor jobs — **lodging/transport blocks** and **cost/pricing** — without rework.
