import type { BlogLocale } from "@/types/blog";

export function getNewsIndexPath(locale: BlogLocale) {
  return locale === "fr" ? "/fr/actualites" : "/en/news";
}

export function getNewsArticlePath(locale: BlogLocale, slug: string) {
  return `${getNewsIndexPath(locale)}/${slug}`;
}
