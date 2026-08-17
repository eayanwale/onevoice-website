import type { Metadata } from "next";
import Link from "next/link";
import CoreValues from "@/components/about/CoreValues";
import MemberCarousel from "@/components/about/MemberCarousel";
import ScrollReveals from "@/components/ScrollReveals";

export const metadata: Metadata = {
  title: "About — One Voice",
  description:
    "One Voice is a community of friends united by one purpose: that with one mind and one voice we might glorify God.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="relative flex min-h-screen flex-col justify-center bg-bone px-6 pb-24 pt-32 sm:px-10 sm:pt-40">
        <div className="mx-auto w-full max-w-3xl">
          <div data-reveal className="label-text mb-6 text-deep-brown">
            about
          </div>
          <h1
            data-reveal
            className="mb-8 max-w-2xl text-[34px] font-semibold leading-[1.1] text-charcoal sm:text-[52px] lg:text-[60px]"
          >
            friends first.{" "}
            <span className="accent-word text-deep-brown">worship</span>{" "}
            because of it.
          </h1>
          <p
            data-reveal
            className="max-w-xl text-[17px] leading-[1.7] text-deep-brown/90"
          >
            established in 2023, one voice is a community of friends
            united by one purpose: that with one mind and one voice we
            might glorify the God and Father of our Lord Jesus Christ
            (romans 15:6). rooted in Christ, we seek to create a space
            for reverent and honest worship that reflects the love of
            the Lord and welcomes all generations into His presence.
            through faith, fellowship, and friendship, we hope to
            inspire others to grow in community and experience the joy
            of walking alongside one another in faith.
          </p>
        </div>
      </section>

      <CoreValues />
      <MemberCarousel />

      <section className="relative flex flex-col items-center bg-gradient-to-b from-charcoal to-deep-brown px-6 py-24 text-center sm:px-10">
        <div data-reveal className="mb-8 h-14 w-px bg-warm-sage" />
        <h2
          data-reveal
          className="mb-8 max-w-xl text-[26px] font-semibold leading-[1.2] text-off-white sm:text-[38px]"
        >
          come <span className="accent-word text-warm-sage">walk</span> with
          us.
        </h2>
        <Link
          href="/connect"
          data-reveal
          className="label-text inline-flex items-center gap-2 rounded-full bg-warm-sage px-7 py-3.5 text-charcoal transition-opacity duration-200 hover:opacity-80"
        >
          get in touch &rarr;
        </Link>
      </section>

      <ScrollReveals />
    </main>
  );
}
