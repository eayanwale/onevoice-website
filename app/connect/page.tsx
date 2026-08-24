import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/connect/ContactForm";
import ScrollReveals from "@/components/ScrollReveals";

export const metadata: Metadata = {
  title: "Connect — OneVoice",
  description:
    "Say hello, ask a question, or follow along. Message OneVoice directly or join the email list for new music and worship nights.",
};

export default function ConnectPage() {
  return (
    <main>
      <PageHero
        overline="connect"
        title="say hello."
        lead="Questions, encouragement, collaborations, or just to tell us we sang your favorite gospel song — this reaches all of us."
        image="/images/connect-hero.jpg"
        imageAlt="Three members of OneVoice sitting together in the pews, one laughing over a shared phone"
        // biased right of centre so the faces stay clear of the headline,
        // which sits bottom-left over the photo
        objectPosition="56% 46%"
      />

      <section className="relative overflow-hidden py-24 sm:py-32">
        <ContactForm />
      </section>

      <ScrollReveals />
    </main>
  );
}
