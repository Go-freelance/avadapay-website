"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { solutionsData } from "@/data/solutions";
import { useI18n } from "@/locales/client";
import {
  ChevronRight,
  CreditCard,
  ArrowRight,
  BarChart3,
  Users,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Solution {
  id: string;
  translationKey: string;
  features?: string[];
}

export default function Solutions() {
  const [activeSolution, setActiveSolution] = useState(solutionsData[0].id);
  const t = useI18n();

  const getActiveSolution = () => {
    return (
      solutionsData.find((solution) => solution.id === activeSolution) ||
      solutionsData[0]
    );
  };

  return (
    <section id="solutions" className="py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>
      <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] bg-primary/20 opacity-70 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] bg-primary/30 opacity-60 blur-[100px]"></div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="section-title-wrapper text-4xl md:text-5xl font-extrabold text-dark"
          >
            {t("solutions.title")}{" "}
            <span className="gradient-text">{t("solutions.title2")}</span> ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg md:text-xl text-gray-600 font-bold max-w-2xl mt-4 sm:mt-6 mx-auto px-4 sm:px-0"
          >
            {t("solutions.subtitle")}
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-2 flex flex-col">
              {solutionsData.map((solution: Solution, index: number) => (
                <motion.button
                  key={solution.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  onClick={() => setActiveSolution(solution.id)}
                  className={cn(
                    "w-full text-left p-4 sm:p-5 rounded-lg transition-all duration-300 flex items-center gap-4 group",
                    activeSolution === solution.id
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "hover:bg-primary/5"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0",
                      activeSolution === solution.id
                        ? "bg-white/20"
                        : "bg-primary/10"
                    )}
                  >
                    {index === 0 && (
                      <CreditCard
                        className={cn(
                          "h-5 w-5 sm:h-6 sm:w-6",
                          activeSolution === solution.id
                            ? "text-white"
                            : "text-primary"
                        )}
                      />
                    )}
                    {index === 1 && (
                      <Users
                        className={cn(
                          "h-5 w-5 sm:h-6 sm:w-6",
                          activeSolution === solution.id
                            ? "text-white"
                            : "text-primary"
                        )}
                      />
                    )}
                    {index === 2 && (
                      <Smartphone
                        className={cn(
                          "h-5 w-5 sm:h-6 sm:w-6",
                          activeSolution === solution.id
                            ? "text-white"
                            : "text-primary"
                        )}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-base sm:text-lg">
                      {t(`${solution.translationKey}.title`, {})}
                    </h3>
                    <p
                      className={cn(
                        "text-sm sm:text-base transition-all duration-300",
                        activeSolution === solution.id
                          ? "text-white/80"
                          : "text-muted-foreground"
                      )}
                    >
                      {t(`${solution.translationKey}.shortDescription`, {})}
                    </p>
                  </div>
                  <ChevronRight
                    className={cn(
                      "ml-auto h-5 w-5 sm:h-6 sm:w-6 transition-transform",
                      activeSolution === solution.id
                        ? "text-white"
                        : "text-primary opacity-0 group-hover:opacity-100"
                    )}
                  />
                </motion.button>
              ))}

              <div className="mt-8 p-4 sm:p-6 h-60 rounded-lg bg-primary/5 border border-primary/10 hidden lg:block">
                <h4 className="font-medium text-lg mb-2">
                  {t("solutions.help.title")}
                </h4>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  {t("solutions.help.description")}
                </p>
                <Link
                  href="#contact"
                  className="text-primary text-sm sm:text-base font-medium flex items-center hover:underline"
                >
                  {t("solutions.help.cta")}{" "}
                  <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contenu détaillé de la solution active */}
          <div className="lg:w-2/3">
            <motion.div
              key={activeSolution}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden"
            >
              {/* En-tête avec dégradé */}
              <div className="bg-gradient-to-r from-primary/90 to-primary/70 p-6 sm:p-8 text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                  {t(`${getActiveSolution().translationKey}.title`, {})}
                </h3>
                <p className="text-sm sm:text-base text-white/90">
                  {t(`${getActiveSolution().translationKey}.description`, {})}
                </p>
              </div>

              <div className="relative h-[250px] sm:h-[300px] w-full bg-muted/30">
                <Image
                  src={`/images/${getActiveSolution().id}.jpg`}
                  alt={t(`${getActiveSolution().translationKey}.title`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
                {getActiveSolution().id === "online-payment" && (
                  <div className="absolute inset-0 z-10 flex items-center lg:mt-56 mt-20 justify-center gap-4 sm:gap-6 md:gap-8 p-4">
                    <div className="bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-lg shadow-lg">
                      <Image
                        src="/images/logo-mpsa.png"
                        alt="M-Pesa"
                        width={60}
                        height={30}
                        className="h-8 sm:h-10 w-auto object-contain"
                      />
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-lg shadow-lg">
                      <Image
                        src="/images/orange-money.png"
                        alt="Orange Money"
                        width={60}
                        height={30}
                        className="h-8 sm:h-10 w-auto object-contain"
                      />
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-lg shadow-lg">
                      <Image
                        src="/images/airtel-money.png"
                        alt="Airtel Money"
                        width={60}
                        height={30}
                        className="h-8 sm:h-10 w-auto object-contain"
                      />
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-lg shadow-lg">
                      <Image
                        src="/images/afrimoney.png"
                        alt="AfriMoney"
                        width={60}
                        height={30}
                        className="h-8 sm:h-10 w-auto object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Caractéristiques */}
              <div className="p-6 sm:p-8">
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {getActiveSolution().features &&
                    getActiveSolution().features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
                      >
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-primary text-sm">✓</span>
                        </div>
                        <span className="text-sm sm:text-base">
                          {t(`${feature}`, {})}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bannière CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 bg-gradient-to-r from-primary/90 to-primary/70 rounded-2xl p-6 sm:p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4">
            {t("solutions.cta.title")}
          </h3>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
            {t("solutions.cta.description")}
          </p>
          <Link href="#contact">
            <Button className="bg-white text-primary font-bold hover:bg-white/90 group">
              {t("solutions.cta.button")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
