"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const EASE = "cubic-bezier(0.33, 0, 0.2, 1)";

export default function ScrollReveals() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // parallax and pinned sequences read as janky on touch/small viewports
    // more often than cinematic — reduce/drop them on mobile per project rules.
    const isMobile = window.matchMedia("(max-width: 639px)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-reveal]", { opacity: 1, y: 0 });
        gsap.set("[data-char]", { opacity: 1, y: 0 });
        return;
      }

      // simple opacity + y reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: EASE,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // background parallax layers, ~0.85x scroll speed vs. 1x foreground
      if (!isMobile) {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const parent = el.parentElement ?? el;
          gsap.to(el, {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: parent,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }

      // statement headline scrub-reveal, character by character
      const heading = document.querySelector<HTMLElement>("[data-split-heading]");

      if (heading) {
        const chars = heading.querySelectorAll<HTMLElement>("[data-char]");
        gsap.fromTo(
          chars,
          { opacity: 0.08, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.012,
            ease: EASE,
            scrollTrigger: {
              trigger: heading,
              start: "top 90%",
              end: isMobile ? "top 45%" : "top 35%",
              scrub: 0.4,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
