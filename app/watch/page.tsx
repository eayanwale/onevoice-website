import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import Invitation from "@/components/sections/Invitation";
import ScrollReveals from "@/components/ScrollReveals";
import WatchBrowser from "@/components/watch/WatchBrowser";
import { YOUTUBE_CHANNEL_URL, isExternal } from "@/lib/links";
import { getAllVideos } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Watch — OneVoice",
  description: "Every set, every session — the full OneVoice YouTube archive.",
};

export default async function WatchPage() {
  const videos = await getAllVideos();

  return (
    <main>
      <PageHero
        overline="watch"
        title="every set, every session."
        lead="The full archive — worship nights, rehearsals, and everything in between."
        image="/images/watch-hero.jpg"
        imageAlt="OneVoice rehearsing on stage, lyrics on the screens behind them"
        objectPosition="50% 40%"
      >
        {isExternal(YOUTUBE_CHANNEL_URL) ? (
          <a
            data-reveal
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid mt-9"
          >
            visit our channel ↗
          </a>
        ) : null}
      </PageHero>

      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="mx-auto max-w-shell px-5 sm:px-8">
          <Suspense fallback={null}>
            <WatchBrowser videos={videos} />
          </Suspense>
        </div>
      </section>

      <Invitation />

      <ScrollReveals />
    </main>
  );
}
