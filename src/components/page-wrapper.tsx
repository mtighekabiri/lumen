"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { SplashScreen } from "./splash-screen";

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  // Start with splash showing to prevent flash
  const [showSplash, setShowSplash] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check sessionStorage after mount
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setShowSplash(false);
    }
    setIsReady(true);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("hasSeenSplash", "true");
  };

  // Always render splash on server/initial to prevent flash
  // The splash background matches the initial state
  return (
    <>
      {/* Splash screen - shows on top while active */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Main content - hidden while splash is showing */}
      <div
        style={{
          opacity: showSplash ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
          visibility: showSplash && !isReady ? "hidden" : "visible",
        }}
      >
        {children}
      </div>
    </>
  );
}
