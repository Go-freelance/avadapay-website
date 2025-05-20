"use client";

import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { Button } from "./button";
import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();
  const router = useRouter();

  const handleLocaleChange = async () => {
    const newLocale = currentLocale === "fr" ? "en" : "fr";
    await changeLocale(newLocale);
    router.push(`/${newLocale}`);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleLocaleChange}
      className="relative"
    >
      <Globe className="h-5 w-5" />
      <span className="sr-only">
        {currentLocale === "fr" ? "Switch to English" : "Passer en Français"}
      </span>
    </Button>
  );
}
