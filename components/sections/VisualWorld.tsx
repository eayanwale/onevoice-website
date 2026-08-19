import Link from "next/link";
import DuotonePhoto from "@/components/DuotonePhoto";

const TILES = [
  {
    src: "/images/visual-world/group-singing-warm-venue.jpg",
    label: "one mind, one voice",
  },
  {
    src: "/images/visual-world/stage-full-group-lights.jpg",
    label: "worship, all voices",
  },
  {
    src: "/images/visual-world/candid-pew-moment.jpg",
    label: "a quiet moment, in the pews",
  },
];

export default function VisualWorld() {
  return (
    <section
      id="visuals"
      className="relative overflow-hidden pb-24 sm:pb-32 scroll-mt-16 sm:scroll-mt-[76px]"
    >
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-lg max-w-md">moments from the room.</h2>
          <Link href="/gallery" className="link-label">
            full gallery ↗
          </Link>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {TILES.map((tile) => (
            <div key={tile.src} data-reveal className="group relative overflow-hidden">
              <DuotonePhoto
                src={tile.src}
                alt={tile.label}
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
