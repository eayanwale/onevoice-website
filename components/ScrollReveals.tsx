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

      // single pinned scroll sequence: statement headline scrub-reveal
      const pinSection = document.querySelector<HTMLElement>("[data-pin-section]");
      const heading = document.querySelector<HTMLElement>("[data-split-heading]");

      if (pinSection && heading) {
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
              trigger: pinSection,
              start: "top 65%",
              end: "top 20%",
              scrub: 0.4,
            },
          }
        );

        ScrollTrigger.create({
          trigger: pinSection,
          start: "top top",
          end: "+=500",
          pin: true,
          pinSpacing: true,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
