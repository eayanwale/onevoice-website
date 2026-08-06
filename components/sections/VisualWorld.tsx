import DuotonePhoto from "@/components/DuotonePhoto";

const TILES = [
  {
    src: "/images/visual-world-1.jpg",
    label: "worship, all voices",
    span: "col-span-6 row-span-4 sm:col-span-4",
    objectPosition: "50% 30%",
  },
  {
    src: "/images/visual-world-2.jpg",
    label: "solo, before the set",
    span: "col-span-3 row-span-2 sm:col-span-2",
    objectPosition: "50% 25%",
  },
  {
    src: "/images/visual-world-3.jpg",
    label: "a quiet moment, backstage",
    span: "col-span-3 row-span-2 sm:col-span-2",
    objectPosition: "50% 20%",
  },
  {
    src: "/images/visual-world-4.jpg",
    label: "hands on the keys",
    span: "col-span-2 row-span-3 sm:col-span-2",
    objectPosition: "50% 30%",
  },
  {
    src: "/images/visual-world-5.jpg",
    label: "lifted, mid-song",
    span: "col-span-4 row-span-3 sm:col-span-4",
    objectPosition: "50% 15%",
  },
];

export default function VisualWorld() {
  return (
    <section id="visuals" className="relative bg-off-white px-6 py-28 sm:px-10 lg:py-36 scroll-mt-16 sm:scroll-mt-[76px]">
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="label-text mb-10 text-deep-brown">
          the visual world
        </div>

        <div className="grid auto-rows-[110px] grid-cols-6 gap-4 sm:auto-rows-[130px] sm:gap-5">
          {TILES.map((tile) => (
            <div key={tile.src} data-reveal className={`relative ${tile.span}`}>
              <DuotonePhoto
                src={tile.src}
                alt={tile.label}
                objectPosition={tile.objectPosition}
                className="h-full w-full"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
              <span className="label-text absolute bottom-4 left-4 text-off-white/80">
                {tile.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
