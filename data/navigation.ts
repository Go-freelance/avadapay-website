export const navigationLinks = [
  {
    href: "#solutions",
    translationKey: "nav.solutions",
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

export type DeveloperIcon = "Code" | "FileText";

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
    icon: "Code",
  },
  {
    titleKey: "nav.developer.sms.title",
    descriptionKey: "nav.developer.sms.description",
    href: "https://msg.unipesa.tech/docs/api.html",
    icon: "FileText",
  },
];
