"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
} from "react";
import {
  PopupContextType,
  PopupState,
  PopupConfig,
  PopupContent,
} from "@/types/popup";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { usePopupTrigger } from "@/hooks/use-popup-trigger";
import { useI18n } from "@/locales/client";

const PopupContext = createContext<PopupContextType | null>(null);

interface PopupProviderProps {
  children: React.ReactNode;
}

const DEFAULT_CONFIG: PopupConfig = {
  triggers: [
    { type: "time", value: 15 }, // 15 secondes
    { type: "scroll", value: 50 }, // 50% de scroll
    { type: "exit-intent" },
    { type: "inactivity", value: 60 }, // 1 minute
  ],
  maxShowsPerSession: 1,
  cooldownHours: 24,
  persistDismissal: true,
};

const INITIAL_STATE: PopupState = {
  isVisible: false,
  hasBeenShown: false,
  hasBeenDismissed: false,
  dismissedPermanently: false,
};

type PersistentState = {
  dismissedPermanently: boolean;
  lastShownAt?: number;
  sessionShows: number;
};

export function PopupProvider({ children }: PopupProviderProps) {
  const t = useI18n();

  // État persistant dans localStorage
  const [persistentState, setPersistentState] =
    useLocalStorage<PersistentState>("avadapay-popup-state", {
      dismissedPermanently: false,
      sessionShows: 0,
    });

  // État local pour la session
  const [state, setState] = React.useState<PopupState>(() => ({
    ...INITIAL_STATE,
    dismissedPermanently: persistentState.dismissedPermanently,
  }));

  // Configuration du popup
  const config = DEFAULT_CONFIG;

  // Contenu du popup avec traductions
  const content: PopupContent = {
    title: t("popup.title"),
    message: t("popup.message"),
    ctaText: t("popup.ctaText"),
    ctaLink: "#contact",
    dismissText: t("popup.dismissText"),
    permanentDismissText: t("popup.permanentDismissText"),
    subtitle: t("popup.subtitle"),
    badgeMobile: t("popup.badge.mobile"),
    badgeDesktop: t("popup.badge.desktop"),
    integrationTitle: t("popup.feature.integration.title"),
    integrationDescription: t("popup.feature.integration.description"),
    supportTitle: t("popup.feature.support.title"),
    supportDescription: t("popup.feature.support.description"),
    statsPartners: t("popup.stats.partners"),
    statsAvailability: t("popup.stats.availability"),
    statsCountries: t("popup.stats.countries"),
  };

  // Vérifier si le popup peut être affiché
  const canShowPopup = useCallback(() => {
    const now = Date.now();
    const { lastShownAt, sessionShows } = persistentState;

    // Si fermé définitivement
    if (persistentState.dismissedPermanently) return false;

    // Si déjà affiché dans cette session
    if (state.hasBeenShown || state.hasBeenDismissed) return false;

    // Limite par session
    if (sessionShows >= config.maxShowsPerSession) return false;

    // Période de refroidissement
    if (
      lastShownAt &&
      now - lastShownAt < config.cooldownHours * 60 * 60 * 1000
    ) {
      return false;
    }

    return true;
  }, [persistentState, state, config]);

  // Callback pour déclencher le popup
  const handleTrigger = useCallback(() => {
    if (canShowPopup()) {
      setState((prev) => ({ ...prev, isVisible: true, hasBeenShown: true }));
      setPersistentState({
        ...persistentState,
        lastShownAt: Date.now(),
        sessionShows: persistentState.sessionShows + 1,
      });
    }
  }, [canShowPopup, setPersistentState, persistentState]);

  // Hook pour gérer les déclencheurs
  const { reset: resetTriggers } = usePopupTrigger({
    triggers: config.triggers,
    enabled: canShowPopup(),
    onTrigger: handleTrigger,
  });

  // Actions du contexte
  const showPopup = useCallback(() => {
    if (canShowPopup()) {
      setState((prev) => ({ ...prev, isVisible: true }));
    }
  }, [canShowPopup]);

  const hidePopup = useCallback(() => {
    setState((prev) => ({ ...prev, isVisible: false }));
  }, []);

  const dismissPopup = useCallback(
    (permanent = false) => {
      setState((prev) => ({
        ...prev,
        isVisible: false,
        hasBeenDismissed: true,
        dismissedPermanently: permanent,
      }));

      if (permanent) {
        setPersistentState({
          ...persistentState,
          dismissedPermanently: true,
        });
      }
    },
    [setPersistentState]
  );

  const resetPopup = useCallback(() => {
    setState(INITIAL_STATE);
    setPersistentState({
      dismissedPermanently: false,
      sessionShows: 0,
    });
    resetTriggers();
  }, [setPersistentState, resetTriggers]);

  // Synchroniser l'état persistant avec l'état local
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      dismissedPermanently: persistentState.dismissedPermanently,
    }));
  }, [persistentState.dismissedPermanently]);

  const contextValue: PopupContextType = {
    state,
    config,
    content,
    showPopup,
    hidePopup,
    dismissPopup,
    resetPopup,
  };

  return (
    <PopupContext.Provider value={contextValue}>
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup(): PopupContextType {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup doit être utilisé dans un PopupProvider");
  }
  return context;
}
