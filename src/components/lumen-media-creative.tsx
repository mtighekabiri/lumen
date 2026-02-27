"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { t } from "@/lib/translations";

export function LumenMediaCreative() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [seconds, setSeconds] = useState(0);
  const isVisibleRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const el = sectionRef.current;
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
    <section ref={sectionRef} className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-200 rounded-2xl overflow-hidden">
          {/* Left — For Advertisers */}
          <div className="relative flex flex-col p-10 sm:p-14 bg-gray-50">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#01b3d4]">
              {t(language, "lmc.forAdvertisers")}
            </p>
            <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">
              {t(language, "lmc.advertisersHeadline")}
            </h3>
            <p className="mt-4 text-gray-600 max-w-sm">
              {t(language, "lmc.advertisersDesc")}
            </p>
            <Link href="/solutions">
              <Button variant="outline" className="mt-6">
                {t(language, "home.learnMore")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            {/* Visibility timer */}
            <span className="absolute bottom-6 right-6 font-mono text-4xl sm:text-5xl font-bold text-[#01b3d4]/20 tabular-nums select-none">
              {seconds.toFixed(1)}s
            </span>
          </div>

          {/* Right — For Agencies */}
          <div className="relative flex flex-col p-10 sm:p-14 border-t md:border-t-0 md:border-l border-gray-200 overflow-hidden bg-white">
            {/* Heatmap background layer */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: [
                  "radial-gradient(ellipse 18% 20% at 68% 58%, rgba(220,0,0,0.55) 0%, transparent 100%)",
                  "radial-gradient(ellipse 30% 34% at 68% 58%, rgba(255,220,0,0.40) 0%, transparent 100%)",
                  "radial-gradient(ellipse 42% 46% at 68% 58%, rgba(50,205,50,0.28) 0%, transparent 100%)",
                  "radial-gradient(ellipse 56% 60% at 68% 58%, rgba(100,200,255,0.20) 0%, transparent 100%)",
                  "radial-gradient(ellipse 14% 16% at 48% 82%, rgba(220,0,0,0.35) 0%, transparent 100%)",
                  "radial-gradient(ellipse 24% 26% at 48% 82%, rgba(255,220,0,0.25) 0%, transparent 100%)",
                  "radial-gradient(ellipse 34% 38% at 48% 82%, rgba(50,205,50,0.16) 0%, transparent 100%)",
                  "radial-gradient(ellipse 12% 14% at 85% 68%, rgba(255,100,0,0.22) 0%, transparent 100%)",
                  "radial-gradient(ellipse 22% 24% at 85% 68%, rgba(255,220,0,0.15) 0%, transparent 100%)",
                  "radial-gradient(ellipse 32% 34% at 85% 68%, rgba(100,200,255,0.10) 0%, transparent 100%)",
                  "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)",
                ].join(", "),
              }}
            />
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#01b3d4]">
                {t(language, "lmc.forAgencies")}
              </p>
              <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">
                {t(language, "lmc.agenciesHeadline")}
              </h3>
              <p className="mt-4 text-gray-600 max-w-sm">
                {t(language, "lmc.agenciesDesc")}
              </p>
              <Link href="/solutions">
                <Button variant="outline" className="mt-6">
                  {t(language, "home.learnMore")}
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
