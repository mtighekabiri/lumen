"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

interface EyeProps {
  x: number;
  y: number;
  mouseX: number;
  mouseY: number;
  size: number;
  isHovering: boolean;
}

function Eye({ x, y, mouseX, mouseY, size, isHovering }: EyeProps) {
  // Calculate the angle from the eye to the mouse
  const dx = mouseX - x;
  const dy = mouseY - y;
  const angle = Math.atan2(dy, dx);

  // Calculate pupil offset (limited to stay within eye)
  const maxOffset = size * 0.25;
  const distance = Math.min(Math.sqrt(dx * dx + dy * dy) / 10, maxOffset);
  const pupilX = Math.cos(angle) * distance;
  const pupilY = Math.sin(angle) * distance;

  return (
    <div
      className="relative transition-all duration-300"
      style={{
        width: size,
        height: size * 0.5,
      }}
    >
      {/* Eye shape - almond/half-circle like the image */}
      <svg
        viewBox="0 0 100 50"
        className="w-full h-full"
        style={{ overflow: "visible" }}
      >
        {/* Eye white (sclera) - half circle shape */}
        <path
          d="M 5 25 Q 50 -15 95 25 Q 50 50 5 25 Z"
          fill={isHovering ? "#01b3d4" : "#ffffff"}
          className="transition-all duration-500"
        />

        {/* Pupil/Iris - follows mouse */}
        <g
          style={{
            transform: `translate(${pupilX}px, ${pupilY}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <circle
            cx="50"
            cy="25"
            r="12"
            fill={isHovering ? "#015c6e" : "#1a1a1a"}
            className="transition-colors duration-500"
          />
        </g>
      </svg>
    </div>
  );
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverProgress, setHoverProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Set up dimensions and mouse tracking on mount
  useEffect(() => {
    setIsMounted(true);
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle button hover - start 5 second timer
  const handleButtonEnter = useCallback(() => {
    setIsHovering(true);
    setHoverProgress(0);

    // Start progress animation
    let progress = 0;
    progressIntervalRef.current = setInterval(() => {
      progress += 2; // 2% every 100ms = 5 seconds total
      setHoverProgress(Math.min(progress, 100));
    }, 100);

    // Auto-enter after 5 seconds
    hoverTimerRef.current = setTimeout(() => {
      handleEnter();
    }, 5000);
  }, []);

  const handleButtonLeave = useCallback(() => {
    setIsHovering(false);
    setHoverProgress(0);

    // Clear timers
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const handleEnter = useCallback(() => {
    // Clear any pending timers
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  }, [onComplete]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  // Generate eye grid
  const eyeSize = 80;
  const rows = Math.ceil(dimensions.height / (eyeSize * 0.6)) + 2;
  const cols = Math.ceil(dimensions.width / eyeSize) + 2;

  const eyes = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Offset every other row for staggered effect
      const offsetX = row % 2 === 0 ? 0 : eyeSize / 2;
      const x = col * eyeSize + offsetX - eyeSize;
      const y = row * (eyeSize * 0.6) - eyeSize * 0.3;

      eyes.push(
        <div
          key={`${row}-${col}`}
          className="absolute"
          style={{
            left: x,
            top: y,
          }}
        >
          <Eye
            x={x + eyeSize / 2}
            y={y + eyeSize * 0.25}
            mouseX={mousePos.x}
            mouseY={mousePos.y}
            size={eyeSize}
            isHovering={isHovering}
          />
        </div>
      );
    }
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#1a1a1a]" />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[100] overflow-hidden transition-opacity duration-700 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
      style={{
        backgroundColor: "#1a1a1a",
      }}
    >
      {/* Background color transition - radial from center */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: isHovering
            ? `radial-gradient(circle at 50% 50%, #01b3d4 0%, #01b3d4 ${hoverProgress}%, transparent ${hoverProgress + 10}%)`
            : "transparent",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Eye grid */}
      <div className="absolute inset-0">
        {eyes}
      </div>

      {/* Center button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={handleEnter}
          onMouseEnter={handleButtonEnter}
          onMouseLeave={handleButtonLeave}
          className={`relative px-12 py-4 text-2xl font-bold tracking-wider transition-all duration-500 ${
            isHovering
              ? "bg-[#01b3d4] text-white scale-110 shadow-2xl shadow-[#01b3d4]/50"
              : "bg-white text-gray-900 hover:scale-105"
          }`}
          style={{
            clipPath: "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)",
          }}
        >
          {/* Progress ring */}
          {isHovering && (
            <svg
              className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)]"
              viewBox="0 0 100 100"
              style={{ transform: "rotate(-90deg)" }}
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeDasharray={`${hoverProgress * 2.83} 283`}
                className="transition-all duration-100"
              />
            </svg>
          )}

          <span className="relative z-10">LUMEN</span>

          {/* Animated glow effect when hovering */}
          {isHovering && (
            <div className="absolute inset-0 animate-pulse bg-white/20" />
          )}
        </button>
      </div>

      {/* Instructions */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-center transition-opacity duration-500 ${
          isHovering ? "opacity-0" : "opacity-70"
        }`}
      >
        <p className="text-white/60 text-sm">
          Move your cursor to see the eyes follow
        </p>
        <p className="text-white/40 text-xs mt-1">
          Click or hover on LUMEN to enter
        </p>
      </div>

      {/* White overlay for exit transition */}
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-500 pointer-events-none ${
          isExiting ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
