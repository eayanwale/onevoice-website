import { Resend } from "resend";

// Constructing `Resend` throws immediately if the API key is missing, which
// would crash `next build`'s route data collection when RESEND_API_KEY isn't
// set yet, so construction is deferred to request time rather than done at
// module scope. That deferral also has to happen on *every* call, not just
// the first: on Cloudflare Workers the JS isolate can be reused across
// requests, but env vars/secrets are bound per request, not truly global like
// a long-lived Node process. A module-level cached singleton would freeze in
// whatever key was available on its first construction and silently stay
// broken for every request after in that isolate.
export function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

/** Verified onev.live sender for transactional mail. Override via env once needed. */
export function getFromEmail() {
  return process.env.RESEND_FROM_EMAIL ?? "OneVoice <noreply@onev.live>";
}

/**
 * The newsletter's Resend Segment id (what the dashboard still calls an
 * "Audience" — the SDK's `resend.audiences` is just an alias over the same
 * `/segments` endpoint as of resend@6.22). Created once via the API, see
 * `scripts/create-newsletter-audience.mjs`.
 */
export function getAudienceId() {
  const id = process.env.RESEND_AUDIENCE_ID;
  if (!id) throw new Error("RESEND_AUDIENCE_ID is not set");
  return id;
}
