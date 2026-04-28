import type { MetadataRoute } from "next";
import { BLOG_ARTICLES } from "../lib/blog";
import { SEO_LANDING_PAGES } from "../lib/seoLandingPages";
import { TOOLS } from "../lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://easyformat.co";
  const staticPages = ["", "/privacy", "/terms", "/about", "/contact", "/blog", "/tools"].map((path) => ({
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

  const blogUrls = BLOG_ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const seoLandingUrls = SEO_LANDING_PAGES.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticPages, ...toolUrls, ...blogUrls, ...seoLandingUrls];
}
