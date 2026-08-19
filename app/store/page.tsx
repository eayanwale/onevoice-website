import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import EmailSignup from "@/components/EmailSignup";
import Invitation from "@/components/sections/Invitation";
import ScrollReveals from "@/components/ScrollReveals";

export const metadata: Metadata = {
  title: "Store — One Voice",
  description:
    "Merch is on the way. Join the list and we'll let you know the moment there's something to see.",
};

export default function StorePage() {
  return (
    <main>
      <PageHero
        overline="store"
        title="merch is coming."
        lead="Nothing to show yet — but we're working on it."
      />

      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="mx-auto grid max-w-shell items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div data-reveal className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/merch-teaser.jpg"
              alt="A minimal dark hoodie folded on a linen surface"
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
            <span className="label-text absolute bottom-4 left-4 text-off-white/85">
              coming soon
            </span>
          </div>

          <div>
            <p data-reveal className="label-text text-warm-sage">
              soon
            </p>
            <h2 data-reveal className="display-lg mt-6 max-w-md">
              worth the wait, we hope.
            </h2>
            <p data-reveal className="mt-6 max-w-md leading-relaxed text-muted">
              we&rsquo;re working on a small run of pieces built around the
              sound — nothing loud, nothing disposable. join the list and
              we&rsquo;ll let you know the moment there&rsquo;s something to see.
            </p>
            <div data-reveal className="mt-8 max-w-md">
              <EmailSignup label="notify me" />
            </div>
          </div>
        </div>
      </section>

      <Invitation />

      <ScrollReveals />
    </main>
  );
}
