import Link from "next/link";
import {
  ArrowRight,
  Users,
  TrendingUp,
  Globe,
  Eye,
  Trophy,
  Zap,
  BarChart3,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TranslatedText } from "@/components/translated-text";
import GlobeSection from "@/components/globe-section";

export default function CompanyPage() {
  return (
    <>
      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        {/* Animated grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(1,179,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(1,179,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#01b3d4]/[0.07] rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#01b3d4]/20 bg-[#01b3d4]/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#01b3d4] animate-pulse" />
              <span className="text-[#01b3d4] text-sm font-medium tracking-wide">
                <TranslatedText text="The Attention Technology Company" />
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              <TranslatedText text="About" />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01b3d4] to-[#01b3d4]/70">
                <TranslatedText text="Lumen Research" />
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              <TranslatedText text="A global team with 13 years of experience in the attention economy. We use cutting-edge eye-tracking data across 50+ countries to create actionable attention predictions and brand-specific models of attention." />
            </p>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto">
            {[
              { value: "13", label: "Years in the Attention Space", icon: Zap },
              { value: "750K+", label: "Real-World Eye-Tracking Sessions", icon: Eye },
              { value: "50+", label: "Countries Coverage", icon: Globe },
              { value: "1B+", label: "Impressions Powering ML Models", icon: BarChart3 },
            ].map((stat) => (
              <div
                key={stat.value}
                className="group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-[#01b3d4]/30 hover:bg-[#01b3d4]/[0.04] transition-all duration-300"
              >
                <stat.icon className="h-5 w-5 text-[#01b3d4]/60 mb-3" />
                <p className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</p>
                <p className="mt-1.5 text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                  <TranslatedText text={stat.label} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who / What / Why / How ───────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase text-[#01b3d4] mb-3">
              <TranslatedText text="Our Mission" />
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              <TranslatedText text="Lumen Turns Attention into Action" />
            </h2>
            <div className="mt-4 w-16 h-1 bg-[#01b3d4] rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                icon: Users,
                title: "Who",
                desc: "A global team with 13 years of experience in the attention economy.",
              },
              {
                icon: TrendingUp,
                title: "What",
                desc: "The Lumen Attention Technology toolkit reduces costs and increases the impact of advertising.",
              },
              {
                icon: Eye,
                title: "Why",
                desc: "We help data-driven advertisers to minimise ad waste and maximise return.",
              },
              {
                icon: Target,
                title: "How",
                desc: "We use cutting-edge eye-tracking data across 50+ countries to create actionable attention predictions and brand-specific models of attention.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-xl hover:shadow-[#01b3d4]/[0.06] hover:border-[#01b3d4]/20 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#01b3d4]/10 to-[#01b3d4]/5 flex items-center justify-center shrink-0 group-hover:from-[#01b3d4]/20 group-hover:to-[#01b3d4]/10 transition-all duration-300">
                    <item.icon className="h-7 w-7 text-[#01b3d4]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      <TranslatedText text={item.title} />
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      <TranslatedText text={item.desc} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards Section ────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase text-[#01b3d4] mb-3">
              <TranslatedText text="Recognition" />
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              <TranslatedText text="Award-Winning Technology" />
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              <TranslatedText text="Recognised by the industry for our innovation and impact" />
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Best Custom Research Project",
              "Best Use of Emerging Technology",
              "Tech Team of the Year",
              "Research Insights Award",
            ].map((award) => (
              <div
                key={award}
                className="group relative text-center p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:shadow-[#01b3d4]/[0.06] hover:border-[#01b3d4]/20 transition-all duration-300"
              >
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#01b3d4]/10 to-[#01b3d4]/5 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="h-8 w-8 text-[#01b3d4]" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#01b3d4] mb-2">
                  <TranslatedText text="Winner" />
                </p>
                <p className="text-sm font-semibold text-gray-900 leading-snug">
                  <TranslatedText text={award} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive Globe Section ─────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <GlobeSection />
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#01b3d4] to-[#019bb8] overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.05] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/[0.05] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            <TranslatedText text="Ready to work with us?" />
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            <TranslatedText text="Join the growing list of brands and agencies using Lumen to optimize their advertising." />
          </p>
          <Link href="/#contact">
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-[#01b3d4] border-white hover:bg-white/90 font-semibold px-8 py-3 text-base shadow-lg shadow-black/10"
            >
              <TranslatedText text="Get In Touch" />
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
