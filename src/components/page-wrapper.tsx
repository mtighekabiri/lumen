"use client";

import { useState, useSyncExternalStore, useCallback } from "react";
import { SplashScreen } from "./splash-screen";

interface PageWrapperProps {
  children: React.ReactNode;
}

// Hook to safely check sessionStorage on client
function useHasSeenSplash() {
  const subscribe = useCallback(() => {
    // No external changes to listen for, return empty cleanup
    return () => {};
  }, []);

  const getSnapshot = () => {
    return sessionStorage.getItem("hasSeenSplash") === "true";
  };

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function PageWrapper({ children }: PageWrapperProps) {
  const hasSeenSplash = useHasSeenSplash();
  const [showSplash, setShowSplash] = useState(!hasSeenSplash);

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
          visibility: showSplash && !hasSeenSplash ? "hidden" : "visible",
        }}
      >
        {children}
      </div>
    </>
  );
}
