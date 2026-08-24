import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ScrollReveals from "@/components/ScrollReveals";
import { EMAIL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Terms of Use — OneVoice",
  description: "The basics of using onev.live, kept short on purpose.",
};

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "acceptance",
    body: (
      <p>
        By using onev.live, you agree to these terms. If you don&rsquo;t agree, please
        don&rsquo;t use the site.
      </p>
    ),
  },
  {
    heading: "who we are",
    body: (
      <p>
        OneVoice (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) is a gospel music
        collective. This site shares our music, story, and ways to connect or invite us to lead
        worship.
      </p>
    ),
  },
  {
    heading: "using the site",
    body: (
      <>
        <p>You&rsquo;re welcome to browse, share, and enjoy the site. Please don&rsquo;t:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Attempt to access, scrape, or interfere with the site or its underlying systems in
            ways it isn&rsquo;t intended to be used
          </li>
          <li>
            Use the contact or invite forms to send anything abusive, fraudulent, or unrelated to
            a genuine inquiry
          </li>
          <li>Copy or redistribute our content for commercial purposes without permission</li>
        </ul>
      </>
    ),
  },
  {
    heading: "our content",
    body: (
      <p>
        The music, photography, video, writing, and design on this site belong to OneVoice or are
        used with permission, and are protected by copyright. You&rsquo;re welcome to share links
        and quote us with attribution — reproducing, reselling, or repurposing our content
        without asking first isn&rsquo;t, and that includes screenshots or downloads of our
        photos and video, not just the original files.
      </p>
    ),
  },
  {
    heading: "what you send us",
    body: (
      <p>
        When you submit the contact or invite form, you&rsquo;re confirming the information is
        accurate and that you&rsquo;re comfortable with us using it to respond to you and, where
        relevant, coordinate a booking (see our{" "}
        <a href="/privacy" className="underline">
          privacy policy
        </a>{" "}
        for the details). Don&rsquo;t submit anyone else&rsquo;s personal information without
        their permission.
      </p>
    ),
  },
  {
    heading: "third-party links",
    body: (
      <p>
        This site links out to places like YouTube, Instagram, and Spotify. We don&rsquo;t
        control those platforms and aren&rsquo;t responsible for their content, availability, or
        policies — you&rsquo;re subject to their own terms once you leave onev.live.
      </p>
    ),
  },
  {
    heading: "no warranties",
    body: (
      <p>
        This site and its content are provided as-is. We do our best to keep it accurate and
        running smoothly, but we don&rsquo;t guarantee it will be error-free, uninterrupted, or
        fit for any particular purpose.
      </p>
    ),
  },
  {
    heading: "limitation of liability",
    body: (
      <p>
        To the extent permitted by law, OneVoice isn&rsquo;t liable for any indirect, incidental,
        or consequential damages arising from your use of this site.
      </p>
    ),
  },
  {
    heading: "changes to these terms",
    body: (
      <p>
        We may update these terms as the site grows. Continuing to use the site after a change
        means you accept the updated terms. We&rsquo;ll update the date above whenever that
        happens.
      </p>
    ),
  },
  {
    heading: "contact",
    body: (
      <p>
        Questions about these terms? Reach us at{" "}
        <a href={`mailto:${EMAIL}`} className="underline">
          {EMAIL}
        </a>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <main>
      <PageHero
        overline="terms"
        title="terms of use."
        lead="The basics of using this site, kept short on purpose."
      />

      <section className="on-bone relative overflow-hidden py-20 sm:py-28">
        <div className="grain" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <p data-reveal className="label-text text-muted">
            last updated august 24, 2026
          </p>

          <div className="mt-14 space-y-12">
            {SECTIONS.map((section) => (
              <div key={section.heading} data-reveal className="border-t border-ink/10 pt-8 first:border-0 first:pt-0">
                <h2 className="display-md">{section.heading}</h2>
                <div className="mt-4 space-y-4 leading-relaxed text-muted">{section.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveals />
    </main>
  );
}
