"use client";

import { useRef, useState } from "react";
import DuotonePhoto from "@/components/DuotonePhoto";

type VideoSlideData = {
  kind: "video";
  label: string;
  title: string;
  description: string;
  youtubeUrl: string;
  cover: string;
  objectPosition: string;
  duration: string;
};

type PlaceholderSlideData = {
  kind: "placeholder";
  title: string;
};

type Slide = VideoSlideData | PlaceholderSlideData;

const SLIDES: Slide[] = [
  {
    kind: "video",
    label: "on youtube · lift our voices 2026",
    title: "praise & worship mashup",
    description:
      "six songs, sung together, live: holy forever, king of heaven, that great name, to our god, baruch hashem adonai, and good good father.",
    youtubeUrl: "https://youtu.be/MdD71CNCSEw",
    cover: "/images/lov-youtube-cover.jpg",
    objectPosition: "50% 40%",
    duration: "30 min",
  },
  { kind: "placeholder", title: "next cover, coming soon" },
  { kind: "placeholder", title: "next cover, coming soon" },
];

function VideoSlide({ slide }: { slide: VideoSlideData }) {
  return (
    <div className="relative flex h-full min-h-screen flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <DuotonePhoto
          src={slide.cover}
          alt={`One Voice — ${slide.title}`}
          parallax
          objectPosition={slide.objectPosition}
          className="absolute inset-x-0 -top-[25%] h-[150%] w-full"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(26,26,26,0.9) 0%, rgba(71,50,55,0.4) 38%, rgba(26,26,26,0.1) 68%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6 pb-28 pt-14 sm:px-10 sm:pb-32">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:gap-5">
          <div data-reveal className="label-text text-warm-sage">
            {slide.label}
          </div>
          <h3
            data-reveal
            className="text-[32px] font-semibold leading-[0.95] text-off-white sm:text-[52px] lg:text-[72px]"
          >
            {slide.title}
          </h3>
          <p data-reveal className="max-w-lg text-base leading-[1.6] text-off-white/70">
            {slide.description}
          </p>
          <div data-reveal className="mt-3 flex flex-wrap items-center gap-7">
            <a
              href={slide.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-full bg-warm-sage py-2 pl-2 pr-6 font-display text-sm font-semibold text-charcoal transition-opacity duration-200 hover:opacity-70"
            >
              <svg width="26" height="26" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                <circle cx="15" cy="15" r="14" fill="#1A1A1A" />
                <path d="M12 10L20 15L12 20V10Z" fill="#BEB7A7" />
              </svg>
              watch
            </a>
            <a
              href={slide.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-off-white/70 transition-opacity duration-200 hover:opacity-70"
            >
              youtube
            </a>
            <a href="#" className="text-sm text-off-white/70 transition-opacity duration-200 hover:opacity-70">
              instagram
            </a>
            <span className="label-text ml-auto text-off-white/40">
              {slide.duration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderSlide({ slide }: { slide: PlaceholderSlideData }) {
  return (
    <div className="relative flex h-full min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-charcoal via-deep-brown/30 to-charcoal px-6 text-center">
      <div className="mb-7 h-14 w-px bg-warm-sage/40" />
      <div data-reveal className="label-text mb-4 text-off-white/40">
        more from one voice
      </div>
      <h3
        data-reveal
        className="max-w-sm text-[26px] font-semibold leading-[1.15] text-off-white/60 sm:text-[36px]"
      >
        {slide.title}
      </h3>
    </div>
  );
}

export default function LatestWork() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, i));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: clamped * track.clientWidth,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <section
      id="music"
      className="relative bg-charcoal scroll-mt-16 sm:scroll-mt-[76px]"
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="no-scrollbar flex h-screen snap-x snap-mandatory overflow-x-auto"
      >
        {SLIDES.map((slide, i) => (
          <div key={i} className="h-full w-full shrink-0 snap-start">
            {slide.kind === "video" ? (
              <VideoSlide slide={slide} />
            ) : (
              <PlaceholderSlide slide={slide} />
            )}
          </div>
        ))}
      </div>

      {SLIDES.length > 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-14 z-10 px-6 sm:bottom-16 sm:px-10">
          <div className="pointer-events-auto mx-auto flex w-full max-w-6xl items-center justify-between">
            <div className="flex gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`go to slide ${i + 1}`}
                  onClick={() => scrollToIndex(i)}
                  className={`h-[3px] w-8 rounded-full transition-colors duration-300 ${
                    i === index ? "bg-warm-sage" : "bg-off-white/25"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                aria-label="previous slide"
                onClick={() => scrollToIndex(index - 1)}
                disabled={index === 0}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-off-white/20 text-off-white transition-opacity duration-200 hover:opacity-70 disabled:opacity-30"
              >
                &larr;
              </button>
              <button
                type="button"
                aria-label="next slide"
                onClick={() => scrollToIndex(index + 1)}
                disabled={index === SLIDES.length - 1}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-off-white/20 text-off-white transition-opacity duration-200 hover:opacity-70 disabled:opacity-30"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
