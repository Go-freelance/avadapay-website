"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useI18n } from "@/locales/client";

const partners = [
  { name: "BetWinner", logo: "/images/bet-winner.png" },
  { name: "Monetbil", logo: "/images/monetbil.png" },
  { name: "1xBet", logo: "/images/1xbet.png" },
  { name: "Melbet", logo: "/images/melbet.png" },
  { name: "Betika", logo: "/images/betika.png" },
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
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 sm:mb-4 text-dark break-words">
            {t("partners.title")}
          </h2>
          <div className="w-16 sm:w-20 h-1 avada-gradient mx-auto mb-4 sm:mb-6 rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 items-center justify-items-center"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-white p-2 sm:p-4 rounded-lg shadow-sm border border-gray-100 hover:border-avada-500/30 transition-all flex items-center justify-center h-16 sm:h-20 md:h-24 w-full max-w-[140px] sm:max-w-[160px] md:max-w-[200px] overflow-hidden"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="max-h-8 sm:max-h-10 md:max-h-12 w-auto object-contain"
                priority={index < 4}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
