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
};

const DUOTONE_FILTER =
  "sepia(0.4) saturate(1.15) hue-rotate(-8deg) brightness(0.9) contrast(1.05)";

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
}: DuotonePhotoProps) {
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
        className="object-cover"
        style={{ filter, objectPosition }}
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
