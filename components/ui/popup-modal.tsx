"use client";
import { Zap } from "lucide-react";
import {
  FaX,
  FaShield,
  FaClock,
  FaCircleCheck,
  FaArrowRight,
} from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDismiss: (permanent?: boolean) => void;
  title: string;
  message: string;
  ctaText: string;
  ctaLink: string;
  dismissText?: string;
  permanentDismissText?: string;
  subtitle: string;
  badgeMobile: string;
  badgeDesktop: string;
  integrationTitle: string;
  integrationDescription: string;
  supportTitle: string;
  supportDescription: string;
  statsPartners: string;
  statsAvailability: string;
  statsCountries: string;
}

export function PopupModal({
  isOpen,
  onClose,
  onDismiss,
  title,
  message,
  ctaText,
  ctaLink,
  dismissText,
  permanentDismissText,
  subtitle,
  badgeMobile,
  badgeDesktop,
  integrationTitle,
  integrationDescription,
  supportTitle,
  supportDescription,
  statsPartners,
  statsAvailability,
  statsCountries,
}: PopupModalProps) {
  const handleCtaClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      onClose();
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 10,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-sm sm:max-w-md lg:max-w-4xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-gray-100 my-4 sm:my-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Layout responsive : mobile stack, desktop side-by-side */}
            <div className="lg:flex lg:min-h-[400px] max-h-[90vh] lg:max-h-[600px]">
              {/* Header - Left side on desktop */}
              <div className="relative bg-gradient-to-br from-dark to-gray-800 px-4 sm:px-6 py-6 sm:py-8 lg:py-12 text-white overflow-hidden lg:w-2/5 lg:flex lg:flex-col lg:justify-center">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6 mt-10 lg:mt-0">
                    <div className="p-2 sm:p-3 lg:p-4 bg-avada-500/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-avada-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold leading-tight">
                        {title}
                      </h2>
                      <p className="text-white/80 text-xs sm:text-sm lg:text-base">
                        {subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Message principal - visible sur desktop */}
                  <div className="hidden lg:block">
                    <p className="text-white/90 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base xl:text-lg">
                      {message}
                    </p>

                    {/* Badge d'agrément plus visible sur desktop */}
                    <div className="inline-flex items-center bg-avada-500/20 backdrop-blur-sm rounded-full px-3 lg:px-4 py-1.5 lg:py-2">
                      <FaShield className="w-3 h-3 lg:w-4 lg:h-4 text-avada-400 mr-1.5 lg:mr-2" />
                      <span className="text-xs lg:text-sm font-medium text-avada-400">
                        {badgeDesktop}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Badge d'agrément mobile */}
                <div className="absolute top-4 left-4 bg-avada-500/20 backdrop-blur-sm rounded-full px-3 py-1 lg:hidden">
                  <span className="text-xs font-medium text-avada-400">
                    {badgeMobile}
                  </span>
                </div>
              </div>

              {/* Contenu - Right side on desktop */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors z-10"
                aria-label="Fermer"
              >
                <FaX className="w-4 h-4 text-white" />
              </button>
              <div className="px-4 sm:px-6 py-4 sm:py-6 lg:py-12 lg:px-8 xl:px-12 lg:w-3/5 lg:flex lg:flex-col lg:justify-center overflow-y-auto">
                {/* Message pour mobile uniquement */}
                <div className="lg:hidden">
                  <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {message}
                  </p>
                </div>

                {/* Avantages AvadaPay */}
                <div className="grid gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                  <div className="flex items-center gap-3 lg:gap-4 p-2.5 sm:p-3 lg:p-4 bg-gray-50 rounded-lg">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-avada-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaClock className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-avada-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base block">
                        {integrationTitle}
                      </span>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600">
                        {integrationDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 lg:gap-4 p-2.5 sm:p-3 lg:p-4 bg-gray-50 rounded-lg">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-avada-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaCircleCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-avada-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-medium text-gray-900 text-xs sm:text-sm lg:text-base block">
                        {supportTitle}
                      </span>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600">
                        {supportDescription}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Statistiques rapides */}
                <div className="bg-avada-500/5 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8 border border-avada-500/10">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                    <div>
                      <div className="text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold text-dark">
                        100+
                      </div>
                      <div className="text-xs lg:text-sm text-gray-600">
                        {statsPartners}
                      </div>
                    </div>
                    <div>
                      <div className="text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold text-dark">
                        99.9%
                      </div>
                      <div className="text-xs lg:text-sm text-gray-600">
                        {statsAvailability}
                      </div>
                    </div>
                    <div>
                      <div className="text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold text-dark">
                        17+
                      </div>
                      <div className="text-xs lg:text-sm text-gray-600">
                        {statsCountries}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  <Button
                    onClick={handleCtaClick}
                    className="w-full bg-avada-500 hover:bg-avada-600 text-white font-semibold py-2.5 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] group text-xs sm:text-sm lg:text-base"
                  >
                    {ctaText}
                    <FaArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 transition-transform group-hover:translate-x-1" />
                  </Button>

                  <div className="flex gap-1 sm:gap-2 pt-1 sm:pt-2">
                    {dismissText && (
                      <button
                        onClick={() => onDismiss(false)}
                        className="flex-1 px-2 sm:px-4 py-1.5 sm:py-2 lg:py-3 text-xs sm:text-sm lg:text-base text-gray-500 hover:text-gray-700 transition-colors rounded-md sm:rounded-lg hover:bg-gray-50"
                      >
                        {dismissText}
                      </button>
                    )}
                    {permanentDismissText && (
                      <button
                        onClick={() => onDismiss(true)}
                        className="flex-1 px-2 sm:px-4 py-1.5 sm:py-2 lg:py-3 text-xs sm:text-sm lg:text-base text-gray-400 hover:text-gray-600 transition-colors rounded-md sm:rounded-lg hover:bg-gray-50"
                      >
                        {permanentDismissText}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
