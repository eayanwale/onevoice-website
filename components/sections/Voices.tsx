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
    <div data-voice-card className={`group flex ${PHOTO_WIDTH} shrink-0 snap-start flex-col`}>
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
          filter={MEMBER_FILTER}
          hoverFilter={MEMBER_FILTER_HOVER}
          className="h-full w-full transition-transform duration-700 ease-brand group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
        {voice.role ? (
          // Desktop: reveals on hover/focus. Mobile has no hover, so it's
          // driven by tap state (isOpen) instead — the two triggers never
          // fight because motion-safe:sm:group-hover only applies at sm+.
          <div
            aria-hidden={!isOpen}
            className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent px-4 pb-4 pt-10 opacity-0 transition-opacity duration-300 ease-brand ${
              isOpen ? "opacity-100" : ""
            } sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100`}
          >
            <p className="label-text text-off-white">{voice.role}</p>
          </div>
        ) : null}
      </button>

      <div className="mt-5">
        <div className="display-md">{voice.name}</div>
        {voice.role ? (
          <p className="label-text mt-2 text-warm-sage">{voice.role}</p>
        ) : null}
      </div>
    </div>
  );
}

export default function Voices({ voices }: { voices: Voice[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

      const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);

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
        <p
          data-reveal
          className="label-text mt-4 block text-warm-sage sm:hidden sm:motion-reduce:block"
        >
          swipe to meet everyone →
        </p>
        <p
          data-reveal
          className="label-text mt-4 hidden text-warm-sage sm:motion-safe:block"
        >
          keep scrolling ↓
        </p>
      </div>

      <div ref={viewportRef} className="no-scrollbar mt-12 overflow-x-auto px-5 pb-2 sm:px-8">
        <div ref={trackRef} className="flex w-max snap-x snap-mandatory gap-5">
          {voices.map((voice, i) => (
            <VoiceCard
              key={`${voice.name}-${i}`}
              voice={voice}
              isOpen={openIndex === i}
              onToggle={
                voice.role
                  ? () => setOpenIndex((current) => (current === i ? null : i))
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
