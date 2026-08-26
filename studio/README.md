# OneVoice — Sanity Studio

Content backend for [onev.live](https://onev.live). Deployed at
https://onevoice-worship.sanity.studio/.

## Schemas (`schemaTypes/documents/`)

- **`member`** — the About page roster: name, role, tagline, bio, photo, order.
- **`video`** — the homepage "watch us" slideshow (5 most recent) and `/watch` (all of
  them): title, accent word, credit, YouTube URL, thumbnail, duration, publish date.
- **`event`** — the gallery's year → event taxonomy (name, slug, year, order, cover image
  for the 4 homepage-featured events, and a `lightroomUrl`). Event photos are **not**
  uploaded here — each event embeds its real Lightroom gallery live on the site, to avoid
  unbounded storage growth. See `BUILD_PLAN.md` (Phase 3.1) at the repo root for why.

## Commands

```bash
npm run dev      # Studio dev server, localhost:3333
npm run build    # sanity build — verifies the schema compiles
npm run deploy   # sanity deploy — publishes schema changes to the hosted Studio above
```

`npm run deploy` needs a browser login; it's not scriptable non-interactively. Run it
after any schema change lands on `dev`/`main`, or the team's hosted Studio won't show the
new fields even though the underlying dataset already has them.

## Seeding

`../scripts/seed-events.mjs` is the one-off that created the initial `event` documents.
Needs `SANITY_API_TOKEN` (Editor permissions) in `.env.local` at the repo root — see that
file's own comments for the exact usage.
