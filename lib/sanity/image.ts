import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

type SanityImage = {
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number };
};

export function urlForImage(source: SanityImage) {
  return builder.image(source).auto("format").fit("max");
}

/**
 * Converts a Studio-picked hotspot (0-1 fractions) to a CSS object-position
 * percentage, for photos rendered with next/image `fill` + object-cover
 * (DuotonePhoto) rather than a server-side crop.
 */
export function hotspotObjectPosition(image: SanityImage, fallback = "50% 50%") {
  if (!image.hotspot) return fallback;
  return `${Math.round(image.hotspot.x * 100)}% ${Math.round(image.hotspot.y * 100)}%`;
}
