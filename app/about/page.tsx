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
        overline="est. 2023"
        title="a community of friends, singing with one voice."
        lead="one mind. one voice."
        image="/images/hero-collective.jpg"
        imageAlt="The One Voice collective"
        objectPosition="50% 12%"
      />

      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="mx-auto grid max-w-shell gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div data-reveal>
            <p className="label-text text-warm-sage">romans 15:6</p>
            <blockquote className="display-md mt-6 max-w-sm">
              &ldquo;that with one mind and one voice we may glorify the God
              and Father of our Lord Jesus Christ.&rdquo;
            </blockquote>
          </div>
          <div data-reveal className="space-y-6 leading-relaxed text-muted">
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

      <Values overline="core values" layout="rows" />

      <section className="on-sand relative overflow-hidden py-24 text-center sm:py-32">
        <div className="grain" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl px-5 sm:px-8">
          <h2 data-reveal className="display-lg">
            sing with us.
          </h2>
          <p data-reveal className="mt-5 leading-relaxed text-muted">
            We&rsquo;d love to hear about your gathering.
          </p>
          <Link href="/invite" data-reveal className="btn-solid mt-9">
            invite us ↗
          </Link>
        </div>
      </section>

      <ScrollReveals />
    </main>
  );
}
