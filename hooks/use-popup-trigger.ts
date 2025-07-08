import { useEffect, useState, useCallback } from "react";
import { PopupTrigger } from "@/types/popup";
import { useExitIntent } from "./use-exit-intent";

interface UsePopupTriggerProps {
  triggers: PopupTrigger[];
  enabled: boolean;
  onTrigger: () => void;
}

export function usePopupTrigger({
  triggers,
  enabled,
  onTrigger,
}: UsePopupTriggerProps) {
  const [hasTriggered, setHasTriggered] = useState(false);
  const exitIntent = useExitIntent();

  // Gestionnaire de scroll
  const handleScroll = useCallback(() => {
    if (!enabled || hasTriggered) return;

    const scrollPercent =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    const scrollTrigger = triggers.find((t) => t.type === "scroll");

    if (scrollTrigger && scrollPercent >= (scrollTrigger.value || 50)) {
      setHasTriggered(true);
      onTrigger();
    }
  }, [triggers, enabled, hasTriggered, onTrigger]);

  // Gestionnaire d'inactivité
  const handleUserActivity = useCallback(() => {
    if (!enabled || hasTriggered) return;

    // Réinitialiser le timer d'inactivité
    const inactivityTrigger = triggers.find((t) => t.type === "inactivity");
    if (!inactivityTrigger) return;

    const timeoutId = setTimeout(() => {
      if (!hasTriggered) {
        setHasTriggered(true);
        onTrigger();
      }
    }, (inactivityTrigger.value || 180) * 1000); // 3 minutes par défaut

    return () => clearTimeout(timeoutId);
  }, [triggers, enabled, hasTriggered, onTrigger]);

  useEffect(() => {
    if (!enabled || hasTriggered) return;

    // Déclencheur temporel
    const timeTrigger = triggers.find((t) => t.type === "time");
    if (timeTrigger) {
      const timeoutId = setTimeout(() => {
        if (!hasTriggered) {
          setHasTriggered(true);
          onTrigger();
        }
      }, (timeTrigger.value || 30) * 1000); // 30 secondes par défaut

      return () => clearTimeout(timeoutId);
    }
  }, [triggers, enabled, hasTriggered, onTrigger]);

  useEffect(() => {
    if (!enabled || hasTriggered) return;

    // Déclencheur de scroll
    const scrollTrigger = triggers.find((t) => t.type === "scroll");
    if (scrollTrigger) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [triggers, enabled, hasTriggered, handleScroll]);

  useEffect(() => {
    if (!enabled || hasTriggered) return;

    // Déclencheur d'inactivité
    const inactivityTrigger = triggers.find((t) => t.type === "inactivity");
    if (inactivityTrigger) {
      const events = [
        "mousedown",
        "mousemove",
        "keypress",
        "scroll",
        "touchstart",
      ];

      events.forEach((event) => {
        document.addEventListener(event, handleUserActivity, true);
      });

      const cleanup = handleUserActivity();

      return () => {
        events.forEach((event) => {
          document.removeEventListener(event, handleUserActivity, true);
        });
        if (cleanup) cleanup();
      };
    }
  }, [triggers, enabled, hasTriggered, handleUserActivity]);

  // Déclencheur d'intention de sortie
  useEffect(() => {
    if (!enabled || hasTriggered) return;

    const exitIntentTrigger = triggers.find((t) => t.type === "exit-intent");
    if (exitIntentTrigger && exitIntent) {
      setHasTriggered(true);
      onTrigger();
    }
  }, [exitIntent, triggers, enabled, hasTriggered, onTrigger]);

  const reset = useCallback(() => {
    setHasTriggered(false);
  }, []);

  return { hasTriggered, reset };
}
