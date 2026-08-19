import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BookingForm from "@/components/invite/BookingForm";
import ScrollReveals from "@/components/ScrollReveals";

export const metadata: Metadata = {
  title: "Invite One Voice — sing with us",
  description:
    "Invite One Voice to lead worship at your service, worship night, conference, retreat or wedding. Tell us about your gathering and one of us will write back.",
};

export default function InvitePage() {
  return (
    <main>
      <PageHero
        overline="invite us"
        title="tell us about your gathering."
        lead="if you're gathering people to worship, we'd like to be there."
        image="/images/invite-hero.jpg"
        imageAlt="A One Voice keys player at the mic during soundcheck"
        objectPosition="50% 40%"
      />

      <section className="on-bone relative overflow-hidden py-20 sm:py-28">
        <div className="grain" aria-hidden="true" />
        <div className="relative mx-auto max-w-shell px-5 sm:px-8">
          <BookingForm />
        </div>
      </section>

      <ScrollReveals />
    </main>
  );
}
