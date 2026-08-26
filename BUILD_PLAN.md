# Build plan: hosting, CMS, email

Phased plan for standing up everything beyond the static landing page. `SITEMAP.md` is the
route-planning reference; this is the infrastructure/integration reference. Update this file
as phases complete or decisions change.

## Context

Stack decisions are made: Cloudflare Pages (hosting), Sanity v3 (CMS), Resend (transactional
+ newsletter), Zoho Mail (real inboxes), and a Cloudflare Workers cron pipeline for a weekly
AI-drafted verse/prayer email. DNS for `onev.live` is confirmed live in Cloudflare, which was
the standing blocker for all of it.

The most urgent gap: **three real, fully-built forms are silently fake.**
`components/connect/ContactForm.tsx` (`/connect`), `components/invite/BookingForm.tsx`
(`/invite`), and `components/EmailSignup.tsx` (footer + `/store`) all have a `handleSubmit`
that just flips local state to "done" — nothing is sent anywhere. A visitor filling out the
invite form today believes they've reached OneVoice; they haven't. That's Phase 1.

## Phased roadmap

0. **Cloudflare Workers hosting** — repo config done, dashboard connection next
1. **Resend transactional email** — wire the 3 dead forms to real sends
2. **Resend Audiences** — make the newsletter signup real (needs an Audience created in the Resend dashboard first)
3. **Sanity CMS** — schema + swap hardcoded content arrays to CMS-driven
4. **Zoho Mail** — `hello@onev.live` + one team inbox, dashboard-only, no code
5. **Weekly AI-drafted email** — Workers Cron + D1 + Claude API + Nextcloud context + Cloudflare Access approval gate

Forms come before CMS because they're a live correctness bug, fully self-contained in this
repo, and need no interactive external login flow. Sanity's `init` needs a browser OAuth
login, so it's better tackled as its own session.

## Phase 0 — Cloudflare Workers hosting

**Plan changed mid-implementation.** The original plan was Cloudflare Pages with
`@cloudflare/next-on-pages` as the build tool. First real deploy attempt failed:
`next-on-pages` pulls in a `wrangler` version whose `@cloudflare/workers-types` peer
requirement conflicts with `next-on-pages`'s own, an unresolvable ERESOLVE error with
today's npm. Checked current guidance: Cloudflare moved off Pages+next-on-pages for
Next.js apps in favor of **Workers + `@opennextjs/cloudflare`** (GA Feb 2026) — that's
what's actually implemented now.

**Repo changes (done, on branch `chore/cloudflare-workers-deploy`, pushed):**
- `wrangler.jsonc` — Worker name `onevoice-website`, `main: .open-next/worker.js`,
  `nodejs_compat` + `global_fetch_strictly_public` compat flags, `ASSETS` binding, a
  `WORKER_SELF_REFERENCE` service binding (OpenNext needs this for internal fetches)
- `open-next.config.ts` — minimal `defineCloudflareConfig()`, created directly rather than
  via the tool's interactive prompt (doesn't work in a non-interactive shell)
- `next.config.mjs` — calls `initOpenNextCloudflareForDev()`
- `package.json` — added `preview`/`deploy` scripts (`opennextjs-cloudflare build && ...
  preview`/`deploy`); `@opennextjs/cloudflare` **pinned to exactly `1.15.0`**, not a caret
  range — this is the last version whose peer range still includes Next 14
  (`@opennextjs/cloudflare@1.16.0`+ requires Next 15.5+/16+, which this app isn't on).
  Bumping this package later means bumping Next.js first, deliberately, not as a drive-by.
- `.gitignore` — added `.open-next` and `.wrangler`

**Verified locally:** `next build`, `opennextjs-cloudflare build` (produces
`.open-next/worker.js`), and `wrangler deploy --dry-run` (bindings resolve, config valid)
all pass. Note: OpenNext prints a Windows-compatibility warning during build/preview — it
worked here, but if `npm run preview` ever misbehaves locally, that's the known cause
(recommends WSL); the actual deploy runs on Cloudflare's own Linux build servers regardless.

**Done (2026-08-24):** Workers project `onevoice-website` created, connected to Git, deployed
successfully from `main`. Hit one more snag along the way: the dashboard auto-detected
"Build command" = `npm run build` (plain `next build`) and "Deploy command" =
`npx wrangler deploy`, but `wrangler deploy` auto-detects OpenNext projects and expects the
`.open-next/` output to already exist — plain `next build` never produces it. Fixed by
changing **Build command** to `npx opennextjs-cloudflare build` (Deploy command stayed
`npx wrangler deploy`, which correctly delegates to `opennextjs-cloudflare deploy` once the
build artifacts exist).

**Live at:** https://onevoice-website.enochayanwale.workers.dev — verified rendering real
content (nav, images, all sections), not a blank/error page.

Note: `chore/cloudflare-workers-deploy` ended up merged straight into both `dev` and `main`
(user call, to unblock testing quickly) rather than via the usual PR-into-dev-first flow —
one-off exception for this infra setup, not a new normal.

**Done (2026-08-26):** `onev.live` connected as the Worker's custom domain via the
Cloudflare dashboard's one-click "Connect Custom Domain" — no code/config changes needed,
Cloudflare handles the DNS record + route binding automatically since the zone was already
in the account. The site is live at its real address.

**Still open:** no separate preview/staging environment — `dev` and `main` both deploy to
the single `onevoice-website` service, and deploy is manual (`npm run deploy`), not
auto-triggered by a push to either branch. Every deploy is immediately live on
`onev.live`; there's no buffer to catch something before the public sees it.

## Phase 1 — Resend transactional email

**Done (2026-08-24):** merged to `dev` and `main`, deployed, verified end-to-end against the
live Worker (`onevoice-website.enochayanwale.workers.dev`) — contact form sends and lands in
the Zoho `hello@onev.live` inbox. Hit one deploy-time snag: the `RESEND_API_KEY` secret didn't
carry over from the earlier Pages-era setup (Workers secrets are bound per-service), which
surfaced as a fast, non-network 502 (`Resend` constructor throws synchronously on a missing
key). Fixed with `wrangler secret put RESEND_API_KEY --name onevoice-website` + redeploy.

Branch: `feat/resend-forms` off `dev`.

**Add:**
- `resend` to `package.json` dependencies
- `lib/resend.ts` — Resend client singleton, reads `RESEND_API_KEY` from env
- `app/api/contact/route.ts` — Route Handler, validates posted fields, sends via Resend to
  `CONTACT_TO_EMAIL` (env var, defaults to `EMAIL` from `lib/links.ts` = `hello@onev.live`).
  No `export const runtime = 'edge'` needed — that was a next-on-pages constraint; under
  Workers + OpenNext (`nodejs_compat` flag, see Phase 0) standard Node-targeting Route
  Handlers work as-is.
- `app/api/invite/route.ts` — same pattern, covers `BookingForm`'s full field set (name,
  email, phone, organization, event name/type/date, location, attendance, referral source,
  message)
- `.env.example` documenting `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL` —
  confirm `.env*.local` is gitignored before adding real secrets locally

**Update:**
- `components/connect/ContactForm.tsx` and `components/invite/BookingForm.tsx` —
  `handleSubmit` currently just does `setSent(true)` with no network call and no failure
  path. Change to `fetch()` the new routes, add a pending state during the request, and an
  error state (neither exists today).

Newsletter (`EmailSignup.tsx`) is intentionally left out of Phase 1 — it needs a Resend
Audience created in the dashboard first, so it's Phase 2, right after this lands.

**Bootstrapping note:** the code will be correct and ready, but won't actually deliver mail
until (a) a Resend account + API key exist, and (b) `onev.live` is verified as a sending
domain in Resend (DNS records get pasted into Cloudflare at that point). Until then, calls
fail gracefully via the new error state rather than silently lying like today.

### Critical files
- `components/connect/ContactForm.tsx`, `components/invite/BookingForm.tsx` — existing
  non-functional forms being wired up
- `lib/links.ts` — existing `EMAIL` constant, reused as the default `CONTACT_TO_EMAIL`
- New: `lib/resend.ts`, `app/api/contact/route.ts`, `app/api/invite/route.ts`, `.env.example`

### Verification
- `npm run lint`
- `npm run build` — only when the dev server is not running (building over a live `next dev`
  corrupts `.next` — known project gotcha)
- Manual form submission test once a real `RESEND_API_KEY` is available; before that, confirm
  the new error state renders correctly on a failed/missing-key request
- `node scripts/screenshot.mjs` and check the pending/error UI states against the avoid-list
- Push the branch / open the PR only after a separate go-ahead

## Phase 2 — Resend Audiences (newsletter)

**Done (2026-08-24):** the footer/`/store` email signup (`EmailSignup.tsx`) now posts to
`app/api/subscribe/route.ts`, which adds the contact to a Resend Audience via
`resend.contacts.create({ email, segments: [...] })` — current Resend API models an "Audience"
as a Segment under the hood (`RESEND_AUDIENCE_ID`). Needed the `RESEND_API_KEY` bumped from
"Sending access" to "Full access" in the dashboard, since audience/contact writes aren't
covered by a sending-only key. `scripts/create-newsletter-audience.mjs` is the one-off that
created the Audience.

**Extended (2026-08-26):** new subscribers now also get an automatic "you're on the list"
welcome email (`getResend().emails.send(...)` right after the contact is created), skipped
for resubmissions of an already-subscribed address.

**Gotcha hit while wiring the secrets (2026-08-26):** setting a Cloudflare Worker secret on
Windows via `"value" | npx wrangler secret put NAME` silently corrupts the value — PowerShell
piping a string through `npx`'s `cmd.exe` wrapper prepends a UTF-8 BOM, invisible everywhere
except a raw byte dump (`wrangler tail` showed it as `\xef\xbb\xbf` right after `Bearer `,
and it broke `RESEND_AUDIENCE_ID`'s UUID validation outright). `$OutputEncoding` does not
fix it. The reliable fix: `wrangler secret bulk <file>.json`, which reads a JSON file
directly via Node — no shell pipe involved. Worth remembering for any future secret set on
Windows/PowerShell.

## Phase 3 — Sanity CMS

**Done (2026-08-24):** standalone Studio at `studio/` (deployed to
https://onevoice-worship.sanity.studio/), schemas for `member` and `video`. Next.js side
lives in `lib/sanity/` (`client.ts`, `image.ts`, `queries.ts`). Replaced the three arrays
identified below, plus the homepage "watch us" slideshow (not part of the original audit —
added once the video content needed the same treatment):
- `VOICES` in `components/sections/Voices.tsx` → `member` documents
- `PHOTOS` in `app/gallery/page.tsx` and `TILES` in `VisualWorld.tsx` → originally both read
  from a `galleryPhoto` type; **superseded 2026-08-26, see Phase 3.1 below**
- `LatestWork.tsx`'s hardcoded single video → `video` documents, ordered most-recent-first,
  capped at 5 (`/watch`, added 2026-08-26, shows all of them)

All of the original static images these replaced were removed from `public/images/` once
confirmed nothing else referenced them.

### Phase 3.1 — Gallery rebuilt onto Lightroom embeds (2026-08-26)

The `galleryPhoto` schema above worked, but storing every event photo as a Sanity asset
doesn't scale — Sanity's storage is priced per-project, and a working collective shoots way
more photos per event than a homepage teaser needs. Replaced entirely with:

- **New `event` schema** (`studio/schemaTypes/documents/event.ts`): name, slug, year
  (omitted for evergreen categories like "Rehearsal Moments" — they sort outside the
  year groups), order, `coverImage` (small, curated — only the 4 homepage-featured events
  have one), `featuredOnHome`/`featuredOrder`, and `lightroomUrl` (the resolved
  `lightroom.adobe.com/shares/<id>` link, not the `adobe.ly` short link, since short links
  can expire).
- `galleryPhoto` schema **deleted**, along with the 17 documents/image assets that existed
  under it — deliberately, to reclaim the storage that prompted this rebuild.
- Gallery page: no photos fetched from Sanity at all now. A year → event accordion menu
  (all events shown by default, grouped by year) renders each event's Lightroom gallery via
  Adobe's official embed code
  (`lightroom.adobe.com/embed/shares/<id>/slideshow?background_color=...&color=...`,
  colors matched to the brand palette). **Only a slideshow embed exists** — confirmed
  directly that the real grid page sends `X-Frame-Options: SAMEORIGIN` (can't be framed,
  by design, from any site) and that Adobe's own "Get embed code" feature (Lightroom web →
  Share → the `</>` icon) only ever generates the same `/slideshow` embed regardless.
  Linking out to the real (grid) page remains available as a fallback link under each embed.
- Existing gallery photos already tagged in the old system needed a human to re-tag them to
  an `event` by hand in Studio — nobody but someone who was actually at each event can say
  which photo belongs where, so this was deliberately left undone rather than guessed.

## Phase 4 — Zoho Mail

Dashboard-only, no code. `hello@onev.live` + one team-wide inbox (name still TBD).

## Phase 5 — Weekly AI-drafted email

Not yet detailed. Architecture direction already settled (see project memory): Cloudflare
Workers Cron Trigger → Claude API draft → D1 (status: `draft → pending_review → sent`) →
Resend notifies the team → approval page gated by Cloudflare Access → Resend sends on
approval. Context sourced from a curated Nextcloud folder via WebDAV (scoped app password),
not raw team access.
