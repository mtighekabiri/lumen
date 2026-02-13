"use client";

import { useState, useEffect } from "react";

const words = [
  "action",
  "conversion",
  "awareness",
  "consideration",
  "profit",
  "sales",
  "memory",
];

export function RotatingText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 500);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative h-[1em] overflow-hidden align-bottom">
      <span
        className={`inline-block text-[#01b3d4] transition-transform duration-500 ease-in-out ${
          isAnimating ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {words[currentIndex]}
      </span>
    </span>
  );
}
