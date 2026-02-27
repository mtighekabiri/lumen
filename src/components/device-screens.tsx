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
    <div className="w-full aspect-[9/19] bg-[#1a1a1a] rounded-[16%] p-[5%] shadow-xl ring-1 ring-black/10 relative">
      {/* Dynamic Island */}
      <div className="absolute top-[4%] left-1/2 -translate-x-1/2 w-[26%] h-[2.2%] bg-black rounded-full z-10" />
      <div className="w-full h-full rounded-[12%] overflow-hidden bg-white">
        <Skeleton />
      </div>
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
        <div className="flex items-end justify-center gap-3 sm:gap-5 lg:gap-7">
          {/* TV ~55" → largest */}
          <div className="w-[30%] max-w-[280px]">
            <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">TV / CTV</p>
            <TVScreen />
          </div>

          {/* Laptop ~15" → second largest */}
          <div className="w-[22%] max-w-[200px]">
            <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">Desktop</p>
            <Laptop />
          </div>

          {/* Tablet ~11" portrait */}
          <div className="w-[11%] max-w-[100px]">
            <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">Tablet</p>
            <Tablet />
          </div>

          {/* Mobile ~6.5" */}
          <div className="w-[6.5%] max-w-[60px]">
            <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2 whitespace-nowrap">Mobile</p>
            <MobilePhone />
          </div>

          {/* DOOH D6 — tall standalone panel */}
          <div className="w-[12%] max-w-[110px]">
            <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">DOOH</p>
            <DOOHScreen />
          </div>
        </div>
      </div>
    </section>
  );
}
