"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import type { BlogArticleMeta, BlogLocale } from "@/types/blog";

const ARTICLES_PER_BATCH = 8;

type BlogGridProps = {
  articles: BlogArticleMeta[];
  locale: BlogLocale;
  readLabel: string;
  minuteLabel: string;
  showMoreLabel: string;
};

export function BlogGrid({
  articles,
  locale,
  readLabel,
  minuteLabel,
  showMoreLabel,
}: BlogGridProps) {
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_BATCH);
  const gridId = `${locale}-news-grid`;
  const hasMore = visibleCount < articles.length;

  return (
    <>
      <div
        id={gridId}
        className="grid auto-rows-fr gap-5 sm:grid-cols-2 xl:grid-cols-4"
      >
        {articles.map((article, index) => (
          <div
            key={article.slug}
            hidden={index >= visibleCount}
            className="h-full"
          >
            <BlogCard
              article={article}
              locale={locale}
              readLabel={readLabel}
              minuteLabel={minuteLabel}
            />
          </div>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            aria-controls={gridId}
            onClick={() =>
              setVisibleCount((currentCount) =>
                Math.min(
                  currentCount + ARTICLES_PER_BATCH,
                  articles.length
                )
              )
            }
            className="inline-flex items-center gap-2 rounded-full bg-avada-600 px-6 py-3 font-extrabold text-white shadow-sm transition hover:bg-avada-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avada-600 focus-visible:ring-offset-2"
          >
            {showMoreLabel}
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </>
  );
}
