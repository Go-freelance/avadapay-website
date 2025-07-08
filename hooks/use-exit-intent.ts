import { useEffect, useState } from "react";

export function useExitIntent(): boolean {
  const [showExitIntent, setShowExitIntent] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Détecter si la souris quitte par le haut de la page (vers la barre d'adresse)
      if (e.clientY <= 0) {
        setShowExitIntent(true);
      }
    };

    const handleMouseEnter = () => {
      // Réinitialiser si la souris revient dans la page
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        setShowExitIntent(false);
      }, 1000);
    };

    // Ajouter les événements seulement côté client
    if (typeof window !== "undefined") {
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("mouseenter", handleMouseEnter);
    }

    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("mouseleave", handleMouseLeave);
        document.removeEventListener("mouseenter", handleMouseEnter);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return showExitIntent;
}
