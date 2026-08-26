import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import Invitation from "@/components/sections/Invitation";
import ScrollReveals from "@/components/ScrollReveals";
import GalleryBrowser from "@/components/gallery/GalleryBrowser";
import { getEvents } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Gallery — OneVoice",
  description:
    "Photographs from OneVoice rehearsals, sets, and the quiet moments in between.",
};

export default async function GalleryPage() {
  const events = await getEvents();

  return (
    <main>
      <PageHero
        overline="gallery"
        title="our gallery."
        lead="Rehearsals, sets, and the quiet moments in between. New images added as we go."
        // wider measure from md up so this sits on a single line; it still
        // wraps normally on phones rather than being forced with nowrap
        leadClassName="max-w-xl md:max-w-3xl"
        image="/images/about-hero.jpg"
        imageAlt="Two members of OneVoice together after a set"
        objectPosition="55% 32%"
      />

      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="mx-auto max-w-shell px-5 sm:px-8">
          <Suspense fallback={null}>
            <GalleryBrowser events={events} />
          </Suspense>
        </div>
      </section>

      <Invitation />

      <ScrollReveals />
    </main>
  );
}
