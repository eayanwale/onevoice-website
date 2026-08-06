# One Voice — onev.live

The landing site for **One Voice**, a gospel music collective making honest music and
visuals. The site is built to feel like entering a quiet, intentional space rather than
scrolling a feed: real photography, restrained motion, and no filler copy.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS**, extended with a small set of brand design tokens
- **GSAP** + ScrollTrigger for scroll-driven reveals and parallax
- **Framer Motion** for page/UI transitions (mobile nav, entrance fade)
- **Lenis** for smooth scroll

## Getting started

```bash
npm install
npm run dev       # local dev server at localhost:3000
npm run build     # production build
npm run lint       # eslint
npm run screenshot # capture desktop + mobile screenshots to .screenshots/ (dev server must be running)
```

`npm run screenshot` requires Playwright's Chromium binary once:

```bash
npx playwright install chromium
```

## Design tokens

| Token | Hex |
|---|---|
| `charcoal` | `#1A1A1A` |
| `deep-brown` | `#473237` |
| `warm-sage` | `#BEB7A7` |
| `bone` | `#E8E2D4` |
| `off-white` | `#F5F0E6` |

Display type is Instrument Sans, body copy is Manrope. No monospace/mono accent
typefaces are used anywhere on the site, and no page uses more than two font weights.

## Motion conventions

- Reveals: opacity + 20–40px y-translation on scroll into view, once per element
- Parallax backgrounds move at roughly 0.85x scroll speed relative to foreground content
- At most one pinned scroll sequence per page
- `prefers-reduced-motion` disables parallax, pinning, and non-essential animation
- Animations only transform `transform`/`opacity`, eased with `cubic-bezier(0.33, 0, 0.2, 1)`

## Project structure

```
app/                  Next.js App Router routes (page.tsx, layout.tsx, globals.css)
components/           Shared UI (Header, DuotonePhoto, ScrollReveals, ...)
components/sections/  One component per landing-page section (Entrance, Statement, ...)
public/               Images, logo variants, favicon
scripts/              Dev tooling (screenshot.mjs) — not part of the app bundle
```

Each section in `components/sections/` is self-contained and composed together in
`app/page.tsx`. Real photography is run through `DuotonePhoto`, which applies a shared
duotone filter + grain overlay so every image reads as part of one consistent visual
system regardless of source.

## Mobile

Mobile is treated as its own layout, not a shrunk desktop page: separate type scales,
simplified/dropped parallax, full-bleed uncropped hero imagery, and safe-area-aware
fixed elements. See each section component for viewport-specific classes.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch/commit conventions, the UI review
checklist, and design guardrails.
