// scripts/create-newsletter-audience.mjs
//
// One-off setup: creates the Resend Audience (Segment, in current API terms)
// that the newsletter signup (EmailSignup.tsx -> /api/subscribe) adds
// contacts to. Run once, then put the printed id in RESEND_AUDIENCE_ID
// (.env.local for dev, `wrangler secret put RESEND_AUDIENCE_ID` for prod).
//
// Needs RESEND_API_KEY in the environment, and that key must have
// Audience/Contact write access — a sending-only key gets a 401
// restricted_api_key error here.
//
// Usage: node --env-file=.env.local scripts/create-newsletter-audience.mjs

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.error("RESEND_API_KEY is not set.");
  process.exit(1);
}

const res = await fetch("https://api.resend.com/segments", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "OneVoice newsletter" }),
});

const body = await res.json();

if (!res.ok) {
  console.error(`Failed (${res.status}):`, body);
  process.exit(1);
}

console.log("Created audience/segment:", body);
console.log(`\nSet this as RESEND_AUDIENCE_ID: ${body.id}`);
