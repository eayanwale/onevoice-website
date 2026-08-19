type Platform = "instagram" | "youtube" | "spotify";

/**
 * Inline brand glyphs — drawn here rather than pulled from an icon package
 * so the footer doesn't add a dependency for three marks.
 */
const PATHS: Record<Platform, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <path d="M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.7-1.8C18.3 5 12 5 12 5s-6.3 0-7.9.5a2.5 2.5 0 0 0-1.7 1.8C2 8.8 2 12 2 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.7 1.8C5.7 19 12 19 12 19s6.3 0 7.9-.5a2.5 2.5 0 0 0 1.7-1.8C22 15.2 22 12 22 12Z" />
      <path d="M10.2 15.1 15.3 12l-5.1-3.1v6.2Z" fill="currentColor" stroke="none" />
    </>
  ),
  spotify: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M7.4 9.6c3-.8 6.4-.5 9.1 1" />
      <path d="M8.1 12.6c2.5-.6 5.2-.3 7.4.9" />
      <path d="M8.8 15.5c2-.4 4.1-.2 5.9.8" />
    </>
  ),
};

export default function SocialIcon({
  platform,
  className = "size-4",
}: {
  platform: Platform;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[platform]}
    </svg>
  );
}

export type { Platform };
