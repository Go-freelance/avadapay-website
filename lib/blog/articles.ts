import PaymentDrcEn, {
  article as paymentDrcEnMeta,
} from "@/content/blog/paiements-digitaux-rdc/en.mdx";
import PaymentDrcFr, {
  article as paymentDrcFrMeta,
} from "@/content/blog/paiements-digitaux-rdc/fr.mdx";
import SecurePaymentEn, {
  article as securePaymentEnMeta,
} from "@/content/blog/securiser-parcours-paiement/en.mdx";
import SecurePaymentFr, {
  article as securePaymentFrMeta,
} from "@/content/blog/securiser-parcours-paiement/fr.mdx";
import type { BlogArticle, BlogArticleMeta, BlogLocale } from "@/types/blog";

const articleSources: BlogArticle[] = [
  {
    ...paymentDrcFrMeta,
    Content: PaymentDrcFr,
  },
  {
    ...paymentDrcEnMeta,
    Content: PaymentDrcEn,
  },
  {
    ...securePaymentFrMeta,
    Content: SecurePaymentFr,
  },
  {
    ...securePaymentEnMeta,
    Content: SecurePaymentEn,
  },
];

export const blogLocales: BlogLocale[] = ["fr", "en"];

export function isBlogLocale(locale: string): locale is BlogLocale {
  return blogLocales.includes(locale as BlogLocale);
}

export function getPublishedArticles(locale: BlogLocale): BlogArticleMeta[] {
  return articleSources
    .filter((article) => article.locale === locale && article.published)
    .map(({ Content, ...metadata }) => metadata)
    .sort(compareArticlesByDateDesc);
}

export function getArticle(
  locale: BlogLocale,
  slug: string
): BlogArticle | undefined {
  return articleSources.find(
    (article) =>
      article.locale === locale && article.slug === slug && article.published
  );
}

export function getArticleStaticParams() {
  return articleSources
    .filter((article) => article.published)
    .map((article) => ({
      locale: article.locale,
      slug: article.slug,
    }));
}

function compareArticlesByDateDesc(
  first: BlogArticleMeta,
  second: BlogArticleMeta
) {
  return (
    new Date(second.publishedAt).getTime() -
    new Date(first.publishedAt).getTime()
  );
}
