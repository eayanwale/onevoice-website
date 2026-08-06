# One Voice — Sitemap

Reference for Claude Code when scaffolding routes. Pairs with CLAUDE.md (tokens, motion,
avoid-list) and /docs/onevoice-direction.pdf (full creative direction).

```
onev.live
│
├── /                     Home — the six-section cinematic scroll landing page
│
├── /about                About Us — the collective's story, not a bio-card grid
│
├── /watch                Watch — video index: music videos, live sessions, behind-the-scenes
│   └── /watch/[slug]      Individual video, full-bleed player, credits, related release
│
├── /gallery              Official Gallery — photography index (the visual world, expanded)
│   └── /gallery/[slug]    A single shoot/project — gallery grid, story note, credits
│
├── /music                Music — release index
│   └── /music/[slug]      Release detail — tracklist, lyrics, credits, streaming links
│
├── /blog                 Blog (Words/Journal) — written content index: devotionals, essays
│   └── /blog/[slug]       Post detail
│
├── /contact               Contact — booking/press inquiries, general contact form, socials
│
├── /faq                  FAQ — bookings, licensing, "are you a church," how to submit music
│
├── /press                Press / Media Kit — bio, logo downloads, high-res photos, one-sheet
│
├── /privacy              Privacy Policy — required once the email signup collects addresses
├── /terms                Terms of Use
│
└── /404                  Not Found — stays in voice, not a generic framework error page
```

## Notes on additions beyond the original list

- **`/faq`** — a collective fielding "are you a worship team," "can we book you," "how do I
  submit a song" questions benefits from one page that answers those once instead of every
  contact-form message repeating them.
- **`/press`** — once there's press coverage or booking inquiries, having a one-page kit
  (bio, logo files, approved photos) saves back-and-forth. Can stay a stub until it's needed.
- **`/privacy` and `/terms`** — the homepage already has an email signup (Section 06, The
  Invitation). Collecting emails without a privacy policy is a compliance gap worth closing
  early, even as a simple one-page document.
- **`/404`** — worth speccing explicitly so it doesn't default to a generic Next.js error page;
  should carry the same restrained, in-voice tone as everything else.
- **Merch/shop** — the direction doc already lists this under "Future Expansion" via Shopify
  Storefront API. Not part of this sitemap yet; add `/shop` when that phase starts.

## Naming reconciliation

The direction doc's original architecture used `/visuals` and `/words`. This sitemap renames
those to `/gallery` and `/blog` per your latest direction, and splits video out into its own
`/watch` section rather than folding it into `/gallery`. If Claude Code finds references to
`/visuals` or `/words` while reading the PDF, `/gallery` and `/blog` (plus the new `/watch`)
supersede them.

## Nav structure (suggested)

Primary nav: `about · music · watch · gallery · blog · contact`
Footer only: `faq · press · privacy · terms`