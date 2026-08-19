"use client";

import { useState, type FormEvent } from "react";
import PageHero from "@/components/PageHero";
import PlaceholderImage from "@/components/PlaceholderImage";
import ScrollReveals from "@/components/ScrollReveals";

export default function StorePage() {
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
    <main>
      <PageHero overline="store" title="merch is coming." />

      <section className="relative bg-off-white px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <PlaceholderImage label="coming soon" variant={1} className="aspect-[4/5] w-full" />
          </div>
          <div>
            <div data-reveal className="label-text text-deep-brown/60">
              be the first to know
            </div>
            <h2 className="mt-6 max-w-md text-[28px] font-semibold leading-[1.15] text-charcoal sm:text-[36px]">
              nothing to show yet — but there&rsquo;s more on the way.
            </h2>
            <p data-reveal className="mt-6 max-w-md text-[15px] leading-[1.65] text-deep-brown/70">
              we&rsquo;re working on a small run of merch built around the
              sound. join the list and we&rsquo;ll let you know the moment
              there&rsquo;s something to see.
            </p>

            <form
              onSubmit={handleSubmit}
              data-reveal
              className="mt-9 flex w-full max-w-md items-center gap-3 rounded-sm border border-deep-brown/25 bg-deep-brown/[0.04] py-2 pl-5 pr-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email address"
                aria-label="email address"
                className="min-h-11 flex-1 bg-transparent py-1.5 text-[15px] text-charcoal placeholder:text-deep-brown/40 focus:outline-none"
              />
              <button type="submit" className="btn-solid bg-charcoal text-off-white">
                {subscribed ? "thank you" : "notify me"} &rarr;
              </button>
            </form>
          </div>
        </div>
      </section>

      <ScrollReveals />
    </main>
  );
}
