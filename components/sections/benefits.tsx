"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { BenefitItem } from "@/components/ui/benefit-item";
import { benefitsData } from "@/data/benefits";
import { paymentPartners } from "@/data/partners";
import { useI18n } from "@/locales/client";
import { Shield } from "lucide-react";

type BenefitKey =
  | "benefits.items.integration.title"
  | "benefits.items.integration.description"
  | "benefits.items.monitoring.title"
  | "benefits.items.monitoring.description"
  | "benefits.items.statistics.title"
  | "benefits.items.statistics.description"
  | "benefits.items.mobile-money.title"
  | "benefits.items.mobile-money.description"
  | "benefits.items.security.title"
  | "benefits.items.security.description"
  | "benefits.items.satisfaction.title"
  | "benefits.items.satisfaction.description";

export default function Benefits() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const t = useI18n();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="benefits"
      className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 sm:w-1/3 h-1/3 bg-primary/10 rounded-bl-full -z-10 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/2 sm:w-1/3 h-1/3 bg-primary/10 rounded-tr-full -z-10 opacity-70"></div>

      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 max-w-3xl mx-auto leading-tight">
            {t("benefits.title")}{" "}
            <span className="gradient-text">{t("benefits.title2")}</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary/70 mx-auto mt-4 sm:mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-16 items-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl">
              <Image
                src="/images/marchand.jpg"
                alt={t("benefits.optimize.title")}
                width={600}
                height={450}
                className="object-cover w-full h-[250px] sm:h-[300px] md:h-[400px] rounded-xl sm:rounded-2xl"
              />

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-20"
              >
                <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-full shadow-lg border-2 border-primary">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="text-sm sm:text-base font-bold text-primary">
                    {t("benefits.badge")}
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="mt-4 sm:mt-6 bg-gray-50 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-100">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
                {t("benefits.optimize.title")}
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                {t("benefits.optimize.description")}
              </p>
            </div>
          </motion.div>

          {/* Benefits list */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <ul className="space-y-4 sm:space-y-6">
              {benefitsData.map((benefit, index) => (
                <motion.div key={benefit.id} variants={itemVariants}>
                  <BenefitItem
                    icon={benefit.icon}
                    title={t(`${benefit.translationKey}.title` as BenefitKey)}
                    description={t(
                      `${benefit.translationKey}.description` as BenefitKey
                    )}
                  />
                </motion.div>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Partners section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10"
        >
          <h3 className="text-lg sm:text-xl font-bold text-center mb-6 sm:mb-8">
            {t("benefits.partners.title")}
          </h3>
          <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 justify-center items-center">
            {paymentPartners.map((partner, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.2 }}
                className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 hover:border-primary/30 transition-all"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={80}
                  height={40}
                  className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
