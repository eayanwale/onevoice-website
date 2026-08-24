import Link from "next/link";
import DuotonePhoto from "@/components/DuotonePhoto";
import type { GalleryTile } from "@/lib/sanity/queries";

export default function VisualWorld({ tiles }: { tiles: GalleryTile[] }) {
  return (
    <section
      id="visuals"
      className="relative overflow-hidden py-24 sm:py-32 scroll-mt-16 sm:scroll-mt-[76px]"
    >
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-lg max-w-md">gallery.</h2>
          <Link href="/gallery" className="link-label">
            see all ↗
          </Link>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {tiles.map((tile) => (
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
