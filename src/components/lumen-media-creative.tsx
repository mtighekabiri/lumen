"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { t } from "@/lib/translations";

function LaptopMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      {/* Laptop screen */}
      <div className="rounded-t-lg border border-gray-300 bg-white p-2 shadow-sm">
        <div className="aspect-[16/10] overflow-hidden rounded bg-gray-50">
          {/* Dashboard UI */}
          <div className="flex h-full flex-col p-3">
            {/* Top bar */}
            <div className="flex items-center gap-2 mb-3">
              <div className="h-2 w-2 rounded-full bg-red-400" />
              <div className="h-2 w-2 rounded-full bg-yellow-400" />
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <div className="ml-2 h-3 flex-1 rounded bg-gray-200" />
            </div>
            {/* Chart area */}
            <div className="flex flex-1 gap-2">
              <div className="flex flex-1 items-end gap-1 rounded bg-white p-2">
                <div className="w-3 rounded-t bg-[#01b3d4]/30" style={{ height: "40%" }} />
                <div className="w-3 rounded-t bg-[#01b3d4]/50" style={{ height: "65%" }} />
                <div className="w-3 rounded-t bg-[#01b3d4]/70" style={{ height: "45%" }} />
                <div className="w-3 rounded-t bg-[#01b3d4]" style={{ height: "80%" }} />
                <div className="w-3 rounded-t bg-[#01b3d4]/60" style={{ height: "55%" }} />
                <div className="w-3 rounded-t bg-[#01b3d4]/80" style={{ height: "70%" }} />
                <div className="w-3 rounded-t bg-[#01b3d4]/40" style={{ height: "35%" }} />
              </div>
              <div className="flex w-16 flex-col gap-1.5 rounded bg-white p-2">
                <div className="h-2 w-full rounded bg-gray-200" />
                <div className="h-2 w-3/4 rounded bg-gray-200" />
                <div className="h-2 w-full rounded bg-[#01b3d4]/30" />
                <div className="h-2 w-2/3 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Laptop base */}
      <div className="mx-auto h-3 w-[110%] -ml-[5%] rounded-b-lg bg-gradient-to-b from-gray-200 to-gray-300 shadow-sm" />
      <div className="mx-auto h-1 w-[90%] rounded-b bg-gray-300" style={{ marginLeft: "5%" }} />
    </div>
  );
}

function PhoneMockups() {
  return (
    <div className="relative mx-auto flex w-full max-w-[300px] items-end justify-center gap-3">
      {/* Phone 1 — slightly behind */}
      <div className="w-[120px] -mr-4 mb-2 rounded-2xl border-2 border-gray-300 bg-white p-1.5 shadow-sm">
        <div className="aspect-[9/16] overflow-hidden rounded-xl bg-gray-50">
          <div className="flex h-full flex-col p-2">
            <div className="mx-auto mb-2 h-1 w-8 rounded bg-gray-300" />
            <div className="flex-1 rounded bg-gradient-to-br from-[#01b3d4]/20 to-[#01b3d4]/5 p-2">
              <div className="mb-2 h-2 w-3/4 rounded bg-[#01b3d4]/30" />
              <div className="mb-1.5 h-1.5 w-full rounded bg-gray-200" />
              <div className="mb-1.5 h-1.5 w-2/3 rounded bg-gray-200" />
              <div className="mt-3 h-8 w-full rounded bg-[#01b3d4]/20" />
              <div className="mt-2 h-1.5 w-full rounded bg-gray-200" />
              <div className="mt-1 h-1.5 w-3/4 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
      {/* Phone 2 — foreground */}
      <div className="relative z-10 w-[130px] rounded-2xl border-2 border-gray-300 bg-white p-1.5 shadow-md">
        <div className="aspect-[9/16] overflow-hidden rounded-xl bg-gray-50">
          <div className="flex h-full flex-col p-2">
            <div className="mx-auto mb-2 h-1 w-8 rounded bg-gray-300" />
            <div className="flex-1 rounded bg-gradient-to-br from-[#01b3d4]/10 to-white p-2">
              <div className="mb-2 h-2 w-1/2 rounded bg-[#01b3d4]/40" />
              <div className="mb-3 h-10 w-full rounded bg-[#01b3d4]/15" />
              <div className="flex gap-1 mb-2">
                <div className="h-6 flex-1 rounded bg-gray-200" />
                <div className="h-6 flex-1 rounded bg-[#01b3d4]/25" />
              </div>
              <div className="mb-1.5 h-1.5 w-full rounded bg-gray-200" />
              <div className="mb-1.5 h-1.5 w-5/6 rounded bg-gray-200" />
              <div className="h-1.5 w-2/3 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LumenMediaCreative() {
  const { language } = useLanguage();

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left — For Advertisers */}
          <div className="flex flex-col rounded-2xl bg-gray-100 p-10 sm:p-14">
            <div className="flex-1">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900">
                <span>{t(language, "lmc.forAdvertisersPrefix")}</span>{" "}
                <span className="italic" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  {t(language, "lmc.forAdvertisersSuffix")}
                </span>
              </h3>
              <p className="mt-5 text-gray-600 max-w-md leading-relaxed">
                {t(language, "lmc.advertisersDesc")}
              </p>
              <Link href="/solutions" className="inline-block mt-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-900 px-6 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-900 hover:text-white">
                  {t(language, "home.learnMore")}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
            <div className="mt-10">
              <LaptopMockup />
            </div>
          </div>

          {/* Right — For Agencies */}
          <div className="flex flex-col rounded-2xl bg-gray-100 p-10 sm:p-14">
            <div className="flex-1">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900">
                <span>{t(language, "lmc.forAgenciesPrefix")}</span>{" "}
                <span className="italic" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  {t(language, "lmc.forAgenciesSuffix")}
                </span>
              </h3>
              <p className="mt-5 text-gray-600 max-w-md leading-relaxed">
                {t(language, "lmc.agenciesDesc")}
              </p>
              <Link href="/solutions" className="inline-block mt-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-900 px-6 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-900 hover:text-white">
                  {t(language, "home.learnMore")}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
            <div className="mt-10">
              <PhoneMockups />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
