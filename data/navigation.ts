export const navigationLinks = [
  {
    href: "#solutions",
    translationKey: "nav.solutions",
  },
  // {
  //   href: "/qui-sommes-nous",
  //   translationKey: "nav.team",
  // },
  {
    href: "/actualites",
    hrefByLocale: {
      fr: "/actualites",
      en: "/news",
    },
    translationKey: "nav.blog",
  },
  {
    href: "#features",
    translationKey: "nav.benefits",
  },
  {
    href: "#contact",
    translationKey: "nav.contact",
  },
];

export type DeveloperIcon = "FaCode" | "FaFileCode";

export interface DeveloperLink {
  titleKey: string;
  descriptionKey: string;
  href: string;
  icon: DeveloperIcon;
}

export const developerLinks: DeveloperLink[] = [
  {
    titleKey: "nav.developer.api.title",
    descriptionKey: "nav.developer.api.description",
    href: "https://docs.unipesa.tech/",
    icon: "FaCode",
  },
  {
    titleKey: "nav.developer.sms.title",
    descriptionKey: "nav.developer.sms.description",
    href: "https://msg.unipesa.tech/docs/api.html",
    icon: "FaFileCode",
  },
];
