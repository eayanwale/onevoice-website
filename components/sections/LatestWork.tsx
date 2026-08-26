"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DuotonePhoto from "@/components/DuotonePhoto";
import {
  YOUTUBE_CHANNEL_URL,
  INSTAGRAM_URL,
  SPOTIFY_URL,
  isExternal,
} from "@/lib/links";
import type { VideoSlide } from "@/lib/sanity/queries";

// "watch" on each slide goes to that set itself; these go to the profiles.
const SOCIALS = [
  { label: "youtube", href: YOUTUBE_CHANNEL_URL },
  { label: "instagram", href: INSTAGRAM_URL },
  { label: "spotify", href: SPOTIFY_URL },
];

// Event photography runs dark (stage lighting, black backdrops) — a
// meaningfully brighter lift than the standard duotone grade, or these
// slides read as a near-black rectangle under the section's gradient.
const WATCH_FILTER =
  "sepia(0.3) saturate(1.1) hue-rotate(-8deg) brightness(1.25) contrast(1.02)";

const AUTO_ADVANCE_MS = 6000;

export default function LatestWork({ slides }: { slides: VideoSlide[] }) {
  const [index, setIndex] = useState(0);
  // bumped on every manual prev/next so the auto-advance timer restarts
  // instead of switching again a moment after someone just chose a slide.
  const [interactionCount, setInteractionCount] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length, interactionCount]);

  if (slides.length === 0) return null;

  const slide = slides[index];
  const step = (delta: number) => {
    setIndex((current) => (current + delta + slides.length) % slides.length);
    setInteractionCount((n) => n + 1);
  };

  return (
    <section
      id="music"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal scroll-mt-16 sm:scroll-mt-[76px]"
    >
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((s, i) => (
          <DuotonePhoto
            key={s.image}
            src={s.image}
            alt={`OneVoice — ${s.title} ${s.accent}, live at Lift Our Voices 2026`}
            parallax={i === 0}
            objectPosition={s.objectPosition}
            filter={WATCH_FILTER}
            // Only the parallax slide needs the oversized buffer that
            // compensates for ScrollReveals' yPercent shift (see CLAUDE.md's
            // parallax-buffer gotcha) — applying it to the static slides too
            // just crops them into an arbitrary, un-tuned window.
            //
            // `!absolute` (not `absolute`) is load-bearing here: DuotonePhoto's
            // own root div already carries `relative`, and Tailwind's utility
            // order makes `.relative` win over a plain `.absolute` passed in via
            // className — invisible with a single slide (it still happens to
            // fill the space via normal flow), but with N stacked siblings they
            // land one after another in normal flow instead of overlapping, and
            // only the first ends up inside the visible, clipped viewport.
            className={`!absolute inset-x-0 w-full transition-opacity duration-700 ease-brand ${
              i === 0 ? "-top-[25%] h-[150%]" : "top-0 h-full"
            } ${i === index ? "opacity-100" : "pointer-events-none opacity-0"}`}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            // Two layers doing different jobs: the vertical one keeps the
            // photo itself visible (this used to crush dark event photos to
            // near-black), the horizontal one is a dedicated scrim behind the
            // text column specifically — legibility that doesn't depend on
            // guessing how bright any given uploaded thumbnail is.
            background: [
              "linear-gradient(to right, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.58) 45%, rgba(26,26,26,0.15) 75%)",
              "linear-gradient(to top, rgba(26,26,26,0.85) 0%, rgba(71,50,55,0.5) 38%, rgba(26,26,26,0.15) 68%, rgba(26,26,26,0.35) 100%)",
            ].join(", "),
          }}
        />
      </div>
      <div className="grain" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-shell px-5 pb-20 pt-28 sm:px-8 sm:pb-28">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <p className="label-text text-warm-sage">watch us · lift our voices 2026</p>
          <Link href="/watch" className="link-label text-off-white/80">
            see all ↗
          </Link>
        </div>
        <h2
          data-reveal
          className="display-lg mt-6 max-w-2xl text-off-white [text-shadow:0_2px_20px_rgb(0_0_0_/_55%)]"
        >
          {slide.title} <span className="accent-word text-warm-sage">{slide.accent}</span>.
        </h2>
        {slide.credit ? (
          <p
            data-reveal
            className="mt-7 max-w-lg leading-relaxed text-off-white/70 [text-shadow:0_1px_12px_rgb(0_0_0_/_60%)]"
          >
            {slide.credit}
          </p>
        ) : null}
        <div data-reveal className="mt-9 flex flex-wrap items-center gap-3">
          <a href={slide.href} target="_blank" rel="noopener noreferrer" className="btn-solid">
            watch ↗
          </a>
          {SOCIALS.map((s) =>
            isExternal(s.href) ? (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline border-off-white/30 text-off-white"
              >
                {s.label} ↗
              </a>
            ) : (
              <Link
                key={s.label}
                href={s.href}
                className="btn-outline border-off-white/30 text-off-white"
              >
                {s.label} ↗
              </Link>
            )
          )}
          {slide.duration ? (
            <span className="label-text ml-auto text-off-white/40">{slide.duration}</span>
          ) : null}
        </div>

        {slides.length > 1 ? (
          <div data-reveal className="mt-12 flex items-center gap-6 border-t border-off-white/15 pt-6">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous video"
              className="flex size-11 items-center justify-center rounded-sm border border-off-white/25 text-off-white/70 transition-colors hover:border-warm-sage hover:text-warm-sage"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 1L2 7l7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="label-text text-off-white/50">
              {String(index + 1).padStart(2, "0")} — {String(slides.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next video"
              className="flex size-11 items-center justify-center rounded-sm border border-off-white/25 text-off-white/70 transition-colors hover:border-warm-sage hover:text-warm-sage"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 1l7 6-7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
