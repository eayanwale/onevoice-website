// Single source of truth for every outbound link. These were previously
// duplicated across Header, SiteFooter, ContactForm and LatestWork, which is
// how some of them drifted to "#".

/** The Lift Our Voices 2026 set — the "watch" button points here. */
export const YOUTUBE_VIDEO_URL = "https://youtu.be/MdD71CNCSEw";

/** OneVoice's own channel — the primary "youtube" social link points here. */
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@OneVoiceLive";

/** The Lift Our Voices channel — older archive videos live here, linked from the watch page's LOV tab. */
export const LOV_YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@LiftOurVoicesUSA";

export const INSTAGRAM_URL = "https://www.instagram.com/onevo1ce_/";

/** Nothing on Spotify yet, so this lands on the placeholder page. */
export const SPOTIFY_URL = "/coming-soon";

export const EMAIL = "hello@onev.live";

export type Platform = "instagram" | "youtube" | "spotify";

/**
 * Display names for the platforms. `Platform` itself doubles as a SocialIcon
 * lookup key and a React key, so it has to stay lowercase — capitalise here.
 */
export const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  spotify: "Spotify",
};

export const SOCIAL_LINKS: { platform: Platform; href: string }[] = [
  { platform: "instagram", href: INSTAGRAM_URL },
  { platform: "youtube", href: YOUTUBE_CHANNEL_URL },
  { platform: "spotify", href: SPOTIFY_URL },
];

/** Spotify is an internal route, so it must not get target/rel treatment. */
export const isExternal = (href: string) => href.startsWith("http");
