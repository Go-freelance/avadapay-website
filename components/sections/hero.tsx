"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useI18n } from "@/locales/client";

export default function Hero() {
  const t = useI18n();

  return (
    <section className="relative min-h-[600px] sm:min-h-[660px] lg:min-h-[760px] w-full overflow-hidden">
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
            className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/75"
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
        <div className="container mt-32 sm:mt-48 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 text-white text-xs sm:text-sm font-extrabold mb-5 sm:mb-7 backdrop-blur-md border border-white/15 shadow-lg">
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 text-white font-extrabold leading-tight text-balance break-words"
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl font-medium text-white/85 mb-7 sm:mb-9 max-w-3xl mx-auto px-2 sm:px-0 leading-relaxed text-balance break-words"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0"
            >
              <Link
                href="#solutions"
                className="w-full sm:w-auto max-w-xs sm:max-w-none"
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-7 py-3.5 sm:py-4 h-auto text-sm sm:text-base font-extrabold w-full sm:w-auto rounded-lg shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300"
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
                  className="border border-white/60 bg-white/95 text-primary hover:bg-white hover:text-primary px-6 sm:px-7 py-3.5 sm:py-4 h-auto text-sm sm:text-base font-extrabold backdrop-blur-sm w-full sm:w-auto rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
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
