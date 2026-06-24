import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { BlogCard } from "@/components/blog/blog-card";
import { setStaticParamsLocale } from "next-international/server";
import {
  blogLocales,
  getPublishedArticles,
  isBlogLocale,
} from "@/lib/blog/articles";
import { getI18n } from "@/locales/server";
import { notFound } from "next/navigation";

const siteUrl = "https://www.avadapay.com";

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return blogLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isFrench = locale === "fr";

  return {
    title: isFrench
      ? "Actualités et ressources | AvadaPay"
      : "News and resources | AvadaPay",
    description: isFrench
      ? "Annonces, partenariats, événements et conseils AvadaPay autour des paiements digitaux en RDC."
      : "AvadaPay announcements, partnerships, events and insights around digital payments in the DRC.",
    alternates: {
      canonical: `${siteUrl}/${locale}/blog`,
      languages: {
        fr: `${siteUrl}/fr/blog`,
        en: `${siteUrl}/en/blog`,
      },
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale: rawLocale } = await params;

  if (!isBlogLocale(rawLocale)) {
    notFound();
  }

  setStaticParamsLocale(rawLocale);

  const [articles, t] = await Promise.all([
    Promise.resolve(getPublishedArticles(rawLocale)),
    getI18n(),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-950">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-gray-100 bg-white pt-28 sm:pt-32 lg:pt-36">
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-avada-500/10 to-transparent" />
          <div className="container relative pb-14 pt-8 md:pb-20">
            <p className="mb-5 inline-flex rounded-full border border-avada-500/20 bg-avada-500/10 px-4 py-2 text-sm font-bold text-avada-700">
              {t("blog.hero.eyebrow" as any, {})}
            </p>
            <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-gray-950 sm:text-5xl lg:text-6xl">
              {t("blog.hero.title" as any, {})}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              {t("blog.hero.description" as any, {})}
            </p>
          </div>
        </section>

        <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
          <div className="container">
            {articles.length > 0 ? (
              <div className="grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-3">
                {articles.map((article) => (
                  <BlogCard
                    key={article.slug}
                    article={article}
                    locale={rawLocale}
                    readLabel={t("blog.card.read" as any, {})}
                    minuteLabel={t("blog.card.minutes" as any, {})}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                <h2 className="text-2xl font-extrabold text-gray-950">
                  {t("blog.empty.title" as any, {})}
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-gray-600">
                  {t("blog.empty.description" as any, {})}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
