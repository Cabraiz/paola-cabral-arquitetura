import type { MetadataRoute } from "next";

const siteUrl = "https://cabraiz.github.io/paola-cabral-arquitetura";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date("2026-09-08"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
