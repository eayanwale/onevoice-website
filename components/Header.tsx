"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.33, 0, 0.2, 1];

const NAV_LINKS = [
  { href: "#about", label: "about" },
  { href: "#music", label: "music" },
  { href: "#visuals", label: "visuals" },
  { href: "#connect", label: "connect" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div className="absolute inset-0 border-b border-off-white/10 bg-charcoal/50 backdrop-blur-md" />
      <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:h-[76px] sm:px-10">
        <Link href="/" className="shrink-0" aria-label="One Voice — home">
          <Image
            src="/logo/one-voice-lockup-light-trimmed.png"
            alt="One Voice"
            width={981}
            height={405}
            priority
            className="h-8 w-auto object-contain sm:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-9 sm:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="label-text text-off-white/70 transition-opacity duration-200 hover:text-off-white hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "close menu" : "open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 shrink-0 items-center justify-center sm:hidden"
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
            className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col items-center justify-center gap-10 bg-charcoal sm:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.05 * i }}
                className="label-text flex h-11 items-center text-[15px] text-off-white/80"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
