import type { Metadata } from "next";
import DuotonePhoto from "@/components/DuotonePhoto";
import PageHero from "@/components/PageHero";
import ScrollReveals from "@/components/ScrollReveals";

export const metadata: Metadata = {
  title: "Gallery — One Voice",
  description:
    "Photographs from One Voice rehearsals, sets, and the quiet moments in between.",
};

const PHOTOS: { src: string; label: string; tall: boolean }[] = [
  { src: "/images/visual-world/feature-group-confetti.jpg", label: "the whole room, all ten of us", tall: false },
  { src: "/images/visual-world/stage-full-group-lights.jpg", label: "worship, all voices", tall: true },
  { src: "/images/visual-world/solo-smoke-backdrop.jpg", label: "solo, before the set", tall: true },
  { src: "/images/visual-world/drummer-motion.jpg", label: "keeping time", tall: true },
  { src: "/images/visual-world/rehearsal-wide.jpg", label: "rehearsal, before anyone's watching", tall: false },
  { src: "/images/visual-world/solo-cap-singing.jpg", label: "lifted, mid-song", tall: true },
  { src: "/images/visual-world/candid-pew-moment.jpg", label: "a quiet moment, in the pews", tall: true },
  { src: "/images/visual-world/hands-on-keys-detail.jpg", label: "hands on the keys", tall: false },
  { src: "/images/visual-world/group-singing-warm-venue.jpg", label: "one mind, one voice", tall: true },
  { src: "/images/visual-world/solo-vest-window-light.jpg", label: "a quiet moment, backstage", tall: true },
  { src: "/images/visual-world/candid-back-view.jpg", label: "life. jesus. christ.", tall: true },
  { src: "/images/visual-world/hands-on-keys-close.jpg", label: "practice, again and again", tall: false },
  { src: "/images/visual-world/solo-lyrics-screen.jpg", label: "every word, together", tall: true },
  { src: "/images/visual-world/conference-performance.jpg", label: "on the road, still singing", tall: false },
  { src: "/images/visual-world/candid-laptop-huddle.jpg", label: "figuring it out together", tall: false },
  { src: "/images/visual-world/solo-dark-portrait.jpg", label: "still, before we start", tall: true },
  { src: "/images/visual-world/candid-duo-backstage.jpg", label: "before we go on", tall: true },
];

const PHOTO_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

export default function GalleryPage() {
  return (
    <main>
      <PageHero
        overline="gallery"
        title="moments from the room."
        lead="Rehearsals, sets, and the quiet moments in between. New frames added as we go."
        image="/images/visual-world/group-singing-warm-venue.jpg"
        imageAlt="One Voice leading worship in a warm-lit venue"
        objectPosition="50% 30%"
      />

      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="mx-auto max-w-shell px-5 sm:px-8">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {PHOTOS.map((photo) => (
              <div key={photo.src} data-reveal className="group relative break-inside-avoid overflow-hidden">
                <DuotonePhoto
                  src={photo.src}
                  alt={photo.label}
                  sizes={PHOTO_SIZES}
                  className={`w-full transition-transform duration-700 ease-brand group-hover:scale-[1.03] ${
                    photo.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                <span className="label-text absolute bottom-3 left-3 text-off-white/85">
                  {photo.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveals />
    </main>
  );
}
