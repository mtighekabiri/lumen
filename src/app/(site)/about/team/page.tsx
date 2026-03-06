import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Lightbulb,
  Shield,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TranslatedText } from "@/components/translated-text";
import { PolaroidStack } from "@/components/polaroid-stack";

const teamPhotos = [
  { src: "/team/team1.jpg" },
  { src: "/team/team2.jpg" },
  { src: "/team/team3.jpg" },
  { src: "/team/team4.jpg" },
  { src: "/team/team5.jpg" },
];

export default function TeamPage() {
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
                <TranslatedText text="Our People" />
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              <TranslatedText text="The" />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01b3d4] to-[#01b3d4]/70">
                <TranslatedText text="Lumen Team" />
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              <TranslatedText text="A global team united by curiosity, kindness, and a shared belief that attention is the most valuable currency in advertising." />
            </p>
          </div>
        </div>
      </section>

      {/* ── Team Polaroid Stack ────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase text-[#01b3d4] mb-3">
              <TranslatedText text="Meet the Team" />
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              <TranslatedText text="The Faces Behind Lumen" />
            </h2>
          </div>
          <PolaroidStack photos={teamPhotos} />
          <p className="mt-10 text-center text-sm text-gray-500">
            <TranslatedText text="Click a photo to shuffle through the stack" />
          </p>
        </div>
      </section>

      {/* ── Team Overview ──────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase text-[#01b3d4] mb-3">
              <TranslatedText text="Who We Are" />
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              <TranslatedText text="Built on Expertise, Driven by Passion" />
            </h2>
            <div className="mt-4 w-16 h-1 bg-[#01b3d4] rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Users,
                title: "Global & Remote-First",
                desc: "Our team spans multiple continents and time zones, bringing diverse perspectives to every challenge we tackle.",
              },
              {
                icon: Lightbulb,
                title: "Research & Technology",
                desc: "Data scientists, engineers, and researchers working together to push the boundaries of attention measurement.",
              },
              {
                icon: Heart,
                title: "Client-Centric",
                desc: "Dedicated account teams who understand your goals and translate attention data into actionable strategies.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative text-center p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-xl hover:shadow-[#01b3d4]/[0.06] hover:border-[#01b3d4]/20 transition-all duration-300"
              >
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#01b3d4]/10 to-[#01b3d4]/5 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-8 w-8 text-[#01b3d4]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  <TranslatedText text={item.title} />
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  <TranslatedText text={item.desc} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values Section ────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase text-[#01b3d4] mb-3">
              <TranslatedText text="Culture" />
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              <TranslatedText text="Our Values" />
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              <TranslatedText text="The principles that guide everything we do at Lumen Research" />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Kind",
                desc: "We treat everyone with respect and empathy. Our relationships with clients, partners, and each other are built on mutual understanding and care.",
                gradient: "from-pink-500/10 to-rose-500/5",
                iconColor: "text-pink-500",
              },
              {
                icon: Lightbulb,
                title: "Brilliant",
                desc: "We bring innovative thinking to every challenge. Our team constantly pushes the boundaries of what's possible in attention measurement.",
                gradient: "from-amber-500/10 to-yellow-500/5",
                iconColor: "text-amber-500",
              },
              {
                icon: Shield,
                title: "Honest",
                desc: "We deliver transparent and truthful insights. Our data tells the real story, helping you make decisions based on facts, not assumptions.",
                gradient: "from-[#01b3d4]/10 to-cyan-500/5",
                iconColor: "text-[#01b3d4]",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="group relative text-center p-10 rounded-2xl border border-gray-100 bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
              >
                <div
                  className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon className={`h-10 w-10 ${value.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  <TranslatedText text={value.title} />
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  <TranslatedText text={value.desc} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#01b3d4] to-[#019bb8] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.05] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/[0.05] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            <TranslatedText text="Want to join the team?" />
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            <TranslatedText text="We're always looking for talented people who share our values and want to shape the future of attention measurement." />
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
