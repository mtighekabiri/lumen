"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Newspaper, Calendar, ChevronUp, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { t } from "@/lib/translations";

/* ─── Partner logos (auto-detected from public/partners/) ─── */

function usePartnerLogos() {
  const [logos, setLogos] = useState<{ src: string; alt: string; chart: string }[]>([]);
  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    fetch("/api/partner-logos", { signal: controller.signal })
      .then((r) => r.json())
      .then((data: { src: string; alt: string; chart: string }[]) => {
        if (!ignore) {
          const seen = new Set<string>();
          setLogos(data.filter((l) => (seen.has(l.src) ? false : (seen.add(l.src), true))));
        }
      })
      .catch(() => {});
    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);
  return logos;
}

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
      <p className="text-2xl sm:text-3xl font-normal text-[#01b3d4]">
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

/* ─── Attention drives… chart tabs ────────────────────────── */

type ChartTab = "profit" | "brandLift" | "performance";

const PROFIT_DATA = [
  { label: "Online Display", x: 550, y: 2.5, showLabel: false },
  { label: "Paid Social", x: 800, y: 9, showLabel: false },
  { label: "OOH", x: 1500, y: 11, showLabel: false },
  { label: "Online Video", x: 2350, y: 17, showLabel: false },
  { label: "TV", x: 6500, y: 45, showLabel: true },
  { label: "Cinema", x: 22000, y: 100, showLabel: true },
];

/* Magnifier zoom region — covers the cluster of close points */
const ZOOM_REGION = { xMin: 0, xMax: 3200, yMin: 0, yMax: 22 };

const BRAND_LIFT_DATA = [
  { x: 0,   awareness: 0.0, consideration: 0.0, preference: 0.0, actionIntent: 0.0 },
  { x: 0.5, awareness: 0.8, consideration: 0.7, preference: 0.5, actionIntent: 0.3 },
  { x: 1,   awareness: 1.2, consideration: 1.0, preference: 0.7, actionIntent: 0.4 },
  { x: 1.5, awareness: 1.5, consideration: 1.3, preference: 0.9, actionIntent: 0.5 },
  { x: 2,   awareness: 1.8, consideration: 1.5, preference: 1.1, actionIntent: 0.6 },
  { x: 2.5, awareness: 2.2, consideration: 1.8, preference: 1.3, actionIntent: 0.7 },
  { x: 3,   awareness: 2.4, consideration: 2.0, preference: 1.4, actionIntent: 0.8 },
  { x: 3.5, awareness: 2.8, consideration: 2.2, preference: 1.6, actionIntent: 0.8 },
  { x: 4,   awareness: 3.0, consideration: 2.3, preference: 1.6, actionIntent: 0.9 },
  { x: 4.5, awareness: 3.1, consideration: 2.4, preference: 1.7, actionIntent: 0.9 },
  { x: 5,   awareness: 3.3, consideration: 2.4, preference: 1.8, actionIntent: 0.9 },
  { x: 5.5, awareness: 3.3, consideration: 2.5, preference: 1.8, actionIntent: 0.9 },
  { x: 6,   awareness: 3.5, consideration: 2.6, preference: 1.8, actionIntent: 0.9 },
  { x: 6.5, awareness: 3.7, consideration: 2.7, preference: 2.0, actionIntent: 1.0 },
  { x: 7,   awareness: 3.7, consideration: 2.7, preference: 1.9, actionIntent: 1.0 },
  { x: 7.5, awareness: 3.9, consideration: 2.8, preference: 2.0, actionIntent: 1.1 },
  { x: 8,   awareness: 3.9, consideration: 2.9, preference: 2.1, actionIntent: 1.1 },
  { x: 8.5, awareness: 4.0, consideration: 2.9, preference: 2.2, actionIntent: 1.1 },
  { x: 9,   awareness: 4.2, consideration: 3.0, preference: 2.3, actionIntent: 1.2 },
  { x: 9.5, awareness: 4.3, consideration: 3.1, preference: 2.3, actionIntent: 1.2 },
  { x: 10,  awareness: 4.4, consideration: 3.1, preference: 2.3, actionIntent: 1.1 },
];

const BRAND_LIFT_SERIES: { key: keyof Omit<typeof BRAND_LIFT_DATA[0], "x">; label: string; color: string }[] = [
  { key: "awareness", label: "Awareness", color: "#01b3d4" },
  { key: "consideration", label: "Consideration", color: "#f59e0b" },
  { key: "preference", label: "Preference", color: "#10b981" },
  { key: "actionIntent", label: "Action Intent", color: "#8b5cf6" },
];

const PERFORMANCE_DATA = [
  { label: "0-250", value: 0.03 },
  { label: "250-500", value: 0.04 },
  { label: "500-750", value: 0.06 },
  { label: "750-1,000", value: 0.10 },
  { label: ">1,000", value: 0.17 },
];

function AttentionProfitChart({ partnerLogos }: { partnerLogos: { src: string; alt: string; chart: string }[] }) {
  const { ref, inView } = useInView(0.4);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<ChartTab>("profit");
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

  const tabs: { key: ChartTab; label: string; title: string }[] = [
    { key: "profit", label: "Profit", title: "Attention drives profit" },
    { key: "brandLift", label: "Brand Lift", title: "Attention drives brand lift" },
    { key: "performance", label: "Performance", title: "Attention drives digital performance" },
  ];

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

  // Linear regression (best fit straight line through data)
  const n = PROFIT_DATA.length;
  const sumX = PROFIT_DATA.reduce((s, p) => s + p.x, 0);
  const sumY = PROFIT_DATA.reduce((s, p) => s + p.y, 0);
  const sumXY = PROFIT_DATA.reduce((s, p) => s + p.x * p.y, 0);
  const sumX2 = PROFIT_DATA.reduce((s, p) => s + p.x * p.x, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  const lineY = (xv: number) => Math.max(0, Math.min(slope * xv + intercept, yMax));

  const lineStart = `${toX(0)},${toY(lineY(0))}`;
  const lineEnd = `${toX(xMax)},${toY(lineY(xMax))}`;
  const linePath = `M${lineStart} L${lineEnd}`;

  const yTicks = [0, 20, 40, 60, 80, 100, 120];
  const xTicks = [0, 5000, 10000, 15000, 20000, 25000];

  /* ── Magnifier inset dimensions ── */
  /* Positioned so bottom edge aligns roughly with the £5 mark on y-axis */
  const magW = 120;
  const magH = 90;
  const magX = W - PAD.right - magW - 4;
  const magY = toY(5) - magH;
  const magPad = 14;

  const zoomToX = (v: number) => magX + magPad + ((v - ZOOM_REGION.xMin) / (ZOOM_REGION.xMax - ZOOM_REGION.xMin)) * (magW - magPad * 2);
  const zoomToY = (v: number) => magY + magH - magPad - ((v - ZOOM_REGION.yMin) / (ZOOM_REGION.yMax - ZOOM_REGION.yMin)) * (magH - magPad * 2);

  /* Correlation line clipped to zoom region */
  const zoomLineX1 = ZOOM_REGION.xMin;
  const zoomLineX2 = ZOOM_REGION.xMax;
  const zoomLineY1 = lineY(zoomLineX1);
  const zoomLineY2 = lineY(zoomLineX2);

  const clusteredPoints = PROFIT_DATA.filter((pt) => !pt.showLabel);

  return (
    <div ref={ref} className="w-full h-full flex flex-col">
      {/* Header with tabs (left) + chart title */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
        <div className="flex gap-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                activeTab === tab.key
                  ? "bg-[#01b3d4] text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <h4 className="text-sm font-medium text-gray-800 sm:ml-3">
          {tabs.find((tab) => tab.key === activeTab)?.title}
        </h4>
      </div>

      {/* Chart area */}
      <div className="flex-1 min-h-0">
        {activeTab === "profit" ? (
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Grid lines */}
            {yTicks.map((v) => (
              <line key={`yg-${v}`} x1={PAD.left} x2={W - PAD.right} y1={toY(v)} y2={toY(v)}
                stroke="#e5e7eb" strokeWidth={0.5} />
            ))}

            {/* Y-axis labels */}
            {yTicks.map((v) => (
              <text key={`yl-${v}`} x={PAD.left - 6} y={toY(v) + 3} textAnchor="end"
                className="fill-gray-500" fontSize={8}>
                £{v}
              </text>
            ))}

            {/* X-axis labels */}
            {xTicks.map((v) => (
              <text key={`xl-${v}`} x={toX(v)} y={PAD.top + plotH + 14} textAnchor="middle"
                className="fill-gray-500" fontSize={8}>
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

            {/* Straight correlation line */}
            <path d={linePath} fill="none" stroke="#01b3d4" strokeWidth={2}
              strokeDasharray="6 3" opacity={0.5}
              style={{
                strokeDashoffset: (1 - progress) * 800,
                transition: "stroke-dashoffset 0.05s linear",
              }} />

            {/* Data points */}
            {PROFIT_DATA.map((pt, i) => {
              const cx = toX(pt.x);
              const cy = toY(pt.y);
              const delay = i * 0.12;
              const pointProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));

              return (
                <g key={pt.label} opacity={pointProgress}>
                  <circle cx={cx} cy={cy} r={4} fill="#01b3d4" />
                  {pt.showLabel && (
                    <text x={cx} y={cy - 8} textAnchor="middle"
                      className="fill-gray-700" fontSize={8} fontWeight={500}>
                      {pt.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* ── Magnifier inset for clustered points ── */}
            <g opacity={progress}>
              {/* Dashed box around cluster on main chart */}
              <rect
                x={toX(ZOOM_REGION.xMin)} y={toY(ZOOM_REGION.yMax)}
                width={toX(ZOOM_REGION.xMax) - toX(ZOOM_REGION.xMin)}
                height={toY(ZOOM_REGION.yMin) - toY(ZOOM_REGION.yMax)}
                fill="none" stroke="#01b3d4" strokeWidth={0.8} strokeDasharray="3 2" rx={2}
              />

              {/* Connector lines from cluster box to magnifier */}
              <line
                x1={toX(ZOOM_REGION.xMax)} y1={toY(ZOOM_REGION.yMax)}
                x2={magX} y2={magY}
                stroke="#01b3d4" strokeWidth={0.5} strokeDasharray="2 2" opacity={0.5}
              />
              <line
                x1={toX(ZOOM_REGION.xMax)} y1={toY(ZOOM_REGION.yMin)}
                x2={magX} y2={magY + magH}
                stroke="#01b3d4" strokeWidth={0.5} strokeDasharray="2 2" opacity={0.5}
              />

              {/* Magnifier background — matches chart bg */}
              <defs>
                <clipPath id="mag-clip">
                  <rect x={magX} y={magY} width={magW} height={magH} rx={4} />
                </clipPath>
              </defs>
              <rect x={magX} y={magY} width={magW} height={magH}
                rx={4} fill="#f3f4f6" stroke="#01b3d4" strokeWidth={1} />

              {/* Correlation line inside magnifier */}
              <line
                x1={zoomToX(zoomLineX1)} y1={zoomToY(zoomLineY1)}
                x2={zoomToX(zoomLineX2)} y2={zoomToY(zoomLineY2)}
                stroke="#01b3d4" strokeWidth={1.5} strokeDasharray="4 2" opacity={0.5}
                clipPath="url(#mag-clip)"
              />

              {/* Magnifier icon */}
              <circle cx={magX + 10} cy={magY + 10} r={4} fill="none" stroke="#01b3d4" strokeWidth={0.8} />
              <line x1={magX + 13} y1={magY + 13} x2={magX + 16} y2={magY + 16}
                stroke="#01b3d4" strokeWidth={0.8} />

              {/* Zoomed data points */}
              {clusteredPoints.map((pt) => {
                const zx = zoomToX(pt.x);
                const zy = zoomToY(pt.y);
                return (
                  <g key={`zoom-${pt.label}`}>
                    <circle cx={zx} cy={zy} r={3} fill="#01b3d4" />
                    <text x={zx} y={zy - 6} textAnchor="middle"
                      className="fill-gray-700" fontSize={8} fontWeight={500}>
                      {pt.label}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* R² annotation */}
            <text x={W - PAD.right - 5} y={PAD.top + 14} textAnchor="end"
              className="fill-gray-400" fontSize={8} opacity={progress}>
              R² = 0.979
            </text>
          </svg>
        ) : activeTab === "performance" ? (
          /* ── Performance bar chart ── */
          (() => {
            const perfW = W;
            const perfH = H;
            const perfPad = { top: 20, right: 20, bottom: 55, left: 30 };
            const perfPlotW = perfW - perfPad.left - perfPad.right;
            const perfPlotH = perfH - perfPad.top - perfPad.bottom;
            const barCount = PERFORMANCE_DATA.length;
            const gap = perfPlotW * 0.15 / (barCount + 1);
            const barW = (perfPlotW - gap * (barCount + 1)) / barCount;
            const perfYMax = 0.20;

            return (
              <svg viewBox={`0 0 ${perfW} ${perfH}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Bars */}
                {PERFORMANCE_DATA.map((d, i) => {
                  const barX = perfPad.left + gap + i * (barW + gap);
                  const barH = (d.value / perfYMax) * perfPlotH;
                  const barY = perfPad.top + perfPlotH - barH;
                  const delay = i * 0.1;
                  const barProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));

                  return (
                    <g key={d.label}>
                      <rect
                        x={barX} y={perfPad.top + perfPlotH - barH * barProgress}
                        width={barW} height={barH * barProgress}
                        rx={3} fill="#01b3d4" opacity={0.8}
                      />
                      {/* Value label above bar */}
                      <text
                        x={barX + barW / 2} y={barY - 6}
                        textAnchor="middle" className="fill-gray-700" fontSize={8} fontWeight={500}
                        opacity={barProgress}
                      >
                        {d.value.toFixed(2)}%
                      </text>
                      {/* X-axis category label */}
                      <text
                        x={barX + barW / 2} y={perfPad.top + perfPlotH + 14}
                        textAnchor="middle" className="fill-gray-500" fontSize={8}
                      >
                        {d.label}
                      </text>
                    </g>
                  );
                })}

                {/* Upward arrow from first to last bar */}
                {(() => {
                  const first = PERFORMANCE_DATA[0];
                  const last = PERFORMANCE_DATA[PERFORMANCE_DATA.length - 1];
                  const firstX = perfPad.left + gap + barW / 2;
                  const lastX = perfPad.left + gap + (barCount - 1) * (barW + gap) + barW / 2;
                  const firstY = perfPad.top + perfPlotH - (first.value / perfYMax) * perfPlotH - 14;
                  const lastY = perfPad.top + perfPlotH - (last.value / perfYMax) * perfPlotH - 14;
                  return (
                    <g opacity={progress}>
                      <defs>
                        <marker id="perf-arrowhead" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
                          <polygon points="0 0, 6 2.5, 0 5" fill="#01b3d4" />
                        </marker>
                      </defs>
                      <line
                        x1={firstX} y1={firstY}
                        x2={lastX} y2={lastY}
                        stroke="#01b3d4" strokeWidth={1.5} strokeDasharray="4 2"
                        markerEnd="url(#perf-arrowhead)"
                      />
                    </g>
                  );
                })()}

                {/* Baseline */}
                <line
                  x1={perfPad.left} y1={perfPad.top + perfPlotH}
                  x2={perfW - perfPad.right} y2={perfPad.top + perfPlotH}
                  stroke="#d1d5db" strokeWidth={0.5}
                />

                {/* X-axis label */}
                <text x={perfPad.left + perfPlotW / 2} y={perfH - 2} textAnchor="middle"
                  className="fill-gray-500" fontSize={8}>
                  Attentive seconds per 1,000 impressions (APM)
                </text>
              </svg>
            );
          })()
        ) : activeTab === "brandLift" ? (
          /* ── Brand Lift multi-line chart ── */
          (() => {
            const blW = W;
            const blH = H;
            const blPad = { top: 20, right: 15, bottom: 55, left: 40 };
            const blPlotW = blW - blPad.left - blPad.right;
            const blPlotH = blH - blPad.top - blPad.bottom;
            const blXMax = 10;
            const blYMax = 5;

            const blToX = (v: number) => blPad.left + (v / blXMax) * blPlotW;
            const blToY = (v: number) => blPad.top + blPlotH - (v / blYMax) * blPlotH;

            const xTicks = [0, 2, 4, 6, 8, 10];
            const yTicks = [0, 1, 2, 3, 4, 5];

            return (
              <svg viewBox={`0 0 ${blW} ${blH}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Grid lines */}
                {yTicks.map((v) => (
                  <line key={`blg-${v}`} x1={blPad.left} x2={blW - blPad.right}
                    y1={blToY(v)} y2={blToY(v)} stroke="#e5e7eb" strokeWidth={0.5} />
                ))}

                {/* Y-axis labels */}
                {yTicks.map((v) => (
                  <text key={`bly-${v}`} x={blPad.left - 6} y={blToY(v) + 3}
                    textAnchor="end" className="fill-gray-500" fontSize={8}>
                    {v.toFixed(1)}%
                  </text>
                ))}

                {/* X-axis labels */}
                {xTicks.map((v) => (
                  <text key={`blx-${v}`} x={blToX(v)} y={blPad.top + blPlotH + 14}
                    textAnchor="middle" className="fill-gray-500" fontSize={8}>
                    {v}
                  </text>
                ))}

                {/* Axis labels */}
                <text x={blPad.left + blPlotW / 2} y={blH - 2} textAnchor="middle"
                  className="fill-gray-500" fontSize={8}>
                  Attentive seconds threshold
                </text>
                <text transform={`translate(10, ${blPad.top + blPlotH / 2}) rotate(-90)`}
                  textAnchor="middle" className="fill-gray-500" fontSize={7}>
                  Brand lift (% points lift vs campaign avg)
                </text>

                {/* Series lines + dots */}
                {BRAND_LIFT_SERIES.map((series) => {
                  const points = BRAND_LIFT_DATA.map((d) => ({
                    x: blToX(d.x),
                    y: blToY(d[series.key] as number),
                  }));
                  const pathD = points
                    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
                    .join(" ");

                  return (
                    <g key={series.key} opacity={progress}>
                      <path d={pathD} fill="none" stroke={series.color} strokeWidth={1.5} />
                      {/* Show dots at sparse intervals to keep it clean */}
                      {points.filter((_, i) => i % 4 === 0 || i === points.length - 1).map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r={2.5} fill={series.color} />
                      ))}
                    </g>
                  );
                })}

                {/* Legend */}
                {BRAND_LIFT_SERIES.map((series, i) => {
                  const lx = blPad.left + 8 + i * 82;
                  const ly = blPad.top + blPlotH + 30;
                  return (
                    <g key={`leg-${series.key}`} opacity={progress}>
                      <line x1={lx} y1={ly} x2={lx + 12} y2={ly} stroke={series.color} strokeWidth={2} />
                      <text x={lx + 16} y={ly + 3} className="fill-gray-600" fontSize={7}>
                        {series.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            );
          })()
        ) : (
          null
        )}
      </div>

      {/* Partner logos for active chart */}
      {(() => {
        const filtered = partnerLogos.filter((l) => l.chart === activeTab);
        if (filtered.length === 0) return null;
        return (
          <div className="mt-4 pt-3 border-t border-gray-200 flex items-center gap-4 flex-wrap">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider whitespace-nowrap">
              In partnership with
            </span>
            {filtered.map((logo, i) => (
              <Image
                key={`${logo.chart}-${logo.src}-${i}`}
                src={logo.src}
                alt={logo.alt}
                width={80}
                height={28}
                className="h-5 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
            ))}
          </div>
        );
      })()}
    </div>
  );
}


/* ─── Latest Insights carousel for bento cell ────────────── */

type InsightPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  imageUrl: string | null;
  publishedAt: string;
};

function useInsightPosts() {
  const [posts, setPosts] = useState<InsightPost[]>([]);
  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data: InsightPost[]) => setPosts(data.slice(0, 8)))
      .catch(() => {});
  }, []);
  return posts;
}

function InsightsCarousel() {
  const posts = useInsightPosts();
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const total = posts.length;

  const goTo = useCallback(
    (i: number) => setActive(Math.max(0, Math.min(i, total - 1))),
    [total],
  );

  /* Vertical swipe (mobile) */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const dy = e.changedTouches[0].clientY - touchStart.current;
    if (Math.abs(dy) > 40) goTo(active + (dy < 0 ? 1 : -1));
    touchStart.current = null;
  };

  /* Mouse wheel (desktop) */
  const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      if (wheelTimeout.current) return;
      if (Math.abs(e.deltaY) < 10) return;
      goTo(active + (e.deltaY > 0 ? 1 : -1));
      wheelTimeout.current = setTimeout(() => {
        wheelTimeout.current = null;
      }, 300);
    },
    [active, goTo],
  );

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Newspaper className="h-10 w-10 text-gray-300" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#01b3d4]">
          Latest Insights
        </p>
        <div className="flex gap-1.5">
          <button
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            className="p-1 rounded-full border border-gray-200 hover:border-[#01b3d4] hover:text-[#01b3d4] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous"
          >
            <ChevronUp className="h-3 w-3" />
          </button>
          <button
            onClick={() => goTo(active + 1)}
            disabled={active >= total - 1}
            className="p-1 rounded-full border border-gray-200 hover:border-[#01b3d4] hover:text-[#01b3d4] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next"
          >
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Vertical carousel viewport */}
      <div
        ref={viewportRef}
        className="relative flex-1 min-h-0 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onWheel={onWheel}
      >
        {posts.map((post, i) => {
          const offset = i - active;

          if (offset < -1 || offset > 2) return null;

          const translateY = offset * 100;
          const scale = offset === 0 ? 1 : 0.92;
          const opacity = offset === 0 ? 1 : offset === 1 ? 0.3 : 0;
          const zIndex = 10 - Math.abs(offset);

          return (
            <div
              key={post.id}
              className="absolute inset-x-0 top-0 bottom-0 transition-all duration-500 ease-out"
              style={{
                transform: `translateY(${translateY}%) scale(${scale})`,
                opacity,
                zIndex,
                pointerEvents: offset === 0 ? "auto" : "none",
              }}
            >
              <Link href={`/news/${post.slug}`} className="block h-full">
                <article className="h-full rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
                  <div className="relative w-full flex-shrink-0" style={{ aspectRatio: "16/9" }}>
                    {post.imageUrl ? (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#01b3d4]/10 to-[#01b3d4]/30">
                        <Newspaper className="h-6 w-6 text-[#01b3d4]/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <span className="text-[9px] font-medium text-[#01b3d4]">
                      {post.category}
                    </span>
                    <h4 className="mt-0.5 text-xs font-semibold text-gray-900 line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="mt-auto pt-1.5 flex items-center gap-1 text-[9px] text-gray-400">
                      <Calendar className="h-2 w-2" />
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1 mt-2">
        {posts.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active ? "h-3.5 w-1.5 bg-[#01b3d4]" : "h-1.5 w-1.5 bg-gray-300"
            }`}
            aria-label={`Article ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Main Bento Grid ─────────────────────────────────────── */

export function BentoGrid() {
  const { language } = useLanguage();
  const { ref: statsRef, inView: statsInView } = useInView(0.3);
  const partnerLogos = usePartnerLogos();

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-[#01b3d4]/[0.04] to-white animate-gradient-drift">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* ── Top-left: Headline + description (spans 2 cols on lg) ── */}
          <div className="lg:col-span-2 rounded-2xl bg-gray-100 p-8 sm:p-10 flex flex-col justify-center">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-normal italic text-[#01b3d4] mb-4">
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

          {/* ── Bottom-left: Animated chart (spans 2 cols on lg) ── */}
          <div className="lg:col-span-2 rounded-2xl bg-gray-100 p-6 sm:p-8 min-h-[300px]">
            <AttentionProfitChart partnerLogos={partnerLogos} />
          </div>

          {/* ── Bottom-right: Latest Insights carousel ── */}
          <div className="rounded-2xl bg-gray-100 p-5 min-h-[280px]">
            <InsightsCarousel />
          </div>

        </div>
      </div>
    </section>
  );
}
