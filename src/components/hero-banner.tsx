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
        className="relative w-full aspect-[9/12] md:aspect-[16/7] overflow-hidden"
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

        {/* Attention timer — top left */}
        <span className="absolute top-4 left-4 sm:top-6 sm:left-6 font-mono text-3xl sm:text-4xl font-bold text-[#01b3d4] tabular-nums drop-shadow-lg z-10">
          {seconds.toFixed(1)}s
        </span>

        {/* Overlay content */}
        {children && (
          <div className="absolute inset-0">
            {children}
          </div>
        )}

      </div>
    </div>
  );
}
