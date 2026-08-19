# One Voice — onev.live

The site for **One Voice**, a gospel music collective making honest music and visuals.
It's built to feel like entering a quiet, intentional space rather than scrolling a
feed: real photography, restrained motion, and no filler copy.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS**, extended with a small set of brand design tokens
- **GSAP** + ScrollTrigger for scroll-driven reveals, parallax, and pinning
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

Pass a route to screenshot something other than the homepage:

```bash
node scripts/screenshot.mjs /about
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage — hero, verse, story, latest sound, gallery teaser, invite CTA |
| `/about` | The collective's story, and "the voices behind the sound." |
| `/gallery` | Full photo gallery, masonry layout |
| `/store` | Merch — placeholder until there's a drop |
| `/connect` | "say hello." — general contact |
| `/invite` | "tell us about the room." — booking requests |

Forms are layout-only (local state, no backend) until a form handler is wired up.

## Design tokens

Brand palette:

| Token | Hex |
|---|---|
| `charcoal` | `#1A1A1A` |
| `deep-brown` | `#473237` |
| `warm-sage` | `#BEB7A7` |
| `bone` | `#E8E2D4` |
| `off-white` | `#F5F0E6` |

### Section color bands

Sections don't hardcode their colors. Dark is the default; `.on-bone` and `.on-sand`
are the light bands, and each one restates the full set of semantic tokens at once:

| Token | Role |
|---|---|
| `surface` | Section background |
| `ink` | Body/heading text |
| `muted` | Secondary text |
| `solid` / `on-solid` | Filled button background / its label |

So `bg-surface`, `text-ink`, `text-muted`, and `.btn-solid` invert automatically
depending on which band a section declares. Opacity modifiers work too
(`border-ink/25`) because the tokens are stored as RGB channel triplets. See the
`:root` / `.on-bone` / `.on-sand` blocks in `app/globals.css`.

### Type

Display type is Instrument Sans, body copy is Manrope, and labels/eyebrows/button
text use **JetBrains Mono**, uppercase and letter-spaced, via the `.label-text`
utility. The mono face is reserved for that role only — it isn't a second body
weight. Headings use the fluid `.display-xl` / `.display-lg` / `.display-md` clamps
so the scale reads correctly on a phone rather than as shrunken desktop type.

## Motion conventions

- Reveals: opacity + 20–40px y-translation on scroll into view, once per element
- Parallax backgrounds move at roughly 0.85x scroll speed relative to foreground content
- At most one pinned scroll sequence per page
- `prefers-reduced-motion` disables parallax, pinning, and non-essential animation
- Animations only transform `transform`/`opacity`, eased with `cubic-bezier(0.33, 0, 0.2, 1)`

## Project structure

```
app/                  Next.js App Router routes — one folder per page
components/           Shared UI (Header, SiteFooter, PageHero, DuotonePhoto, ...)
components/sections/  One component per homepage section (Entrance, Statement, ...)
public/               Images, logo variants, favicon
scripts/              Dev tooling (screenshot.mjs) — not part of the app bundle
```

Sections in `components/sections/` are self-contained and composed in `app/page.tsx`.
Real photography runs through `DuotonePhoto`, which applies a shared duotone filter +
grain overlay so every image reads as part of one visual system regardless of source;
pass `filter` to override the grade for a specific image.

Source photos are resized to ~2400px max dimension at JPEG q80–85 before being
committed — full-resolution camera originals don't belong in `public/images/`.

## Mobile

Mobile is treated as its own layout, not a shrunk desktop page: separate type scales,
simplified/dropped parallax and pinning, full-bleed uncropped hero imagery, and
safe-area-aware fixed elements. See each section component for viewport-specific
classes.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch/commit conventions, the UI review
checklist, and design guardrails.
