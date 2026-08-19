"use client";

import { useState, type FormEvent } from "react";
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
    <section id="connect" className="relative flex flex-col items-center bg-charcoal px-6 py-24 text-center sm:px-10 scroll-mt-16 sm:scroll-mt-[76px]">
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
        className="mb-14 flex w-full max-w-md items-center gap-3 rounded-sm border border-warm-sage/25 bg-off-white/[0.06] py-2 pl-5 pr-2"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email address"
          aria-label="email address"
          className="min-h-11 flex-1 bg-transparent py-1.5 text-[15px] text-off-white placeholder:text-off-white/40 focus:outline-none"
        />
        <button type="submit" className="btn-solid bg-warm-sage text-charcoal">
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

      <div data-reveal className="mb-6 flex flex-wrap justify-center gap-3">
        <a href="#" className="btn-outline border-off-white/20 text-off-white/70 hover:bg-off-white/10">
          instagram
        </a>
        <a href="#" className="btn-outline border-off-white/20 text-off-white/70 hover:bg-off-white/10">
          youtube
        </a>
        <a href="#" className="btn-outline border-off-white/20 text-off-white/70 hover:bg-off-white/10">
          spotify
        </a>
      </div>
    </section>
  );
}
