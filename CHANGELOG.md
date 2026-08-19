# Changelog

Notable changes to onev.live. Versions follow the release tags on `main`.

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

Releases 2.1.0 and 2.0.0 were prepared with [Claude Code](https://claude.com/claude-code).
