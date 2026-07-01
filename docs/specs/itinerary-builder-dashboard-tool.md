# Tripwheel - Itinerary Builder Dashboard Tool Spec

Owner: Shad - shad@tripwheel.io  
Version: **v0.1-itinerary-dashboard-tool** - Jun 26, 2026  
Design reference: `prototypes/v0.4.3-states.html`  
Target prototype: `prototypes/itinerary-builder-dashboard-v0.1.html`

Scope: an independent product spec for adding Itinerary Builder as a first-class tool inside the current Tripwheel authenticated dashboard. This is not a standalone travel page. It should inherit the v0.4.3 app shell, topbar, sidebar, tabs, panels, empty states, button styles, neutral palette, and low-density SaaS feel.

---

## Product Intent

Tripwheel users need a simple way to turn a trip idea into a clean itinerary without leaving the dashboard. The first version should prioritize ease of use over novelty: fast setup, clear day-by-day organization, reusable templates, autosave, and a polished preview.

The user should feel: "I know where I am, I know what to do next, and I can get a usable itinerary quickly."

---

## Core User Need

Travel operators, creators, and small teams need to build trip plans repeatedly. Their pain is not only inspiration; it is turning details into a structured client-ready itinerary while juggling social posts, photos, and future bookings in the same workspace.

Tripwheel should solve the practical workflow first:

- Create a trip quickly.
- Add days and stops without a blank-page problem.
- Keep trip details organized.
- Preview what the traveler will see.
- Reuse or duplicate work for similar trips.
- Keep the experience consistent with the rest of the dashboard.

---

## Product Priorities

1. **Ease of first itinerary creation.** The user should not need to understand maps, AI, bookings, or collaboration before creating Day 1.
2. **Dashboard consistency.** Use the existing shell and component language from v0.4.3.
3. **Clear structure.** Day-by-day planning is the primary mental model.
4. **Fast editing.** Adding, duplicating, reordering, and moving items should be lightweight.
5. **Preview confidence.** The user should always be able to see the traveler-facing output.
6. **Progressive power.** Templates, AI, maps, sharing, and collaboration can layer in after the core workflow is calm.

---

## Dashboard Integration

### Sidebar

Move `Itinerary Builder` from the disabled `Coming soon` group into the active `Tools` group.

```
Sidebar
|-- Tools
|   |-- Dashboard
|   |-- Social Media
|   |-- Photo Tool
|   `-- Itinerary Builder
`-- Coming soon
    |-- Trip Listing
    |-- Bookings
    |-- Payments
    |-- Reports
    |-- Team
    `-- Settings
```

Navigation behavior:

- Active state uses the existing active nav pattern: light accent background and left accent bar.
- Itinerary Builder keeps the current map icon from the disabled state.
- Other coming-soon tools remain disabled with `Soon` pills.

### Topbar

Use the same topbar pattern as Social Media and Photo Tool.

List state:

```
Topbar
|-- Breadcrumb: Tools /
|-- Title: Itinerary Builder
|-- Search: Search itineraries, destinations...
|-- Notifications
|-- Help
`-- Primary CTA: New itinerary
```

Builder state:

```
Topbar
|-- Breadcrumb: Tools / Itinerary Builder /
|-- Title: Amalfi Coast Spring Escape
|-- Search: Search this itinerary...
|-- Notifications
|-- Help
|-- Secondary CTA: Preview
`-- Primary CTA: Share
```

If sharing is not implemented in the single HTML prototype, the primary CTA should read `Save itinerary` and `Share` can appear disabled or as a prototype-only modal.

### Main Content

Use `.main` max-width and spacing from v0.4.3. Avoid full-bleed travel landing-page treatment inside the dashboard. Rich imagery belongs in preview cards, not the overall app shell.

---

## Information Architecture

The tool has four tabs.

```
Itinerary Builder
|-- Itineraries
|-- Builder
|-- Preview
`-- Templates
```

### Tab Purpose

| Tab | Purpose |
|---|---|
| Itineraries | Manage all itinerary drafts and shared plans. |
| Builder | Edit one itinerary with trip basics, days, and items. |
| Preview | See the traveler-facing version before sharing/exporting. |
| Templates | Start from reusable trip structures. |

The default entry should be:

- Empty account: `Itineraries` with an empty state.
- Existing account: `Itineraries` list.
- After clicking `New itinerary`: builder setup state.
- After opening a row: builder active state.

---

## Screen 1: Itineraries List

Goal: let users find, create, duplicate, archive, and reopen itineraries.

### Empty State

```
ItinerariesEmpty
|-- EmptyState icon: map
|-- Title: Create your first itinerary
|-- Body: Build a clean day-by-day trip plan your travelers can understand at a glance.
|-- Primary button: New itinerary
`-- Secondary link: Start from a template
```

Rules:

- One clear primary CTA.
- Secondary action is useful but visually quiet.
- Do not show KPI cards or teaser grids on the empty page.

### Active State

```
ItinerariesList
|-- ToolHead subcopy: 8 itineraries - 3 drafts - 2 ready to share
|-- ToolTabs: Itineraries / Builder / Preview / Templates
|-- FilterBar
|   |-- Status chips: All / Draft / Ready / Shared / Archived
|   |-- Destination filter
|   `-- View toggle: List / Cards
|-- ItineraryRow group: Draft
|-- ItineraryRow group: Ready
`-- ItineraryRow group: Shared
```

Row content:

- Destination thumbnail or neutral map illustration.
- Itinerary title.
- Destination.
- Date range.
- Traveler count or audience.
- Status pill.
- Last edited.
- Completeness hint, such as `4 days - 12 stops - missing preview`.
- Row actions: Open, Duplicate, Archive, More.

Status pills:

- Draft: neutral.
- Ready: info/accent.
- Shared: success.
- Needs details: warning.
- Archived: neutral outline.

---

## Screen 2: New Itinerary Setup

Goal: prevent the blank-page problem.

Launch when the user clicks `New itinerary`.

```
NewItinerarySetup
|-- Panel: Start with the basics
|   |-- Trip title
|   |-- Destination
|   |-- Start date
|   |-- End date
|   |-- Traveler type
|   |-- Pace
|   `-- Primary button: Create itinerary
|-- Panel: Or start from a template
|   |-- Weekend escape
|   |-- Group tour
|   |-- Family trip
|   `-- Custom itinerary
`-- Small note: You can change everything later.
```

Interaction rules:

- Destination and title are required.
- Dates are recommended but not required in the prototype.
- If dates are provided, generate day shells automatically.
- If no dates are provided, create `Day 1` only.
- After creation, move the user to the `Builder` tab.

---

## Screen 3: Builder

Goal: make day-by-day itinerary editing fast and understandable.

### Builder Layout

Use a dashboard-friendly two-column layout.

```
BuilderTab
|-- ToolHead subcopy: Draft - Last saved 18 seconds ago - 4 days
|-- BuilderLayout
|   |-- Main column
|   |   |-- TripOverviewPanel
|   |   |-- DayTabs
|   |   |-- DayPanel
|   |   |-- AddItemRow
|   |   `-- NotesPanel
|   `-- Side column
|       |-- ItineraryHealthPanel
|       |-- TripSummaryPanel
|       |-- QuickActionsPanel
|       `-- PreviewCard
```

The map should not dominate v0.1. In this dashboard version, route confidence is a supporting feature, not the core screen. A compact `Places` or `Route check` panel can appear in the side column or later as a Preview sub-section.

### Trip Overview Panel

Fields:

- Title.
- Destination.
- Date range.
- Traveler type.
- Traveler count.
- Pace: relaxed, balanced, packed.
- Internal note.

Behavior:

- Inline edit.
- Autosave.
- Missing required fields show inline hints.
- No full-page blocking validation.

### Day Tabs

Display each day as a horizontal tab row, matching existing tool tabs but scoped inside the builder.

Day tab content:

- `Day 1`
- Date, if known.
- Small count: `4 items`
- Warning dot if incomplete.

Actions:

- Add day.
- Duplicate day.
- Reorder days.
- Rename day focus, such as `Old Town`.

### Day Panel

```
DayPanel
|-- PanelHead
|   |-- Title: Day 1
|   |-- Subtitle: Thu, Jun 18 - Old Town
|   `-- Actions: Duplicate day / More
|-- ItineraryItemRow
|-- ItineraryItemRow
|-- AddItemRow
`-- EmptyDayState
```

Item types:

- Activity.
- Meal.
- Hotel/stay.
- Transport.
- Free time.
- Note.

Item row content:

- Time or time window.
- Type icon.
- Title.
- Location.
- Short note.
- Status/role pill: Must-do, Optional, Booked, Needs detail.
- Row actions: Edit, Duplicate, Move, Delete.

Keep the row interaction similar to Social Media post rows and Photo Tool option rows: clear title, muted metadata, compact actions on the right.

### Add Item Flow

The simplest path:

1. Click `Add item`.
2. Choose type from segmented options or dropdown.
3. Enter title.
4. Optional fields expand below.
5. Save returns to the day list.

Required fields for an item:

- Type.
- Title.

Optional fields:

- Time.
- Location.
- Description.
- Booking/reference.
- Link.
- Cost note.
- Private/internal note.

### Itinerary Health Panel

A lightweight guidance panel in the side column.

Checks:

- Missing destination.
- No days.
- Empty day.
- Day has no meal.
- Day has more than 6 planned items.
- Item missing title.
- Ready to preview.

Tone:

- Helpful, not judgmental.
- Use existing semantic pills and warning colors.
- Each suggestion should include a direct action when possible.

Example:

```
Itinerary health
|-- Ready: Trip basics complete
|-- Needs detail: Day 2 has no lunch or dinner
`-- Suggestion: Day 3 has 8 items. Mark a few as optional.
```

### Quick Actions Panel

Actions:

- Add day.
- Add item.
- Duplicate itinerary.
- Start from template.
- Open preview.

Keep this panel small. Do not compete with the primary topbar CTA.

---

## Screen 4: Preview

Goal: let the operator review what the traveler will see before sharing.

Preview should still sit inside the dashboard shell in this prototype.

```
PreviewTab
|-- PreviewToolbar
|   |-- Device toggle: Desktop / Mobile
|   |-- Secondary: Print
|   `-- Primary: Share
|-- TravelerPreviewCard
|   |-- Cover block
|   |-- Trip summary
|   |-- Day sections
|   `-- Footer note
`-- MissingDetailsPanel, if needed
```

Preview rules:

- Hide internal notes.
- Show traveler-safe descriptions.
- Show day-by-day content in a clean reading layout.
- Use the same neutral/accent visual system, but allow slightly richer travel imagery inside the preview card.
- If the itinerary is incomplete, show missing details in a side panel or top warning strip, not a disruptive modal.

MVP share behavior:

- `Share` opens a modal explaining prototype share behavior.
- Copy link can be mocked.
- Print should be specified even if not implemented in the prototype.

---

## Screen 5: Templates

Goal: give users a faster start for common trip formats.

```
TemplatesTab
|-- TemplateCard: Weekend escape
|-- TemplateCard: Group tour
|-- TemplateCard: Family trip
|-- TemplateCard: Luxury custom trip
`-- TemplateCard: Blank itinerary
```

Template card content:

- Name.
- Best for.
- Default length.
- Included sections.
- CTA: Use template.

Template behavior:

- Choosing a template opens setup with prefilled day structure.
- The user confirms destination/title before the itinerary is created.

---

## User Stories

1. As a travel operator, I want to create a new itinerary from the sidebar tool, so that I can plan trips without leaving Tripwheel.
2. As a first-time user, I want one obvious `New itinerary` button, so that I know how to start.
3. As a busy planner, I want a template option, so that I do not start from a blank page.
4. As a planner, I want dates to generate days automatically, so that setup is faster.
5. As a planner, I want to add itinerary items with only a title and type required, so that I can capture ideas quickly.
6. As a planner, I want optional details to stay collapsed, so that the editor does not feel heavy.
7. As a planner, I want to reorder items within a day, so that the schedule matches the intended flow.
8. As a planner, I want to duplicate days and itineraries, so that repeat trip formats are easy to reuse.
9. As a planner, I want health checks, so that I can see what is missing before previewing or sharing.
10. As a planner, I want a preview tab, so that I can review the traveler-facing plan before sending it.
11. As a viewer-focused operator, I want internal notes hidden from preview, so that client-facing output stays clean.
12. As a team member, I want statuses like Draft, Ready, Shared, and Archived, so that I know what stage each itinerary is in.
13. As a returning user, I want search and filters, so that I can find itineraries by destination or status.
14. As a dashboard user, I want the itinerary tool to use the same UI patterns as Social Media and Photo Tool, so that I do not need to relearn the app.

---

## MVP Scope

Must include:

- Active sidebar entry for Itinerary Builder.
- Itineraries list tab.
- Empty itinerary state.
- New itinerary setup flow.
- Builder tab with trip overview, day tabs, day item rows, and side summary.
- Add/edit/delete item interactions.
- Add/duplicate/reorder day interactions.
- Autosave or prototype save indicator.
- Preview tab.
- Templates tab with at least four template cards.
- Status pills.
- Search placeholder and filter chips.
- Contextual topbar CTAs.

Can be mocked:

- Share link generation.
- Print/export.
- Autosave timing.
- Reorder behavior if the prototype is static.
- Template creation data.

---

## Later Scope

- Public no-login share links.
- PDF export.
- Map and route optimization.
- AI itinerary generation.
- AI import from free text.
- Collaboration, comments, approvals, and assignments.
- Booking integration.
- Payments.
- Trip Listing integration.
- Traveler portal.
- Version history.
- Client branding.

---

## Design Consistency Requirements

Use existing v0.4.3 patterns:

- `app-shell` grid with fixed sidebar and sticky topbar.
- `.main` content width and spacing.
- Breadcrumb plus page title in the topbar.
- Collapsible search field behavior.
- Contextual topbar primary CTA.
- `.tool-head` with subcopy only, not a second page title.
- `.tool-tabs` for major sections.
- `.panel`, `.panel-head`, `.panel-body` for grouped content.
- `.empty-state` for first-use screens.
- Existing `.btn` variants.
- Existing `.pill` variants for statuses.
- 0.5px borders, soft shadows, neutral surfaces, and calm blue accent.

Avoid:

- Large marketing hero sections inside the dashboard.
- Full-bleed decorative travel layouts.
- Dense spreadsheet tables as the main builder.
- Map-first complexity in v0.1.
- Multiple equally loud CTAs.
- Dashboard KPI cards unless they directly help itinerary management.

---

## Acceptance Criteria

- The prototype includes an Itinerary Builder screen inside the authenticated app shell.
- The sidebar shows Itinerary Builder as an active tool, not as Coming soon.
- The topbar follows existing v0.4.3 breadcrumb, search, notification, help, divider, and CTA patterns.
- A new user sees a focused empty state with `New itinerary` as the primary action.
- A user can create an itinerary from blank setup or from a template.
- A user can enter trip title, destination, dates, traveler count/type, and pace.
- A user can add at least one day and multiple items.
- Item rows support activity, meal, stay, transport, free time, and note types.
- A user can see missing details without being blocked from editing.
- A user can switch between Itineraries, Builder, Preview, and Templates tabs.
- Preview hides internal notes and presents a traveler-safe itinerary.
- Status pills clearly distinguish Draft, Ready, Shared, Needs detail, and Archived.
- The UI remains usable at desktop dashboard widths and collapses gracefully on smaller widths.
- The visual language matches `prototypes/v0.4.3-states.html`.

---

## Open Questions

- Should the first prototype include a mocked public share modal, or keep sharing as a disabled future CTA?
- Should Templates be a top-level tab in v0.1, or should templates appear only inside the New itinerary flow?
- Should map/route view appear as a small preview panel in v0.1, or be deferred entirely?
- Should Itinerary Builder update the dashboard Get started checklist for new accounts?
- Should itinerary statuses map to future Trip Listing and Bookings workflows?

