import type { ComponentType } from "react";

export type BlogLocale = "fr" | "en";

export interface BlogArticleMeta {
  slug: string;
  locale: BlogLocale;
  title: string;
  excerpt: string;
  publishedAt: string;
  published: boolean;
  coverImage: string;
  coverAlt: string;
  tags: string[];
  readingTimeMinutes: number;
}

export interface BlogArticle extends BlogArticleMeta {
  Content: ComponentType;
}
