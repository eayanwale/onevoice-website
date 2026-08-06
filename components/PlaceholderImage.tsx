const VARIANTS = [
  "bg-[linear-gradient(155deg,#1A1A1A_0%,#473237_46%,#8a7d68_78%,#BEB7A7_100%)]",
  "bg-[linear-gradient(200deg,#1A1A1A_0%,#3a2c2f_40%,#6f6653_72%,#E8E2D4_100%)]",
  "bg-[linear-gradient(120deg,#1A1A1A_0%,#473237_35%,#7d7156_68%,#BEB7A7_100%)]",
  "bg-[linear-gradient(170deg,#1A1A1A_0%,#3f2f33_50%,#736852_80%,#E8E2D4_100%)]",
] as const;

type PlaceholderImageProps = {
  label: string;
  variant?: 0 | 1 | 2 | 3;
  className?: string;
  /** Marks this layer for the ~0.85x scroll-speed parallax treatment. */
  parallax?: boolean;
};

/**
 * Stand-in for real photography. Keeps the duotone charcoal → sage/bone
 * treatment consistent so swapping in real assets later is a drop-in.
 */
export default function PlaceholderImage({
  label,
  variant = 0,
  className = "",
  parallax = false,
}: PlaceholderImageProps) {
  return (
    <div
      data-parallax={parallax ? "" : undefined}
      className={`relative isolate overflow-hidden ${VARIANTS[variant]} ${className}`}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12] mix-blend-overlay"
        aria-hidden="true"
      >
        <filter id={`grain-${variant}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${variant})`} />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
      <span className="label-text absolute bottom-4 left-4 text-off-white/45">
        {label}
      </span>
    </div>
  );
}
