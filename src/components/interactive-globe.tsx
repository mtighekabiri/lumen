"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";

// Country data: countries where Lumen has collected attention data
const LUMEN_COUNTRIES = [
  { name: "United Kingdom", lat: 51.5, lng: -0.12, size: 0.8 },
  { name: "United States", lat: 39.8, lng: -98.6, size: 0.8 },
  { name: "Germany", lat: 51.2, lng: 10.4, size: 0.6 },
  { name: "France", lat: 46.6, lng: 2.3, size: 0.6 },
  { name: "Australia", lat: -25.3, lng: 133.8, size: 0.6 },
  { name: "Canada", lat: 56.1, lng: -106.3, size: 0.6 },
  { name: "Japan", lat: 36.2, lng: 138.3, size: 0.6 },
  { name: "Brazil", lat: -14.2, lng: -51.9, size: 0.6 },
  { name: "India", lat: 20.6, lng: 78.9, size: 0.6 },
  { name: "China", lat: 35.9, lng: 104.2, size: 0.6 },
  { name: "South Korea", lat: 35.9, lng: 127.8, size: 0.5 },
  { name: "Italy", lat: 41.9, lng: 12.6, size: 0.5 },
  { name: "Spain", lat: 40.5, lng: -3.7, size: 0.5 },
  { name: "Netherlands", lat: 52.1, lng: 5.3, size: 0.5 },
  { name: "Sweden", lat: 60.1, lng: 18.6, size: 0.5 },
  { name: "Norway", lat: 60.5, lng: 8.5, size: 0.5 },
  { name: "Denmark", lat: 56.3, lng: 9.5, size: 0.5 },
  { name: "Finland", lat: 61.9, lng: 25.7, size: 0.5 },
  { name: "Switzerland", lat: 46.8, lng: 8.2, size: 0.5 },
  { name: "Austria", lat: 47.5, lng: 14.6, size: 0.5 },
  { name: "Belgium", lat: 50.5, lng: 4.5, size: 0.5 },
  { name: "Poland", lat: 51.9, lng: 19.1, size: 0.5 },
  { name: "Ireland", lat: 53.4, lng: -8.2, size: 0.5 },
  { name: "Portugal", lat: 39.4, lng: -8.2, size: 0.4 },
  { name: "Czech Republic", lat: 49.8, lng: 15.5, size: 0.4 },
  { name: "New Zealand", lat: -40.9, lng: 174.9, size: 0.4 },
  { name: "Singapore", lat: 1.4, lng: 103.8, size: 0.4 },
  { name: "Mexico", lat: 23.6, lng: -102.6, size: 0.5 },
  { name: "Argentina", lat: -38.4, lng: -63.6, size: 0.4 },
  { name: "Colombia", lat: 4.6, lng: -74.3, size: 0.4 },
  { name: "Chile", lat: -35.7, lng: -71.5, size: 0.4 },
  { name: "South Africa", lat: -30.6, lng: 22.9, size: 0.5 },
  { name: "Nigeria", lat: 9.1, lng: 8.7, size: 0.4 },
  { name: "Kenya", lat: -0.02, lng: 37.9, size: 0.4 },
  { name: "Egypt", lat: 26.8, lng: 30.8, size: 0.4 },
  { name: "UAE", lat: 23.4, lng: 53.8, size: 0.5 },
  { name: "Saudi Arabia", lat: 23.9, lng: 45.1, size: 0.5 },
  { name: "Israel", lat: 31.0, lng: 34.9, size: 0.4 },
  { name: "Turkey", lat: 39.0, lng: 35.2, size: 0.5 },
  { name: "Thailand", lat: 15.9, lng: 100.9, size: 0.4 },
  { name: "Vietnam", lat: 14.1, lng: 108.3, size: 0.4 },
  { name: "Indonesia", lat: -0.8, lng: 113.9, size: 0.5 },
  { name: "Philippines", lat: 12.9, lng: 121.8, size: 0.4 },
  { name: "Malaysia", lat: 4.2, lng: 101.9, size: 0.4 },
  { name: "Taiwan", lat: 23.7, lng: 121.0, size: 0.4 },
  { name: "Hong Kong", lat: 22.4, lng: 114.1, size: 0.4 },
  { name: "Romania", lat: 45.9, lng: 25.0, size: 0.4 },
  { name: "Hungary", lat: 47.2, lng: 19.5, size: 0.4 },
  { name: "Greece", lat: 39.1, lng: 21.8, size: 0.4 },
  { name: "Croatia", lat: 45.1, lng: 15.2, size: 0.3 },
  { name: "Slovakia", lat: 48.7, lng: 19.7, size: 0.3 },
  { name: "Peru", lat: -9.2, lng: -75.0, size: 0.4 },
];

// Arc data for connections between key hubs
const ARC_DATA = [
  { startLat: 51.5, startLng: -0.12, endLat: 39.8, endLng: -98.6 },
  { startLat: 51.5, startLng: -0.12, endLat: 36.2, endLng: 138.3 },
  { startLat: 51.5, startLng: -0.12, endLat: -25.3, endLng: 133.8 },
  { startLat: 51.5, startLng: -0.12, endLat: 20.6, endLng: 78.9 },
  { startLat: 51.5, startLng: -0.12, endLat: -14.2, endLng: -51.9 },
  { startLat: 51.5, startLng: -0.12, endLat: -30.6, endLng: 22.9 },
  { startLat: 39.8, startLng: -98.6, endLat: 35.9, endLng: 127.8 },
  { startLat: 39.8, startLng: -98.6, endLat: 23.6, endLng: -102.6 },
];

function GlobeInner() {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [GlobeComponent, setGlobeComponent] = useState<any>(null);

  useEffect(() => {
    import("react-globe.gl").then((mod) => {
      setGlobeComponent(() => mod.default);
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        const size = Math.min(width, 600);
        setDimensions({ width: size, height: size });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;
    const globe = globeRef.current;
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.8;
    globe.controls().enableZoom = true;
    globe.controls().minDistance = 150;
    globe.controls().maxDistance = 500;
    globe.pointOfView({ lat: 30, lng: 10, altitude: 2.2 });
  }, [GlobeComponent]);

  const handlePointHover = useCallback((point: any) => {
    setHoveredCountry(point ? point.name : null);
    if (containerRef.current) {
      containerRef.current.style.cursor = point ? "pointer" : "grab";
    }
  }, []);

  if (!GlobeComponent) {
    return (
      <div ref={containerRef} className="w-full flex justify-center">
        <div
          style={{ width: dimensions.width, height: dimensions.height }}
          className="rounded-full bg-gradient-to-br from-[#01b3d4]/10 to-[#01b3d4]/5 animate-pulse flex items-center justify-center"
        >
          <div className="text-[#01b3d4]/40 text-sm font-medium">Loading Globe...</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      {/* Hovered country label */}
      <div className="h-8 flex items-center justify-center mb-2">
        {hoveredCountry && (
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#01b3d4] text-white text-sm font-medium shadow-lg shadow-[#01b3d4]/25 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            {hoveredCountry}
          </span>
        )}
      </div>

      {/* Globe with stand */}
      <div className="relative">
        <GlobeComponent
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          backgroundImageUrl=""
          backgroundColor="rgba(0,0,0,0)"
          pointsData={LUMEN_COUNTRIES}
          pointLat="lat"
          pointLng="lng"
          pointColor={() => "#01b3d4"}
          pointAltitude={0.01}
          pointRadius={(d: any) => d.size}
          pointsMerge={false}
          onPointHover={handlePointHover}
          arcsData={ARC_DATA}
          arcColor={() => ["#01b3d4aa", "#01b3d466"]}
          arcStroke={0.5}
          arcDashLength={0.6}
          arcDashGap={0.3}
          arcDashAnimateTime={3000}
          arcAltitudeAutoScale={0.4}
          atmosphereColor="#01b3d4"
          atmosphereAltitude={0.2}
          animateIn={true}
        />

        {/* Stand base */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
          {/* Pole */}
          <div className="w-3 h-10 bg-gradient-to-b from-gray-400 to-gray-500 rounded-sm" />
          {/* Base */}
          <div className="w-32 h-3 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full" />
          <div className="w-40 h-2 bg-gradient-to-b from-gray-500 to-gray-600 rounded-full -mt-0.5" />
          {/* Shadow */}
          <div className="w-48 h-3 bg-black/10 rounded-full blur-sm -mt-0.5" />
        </div>
      </div>

      {/* Instructions */}
      <p className="text-xs text-gray-400 mt-16 select-none">
        Drag to spin &middot; Scroll to zoom &middot; Hover points to explore
      </p>
    </div>
  );
}

export default function InteractiveGlobe() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-[600px] h-[600px] max-w-full aspect-square rounded-full bg-gradient-to-br from-[#01b3d4]/10 to-[#01b3d4]/5 animate-pulse" />
      </div>
    );
  }
  return <GlobeInner />;
}
