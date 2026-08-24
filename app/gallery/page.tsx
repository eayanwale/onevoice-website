import type { Metadata } from "next";
import DuotonePhoto from "@/components/DuotonePhoto";
import PageHero from "@/components/PageHero";
import Invitation from "@/components/sections/Invitation";
import ScrollReveals from "@/components/ScrollReveals";
import { LIGHTROOM_GALLERY_URL } from "@/lib/links";
import { getGalleryPhotos } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Gallery — OneVoice",
  description:
    "Photographs from OneVoice rehearsals, sets, and the quiet moments in between.",
};

const PHOTO_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

export default async function GalleryPage() {
  const photos = await getGalleryPhotos();

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
            {photos.map((photo) => (
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
