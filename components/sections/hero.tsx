"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { useI18n } from "@/locales/client";

const SLIDE_COUNT = 2;

export default function Hero() {
  const t = useI18n();
  const prefersReducedMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % SLIDE_COUNT);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  const showPrevious = () => {
    setActiveSlide((current) => (current - 1 + SLIDE_COUNT) % SLIDE_COUNT);
  };

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % SLIDE_COUNT);
  };

  return (
    <section
      className="relative min-h-[680px] w-full overflow-hidden sm:min-h-[660px] lg:min-h-[760px]"
      aria-roledescription="carousel"
      aria-label={t("hero.carouselLabel")}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
    >
      <AnimatePresence initial={false} mode="wait">
        {activeSlide === 0 ? (
          <motion.div
            key="avadapay"
            className="absolute inset-0"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            role="group"
            aria-roledescription="slide"
            aria-label={t("hero.slideOneLabel")}
          >
            <Image
              src="/images/banner.jpg"
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/75 mix-blend-multiply" />
            <div className="absolute inset-0 bg-primary/30 mix-blend-multiply" />

            <div className="relative z-10 flex h-full items-center pb-24 pt-28 sm:pb-20 sm:pt-40">
              <div className="container px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                  <SlideContent delay={0}>
                    <span className="mb-4 inline-block rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-extrabold text-white shadow-lg backdrop-blur-md min-[380px]:text-xs sm:mb-7 sm:px-4 sm:py-2 sm:text-sm">
                      {t("hero.badge")}
                    </span>
                  </SlideContent>
                  <SlideContent delay={0.12}>
                    <h1 className="mb-3 text-balance break-words text-[1.75rem] font-extrabold leading-[1.12] text-white min-[380px]:text-3xl sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                      {t("hero.title")}
                    </h1>
                  </SlideContent>
                  <SlideContent delay={0.24}>
                    <p className="mx-auto mb-5 max-w-3xl text-[0.925rem] font-medium leading-relaxed text-white/85 min-[380px]:px-2 min-[380px]:text-base sm:mb-9 sm:px-0 sm:text-lg md:text-xl">
                      {t("hero.subtitle")}
                    </p>
                  </SlideContent>
                  <SlideContent delay={0.36}>
                    <div className="flex flex-col items-center justify-center gap-2 px-1 min-[380px]:px-4 sm:flex-row sm:gap-4 sm:px-0">
                      <HeroButton href="#solutions" label={t("hero.cta")} />
                      <HeroButton href="#contact" label={t("hero.contact")} secondary />
                    </div>
                  </SlideContent>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="avadaschool"
            className="absolute inset-0 bg-[#f8faf9]"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            role="group"
            aria-roledescription="slide"
            aria-label={t("hero.slideTwoLabel")}
          >
            <div className="absolute inset-x-0 -top-[30%] h-[130%] sm:inset-0 sm:h-full">
              <Image
                src="/images/cover-avadaschool.png"
                alt=""
                fill
                className="translate-x-[8%] object-cover object-[56%_center] sm:translate-x-0 sm:object-center"
                priority
                quality={95}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,#fff_61%,rgba(255,255,255,0.9)_63%,rgba(255,255,255,0)_69%)] sm:bg-gradient-to-r sm:from-white sm:via-white/75 sm:to-transparent" />
            </div>

            <div className="relative z-10 flex h-full items-center pb-24 pt-28 sm:pb-20 sm:pt-32">
              <div className="container px-5 sm:px-8 lg:px-12">
                <div className="max-w-[62%] text-left sm:max-w-xl lg:max-w-2xl">
                  <SlideContent delay={0}>
                    <span className="mb-3 inline-flex max-w-full rounded-full border border-[#20aa81]/25 bg-white/80 px-3 py-1.5 text-[10px] font-extrabold leading-tight text-[#137b5e] shadow-sm backdrop-blur-sm min-[380px]:text-[11px] sm:mb-5 sm:px-4 sm:py-2 sm:text-sm">
                      {t("hero.school.badge")}
                    </span>
                  </SlideContent>
                  <SlideContent delay={0.12}>
                    <h2 className="mb-3 max-w-2xl text-balance text-[1.55rem] font-extrabold leading-[1.08] text-slate-950 min-[380px]:text-[1.7rem] sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
                      {t("hero.school.title")}
                    </h2>
                  </SlideContent>
                  <SlideContent delay={0.24}>
                    <p className="mb-5 max-w-xl text-[0.82rem] font-medium leading-relaxed text-slate-700 min-[380px]:text-[0.9rem] sm:mb-9 sm:text-lg md:text-xl">
                      {t("hero.school.subtitle")}
                    </p>
                  </SlideContent>
                  <SlideContent delay={0.36}>
                    <Link href="https://www.avadaschool.com/login" target="_blank" rel="noreferrer">
                      <Button size="lg" className="h-auto max-w-full rounded-lg bg-[#20aa81] px-4 py-3 text-xs font-extrabold text-white shadow-lg shadow-[#20aa81]/20 transition-all duration-300 hover:bg-[#188d6c] hover:shadow-xl min-[380px]:text-sm sm:px-7 sm:py-4 sm:text-base">
                        {t("hero.school.cta")}
                        <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </Link>
                  </SlideContent>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-4 z-20 sm:bottom-8">
        <div className="container flex items-center justify-between px-5 sm:px-8">
          <div className="flex gap-2" aria-label={t("hero.slideNavigation")}>
            {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  activeSlide === index
                    ? "w-9 bg-primary"
                    : activeSlide === 0
                      ? "w-2.5 bg-white/60 hover:bg-white"
                      : "w-2.5 bg-slate-400/60 hover:bg-slate-600"
                }`}
                aria-label={t(index === 0 ? "hero.slideOneLabel" : "hero.slideTwoLabel")}
                aria-current={activeSlide === index ? "true" : undefined}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <CarouselButton onClick={showPrevious} label={t("hero.previousSlide")} dark={activeSlide === 0}>
              <ArrowLeft className="h-4 w-4" />
            </CarouselButton>
            <CarouselButton onClick={showNext} label={t("hero.nextSlide")} dark={activeSlide === 0}>
              <ArrowRight className="h-4 w-4" />
            </CarouselButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function SlideContent({ children, delay }: { children: React.ReactNode; delay: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

function HeroButton({ href, label, secondary = false }: { href: string; label: string; secondary?: boolean }) {
  return (
    <Link href={href} className="w-full max-w-xs sm:w-auto sm:max-w-none">
      <Button
        size="lg"
        variant={secondary ? "outline" : "default"}
        className={secondary
          ? "h-auto w-full rounded-lg border border-white/60 bg-white/95 px-6 py-3.5 text-sm font-extrabold text-primary shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-primary hover:shadow-xl sm:w-auto sm:px-7 sm:py-4 sm:text-base"
          : "h-auto w-full rounded-lg bg-primary px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl sm:w-auto sm:px-7 sm:py-4 sm:text-base"}
      >
        {label}
        {!secondary && <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />}
      </Button>
    </Link>
  );
}

function CarouselButton({ children, onClick, label, dark }: { children: React.ReactNode; onClick: () => void; label: string; dark: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:h-10 sm:w-10 ${
        dark
          ? "border-white/30 bg-black/20 text-white hover:bg-white/20"
          : "border-slate-300 bg-white/70 text-slate-800 hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}
