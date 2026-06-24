import type { MetadataRoute } from "next";
import { blogLocales, getPublishedArticles } from "@/lib/blog/articles";

const siteUrl = "https://www.avadapay.cd";

const localizedPages = ["", "/qui-sommes-nous", "/blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = blogLocales.flatMap((locale) =>
    localizedPages.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "/blog" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.8,
    }))
  );

  const articleRoutes: MetadataRoute.Sitemap = blogLocales.flatMap((locale) =>
    getPublishedArticles(locale).map((article) => ({
      url: `${siteUrl}/${locale}/blog/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...articleRoutes];
}
