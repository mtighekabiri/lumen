"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { useLanguage, languages } from "@/context/language-context";

export function LanguageSwitcher() {
  const { language, setLanguage, currentLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 p-2 text-gray-600 hover:text-[#01b3d4] transition-colors rounded-full hover:bg-gray-100"
        aria-label="Switch language"
      >
        <Globe className="h-5 w-5" />
        <span className="text-xs font-medium uppercase hidden sm:inline">
          {currentLanguage.code}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${
                language === lang.code
                  ? "bg-[#01b3d4]/10 text-[#01b3d4] font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span>{lang.nativeName}</span>
              <span className="text-xs text-gray-400">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
