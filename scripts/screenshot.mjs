// scripts/screenshot.mjs
//
// Captures the running dev server at a few viewports so Claude Code can
// actually see what it built instead of guessing from the code.
//
// Setup (one time):
//   npm install -D playwright
//   npx playwright install chromium
//
// Usage (dev server must already be running on localhost:3000):
//   node scripts/screenshot.mjs
//   node scripts/screenshot.mjs /about        (screenshot a different route)
//
// Output goes to .screenshots/ (add that folder to .gitignore).

import { chromium } from "playwright";
import { mkdirSync } from "fs";

const route = process.argv[2] || "/";
const url = `http://localhost:3000${route}`;
const outDir = ".screenshots";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();

for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
  });

  await page.goto(url, { waitUntil: "networkidle" });

  // let entrance animations settle
  await page.waitForTimeout(1200);

  // Playwright's fullPage capture resizes the viewport instead of actually
  // scrolling, so scroll-triggered (GSAP ScrollTrigger + Lenis) reveals
  // below the fold never fire against a real scroll position. Walk the
  // page down with real wheel events first so everything plays, then
  // capture — reveals are set to play-once so they stay revealed.
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const steps = Math.ceil(scrollHeight / vp.height);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, vp.height);
    await page.waitForTimeout(250);
  }
  await page.waitForTimeout(600);

  const fullPath = `${outDir}/${vp.name}-full.png`;
  await page.screenshot({ path: fullPath, fullPage: true });
  console.log(`saved ${fullPath}`);

  // also grab just the first viewport (what a visitor sees on load,
  // before any scroll-triggered reveals)
  await page.goto(url, { waitUntil: "networkidle" });
  const heroPath = `${outDir}/${vp.name}-hero.png`;
  await page.screenshot({ path: heroPath, fullPage: false });
  console.log(`saved ${heroPath}`);

  await page.close();
}

await browser.close();
console.log("\ndone — review the images in .screenshots/ against CLAUDE.md's avoid-list");
