import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/connect/ContactForm";
import ScrollReveals from "@/components/ScrollReveals";

export const metadata: Metadata = {
  title: "Connect — One Voice",
  description:
    "Say hello, ask a question, or follow along. Message One Voice directly or join the email list for new music and worship nights.",
};

export default function ConnectPage() {
  return (
    <main>
      <PageHero
        overline="connect"
        title="say hello."
        lead="Questions, encouragement, collaborations, or just to tell us a song landed — this reaches all of us."
        image="/images/grass.jpg"
        imageAlt="Backlit grass at golden hour"
      />

      <section className="relative overflow-hidden py-24 sm:py-32">
        <ContactForm />
      </section>

      <ScrollReveals />
    </main>
  );
}
