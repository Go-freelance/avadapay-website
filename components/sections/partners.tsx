"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useI18n } from "@/locales/client";

const partners = [
  { name: "MEAG", logo: "/images/meag.png" },
  { name: "SFA", logo: "/images/sfa2.png" },
  { name: "Somba Mart", logo: "/images/sosmart.png" },
  { name: "Nakelasi", logo: "/images/nakelasi.png" },
  { name: "Monetbil", logo: "/images/monetbil.png" },
  { name: "Ligdicash", logo: "/images/ligdicash.png" },
  { name: "Fyatu", logo: "/images/fyatu.png" },
  { name: "KoboPay", logo: "/images/kobopay.png" },
];

export default function Partners() {
  const t = useI18n();
  const marqueePartners = [...partners, ...partners];

  return (
    <section
      id="partners"
      className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-7 sm:mb-10"
        >
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark break-words">
            {t("partners.title")}
          </h2>
          <div className="w-14 sm:w-16 h-1 avada-gradient mx-auto my-4 rounded-full"></div>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto font-semibold px-4 sm:px-0 break-words">
            {t("partners.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-6xl"
        >
          <div className="partners-marquee py-5">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />
            <div className="partners-marquee-track flex w-max items-center gap-10 sm:gap-14">
              {marqueePartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  aria-hidden={index >= partners.length}
                  className="flex h-16 w-32 shrink-0 items-center justify-center transition duration-300 hover:-translate-y-0.5 sm:h-20 sm:w-40"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={60}
                    sizes="(max-width: 640px) 144px, 176px"
                    className="max-h-10 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:max-h-12"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
