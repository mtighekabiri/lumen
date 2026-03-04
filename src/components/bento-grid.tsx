"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/language-context";
import { t } from "@/lib/translations";

/* ─── Animated count-up ───────────────────────────────────── */

function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (!active) { setValue(0); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue((1 - Math.pow(1 - p, 4)) * target);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target, duration]);

  return value;
}

function AnimatedStat({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const v = useCountUp(value, 2000, active);
  return (
    <div className="text-center">
      <p className="text-2xl sm:text-3xl font-bold text-[#01b3d4]">
        {Math.round(v).toLocaleString()}{suffix}
      </p>
      <p className="mt-1 text-xs text-gray-600">{label}</p>
    </div>
  );
}

/* ─── Intersection observer hook ──────────────────────────── */

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ─── Attention = Profit chart ────────────────────────────── */

const CHART_DATA = [
  { label: "Online Display", x: 400, y: 5 },
  { label: "Paid Social", x: 700, y: 7 },
  { label: "OOH", x: 1400, y: 10 },
  { label: "Online Video", x: 2200, y: 25 },
  { label: "TV", x: 6000, y: 48 },
  { label: "Cinema", x: 22000, y: 95 },
];

function AttentionProfitChart() {
  const { ref, inView } = useInView(0.4);
  const [progress, setProgress] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [inView]);

  // Chart dimensions
  const W = 400;
  const H = 280;
  const PAD = { top: 30, right: 20, bottom: 55, left: 65 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const xMax = 25000;
  const yMax = 120;

  const toX = (v: number) => PAD.left + (v / xMax) * plotW;
  const toY = (v: number) => PAD.top + plotH - (v / yMax) * plotH;

  // Build the trend curve path (quadratic fit approximation)
  const curvePts: string[] = [];
  for (let i = 0; i <= 50; i++) {
    const xv = (i / 50) * xMax;
    // y ≈ 0.0000017x² + 0.0015x + 3 (rough fit to data)
    const yv = Math.min(0.0000017 * xv * xv + 0.0015 * xv + 3, yMax);
    curvePts.push(`${toX(xv)},${toY(yv)}`);
  }
  const curvePath = `M${curvePts.join(" L")}`;

  // Y-axis ticks
  const yTicks = [0, 20, 40, 60, 80, 100, 120];
  // X-axis ticks
  const xTicks = [0, 5000, 10000, 15000, 20000, 25000];

  return (
    <div ref={ref} className="w-full h-full flex flex-col">
      <h4 className="text-lg font-bold text-gray-900 mb-1">Attention = profit</h4>
      <div className="flex-1 min-h-0">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          {yTicks.map((v) => (
            <line key={`yg-${v}`} x1={PAD.left} x2={W - PAD.right} y1={toY(v)} y2={toY(v)}
              stroke="#e5e7eb" strokeWidth={0.5} />
          ))}

          {/* Y-axis labels */}
          {yTicks.map((v) => (
            <text key={`yl-${v}`} x={PAD.left - 6} y={toY(v) + 3} textAnchor="end"
              className="fill-gray-500" fontSize={9}>
              £{v}
            </text>
          ))}

          {/* X-axis labels */}
          {xTicks.map((v) => (
            <text key={`xl-${v}`} x={toX(v)} y={PAD.top + plotH + 14} textAnchor="middle"
              className="fill-gray-500" fontSize={9}>
              {v === 0 ? "0" : `${(v / 1000).toFixed(0)}k`}
            </text>
          ))}

          {/* Axis labels */}
          <text x={PAD.left + plotW / 2} y={H - 2} textAnchor="middle"
            className="fill-gray-500" fontSize={8}>
            Attentive seconds per 1,000 impressions (APM)
          </text>
          <text transform={`translate(12, ${PAD.top + plotH / 2}) rotate(-90)`}
            textAnchor="middle" className="fill-gray-500" fontSize={8}>
            Incremental profit per 1,000 impressions
          </text>

          {/* Trend curve */}
          <path d={curvePath} fill="none" stroke="#01b3d4" strokeWidth={2}
            strokeDasharray="6 3" opacity={0.5}
            style={{
              strokeDashoffset: (1 - progress) * 800,
              transition: "stroke-dashoffset 0.05s linear",
            }} />

          {/* Data points */}
          {CHART_DATA.map((pt, i) => {
            const cx = toX(pt.x);
            const cy = toY(pt.y);
            const delay = i * 0.12;
            const pointProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));

            return (
              <g key={pt.label} opacity={pointProgress}>
                <circle cx={cx} cy={cy} r={4} fill="#01b3d4" />
                <text x={cx} y={cy - 8} textAnchor="middle"
                  className="fill-gray-700" fontSize={8} fontWeight={500}>
                  {pt.label}
                </text>
              </g>
            );
          })}

          {/* R² annotation */}
          <text x={W - PAD.right - 5} y={PAD.top + 14} textAnchor="end"
            className="fill-gray-400" fontSize={8} opacity={progress}>
            R² = 0.979
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ─── Mini device screens visual ──────────────────────────── */

function MiniDeviceScreens() {
  return (
    <div className="w-full h-full flex items-end justify-center gap-1.5 pb-4 px-3">
      {/* TV */}
      <div className="flex flex-col items-center w-[28%]">
        <div className="w-full aspect-[16/9] bg-[#1a1a1a] rounded-[2px] p-[2%]">
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-[1px]" />
        </div>
        <div className="w-[12%] h-1.5 bg-[#2a2a2a]" />
        <div className="w-[35%] h-0.5 bg-[#3a3a3a]" />
        <span className="text-[7px] text-gray-400 mt-1">TV</span>
      </div>
      {/* Laptop */}
      <div className="flex flex-col items-center w-[22%]">
        <div className="w-full aspect-[16/10] bg-[#1a1a1a] rounded-t-[2px] p-[3%]">
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-[1px]" />
        </div>
        <div className="w-[104%] h-[2px] bg-[#c0c0c0]" />
        <div className="w-[104%] h-[3px] bg-[#d4d4d4] rounded-b-[2px]" />
        <span className="text-[7px] text-gray-400 mt-1">Desktop</span>
      </div>
      {/* Tablet */}
      <div className="flex flex-col items-center w-[12%]">
        <div className="w-full aspect-[3/4] bg-[#1a1a1a] rounded-[4%] p-[5%]">
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-[2%]" />
        </div>
        <span className="text-[7px] text-gray-400 mt-1">Tablet</span>
      </div>
      {/* Mobile */}
      <div className="flex flex-col items-center w-[6%]">
        <div className="w-full aspect-[9/19.5] bg-[#1a1a1a] rounded-[16%] p-[5%]">
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-[12%]" />
        </div>
        <span className="text-[7px] text-gray-400 mt-1">Mobile</span>
      </div>
      {/* DOOH */}
      <div className="flex flex-col items-center w-[10%]">
        <div className="w-full aspect-[9/16] bg-[#222] rounded-[2px] p-[3%]">
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-[1px]" />
        </div>
        <div className="w-[6%] h-3 bg-[#666]" />
        <div className="w-[25%] h-0.5 bg-[#777]" />
        <span className="text-[7px] text-gray-400 mt-1">DOOH</span>
      </div>
    </div>
  );
}

/* ─── Main Bento Grid ─────────────────────────────────────── */

export function BentoGrid() {
  const { language } = useLanguage();
  const { ref: statsRef, inView: statsInView } = useInView(0.3);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-[#01b3d4]/[0.04] to-white animate-gradient-drift">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* ── Top-left: Headline + description (spans 2 cols on lg) ── */}
          <div className="lg:col-span-2 rounded-2xl bg-gray-100 p-8 sm:p-10 flex flex-col justify-center">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#01b3d4] mb-4">
              {t(language, "devices.headingHighlight1")}{" "}
              {t(language, "devices.headingMid1")}{" "}
              {t(language, "devices.headingHighlight2")}{" "}
              {t(language, "devices.headingMid2")}
            </h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Data-driven advertisers use our cutting-edge eye-tracking data for live media measurement, post campaign audits, optimise creative, pre-bid targeting, and more.
            </p>
          </div>

          {/* ── Top-right: Stats ── */}
          <div ref={statsRef} className="rounded-2xl bg-gray-100 p-8 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-4">
              <AnimatedStat value={750} suffix="K+" label={t(language, "home.stat2Label")} active={statsInView} />
              <AnimatedStat value={1} suffix="B+" label={t(language, "home.stat1LabelLine1")} active={statsInView} />
              <AnimatedStat value={50} suffix="+" label={t(language, "home.stat3Label")} active={statsInView} />
              <AnimatedStat value={13} suffix="" label={t(language, "home.stat4Label")} active={statsInView} />
            </div>
          </div>

          {/* ── Bottom-left: Mini device screens ── */}
          <div className="rounded-2xl bg-gray-100 p-6 min-h-[220px] overflow-hidden">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#01b3d4] mb-2">Cross-Channel Attention</p>
            <MiniDeviceScreens />
          </div>

          {/* ── Bottom-right: Animated chart (spans 2 cols on lg) ── */}
          <div className="lg:col-span-2 rounded-2xl bg-gray-100 p-6 sm:p-8 min-h-[300px]">
            <AttentionProfitChart />
          </div>

        </div>
      </div>
    </section>
  );
}
