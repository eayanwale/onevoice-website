import type { Metadata } from "next";
import DuotonePhoto from "@/components/DuotonePhoto";
import PageHero from "@/components/PageHero";
import Invitation from "@/components/sections/Invitation";
import ScrollReveals from "@/components/ScrollReveals";
import { LIGHTROOM_GALLERY_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Gallery — OneVoice",
  description:
    "Photographs from OneVoice rehearsals, sets, and the quiet moments in between.",
};

// No visible captions on this page — the photographs carry themselves. `alt`
// is a plain description of each frame for screen readers, not display copy.
const PHOTOS: { src: string; alt: string; tall: boolean }[] = [
  { src: "/images/visual-world/feature-group-confetti.jpg", alt: "The whole group together under falling confetti", tall: false },
  { src: "/images/visual-world/stage-full-group-lights.jpg", alt: "The full group on stage under coloured lights", tall: true },
  { src: "/images/visual-world/solo-smoke-backdrop.jpg", alt: "A singer alone against a smoke-lit backdrop", tall: true },
  { src: "/images/visual-world/drummer-motion.jpg", alt: "The drummer mid-motion behind the kit", tall: true },
  { src: "/images/visual-world/rehearsal-wide.jpg", alt: "The group rehearsing in an empty hall", tall: false },
  { src: "/images/visual-world/solo-cap-singing.jpg", alt: "A singer in a cap mid-song at the mic", tall: true },
  { src: "/images/visual-world/candid-pew-moment.jpg", alt: "A quiet moment in the pews before the set", tall: true },
  { src: "/images/visual-world/hands-on-keys-detail.jpg", alt: "Hands resting on the keys", tall: false },
  { src: "/images/visual-world/group-singing-warm-venue.jpg", alt: "OneVoice singing together in a warm-lit venue", tall: true },
  { src: "/images/visual-world/solo-vest-window-light.jpg", alt: "A member standing in window light backstage", tall: true },
  { src: "/images/visual-world/candid-back-view.jpg", alt: "A member of OneVoice seen from behind during worship", tall: true },
  { src: "/images/visual-world/hands-on-keys-close.jpg", alt: "Close crop of hands playing the keys", tall: false },
  { src: "/images/visual-world/solo-lyrics-screen.jpg", alt: "A singer reading lyrics from the screen", tall: true },
  { src: "/images/visual-world/conference-performance.jpg", alt: "The group leading worship at a conference", tall: false },
  { src: "/images/visual-world/candid-laptop-huddle.jpg", alt: "Members huddled around a laptop between sets", tall: false },
  { src: "/images/visual-world/solo-dark-portrait.jpg", alt: "A dark portrait of one member before the set", tall: true },
  { src: "/images/visual-world/candid-duo-backstage.jpg", alt: "Two members backstage before going on", tall: true },
];

const PHOTO_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

export default function GalleryPage() {
  return (
    <main>
      <PageHero
        overline="gallery"
        title="our photo dump."
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
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {PHOTOS.map((photo) => (
              <div key={photo.src} data-reveal className="group relative break-inside-avoid overflow-hidden">
                <DuotonePhoto
                  src={photo.src}
                  alt={photo.alt}
                  sizes={PHOTO_SIZES}
                  className={`w-full transition-transform duration-700 ease-brand group-hover:scale-[1.03] ${
                    photo.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                />
              </div>
            ))}
          </div>

          <div data-reveal className="mt-14 flex justify-center">
            <a
              href={LIGHTROOM_GALLERY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid"
            >
              see every photo ↗
            </a>
          </div>
        </div>
      </section>

      <Invitation />

      <ScrollReveals />
    </main>
  );
}
