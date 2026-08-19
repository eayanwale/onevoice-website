import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Values from "@/components/sections/Values";
import ScrollReveals from "@/components/ScrollReveals";

export const metadata: Metadata = {
  title: "About — One Voice",
  description:
    "Established in 2023, One Voice is about ten friends united by one purpose: that with one mind and one voice, we might glorify God.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        overline="our story"
        title="a community of friends, singing with one voice."
        lead="Three friends' worth of honesty, about ten voices strong."
        image="/images/hero-collective.jpg"
        objectPosition="50% 12%"
      />

      <section className="relative bg-off-white px-6 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div data-reveal>
            <p className="label-text text-deep-brown/60">romans 15:6</p>
            <blockquote className="mt-6 max-w-sm text-[24px] font-semibold leading-[1.25] text-charcoal">
              &ldquo;that with one mind and one voice we may glorify the God
              and Father of our Lord Jesus Christ.&rdquo;
            </blockquote>
          </div>
          <div data-reveal className="space-y-6 text-[16px] leading-[1.7] text-deep-brown/80">
            <p>
              established in 2023, we&rsquo;re about ten friends united by
              one purpose: that with one mind and one voice, we might
              glorify God. rooted in Christ, we lead worship at churches
              and events, wherever we&rsquo;re asked — through faith,
              fellowship, and friendship.
            </p>
            <p>
              it started simply — friends singing together because they
              wanted to, then finding that other rooms needed the same
              thing. since then, we&rsquo;ve led worship at churches,
              conferences, and gatherings, always with the same posture:
              keep it honest, keep it reverent, keep the room in it.
            </p>
          </div>
        </div>
      </section>

      <Values />

      <section className="relative flex flex-col items-center bg-charcoal px-6 py-24 text-center sm:px-10">
        <div data-reveal className="mb-9 h-14 w-px bg-warm-sage" />
        <h2
          data-reveal
          className="mb-8 max-w-xl text-[28px] font-semibold leading-[1.15] text-off-white sm:text-[38px]"
        >
          sing with us.
        </h2>
        <Link href="/connect" data-reveal className="btn-solid bg-warm-sage text-charcoal">
          invite us &rarr;
        </Link>
      </section>

      <ScrollReveals />
    </main>
  );
}
