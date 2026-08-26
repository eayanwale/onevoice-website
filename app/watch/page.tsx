import type { Metadata } from "next";
import DuotonePhoto from "@/components/DuotonePhoto";
import PageHero from "@/components/PageHero";
import Invitation from "@/components/sections/Invitation";
import ScrollReveals from "@/components/ScrollReveals";
import { YOUTUBE_CHANNEL_URL, isExternal } from "@/lib/links";
import { getAllVideos } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Watch — OneVoice",
  description: "Every set, every session — the full OneVoice YouTube archive.",
};

const THUMB_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

export default async function WatchPage() {
  const videos = await getAllVideos();

  return (
    <main>
      <PageHero
        overline="watch"
        title="every set, every session."
        lead="The full archive — worship nights, rehearsals, and everything in between."
        image="/images/about-hero.jpg"
        imageAlt="OneVoice leading worship"
        objectPosition="55% 32%"
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <a
                key={video.href}
                href={video.href}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                className="group relative block overflow-hidden"
              >
                <DuotonePhoto
                  src={video.image}
                  alt={`OneVoice — ${video.title} ${video.accent}`}
                  sizes={THUMB_SIZES}
                  objectPosition={video.objectPosition}
                  className="aspect-video w-full transition-transform duration-700 ease-brand group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
                  <h3 className="display-md text-off-white">
                    {video.title} <span className="accent-word text-warm-sage">{video.accent}</span>
                  </h3>
                  {video.duration ? (
                    <span className="label-text mt-2 block text-off-white/60">
                      {video.duration}
                    </span>
                  ) : null}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Invitation />

      <ScrollReveals />
    </main>
  );
}
