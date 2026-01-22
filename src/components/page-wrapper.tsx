"use client";

import { useState, useEffect } from "react";
import { SplashScreen } from "./splash-screen";

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check if user has seen splash this session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("hasSeenSplash", "true");
  };

  // Prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#01b3d4]" />
    );
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div
        className={`transition-opacity duration-500 ${
          showSplash ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
