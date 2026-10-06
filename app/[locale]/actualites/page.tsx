import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { BlogGrid } from "@/components/blog/blog-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { setStaticParamsLocale } from "next-international/server";
import {
  getPublishedArticles,
  isBlogLocale,
} from "@/lib/blog/articles";
import { getNewsArticlePath, getNewsIndexPath } from "@/lib/blog/paths";
import { getI18n } from "@/locales/server";
import { notFound } from "next/navigation";

const siteUrl = "https://www.avadapay.cd";

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "fr" }];
}

export async function generateMetadata({
  params: _params,
}: BlogPageProps): Promise<Metadata> {
  await _params;
  const title = "Actualités des paiements digitaux en RDC | AvadaPay";
  const description =
    "Suivez les actualités d’AvadaPay en RDC : sécurité des paiements, Mobile Money, partenariats, innovation fintech et ressources pour les entreprises.";
  const url = `${siteUrl}${getNewsIndexPath("fr")}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteUrl}${getNewsIndexPath("fr")}`,
        en: `${siteUrl}${getNewsIndexPath("en")}`,
        "x-default": `${siteUrl}${getNewsIndexPath("fr")}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "AvadaPay",
      locale: "fr_CD",
      images: [
        {
          url: `${siteUrl}/images/hero-banner.png`,
          alt: "Actualités et ressources AvadaPay en RDC",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/images/hero-banner.png`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale: rawLocale } = await params;

  if (!isBlogLocale(rawLocale) || rawLocale !== "fr") {
    notFound();
  }

  setStaticParamsLocale(rawLocale);

  const [articles, t] = await Promise.all([
    Promise.resolve(getPublishedArticles(rawLocale)),
    getI18n(),
  ]);
  const pageUrl = `${siteUrl}${getNewsIndexPath(rawLocale)}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Actualités des paiements digitaux en RDC",
    description:
      "Actualités, analyses et ressources AvadaPay sur les paiements digitaux en République démocratique du Congo.",
    url: pageUrl,
    inLanguage: "fr-CD",
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}${getNewsArticlePath(rawLocale, article.slug)}`,
        name: article.title,
        image: `${siteUrl}${article.coverImage}`,
      })),
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-950">
      <JsonLd data={structuredData} />
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
            <div className="mb-8 max-w-2xl">
              <h2 className="text-2xl font-extrabold text-gray-950 sm:text-3xl">
                Nos dernières actualités
              </h2>
              <p className="mt-3 leading-7 text-gray-600">
                Retrouvez les annonces et analyses d’AvadaPay sur la sécurité,
                l’innovation et l’évolution des paiements en RDC.
              </p>
            </div>
            {articles.length > 0 ? (
              <BlogGrid
                articles={articles}
                locale={rawLocale}
                readLabel={t("blog.card.read" as any, {})}
                minuteLabel={t("blog.card.minutes" as any, {})}
                showMoreLabel={t("blog.list.showMore" as any, {})}
              />
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
