import { useState, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] {
  // État pour stocker notre valeur
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Fonction pour lire la valeur du localStorage
  const getValue = (): T => {
    try {
      if (typeof window === "undefined") {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(
        `Erreur lors de la lecture du localStorage pour la clé "${key}":`,
        error
      );
      return initialValue;
    }
  };

  // Fonction pour définir la valeur
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(
        `Erreur lors de l'écriture du localStorage pour la clé "${key}":`,
        error
      );
    }
  };

  // Fonction pour supprimer la valeur
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(
        `Erreur lors de la suppression du localStorage pour la clé "${key}":`,
        error
      );
    }
  };

  // Charger la valeur initiale depuis le localStorage
  useEffect(() => {
    setStoredValue(getValue());
  }, []);

  return [storedValue, setValue, removeValue];
}
