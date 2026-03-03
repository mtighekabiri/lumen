"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { t } from "@/lib/translations";

/* ─── useDeviceImage ────────────────────────────────────── */

/** Resolves the actual image path(s) for a device name (png/jpg/jpeg). */
function useDeviceImage(name: string): { src: string | null; heatmap: string | null } {
  const [images, setImages] = useState<{ src: string | null; heatmap: string | null }>({ src: null, heatmap: null });

  useEffect(() => {
    fetch(`/api/device-image?name=${encodeURIComponent(name)}`)
      .then((r) => r.json())
      .then((data) => setImages({ src: data.src ?? null, heatmap: data.heatmap ?? null }))
      .catch(() => setImages({ src: null, heatmap: null }));
  }, [name]);

  return images;
}

/* ─── Count-up animation ─────────────────────────────────── */

/** Animates a number from 0 to `target` over `durationMs` when `active` is true. */
function useCountUp(target: number, durationMs: number, active: boolean): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(eased * target);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, durationMs]);

  return value;
}

/* ─── Device stats config ────────────────────────────────── */

type StatConfig = {
  value: number;
  suffix: string;
  label: string;
  decimals: number;
};

/** Per-device hover stats. Add entries as data becomes available. */
const DEVICE_STATS: Record<string, { stat1: StatConfig; stat2: StatConfig }> = {
  dooh: {
    stat1: { value: 82, suffix: "%", label: "viewed", decimals: 0 },
    stat2: { value: 1.3, suffix: "", label: "seconds", decimals: 1 },
  },
};

function CountUpStat({
  value,
  suffix,
  label,
  decimals,
  active,
}: StatConfig & { active: boolean }) {
  const animated = useCountUp(value, 2000, active);

  return (
    <span className="text-[10px] sm:text-xs font-semibold text-[#01b3d4] whitespace-nowrap leading-tight">
      {animated.toFixed(decimals)}{suffix} {label}
    </span>
  );
}

/* ─── DeviceLabel (slide-up to reveal stats) ─────────────── */

function DeviceLabel({
  label,
  hovered,
  deviceName,
}: {
  label: string;
  hovered: boolean;
  deviceName: string;
}) {
  const stats = DEVICE_STATS[deviceName];
  const showStats = hovered && !!stats;

  return (
    <div className="overflow-hidden mb-2 h-7">
      <div
        className={`flex flex-col transition-transform duration-300 ease-in-out ${showStats ? "-translate-y-1/2" : "translate-y-0"}`}
      >
        {/* Row 1: device name */}
        <div className="h-7 flex items-center justify-center">
          <span className="text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">{label}</span>
        </div>
        {/* Row 2: stats that count up from 0 */}
        <div className="h-7 flex flex-col items-center justify-center">
          {stats && (
            <>
              <CountUpStat {...stats.stat1} active={hovered} />
              <CountUpStat {...stats.stat2} active={hovered} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── DeviceSlot (hover wrapper for label + screen) ──────── */

function DeviceSlot({
  label,
  deviceName,
  className,
  children,
}: {
  label: string;
  deviceName: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <DeviceLabel label={label} hovered={hovered} deviceName={deviceName} />
      {children}
    </div>
  );
}

/* ─── InteractiveScreen ─────────────────────────────────── */

/** Screen area that shows an image on hover, with heatmap pulse if available */
function InteractiveScreen({
  children,
  className,
  deviceName,
}: {
  children?: React.ReactNode;
  className?: string;
  deviceName?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const { src: hoverImage, heatmap: heatmapImage } = useDeviceImage(deviceName ?? "");

  return (
    <div
      className={`relative ${className ?? ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {hoverImage && (
        <div className={`absolute inset-0 z-[5] transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
          <Image src={hoverImage} alt="" fill className="object-contain" sizes="320px" />
          {heatmapImage && (
            <div className={`absolute inset-0 ${hovered ? "animate-heatmap-pulse" : "opacity-0"}`}>
              <Image src={heatmapImage} alt="" fill className="object-contain" sizes="320px" />
            </div>
          )}
        </div>
      )}
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

function TVScreen({ deviceName }: { deviceName: string }) {
  return (
    <div className="flex flex-col items-center">
      {/* Thin-bezel panel */}
      <div className="w-full aspect-[16/9] bg-[#1a1a1a] rounded-[3px] sm:rounded-[4px] p-[1.8%] shadow-xl ring-1 ring-black/10">
        <InteractiveScreen className="w-full h-full rounded-[1px] overflow-hidden bg-white" deviceName={deviceName}>
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

function Laptop({ deviceName }: { deviceName: string }) {
  return (
    <div className="flex flex-col items-center">
      {/* Screen with thicker bezel at bottom */}
      <div className="w-full aspect-[16/10] bg-[#1a1a1a] rounded-t-[4px] sm:rounded-t-[6px] overflow-hidden shadow-xl ring-1 ring-black/10"
        style={{ padding: "2.5% 3% 4% 3%" }}>
        <InteractiveScreen className="w-full h-full rounded-[1px] overflow-hidden bg-white" deviceName={deviceName}>
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

function Tablet({ deviceName }: { deviceName: string }) {
  return (
    <div className="w-full aspect-[3/4] bg-[#1a1a1a] rounded-[6%] p-[4.5%] shadow-xl ring-1 ring-black/10">
      <InteractiveScreen className="w-full h-full rounded-[3%] overflow-hidden bg-white" deviceName={deviceName}>
        <Skeleton />
      </InteractiveScreen>
    </div>
  );
}

function MobilePhone({ deviceName }: { deviceName: string }) {
  return (
    <div className="w-full aspect-[9/19.5] bg-[#1a1a1a] rounded-[18%] p-[4.5%] shadow-xl ring-1 ring-black/10 relative">
      {/* Dynamic Island */}
      <div className="absolute top-[3.5%] left-1/2 -translate-x-1/2 w-[30%] h-[2%] bg-black rounded-full z-10" />
      {/* Side button — right */}
      <div className="absolute top-[22%] -right-[3%] w-[2.5%] h-[8%] bg-[#2a2a2a] rounded-r-sm" />
      {/* Volume buttons — left */}
      <div className="absolute top-[18%] -left-[3%] w-[2.5%] h-[5%] bg-[#2a2a2a] rounded-l-sm" />
      <div className="absolute top-[25%] -left-[3%] w-[2.5%] h-[5%] bg-[#2a2a2a] rounded-l-sm" />
      <InteractiveScreen className="w-full h-full rounded-[14%] overflow-hidden bg-white" deviceName={deviceName}>
        <Skeleton />
      </InteractiveScreen>
      {/* Home indicator bar */}
      <div className="absolute bottom-[2.5%] left-1/2 -translate-x-1/2 w-[35%] h-[1%] bg-gray-600 rounded-full" />
    </div>
  );
}

function DOOHScreen({ deviceName }: { deviceName: string }) {
  return (
    <div className="flex flex-col items-center">
      {/* Portrait digital panel — 9:16 ratio to match image */}
      <div className="w-full aspect-[9/16] bg-[#222] rounded-[3px] sm:rounded-[4px] p-[2.5%] shadow-xl ring-1 ring-black/10">
        <InteractiveScreen className="w-full h-full rounded-[1px] overflow-hidden bg-white" deviceName={deviceName}>
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

function CinemaScreen({ deviceName }: { deviceName: string }) {
  return (
    <div className="flex flex-col items-center">
      {/* Ultra-wide cinema screen — 2.39:1 scope ratio */}
      <div className="w-full aspect-[2.39/1] bg-[#111] rounded-[2px] sm:rounded-[3px] p-[2%] shadow-xl ring-1 ring-black/20">
        <InteractiveScreen className="w-full h-full rounded-[1px] overflow-hidden bg-white" deviceName={deviceName}>
          <DOOHSkeleton />
        </InteractiveScreen>
      </div>
    </div>
  );
}

function PrintMedia({ deviceName }: { deviceName: string }) {
  return (
    <div className="flex flex-col items-center">
      {/* Magazine / newspaper page */}
      <InteractiveScreen className="w-full aspect-[3/4] bg-white rounded-[2px] sm:rounded-[3px] shadow-xl ring-1 ring-gray-200 overflow-hidden" deviceName={deviceName}>
        <Skeleton />
      </InteractiveScreen>
    </div>
  );
}

function AudioDevice({ deviceName }: { deviceName: string }) {
  const [hovered, setHovered] = useState(false);
  const { src: hoverImage, heatmap: heatmapImage } = useDeviceImage(deviceName);

  return (
    <div
      className="flex flex-col items-center justify-end h-full relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
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
      {hoverImage && (
        <div className={`absolute inset-0 z-10 transition-opacity duration-300 rounded-lg overflow-hidden ${hovered ? "opacity-100" : "opacity-0"}`}>
          <Image src={hoverImage} alt="" fill className="object-contain" sizes="110px" />
          {heatmapImage && (
            <div className={`absolute inset-0 ${hovered ? "animate-heatmap-pulse" : "opacity-0"}`}>
              <Image src={heatmapImage} alt="" fill className="object-contain" sizes="110px" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────── */

export function DeviceScreens() {
  const { language } = useLanguage();

  return (
    <section className="pt-4 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-[#01b3d4]/[0.04] to-white animate-gradient-drift">
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
            <DeviceSlot className="w-[30%] max-w-[320px]" label={t(language, "devices.cinema")} deviceName="cinema">
              <CinemaScreen deviceName="cinema" />
            </DeviceSlot>

            {/* TV ~55" — bigger */}
            <DeviceSlot className="w-[22%] max-w-[240px]" label={t(language, "devices.tv")} deviceName="tv">
              <TVScreen deviceName="tv" />
            </DeviceSlot>

            {/* Laptop ~15" */}
            <DeviceSlot className="w-[14%] max-w-[150px]" label={t(language, "devices.desktop")} deviceName="desktop">
              <Laptop deviceName="desktop" />
            </DeviceSlot>

            {/* Tablet ~11" portrait */}
            <DeviceSlot className="w-[7%] max-w-[75px]" label={t(language, "devices.tablet")} deviceName="tablet">
              <Tablet deviceName="tablet" />
            </DeviceSlot>

            {/* Mobile ~6.5" — smaller */}
            <DeviceSlot className="w-[3.5%] max-w-[38px]" label={t(language, "devices.mobile")} deviceName="mobile">
              <MobilePhone deviceName="mobile" />
            </DeviceSlot>

            {/* DOOH D6 — tall standalone panel */}
            <DeviceSlot className="w-[8%] max-w-[85px]" label={t(language, "devices.dooh")} deviceName="dooh">
              <DOOHScreen deviceName="dooh" />
            </DeviceSlot>

            {/* Print — magazine/newspaper, far right */}
            <DeviceSlot className="w-[6%] max-w-[65px]" label={t(language, "devices.print")} deviceName="print">
              <PrintMedia deviceName="print" />
            </DeviceSlot>

            {/* Audio — AirPods, far right */}
            <DeviceSlot className="w-[5%] max-w-[55px]" label={t(language, "devices.audio")} deviceName="audio">
              <AudioDevice deviceName="audio" />
            </DeviceSlot>
          </div>
        </div>
      </div>
    </section>
  );
}
