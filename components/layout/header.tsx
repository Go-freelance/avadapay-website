"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCode, FaFileCode, FaExternalLinkAlt } from "react-icons/fa";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/locales/client";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  navigationLinks,
  developerLinks,
  DeveloperLink,
} from "../../data/navigation";
import ReactDOM from "react-dom";

type NavigationKey =
  | "nav.solutions"
  | "nav.benefits"
  | "nav.contact"
  | "nav.contactButton"
  | "nav.developers";

const iconMap = { FaCode, FaFileCode };

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [developersOpen, setDevelopersOpen] = useState(false);
  const t = useI18n();
  const pathname = usePathname();

  // Effet pour gérer le scroll du header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Effet pour gérer le blocage du scroll du body
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all h-20 duration-500",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white/0"
      )}
    >
      <div className="container h-full flex items-center justify-between relative">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0 transition-transform duration-300"
        >
          <Image
            src="/images/logo.png"
            alt="AvadaPay Logo"
            width={160}
            height={40}
            className={cn(
              "h-auto transition-all duration-300",
              scrolled ? "w-28 sm:w-32 md:w-36" : "w-32 sm:w-36 md:w-40"
            )}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <div className="flex gap-1 lg:gap-2 p-1 rounded-full bg-gray-50/80 backdrop-blur-sm">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-base font-bold rounded-full transition-all duration-300 whitespace-nowrap",
                  pathname === link.href
                    ? "text-white bg-primary shadow-md"
                    : "text-gray-700 hover:text-primary hover:bg-gray-100/80"
                )}
              >
                {t(link.translationKey as NavigationKey)}
              </Link>
            ))}

            {/* Developers Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "relative px-4 py-2 text-base font-bold rounded-full transition-all duration-300 whitespace-nowrap flex items-center gap-1",
                    "text-gray-700 hover:text-primary hover:bg-gray-100/80"
                  )}
                >
                  {t("nav.developers" as NavigationKey)}
                  <ChevronDown className="h-3 w-3 transition-transform duration-200" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-80 p-2 bg-white/95 backdrop-blur-md border border-gray-200 shadow-xl rounded-xl"
              >
                <div className="px-3 py-2 text-sm font-medium text-gray-500 border-b border-gray-100 mb-2">
                  {t("nav.developer.menu.title")}
                </div>
                {developerLinks.map((item: DeveloperLink, index) => {
                  const Icon = iconMap[item.icon];
                  return (
                    <DropdownMenuItem key={index} asChild className="p-0">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-avada-500/10 rounded-lg flex items-center justify-center text-avada-500 group-hover:bg-avada-500 group-hover:text-white transition-colors">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-gray-900 group-hover:text-avada-600">
                              {t(item.titleKey as NavigationKey)}
                            </p>
                            <FaExternalLinkAlt className="h-3 w-3 text-gray-400 group-hover:text-avada-500" />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {t(item.descriptionKey as NavigationKey)}
                          </p>
                        </div>
                      </a>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator className="my-2" />
                <div className="px-3 py-2 text-xs text-gray-400 text-center">
                  {t("nav.developer.menu.help")}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <LanguageSwitcher />

          <Link href="#contact" className="hidden md:block">
            <Button className="btn-avada rounded-full px-6 py-2 shadow-lg font-bold text-white transition-all duration-300 hover:scale-105 whitespace-nowrap">
              {t("nav.contactButton" as NavigationKey)}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-all"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-primary" />
          </Button>
        </div>

        {/* Mobile Menu*/}
        {isOpen &&
          typeof window !== "undefined" &&
          ReactDOM.createPortal(
            <div className="fixed inset-0 z-[9999] bg-white flex flex-col md:hidden overflow-hidden">
              <div className="flex items-center justify-between h-16 px-4 border-b bg-white">
                <Image
                  src="/images/logo.png"
                  alt="AvadaPay Logo"
                  width={140}
                  height={36}
                  className="h-6 sm:h-8 w-auto"
                  priority
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6 text-primary" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex-1 flex flex-col items-center justify-center gap-4 px-4 overflow-y-auto">
                {navigationLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-xl font-semibold w-full text-center py-3 rounded-lg transition-all duration-300 whitespace-nowrap",
                      pathname === link.href
                        ? "text-white bg-primary"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50"
                    )}
                    onClick={() => setIsOpen(false)}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: "fadeInUp 0.5s ease forwards",
                    }}
                  >
                    {t(link.translationKey as NavigationKey)}
                  </Link>
                ))}

                {/* Mobile Developers Section */}
                <div className="w-full">
                  <Button
                    variant="ghost"
                    className="w-full text-xl font-semibold py-3 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center justify-center gap-2"
                    onClick={() => setDevelopersOpen(!developersOpen)}
                    style={{
                      animationDelay: `${navigationLinks.length * 0.1}s`,
                      animation: "fadeInUp 0.5s ease forwards",
                    }}
                  >
                    {t("nav.developers" as NavigationKey)}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        developersOpen && "rotate-180"
                      )}
                    />
                  </Button>

                  {developersOpen && (
                    <div className="mt-2 space-y-2 px-4">
                      {developerLinks.map((item: DeveloperLink, index) => {
                        const Icon = iconMap[item.icon];
                        return (
                          <a
                            key={index}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="w-8 h-8 bg-avada-500/10 rounded-lg flex items-center justify-center text-avada-500">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 text-left">
                              <p className="text-sm font-medium text-gray-900">
                                {t(item.titleKey as NavigationKey)}
                              </p>
                              <p className="text-xs text-gray-500">
                                {t(item.descriptionKey as NavigationKey)}
                              </p>
                            </div>
                            <FaExternalLinkAlt className="h-4 w-4 text-gray-400" />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>

                <Link
                  href="#contact"
                  className="mt-6 w-full btn-avada text-center py-4 rounded-lg text-white font-bold whitespace-nowrap"
                  onClick={() => setIsOpen(false)}
                  style={{
                    animation: "fadeInUp 0.5s 0.4s ease forwards",
                    opacity: 0,
                  }}
                >
                  {t("nav.contactButton" as NavigationKey)}
                </Link>
              </nav>

              {/* Mobile Footer */}
              <div className="p-6 border-t flex justify-center">
                <LanguageSwitcher />
              </div>
            </div>,
            document.body
          )}
      </div>
    </header>
  );
}
