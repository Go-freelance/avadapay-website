import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { setStaticParamsLocale } from "next-international/server";
import {
  getArticle,
  getArticleStaticParams,
  isBlogLocale,
} from "@/lib/blog/articles";
import { formatArticleDate } from "@/lib/blog/format";
import { getNewsArticlePath, getNewsIndexPath } from "@/lib/blog/paths";
import { getI18n } from "@/locales/server";
import { notFound } from "next/navigation";

const siteUrl = "https://www.avadapay.cd";

type BlogArticlePageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleStaticParams().filter((params) => params.locale === "en");
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isBlogLocale(locale)) {
    return {};
  }

  const article = getArticle(locale, slug);

  if (!article) {
    return {};
  }

  const url = `${siteUrl}${getNewsArticlePath("en", article.slug)}`;

  return {
    title: article.seoTitle ?? article.title,
    description: article.excerpt,
    authors: [{ name: "AvadaPay DRC", url: siteUrl }],
    creator: "AvadaPay DRC",
    publisher: "AvadaPay DRC",
    category: "Digital payments",
    keywords: article.tags,
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteUrl}${getNewsArticlePath("fr", article.slug)}`,
        en: `${siteUrl}${getNewsArticlePath("en", article.slug)}`,
        "x-default": `${siteUrl}${getNewsArticlePath("fr", article.slug)}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: ["AvadaPay DRC"],
      tags: article.tags,
      url,
      siteName: "AvadaPay",
      locale: "en_CD",
      images: [
        {
          url: `${siteUrl}${article.coverImage}`,
          alt: article.coverAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [`${siteUrl}${article.coverImage}`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { locale: rawLocale, slug } = await params;

  if (!isBlogLocale(rawLocale) || rawLocale !== "en") {
    notFound();
  }

  const article = getArticle(rawLocale, slug);

  if (!article) {
    notFound();
  }

  setStaticParamsLocale(rawLocale);

  const t = await getI18n();
  const { Content } = article;
  const articleUrl = `${siteUrl}${getNewsArticlePath(rawLocale, article.slug)}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        headline: article.title,
        description: article.excerpt,
        image: [`${siteUrl}${article.coverImage}`],
        datePublished: article.publishedAt,
        dateModified: article.publishedAt,
        inLanguage: "en-CD",
        mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
        author: { "@type": "Organization", name: "AvadaPay DRC", url: siteUrl },
        publisher: {
          "@type": "Organization",
          name: "AvadaPay DRC",
          url: siteUrl,
          logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo.png` },
        },
        keywords: article.tags.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "News",
            item: `${siteUrl}${getNewsIndexPath(rawLocale)}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: article.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-950">
      <JsonLd data={structuredData} />
      <Header />
      <main className="flex-1">
        <article>
          <header className="relative overflow-hidden border-b border-gray-100 bg-white pt-28 sm:pt-32 lg:pt-36">
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-avada-500/10 to-transparent" />
            <div className="container relative pb-12 pt-8 sm:pb-16 lg:pb-20">
              <Link
                href={getNewsIndexPath(rawLocale)}
                className="inline-flex items-center gap-2 text-sm font-extrabold text-avada-700 transition hover:text-avada-800"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("blog.article.back" as any, {})}
              </Link>

              <div className="mt-8 max-w-4xl">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-avada-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-avada-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="mt-5 text-3xl font-extrabold leading-tight text-gray-950 sm:text-5xl lg:text-6xl">
                  {article.title}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                  {article.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-500">
                  <time dateTime={article.publishedAt}>
                    {formatArticleDate(rawLocale, article.publishedAt)}
                  </time>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-avada-600" />
                    {article.readingTimeMinutes}{" "}
                    {t("blog.card.minutes" as any, {})}
                  </span>
                </div>
              </div>
            </div>
          </header>

          <div className="container py-10 sm:py-12 lg:py-16">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-gray-100 bg-gray-100 shadow-sm">
              <Image
                src={article.coverImage}
                alt={article.coverAlt}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1120px"
                className="object-cover"
              />
            </div>

            <div className="mx-auto mt-10 max-w-3xl">
              <Content />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
