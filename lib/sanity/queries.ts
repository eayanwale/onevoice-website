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

const GALLERY_PHOTOS_QUERY = defineQuery(`
  *[_type == "galleryPhoto"] | order(order asc) {
    image,
    alt,
    orientation
  }
`);

type RawGalleryPhoto = { image: RawImage; alt: string; orientation: "tall" | "wide" };

export type GalleryPhoto = { src: string; alt: string; tall: boolean };

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const photos = await client.fetch<RawGalleryPhoto[]>(GALLERY_PHOTOS_QUERY, {}, FETCH_OPTIONS);
  return photos.map((photo) => ({
    src: urlForImage(photo.image).width(1400).url(),
    alt: photo.alt,
    tall: photo.orientation === "tall",
  }));
}

const FEATURED_GALLERY_PHOTOS_QUERY = defineQuery(`
  *[_type == "galleryPhoto" && featuredOnHome == true] | order(featuredOrder asc) {
    image,
    alt,
    eventLabel
  }
`);

type RawFeaturedPhoto = { image: RawImage; alt: string; eventLabel: string };

export type GalleryTile = { src: string; label: string; alt: string };

export async function getFeaturedGalleryPhotos(): Promise<GalleryTile[]> {
  const photos = await client.fetch<RawFeaturedPhoto[]>(
    FEATURED_GALLERY_PHOTOS_QUERY,
    {},
    FETCH_OPTIONS
  );
  return photos.map((photo) => ({
    src: urlForImage(photo.image).width(1000).url(),
    label: photo.eventLabel,
    alt: photo.alt,
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
