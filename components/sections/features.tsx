"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  CreditCard,
  Shield,
  BarChart,
  Smartphone,
  Clock,
  Users,
  CheckCircle,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Intégration Facile",
    description:
      "API RESTful intuitive avec documentation interactive et exemples de code pour une intégration en moins de 72h.",
    color: "from-emerald-400 to-emerald-600",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Temps Réel",
    description:
      "Tableau de bord en temps réel avec notifications instantanées pour chaque transaction et rapports automatisés.",
    color: "from-teal-400 to-teal-600",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Sécurité Maximale",
    description:
      "Cryptage de bout en bout, authentification à deux facteurs et conformité aux normes PCI DSS internationales.",
    color: "from-cyan-400 to-cyan-600",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile Money Universel",
    description:
      "Intégration native avec M-Pesa, Orange Money, Airtel Money et AfriMoney avec réconciliation automatique.",
    color: "from-green-400 to-green-600",
  },
  // {
  //   icon: <Users className="h-6 w-6" />,
  //   title: "Support Premium",
  //   description: "Équipe dédiée disponible 24/7, temps de réponse garanti de 2h et accompagnement personnalisé.",
  //   color: "from-teal-400 to-teal-600",
  // },
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
    <section id="features" className="py-24 features-background">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-title-wrapper"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Pourquoi <span className="gradient-text">choisir AvadaPay</span> ?
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mt-6"
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
          className="features-grid"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="feature-card bg-white rounded-xl p-8 border border-gray-100"
            >
              <div className="feature-icon-wrapper mb-6">
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white`}
                >
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center">
                {feature.title}
                <CheckCircle className="h-4 w-4 ml-2 text-emerald-500" />
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-6 flex items-center text-emerald-500 font-medium">
                <span className="text-sm">En savoir plus</span>
                <Zap className="h-4 w-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-full text-lg font-medium shadow-lg shadow-emerald-100">
            <span>Agréé par la Banque Centrale du Congo</span>
            <Shield className="ml-2 h-5 w-5" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
