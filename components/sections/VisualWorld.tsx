import Link from "next/link";
import DuotonePhoto from "@/components/DuotonePhoto";

// captions name the event the frame is from. `alt` stays a description of
// the photo — the caption is rendered uppercase as a label and would tell a
// screen-reader user nothing about the image on its own.
const TILES = [
  {
    src: "/images/visual-world/group-singing-warm-venue.jpg",
    label: "OneVoice rehearsal",
    alt: "OneVoice singing together in a warm-lit venue",
  },
  {
    src: "/images/visual-world/stage-full-group-lights.jpg",
    label: "doxa 2025",
    alt: "The full group on stage under coloured lights",
  },
  {
    src: "/images/visual-world/candid-pew-moment.jpg",
    label: "freedomnow 2025",
    alt: "A quiet moment in the pews before the set",
  },
];

export default function VisualWorld() {
  return (
    <section
      id="visuals"
      className="relative overflow-hidden py-24 sm:py-32 scroll-mt-16 sm:scroll-mt-[76px]"
    >
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-lg max-w-md">Gallery.</h2>
          <Link href="/gallery" className="link-label">
            see all ↗
          </Link>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {TILES.map((tile) => (
            <div key={tile.src} data-reveal className="group relative overflow-hidden">
              <DuotonePhoto
                src={tile.src}
                alt={tile.alt}
                sizes="(min-width: 640px) 33vw, 100vw"
                className="aspect-[3/4] w-full transition-transform duration-700 ease-brand group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-transparent" />
              <span className="label-text absolute bottom-4 left-4 text-off-white/85">
                {tile.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
