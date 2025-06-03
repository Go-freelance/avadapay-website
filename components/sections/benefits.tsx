"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { BenefitItem } from "@/components/ui/benefit-item";
import { benefitsData } from "@/data/benefits";
import { paymentPartners } from "@/data/partners";
import { useI18n } from "@/locales/client";

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
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="benefits"
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden"
    >
      {/* Modern background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,150,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,150,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <div className="container relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 max-w-4xl mx-auto leading-tight mb-6">
            {t("benefits.title")}{" "}
            <span className="gradient-text">{t("benefits.title2")}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/70 mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative group">
              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-2">
                <Image
                  src="/images/marchand.jpg"
                  alt={t("benefits.optimize.title")}
                  width={600}
                  height={400}
                  className="object-cover w-full h-[300px] md:h-[400px] rounded-xl"
                />

                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-100">
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">+127%</div>
                    <div className="text-xs text-gray-600">
                      {t("benefits.growth")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Info card below image */}
              <div className="mt-6 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 bg-primary rounded-md"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">
                      {t("benefits.optimize.title")}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t("benefits.optimize.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-1"
          >
            {benefitsData.map((benefit, index) => (
              <motion.div key={benefit.id} variants={itemVariants}>
                <div className="group p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-100">
                  <BenefitItem
                    icon={benefit.icon}
                    title={t(`${benefit.translationKey}.title` as BenefitKey)}
                    description={t(
                      `${benefit.translationKey}.description` as BenefitKey
                    )}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100"
        >
          <div className="text-center mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              {t("benefits.partners.title")}
            </h3>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center">
            {paymentPartners.map((partner, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className=" p-4 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center h-16"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={80}
                  height={40}
                  className="h-12 w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
