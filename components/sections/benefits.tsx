"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { BenefitItem } from "@/components/ui/benefit-item";
import { benefitsData } from "@/data/benefits";
import { paymentPartners } from "@/data/partners";
import { useI18n } from "@/locales/client";
import { Shield } from "lucide-react";

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
      className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-bl-full -z-10 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/10 rounded-tr-full -z-10 opacity-70"></div>

      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 max-w-3xl mx-auto leading-tight">
            {t("benefits.title")}{" "}
            <span className="gradient-text">{t("benefits.title2")}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/70 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/payment.jpg"
                alt={t("benefits.optimize.title")}
                width={600}
                height={450}
                className="object-cover w-full h-auto rounded-2xl"
              />

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute top-4 right-4 z-20"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-primary">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="font-bold text-primary">
                    {t("benefits.badge")}
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {t("benefits.optimize.title")}
              </h3>
              <p className="text-gray-700">
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
            <ul className="space-y-5 sm:space-y-6">
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 bg-gray-50 rounded-2xl p-8 sm:p-10"
        >
          <h3 className="text-xl font-bold text-center mb-8">
            {t("benefits.partners.title")}
          </h3>
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center items-center">
            {paymentPartners.map((partner, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.2 }}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-primary/30 transition-all"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={80}
                  height={40}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
