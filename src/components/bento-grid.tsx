"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Newspaper, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { t } from "@/lib/translations";

/* ─── Partner logos (auto-detected from public/partners/) ─── */

function usePartnerLogos() {
  const [logos, setLogos] = useState<{ src: string; alt: string; chart: string }[]>([]);
  useEffect(() => {
    fetch("/api/partner-logos")
      .then((r) => r.json())
      .then(setLogos)
      .catch(() => {});
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
    { key: "performance", label: "Performance", title: "Attention drives performance" },
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

  // Trend curve (quadratic fit)
  const curvePts: string[] = [];
  for (let i = 0; i <= 50; i++) {
    const xv = (i / 50) * xMax;
    const yv = Math.min(0.0000017 * xv * xv + 0.0015 * xv + 3, yMax);
    curvePts.push(`${toX(xv)},${toY(yv)}`);
  }
  const curvePath = `M${curvePts.join(" L")}`;

  const yTicks = [0, 20, 40, 60, 80, 100, 120];
  const xTicks = [0, 5000, 10000, 15000, 20000, 25000];

  /* ── Magnifier inset dimensions ── */
  const magW = 120;
  const magH = 90;
  const magX = W - PAD.right - magW - 4;
  const magY = PAD.top + 22;
  const magPad = 14;

  const zoomToX = (v: number) => magX + magPad + ((v - ZOOM_REGION.xMin) / (ZOOM_REGION.xMax - ZOOM_REGION.xMin)) * (magW - magPad * 2);
  const zoomToY = (v: number) => magY + magH - magPad - ((v - ZOOM_REGION.yMin) / (ZOOM_REGION.yMax - ZOOM_REGION.yMin)) * (magH - magPad * 2);

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

            {/* Trend curve */}
            <path d={curvePath} fill="none" stroke="#01b3d4" strokeWidth={2}
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

              {/* Magnifier background */}
              <rect x={magX} y={magY} width={magW} height={magH}
                rx={4} fill="white" stroke="#01b3d4" strokeWidth={1} />

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
        ) : (
          /* ── Placeholder for Brand Lift / Performance tabs ── */
          <div className="w-full h-full flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200">
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-400">
                {activeTab === "brandLift" ? "Brand Lift" : "Performance"} chart
              </p>
              <p className="text-xs text-gray-300 mt-1">Coming soon</p>
            </div>
          </div>
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
            {filtered.map((logo) => (
              <Image
                key={logo.src}
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
  const total = posts.length;

  const goTo = useCallback(
    (i: number) => setActive(Math.max(0, Math.min(i, total - 1))),
    [total],
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40) goTo(active + (dx < 0 ? 1 : -1));
    touchStart.current = null;
  };

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Newspaper className="h-10 w-10 text-gray-300" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#01b3d4] mb-3">
        Latest Insights
      </p>

      {/* Carousel viewport */}
      <div
        className="relative flex-1 min-h-0 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ perspective: "800px" }}
      >
        {posts.map((post, i) => {
          const offset = i - active;

          if (offset < -1 || offset > 2) return null;

          const translateX = offset * 70;
          const scale = offset === 0 ? 1 : 0.88;
          const opacity = offset === 0 ? 1 : offset === 1 ? 0.4 : 0.15;
          const zIndex = 10 - Math.abs(offset);

          return (
            <div
              key={post.id}
              className="absolute inset-x-4 top-0 bottom-0 transition-all duration-500 ease-out"
              style={{
                transform: `translateX(${translateX}%) scale(${scale})`,
                opacity,
                zIndex,
                pointerEvents: offset === 0 ? "auto" : "none",
              }}
            >
              <Link href={`/news/${post.slug}`} className="block h-full">
                <article className="h-full rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-[#01b3d4]/10 to-[#01b3d4]/30 flex-shrink-0">
                    {post.imageUrl ? (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
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

      {/* Navigation arrows + dots */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-1.5">
          <button
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            className="p-1 rounded-full border border-gray-200 hover:border-[#01b3d4] hover:text-[#01b3d4] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-3 w-3" />
          </button>
          <button
            onClick={() => goTo(active + 1)}
            disabled={active >= total - 1}
            className="p-1 rounded-full border border-gray-200 hover:border-[#01b3d4] hover:text-[#01b3d4] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
        <div className="flex gap-1">
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-3.5 bg-[#01b3d4]" : "w-1.5 bg-gray-300"
              }`}
              aria-label={`Article ${i + 1}`}
            />
          ))}
        </div>
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
