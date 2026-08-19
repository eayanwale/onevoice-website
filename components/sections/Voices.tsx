"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DuotonePhoto from "@/components/DuotonePhoto";

type Voice = {
  name: string;
  role: string;
  photo: string;
};

// placeholder roster — swap the names and roles for the real ones once
// they're settled. photos are the collective's own exported frames.
const VOICES: Voice[] = [
  { name: "friend 01", role: "vocals", photo: "/images/visual-world/solo-smoke-backdrop.jpg" },
  { name: "friend 02", role: "keys", photo: "/images/visual-world/solo-cap-singing.jpg" },
  { name: "friend 03", role: "guitar", photo: "/images/visual-world/solo-vest-window-light.jpg" },
  { name: "friend 04", role: "drums", photo: "/images/visual-world/solo-dark-portrait.jpg" },
  { name: "friend 05", role: "vocals", photo: "/images/visual-world/solo-lyrics-screen.jpg" },
  { name: "friend 06", role: "bass", photo: "/images/visual-world/candid-back-view.jpg" },
  { name: "friend 07", role: "vocals", photo: "/images/visual-world/candid-duo-backstage.jpg" },
  { name: "friend 08", role: "production", photo: "/images/visual-world/candid-pew-moment.jpg" },
  { name: "friend 09", role: "vocals", photo: "/images/visual-world/solo-cap-singing.jpg" },
  { name: "friend 10", role: "keys", photo: "/images/visual-world/rehearsal-wide.jpg" },
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
          alt={voice.name}
          sizes="(min-width: 640px) 300px, 240px"
          className="h-full w-full transition-transform duration-700 ease-brand group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
      </div>
      <div className="mt-5">
        <div className="display-md">{voice.name}</div>
        <p className="label-text mt-2 text-warm-sage">{voice.role}</p>
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
          the voices behind the sound.
        </h2>
        <p data-reveal className="mt-6 max-w-md leading-relaxed text-muted">
          about ten friends who show up — every rehearsal, every service.
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
