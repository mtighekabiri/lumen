"use client";

import { useEffect, useRef, useState } from "react";

interface HeroBannerProps {
  children?: React.ReactNode;
}

export function HeroBanner({ children }: HeroBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [seconds, setSeconds] = useState(0);
  const isVisibleRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    observer.observe(el);

    intervalRef.current = setInterval(() => {
      if (isVisibleRef.current) {
        setSeconds((s) => +(s + 0.1).toFixed(1));
      }
    }, 100);

    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="relative w-full pt-16">
      {/* Video container: ~52.5% of original 16:9 height on desktop, 9:12 on mobile */}
      <div
        ref={bannerRef}
        className="relative w-full aspect-[9/12] md:aspect-[16/4.725] overflow-hidden"
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/hero-banner.mp4" type="video/mp4" />
        </video>

        {/* Attention timer — top right */}
        <span className="absolute top-4 right-4 sm:top-6 sm:right-6 font-mono text-3xl sm:text-4xl font-bold text-[#01b3d4] tabular-nums drop-shadow-lg z-10">
          {seconds.toFixed(1)}s
        </span>

        {/* Overlay content */}
        {children && (
          <div className="absolute inset-0 flex items-center justify-center">
            {children}
          </div>
        )}

        {/* White tab with Lumen logo — overlaps bottom of video */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-white px-8 pt-4 pb-0 rounded-t-2xl flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Lumen"
              className="h-8 sm:h-10 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Headline + description below logo tab */}
      <div className="bg-white text-center px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
          The Attention Technology Company
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-gray-600 leading-relaxed">
          Lumen uses predictive eye-tracking and machine learning to measure
          what people actually look at — not just what&apos;s on screen. We help
          brands, agencies, and platforms understand and optimise attention
          across every channel, turning visibility into real business outcomes.
        </p>
      </div>
    </div>
  );
}
