// scripts/set-video-channel-lov.mjs
//
// One-off migration: OneVoice is getting its own YouTube channel. Every
// `video` doc that predates this had no `channel` field, and all of it was
// published under Lift Our Voices — so this backfills channel: "lov" on any
// video doc missing the field. Idempotent — only patches docs where channel
// isn't already set, so re-running is a no-op.
//
// Needs SANITY_API_TOKEN in the environment (Editor permissions).
//
// Usage: node --env-file=.env.local scripts/set-video-channel-lov.mjs

import { createClient } from "next-sanity";

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error("SANITY_API_TOKEN is not set.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "erpqd8b3",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-08-24",
  useCdn: false,
  token,
});

const videos = await client.fetch(
  `*[_type == "video" && !defined(channel)]{ _id, title }`,
);

if (videos.length === 0) {
  console.log("no video docs missing channel — nothing to do");
  process.exit(0);
}

const tx = client.transaction();
for (const v of videos) {
  tx.patch(v._id, { set: { channel: "lov" } });
}
await tx.commit();

for (const v of videos) {
  console.log(`lov  ${v._id}  ${v.title}`);
}
console.log(`\ndone — patched ${videos.length} video doc(s)`);
