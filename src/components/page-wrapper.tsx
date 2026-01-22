"use client";

import { useState, useEffect } from "react";
import { SplashScreen } from "./splash-screen";

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const [showSplash, setShowSplash] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if user has seen splash this session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (!hasSeenSplash) {
      setShowSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("hasSeenSplash", "true");
  };

  return (
    <>
      {mounted && showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div
        className={`transition-opacity duration-500 ${
          mounted && showSplash ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
