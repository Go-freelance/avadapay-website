"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { solutionsData } from "@/data/solutions";
import {
  ChevronRight,
  CreditCard,
  ArrowRight,
  BarChart3,
  Users,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Solutions() {
  const [activeSolution, setActiveSolution] = useState(solutionsData[0].id);

  const getActiveSolution = () => {
    return (
      solutionsData.find((solution) => solution.id === activeSolution) ||
      solutionsData[0]
    );
  };

  return (
    <section id="solutions" className="py-24 overflow-hidden">
      {/* Arrière-plan avec dégradé inspiré de Stripe */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>
      <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] bg-primary/20 opacity-70 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] bg-primary/30 opacity-60 blur-[100px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Solutions AvadaPay
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
          >
            Nos solutions{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Digitales
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Des solutions digitales innovantes pour tous vos besoins de paiement
            et communication
          </motion.p>
        </div>

        {/* Navigation des solutions style Stripe */}
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="md:w-1/3">
            <div className="sticky top-24 space-y-2 flex flex-col">
              {solutionsData.map((solution, index) => (
                <motion.button
                  key={solution.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  onClick={() => setActiveSolution(solution.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center gap-4 group",
                    activeSolution === solution.id
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "hover:bg-primary/5"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                      activeSolution === solution.id
                        ? "bg-white/20"
                        : "bg-primary/10"
                    )}
                  >
                    {index === 0 && (
                      <CreditCard
                        className={cn(
                          "h-5 w-5",
                          activeSolution === solution.id
                            ? "text-white"
                            : "text-primary"
                        )}
                      />
                    )}
                    {index === 1 && (
                      <Users
                        className={cn(
                          "h-5 w-5",
                          activeSolution === solution.id
                            ? "text-white"
                            : "text-primary"
                        )}
                      />
                    )}
                    {index === 2 && (
                      <Smartphone
                        className={cn(
                          "h-5 w-5",
                          activeSolution === solution.id
                            ? "text-white"
                            : "text-primary"
                        )}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{solution.title}</h3>
                    <p
                      className={cn(
                        "text-sm transition-all duration-300",
                        activeSolution === solution.id
                          ? "text-white/80"
                          : "text-muted-foreground"
                      )}
                    >
                      {solution.shortDescription}
                    </p>
                  </div>
                  <ChevronRight
                    className={cn(
                      "ml-auto h-5 w-5 transition-transform",
                      activeSolution === solution.id
                        ? "text-white"
                        : "text-primary opacity-0 group-hover:opacity-100"
                    )}
                  />
                </motion.button>
              ))}

              {/* Élément supplémentaire pour combler l'espace vide */}
              <div className="mt-8 p-6 h-60 rounded-lg bg-primary/5 border border-primary/10 hidden md:block">
                <h4 className="font-medium text-lg mb-2">Besoin d'aide ?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Notre équipe est disponible pour vous accompagner dans
                  l'intégration de nos solutions.
                </p>
                <Link
                  href="#contact"
                  className="text-primary text-sm font-medium flex items-center hover:underline"
                >
                  Contactez-nous <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contenu détaillé de la solution active */}
          <div className="md:w-2/3">
            <motion.div
              key={activeSolution}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden"
            >
              {/* En-tête avec dégradé */}
              <div className="bg-gradient-to-r from-primary/90 to-primary/70 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {getActiveSolution().title}
                </h3>
                <p className="text-white/90">
                  {getActiveSolution().description}
                </p>
              </div>

              {/* Illustration/Maquette */}
              <div className="relative h-[300px] w-full bg-muted/30">
                <Image
                  src={`/images/${getActiveSolution().id}.jpg`}
                  alt={getActiveSolution().title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
              </div>

              {/* Caractéristiques */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {getActiveSolution().features &&
                    getActiveSolution().features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
                      >
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-primary text-sm">✓</span>
                        </div>
                        <span>{feature}</span>
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
          className="mt-20 bg-gradient-to-r from-primary/90 to-primary/70 rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Prêt à transformer votre système de paiement ?
          </h3>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Rejoignez les entreprises qui font confiance à AvadaPay pour leurs
            solutions de paiement en ligne.
          </p>
          <Link href="#contact">
            <Button className="bg-white text-primary hover:bg-white/90 group">
              Démarrer maintenant
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
