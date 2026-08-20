import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Voices from "@/components/sections/Voices";
import Invitation from "@/components/sections/Invitation";
import ScrollReveals from "@/components/ScrollReveals";

export const metadata: Metadata = {
  title: "About — OneVoice",
  description:
    "Established in 2023, OneVoice is a community of friends creating space for reverent, honest worship that reflects the love of God and demonstrates the comfort of His presence to all people.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        overline="est. 2023"
        title="a community of friends, singing with one voice."
        image="/images/visual-world/group-singing-warm-venue.jpg"
        imageAlt="OneVoice leading worship in a warm-lit venue"
        objectPosition="50% 30%"
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
              Established in 2023, we&rsquo;re a community of friends united
              under one purpose as explicitly defined in Romans 15:6. Our
              desire is to create a space for reverent and honest worship
              that reflects the love of God and demonstrates the comfort of
              His presence to all people. Through faith, fellowship, and
              friendship, we hope to inspire others to grow in community and
              experience the joy of walking alongside one another in faith.
            </p>
            <p>
              OneVoice started simply as friends who love to sing together
              because of our shared love of God and music. What started as a
              humble call to share what we love with others became something
              truly only God could have created. Today, we lead worship at
              churches, conferences, and gatherings, always with the same
              heart posture; one mind, one voice, glorifying God.
            </p>
          </div>
        </div>
      </section>

      <Voices />

      <Invitation />

      <ScrollReveals />
    </main>
  );
}
