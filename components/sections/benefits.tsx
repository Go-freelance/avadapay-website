"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { BenefitItem } from "@/components/ui/benefit-item";
import { benefitsData } from "@/data/benefits";
import { paymentPartners } from "@/data/partners";

export default function Benefits() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
      className="py-16 md:py-24 bg-white relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-50 rounded-bl-full -z-10 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-emerald-50 rounded-tr-full -z-10 opacity-70"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title="Bénéfices pour"
            title2="le Marchand"
            className="mb-12"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-stretch mb-16">
          {/* Image container with overlay */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-full min-h-[400px] md:min-h-0"
          >
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/70 to-emerald-900/50 mix-blend-multiply z-10 rounded-xl"></div>
              <Image
                src="/images/online-payment.jpg"
                alt="Bénéfices pour le Marchand"
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">
                Optimisez votre business
              </h3>
              <p className="text-white/90 max-w-md">
                Découvrez comment nos solutions de paiement peuvent transformer
                votre entreprise et améliorer l'expérience de vos clients.
              </p>
              <div className="mt-4 inline-block">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  Agréé par la Banque Centrale du Congo
                </span>
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
            <ul className="space-y-6">
              {benefitsData.map((benefit, index) => (
                <motion.div key={benefit.id} variants={itemVariants}>
                  <BenefitItem
                    icon={benefit.icon}
                    title={benefit.title}
                    description={benefit.description}
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
          className="mt-16"
        >
          <h3 className="text-xl font-semibold text-center mb-8">
            Nos partenaires de paiement
          </h3>
          <div className="flex flex-wrap gap-6 justify-center">
            {paymentPartners.map((partner, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.2 }}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-emerald-200 transition-all"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={80}
                  height={40}
                  className="h-8 w-auto"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
