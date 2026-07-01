# Tripwheel — Itinerary Builder: Advisor Dashboard
### IA + Spec (the layer around the single-trip builder)

**Date:** June 26, 2026 · **Builds on:** `Tripwheel_Itinerary_Demo_Spec.md`, `itinerary-builder.html`
**This pass builds:** Itineraries Library · Templates · Engagement (share-tracking)

---

## 1. The gap

`itinerary-builder.html` shows one trip beautifully. But a travel advisor doesn't have *a* trip — they run **many trips for many clients** at once. The builder is the leaf; this spec defines the **trunk**: where an advisor lands, finds the right trip, spins up new ones fast, reuses what works, and sees whether clients actually opened what they sent.

Without this layer the feature is a toy. With it, it's an advisor's daily workspace.

---

## 2. Information architecture

The "Itinerary Builder" sidebar item opens an **advisor workspace** with three tabs, plus the single-trip **Builder** reached by opening any trip.

```
Itinerary Builder (sidebar)
│
├── Itineraries        ← LANDING. Library of every trip across all clients
│     └── [Open a trip] → Single-Trip Builder (itinerary-builder.html)
│     └── [New trip]    → blank · from template · AI draft
│
├── Templates          ← Reusable starting points the advisor owns
│     └── [Use]        → new trip prefilled from template → Builder
│
└── Engagement         ← Did the client open it? Views, comments, activity
      └── [Open a trip] → Builder

Secondary (IA noted, not built this pass):
• Clients            ← per-client profile + that client's trips
• Workspace home     ← cross-feature advisor overview
```

Sidebar, topbar, tokens, and components are inherited verbatim from `v0.4.3`. Advisor screens switch via `tool-tabs` (the same pattern the Social Media tool uses). Opening a trip hands off to the builder file.

---

## 3. Shared data model (advisor layer)

```
Itinerary {
  id, title, destination, client{name,initials,color},
  dateRange, days, stops,
  status: draft | shared | booked | archived,
  lastEdited, thumbnailHue,
  engagement{ views, lastOpened|null, comments, opened:bool },
  collaborators[]
}
Template {
  id, title, destination, durationDays, category,
  usedCount, thumbnailHue, blurb
}
Activity { who, action, itinerary, time }   // engagement feed
```

Status is the spine of the whole workspace — it drives filters, counts, badge colors, and the engagement view.

---

## 4. Screen specs

### 4.1 Itineraries Library — the hub *(landing screen)*

**Purpose:** find any trip in seconds; see status at a glance; create new fast.

**Layout (top → bottom):**
- **Tool head:** "Itineraries" + sub ("12 active · 5 shared · 3 booked"). Primary **New itinerary** button (menu: *Blank* / *From template* / *AI draft*). Secondary **New template**.
- **Stat row (4 cards):** Active itineraries · Shared this month · Total client views · Awaiting client response. Each with a small trend.
- **Filter bar:** search box; status chips (All / Drafts / Shared / Booked / Archived); client filter; destination filter; sort (Last edited / Departure / Client A–Z); grid⇄list toggle.
- **Grid of itinerary cards** (default) — each card:
  - Thumbnail band (map-style gradient keyed to destination) with status pill overlaid.
  - Title · destination.
  - Client row: avatar + name.
  - Meta: dates · N days · N stops.
  - Engagement mini: 👁 views · 💬 comments (or "Not shared yet").
  - Hover actions: **Open**, **Share**, **⋯** (Duplicate, Save as template, Archive).
- **List view:** same data as dense rows (table-like) for advisors with many trips.

**States:** empty (no trips → big CTA), filtered-empty, loading. Status pill colors: draft = neutral, shared = accent/blue, booked = green (ok), archived = muted.

**Key interactions:** Open → builder. New → builder (blank/AI) or template picker. Card ⋯ → Save as template feeds the Templates screen.

---

### 4.2 Templates — reusable starting points

**Purpose:** advisors resell the same regions constantly (the research's ~90% reusability for island tours). Templates turn a great trip into a 10-second starting point.

**Layout:**
- **Tool head:** "Templates" + sub ("8 templates · used 142 times"). **New template** button (+ "from an existing itinerary").
- **Category chips:** All / Beach & Island / City Break / Multi-city / Adventure / Honeymoon.
- **Grid of template cards:**
  - Thumbnail (gradient + destination).
  - Title · duration ("7 days") · category tag.
  - Blurb (one line).
  - **Used N times** + last-used.
  - Actions: **Use template** (→ new prefilled trip in builder), **Preview**, **Duplicate**.
- An **"Owned by you" vs "Tripwheel starters"** split is noted for later (starter library).

**Why it matters:** ties directly to advisor efficiency and is the natural home for "Save as template" coming off the Library.

---

### 4.3 Engagement — share-tracking

**Purpose:** the question every advisor asks after sending a trip: *did they even open it?* Closes the loop the single-builder share can't show.

**Layout:**
- **Tool head:** "Engagement" + sub ("9 links shared · 67% open rate").
- **Stat row:** Links shared · Open rate · Avg views per trip · Comments awaiting reply.
- **Shared-itineraries table:** Client · Itinerary · Status (Opened / Not opened yet / Commented) · Views · Last opened · Comments · quick **Open** / **Nudge** (resend link). Status as pills; "Not opened" highlighted so advisors can follow up.
- **Activity feed (right rail):** chronological — "Dana opened *Maldives 6-night* · 2h ago", "Client commented on Day 3 of *Kyoto & Osaka*", "You shared *Amalfi Coast* with the Patels". Avatars + timestamps.

**States:** not-opened rows are the action surface (nudge); commented rows route to the builder's comment thread.

---

## 5. How it connects to the builder

| From | Action | Goes to |
|---|---|---|
| Library card | Open | `itinerary-builder.html` |
| Library | New (blank / AI) | builder, fresh trip |
| Templates | Use template | builder, prefilled |
| Engagement row | Open / view comment | builder (comments) |
| Builder card ⋯ | Save as template | Templates screen |

For the demo, "Open" links to the existing builder file; deep-prefill is mocked (the builder always loads the seeded Kyoto trip).

---

## 6. Non-goals (this pass)

Clients screen and cross-feature workspace home (IA-noted only) · real auth/multi-tenant data · real per-template prefill into the builder · real email "nudge". Mocked convincingly per the demo rules in the parent spec.

---

## 7. Build order

1. Shell + tab switching + seed data.
2. Itineraries Library (stat row, filters, card grid + list toggle, New menu).
3. Templates grid.
4. Engagement (stats, table, activity feed).
5. Wire Open/New/Use → builder; Save-as-template → Templates.
6. Validate; visual QA.
