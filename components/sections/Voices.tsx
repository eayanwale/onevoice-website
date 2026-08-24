"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DuotonePhoto from "@/components/DuotonePhoto";

import type { Voice } from "@/lib/sanity/queries";

// Most of these are full-body portraits taller than the 3:4 card, so a
// centred cover-crop trims the top and takes heads with it. Biasing up keeps
// faces in frame; landscape frames are unaffected (they crop horizontally).
// Members without a Studio-picked hotspot fall back to this.
const DEFAULT_OBJECT_POSITION = "50% 18%";

// The roster is shot across studio, stage and phone-camera sources, so the
// site's usual duotone leaves ten visibly different photographs. A partial
// grayscale knocks back the worst casts (purple stage wash, green trees)
// without draining the frames to sepia — skin tones and clothing keep their
// own color, they just stop disagreeing with each other.
const MEMBER_FILTER =
  "grayscale(0.4) sepia(0.28) saturate(1.1) hue-rotate(-9deg) brightness(0.93) contrast(1.05)";

// Hovering a card cross-fades to the untreated photograph. Same functions in
// the same order as MEMBER_FILTER at their identity values, so the browser
// interpolates between the two lists instead of snapping.
const MEMBER_FILTER_HOVER =
  "grayscale(0) sepia(0) saturate(1) hue-rotate(0deg) brightness(1) contrast(1)";

const PHOTO_WIDTH = "w-[240px] sm:w-[300px]";

function BioContent({ voice }: { voice: Voice }) {
  const paragraphs = (voice.bio ?? "").split(/\n\s*\n/).filter(Boolean);
  return (
    <>
      {voice.tagline ? (
        <blockquote className="accent-word text-lg leading-snug text-off-white/90">
          &ldquo;{voice.tagline}&rdquo;
        </blockquote>
      ) : null}
      {paragraphs.length > 0 ? (
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-off-white/70">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}
    </>
  );
}

function VoiceCard({
  voice,
  isOpen,
  onToggle,
}: {
  voice: Voice;
  isOpen: boolean;
  onToggle?: () => void;
}) {
  return (
    <div
      data-voice-card
      // Fixed width always — on mobile the card grows *downward* into the
      // bio instead (see the grid-rows accordion below), it never widens
      // past the viewport. Only sm+ (where the pinned horizontal strip has
      // room) slides the bio out sideways and widens the card for it.
      className={`group flex w-[240px] shrink-0 snap-start flex-col overflow-hidden transition-[width] duration-500 ease-brand sm:flex-row sm:gap-6 ${
        isOpen ? "sm:w-[720px]" : "sm:w-[300px]"
      }`}
    >
      <div className={`${PHOTO_WIDTH} shrink-0`}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={onToggle ? isOpen : undefined}
          className={`relative block aspect-[3/4] w-full overflow-hidden text-left ${
            onToggle ? "" : "cursor-default"
          }`}
        >
          <DuotonePhoto
            src={voice.photo}
            alt={`${voice.name} of OneVoice`}
            sizes="(min-width: 640px) 300px, 240px"
            objectPosition={voice.objectPosition ?? DEFAULT_OBJECT_POSITION}
            filter={isOpen ? MEMBER_FILTER_HOVER : MEMBER_FILTER}
            hoverFilter={onToggle ? MEMBER_FILTER_HOVER : undefined}
            className="h-full w-full transition-transform duration-700 ease-brand group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
        </button>
        <div className="mt-5">
          <div className="display-md">{voice.name}</div>
          {voice.role ? (
            <p className="label-text mt-2 text-warm-sage">{voice.role}</p>
          ) : null}
          {onToggle ? (
            <button
              type="button"
              onClick={onToggle}
              className="link-label mt-4 text-off-white/60 transition-colors hover:text-off-white"
            >
              {isOpen ? "close ✕" : "their story ↗"}
            </button>
          ) : null}
        </div>
      </div>

      {/* Mobile: opens downward. The grid-rows-[0fr]->[1fr] trick animates
          to the content's natural height without knowing it up front —
          plain height/max-height can't do that without JS measurement. */}
      <div
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows] duration-500 ease-brand motion-reduce:transition-none sm:hidden ${
          isOpen ? "mt-5 grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <BioContent voice={voice} />
        </div>
      </div>

      {/* Desktop: slides out to the right instead. Width (not just opacity)
          has to hit a real 0 when collapsed — a flex item only shrinks
          below its content's intrinsic width with min-w-0, and without an
          explicit h-0 too, wrapping this text into a 0-width column makes
          the browser stack it one word (or character) per line, which
          blows the row's height out to thousands of pixels. */}
      <div
        aria-hidden={!isOpen}
        className={`hidden min-w-0 overflow-y-auto pr-1 transition-[opacity,transform] duration-500 ease-brand motion-reduce:transition-none sm:block ${
          isOpen
            ? "sm:w-[380px] sm:opacity-100 sm:translate-x-0"
            : "pointer-events-none sm:h-0 sm:w-0 sm:-translate-x-4 sm:opacity-0"
        }`}
      >
        <BioContent voice={voice} />
      </div>
    </div>
  );
}

export default function Voices({ voices }: { voices: Voice[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 639px)").matches;

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-voice-card]");

      // cards rise and fade in as the strip comes into view
      if (!reduced) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "cubic-bezier(0.33, 0, 0.2, 1)",
            scrollTrigger: { trigger: section, start: "top 75%", once: true },
          }
        );
      }

      // mobile/reduced-motion keep the plain swipeable strip — a pinned
      // scroll-jack reads as janky on touch and ignores motion preference.
      if (reduced || isMobile) return;

      // JS now owns horizontal position via transform on the inner track;
      // the outer viewport stops scrolling natively and just clips it.
      viewport.style.overflowX = "hidden";

      // The scroll distance is fixed once, up front, to the worst case (one
      // card open) — cards start collapsed, so track.scrollWidth here is the
      // baseline. Recalculating this live off scrollWidth (e.g. on refresh
      // after a card's width transition) made the x-per-scroll-pixel ratio
      // change mid-interaction, which reads as the track jumping sideways.
      // A fixed distance keeps x = -distance * progress continuous no matter
      // what's expanded; an unopened strip just has a little dead scroll
      // room at the very end of the pin, which is a fair trade for no jump.
      const OPEN_MINUS_COLLAPSED_WIDTH = 720 - 300;
      const distance =
        Math.max(0, track.scrollWidth - viewport.clientWidth) + OPEN_MINUS_COLLAPSED_WIDTH;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${distance}`,
        pin: true,
        onUpdate: (self) => {
          gsap.set(track, { x: -distance * self.progress });
          if (barRef.current) {
            gsap.set(barRef.current, { scaleX: Math.max(self.progress, 0.001) });
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center overflow-hidden py-24 sm:h-screen sm:py-0"
    >
      <div className="mx-auto w-full max-w-shell px-5 sm:px-8">
        <p data-reveal className="label-text text-warm-sage">
          the people
        </p>
        <h2 data-reveal className="display-lg mt-6 max-w-lg">
          meet OneVoice.
        </h2>
        <p data-reveal className="mt-6 max-w-md leading-relaxed text-muted">
          Ten friends who show up — every rehearsal, every service.
        </p>
      </div>

      <div ref={viewportRef} className="no-scrollbar mt-12 overflow-x-auto px-5 pb-2 sm:px-8">
        <div ref={trackRef} className="flex w-max snap-x snap-mandatory gap-5">
          {voices.map((voice, i) => (
            <VoiceCard
              key={`${voice.name}-${i}`}
              voice={voice}
              isOpen={activeIndex === i}
              onToggle={
                voice.bio
                  ? () => setActiveIndex((current) => (current === i ? null : i))
                  : undefined
              }
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 hidden h-px w-full max-w-shell bg-ink/15 sm:block">
        <div ref={barRef} className="h-px w-full origin-left scale-x-0 bg-warm-sage" />
      </div>
    </section>
  );
}
