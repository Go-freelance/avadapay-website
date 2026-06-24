import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogArticleMeta, BlogLocale } from "@/types/blog";
import { formatArticleDate } from "@/lib/blog/format";

interface BlogCardProps {
  article: BlogArticleMeta;
  locale: BlogLocale;
  readLabel: string;
  minuteLabel: string;
}

export function BlogCard({
  article,
  locale,
  readLabel,
  minuteLabel,
}: BlogCardProps) {
  return (
    <article className="group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-avada-500/20 hover:shadow-lg hover:shadow-avada-900/10">
      <Link href={`/${locale}/blog/${article.slug}`} className="block">
        <div className="relative aspect-[16/8.5] overflow-hidden bg-gray-100">
          <Image
            src={article.coverImage}
            alt={article.coverAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 360px"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-gray-500">
          <time dateTime={article.publishedAt}>
            {formatArticleDate(locale, article.publishedAt)}
          </time>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-avada-600" />
            {article.readingTimeMinutes} {minuteLabel}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-avada-50 px-2.5 py-1 text-[11px] font-bold uppercase text-avada-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="mt-4 text-lg font-extrabold leading-snug text-gray-950 sm:text-xl">
          <Link
            href={`/${locale}/blog/${article.slug}`}
            className="transition-colors hover:text-avada-700"
          >
            {article.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {article.excerpt}
        </p>

        <Link
          href={`/${locale}/blog/${article.slug}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-avada-700 transition hover:gap-3 hover:text-avada-800"
        >
          {readLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
