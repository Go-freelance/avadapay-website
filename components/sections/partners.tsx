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
      className="py-16 bg-white relative overflow-hidden section-with-graphic graphic-top-right graphic-bottom-left"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-dark">
            Ils nous ont fait confiance
          </h2>
          <div className="w-20 h-1 avada-gradient mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Infrastructure de paiement connectée à tous les opérateurs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 items-center justify-items-center"
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
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-avada-500/30 transition-all flex items-center justify-center h-24 w-full"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="max-h-12 w-auto"
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
