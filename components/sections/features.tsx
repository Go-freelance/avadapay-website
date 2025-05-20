"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import {
  CreditCard,
  Shield,
  BarChart,
  Smartphone,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Intégration Facile et Rapide",
    description:
      "API RESTful intuitive avec documentation interactive et exemples de code pour une intégration en moins de 72h.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Monitoring & Reporting en temps réel",
    description:
      "Tableau de bord en temps réel avec notifications instantanées pour chaque transaction et rapports automatisés.",
  },

  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Plusieres méthodes de paiement disponible",
    description:
      "Intégration avec M-Pesa, Orange Money, Airtel Money et AfriMoney avec réconciliation automatique.",
  },

  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Pateformes stable et robuste",
    description:
      "Plateforme robuste et puissante, conçu pour offrir aux marchands des performances exceptionelles et une fiabilité sans faile",
  },
];

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

export default function Features() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section
      id="features"
      className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden section-with-graphic graphic-top-right graphic-bottom-left"
    >
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-title-wrapper"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark">
              Pourquoi <span className="gradient-text">choisir AvadaPay</span> ?
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mt-4 sm:mt-6 font-bold px-4 sm:px-0"
          >
            Des solutions de paiement innovantes conçues pour l'écosystème
            financier congolais
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative"
            >
              <div className="mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-avada-500 flex items-center justify-center text-white">
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-dark flex items-center">
                {feature.title}
                <CheckCircle className="h-4 w-4 ml-2 text-avada-500" />
              </h3>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                {feature.description}
              </p>

              <div className="mt-auto">
                <Link
                  href="#contact"
                  className="inline-flex items-center text-avada-500 font-medium hover:underline"
                >
                  <span>En savoir plus</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-5 text-center"
        >
          {/* <div className="inline-flex items-center justify-center px-6 py-3 bg-dark text-white rounded-md text-lg font-medium relative">
            <span className="relative z-10">Agréé par la Banque Centrale du Congo</span>
            <Shield className="ml-2 h-5 w-5 relative z-10" />
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
