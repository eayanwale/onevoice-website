// scripts/seed-events.mjs
//
// One-off setup: creates the 8 `event` documents for the gallery taxonomy,
// each pointing at its Lightroom gallery (embedded on the site — no photos
// live in Sanity), and uploads/attaches cover photos for the 4
// homepage-featured ones. Idempotent — uses deterministic _ids and Sanity
// dedupes uploaded assets by content hash, so re-running just updates the
// same documents instead of duplicating anything.
//
// Needs SANITY_API_TOKEN in the environment (Editor permissions).
//
// Usage: node --env-file=.env.local scripts/seed-events.mjs

import { createClient } from "next-sanity";
import { createReadStream, existsSync } from "node:fs";

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

// Cover photos already resized/compressed via scripts/prep-photos.mjs.
const COVER_DIR =
  "C:\\Users\\Enoch\\AppData\\Local\\Temp\\claude\\d--Enoch-workspace-personal-onevoice-website\\f00504a6-0239-4467-af47-811bed166df4\\scratchpad\\event-covers";

// lightroomUrl is the resolved lightroom.adobe.com/shares/<id> address, not
// the adobe.ly short link — short links can expire, and the site derives
// the embed URL by string-replacing "/shares/" with "/embed/shares/".
const EVENTS = [
  { id: "rehearsal-moments", name: "Rehearsal Moments", slug: "rehearsal-moments", order: 0, lightroomUrl: "https://lightroom.adobe.com/shares/e8ecaa7722d7435aa033068484f55469" },
  { id: "doxa-2025", name: "DOXA 2025", slug: "doxa-2025", year: 2025, order: 1, cover: "doxa-2025.jpg", featuredOrder: 3, lightroomUrl: "https://lightroom.adobe.com/shares/91cd23ec746b481ca9450cc8ca60cc08" },
  { id: "roc-2025", name: "ROC 2025", slug: "roc-2025", year: 2025, order: 2, lightroomUrl: "https://lightroom.adobe.com/shares/45cb600ea7584f0bb92709e7a55720e6" },
  { id: "freedomnow-2025", name: "FreedomNow 2025", slug: "freedomnow-2025", year: 2025, order: 3, cover: "freedomnow-2025.jpg", featuredOrder: 4, lightroomUrl: "https://lightroom.adobe.com/shares/a65cfd8a95604ad08b3da50c5dce8053" },
  { id: "in-his-hands", name: "In His Hands", slug: "in-his-hands", year: 2026, order: 1, cover: "in-his-hands.jpg", featuredOrder: 1, lightroomUrl: "https://lightroom.adobe.com/shares/e4dfa9dca72849bfbcf8385ef6a5cf69" },
  { id: "virtues-25th", name: "Virtue's 25th", slug: "virtues-25th", year: 2026, order: 2, lightroomUrl: "https://lightroom.adobe.com/shares/45cb2b9265f946e08b2e400f1deef397" },
  { id: "lov2026", name: "LOV2026", slug: "lov2026", year: 2026, order: 3, cover: "lov-2026.jpg", featuredOrder: 2, lightroomUrl: "https://lightroom.adobe.com/shares/292b4ecb339b4462be4b2b5fd5e7cc33" },
  { id: "vtl-flow", name: "VTL Flow", slug: "vtl-flow", year: 2026, order: 4, lightroomUrl: "https://lightroom.adobe.com/shares/942ee4a3d14848a39447f00aa2233765" },
];

for (const e of EVENTS) {
  const doc = {
    _id: `event-${e.id}`,
    _type: "event",
    name: e.name,
    slug: { _type: "slug", current: e.slug },
    order: e.order,
    lightroomUrl: e.lightroomUrl,
    ...(e.year !== undefined ? { year: e.year } : {}),
  };

  if (e.cover) {
    const coverPath = `${COVER_DIR}\\${e.cover}`;
    if (!existsSync(coverPath)) {
      console.error(`missing cover file: ${coverPath} — skipping cover/featured for ${e.name}`);
    } else {
      const asset = await client.assets.upload("image", createReadStream(coverPath), {
        filename: e.cover,
      });
      doc.coverImage = {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      };
      doc.featuredOnHome = true;
      doc.featuredOrder = e.featuredOrder;
    }
  }

  const result = await client.createOrReplace(doc);
  console.log(`${e.cover ? "featured" : "        "}  ${result._id}  ${e.name}`);
}

console.log("\ndone");
