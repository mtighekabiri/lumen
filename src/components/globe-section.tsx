"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useCallback } from "react";
import { TranslatedText } from "@/components/translated-text";

const InteractiveGlobe = dynamic(
  () => import("@/components/interactive-globe"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full flex justify-center">
        <div className="w-[600px] h-[600px] max-w-full aspect-square rounded-full bg-gradient-to-br from-[#01b3d4]/10 to-[#01b3d4]/5 animate-pulse" />
      </div>
    ),
  }
);

interface ClickEntry {
  name: string;
  hasData: boolean;
}

export default function GlobeSection() {
  const [clickHistory, setClickHistory] = useState<ClickEntry[]>([]);

  const handleCountryClick = useCallback(
    (name: string, hasData: boolean) => {
      setClickHistory((prev) => {
        const next = [{ name, hasData }, ...prev.filter((c) => c.name !== name)];
        return next.slice(0, 10);
      });
    },
    []
  );

  return (
    <>
      {/* Headline */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          <TranslatedText text="Have we collected attention data where you are?" />
        </h2>
      </div>

      {/* 3-column layout: history | globe | copy */}
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-6">
        {/* Left: Click history */}
        <div className="order-3 lg:order-1 w-full lg:w-1/4 shrink-0 lg:pt-14">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            <TranslatedText text="Recent lookups" />
          </h3>
          {clickHistory.length === 0 ? (
            <p className="text-sm text-gray-300 italic">
              <TranslatedText text="Click countries on the globe…" />
            </p>
          ) : (
            <ul className="space-y-2">
              {clickHistory.map((entry, i) => (
                <li
                  key={`${entry.name}-${i}`}
                  className="flex items-center gap-2 text-sm"
                >
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      entry.hasData ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                  <span
                    className={
                      entry.hasData ? "text-gray-700" : "text-gray-400"
                    }
                  >
                    {entry.name}
                  </span>
                  <span
                    className={`text-xs ml-auto whitespace-nowrap ${
                      entry.hasData ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {entry.hasData ? "Data collected" : "Not yet"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Center: Globe */}
        <div className="order-1 lg:order-2 w-full lg:w-1/2 shrink-0">
          <Suspense
            fallback={
              <div className="w-full flex justify-center">
                <div className="w-[600px] h-[600px] max-w-full aspect-square rounded-full bg-gradient-to-br from-[#01b3d4]/10 to-[#01b3d4]/5 animate-pulse" />
              </div>
            }
          >
            <InteractiveGlobe onCountryClick={handleCountryClick} />
          </Suspense>
        </div>

        {/* Right: Copy */}
        <div className="order-2 lg:order-3 w-full lg:w-1/4 flex flex-col gap-5 lg:pt-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#01b3d4]">
            <TranslatedText text="Global Reach" />
          </p>
          <p className="text-lg font-bold tracking-tight text-gray-900 leading-snug">
            <TranslatedText text="We've gathered real-world eye-tracking data across 50+ countries." />
          </p>
          <div className="w-12 h-1 bg-[#01b3d4] rounded-full" />
          <p className="text-sm text-gray-600 leading-relaxed">
            <TranslatedText text="Any algorithm that predicts attention levels must be informed by real-world measurements and observations — more granularity, more accuracy, equals a better prediction." />
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            <TranslatedText text="Human attention, and eye balls, work the same around the world but there can be small differences in certain contexts — the market changes attention by ~1%, it's other variables like device, ad size, or platforms that has the most significant changes in the attention adverts receive." />
          </p>
        </div>
      </div>
    </>
  );
}
