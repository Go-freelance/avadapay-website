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
    <section className="relative h-screen min-h-[450px] sm:min-h-[650px] max-h-[900px] w-full overflow-hidden flex items-center">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banner.jpg"
          alt="AvadaPay Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"></div>
        <div className="absolute inset-0 bg-primary/30 mix-blend-multiply"></div>
      </div>

      {/* Contenu principal */}
      <div className="container relative z-10 mt-10 sm:mt-16 px-2 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/30 text-white text-xs xs:text-sm sm:text-base font-semibold mb-4 sm:mb-8 backdrop-blur-md border border-primary/40 shadow-lg">
              {t("hero.badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-6 text-white leading-tight font-extrabold break-words"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm xs:text-base sm:text-lg md:text-xl font-light text-white/80 mb-5 sm:mb-10 max-w-2xl mx-auto px-2 sm:px-0 break-words"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0"
          >
            <div className="w-full sm:w-auto bg-black/30 sm:bg-transparent rounded-xl sm:rounded-none p-2 sm:p-0 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="#solutions" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-4 sm:px-6 lg:px-8 py-4 sm:py-5 h-auto text-sm sm:text-base font-bold w-full sm:w-auto"
                >
                  {t("hero.cta")}
                  <ChevronRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-white/10 hover:text-white px-4 sm:px-6 lg:px-8 py-4 sm:py-5 h-auto text-sm sm:text-base font-bold backdrop-blur-sm w-full sm:w-auto"
                >
                  {t("hero.contact")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
