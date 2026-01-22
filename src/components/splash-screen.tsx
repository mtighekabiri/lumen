"use client";

import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [animationPhase, setAnimationPhase] = useState<
    "initial" | "blink1" | "open1" | "blink2" | "reveal" | "zoom" | "done"
  >("initial");

  useEffect(() => {
    const timeline = [
      { phase: "blink1" as const, delay: 1000 },    // First blink after 1s
      { phase: "open1" as const, delay: 1200 },     // Open after blink
      { phase: "blink2" as const, delay: 2200 },    // Second blink
      { phase: "reveal" as const, delay: 2400 },    // Reveal white
      { phase: "zoom" as const, delay: 2600 },      // Start zoom
      { phase: "done" as const, delay: 3600 },      // Complete
    ];

    const timeouts = timeline.map(({ phase, delay }) =>
      setTimeout(() => setAnimationPhase(phase), delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (animationPhase === "done") {
      onComplete();
    }
  }, [animationPhase, onComplete]);

  const isBlinking = animationPhase === "blink1" || animationPhase === "blink2";
  const isRevealing = animationPhase === "reveal" || animationPhase === "zoom" || animationPhase === "done";
  const isZooming = animationPhase === "zoom" || animationPhase === "done";

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${
        animationPhase === "done" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ backgroundColor: "#01b3d4" }}
    >
      {/* Zoom container */}
      <div
        className={`transition-transform duration-1000 ease-in-out ${
          isZooming ? "scale-[50]" : "scale-100"
        }`}
      >
        {/* Eye SVG */}
        <svg
          viewBox="0 0 200 100"
          className="w-64 h-32 md:w-96 md:h-48"
          style={{ overflow: "visible" }}
        >
          {/* Eye outline - almond shape */}
          <defs>
            <clipPath id="eyeClip">
              <ellipse cx="100" cy="50" rx="80" ry="40" />
            </clipPath>
          </defs>

          {/* Eye white (sclera) */}
          <ellipse
            cx="100"
            cy="50"
            rx="80"
            ry="40"
            fill={isRevealing ? "#ffffff" : "#ffffff"}
            stroke="#0a4a5c"
            strokeWidth="3"
          />

          {/* Iris - positioned looking right */}
          <g
            clipPath="url(#eyeClip)"
            className={`transition-opacity duration-200 ${
              isRevealing ? "opacity-0" : "opacity-100"
            }`}
          >
            <circle
              cx="130"
              cy="50"
              r="30"
              fill="#0a4a5c"
            />
            {/* Pupil */}
            <circle
              cx="135"
              cy="50"
              r="15"
              fill="#051f29"
            />
            {/* Eye highlight */}
            <circle
              cx="140"
              cy="42"
              r="6"
              fill="#ffffff"
              opacity="0.8"
            />
            <circle
              cx="128"
              cy="55"
              r="3"
              fill="#ffffff"
              opacity="0.5"
            />
          </g>

          {/* Upper eyelid for blinking */}
          <ellipse
            cx="100"
            cy="50"
            rx="82"
            ry="42"
            fill="#01b3d4"
            className="transition-transform origin-center"
            style={{
              transform: isBlinking ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "100px 10px",
              transition: "transform 0.15s ease-in-out",
            }}
          />

          {/* Lower eyelid for blinking */}
          <ellipse
            cx="100"
            cy="50"
            rx="82"
            ry="42"
            fill="#01b3d4"
            className="transition-transform origin-center"
            style={{
              transform: isBlinking ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "100px 90px",
              transition: "transform 0.15s ease-in-out",
            }}
          />

          {/* Eyelashes - top */}
          <g
            stroke="#0a4a5c"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            className={`transition-opacity duration-200 ${
              isRevealing ? "opacity-0" : "opacity-100"
            }`}
          >
            <path d="M 30 35 Q 25 20 20 15" />
            <path d="M 50 20 Q 48 5 45 0" />
            <path d="M 75 12 Q 75 -5 73 -10" />
            <path d="M 100 8 Q 100 -8 100 -15" />
            <path d="M 125 12 Q 125 -5 127 -10" />
            <path d="M 150 20 Q 152 5 155 0" />
            <path d="M 170 35 Q 175 20 180 15" />
          </g>

          {/* Subtle lower lash line */}
          <path
            d="M 25 60 Q 100 95 175 60"
            stroke="#0a4a5c"
            strokeWidth="2"
            fill="none"
            className={`transition-opacity duration-200 ${
              isRevealing ? "opacity-0" : "opacity-100"
            }`}
          />
        </svg>
      </div>

      {/* White overlay for final transition */}
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-500 ${
          isZooming ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
