"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

export type LanguageCode = "en" | "zh" | "hi" | "es" | "fr" | "ar" | "bn" | "pt" | "ru" | "ja";

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  dir?: "ltr" | "rtl";
}

export const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
];

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentLanguage: Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "lumen-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (saved && languages.some((l) => l.code === saved)) {
      setLanguageState(saved);
    }
    setMounted(true);
  }, []);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    const langObj = languages.find((l) => l.code === lang);
    document.documentElement.dir = langObj?.dir === "rtl" ? "rtl" : "ltr";
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language;
      const langObj = languages.find((l) => l.code === language);
      document.documentElement.dir = langObj?.dir === "rtl" ? "rtl" : "ltr";
    }
  }, [language, mounted]);

  const currentLanguage = languages.find((l) => l.code === language) || languages[0];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
