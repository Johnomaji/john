import type { Metadata } from "next";
import { profile, seo } from "@/content/profile";
import { alt, size } from "@/app/opengraph-image";

/**
 * A page that sets `openGraph` also loses the image inherited from the root
 * opengraph-image file, so point back at it explicitly. Where a segment has its
 * own opengraph-image file, that file still takes precedence over this.
 */
const ogImage = { url: "/opengraph-image", ...size, alt };

/**
 * Next merges metadata shallowly, so a page that sets `openGraph` or `twitter`
 * replaces the layout's object wholesale. Pages spread these in to keep the
 * site-wide fields while overriding title, description, and url.
 */
export const sharedOpenGraph = {
  type: "profile",
  siteName: profile.name,
  locale: "en_GB",
  images: [ogImage],
} satisfies Metadata["openGraph"];

export const sharedTwitter = {
  card: "summary_large_image",
  images: [ogImage],
  ...(seo.twitterHandle ? { creator: seo.twitterHandle } : {}),
} satisfies Metadata["twitter"];
