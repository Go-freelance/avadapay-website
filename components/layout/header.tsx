"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/locales/client";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navigationLinks: {
  href: string;
  key: "nav.solutions" | "nav.features" | "nav.benefits" | "nav.contact";
}[] = [
  { href: "#solutions", key: "nav.solutions" },
  { href: "#features", key: "nav.features" },
  { href: "#benefits", key: "nav.benefits" },
  { href: "#contact", key: "nav.contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useI18n();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    // Disable scroll when mobile menu is open
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg h-16 md:h-20"
          : "bg-white/0 h-20 md:h-24"
      )}
    >
      <div className="container h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0 transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/images/logo.png"
            alt="AvadaPay Logo"
            width={160}
            height={40}
            className={cn(
              "h-auto transition-all duration-300",
              scrolled ? "w-36" : "w-40"
            )}
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
                  "relative px-4 py-2 text-base font-medium rounded-full transition-all duration-300",
                  pathname === link.href
                    ? "text-white bg-primary shadow-md"
                    : "text-gray-700 hover:text-primary hover:bg-gray-100/80"
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <LanguageSwitcher />

          <Link href="#contact" className="hidden md:block">
            <Button className="btn-avada rounded-full px-6 py-2 shadow-lg font-bold text-white transition-all duration-300 hover:scale-105">
              {t("nav.contactButton")}
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed inset-0 z-[999] bg-white flex flex-col md:hidden">
            <div className="flex items-center justify-between h-16 px-4 border-b">
              <Image
                src="/images/logo.png"
                alt="AvadaPay Logo"
                width={140}
                height={36}
                className="h-8 w-auto"
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
            <nav className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
              {navigationLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xl font-semibold w-full text-center py-3 rounded-lg transition-all duration-300",
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
                  {t(link.key)}
                </Link>
              ))}

              <Link
                href="#contact"
                className="mt-6 w-full btn-avada text-center py-4 rounded-lg text-white font-bold"
                onClick={() => setIsOpen(false)}
                style={{
                  animation: "fadeInUp 0.5s 0.4s ease forwards",
                  opacity: 0,
                }}
              >
                {t("nav.contactButton")}
              </Link>
            </nav>

            {/* Mobile Footer */}
            <div className="p-6 border-t flex justify-center">
              {/* <LanguageSwitcher /> */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
