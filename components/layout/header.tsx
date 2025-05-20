"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigationLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { useI18n } from "@/locales/client";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white/95 shadow-sm " : "bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="AvadaPay Logo"
              width={180}
              height={40}
              className="h-auto w-40"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-bold text-slate-300 hover:text-emerald-500 transition-colors",
                scrolled ? "text-slate-600" : ""
              )}
            >
              {t(`nav.${link.href.replace("#", "")}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="#contact">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold">
              {t("nav.contactButton")}
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-white md:hidden">
            <div className="container flex h-20 items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/logo.png"
                  alt="AvadaPay Logo"
                  width={180}
                  height={40}
                  className="h-7 w-auto"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <nav className="container flex flex-col gap-6 py-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xl font-medium hover:text-emerald-500  transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t(`nav.${link.href.replace("#", "")}`)}
                </Link>
              ))}
              <Link
                href="#contact"
                className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-md text-base font-medium transition-colors inline-flex items-center justify-center"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.contactButton")}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
