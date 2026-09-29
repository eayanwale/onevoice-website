# OneVoice — Sitemap

Reference for Claude Code when scaffolding routes. Pairs with CLAUDE.md (tokens, motion,
avoid-list) and /docs/onevoice-direction.pdf (full creative direction).

```
onev.live
│
├── /                     Home — the six-section cinematic scroll landing page
│
├── /about                About Us — the collective's story, not a bio-card grid
│
├── /watch                Watch — every video, split by channel tab (OneVoice / Lift Our Voices)
│                          then browsable by year within each, playing inline (Sanity `video`
│                          docs, `channel` field)
│
├── /coming-soon          Coming Soon — placeholder landing for links not live yet (e.g. Spotify)
│
├── /gallery              Gallery — Sanity `event` docs grouped by year, each embedding its
│                          real Lightroom gallery live (photos aren't uploaded to Sanity;
│                          `?event=<slug>` deep-links into one). No per-shoot sub-route —
│                          the year → event accordion replaced the originally-planned
│                          `/gallery/[slug]` detail page.
│
├── /music                Music — release index (not yet built)
│   └── /music/[slug]      Release detail — tracklist, lyrics, credits, streaming links
│
├── /blog                 Blog (Words/Journal) — written content index: devotionals, essays
│   └── /blog/[slug]       Post detail
│
├── /connect               Connect — general contact form ("say hello.")
├── /invite                Invite — booking requests
│
├── /store                Store — merch, placeholder until there's a drop (not in the original list)
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
- **`/privacy` and `/terms`** — built. The newsletter signup collects real emails now
  (wired to Resend), so these closed a real compliance gap rather than a hypothetical one.
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

## Nav structure

Currently live (`components/Header.tsx`): `about · watch · gallery · store · connect`,
plus an `invite us` button. Footer additionally links `home` and repeats all of the
above, plus `privacy · terms`.

Originally suggested, not yet built: `music · blog · faq · press`.