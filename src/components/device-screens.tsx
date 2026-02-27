"use client";

function Skeleton() {
  return (
    <div className="w-full h-full bg-gray-100 p-[8%] flex flex-col gap-[6%]">
      <div className="h-[10%] w-[60%] bg-gray-300/80 rounded animate-pulse" />
      <div className="h-[6%] w-[90%] bg-gray-200/80 rounded animate-pulse" />
      <div className="h-[6%] w-[75%] bg-gray-200/80 rounded animate-pulse" />
      <div className="flex-1 w-full bg-gray-300/60 rounded animate-pulse" />
      <div className="h-[6%] w-[40%] bg-gray-200/80 rounded animate-pulse" />
    </div>
  );
}

function Laptop() {
  return (
    <div className="flex flex-col items-center">
      {/* Screen */}
      <div className="w-full aspect-[16/10] bg-gray-800 rounded-t-lg p-[3%] shadow-lg">
        <div className="w-full h-full rounded-sm overflow-hidden bg-white">
          <Skeleton />
        </div>
      </div>
      {/* Base */}
      <div className="w-[110%] h-[5%] bg-gradient-to-b from-gray-400 to-gray-300 rounded-b-lg" />
      <div className="w-[35%] h-[2%] bg-gray-300 rounded-b" />
    </div>
  );
}

function MobilePhone() {
  return (
    <div className="w-full aspect-[9/18] bg-gray-800 rounded-[14%] p-[6%] shadow-lg">
      {/* Notch */}
      <div className="absolute top-[3%] left-1/2 -translate-x-1/2 w-[30%] h-[2.5%] bg-gray-900 rounded-full" />
      <div className="w-full h-full rounded-[8%] overflow-hidden bg-white relative">
        <Skeleton />
      </div>
    </div>
  );
}

function Tablet() {
  return (
    <div className="w-full aspect-[4/3] bg-gray-800 rounded-[6%] p-[4%] shadow-lg">
      <div className="w-full h-full rounded-[2%] overflow-hidden bg-white">
        <Skeleton />
      </div>
    </div>
  );
}

function TVScreen() {
  return (
    <div className="flex flex-col items-center">
      {/* Screen */}
      <div className="w-full aspect-[16/9] bg-gray-900 rounded-lg p-[2.5%] shadow-lg">
        <div className="w-full h-full rounded-sm overflow-hidden bg-white">
          <Skeleton />
        </div>
      </div>
      {/* Stand */}
      <div className="w-[20%] h-3 bg-gray-400" />
      <div className="w-[35%] h-1.5 bg-gray-400 rounded-b" />
    </div>
  );
}

function DOOHScreen() {
  return (
    <div className="flex flex-col items-center">
      {/* Portrait screen */}
      <div className="w-full aspect-[9/16] bg-gray-800 rounded-lg p-[3%] shadow-lg">
        <div className="w-full h-full rounded-sm overflow-hidden bg-white">
          <Skeleton />
        </div>
      </div>
      {/* Pole */}
      <div className="w-[8%] h-10 sm:h-14 bg-gray-500" />
      {/* Base plate */}
      <div className="w-[40%] h-2 bg-gray-500 rounded" />
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

        {/* Devices row */}
        <div className="flex items-end justify-center gap-4 sm:gap-6 lg:gap-8">
          {/* TV */}
          <div className="w-[28%] max-w-[260px]">
            <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">TV / CTV</p>
            <TVScreen />
          </div>

          {/* Laptop */}
          <div className="w-[26%] max-w-[240px]">
            <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">Desktop</p>
            <Laptop />
          </div>

          {/* Tablet */}
          <div className="w-[16%] max-w-[150px]">
            <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">Tablet</p>
            <Tablet />
          </div>

          {/* Mobile */}
          <div className="w-[8%] max-w-[80px] relative">
            <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">Mobile</p>
            <MobilePhone />
          </div>

          {/* DOOH */}
          <div className="w-[10%] max-w-[100px]">
            <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">DOOH</p>
            <DOOHScreen />
          </div>
        </div>
      </div>
    </section>
  );
}
