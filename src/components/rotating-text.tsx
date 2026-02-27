"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/language-context";
import { t } from "@/lib/translations";

const wordKeys = [
  "home.rotatingWord.profit",
  "home.rotatingWord.sales",
  "home.rotatingWord.action",
  "home.rotatingWord.memory",
  "home.rotatingWord.choice",
];

export function RotatingText() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % wordKeys.length);
        setIsAnimating(false);
      }, 500);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative h-[1em] overflow-hidden align-bottom">
      <span
        className={`inline-block text-white transition-transform duration-500 ease-in-out ${
          isAnimating ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {t(language, wordKeys[currentIndex])}
      </span>
    </span>
  );
}
