"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DuotonePhoto from "@/components/DuotonePhoto";

type Voice = {
  name: string;
  /** Optional on purpose — a card renders name-only until the role is known,
      rather than showing a guessed instrument. */
  role?: string;
  photo: string;
  /** Override the default upward bias when a frame crops badly. */
  objectPosition?: string;
};

// Most of these are full-body portraits taller than the 3:4 card, so a
// centred cover-crop trims the top and takes heads with it. Biasing up keeps
// faces in frame; landscape frames are unaffected (they crop horizontally).
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

// The roster, alphabetical. Each photo is keyed off the member's own name, so
// dropping <name>.jpg into public/images/members/ is the only step needed —
// the pairing never depends on the order files were handed over.
const VOICES: Voice[] = [
  { name: "Ayomide", photo: "/images/members/ayomide.jpg" },
  { name: "Deborah", photo: "/images/members/deborah.jpg" },
  { name: "Dionne", photo: "/images/members/dionne.jpg" },
  { name: "Enoch", photo: "/images/members/enoch.jpg" },
  { name: "Favor", photo: "/images/members/favor.jpg" },
  { name: "Feyishola", photo: "/images/members/feyishola.jpg" },
  { name: "Fiyin", photo: "/images/members/fiyin.jpg" },
  { name: "Goodness", photo: "/images/members/goodness.jpg" },
  { name: "Joseph", photo: "/images/members/joseph.jpg" },
  { name: "Naomi", photo: "/images/members/naomi.jpg" },
];

function VoiceCard({ voice }: { voice: Voice }) {
  return (
    <div
      data-voice-card
      className="group w-[240px] shrink-0 snap-start sm:w-[300px]"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
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
      </div>
      <div className="mt-5">
        <div className="display-md">{voice.name}</div>
        {voice.role ? (
          <p className="label-text mt-2 text-warm-sage">{voice.role}</p>
        ) : null}
      </div>
    </div>
  );
}

export default function Voices() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

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

      const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      if (!distance) return;

      // JS now owns horizontal position via transform on the inner track;
      // the outer viewport stops scrolling natively and just clips it.
      viewport.style.overflowX = "hidden";

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
          Meet OneVoice.
        </h2>
        <p data-reveal className="mt-6 max-w-md leading-relaxed text-muted">
          Ten friends who show up — every rehearsal, every service.
        </p>
      </div>

      <div ref={viewportRef} className="no-scrollbar mt-12 overflow-x-auto px-5 pb-2 sm:px-8">
        <div ref={trackRef} className="flex w-max snap-x snap-mandatory gap-5">
          {VOICES.map((voice, i) => (
            <VoiceCard key={`${voice.name}-${i}`} voice={voice} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 hidden h-px w-full max-w-shell bg-ink/15 sm:block">
        <div ref={barRef} className="h-px w-full origin-left scale-x-0 bg-warm-sage" />
      </div>
    </section>
  );
}
