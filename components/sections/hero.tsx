"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useI18n } from "@/locales/client";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const t = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative lg:h-[100vh] h-[70vh] w-full overflow-hidden">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/banner.jpg"
            alt="AvadaPay Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"
            style={{ mixBlendMode: "multiply" }}
          />
          <div
            className="absolute inset-0 bg-primary/30"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mt-16 sm:mt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/30 text-white text-xs sm:text-sm md:text-base font-semibold mb-6 sm:mb-8 backdrop-blur-md border border-primary/40 shadow-lg">
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 text-white font-extrabold leading-tight break-words"
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl font-light text-white/90 mb-8 sm:mb-10 max-w-3xl mx-auto px-2 sm:px-0 leading-relaxed break-words"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 sm:px-0"
            >
              <Link
                href="#solutions"
                className="w-full sm:w-auto max-w-xs sm:max-w-none"
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-4 sm:py-5 h-auto text-base sm:text-lg font-bold w-full sm:w-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {t("hero.cta")}
                  <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link
                href="#contact"
                className="w-full sm:w-auto max-w-xs sm:max-w-none"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-primary hover:bg-white hover:text-primary px-6 sm:px-8 py-4 sm:py-5 h-auto text-base sm:text-lg font-bold backdrop-blur-sm w-full sm:w-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {t("hero.contact")}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
