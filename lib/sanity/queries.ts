import { defineQuery } from "next-sanity";
import { client } from "./client";
import { hotspotObjectPosition, urlForImage } from "./image";

// Published-content only, 1-hour revalidation — this is roster/gallery
// content that changes rarely, not something that needs live/draft preview.
const FETCH_OPTIONS = { next: { revalidate: 3600 } };

type RawImage = {
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number };
};

const MEMBERS_QUERY = defineQuery(`
  *[_type == "member"] | order(order asc) {
    name,
    role,
    tagline,
    bio,
    photo
  }
`);

type RawMember = {
  name: string;
  role?: string;
  tagline?: string;
  bio?: string;
  photo: RawImage;
};

export type Voice = {
  name: string;
  role?: string;
  tagline?: string;
  bio?: string;
  photo: string;
  objectPosition?: string;
};

export async function getMembers(): Promise<Voice[]> {
  const members = await client.fetch<RawMember[]>(MEMBERS_QUERY, {}, FETCH_OPTIONS);
  return members.map((member) => ({
    name: member.name,
    role: member.role,
    tagline: member.tagline,
    bio: member.bio,
    photo: urlForImage(member.photo).width(900).url(),
    objectPosition: member.photo.hotspot ? hotspotObjectPosition(member.photo) : undefined,
  }));
}

const EVENTS_QUERY = defineQuery(`
  *[_type == "event"] | order(year asc, order asc) {
    name,
    "slug": slug.current,
    year
  }
`);

type RawEvent = { name: string; slug: string; year?: number };

export type GalleryEvent = { name: string; slug: string; year?: number };

export async function getEvents(): Promise<GalleryEvent[]> {
  const events = await client.fetch<RawEvent[]>(EVENTS_QUERY, {}, FETCH_OPTIONS);
  return events.map((event) => ({
    name: event.name,
    slug: event.slug,
    year: event.year,
  }));
}

const GALLERY_PHOTOS_QUERY = defineQuery(`
  *[_type == "galleryPhoto"] | order(order asc) {
    image,
    alt,
    orientation,
    "eventSlug": event->slug.current
  }
`);

type RawGalleryPhoto = {
  image: RawImage;
  alt: string;
  orientation: "tall" | "wide";
  eventSlug: string;
};

export type GalleryPhoto = { src: string; alt: string; tall: boolean; eventSlug: string };

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const photos = await client.fetch<RawGalleryPhoto[]>(GALLERY_PHOTOS_QUERY, {}, FETCH_OPTIONS);
  return photos.map((photo) => ({
    src: urlForImage(photo.image).width(1400).url(),
    alt: photo.alt,
    tall: photo.orientation === "tall",
    eventSlug: photo.eventSlug,
  }));
}

const FEATURED_EVENTS_QUERY = defineQuery(`
  *[_type == "event" && featuredOnHome == true] | order(featuredOrder asc) {
    name,
    "slug": slug.current,
    coverImage
  }
`);

type RawFeaturedEvent = { name: string; slug: string; coverImage: RawImage };

export type GalleryTile = { src: string; label: string; alt: string; slug: string };

export async function getFeaturedEvents(): Promise<GalleryTile[]> {
  const events = await client.fetch<RawFeaturedEvent[]>(FEATURED_EVENTS_QUERY, {}, FETCH_OPTIONS);
  return events.map((event) => ({
    src: urlForImage(event.coverImage).width(1200).url(),
    label: event.name,
    alt: `OneVoice at ${event.name}`,
    slug: event.slug,
  }));
}

// Most recent 5, newest first.
const VIDEOS_QUERY = defineQuery(`
  *[_type == "video"] | order(publishedAt desc) [0...5] {
    title,
    accent,
    credit,
    youtubeUrl,
    duration,
    thumbnail
  }
`);

type RawVideo = {
  title: string;
  accent: string;
  credit?: string;
  youtubeUrl: string;
  duration?: string;
  thumbnail: RawImage;
};

export type VideoSlide = {
  title: string;
  accent: string;
  credit?: string;
  href: string;
  duration?: string;
  image: string;
  objectPosition: string;
};

export async function getVideos(): Promise<VideoSlide[]> {
  const videos = await client.fetch<RawVideo[]>(VIDEOS_QUERY, {}, FETCH_OPTIONS);
  return videos.map((video) => ({
    title: video.title,
    accent: video.accent,
    credit: video.credit,
    href: video.youtubeUrl,
    duration: video.duration,
    // Full-bleed background, not a card thumbnail — needs more source
    // resolution than the 1920 used elsewhere or it visibly softens/blurs
    // on wide or high-DPI viewports.
    image: urlForImage(video.thumbnail).width(2400).url(),
    objectPosition: video.thumbnail.hotspot
      ? hotspotObjectPosition(video.thumbnail)
      : "50% 50%",
  }));
}
