import Image from "next/image";

type DuotonePhotoProps = {
  src: string;
  alt: string;
  className?: string;
  /** Marks this layer for the ~0.85x scroll-speed parallax treatment. */
  parallax?: boolean;
  priority?: boolean;
  sizes?: string;
  /** CSS object-position for the cover crop, e.g. "50% 15%" to favor the top of the frame. */
  objectPosition?: string;
  /** Override the duotone grade — e.g. a darker one behind hero text. */
  filter?: string;
  /**
   * Grade to cross-fade to when a parent `.group` is hovered — pass an
   * identity filter to reveal the untreated photograph. List the same
   * functions in the same order as `filter` so the two interpolate.
   */
  hoverFilter?: string;
};

const DUOTONE_FILTER =
  "sepia(0.4) saturate(1.15) hue-rotate(-8deg) brightness(0.9) contrast(1.05)";

/**
 * Shared grade for the full-bleed hero photography on every route. Warmer and
 * a stop deeper than the section duotone above: heroes are shot in wildly
 * different rooms (daylit studio, blue-lit sanctuary, warm venue) and this is
 * what makes them read as one roll of film instead of five sources. Each hero
 * lays its own charcoal gradient over the top for text contrast, so this only
 * has to handle colour, not legibility.
 */
export const HERO_FILTER =
  "sepia(0.48) saturate(1.08) hue-rotate(-10deg) brightness(0.82) contrast(1.07)";

/**
 * Real photography, treated to match the charcoal-shadow / sage-bone-highlight
 * duotone used across the placeholder imagery.
 */
export default function DuotonePhoto({
  src,
  alt,
  className = "",
  parallax = false,
  priority = false,
  sizes = "100vw",
  objectPosition = "50% 50%",
  filter = DUOTONE_FILTER,
  hoverFilter,
}: DuotonePhotoProps) {
  // The grade rides on a custom property rather than an inline `filter`, so a
  // group-hover class can swap it — an inline style would outrank the class.
  const style = hoverFilter
    ? ({
        objectPosition,
        "--photo-filter": filter,
        "--photo-filter-hover": hoverFilter,
      } as React.CSSProperties)
    : { filter, objectPosition };

  return (
    <div
      data-parallax={parallax ? "" : undefined}
      className={`relative isolate overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${
          hoverFilter
            ? "[filter:var(--photo-filter)] transition-[filter] duration-500 ease-brand group-hover:[filter:var(--photo-filter-hover)]"
            : ""
        }`}
        style={style}
      />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.1] mix-blend-overlay"
        aria-hidden="true"
      >
        <filter id="photo-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#photo-grain)" />
      </svg>
    </div>
  );
}
