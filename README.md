# Tripwheel Design

Product design workspace for [Tripwheel](https://tripwheel.io) — prototypes, specs, tokens, and a living version log.

**Owner:** Shad · shad@tripwheel.io  
**Live version log:** [tripwheel-design.vercel.app](https://tripwheel-design.vercel.app)

## Quick links

| What | Path |
|---|---|
| Version log (homepage) | [`index.html`](index.html) |
| Latest prototype | [`prototypes/v0.4.2-states.html`](prototypes/v0.4.2-states.html) |
| UI spec (current) | [`docs/specs/v0.4.2.md`](docs/specs/v0.4.2.md) |
| UI spec v1 (archived) | [`docs/specs/v1.md`](docs/specs/v1.md) |
| Design system | [`docs/design-system.md`](docs/design-system.md) |
| Tokens | [`tokens/design-tokens.json`](tokens/design-tokens.json) |

## Structure

```
tripwheel-design/
├── index.html              # Version log — Vercel entry point
├── prototypes/             # Interactive HTML prototypes (stable)
├── experiments/            # Explorations (redesign, dark theme, piko)
├── docs/
│   ├── specs/              # UI specs (v0.4.2 + v1)
│   ├── research/           # Research plan, qual script, landing copy
│   └── design-system.md
├── tokens/                 # design-tokens.json
├── assets/
│   ├── screenshots/     # Version log thumbnails
│   └── images/          # Shared prototype assets
└── src/                    # Future React/components
```

## Deploy (Vercel)

Static site — no build step. Connect this repo in Vercel; it serves `index.html` at the root.

**Password gate:** set env var `DVL_PASSWORD` in Vercel (Project → Settings → Environment Variables). Unauthenticated visitors are redirected to `/auth.html`. Cookie lasts 7 days. Leave unset locally to skip auth.

```bash
# Optional local preview (with auth)
echo 'DVL_PASSWORD=your-password' >> .env.local
npx vercel dev

# Static preview without auth
npx serve .
```

## Adding a new version

1. Ship prototype HTML to `prototypes/`
2. Capture screenshots → `assets/screenshots/`
3. Update spec in `docs/specs/` if needed
4. Add entry at top of `index.html`
