"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LumenMediaCreative() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const [seconds, setSeconds] = useState(0);
  const isVisibleRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const el = mediaRef.current;
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
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-200 rounded-2xl overflow-hidden">
          {/* Left — Lumen Media */}
          <div
            ref={mediaRef}
            className="relative flex flex-col items-end text-right p-10 sm:p-14 bg-gray-50"
          >
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Lumen
            </h3>
            <p className="text-4xl sm:text-5xl font-bold text-[#01b3d4] mt-1">
              Media
            </p>
            <p className="mt-4 text-gray-600 max-w-sm">
              Optimise your media investments with attention data. Buy smarter,
              measure better, and maximise every impression.
            </p>
            <Link href="/news">
              <Button variant="outline" className="mt-6">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            {/* Visibility timer */}
            <span className="absolute bottom-4 left-4 font-mono text-sm text-gray-400 tabular-nums">
              {seconds.toFixed(1)}s
            </span>
          </div>

          {/* Right — Lumen Creative with heatmap background */}
          <div className="relative flex flex-col items-start text-left p-10 sm:p-14 border-t md:border-t-0 md:border-l border-gray-200 overflow-hidden">
            {/* Heatmap background layer */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: [
                  "radial-gradient(ellipse 35% 40% at 50% 30%, rgba(255,0,0,0.28) 0%, transparent 100%)",
                  "radial-gradient(ellipse 22% 25% at 50% 30%, rgba(255,255,0,0.32) 0%, transparent 100%)",
                  "radial-gradient(ellipse 25% 30% at 25% 65%, rgba(255,80,0,0.18) 0%, transparent 100%)",
                  "radial-gradient(ellipse 20% 22% at 75% 55%, rgba(255,60,0,0.16) 0%, transparent 100%)",
                  "radial-gradient(ellipse 12% 14% at 50% 30%, rgba(255,255,255,0.18) 0%, transparent 100%)",
                  "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,100,255,0.06) 0%, transparent 100%)",
                  "radial-gradient(ellipse 30% 35% at 60% 80%, rgba(0,80,200,0.10) 0%, transparent 100%)",
                  "linear-gradient(135deg, rgba(0,60,180,0.04) 0%, rgba(0,200,80,0.06) 50%, rgba(0,60,180,0.04) 100%)",
                ].join(", "),
              }}
            />
            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                Lumen
              </h3>
              <p className="text-4xl sm:text-5xl font-bold text-[#01b3d4] mt-1">
                Creative
              </p>
              <p className="mt-4 text-gray-600 max-w-sm">
                Design creatives that capture and hold attention. Test, iterate,
                and validate with real eye-tracking insights.
              </p>
              <Link href="/news">
                <Button variant="outline" className="mt-6">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
