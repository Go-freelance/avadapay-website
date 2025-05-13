"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const partners = [
  { name: "Fyatu", logo: "/images/fyatu.png" },
  // { name: "Maxi Cash", logo: "/images/maxicash.png" },
  { name: "KoboPay", logo: "/images/kobopay.png" },
  { name: "MaishaPay", logo: "/images/maisha.png" },
  { name: "Betika", logo: "/images/betika.png" },
  { name: "Monetbil", logo: "/images/monetbil.png" },
  { name: "Curalife", logo: "/images/curalife.png" },
  { name: "Melbet", logo: "/images/melbet.png" },
  // { name: "As Vclub", logo: "/images/as.png" },
  { name: "X Cash", logo: "/images/xcash.png" },
];

export default function Partners() {
  const [mounted, setMounted] = useState(false);

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
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 sm:mb-4 text-dark">
            Ils nous ont fait confiance
          </h2>
          <div className="w-16 sm:w-20 h-1 avada-gradient mx-auto mb-4 sm:mb-6 rounded-full"></div>
          {/* <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
            Infrastructure de paiement connectée à tous les opérateurs
          </p> */}
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
              className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 hover:border-avada-500/30 transition-all flex items-center justify-center h-20 sm:h-24 w-full"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={100}
                height={50}
                className="max-h-10 sm:max-h-12 w-auto object-contain"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        ></motion.div>
      </div>
    </section>
  );
}
