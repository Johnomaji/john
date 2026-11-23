import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: profile.siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${profile.siteUrl}/cv`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
