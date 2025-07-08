"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
];

const detectBrowserLanguage = (): string => {
  if (typeof window === "undefined") return "en";

  const browserLang = navigator.language.split("-")[0].toLowerCase();
  const supportedLanguages = languages.map((lang) => lang.code);

  return supportedLanguages.includes(browserLang) ? browserLang : "en";
};

const setLanguageCookie = (locale: string): void => {
  try {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
  } catch (error) {
    console.warn("Failed to set language cookie:", error);
  }
};

const getLanguageCookie = (): string | null => {
  if (typeof document === "undefined") return null;

  try {
    const cookies = document.cookie.split(";");
    const localeCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("NEXT_LOCALE=")
    );
    return localeCookie ? localeCookie.split("=")[1] : null;
  } catch (error) {
    console.warn("Failed to read language cookie:", error);
    return null;
  }
};

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  // Initialize current language
  useEffect(() => {
    const savedLocale = getLanguageCookie();
    const browserLocale = detectBrowserLanguage();
    const activeLocale = locale || savedLocale || browserLocale;

    const language =
      languages.find((lang) => lang.code === activeLocale) || languages[0];
    setCurrentLanguage(language);

    // Set cookie if not already set
    if (!savedLocale) {
      setLanguageCookie(language.code);
    }
  }, [locale]);

  const handleLanguageChange = (language: Language) => {
    try {
      setCurrentLanguage(language);
      setLanguageCookie(language.code);
      setIsOpen(false);

      // Navigate to the new locale
      const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";
      const newPath = `/${language.code}${pathWithoutLocale}`;
      router.push(newPath);
    } catch (error) {
      console.error("Failed to change language:", error);
      // Fallback: at least close the dropdown
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeDropdown();
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!currentLanguage) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-9 w-9 rounded-full"
        disabled
      >
        <Globe className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        onClick={toggleDropdown}
        className="h-9 px-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-md shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
        aria-label={`Current language: ${currentLanguage.name}. Click to change language.`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg leading-none">{currentLanguage.flag}</span>
          <span className="text-sm font-medium text-charcoal">
            {currentLanguage.code.toUpperCase()}
          </span>
          <ChevronDown
            className={`h-3 w-3 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={closeDropdown} />
          <div
            className="absolute top-full right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
            role="listbox"
            aria-label="Language selection"
          >
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:bg-primary focus:text-white group ${
                    currentLanguage.code === language.code
                      ? "bg-primary text-white"
                      : "text-charcoal"
                  }`}
                  role="option"
                  aria-selected={currentLanguage.code === language.code}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg leading-none">
                      {language.flag}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{language.name}</div>
                      <div
                        className={`text-xs ${
                          currentLanguage.code === language.code
                            ? "text-white/80"
                            : "text-gray-500 group-hover:text-gray-600 group-focus:text-white/80"
                        }`}
                      >
                        {language.nativeName}
                      </div>
                    </div>
                    {currentLanguage.code === language.code && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
