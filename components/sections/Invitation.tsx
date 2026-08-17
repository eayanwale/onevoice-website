"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Invitation() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3200);
  };

  return (
    <section id="connect" className="signature-gradient relative flex flex-col items-center px-6 py-24 text-center sm:px-10 scroll-mt-16 sm:scroll-mt-[76px]">
      <div data-reveal className="mb-9 h-14 w-px bg-warm-sage" />
      <h2
        data-reveal
        className="mb-12 max-w-2xl text-[28px] font-semibold leading-[1.15] text-off-white sm:text-[42px] lg:text-[52px]"
      >
        come <span className="accent-word text-warm-sage">walk</span> with
        us.
      </h2>

      <form
        onSubmit={handleSubmit}
        data-reveal
        className="mb-14 flex w-full max-w-md items-center gap-3 rounded-full border border-warm-sage/25 bg-off-white/[0.06] py-2 pl-5 pr-2"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email address"
          aria-label="email address"
          className="min-h-11 flex-1 bg-transparent py-1.5 text-[15px] text-off-white placeholder:text-off-white/40 focus:outline-none"
        />
        <button
          type="submit"
          className="flex min-h-11 items-center gap-2 rounded-full bg-warm-sage px-5 py-2.5 font-display text-sm font-semibold text-charcoal transition-opacity duration-200 hover:opacity-80"
        >
          {subscribed ? "thank you" : "subscribe"} &rarr;
        </button>
      </form>

      <Link
        href="/connect"
        data-reveal
        className="mb-10 inline-flex items-center gap-2 text-[14px] font-semibold text-warm-sage transition-opacity duration-200 hover:opacity-70"
      >
        want us there? tell us about your event &rarr;
      </Link>

      <div data-reveal className="mb-24 flex gap-7">
        <a href="#" className="text-[13.5px] tracking-wide text-off-white/50 transition-opacity duration-200 hover:opacity-70">
          instagram
        </a>
        <a href="#" className="text-[13.5px] tracking-wide text-off-white/50 transition-opacity duration-200 hover:opacity-70">
          youtube
        </a>
        <a href="#" className="text-[13.5px] tracking-wide text-off-white/50 transition-opacity duration-200 hover:opacity-70">
          spotify
        </a>
      </div>

      <div className="flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-warm-sage/20 pt-7">
        <Image
          src="/logo/one-voice-lockup-light-trimmed.png"
          alt="One Voice — est. 2023, USA"
          width={981}
          height={405}
          className="h-6 w-auto object-contain"
        />
        <span className="text-xs tracking-wide text-off-white/40">
          &copy; 2026 one voice. all rights reserved.
        </span>
        <span className="text-xs tracking-wide text-off-white/40">
          one mind. one voice.
        </span>
      </div>
    </section>
  );
}
