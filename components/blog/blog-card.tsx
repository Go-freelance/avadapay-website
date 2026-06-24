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
    <article className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-avada-900/10">
      <Link href={`/${locale}/blog/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          <Image
            src={article.coverImage}
            alt={article.coverAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-gray-500">
          <time dateTime={article.publishedAt}>
            {formatArticleDate(locale, article.publishedAt)}
          </time>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-avada-600" />
            {article.readingTimeMinutes} {minuteLabel}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-avada-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-avada-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="mt-5 text-2xl font-extrabold leading-tight text-gray-950">
          <Link
            href={`/${locale}/blog/${article.slug}`}
            className="transition-colors hover:text-avada-700"
          >
            {article.title}
          </Link>
        </h2>
        <p className="mt-4 text-base leading-7 text-gray-600">
          {article.excerpt}
        </p>

        <Link
          href={`/${locale}/blog/${article.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-avada-700 transition hover:gap-3 hover:text-avada-800"
        >
          {readLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
