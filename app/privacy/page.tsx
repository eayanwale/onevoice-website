import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ScrollReveals from "@/components/ScrollReveals";
import { EMAIL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Privacy Policy — OneVoice",
  description:
    "How OneVoice collects, uses, and protects the information you share with us through onev.live.",
};

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "who we are",
    body: (
      <p>
        OneVoice (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) is a gospel music
        collective, and this policy covers the personal information collected through onev.live.
        If you have questions about it, email us at{" "}
        <a href={`mailto:${EMAIL}`} className="underline">
          {EMAIL}
        </a>
        .
      </p>
    ),
  },
  {
    heading: "information we collect",
    body: (
      <>
        <p>We only collect what you choose to give us:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="text-ink">Contact form</span> — name, email address, subject, and
            message, when you write to us.
          </li>
          <li>
            <span className="text-ink">Invite form</span> — name, email, phone, church or
            organization, event details, and message, when you ask us to lead worship at your
            gathering.
          </li>
          <li>
            <span className="text-ink">Email list</span> — your email address, if you join our
            mailing list for new music and updates.
          </li>
        </ul>
        <p>We don&rsquo;t collect payment information — the site doesn&rsquo;t process any at this time.</p>
      </>
    ),
  },
  {
    heading: "cookies and tracking",
    body: (
      <p>
        onev.live doesn&rsquo;t run analytics, advertising, or tracking cookies. We don&rsquo;t
        build a profile of your visit or share browsing data with ad networks. If that ever
        changes — say, to understand which pages people find useful — we&rsquo;ll update this
        policy first and ask for consent where the law requires it.
      </p>
    ),
  },
  {
    heading: "how we use your information",
    body: (
      <>
        <p>We use what you send us to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Reply to your message or invite request</li>
          <li>Coordinate bookings and events</li>
          <li>Send music and ministry updates, only if you&rsquo;ve signed up to receive them</li>
        </ul>
        <p>
          We don&rsquo;t sell your information, and we don&rsquo;t use it for anything beyond
          what you gave it to us for.
        </p>
      </>
    ),
  },
  {
    heading: "who we share it with",
    body: (
      <>
        <p>A few trusted services help us run the site and stay in touch with you:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="text-ink">Resend</span> delivers the emails our forms send and the
            updates you sign up for.
          </li>
          <li>
            <span className="text-ink">Zoho Mail</span> hosts the inbox ({EMAIL}) your messages
            land in.
          </li>
          <li>
            <span className="text-ink">Cloudflare</span> hosts the site itself.
          </li>
        </ul>
        <p>
          None of them use your information for their own purposes — they process it on our
          behalf, under their own privacy and security commitments.
        </p>
      </>
    ),
  },
  {
    heading: "how long we keep it",
    body: (
      <p>
        We keep messages and booking requests as long as we need them to respond and keep a
        record of past bookings. Mailing list addresses are kept until you unsubscribe or ask us
        to remove them.
      </p>
    ),
  },
  {
    heading: "your rights",
    body: (
      <p>
        You can ask us to see, correct, or delete the information we hold on you, or to remove
        you from the mailing list, any time — just email{" "}
        <a href={`mailto:${EMAIL}`} className="underline">
          {EMAIL}
        </a>
        . We&rsquo;ll handle it as quickly as we can.
      </p>
    ),
  },
  {
    heading: "children's privacy",
    body: (
      <p>
        onev.live isn&rsquo;t directed at children, and we don&rsquo;t knowingly collect
        information from anyone under 13. If you believe a child has given us information, let us
        know and we&rsquo;ll remove it.
      </p>
    ),
  },
  {
    heading: "security",
    body: (
      <p>
        We take reasonable steps to protect the information you share with us, but no method of
        transmission or storage online is completely secure, and we can&rsquo;t guarantee
        absolute security.
      </p>
    ),
  },
  {
    heading: "changes to this policy",
    body: (
      <p>
        We may update this policy as the site grows — new features, a merch store, a CMS — and
        we&rsquo;ll update the date above when we do. Significant changes will be noted here.
      </p>
    ),
  },
  {
    heading: "contact",
    body: (
      <p>
        Questions about this policy? Reach us at{" "}
        <a href={`mailto:${EMAIL}`} className="underline">
          {EMAIL}
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        overline="privacy"
        title="privacy policy."
        lead="How we handle the information you share with us — plainly stated, nothing hidden."
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
