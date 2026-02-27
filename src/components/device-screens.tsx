"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/language-context";
import { t } from "@/lib/translations";

/* ───────────────────────────────────────────────────────────
   HeatmapOverlay – canvas overlay that renders an autonomous
   animated attention-heatmap when the parent is hovered.

   Hotspots drift, pulse, and fade using radial gradients in
   classic heatmap colours (red / orange / yellow / green).
   ─────────────────────────────────────────────────────────── */

interface HotSpot {
  x: number;       // 0–1 normalised position
  y: number;
  r: number;       // base radius (fraction of canvas width)
  intensity: number; // 0–1
  phase: number;   // animation phase offset
  dx: number;      // drift speed x
  dy: number;      // drift speed y
}

function generateHotspots(count: number): HotSpot[] {
  return Array.from({ length: count }, () => ({
    x: 0.15 + Math.random() * 0.7,
    y: 0.1 + Math.random() * 0.8,
    r: 0.08 + Math.random() * 0.14,
    intensity: 0.4 + Math.random() * 0.6,
    phase: Math.random() * Math.PI * 2,
    dx: (Math.random() - 0.5) * 0.0003,
    dy: (Math.random() - 0.5) * 0.0003,
  }));
}

function heatColor(intensity: number): [number, number, number] {
  // 0→green, 0.35→yellow, 0.7→orange, 1→red
  const n = Math.max(0, Math.min(1, intensity));
  if (n < 0.35) {
    const p = n / 0.35;
    return [Math.round(p * 255), Math.round(200 + p * 55), Math.round(50 * (1 - p))];
  }
  if (n < 0.7) {
    const p = (n - 0.35) / 0.35;
    return [255, Math.round(255 - p * 100), 0];
  }
  const p = (n - 0.7) / 0.3;
  return [Math.round(255 - p * 30), Math.round(155 - p * 100), 0];
}

/* ───────────────────────────────────────────────────────────
   ScrollingContent – fake webpage content that auto-scrolls
   vertically when the parent InteractiveScreen is hovered.
   ─────────────────────────────────────────────────────────── */

function ScrollingContent({ variant }: { variant: "desktop" | "tablet" | "mobile" }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<number>(0);
  const dirRef = useRef<1 | -1>(1);
  const animRef = useRef<number>(0);
  const activeRef = useRef(false);

  const speed = variant === "mobile" ? 0.3 : variant === "tablet" ? 0.4 : 0.5;

  useEffect(() => {
    let running = true;
    const tick = () => {
      if (!running) return;
      const el = innerRef.current;
      if (el && activeRef.current) {
        scrollRef.current += speed * dirRef.current;
        const maxScroll = el.scrollHeight - el.clientHeight;
        if (scrollRef.current >= maxScroll) { scrollRef.current = maxScroll; dirRef.current = -1; }
        if (scrollRef.current <= 0) { scrollRef.current = 0; dirRef.current = 1; }
        el.scrollTop = scrollRef.current;
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(animRef.current); };
  }, [speed]);

  // Expose activation via data attribute read by parent
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const parent = el.closest("[data-interactive-screen]");
    if (!parent) return;
    const onEnter = () => { activeRef.current = true; };
    const onLeave = () => { activeRef.current = false; };
    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);
    return () => { parent.removeEventListener("mouseenter", onEnter); parent.removeEventListener("mouseleave", onLeave); };
  }, []);

  const navHeight = variant === "mobile" ? "h-[8%]" : "h-[6%]";
  const heroHeight = variant === "mobile" ? "h-28" : variant === "tablet" ? "h-32" : "h-36";

  return (
    <div ref={innerRef} className="w-full h-full overflow-hidden">
      <div className="min-h-[250%] bg-white">
        {/* Nav bar */}
        <div className={`${navHeight} w-full bg-gray-800 flex items-center px-[5%] gap-[3%]`}>
          <div className="w-[12%] h-[40%] bg-[#01b3d4] rounded-sm" />
          <div className="flex-1" />
          <div className="w-[6%] h-[30%] bg-gray-500 rounded-sm" />
          <div className="w-[6%] h-[30%] bg-gray-500 rounded-sm" />
          <div className="w-[6%] h-[30%] bg-gray-500 rounded-sm" />
        </div>
        {/* Hero */}
        <div className={`${heroHeight} w-full bg-gradient-to-r from-[#01b3d4]/20 to-blue-100 flex flex-col justify-center px-[6%] gap-[6%]`}>
          <div className="h-[14%] w-[60%] bg-gray-800/80 rounded-sm" />
          <div className="h-[8%] w-[40%] bg-gray-400/70 rounded-sm" />
          <div className="h-[10%] w-[22%] bg-[#01b3d4] rounded-sm mt-1" />
        </div>
        {/* Content blocks */}
        <div className="p-[5%] space-y-[4%]">
          <div className="h-3 w-[75%] bg-gray-300/70 rounded-sm" />
          <div className="h-3 w-[90%] bg-gray-200/70 rounded-sm" />
          <div className="h-3 w-[60%] bg-gray-200/70 rounded-sm" />
          <div className="flex gap-[3%] mt-2">
            <div className="flex-1 aspect-[4/3] bg-gray-200/60 rounded" />
            <div className="flex-1 aspect-[4/3] bg-gray-200/60 rounded" />
            {variant !== "mobile" && <div className="flex-1 aspect-[4/3] bg-gray-200/60 rounded" />}
          </div>
          <div className="h-3 w-[80%] bg-gray-300/70 rounded-sm" />
          <div className="h-3 w-[65%] bg-gray-200/70 rounded-sm" />
          <div className="h-3 w-[85%] bg-gray-200/70 rounded-sm" />
          <div className="h-3 w-[50%] bg-gray-200/70 rounded-sm" />
          {/* Cards section */}
          <div className="flex gap-[3%] mt-3">
            <div className="flex-1 bg-gray-100 rounded p-[4%] space-y-2">
              <div className="w-full aspect-[3/2] bg-gray-200/70 rounded" />
              <div className="h-2 w-[70%] bg-gray-300/60 rounded-sm" />
              <div className="h-2 w-[90%] bg-gray-200/60 rounded-sm" />
            </div>
            <div className="flex-1 bg-gray-100 rounded p-[4%] space-y-2">
              <div className="w-full aspect-[3/2] bg-gray-200/70 rounded" />
              <div className="h-2 w-[60%] bg-gray-300/60 rounded-sm" />
              <div className="h-2 w-[85%] bg-gray-200/60 rounded-sm" />
            </div>
          </div>
          <div className="h-3 w-[70%] bg-gray-300/70 rounded-sm mt-3" />
          <div className="h-3 w-[88%] bg-gray-200/70 rounded-sm" />
          <div className="h-3 w-[55%] bg-gray-200/70 rounded-sm" />
          {/* CTA section */}
          <div className="w-full bg-[#01b3d4]/10 rounded p-[5%] flex flex-col items-center gap-2 mt-3">
            <div className="h-3 w-[50%] bg-gray-700/60 rounded-sm" />
            <div className="h-2 w-[65%] bg-gray-400/50 rounded-sm" />
            <div className="h-5 w-[25%] bg-[#01b3d4] rounded-sm mt-1" />
          </div>
          {/* Footer */}
          <div className="w-full bg-gray-800 rounded p-[5%] mt-4 space-y-2">
            <div className="h-2 w-[30%] bg-gray-500/60 rounded-sm" />
            <div className="h-2 w-[45%] bg-gray-600/40 rounded-sm" />
            <div className="h-2 w-[35%] bg-gray-600/40 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Wrapper: hovering triggers the heatmap + optional scrolling */
function InteractiveScreen({
  children,
  className,
  scrollable,
}: {
  children: React.ReactNode;
  className?: string;
  scrollable?: "desktop" | "tablet" | "mobile";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const heatmapActive = useRef(false);

  // Expose hover to HeatmapOverlay
  const onEnter = () => {
    heatmapActive.current = true;
    const canvas = ref.current?.querySelector("canvas");
    if (canvas) (canvas as HTMLCanvasElement).dataset.active = "true";
  };
  const onLeave = () => {
    heatmapActive.current = false;
    const canvas = ref.current?.querySelector("canvas");
    if (canvas) (canvas as HTMLCanvasElement).dataset.active = "false";
  };

  // Bridge hover state into the HeatmapOverlay's activeRef via a simple MutationObserver-free approach:
  // We set a ref on the wrapper and the overlay reads from the wrapper's dataset.
  return (
    <div
      ref={ref}
      data-interactive-screen
      className={`relative ${className ?? ""}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {scrollable ? <ScrollingContent variant={scrollable} /> : children}
      <HeatmapOverlayBridge parentRef={ref} />
    </div>
  );
}

/**
 * Bridge component that connects the parent hover state to the
 * HeatmapOverlay's internal activeRef.
 */
function HeatmapOverlayBridge({ parentRef }: { parentRef: React.RefObject<HTMLDivElement | null> }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    // We use pointer events on the parent to toggle heatmap
    const enter = () => setTick((t) => t + 1);
    const leave = () => setTick((t) => t + 1);
    parent.addEventListener("mouseenter", enter);
    parent.addEventListener("mouseleave", leave);
    return () => {
      parent.removeEventListener("mouseenter", enter);
      parent.removeEventListener("mouseleave", leave);
    };
  }, [parentRef]);

  return <HeatmapOverlayWithParent parentRef={parentRef} />;
}

function HeatmapOverlayWithParent({ parentRef }: { parentRef: React.RefObject<HTMLDivElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotsRef = useRef<HotSpot[]>(generateHotspots(6));
  const animRef = useRef<number>(0);
  const opacityRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const sync = () => {
      const { width, height } = parent.getBoundingClientRect();
      const w = Math.round(width);
      const h = Math.round(height);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(parent);

    let running = true;
    const draw = (time: number) => {
      if (!running) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) { animRef.current = requestAnimationFrame(draw); return; }

      const isHovered = parentRef.current?.matches(":hover") ?? false;
      const target = isHovered ? 1 : 0;
      opacityRef.current += (target - opacityRef.current) * 0.04;

      if (opacityRef.current < 0.005 && !isHovered) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const globalAlpha = opacityRef.current * 0.55;

      for (const spot of spotsRef.current) {
        spot.x += spot.dx;
        spot.y += spot.dy;
        if (spot.x < 0.05 || spot.x > 0.95) spot.dx *= -1;
        if (spot.y < 0.05 || spot.y > 0.95) spot.dy *= -1;

        const pulse = 0.7 + 0.3 * Math.sin(time * 0.0015 + spot.phase);
        const cx = spot.x * canvas.width;
        const cy = spot.y * canvas.height;
        const radius = spot.r * canvas.width * pulse;
        const [r, g, b] = heatColor(spot.intensity * pulse);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${r},${g},${b},${globalAlpha * spot.intensity * pulse})`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${globalAlpha * spot.intensity * pulse * 0.4})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => { running = false; cancelAnimationFrame(animRef.current); ro.disconnect(); };
  }, [parentRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
    />
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
        <InteractiveScreen className="w-full h-full rounded-[1px] overflow-hidden bg-white" scrollable="desktop">
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
      <InteractiveScreen className="w-full h-full rounded-[3%] overflow-hidden bg-white" scrollable="tablet">
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
      <InteractiveScreen className="w-full h-full rounded-[14%] overflow-hidden bg-white" scrollable="mobile">
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
