"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { BenefitItem } from "@/components/ui/benefit-item";
import { benefitsData } from "@/data/benefits";
import { paymentPartners } from "@/data/partners";
import { useI18n } from "@/locales/client";

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
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="benefits"
      className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-50 rounded-bl-full -z-10 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-emerald-50 rounded-tr-full -z-10 opacity-70"></div>

      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title={t("benefits.title")}
            title2={t("benefits.title2")}
            className="mb-8 sm:mb-12"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-stretch mb-8 sm:mb-12 md:mb-16">
          {/* Image container with overlay */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]"
          >
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/70 to-emerald-900/50 mix-blend-multiply z-10 rounded-xl"></div>
              <Image
                src="/images/payment.jpg"
                alt={t("benefits.optimize.title")}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-6 md:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                {t("benefits.optimize.title")}
              </h3>
              <p className="text-sm sm:text-base text-white/90 max-w-md">
                {t("benefits.optimize.description")}
              </p>
              <div className="mt-3 sm:mt-4 inline-block">
                <motion.span
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white/25 backdrop-blur-md rounded-full text-sm sm:text-base font-semibold border border-white/30 shadow-lg flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t("benefits.badge")}
                </motion.span>
              </div>
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
                    title={t(`${benefit.translationKey}.title`)}
                    description={t(`${benefit.translationKey}.description`)}
                  />
                </motion.div>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Partners section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 sm:mt-12 md:mt-16"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6 md:mb-8">
            {t("benefits.partners.title")}
          </h3>
          <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 justify-center">
            {paymentPartners.map((partner, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.2 }}
                className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-sm border border-gray-100 hover:border-emerald-200 transition-all"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={70}
                  height={35}
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
