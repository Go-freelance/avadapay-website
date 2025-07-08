"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useI18n } from "@/locales/client";

const partners = [
  { name: "MEAG", logo: "images/meag.png" },
  { name: "SFA", logo: "images/sfa.png" },
  { name: "Somba Mart", logo: "images/sosmart.png" },
  { name: "Nakelasi", logo: "images/nakelasi.png" },
  { name: "Monetbil", logo: "/images/monetbil.png" },
  { name: "Ligdicash", logo: "/images/ligdicash.png" },
  { name: "Fyatu", logo: "/images/fyatu.png" },
  { name: "KoboPay", logo: "/images/kobopay.png" },
];

export default function Partners() {
  const [mounted, setMounted] = useState(false);
  const t = useI18n();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="partners"
      className="py-10 sm:py-16 bg-white relative overflow-hidden section-with-graphic graphic-top-right graphic-bottom-left"
    >
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 sm:mb-4 text-dark break-words">
            {t("partners.title")}
          </h2>
          <div className="w-16 sm:w-20 h-1 avada-gradient mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mt-4 sm:mt-6 font-bold px-4 sm:px-0 break-words">
            {t("partners.description")}
          </p>
        </motion.div>

        {/* Logos des partenaires */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="bg-white rounded-2xl shadow-lg px-4 py-6 sm:px-8 sm:py-8 w-full max-w-4xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 place-items-center">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center w-full h-16 sm:h-20"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="max-h-12 sm:max-h-16 md:max-h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    priority={index < 4}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
