# Tripwheel - Itinerary Builder Product Spec

Owner: Shad - shad@tripwheel.io  
Version: **v0.1-itinerary-builder-single-html** - Jun 26, 2026  
Target prototype: `prototypes/itinerary-builder-v0.1.html`  
Research source: `research-itinerary-v2.html`

Scope: a single self-contained HTML prototype for a map-first itinerary building tool that turns scattered planning into a beautiful, shareable, no-login itinerary page.

---

## Problem Statement

Travellers plan across too many tabs, apps, notes, maps, bookings, and group chats. They want the entire trip in one place, but current tools force an awkward tradeoff:

- Spreadsheets and Notion are flexible, but manual and visually flat.
- TripIt is useful for logistics, but not great for route-shaped activity planning.
- Wanderlog is powerful, but can feel heavy for lightweight trips.
- Pure AI tools are fast, but generic, untrusted, and rarely spatial.

Tripwheel can own the gap identified in the research: a **beautiful, shareable, map-first itinerary** that feels easy to open, easy to understand, and easy to polish.

---

## Product Bet

The itinerary should be both a planning workspace and the final artifact.

The core bet: if Tripwheel makes the itinerary itself beautiful, spatial, and no-login shareable, the product becomes useful for both planners and viewers. The builder should feel like "Google Trips meets a polished travel story," not like another spreadsheet with pins.

### Research Opportunities Covered

| Opportunity | Product response |
|---|---|
| Beautiful + shareable by default | Every trip has a polished traveler view and a no-login share/export path. |
| Map-first, not map-sidebar | The map is a primary planning surface. Day order and pin order stay connected. |
| AI draft to human polish | Users can paste/import an AI draft, then edit, reorder, group, and improve it manually. |
| Offline-first design | Trip content persists locally and remains readable without network. Maps degrade gracefully. |
| Smart day builder | The UI nudges users toward anchors, buffers, meals, nearby gap-fills, and less zigzagging. |
| Multi-player planning | MVP supports no-login group viewing and lightweight share/review affordances; true co-editing is later. |

---

## Goals

- Let a user create a polished 2-4 day city itinerary in under 10 minutes.
- Make the map central to planning, not a secondary preview.
- Produce a traveler-facing page that can be opened by anyone without signup.
- Preserve the trip locally across refreshes and offline sessions.
- Support AI-assisted starting points without depending on a backend or API key in the prototype.
- Encode advisor best practices: one anchor per day, geographic flow, meals, buffers, optionality, and Plan B thinking.

## Non-Goals

- No production backend.
- No account system or trip library.
- No real-time collaboration.
- No live bookings, payments, reservations, flight alerts, or opening-hours validation.
- No server-side AI generation.
- No guaranteed offline map tiles. Offline content matters first; map tiles can degrade.

---

## Primary Users

### Planner

Creates the itinerary, imports ideas, arranges days, checks geography, adds notes, and shares the final plan.

### Viewer

Opens the shared itinerary on mobile or desktop with no account. Needs clarity, not editing power.

### Group Participant

Receives the plan, reviews it, understands what is fixed vs optional, and may want to comment or vote in a later version.

---

## MVP Concept

Build one HTML file with two modes:

1. **Builder mode** for creating and editing the trip.
2. **Traveler view** for sharing, reading, printing, or exporting the itinerary.

The same in-browser data model powers both. The prototype should ship as a static HTML file with inline CSS and JavaScript. External libraries are allowed only when they are loaded by CDN and degrade acceptably if unavailable.

Recommended prototype stance:

- Use `localStorage` for draft persistence.
- Use compressed URL hash sharing for small/medium trips.
- Include import/export JSON for larger trips.
- Use a map library only if it can degrade into a list/card route view.
- Treat AI as an import/parsing flow, not a live generation flow.

---

## Information Architecture

```
ItineraryBuilderHTML
|-- AppHeader
|   |-- Tripwheel mark
|   |-- Mode toggle: Build / Preview
|   |-- Save state indicator
|   `-- Actions: Import AI draft / Share / Export
|-- BuilderMode
|   |-- TripSetupPanel
|   |-- DayNavigator
|   |-- MapWorkspace
|   |-- DayTimelinePanel
|   |-- StopEditorDrawer
|   `-- SmartSuggestionsPanel
|-- PreviewMode
|   |-- CoverHero
|   |-- TripSummary
|   |-- MapAndRoute
|   |-- DayTabs
|   |-- TravelerTimeline
|   |-- OfflineNotice
|   `-- PrintPDFView
`-- DataUtilities
    |-- Local persistence
    |-- URL hash import/export
    |-- JSON import/export
    `-- AI draft parser
```

---

## Core User Flow

1. User opens the single HTML prototype.
2. User creates a trip manually or imports an AI draft.
3. User adds destination, dates, cover image/theme, and trip note.
4. User builds each day with stops, meals, anchors, optional items, buffers, and notes.
5. User uses the map to check geographic flow and reorder stops.
6. Smart suggestions flag overloaded days, zigzags, missing meals, and missing buffers.
7. User switches to Preview to see the polished itinerary.
8. User copies a share link, exports JSON/HTML, or prints to PDF.
9. Viewer opens the itinerary without login and sees the read-only traveler view.

---

## Builder Mode Requirements

### Trip Setup

Fields:

- Trip title
- Destination
- Start date and end date
- Traveler type: solo, couple, friends, family, multigenerational
- Pace: relaxed, balanced, packed
- Cover image URL or gradient theme
- Short trip note

Behavior:

- Generate day shells from dates.
- Allow manual day add/remove for flexible prototypes.
- Save every change locally.
- Show "Saved locally" / "Unsaved" / "Restored from browser" states.

### Day Navigator

Shows all trip days as compact tabs or pills.

Each day displays:

- Date or day number
- Neighbourhood focus, if set
- Anchor count
- Stop count
- Warning state if overloaded or missing essentials

### Day Timeline

Each day is built from ordered itinerary items.

Supported item types:

- Anchor
- Activity
- Meal
- Buffer
- Transit
- Optional
- Wildcard
- Plan B

Each stop/item can include:

- Name
- Type
- Time window
- Neighbourhood/location text
- Coordinates, optional
- Description
- Why it matters
- Booking/reference details
- Cost hint
- Accessibility or family note
- Indoor/outdoor tag
- Link
- Image URL, optional

Interactions:

- Add item.
- Duplicate item.
- Delete item.
- Drag/reorder item.
- Move item to another day.
- Mark as anchor, optional, wildcard, or Plan B.
- Collapse/expand item details.
- Reordering in the timeline updates map route order.

### Map Workspace

The map must behave as a planning tool, not a decorative preview.

Required behavior:

- Show pins for all stops with coordinates.
- Color or number pins by active day.
- Click a pin to focus the matching timeline card.
- Click a timeline card to focus the matching pin.
- Show a lightweight route line for the active day when possible.
- Allow stops with no coordinates to remain in the itinerary and appear in a "Needs location" list.
- Degrade to an ordered route/list view if the map library or tiles fail.

Optional prototype behavior:

- Drag a pin to update coordinates.
- "Batch by neighbourhood" action that groups nearby stops.
- Transit-time placeholder based on rough distance, clearly labelled as estimate.

### AI Draft Import

The prototype should not call a live AI API. Instead, support **AI draft to human polish** through import.

Entry points:

- Paste free-text itinerary.
- Paste structured JSON-ish itinerary.
- Load sample AI draft.

Parser behavior:

- Detect days.
- Detect likely times.
- Detect likely meals.
- Detect activity names.
- Create editable day items.
- Ask for confirmation before replacing current trip.
- Offer "append to current trip" vs "replace current trip."

Important copy:

- "AI gets you started. You make it yours."
- "Review locations and timing before you travel."

### Smart Day Builder

Smart assistance should encode the travel-advisor heuristics from the research.

MVP suggestions:

- Add buffer: flag days with back-to-back items.
- One anchor: flag days with zero anchors or too many anchors.
- Geographic flow: flag obvious coordinate zigzags.
- Meal backbone: flag days missing lunch or dinner.
- Save for later: suggest moving extra stops to optional.
- Tuesday Test: suggest adding one indoor Plan B for outdoor-heavy days.

Suggestion behavior:

- Suggestions are cards, not blocking errors.
- User can accept, dismiss, or ignore.
- Accepted suggestions make visible edits.
- Dismissed suggestions should stay dismissed for the session.

---

## Traveler View Requirements

The traveler view is the output artifact. It should feel like a polished travel page, not an admin preview.

### Cover

Includes:

- Destination
- Trip dates
- Title
- Cover image or gradient
- Trip note
- Quick stats: days, stops, anchors, optional saves

### Day View

Each day shows:

- Day title and date
- Neighbourhood focus
- One-line plan summary
- Anchor item highlighted
- Timeline of items
- Optional/wildcard items visually softer
- Plan B items grouped or tagged
- Map segment for the day

### Shareability

The viewer must not need:

- Account creation
- App install
- Permissions
- Editing context

Share actions:

- Copy share link.
- Download JSON backup.
- Export current itinerary as standalone HTML if feasible.
- Print / save as PDF.

If URL hash payload is too large, show a clear fallback:

> This trip is too large for a link. Export the itinerary file instead.

### Offline Behavior

The itinerary content should remain readable without network.

Required:

- Save trip data locally.
- Restore trip data after refresh.
- Show offline-friendly copy when map or image resources fail.
- Keep the traveler timeline usable without map tiles.

Out of scope:

- Full offline map tile storage.
- Cross-device sync while offline.

---

## Collaboration Scope

The research identifies group planning as a major opportunity, but true multiplayer does not fit a single static HTML MVP.

MVP collaboration:

- No-login read-only sharing.
- Clear "fixed" vs "optional" visual states.
- Exportable itinerary for group chats.
- Prototype-only affordances for reactions/votes can appear as disabled or local-only UI.

Later collaboration:

- Hosted share links.
- Comment threads.
- Voting on optional stops.
- Real-time co-editing.
- Permissions: owner, editor, viewer.
- Conflict resolution and version history.

---

## Visual And Interaction Principles

- **Map first:** lead with place and flow.
- **Framework, not contract:** anchors matter; optionality stays visible.
- **Beautiful by default:** the share view should be good enough to send without editing.
- **No-login empathy:** optimize for the least technical recipient.
- **Calm density:** avoid spreadsheet energy; use cards, spacing, and visual hierarchy.
- **Honest AI:** every AI-imported item is editable and reviewable.
- **Offline confidence:** the plan should not disappear when data does.

---

## Acceptance Criteria

- A user can create a 3-day itinerary with at least 3 stops per day.
- A user can import a sample AI draft and convert it into editable itinerary items.
- A user can mark items as anchor, optional, wildcard, meal, buffer, or Plan B.
- A user can reorder items and see the order reflected in the map/list route.
- A user can switch between Builder and Traveler View without losing data.
- The itinerary persists after page refresh.
- The app can restore itinerary data from a copied share URL for normal-sized trips.
- The read-only view hides editing controls.
- The traveler view works on mobile without horizontal scrolling.
- The print/PDF view is readable and visually clean.
- If map resources fail, the itinerary remains usable as a timeline and route list.
- If the share URL is too large, the app offers JSON or HTML export instead.
- AI import never replaces current work without confirmation.

---

## Implementation Decisions

- Build as one static HTML file with inline CSS and JavaScript.
- Use a single in-memory trip object as source of truth.
- Persist to `localStorage` on every meaningful change.
- Encode share data in the URL hash for the prototype.
- Keep hosted short links, auth, and database-backed sync out of v0.1.
- Keep live AI out of v0.1; support paste/import only.
- Keep map integration resilient: map-enhanced when available, itinerary-first when not.
- Prefer accessible native controls for forms, dialogs, tabs, and buttons.

### Suggested Deep Modules Inside The Single File

These should be plain JavaScript modules/sections inside the HTML, not separate files:

- Trip state manager
- Persistence and share encoder
- AI draft parser
- Day and stop renderer
- Map adapter
- Smart suggestion engine
- Preview/print renderer

---

## Data Model

Minimum conceptual objects:

| Object | Required fields |
|---|---|
| Trip | id, title, destination, dates, travelerType, pace, cover, note, days |
| Day | id, label, date, focusArea, summary, items |
| Item | id, type, title, startTime, endTime, locationText, coordinates, description, tags, notes, links |
| Suggestion | id, type, severity, dayId, itemIds, message, action |

The model should tolerate incomplete data. A stop without coordinates is still valid; it simply cannot render as a precise pin yet.

---

## Test Plan

Manual prototype checks:

- Create trip from scratch.
- Import sample AI draft.
- Refresh and confirm local restore.
- Reorder stops and confirm timeline/map sync.
- Remove coordinates from a stop and confirm graceful handling.
- Toggle Builder/Preview repeatedly.
- Copy share link, open in a fresh tab, confirm reconstruction.
- Test a deliberately large trip and confirm export fallback.
- Disable network and confirm itinerary text remains readable.
- Print/save to PDF from Traveler View.
- Check mobile width at 390px and desktop width at 1440px.

Behavior worth automating later:

- AI draft parser fixtures.
- URL encode/decode round trip.
- Suggestion engine rules.
- Local persistence migration if the data model changes.

---

## Out Of Scope For This Prototype

- Production hosting of trip data.
- User accounts.
- Team workspaces.
- Real-time multiplayer.
- External booking inventory.
- Payments.
- Live weather.
- Live transit.
- Real AI generation.
- Verified reviews or local expert marketplace.
- Native mobile app.

---

## Open Questions

- Is `single HTML` a hard constraint, or can the prototype include a service worker for stronger PWA behavior?
- Should the first demo optimize for desktop planning, mobile viewing, or both equally?
- Which map provider is acceptable for prototype use?
- Should the share link be the primary sharing method, or should exported standalone HTML be the safest default?
- Should disabled/local-only group voting appear in v0.1 to signal the roadmap?
- Should Tripwheel's first itinerary demo feel more like a utility app, a travel story, or a hybrid?

