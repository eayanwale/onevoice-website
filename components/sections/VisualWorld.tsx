import DuotonePhoto from "@/components/DuotonePhoto";

type Size = "xl" | "wide" | "tall" | "normal";

const SIZE_CLASSES: Record<Size, string> = {
  xl: "col-span-2 row-span-2",
  wide: "col-span-2 row-span-1",
  tall: "row-span-1 sm:row-span-2",
  normal: "",
};

const TILES: { src: string; label: string; size: Size }[] = [
  { src: "/images/visual-world/feature-group-confetti.jpg", label: "the whole room, all ten of us", size: "xl" },
  { src: "/images/visual-world/stage-full-group-lights.jpg", label: "worship, all voices", size: "tall" },
  { src: "/images/visual-world/solo-smoke-backdrop.jpg", label: "solo, before the set", size: "normal" },
  { src: "/images/visual-world/drummer-motion.jpg", label: "keeping time", size: "normal" },
  { src: "/images/visual-world/rehearsal-wide.jpg", label: "rehearsal, before anyone's watching", size: "wide" },
  { src: "/images/visual-world/solo-cap-singing.jpg", label: "lifted, mid-song", size: "normal" },
  { src: "/images/visual-world/candid-pew-moment.jpg", label: "a quiet moment, in the pews", size: "normal" },
  { src: "/images/visual-world/hands-on-keys-detail.jpg", label: "hands on the keys", size: "normal" },
  { src: "/images/visual-world/group-singing-warm-venue.jpg", label: "one mind, one voice", size: "tall" },
  { src: "/images/visual-world/solo-vest-window-light.jpg", label: "a quiet moment, backstage", size: "normal" },
  { src: "/images/visual-world/candid-back-view.jpg", label: "life. jesus. christ.", size: "normal" },
  { src: "/images/visual-world/hands-on-keys-close.jpg", label: "practice, again and again", size: "wide" },
  { src: "/images/visual-world/solo-lyrics-screen.jpg", label: "every word, together", size: "normal" },
  { src: "/images/visual-world/conference-performance.jpg", label: "on the road, still singing", size: "normal" },
  { src: "/images/visual-world/candid-laptop-huddle.jpg", label: "figuring it out together", size: "normal" },
  { src: "/images/visual-world/solo-dark-portrait.jpg", label: "still, before we start", size: "normal" },
  { src: "/images/visual-world/candid-duo-backstage.jpg", label: "before we go on", size: "normal" },
  { src: "/images/visual-world/candid-playful-backdrop.jpg", label: "just us, being us", size: "normal" },
];

const TILE_SIZES =
  "(min-width: 1280px) 560px, (min-width: 640px) 280px, 45vw";

function Tile({ src, label, size }: { src: string; label: string; size: Size }) {
  return (
    <div data-reveal className={`relative overflow-hidden ${SIZE_CLASSES[size]}`}>
      <DuotonePhoto src={src} alt={label} sizes={TILE_SIZES} className="h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-transparent" />
      <span className="label-text absolute bottom-3 left-3 text-off-white/85 sm:bottom-4 sm:left-4">
        {label}
      </span>
    </div>
  );
}

export default function VisualWorld() {
  return (
    <section id="visuals" className="relative bg-off-white px-6 py-28 sm:px-10 lg:py-36 scroll-mt-16 sm:scroll-mt-[76px]">
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="label-text mb-3 text-deep-brown">
          the visual world
        </div>
        <p data-reveal className="mb-10 max-w-md text-[15px] leading-[1.6] text-deep-brown/70">
          a few frames from the last year — rehearsals, sets, and the quiet
          moments in between.
        </p>

        <div className="grid grid-flow-dense grid-cols-2 gap-3 auto-rows-[150px] sm:grid-cols-4 sm:gap-4 sm:auto-rows-[190px] lg:auto-rows-[230px]">
          {TILES.map((tile) => (
            <Tile key={tile.src} {...tile} />
          ))}
        </div>
      </div>
    </section>
  );
}
