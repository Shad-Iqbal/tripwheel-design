# Tripwheel — Itinerary Builder Version Log

**Compiled:** Jul 1, 2026  
**Live HTML:** `index-itinerary.html`  
**Markdown index:** `docs/itinerary-version-log.md`  
**Sources:** `Projects/tripwheel0.1/tripwheel-design/` + `~/Desktop/doptor/projects/tripwheel/`

---

## Summary

| Phase | Latest artifact | Status |
| --- | --- | --- |
| Research | `research-itinerary-v2.html` | Done |
| Demo / marketing | `prototypes/tripwheel-itinerary.html` | Done (+ bug fix pass) |
| Standalone prototypes | `itinerary-builder-v0.2.html` | Done |
| Research & validation | `itinerary-builder-icp-crosscheck.html` | Done (Jul 1) |
| Integrated MVP | `prototypes/v0.5.5-states.html` | Done (latest) |

**20 completed tasks** across research, specs, standalone HTML, and v0.5.x integrated work.

---

## Completed tasks (newest first)

### Research & validation

| Item | Date | Notes |
| --- | --- | --- |
| `docs/research/itinerary-builder-icp-crosscheck.html` | Jul 1 | v0.5.5 × six agency ICPs cross-check; fit matrix, anchor tension, gaps, recommendations |

### Integrated app shell (v0.5.x)

| Version | Date | What shipped |
| --- | --- | --- |
| **v0.5.5-states** | Jun 30 | Overview tab polish, brief de-dupe, whole-trip map |
| **v0.5.4-states** | Jun 27 | Quick add-stop, Overview intro page, map/modal z-index fix |
| **v0.5.3-states** | Jun 27 | Multi-photo stops, editable transit, share-live dialog, onboarding step 4 |
| **v0.5.2-states** | Jun 27 | Editable days/images, draggable pins, responsive viewer rebuild |
| **v0.5.1-states** | Jun 27 | Trip Brief intake form, AI reads brief, `itinerary.brief` schema |
| **v0.5.0-states** | Jun 27 | MVP in shell: library, templates, image-rich builder, light AI, viewer + Reply |

### Specs

| Spec | Date | Purpose |
| --- | --- | --- |
| `prototypes/itinerary-builder-Spec-vc1.3.md` | Jun 27 | Trip Brief — intake before planning |
| `prototypes/itinerary-builder-Spec-vc1.2.md` | Jun 27 | MVP scope filter (advisor + traveller value) |
| `docs/specs/itinerary-builder-dashboard-tool.md` | Jun 26 | Dashboard-integrated tool spec |
| `docs/specs/itinerary-builder-single-html.md` | Jun 26 | Single-HTML builder from research v2 |
| `~/Desktop/.../Tripwheel_Itinerary_Demo_Spec.md` | Jun 26 | Marketing demo happy-path spec |
| `~/Desktop/.../Advisor_Dashboard_Spec.md` | Jun 26 | Advisor library/templates/engagement IA |
| `~/Desktop/.../Itinerary_MVP_Spec.md` | Jun 27 | Desktop copy of MVP scope (→ vc1.2) |

### Standalone prototypes (design repo)

| File | Date | Notes |
| --- | --- | --- |
| `prototypes/itinerary-builder-v0.2.html` | Jun 28 | v0.1 logic in full v0.4.3 shell |
| `prototypes/itinerary-builder-dashboard-v0.1.html` | Jun 28 | Dashboard tool per dashboard-tool spec |
| `prototypes/itinerary-builder-v0.1.html` | Jun 27 | Map-first single HTML per single-html spec |
| `prototypes/tripwheel-itinerary.html` | Jun 26–27 | Kyoto/Osaka demo + 8 bug fixes (`a593d71`, `d50152f`) |

### Desktop folder references

| File | Notes |
| --- | --- |
| `itinerary-dashboard.html` | Advisor workspace (library, templates, engagement) |
| `itinerary-builder.html` | Single-trip map-first builder |
| `research-itinerary-v2.html` | Duplicate of design-repo research |

### Research & review

| Item | Date | Notes |
| --- | --- | --- |
| `research-itinerary-v2.html` | Jun 26 | Foundation — 6 opportunities for Tripwheel |
| vc1.2 spec review | Jun 27 | Scope trim → led to MVP v0.5.0 approach |

---

## Not yet in main `index.html`

The general DVL (`index.html`) already includes **v0.5.0–v0.5.5** entries but is missing:

- ICP cross-check report (`itinerary-builder-icp-crosscheck.html`)
- Demo (`tripwheel-itinerary.html`)
- Standalone v0.1 / v0.2 / dashboard-v0.1 prototypes
- Single-html + dashboard-tool specs
- Desktop-folder artifact cross-refs

Use `index-itinerary.html` as the dedicated itinerary log.

1. Review `index-itinerary.html` locally
2. Add new entries at top of `.timeline` + update hero meta
3. `git commit` + `git push origin main` (inside `tripwheel-design/`)
