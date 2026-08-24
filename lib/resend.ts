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
