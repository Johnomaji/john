import type { MetadataRoute } from "next";
import { profile, seo } from "@/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seo.title,
    short_name: profile.name,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f4",
    theme_color: "#b4833a",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
