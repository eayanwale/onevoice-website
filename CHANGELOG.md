# Changelog

Notable changes to onev.live. Versions follow the release tags on `main`.

## [2.2.0] — 2026-08-26

The CMS-and-gallery-rebuild release. The three dead forms went live, Sanity
replaced the last hardcoded content arrays, and — after marketing feedback on
the live site — the gallery and watch pages were rebuilt twice over: first
onto Sanity-hosted photos, then onto embedded Lightroom galleries once
storage growth became a real concern.

### Added

- **Real forms.** Contact, invite, and newsletter signup all send for real via
  Resend — previously `handleSubmit` just flipped local state with no network
  call. Newsletter subscribers now also get an automatic "you're on the list"
  welcome email.
- **Sanity CMS** at `studio/`, deployed to
  https://onevoice-worship.sanity.studio/. `member`, `video`, and `event`
  schemas now drive the About roster, the homepage "watch us" slideshow, and
  the gallery — the last hardcoded content arrays (`VOICES`, `PHOTOS`,
  `TILES`) are gone.
- **`/watch`** — every video, not just the homepage's 5 most recent, browsable
  by year via an accordion menu, playing inline through real YouTube embeds.
  Wired into the main nav and footer.
- **Gallery rebuilt as a year → event accordion** (Rehearsal Moments / 2025 /
  2026, each year expanding to its events), defaulting to showing every
  event's photos at once. Photos are no longer uploaded to Sanity at all —
  each event embeds its real Lightroom gallery via Adobe's official embed
  code, avoiding unbounded CMS storage growth as more events are shot.
  (Adobe only offers a slideshow embed, not a grid — the grid view exists but
  sends `X-Frame-Options: SAMEORIGIN`, confirmed directly, so it can't be
  framed on this or any other site.)
- Homepage gallery teaser rebuilt as 4 landscape event tiles (was 3 portrait
  photos), each linking straight into the rebuilt gallery pre-filtered to
  that event.
- Privacy Policy and Terms of Use pages.
- `app/opengraph-image.png` — the OneVoice mark, composited onto its own
  background at 1200×630, as the link-preview image (iMessage, social
  shares); `metadataBase` set to `https://onev.live` so it resolves correctly
  now that the domain is live. The browser-tab favicon is unchanged.
- `onev.live` connected as the Worker's custom domain — the site is live at
  its real address for the first time.
- `scripts/seed-events.mjs` — one-off that created the 8 gallery `event`
  documents from this rebuild.

### Changed

- **About page member reveal**: the old click-to-expand-sideways full bio
  panel is gone. Hovering (desktop) or tapping (mobile) a member's photo now
  overlays their role directly — lighter, and it no longer pushes the layout
  around. Added swipe/scroll hints since neither the horizontal card strip
  nor the vertical-scroll-drives-horizontal-movement pin were self-evident.
- Homepage hero: floating photo frames now fully hidden below `sm` (two were
  still showing unconditionally); the "we'd rather be one voice" section's
  group photo swapped for a better take from the same shoot.
- Footer: pages list and logo sit side by side on mobile instead of stacking.
- "Watch us" section background darkened for text legibility over brighter
  event photos.
- Brand references standardized to `OneVoice` (one word) across the site.

### Fixed

- Instagram and YouTube channel URLs, `#` placeholders since 2.1.0, now point
  to the real profile/channel.
- A live 502 on `/api/subscribe`: two Cloudflare Worker secrets had been set
  via `"value" | wrangler secret put` in PowerShell, which silently prepends
  a UTF-8 BOM to the value through `npx`'s `cmd.exe` wrapper — invisible in
  every log except a raw byte dump. `wrangler secret bulk` (reads a JSON
  file directly, no shell pipe) avoids it; worth remembering for any future
  Windows/PowerShell secret-setting.
- All three Resend-backed routes (contact, invite, subscribe) silently
  swallowed errors on failure, which is what made the 502 above hard to
  diagnose — they now log via `console.error` so `wrangler tail` shows the
  real cause immediately.
- `next build` failing when `studio/`'s independent TypeScript project was
  picked up by the root build.
- Sanity client crashing when Cloudflare env config was momentarily out of
  sync with `NEXT_PUBLIC_SANITY_PROJECT_ID`/`DATASET` — both now default to
  the real values in code.

### Known gaps

- Existing gallery photos need their `event` reference set by hand in
  Studio — nobody but someone who was actually at each event can say which
  photo belongs where, so this wasn't guessed at automatically.
- `/watch` currently has one event's worth of videos tagged; more to be
  added by the team over time.
- No separate preview/staging environment on Workers yet — `dev` and `main`
  both deploy to the one `onevoice-website` service, so every deploy is
  immediately live.

## [2.1.0] — 2026-08-19

The brand-voice release. Every heading and paragraph on the site was reviewed
one element at a time and rewritten away from a service-provider tone toward a
community voice, alongside the first real member roster and a reworked hero.

### Copy

- Rewrote roughly 27 strings across 11 files, reviewing each element in place
  rather than in bulk.
- Removed service-provider language throughout: the `booking` sidebar label,
  the `booking requests` page title, the six-item event menu in the invite
  hero, the `budget range` field, and the package-tier bullet in the booking
  form.
- Dropped "the room" as a recurring motif (nine instances) in favour of
  people-first phrasing.
- About now carries the official bio, converted to first person and lowercase,
  with the Romans 15:6 quote no longer duplicated beside its own pull-quote.
- `we'd love to minister with you.` replaces the old `sing with us` block and
  runs on Home, About, Gallery and Store — not on Connect or Invite, which
  already ask for contact.
- Latest Work now lists the setlist plainly; `to our god` corrected to
  `to our God`, matching how the rest of the site capitalises.
- Gallery captions removed in favour of the photographs alone.

### Added

- The ten-member roster, with names and photographs on the About page.
- `scripts/prep-photos.mjs` — resizes and compresses source photography to the
  ~2400px / q85 rule in CLAUDE.md, in directory or single-file mode. Reduced
  40MB of camera originals to 3.2MB.
- A hero frame that crosses the headline: sharp above, blurred where the type
  runs through it, using two stacked copies with the upper one masked.
- Load-in and scroll motion for the hero floaters — staggered fade-up on load,
  and per-frame scroll travel so the group separates into depth.
- `/coming-soon` placeholder, currently the target for the Spotify link.
- `lib/links.ts` as the single source of truth for outbound links.
- A link from the gallery to the full Lightroom archive.
- A new Connect hero photograph.

### Fixed

- The header started transparent and faded to glass on `/` only; every other
  route was permanently glass. It now behaves the same on all six routes.
- `.btn-solid` hover was a 15% opacity shift and read as no hover at all. Both
  button styles now shift to warm-sage, which reads on light and dark bands.
- `how did you hear about us?` spanned the full grid width, stranding
  `expected attendance` alone on its row.
- Gallery images had captions serving as their `alt` text; `alt` is now a real
  description of each frame.
- Member card crops cut heads off — the cards are 3:4 but the portraits are
  2:3, so a centred cover-crop trimmed the top.
- The scroll cue overlapped the CTA row on mobile; it is now `sm:` and up.
- Outbound links were duplicated across four components, which is how several
  had drifted to `#`.

### Known gaps

- Instagram and YouTube channel URLs are still `#` placeholders in
  `lib/links.ts`.
- Member roles are not set; cards render name-only by design until they are.

## [2.0.0] — 2026-08-19

The multi-page redesign: About, Gallery, Store, Connect and Invite built out
around the existing landing page.

## [1.0.0] — 2026-08-06

First release — the single-page cinematic scroll landing page.

---

Releases 2.2.0, 2.1.0, and 2.0.0 were prepared with [Claude Code](https://claude.com/claude-code).
