// scripts/prep-photos.mjs
//
// Resize/compress source photography before it goes into public/images/.
// CLAUDE.md requires ~2400px max dimension at JPEG q80-85; camera originals
// (4000x6000, 15MB) must never be committed as-is.
//
// Uses the Playwright chromium that's already a devDependency rather than
// pulling in sharp or ImageMagick just for this.
//
// Usage:
//   node scripts/prep-photos.mjs <sourceDir> <outDir> [maxPx] [quality]
//   node scripts/prep-photos.mjs <sourceFile> <outDir> --as=<name> [maxPx] [quality]
//
// Directory mode matches files case-insensitively by the member name appearing
// anywhere in the filename, so "Ayomide's pic.jpg" and "ayomide.JPEG" both land
// as ayomide.jpg. Anything unmatched is reported and skipped, never guessed at.
//
// File mode takes one image and writes it as <name>.jpg — for one-off assets
// (hero frames, floaters) that still need the same resize/compress treatment.

import { chromium } from "playwright";
import { readFileSync, writeFileSync, readdirSync, mkdirSync, statSync } from "node:fs";
import { join, extname, dirname, basename } from "node:path";

const argv = process.argv.slice(2);
const asFlag = argv.find((a) => a.startsWith("--as="))?.slice(5);
const [src, outDir, maxPxArg, qualityArg] = argv.filter((a) => !a.startsWith("--"));

if (!src || !outDir) {
  console.error("usage: node scripts/prep-photos.mjs <sourceDir|sourceFile> <outDir> [--as=name] [maxPx] [quality]");
  process.exit(1);
}

const MAX_PX = Number(maxPxArg) || 2400;
const QUALITY = Number(qualityArg) || 0.85;
const SINGLE_FILE = statSync(src).isFile();

if (SINGLE_FILE && !asFlag) {
  console.error("file mode needs an output name: --as=<name>");
  process.exit(1);
}

// The roster. A source file is claimed by whichever name it contains.
const NAMES = [
  "ayomide",
  "deborah",
  "dionne",
  "enoch",
  "favor",
  "feyishola",
  "fiyin",
  "goodness",
  "joseph",
  "naomi",
];

// Nicknames that won't substring-match their roster name.
const ALIASES = { debs: "deborah" };

// Per-member crop insets, as a fraction of the source dimension, applied
// before the resize. dionne's source is an Instagram screenshot with the
// player's mute button burned into the bottom-right corner.
const CROPS = {
  dionne: { bottom: 0.09 },
};

const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

function resolveName(filename) {
  if (SINGLE_FILE) return asFlag;
  const lower = filename.toLowerCase();
  for (const [alias, name] of Object.entries(ALIASES)) {
    if (lower.includes(alias)) return name;
  }
  return NAMES.find((n) => lower.includes(n)) ?? null;
}

mkdirSync(outDir, { recursive: true });

const srcDir = SINGLE_FILE ? dirname(src) : src;
const files = SINGLE_FILE
  ? [basename(src)]
  : readdirSync(src).filter((f) => MIME[extname(f).toLowerCase()]);
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("about:blank");

const claimed = new Map();
const skipped = [];

for (const file of files) {
  const name = resolveName(file);
  if (!name) {
    skipped.push(file);
    continue;
  }
  if (claimed.has(name)) {
    skipped.push(`${file} (name "${name}" already taken by ${claimed.get(name)})`);
    continue;
  }
  claimed.set(name, file);

  const srcPath = join(srcDir, file);
  const mime = MIME[extname(file).toLowerCase()];
  const dataUrl = `data:${mime};base64,${readFileSync(srcPath).toString("base64")}`;

  const crop = CROPS[name] ?? {};

  const { base64, width, height } = await page.evaluate(
    async ({ dataUrl, maxPx, quality, crop }) => {
      const img = new Image();
      img.src = dataUrl;
      await img.decode();

      // Source rect after the per-member crop insets.
      const sx = Math.round(img.naturalWidth * (crop.left ?? 0));
      const sy = Math.round(img.naturalHeight * (crop.top ?? 0));
      const sw = Math.round(img.naturalWidth * (1 - (crop.left ?? 0) - (crop.right ?? 0)));
      const sh = Math.round(img.naturalHeight * (1 - (crop.top ?? 0) - (crop.bottom ?? 0)));

      const scale = Math.min(1, maxPx / Math.max(sw, sh));
      const width = Math.round(sw * scale);
      const height = Math.round(sh * scale);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      // Flatten onto white so PNG transparency doesn't turn black in JPEG.
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);

      return {
        base64: canvas.toDataURL("image/jpeg", quality).split(",")[1],
        width,
        height,
      };
    },
    { dataUrl, maxPx: MAX_PX, quality: QUALITY, crop }
  );

  const outPath = join(outDir, `${name}.jpg`);
  writeFileSync(outPath, Buffer.from(base64, "base64"));

  const before = (statSync(srcPath).size / 1024 / 1024).toFixed(2);
  const after = (statSync(outPath).size / 1024 / 1024).toFixed(2);
  console.log(`${name}.jpg  ${width}x${height}  ${before}MB -> ${after}MB   (${file})`);
}

await browser.close();

if (skipped.length) console.log(`\nskipped: ${skipped.join(", ")}`);

if (SINGLE_FILE) {
  console.log(`\ndone — written to ${outDir}`);
} else {
  const missing = NAMES.filter((n) => !claimed.has(n));
  if (missing.length) console.log(`no source file for: ${missing.join(", ")}`);
  console.log(`\ndone — ${claimed.size}/${NAMES.length} written to ${outDir}`);
}
