# Contributing

## Branching

- `main` — production/release. Tagged releases (`v1.0.0`, ...) are cut from here.
- `dev` — integration branch. All feature/fix work merges here first.
- Everything else branches off `dev` and merges back into `dev` via PR:
  - `feat/<short-name>` — new functionality or content
  - `fix/<short-name>` — bug fixes, visual/UX corrections
  - `chore/<short-name>` — tooling, config, dependency, non-user-facing work
  - `docs/<short-name>` — documentation only

Once `dev` is stable and ready to ship, it's merged into `main` via its own PR, then
tagged for a release.

## Commits

Lowercase, short, imperative, prefixed by type — matching the branch prefixes above:

```
feat: add site header with logo, nav links, and mobile menu
fix: hero crop, scroll cue, nav anchors, and play button overflow
chore: scaffold next.js app with tailwind design tokens
docs: write project readme with stack, tokens, and structure
```

No AI-generated changelog fluff, no "this commit does X, Y, and also Z" essays. If a
change needs more than one sentence to explain, split it into more commits instead.

## Before opening a PR

1. `npm run lint` passes.
2. `npm run build` succeeds.
3. For any UI change, run `npm run screenshot` against a local dev server and check
   the desktop + mobile output in `.screenshots/` against the design checklist below.

## Design guardrails

The full creative direction lives outside this repo; the essentials for day-to-day
work:

- **Tokens**: `charcoal` `#1A1A1A`, `deep-brown` `#473237`, `warm-sage` `#BEB7A7`,
  `bone` `#E8E2D4`, `off-white` `#F5F0E6`. Display font Instrument Sans, body Manrope,
  labels/buttons JetBrains Mono via `.label-text`. No more than two font weights on a
  page — the mono label face is a distinct typeface reserved for that one role, not a
  second weight of the display or body faces.
- **Section colors come from the band, not the component.** Reach for `bg-surface`,
  `text-ink`, `text-muted`, and `.btn-solid` and let `.on-bone` / `.on-sand` decide
  the actual values. Hardcode a brand hex only when an element must stay that color
  regardless of the band it sits in (e.g. text over a dark photo).
- **Avoid**: Inter/Roboto/Arial, purple gradients, unmodified shadcn-style card grids,
  dev-tool/SaaS-dashboard aesthetics, stock "ministry website" tropes (clip-art
  crosses, stained glass, staged group photos), all-caps body text.
- **Motion**: reveals are opacity + 20–40px y-translation, once per element; parallax
  backgrounds run ~0.85x scroll speed vs. foreground; at most one pinned scroll
  sequence per page; only animate `transform`/`opacity`, eased with
  `cubic-bezier(0.33, 0, 0.2, 1)`; everything above must fall back to a static state
  under `prefers-reduced-motion`.
- **Mobile is its own layout**, not a shrunk desktop page: dedicated type scales,
  full-bleed uncropped hero imagery (never a zoomed desktop crop), reduced/dropped
  parallax and pinning, 44×44px minimum tap targets, safe-area-aware fixed elements.
- **Real content over lorem ipsum.** Placeholder copy should match the brand voice
  (grounded, intimate, lowercase confidence), not filler text.

If a change could plausibly pass for a generic template, revise it before opening the
PR.
