"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import SocialIcon, { type Platform } from "@/components/SocialIcon";

const EASE: [number, number, number, number] = [0.33, 0, 0.2, 1];
const SCROLL_THRESHOLD = 72;

const SOCIALS: Platform[] = ["instagram", "youtube", "spotify"];

const NAV_LINKS = [
  { href: "/about", label: "about" },
  { href: "/gallery", label: "gallery" },
  { href: "/store", label: "store" },
  { href: "/connect", label: "connect" },
];

export default function Header() {
  const pathname = usePathname();
  // the bare-transparent start state only reads well over the home page's
  // dark hero photo — every other route has no dark backdrop behind the
  // header, so it starts (and stays) in the glass state there.
  const hasHero = pathname === "/";

  // "/" only matches exactly; every other route also matches its children
  // so a future /gallery/[slug] still lights up the gallery nav item.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(!hasHero);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    if (!hasHero) {
      setScrolled(true);
      return;
    }

    let raf = 0;
    const update = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [hasHero]);

  const glassTransition = { duration: reducedMotion ? 0 : 0.55, ease: EASE };

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={glassTransition}
        className="absolute inset-0 border-b border-off-white/10 bg-charcoal/45 shadow-[0_8px_30px_-14px_rgba(0,0,0,0.55)] backdrop-blur-lg backdrop-saturate-150"
      />
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ ...glassTransition, delay: reducedMotion ? 0 : 0.1 }}
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-off-white/50 to-transparent"
      />
      <div className="relative mx-auto flex h-16 w-full max-w-shell items-center justify-between px-5 sm:h-[76px] sm:px-8">
        <Link href="/" className="shrink-0" aria-label="One Voice — home">
          <Image
            src="/logo/one-voice-lockup-light-trimmed.png"
            alt="One Voice"
            width={981}
            height={405}
            priority
            className="h-7 w-auto object-contain sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`font-body text-sm tracking-wide transition-colors duration-200 hover:text-off-white ${
                isActive(link.href)
                  ? "font-semibold text-off-white"
                  : "text-off-white/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/invite"
            className="btn-outline border-off-white/30 text-off-white hover:bg-off-white hover:text-charcoal"
          >
            invite us
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "close menu" : "open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 shrink-0 items-center justify-center md:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 top-0 h-px w-6 bg-off-white transition-transform duration-300 ease-[cubic-bezier(0.33,0,0.2,1)] ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-px w-6 bg-off-white transition-transform duration-300 ease-[cubic-bezier(0.33,0,0.2,1)] ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-hidden bg-charcoal px-6 pt-12 md:hidden"
          >
            <div className="grain" aria-hidden="true" />
            <nav className="relative flex flex-col gap-6">
              {[{ href: "/", label: "home" }, ...NAV_LINKS].map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.05 * i }}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`display-md flex min-h-11 items-center ${
                    isActive(link.href)
                      ? "text-off-white"
                      : "text-off-white/55"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/invite"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.05 * (NAV_LINKS.length + 1) }}
                aria-current={isActive("/invite") ? "page" : undefined}
                className={`display-md flex min-h-11 items-center ${
                  isActive("/invite") ? "text-off-white" : "text-off-white/55"
                }`}
              >
                invite us
              </motion.a>
            </nav>
            <div className="relative mt-auto flex gap-3 border-t border-off-white/15 py-8 pb-[calc(2rem+env(safe-area-inset-bottom))]">
              {SOCIALS.map((label) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-11 items-center justify-center rounded-sm border border-off-white/25 text-warm-sage transition-colors duration-200 hover:bg-off-white/10"
                >
                  <SocialIcon platform={label} className="size-[18px]" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
