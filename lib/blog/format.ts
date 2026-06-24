import type { BlogLocale } from "@/types/blog";

export function formatArticleDate(locale: BlogLocale, date: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
