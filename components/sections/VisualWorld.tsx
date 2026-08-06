import DuotonePhoto from "@/components/DuotonePhoto";

const FEATURE = {
  src: "/images/visual-world-1.jpg",
  label: "worship, all voices",
};

const PORTRAITS = [
  { src: "/images/visual-world-2.jpg", label: "solo, before the set" },
  { src: "/images/visual-world-3.jpg", label: "a quiet moment, backstage" },
  { src: "/images/visual-world-4.jpg", label: "hands on the keys" },
  { src: "/images/visual-world-5.jpg", label: "lifted, mid-song" },
];

function Tile({ src, label }: { src: string; label: string }) {
  return (
    <div data-reveal className="relative h-full w-full overflow-hidden">
      <DuotonePhoto src={src} alt={label} className="h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
      <span className="label-text absolute bottom-4 left-4 text-off-white/80">
        {label}
      </span>
    </div>
  );
}

export default function VisualWorld() {
  return (
    <section id="visuals" className="relative bg-off-white px-6 py-28 sm:px-10 lg:py-36 scroll-mt-16 sm:scroll-mt-[76px]">
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="label-text mb-10 text-deep-brown">
          the visual world
        </div>

        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="relative aspect-[3/2] w-full overflow-hidden">
            <Tile src={FEATURE.src} label={FEATURE.label} />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {PORTRAITS.map((tile) => (
              <div key={tile.src} className="relative aspect-[2/3] overflow-hidden">
                <Tile src={tile.src} label={tile.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
