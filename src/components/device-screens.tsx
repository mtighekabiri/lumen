"use client";

import { useCallback, useEffect, useRef } from "react";
import { useLanguage } from "@/context/language-context";
import { t } from "@/lib/translations";

/* ───────────────────────────────────────────────────────────
   AttentionTrail – canvas overlay that draws a speed-coloured
   line as the user moves their mouse over a device screen.

   Speed → colour mapping (slow to fast):
     red → yellow → green → blue → white

   The trail is cleared when the mouse leaves and restarts
   on re-entry.
   ─────────────────────────────────────────────────────────── */

function speedToColor(speed: number): string {
  // speed is in px/ms.  Typical range: 0 (dwelling) … ~2+ (fast flick)
  // We clamp to [0, 1] then map through 4 colour stops.
  const n = Math.min(speed / 1.6, 1);

  if (n < 0.25) {
    // red → yellow
    const p = n / 0.25;
    return `rgba(220,${Math.round(60 + 180 * p)},20,${0.95 - p * 0.1})`;
  }
  if (n < 0.5) {
    // yellow → green
    const p = (n - 0.25) / 0.25;
    return `rgba(${Math.round(220 - 180 * p)},${Math.round(240 - 20 * p)},${Math.round(20 + 20 * p)},${0.85 - p * 0.05})`;
  }
  if (n < 0.75) {
    // green → blue
    const p = (n - 0.5) / 0.25;
    return `rgba(${Math.round(40 - 30 * p)},${Math.round(220 - 140 * p)},${Math.round(40 + 215 * p)},${0.8 - p * 0.1})`;
  }
  // blue → white
  const p = (n - 0.75) / 0.25;
  return `rgba(${Math.round(10 + 245 * p)},${Math.round(80 + 175 * p)},${Math.round(255)},${0.7 - p * 0.25})`;
}

function AttentionTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastRef = useRef<{ x: number; y: number; t: number } | null>(null);

  // Keep canvas pixel-size in sync with its layout size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const sync = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== Math.round(width) || canvas.height !== Math.round(height)) {
        canvas.width = Math.round(width);
        canvas.height = Math.round(height);
      }
    };
    sync();

    const ro = new ResizeObserver(sync);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  const handleMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    const now = performance.now();

    const prev = lastRef.current;
    if (prev) {
      const dx = x - prev.x;
      const dy = y - prev.y;
      const dt = now - prev.t;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const speed = dt > 0 ? dist / dt : 0; // px/ms

      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = speedToColor(speed);
      // Thicker when slow (more "attention"), thinner when fast
      ctx.lineWidth = Math.max(1.5, 4 - speed * 2);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }

    lastRef.current = { x, y, t: now };
  }, []);

  const handleLeave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    lastRef.current = null;
  }, []);

  const handleEnter = useCallback(() => {
    lastRef.current = null;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-10"
      style={{ cursor: "crosshair" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
    />
  );
}

/** Wrapper that makes a screen area interactive (relative + canvas overlay) */
function InteractiveScreen({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      {children}
      <AttentionTrail />
    </div>
  );
}

/* ─── Skeleton placeholders ─────────────────────────────── */

function Skeleton() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 p-[8%] flex flex-col gap-[5%]">
      <div className="h-[8%] w-[55%] bg-gray-300/70 rounded-sm animate-pulse" />
      <div className="h-[5%] w-[85%] bg-gray-200/70 rounded-sm animate-pulse" />
      <div className="h-[5%] w-[70%] bg-gray-200/70 rounded-sm animate-pulse" />
      <div className="flex-1 w-full bg-gray-200/50 rounded-sm animate-pulse" />
      <div className="h-[5%] w-[35%] bg-gray-200/70 rounded-sm animate-pulse" />
    </div>
  );
}

function DOOHSkeleton() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 p-[6%]">
      <div className="w-full h-full bg-gray-200/60 rounded-sm animate-pulse" />
    </div>
  );
}

/* ─── Device components ─────────────────────────────────── */

function TVScreen() {
  return (
    <div className="flex flex-col items-center">
      {/* Thin-bezel panel */}
      <div className="w-full aspect-[16/9] bg-[#1a1a1a] rounded-[3px] sm:rounded-[4px] p-[1.8%] shadow-xl ring-1 ring-black/10">
        <InteractiveScreen className="w-full h-full rounded-[1px] overflow-hidden bg-white">
          <Skeleton />
        </InteractiveScreen>
      </div>
      {/* Slim neck */}
      <div className="w-[12%] h-2.5 sm:h-3.5 bg-gradient-to-b from-[#2a2a2a] to-[#3a3a3a]" />
      {/* Wide base */}
      <div className="w-[40%] h-1 sm:h-1.5 bg-gradient-to-b from-[#3a3a3a] to-[#4a4a4a] rounded-b-sm" />
    </div>
  );
}

function Laptop() {
  return (
    <div className="flex flex-col items-center">
      {/* Screen with thicker bezel at bottom */}
      <div className="w-full aspect-[16/10] bg-[#1a1a1a] rounded-t-[4px] sm:rounded-t-[6px] overflow-hidden shadow-xl ring-1 ring-black/10"
        style={{ padding: "2.5% 3% 4% 3%" }}>
        <InteractiveScreen className="w-full h-full rounded-[1px] overflow-hidden bg-white">
          <Skeleton />
        </InteractiveScreen>
      </div>
      {/* Hinge */}
      <div className="w-[104%] h-[3px] sm:h-[4px] bg-gradient-to-b from-[#c0c0c0] to-[#a0a0a0] rounded-[1px]" />
      {/* Keyboard deck */}
      <div className="w-[104%] h-[6px] sm:h-[8px] bg-gradient-to-b from-[#d4d4d4] to-[#bbb] rounded-b-[3px] sm:rounded-b-[4px] shadow-sm" />
    </div>
  );
}

function Tablet() {
  return (
    <div className="w-full aspect-[3/4] bg-[#1a1a1a] rounded-[6%] p-[4.5%] shadow-xl ring-1 ring-black/10">
      <InteractiveScreen className="w-full h-full rounded-[3%] overflow-hidden bg-white">
        <Skeleton />
      </InteractiveScreen>
    </div>
  );
}

function MobilePhone() {
  return (
    <div className="w-full aspect-[9/19.5] bg-[#1a1a1a] rounded-[18%] p-[4.5%] shadow-xl ring-1 ring-black/10 relative">
      {/* Dynamic Island */}
      <div className="absolute top-[3.5%] left-1/2 -translate-x-1/2 w-[30%] h-[2%] bg-black rounded-full z-10" />
      {/* Side button — right */}
      <div className="absolute top-[22%] -right-[3%] w-[2.5%] h-[8%] bg-[#2a2a2a] rounded-r-sm" />
      {/* Volume buttons — left */}
      <div className="absolute top-[18%] -left-[3%] w-[2.5%] h-[5%] bg-[#2a2a2a] rounded-l-sm" />
      <div className="absolute top-[25%] -left-[3%] w-[2.5%] h-[5%] bg-[#2a2a2a] rounded-l-sm" />
      <InteractiveScreen className="w-full h-full rounded-[14%] overflow-hidden bg-white">
        <Skeleton />
      </InteractiveScreen>
      {/* Home indicator bar */}
      <div className="absolute bottom-[2.5%] left-1/2 -translate-x-1/2 w-[35%] h-[1%] bg-gray-600 rounded-full" />
    </div>
  );
}

function DOOHScreen() {
  return (
    <div className="flex flex-col items-center">
      {/* Portrait digital panel — D6 sheet ratio (1200×1800mm ≈ 2:3) */}
      <div className="w-full aspect-[2/3] bg-[#222] rounded-[3px] sm:rounded-[4px] p-[2.5%] shadow-xl ring-1 ring-black/10">
        <InteractiveScreen className="w-full h-full rounded-[1px] overflow-hidden bg-white">
          <DOOHSkeleton />
        </InteractiveScreen>
      </div>
      {/* Pole */}
      <div className="w-[6%] h-8 sm:h-12 bg-gradient-to-b from-[#666] to-[#888]" />
      {/* Base plate */}
      <div className="w-[30%] h-1.5 sm:h-2 bg-[#777] rounded-sm" />
    </div>
  );
}

function CinemaScreen() {
  return (
    <div className="flex flex-col items-center">
      {/* Ultra-wide cinema screen — 2.39:1 scope ratio */}
      <div className="w-full aspect-[2.39/1] bg-[#111] rounded-[2px] sm:rounded-[3px] p-[2%] shadow-xl ring-1 ring-black/20">
        <InteractiveScreen className="w-full h-full rounded-[1px] overflow-hidden bg-white">
          <DOOHSkeleton />
        </InteractiveScreen>
      </div>
    </div>
  );
}

function PrintMedia() {
  return (
    <div className="flex flex-col items-center">
      {/* Magazine / newspaper page */}
      <InteractiveScreen className="w-full aspect-[3/4] bg-white rounded-[2px] sm:rounded-[3px] shadow-xl ring-1 ring-gray-200 overflow-hidden">
        <Skeleton />
      </InteractiveScreen>
    </div>
  );
}

function AudioDevice() {
  return (
    <div className="flex flex-col items-center justify-end h-full">
      <div className="flex gap-[12%] w-full justify-center">
        {/* Left earbud */}
        <div className="w-[38%] flex flex-col items-center">
          <div className="w-full aspect-square bg-[#e8e8e8] rounded-full shadow-lg ring-1 ring-gray-300 flex items-center justify-center">
            <div className="w-[45%] h-[45%] rounded-full bg-[#d0d0d0]" />
          </div>
          {/* Stem */}
          <div className="w-[28%] h-6 sm:h-8 bg-gradient-to-b from-[#e8e8e8] to-[#ddd] rounded-b-full" />
        </div>
        {/* Right earbud */}
        <div className="w-[38%] flex flex-col items-center">
          <div className="w-full aspect-square bg-[#e8e8e8] rounded-full shadow-lg ring-1 ring-gray-300 flex items-center justify-center">
            <div className="w-[45%] h-[45%] rounded-full bg-[#d0d0d0]" />
          </div>
          {/* Stem */}
          <div className="w-[28%] h-6 sm:h-8 bg-gradient-to-b from-[#e8e8e8] to-[#ddd] rounded-b-full" />
        </div>
      </div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────── */

export function DeviceScreens() {
  const { language } = useLanguage();

  return (
    <section className="pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-gray-100 p-10 sm:p-14">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            <span>{t(language, "devices.headingPrefix")}</span>{" "}
            <span className="italic text-[#01b3d4]">
              {t(language, "devices.headingSuffix")}
            </span>
          </h3>

          <ul className="mb-12 list-disc pl-5 space-y-2 text-gray-600 leading-relaxed">
            <li><span className="font-semibold text-gray-900">{t(language, "devices.bulletPlanning")}</span> {t(language, "devices.bulletPlanningDesc")}</li>
            <li><span className="font-semibold text-gray-900">{t(language, "devices.bulletBuying")}</span> {t(language, "devices.bulletBuyingDesc")}</li>
            <li><span className="font-semibold text-gray-900">{t(language, "devices.bulletActivation")}</span> {t(language, "devices.bulletActivationDesc")}</li>
            <li><span className="font-semibold text-gray-900">{t(language, "devices.bulletMeasure")}</span> {t(language, "devices.bulletMeasureDesc")}</li>
            <li><span className="font-semibold text-gray-900">{t(language, "devices.bulletEconometrics")}</span> {t(language, "devices.bulletEconometricsDesc")}</li>
          </ul>

          {/* Devices row — sizes approximate real-world proportions */}
          <div className="flex items-end justify-center gap-2 sm:gap-3 lg:gap-5">
            {/* Cinema — ultra-wide, far left, much larger */}
            <div className="w-[30%] max-w-[320px]">
              <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">{t(language, "devices.cinema")}</p>
              <CinemaScreen />
            </div>

            {/* TV ~55" — bigger */}
            <div className="w-[22%] max-w-[240px]">
              <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">{t(language, "devices.tv")}</p>
              <TVScreen />
            </div>

            {/* Laptop ~15" */}
            <div className="w-[14%] max-w-[150px]">
              <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">{t(language, "devices.desktop")}</p>
              <Laptop />
            </div>

            {/* Tablet ~11" portrait */}
            <div className="w-[7%] max-w-[75px]">
              <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">{t(language, "devices.tablet")}</p>
              <Tablet />
            </div>

            {/* Mobile ~6.5" — smaller */}
            <div className="w-[3.5%] max-w-[38px]">
              <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2 whitespace-nowrap">{t(language, "devices.mobile")}</p>
              <MobilePhone />
            </div>

            {/* DOOH D6 — tall standalone panel */}
            <div className="w-[8%] max-w-[85px]">
              <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">{t(language, "devices.dooh")}</p>
              <DOOHScreen />
            </div>

            {/* Print — magazine/newspaper, far right */}
            <div className="w-[6%] max-w-[65px]">
              <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">{t(language, "devices.print")}</p>
              <PrintMedia />
            </div>

            {/* Audio — AirPods, far right */}
            <div className="w-[5%] max-w-[55px]">
              <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">{t(language, "devices.audio")}</p>
              <AudioDevice />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
