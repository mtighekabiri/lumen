"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { t } from "@/lib/translations";

export function LumenMediaCreative() {
  const { language } = useLanguage();

  return (
    <section className="px-4 sm:px-6 lg:px-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left — For Advertisers */}
          <div className="flex flex-col rounded-2xl bg-gray-100 p-10 sm:p-14">
            <div className="flex-1">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900">
                <span>{t(language, "lmc.forAdvertisersPrefix")}</span>{" "}
                <span className="italic text-[#01b3d4]">
                  {t(language, "lmc.forAdvertisersSuffix")}
                </span>
              </h3>
              <p className="mt-5 text-gray-600 max-w-md leading-relaxed">
                {t(language, "lmc.advertisersDesc")}
              </p>
              <Link href="/solutions" className="inline-block mt-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#01b3d4] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#019bb8]">
                  {t(language, "home.learnMore")}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right — For Agencies */}
          <div className="flex flex-col rounded-2xl bg-gray-100 p-10 sm:p-14">
            <div className="flex-1">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900">
                <span>{t(language, "lmc.forAgenciesPrefix")}</span>{" "}
                <span className="italic text-[#01b3d4]">
                  {t(language, "lmc.forAgenciesSuffix")}
                </span>
              </h3>
              <p className="mt-5 text-gray-600 max-w-md leading-relaxed">
                {t(language, "lmc.agenciesDesc")}
              </p>
              <Link href="/solutions" className="inline-block mt-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#01b3d4] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#019bb8]">
                  {t(language, "home.learnMore")}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
