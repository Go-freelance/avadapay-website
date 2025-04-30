"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] max-h-[900px] w-full overflow-hidden flex items-center">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banner.jpg"
          alt="AvadaPay Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"></div>
        <div className="absolute inset-0 bg-primary/30 mix-blend-multiply"></div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
      </div>

      {/* Contenu principal */}
      <div className="container relative z-10 mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-white text-sm font-medium mb-6 backdrop-blur-sm border border-primary/20">
              L'agrégateur de paiement n°1 en RDC
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight"
          >
            <span className="relative inline-block">
              <span className="relative z-10">Simplifiez</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-primary/40 rounded-full -z-0"></span>
            </span>{" "}
            vos transactions finiancières
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-xl font-light text-white/80 mb-10 max-w-2xl mx-auto"
          >
            nous offrons des solutions digitales simplifiant les transactions
            financières pour les entreprises ainsi que les consommateurs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="#solutions">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 h-auto font-bold text-base group"
              >
                Découvrir nos solutions
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#contact">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-white/10 px-8 py-6 h-auto text-base font-bold backdrop-blur-sm"
              >
                Nous contacter
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
