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
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="benefits"
      className="py-14 sm:py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden"
    >
      {/* Modern background elements */}
      <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="hidden md:block absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 max-w-4xl mx-auto leading-tight mb-6">
            {t("benefits.title")}{" "}
            <span className="gradient-text">{t("benefits.title2")}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/70 mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-14 sm:mb-16">
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
              <div className="relative rounded-lg overflow-hidden shadow-lg shadow-slate-950/5 bg-white p-2 border border-gray-100">
                <Image
                  src="/images/marchand.jpg"
                  alt={t("benefits.optimize.title")}
                  width={600}
                  height={400}
                  sizes="(max-width: 1024px) 100vw, 50vw"
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
              <div className="mt-5 bg-white rounded-lg p-5 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 bg-primary rounded-md"></div>
                  </div>
                  <div className="min-w-0">
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
                <div className="group p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-100">
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
          className="relative overflow-hidden rounded-lg border border-primary/10 bg-white shadow-lg shadow-slate-950/5"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-avada-400 to-primary" />
          <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-[0.85fr_1.4fr] md:items-center md:p-8 lg:p-10">
            <div className="md:border-r md:border-gray-100 md:pr-8">
              <h3 className="mt-4 text-2xl font-extrabold leading-tight text-gray-900 md:text-3xl">
                {t("benefits.partners.title")}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500">
                {t("benefits.partners.description")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-gray-100 bg-gray-100 sm:grid-cols-3 lg:grid-cols-4">
              {paymentPartners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  viewport={{ once: true }}
                  className="group flex h-20 items-center justify-center bg-white px-4 transition-colors sm:h-24"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={112}
                    height={56}
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 112px"
                    className="max-h-10 w-auto object-contain transition duration-300 sm:max-h-12"
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
