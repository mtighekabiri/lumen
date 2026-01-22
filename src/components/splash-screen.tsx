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
      { phase: "blink1" as const, delay: 1000 },
      { phase: "open1" as const, delay: 1200 },
      { phase: "blink2" as const, delay: 2200 },
      { phase: "reveal" as const, delay: 2400 },
      { phase: "zoom" as const, delay: 2600 },
      { phase: "done" as const, delay: 3600 },
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
        {/* Professional Eye SVG - larger and more intricate */}
        <svg
          viewBox="0 0 300 150"
          className="w-80 h-40 md:w-[500px] md:h-[250px]"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Clip path for eye shape */}
            <clipPath id="eyeClip">
              <path d="M 30 75 Q 150 0 270 75 Q 150 150 30 75 Z" />
            </clipPath>

            {/* Gradient for iris depth */}
            <radialGradient id="irisGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0d5c6e" />
              <stop offset="40%" stopColor="#0a4a5c" />
              <stop offset="70%" stopColor="#073845" />
              <stop offset="100%" stopColor="#052530" />
            </radialGradient>

            {/* Gradient for iris detail rings */}
            <radialGradient id="irisDetailGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="60%" stopColor="rgba(1, 179, 212, 0.15)" />
              <stop offset="100%" stopColor="rgba(1, 179, 212, 0.3)" />
            </radialGradient>

            {/* Pupil gradient */}
            <radialGradient id="pupilGradient" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#0a2530" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>

            {/* Sclera gradient for realism */}
            <radialGradient id="scleraGradient" cx="60%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f8f8f8" />
              <stop offset="100%" stopColor="#e8e8e8" />
            </radialGradient>

            {/* Subtle shadow for depth */}
            <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
              <feOffset dx="0" dy="2" result="offsetBlur" />
              <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
            </filter>
          </defs>

          {/* Eye shape outline */}
          <path
            d="M 30 75 Q 150 0 270 75 Q 150 150 30 75 Z"
            fill="url(#scleraGradient)"
            stroke="#0a4a5c"
            strokeWidth="2.5"
          />

          {/* Inner eye content - clipped */}
          <g clipPath="url(#eyeClip)">
            {/* Subtle vein details on sclera */}
            <g
              className={`transition-opacity duration-200 ${
                isRevealing ? "opacity-0" : "opacity-100"
              }`}
            >
              <path
                d="M 40 70 Q 60 65 80 72"
                stroke="rgba(200, 180, 180, 0.3)"
                strokeWidth="0.5"
                fill="none"
              />
              <path
                d="M 45 80 Q 55 82 70 78"
                stroke="rgba(200, 180, 180, 0.25)"
                strokeWidth="0.4"
                fill="none"
              />
            </g>

            {/* Iris - positioned looking right */}
            <g
              className={`transition-opacity duration-300 ${
                isRevealing ? "opacity-0" : "opacity-100"
              }`}
            >
              {/* Main iris circle */}
              <circle
                cx="185"
                cy="75"
                r="45"
                fill="url(#irisGradient)"
              />

              {/* Iris texture rings */}
              <circle
                cx="185"
                cy="75"
                r="44"
                fill="none"
                stroke="rgba(1, 179, 212, 0.2)"
                strokeWidth="0.5"
              />
              <circle
                cx="185"
                cy="75"
                r="38"
                fill="none"
                stroke="rgba(1, 179, 212, 0.15)"
                strokeWidth="0.5"
              />
              <circle
                cx="185"
                cy="75"
                r="32"
                fill="none"
                stroke="rgba(1, 179, 212, 0.2)"
                strokeWidth="0.5"
              />

              {/* Iris fiber patterns - radiating lines */}
              {[...Array(24)].map((_, i) => {
                const angle = (i * 15 * Math.PI) / 180;
                const x1 = 185 + Math.cos(angle) * 20;
                const y1 = 75 + Math.sin(angle) * 20;
                const x2 = 185 + Math.cos(angle) * 43;
                const y2 = 75 + Math.sin(angle) * 43;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(1, 179, 212, 0.15)"
                    strokeWidth="0.8"
                  />
                );
              })}

              {/* Limbal ring (dark edge of iris) */}
              <circle
                cx="185"
                cy="75"
                r="45"
                fill="none"
                stroke="#052530"
                strokeWidth="2"
              />

              {/* Pupil */}
              <circle
                cx="190"
                cy="75"
                r="18"
                fill="url(#pupilGradient)"
              />

              {/* Catchlight reflections */}
              <ellipse
                cx="198"
                cy="65"
                rx="8"
                ry="10"
                fill="#ffffff"
                opacity="0.9"
              />
              <circle
                cx="178"
                cy="82"
                r="4"
                fill="#ffffff"
                opacity="0.5"
              />
              <circle
                cx="195"
                cy="85"
                r="2"
                fill="#ffffff"
                opacity="0.3"
              />
            </g>
          </g>

          {/* Upper eyelid for blinking */}
          <path
            d="M 25 75 Q 150 -5 275 75 L 275 0 L 25 0 Z"
            fill="#01b3d4"
            style={{
              transform: isBlinking ? "translateY(0)" : "translateY(-80px)",
              transition: "transform 0.15s ease-in-out",
            }}
          />

          {/* Lower eyelid for blinking */}
          <path
            d="M 25 75 Q 150 155 275 75 L 275 155 L 25 155 Z"
            fill="#01b3d4"
            style={{
              transform: isBlinking ? "translateY(0)" : "translateY(80px)",
              transition: "transform 0.15s ease-in-out",
            }}
          />

          {/* Subtle eye shape shadow/definition - no lashes */}
          <path
            d="M 30 75 Q 150 0 270 75"
            fill="none"
            stroke="#0a4a5c"
            strokeWidth="1"
            opacity="0.3"
            className={`transition-opacity duration-200 ${
              isRevealing ? "opacity-0" : "opacity-100"
            }`}
          />
          <path
            d="M 30 75 Q 150 150 270 75"
            fill="none"
            stroke="#0a4a5c"
            strokeWidth="1"
            opacity="0.2"
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
