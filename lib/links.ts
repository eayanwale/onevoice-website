// Single source of truth for every outbound link. These were previously
// duplicated across Header, SiteFooter, ContactForm and LatestWork, which is
// how some of them drifted to "#".

/** The Lift Our Voices 2026 set — the "watch" button points here. */
export const YOUTUBE_VIDEO_URL = "https://youtu.be/MdD71CNCSEw";

/** The channel itself — the "youtube" social link points here. */
// TODO: replace with the real channel URL.
export const YOUTUBE_CHANNEL_URL = "#";

// TODO: replace with the real profile URL.
export const INSTAGRAM_URL = "#";

/** Nothing on Spotify yet, so this lands on the placeholder page. */
export const SPOTIFY_URL = "/coming-soon";

export const EMAIL = "hello@onev.live";

/** The full photo archive, hosted on Adobe Lightroom. */
export const LIGHTROOM_GALLERY_URL =
  "https://lightroom.adobe.com/shares/727641021348473a88974458e47980f9";

export type Platform = "instagram" | "youtube" | "spotify";

export const SOCIAL_LINKS: { platform: Platform; href: string }[] = [
  { platform: "instagram", href: INSTAGRAM_URL },
  { platform: "youtube", href: YOUTUBE_CHANNEL_URL },
  { platform: "spotify", href: SPOTIFY_URL },
];

/** Spotify is an internal route, so it must not get target/rel treatment. */
export const isExternal = (href: string) => href.startsWith("http");
