"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

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

export default function GlobeSection() {
  return (
    <Suspense
      fallback={
        <div className="w-full flex justify-center">
          <div className="w-[600px] h-[600px] max-w-full aspect-square rounded-full bg-gradient-to-br from-[#01b3d4]/10 to-[#01b3d4]/5 animate-pulse" />
        </div>
      }
    >
      <InteractiveGlobe />
    </Suspense>
  );
}
