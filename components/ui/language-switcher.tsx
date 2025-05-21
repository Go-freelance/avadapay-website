"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useI18n } from "@/locales/client";
import { cn } from "@/lib/utils";

const languages = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useI18n();
  const currentLocale = pathname.split("/")[1];

  const handleLanguageChange = (locale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
  };

  // Find current language to display in button
  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-3 rounded-full border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
        >
          <Globe className="h-4 w-4 text-primary mr-1.5" />
          <span className="text-sm font-medium text-gray-700">
            {currentLanguage.flag}
          </span>
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[180px] p-1.5 rounded-xl border border-gray-200 shadow-lg animate-in fade-in-80 zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={cn(
              "flex items-center gap-2.5 cursor-pointer rounded-lg py-2.5 px-3 transition-all duration-200",
              currentLocale === lang.code
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-gray-50 text-gray-700"
            )}
          >
            <span className="text-lg">{lang.flag}</span>
            <span
              className={cn(
                "font-medium",
                currentLocale === lang.code ? "text-primary" : ""
              )}
            >
              {lang.name}
            </span>
            {currentLocale === lang.code && (
              <span className="ml-auto h-2 w-2 rounded-full bg-primary"></span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
