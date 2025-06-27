"use client";

import Image from "next/image";
import Link from "next/link";
import { contactInfo } from "@/data/contact";
import { navigationLinks, developerLinks } from "@/data/navigation";
import { solutionsData } from "@/data/solutions";
import { useI18n } from "@/locales/client";
import { FaCode, FaFileCode, FaExternalLinkAlt } from "react-icons/fa";
import {FaInstagram, FaLinkedin,  FaFacebook} from "react-icons/fa6";

export default function Footer() {
  const t = useI18n();
  const iconMap = { FaCode, FaFileCode };

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
                      <FaExternalLinkAlt className="h-3 w-3 opacity-50 group-hover:opacity-100" />
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
              <FaFacebook
                className="h-6 w-6"
              />
            </Link>
            <Link
              href="https://www.instagram.com/avadapay_rdc/"
              target="_blank"
              className="text-gray-500 hover:text-avada-500 flex-shrink-0 transition-colors"
            >
              <span className="sr-only">{t("footer.social.instagram")}</span>
              <FaInstagram
                className="h-6 w-6"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/company/avadapayrdc"
              target="_blank"
              className="text-gray-500 hover:text-avada-500 flex-shrink-0 transition-colors"
            >
              <span className="sr-only">{t("footer.social.linkedin")}</span>
              <FaLinkedin
                className="h-6 w-6"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
