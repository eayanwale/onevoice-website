import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BookingForm from "@/components/invite/BookingForm";
import ScrollReveals from "@/components/ScrollReveals";

export const metadata: Metadata = {
  title: "Invite One Voice — booking requests",
  description:
    "Invite One Voice to lead worship at your service, worship night, conference, retreat or wedding. Tell us about the gathering and we'll reply personally.",
};

export default function InvitePage() {
  return (
    <main>
      <PageHero
        overline="invite us"
        title="tell us about the room."
        lead="Services, worship nights, conferences, retreats, weddings, campus gatherings — send us the details and we'll come back to you personally."
        image="/images/visual-world/conference-performance.jpg"
        imageAlt="A One Voice singer leading worship at a conference"
        objectPosition="50% 35%"
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
