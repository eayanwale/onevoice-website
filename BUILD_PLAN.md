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

0. **Cloudflare Pages hosting** — dashboard-only, no repo changes
1. **Resend transactional email** — wire the 3 dead forms to real sends
2. **Resend Audiences** — make the newsletter signup real (needs an Audience created in the Resend dashboard first)
3. **Sanity CMS** — schema + swap hardcoded content arrays to CMS-driven
4. **Zoho Mail** — `hello@onev.live` + one team inbox, dashboard-only, no code
5. **Weekly AI-drafted email** — Workers Cron + D1 + Claude API + Nextcloud context + Cloudflare Access approval gate

Forms come before CMS because they're a live correctness bug, fully self-contained in this
repo, and need no interactive external login flow. Sanity's `init` needs a browser OAuth
login, so it's better tackled as its own session.

## Phase 0 — Cloudflare Pages

Dashboard steps, no repo changes:
Workers & Pages → Create → Pages → Connect to Git → select the repo → framework preset
**Next.js** → **production branch = `main`** (leave `dev` as an automatic preview branch —
Pages previews all non-production branches by default, no extra config needed).

## Phase 1 — Resend transactional email

Branch: `feat/resend-forms` off `dev`.

**Add:**
- `resend` to `package.json` dependencies
- `lib/resend.ts` — Resend client singleton, reads `RESEND_API_KEY` from env
- `app/api/contact/route.ts` — Route Handler, `export const runtime = 'edge'` (required for
  Cloudflare Pages Functions — no Node.js APIs on the Workers runtime), validates posted
  fields, sends via Resend to `CONTACT_TO_EMAIL` (env var, defaults to `EMAIL` from
  `lib/links.ts` = `hello@onev.live`)
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

Not yet detailed — pick up once Phase 1 has landed and a Resend Audience exists in the
dashboard. Will reuse the `lib/resend.ts` client from Phase 1.

## Phase 3 — Sanity CMS

Not yet detailed. CMS-candidate content already identified in the repo audit:
- `VOICES` array in `components/sections/Voices.tsx` — member roster
- `PHOTOS` array in `app/gallery/page.tsx` — gallery images
- `TILES` array in `components/sections/VisualWorld.tsx` — event photo tiles
`sanity init` requires a browser OAuth login, so plan for an interactive session.

## Phase 4 — Zoho Mail

Dashboard-only, no code. `hello@onev.live` + one team-wide inbox (name still TBD).

## Phase 5 — Weekly AI-drafted email

Not yet detailed. Architecture direction already settled (see project memory): Cloudflare
Workers Cron Trigger → Claude API draft → D1 (status: `draft → pending_review → sent`) →
Resend notifies the team → approval page gated by Cloudflare Access → Resend sends on
approval. Context sourced from a curated Nextcloud folder via WebDAV (scoped app password),
not raw team access.
