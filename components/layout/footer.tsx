"use client";

import Image from "next/image";
import Link from "next/link";
import { contactInfo } from "@/data/contact";
import { navigationLinks, developerLinks } from "@/data/navigation";
import { solutionsData } from "@/data/solutions";
import { useI18n } from "@/locales/client";
import { Code, FileText, ExternalLink } from "lucide-react";

export default function Footer() {
  const t = useI18n();
  const iconMap = { Code, FileText };

  return (
    <footer className="bg-gray-900 text-white py-16 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-5 gap-12">
          <div className="min-w-0">
            <Image
              src="/images/logo.png"
              alt="AvadaPay Logo"
              width={160}
              height={40}
              className="h-auto w-40 mb-6"
            />
            <p className="text-gray-400 mb-4 break-words">
              {t("footer.description")}
            </p>
            <p className="text-gray-400 break-words">{t("footer.license")}</p>
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-semibold mb-4 break-words">
              {t("footer.navigation.title")}
            </h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href} className="break-words">
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-avada-500 transition-colors"
                  >
                    {t(link.translationKey as any, {})}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-semibold mb-4 break-words">
              {t("footer.solutions.title")}
            </h3>
            <ul className="space-y-3">
              {solutionsData.map((solution) => (
                <li key={solution.id} className="break-words">
                  <Link
                    href={"#solutions"}
                    className="text-gray-400 hover:text-avada-500 transition-colors"
                  >
                    {t(`solutions.items.${solution.id}.title` as any, {})}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section Développeurs */}
          <div className="min-w-0">
            <h3 className="text-lg font-semibold mb-4 break-words">
              <span className="flex items-center gap-2">
                {t("nav.developers" as any, {})}
              </span>
            </h3>
            <ul className="space-y-3">
              {developerLinks.map((item, index) => {
                const Icon = iconMap[item.icon];
                return (
                  <li key={index} className="break-words">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-avada-500 transition-colors flex items-center gap-2 group"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-avada-500/10 rounded-lg flex items-center justify-center text-avada-500 group-hover:bg-avada-500 group-hover:text-white transition-colors">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span>{t(item.titleKey as any, {})}</span>
                      <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-semibold mb-4 break-words">
              {t("footer.contact.title")}
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <span className="mr-2 flex-shrink-0">📍</span>
                <span className="break-words">{contactInfo.address}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 flex-shrink-0">✉️</span>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-avada-500 transition-colors break-words"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-2 flex-shrink-0">📞</span>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="hover:text-avada-500 transition-colors break-words"
                >
                  {contactInfo.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm break-words">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-gray-500 hover:text-avada-500 flex-shrink-0 transition-colors"
            >
              <span className="sr-only">{t("footer.social.facebook")}</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-avada-500 flex-shrink-0 transition-colors"
            >
              <span className="sr-only">{t("footer.social.instagram")}</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-avada-500 flex-shrink-0 transition-colors"
            >
              <span className="sr-only">{t("footer.social.linkedin")}</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
