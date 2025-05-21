"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/locales/client";
import {
  CreditCard,
  Shield,
  Smartphone,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const features = [
  {
    icon: <CreditCard className="h-6 w-6" />,
    titleKey: "features.items.integration.title" as const,
    descriptionKey: "features.items.integration.description" as const,
    color: "from-[#00C896] to-[#36CFBD]",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    titleKey: "features.items.monitoring.title" as const,
    descriptionKey: "features.items.monitoring.description" as const,
    color: "from-[#00C896] to-[#36CFBD]",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    titleKey: "features.items.payment.title" as const,
    descriptionKey: "features.items.payment.description" as const,
    color: "from-[#00C896] to-[#36CFBD]",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    titleKey: "features.items.platform.title" as const,
    descriptionKey: "features.items.platform.description" as const,
    color: "from-[#00C896] to-[#36CFBD]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Features() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const t = useI18n();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section
      id="features"
      className="py-20 sm:py-24 md:py-32 bg-white relative overflow-hidden features-background"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-primary/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/5 to-primary/10 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="container relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            className="inline-block"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 max-w-3xl mx-auto leading-tight">
              {t("features.title")}{" "}
              <span className="gradient-text">{t("features.title2")}</span> ?
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/70 mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mt-4 sm:mt-6 font-bold px-4 sm:px-0"
          >
            {t("features.subtitle")}
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="feature-card bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl border border-gray-100 relative overflow-hidden group"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10 bg-gradient-to-br opacity-10 rounded-full group-hover:opacity-20 transition-opacity duration-500"></div>

              <div className="mb-6 relative z-10">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300">
                {t(feature.titleKey)}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                {t(feature.descriptionKey)}
              </p>

              <div className="mt-auto">
                <Link
                  href="#contact"
                  className="inline-flex items-center text-primary font-medium hover:underline group-hover:translate-x-1 transition-transform duration-300"
                >
                  <span>{t("features.learnMore")}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Bottom border accent */}
              <div
                className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${feature.color} group-hover:w-full transition-all duration-500 ease-out`}
              ></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
