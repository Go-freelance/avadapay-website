import type { MetadataRoute } from "next";
import { blogLocales, getPublishedArticles } from "@/lib/blog/articles";
import { getNewsArticlePath, getNewsIndexPath } from "@/lib/blog/paths";

const siteUrl = "https://www.avadapay.cd";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = blogLocales.flatMap((locale) => {
    const localizedPages = ["", "/qui-sommes-nous", getNewsIndexPath(locale)];

    return localizedPages.map((path) => ({
      url: path.startsWith(`/${locale}`)
        ? `${siteUrl}${path}`
        : `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === getNewsIndexPath(locale) ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.8,
    }));
  });

  const articleRoutes: MetadataRoute.Sitemap = blogLocales.flatMap((locale) =>
    getPublishedArticles(locale).map((article) => ({
      url: `${siteUrl}${getNewsArticlePath(locale, article.slug)}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...articleRoutes];
}
