import { Resend } from "resend";

// Constructing `Resend` throws immediately if the API key is missing, which
// would crash `next build`'s route data collection when RESEND_API_KEY isn't
// set yet. Deferring construction to first use keeps the build green and
// pushes the failure to request time, where the route handlers already
// convert it into a graceful error response.
let client: Resend | null = null;

export function getResend() {
  client ??= new Resend(process.env.RESEND_API_KEY);
  return client;
}

/** Verified onev.live sender for transactional mail. Override via env once needed. */
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "OneVoice <noreply@onev.live>";
