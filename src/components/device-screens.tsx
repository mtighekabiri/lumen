"use client";

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

function TVScreen() {
  return (
    <div className="flex flex-col items-center">
      {/* Thin-bezel panel */}
      <div className="w-full aspect-[16/9] bg-[#1a1a1a] rounded-[3px] sm:rounded-[4px] p-[1.8%] shadow-xl ring-1 ring-black/10">
        <div className="w-full h-full rounded-[1px] overflow-hidden bg-white">
          <Skeleton />
        </div>
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
        <div className="w-full h-full rounded-[1px] overflow-hidden bg-white">
          <Skeleton />
        </div>
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
      <div className="w-full h-full rounded-[3%] overflow-hidden bg-white">
        <Skeleton />
      </div>
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
      <div className="w-full h-full rounded-[14%] overflow-hidden bg-white">
        <Skeleton />
      </div>
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
        <div className="w-full h-full rounded-[1px] overflow-hidden bg-white">
          <DOOHSkeleton />
        </div>
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
        <div className="w-full h-full rounded-[1px] overflow-hidden bg-white">
          <DOOHSkeleton />
        </div>
      </div>
      {/* Stand / wall bracket */}
      <div className="w-[8%] h-3 sm:h-5 bg-gradient-to-b from-[#555] to-[#777]" />
      <div className="w-[25%] h-1 sm:h-1.5 bg-[#666] rounded-sm" />
    </div>
  );
}

function PrintMedia() {
  return (
    <div className="flex flex-col items-center">
      {/* Magazine / newspaper page */}
      <div className="w-full aspect-[3/4] bg-white rounded-[2px] sm:rounded-[3px] shadow-xl ring-1 ring-gray-200 overflow-hidden">
        <Skeleton />
      </div>
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

export function DeviceScreens() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#01b3d4]">
            Cross-Channel Attention
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Measure Attention Everywhere
          </h2>
        </div>

        {/* Devices row — sizes approximate real-world proportions */}
        <div className="flex items-end justify-center gap-2 sm:gap-3 lg:gap-5">
          {/* Cinema — ultra-wide, far left, much larger */}
          <div className="w-[24%] max-w-[260px]">
            <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">Cinema</p>
            <CinemaScreen />
          </div>

          {/* TV ~55" — bigger */}
          <div className="w-[22%] max-w-[240px]">
            <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">TV / CTV</p>
            <TVScreen />
          </div>

          {/* Laptop ~15" */}
          <div className="w-[14%] max-w-[150px]">
            <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">Desktop</p>
            <Laptop />
          </div>

          {/* Tablet ~11" portrait */}
          <div className="w-[7%] max-w-[75px]">
            <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">Tablet</p>
            <Tablet />
          </div>

          {/* Mobile ~6.5" — smaller */}
          <div className="w-[3.5%] max-w-[38px]">
            <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2 whitespace-nowrap">Mobile</p>
            <MobilePhone />
          </div>

          {/* DOOH D6 — tall standalone panel */}
          <div className="w-[8%] max-w-[85px]">
            <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">DOOH</p>
            <DOOHScreen />
          </div>

          {/* Print — magazine/newspaper, far right */}
          <div className="w-[6%] max-w-[65px]">
            <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">Print</p>
            <PrintMedia />
          </div>

          {/* Audio — AirPods, far right */}
          <div className="w-[5%] max-w-[55px]">
            <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">Audio</p>
            <AudioDevice />
          </div>
        </div>
      </div>
    </section>
  );
}
