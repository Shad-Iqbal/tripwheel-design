# Handoff — Tripwheel Design Version Log (DVL)

**For:** Shad + any AI agent (Cursor, Claude Code, Codex, ChatGPT, etc.)  
**Updated:** Jun 27, 2026  
**Skill:** `/dvl-setup` — bootstrap a new project's version log (same pattern)

---

## What this is

A **static design workspace** with a browsable **version log** (`index.html`) listing prototypes, experiments, specs, and screenshots. Hosted on Vercel with a simple password gate.

| | |
|---|---|
| **Live site** | https://tripwheel-design.vercel.app |
| **GitHub** | https://github.com/Shad-Iqbal/tripwheel-design |
| **Local path** | `/Users/shad/Doptor/Projects/tripwheel0.1/tripwheel-design` |
| **Homepage file** | `index.html` (version log — not `tripwheel-version-log.html`) |
| **Latest (check hero)** | `v0.5.5-states` → `prototypes/v0.5.5-states.html` |

---

## Access (humans & agents)

### Live site

1. Open https://tripwheel-design.vercel.app  
2. Redirects to `/auth` — enter the team password  
3. Cookie lasts **7 days** (HttpOnly `dvl_auth=1`)

Password is **not in git**. It lives in Vercel → Project **tripwheel-design** → Settings → Environment Variables → `DVL_PASSWORD`. Ask Shad if you don't have it.

### Local files

```bash
cd /Users/shad/Doptor/Projects/tripwheel0.1/tripwheel-design
```

Or clone:

```bash
git clone git@github.com:Shad-Iqbal/tripwheel-design.git
cd tripwheel-design
```

### Auth locally (optional)

```bash
echo 'DVL_PASSWORD=your-password' >> .env.local
npx vercel dev
# or skip auth:
npx serve .
```

---

## Repo layout (where to put things)

```
tripwheel-design/
├── index.html                 # VERSION LOG — edit this to publish changelog entries
├── auth.html                  # Login page (do not gate in middleware paths)
├── middleware.js              # Password redirect — allow /auth AND /auth.html
├── api/dvl-auth.js            # Login API
├── vercel.json                # outputDirectory: "." — NO public/ folder at root
├── prototypes/                # Stable HTML prototypes (*.html)
├── experiments/               # Spikes, redesigns, piko variants
├── docs/
│   ├── HANDOFF.md             # This file
│   ├── specs/                 # UI specs (v0.4.x.md, v1.md archived)
│   ├── design-system.md
│   └── research/
├── tokens/design-tokens.json
└── assets/screenshots/        # Thumbnails for index entries
```

**Do not** create a root `public/` folder — Vercel will serve only that and the site 404s.

---

## Updating the version log (`index.html`)

### When to update

After shipping a new prototype, spec revision, or meaningful design session worth recording.

### Checklist

```
- [ ] 1. Save prototype → prototypes/{name}.html
- [ ] 2. (Optional) Update spec → docs/specs/
- [ ] 3. (Optional) Screenshots → assets/screenshots/{name}.png
- [ ] 4. Add <article> at TOP of .timeline in index.html
- [ ] 5. Update hero meta: Latest, Updated date, Entries count
- [ ] 6. Remove "Latest" badge from previous entry
- [ ] 7. git commit + push (auto-deploys on Vercel)
```

### Entry types (`data-type`)

| Value | Use for |
|---|---|
| `prototype` | Stable multi-screen HTML prototypes |
| `experiment` | Explorations, redesign, piko, dark theme |
| `docs` | Specs/research section (usually one static card grid) |

### Copy-paste entry template

Insert **above** the current top entry inside `<div class="timeline">`:

```html
      <!-- {version-id} -->
      <article class="entry" data-type="prototype">
        <div class="entry-head">
          <div class="entry-top">
            <span class="version-tag">{version-id}</span>
            <span class="date">{Mon DD, YYYY}</span>
            <span class="badge latest">Latest</span>
          </div>
          <h2 class="entry-title">{One-line title}</h2>
          <p class="entry-desc">
            {2–3 sentences: what changed and why it matters.}
          </p>
          <div class="tags">
            <span class="tag">{tag}</span>
          </div>
        </div>
        <div class="entry-body">
          <div class="section-label">Update log</div>
          <ul class="changelog">
            <li>{Bullet change}</li>
          </ul>

          <div class="section-label">Screenshots</div>
          <div class="screenshots">
            <div class="shot">
              <img src="assets/screenshots/{file}.png" alt="{alt}" loading="lazy">
              <div class="shot-caption">{caption}</div>
            </div>
          </div>

          <div class="section-label">Links</div>
          <div class="links">
            <a class="link-btn primary" href="prototypes/{file}.html" target="_blank">↗ Open prototype</a>
            <a class="link-btn" href="docs/specs/{spec}.md" target="_blank">UI spec</a>
          </div>
        </div>
      </article>
```

### Path rules (links in index)

| Asset | href |
|---|---|
| Prototype | `prototypes/{name}.html` |
| Spec | `docs/specs/{name}.md` |
| Design system | `docs/design-system.md` |
| Tokens | `tokens/design-tokens.json` |
| Screenshots | `assets/screenshots/{name}.png` |
| Experiments | `experiments/{name}.html` |

Paths are **relative to repo root** (same as live URLs with `cleanUrls`).

### Hero meta (top of page)

Update these four pills in `<div class="meta-bar">`:

- **Latest** → new version id  
- **Updated** → today's date  
- **Entries** → increment count if adding a new article  

Remove `<span class="badge latest">` from the previous top entry.

---

## Deploy

**Automatic:** push to `main` on GitHub → Vercel redeploys (~30s).

```bash
cd /Users/shad/Doptor/Projects/tripwheel0.1/tripwheel-design
git add index.html prototypes/ assets/screenshots/ docs/
git commit -m "Version log: add {version-id} entry."
git push origin main
```

**Manual** (if needed):

```bash
vercel deploy --prod --yes
```

Verify:

```bash
curl -sI https://tripwheel-design.vercel.app/ | head -3   # 302 → /auth when logged out
```

---

## Agent prompts (copy into any AI platform)

### Short task — add version log entry

```
Project: Tripwheel design version log
Path: /Users/shad/Doptor/Projects/tripwheel0.1/tripwheel-design
Read: docs/HANDOFF.md

Add a version log entry to index.html for prototype prototypes/{FILE}.
- Insert new <article> at top of .timeline (data-type="prototype")
- Update hero Latest / Updated / Entries
- Remove "Latest" badge from previous entry
- Link prototype, relevant spec, screenshots if they exist
- Commit message: "Version log: add {VERSION} entry."
- Push to origin main (do not change DVL_PASSWORD or middleware)
```

### Short task — new prototype only (no index yet)

```
Save HTML prototype to:
/Users/shad/Doptor/Projects/tripwheel0.1/tripwheel-design/prototypes/{name}.html

Follow existing prototype conventions (Inter, tokens, proto FAB if multi-state).
Do not edit index.html unless I ask.
```

### Full ship — prototype + spec + index + deploy

```
Tripwheel DVL ship workflow (docs/HANDOFF.md):
1. Prototype in prototypes/
2. Spec in docs/specs/ if UI structure changed
3. Screenshots to assets/screenshots/ (1440px, name: {version}-{screen}.png)
4. index.html entry at top + hero meta
5. git push main → verify https://tripwheel-design.vercel.app
```

---

## Platform notes

| Platform | How to point the agent |
|---|---|
| **Cursor** | Open folder `tripwheel-design` or `@docs/HANDOFF.md` · skill `/dvl-setup` for new projects |
| **Claude Code** | `CLAUDE.md` in repo root · read `docs/HANDOFF.md` first |
| **Codex / ChatGPT** | Paste "Agent prompts" block + attach or paste `index.html` entry template |
| **Vercel** | Dashboard → tripwheel-design · env `DVL_PASSWORD` · never commit password |
| **GitHub** | `Shad-Iqbal/tripwheel-design` · branch `main` · SSH remote if HTTPS 403 |

---

## Gotchas

1. **Redirect loop on /auth** — middleware must allow both `/auth` and `/auth.html` (cleanUrls).  
2. **404 on homepage** — delete stray `public/` or set `vercel.json` → `"outputDirectory": "."`.  
3. **Prototype 404 on live** — file must be committed and pushed; path is case-sensitive.  
4. **Password in repo** — never commit `DVL_PASSWORD`; use Vercel env only.  
5. **Monorepo parent git** — this folder has its **own** `.git`; run git commands inside `tripwheel-design/`, not `Doptor/`.  
6. **Specs in prototypes/** — some itinerary specs live in `prototypes/*.md`; link them explicitly in entries.

---

## Related files

| File | Purpose |
|---|---|
| `README.md` | Human quick start |
| `docs/specs/v0.4.2.md` | Example full UI spec (superseded by newer specs in repo) |
| `~/.cursor/skills/dvl-setup/SKILL.md` | Automate setup for another project's DVL |
| `prototypes/README.md` | Prototype naming conventions |

---

## Current focus (update when stale)

- **Product:** Tripwheel — travel ops + social + photo tools  
- **Active line:** Itinerary builder (`v0.5.x-states`, `itinerary-builder-v0.2.html`)  
- **Core app prototypes:** `v0.5.5-states.html` (latest states shell)  
- **Owner:** Shad · shad@tripwheel.io
