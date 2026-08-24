import { createClient } from "next-sanity";

// Public, non-secret identifiers (see .env.example) — defaulted here so the
// build doesn't depend on Cloudflare's build environment having them
// configured too. Override via env only if ever pointing at a different
// Sanity project/dataset (e.g. a staging one).
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "erpqd8b3",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-08-24",
  useCdn: true,
});
