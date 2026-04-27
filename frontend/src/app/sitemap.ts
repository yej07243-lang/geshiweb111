import type { MetadataRoute } from "next";
import { TOOLS } from "../lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://easyformat.co";
  const staticPages = ["", "/privacy", "/terms", "/about", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? ("daily" as const) : ("monthly" as const),
    priority: path === "" ? 1 : 0.7,
  }));

  const toolUrls = TOOLS.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...toolUrls];
}
