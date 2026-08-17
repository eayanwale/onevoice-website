"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DuotonePhoto from "@/components/DuotonePhoto";

type Member = {
  name: string;
  role: string;
  photo: string;
};

// placeholder roster — swap for real names, roles, and portraits once
// they're picked from the collective's own photos.
const MEMBERS: Member[] = [
  { name: "friend 01", role: "vocals", photo: "/images/visual-world/solo-smoke-backdrop.jpg" },
  { name: "friend 02", role: "keys", photo: "/images/visual-world/solo-cap-singing.jpg" },
  { name: "friend 03", role: "guitar", photo: "/images/visual-world/solo-vest-window-light.jpg" },
  { name: "friend 04", role: "drums", photo: "/images/visual-world/solo-dark-portrait.jpg" },
  { name: "friend 05", role: "vocals", photo: "/images/visual-world/solo-lyrics-screen.jpg" },
  { name: "friend 06", role: "bass", photo: "/images/visual-world/candid-back-view.jpg" },
  { name: "friend 07", role: "vocals", photo: "/images/visual-world/candid-duo-backstage.jpg" },
  { name: "friend 08", role: "production", photo: "/images/visual-world/solo-smoke-backdrop.jpg" },
  { name: "friend 09", role: "vocals", photo: "/images/visual-world/solo-cap-singing.jpg" },
  { name: "friend 10", role: "keys", photo: "/images/visual-world/solo-vest-window-light.jpg" },
];

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="w-[220px] shrink-0 snap-start sm:w-[280px]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-tl-full rounded-tr-full">
        <DuotonePhoto
          src={member.photo}
          alt={member.name}
          sizes="(min-width: 640px) 280px, 220px"
          className="h-full w-full"
        />
      </div>
      <div className="mt-4">
        <div className="text-[18px] font-semibold text-off-white sm:text-[21px]">
          {member.name}
        </div>
        <div className="label-text mt-1 text-warm-sage">{member.role}</div>
      </div>
    </div>
  );
}

export default function MemberCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 639px)").matches;

    // mobile/reduced-motion keep the default overflow-x-auto strip — a
    // pinned scroll-jack reads as janky on touch and ignores the user's
    // motion preference, so it stays a plain swipeable carousel instead.
    if (reduced || isMobile) return;

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const ctx = gsap.context(() => {
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
      className="relative flex flex-col justify-center overflow-hidden bg-charcoal py-24 sm:h-screen sm:py-0"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
        <div data-reveal className="label-text mb-3 text-warm-sage">
          the people
        </div>
        <p
          data-reveal
          className="mb-10 max-w-sm text-[15px] leading-[1.6] text-off-white/70"
        >
          ten friends who show up — every rehearsal, every service.
        </p>
      </div>

      <div
        ref={viewportRef}
        className="no-scrollbar overflow-x-auto px-6 pb-2 sm:px-10"
      >
        <div
          ref={trackRef}
          className="flex w-max gap-5 snap-x snap-mandatory"
        >
          {MEMBERS.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 hidden h-px w-full max-w-6xl bg-off-white/15 sm:block sm:px-10">
        <div ref={barRef} className="h-px w-full origin-left scale-x-0 bg-warm-sage" />
      </div>
    </section>
  );
}
