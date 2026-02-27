import Link from "next/link";
import { ArrowRight, Heart, Lightbulb, Shield, Users, Award, TrendingUp, Globe, Eye, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TranslatedText } from "@/components/translated-text";

export default function AboutPage() {
  return (
    <>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              <TranslatedText text="About Lumen Research" />
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              <TranslatedText text="A global team with 13 years of experience in the attention economy. We use cutting-edge eye-tracking data across 50+ countries to create actionable attention predictions and brand-specific models of attention." />
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl bg-[#01b3d4]/5 border border-[#01b3d4]/10">
              <p className="text-4xl sm:text-5xl font-bold text-[#01b3d4]">13</p>
              <p className="mt-2 text-sm text-gray-600"><TranslatedText text="Years in the Attention Space" /></p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-[#01b3d4]/5 border border-[#01b3d4]/10">
              <p className="text-4xl sm:text-5xl font-bold text-[#01b3d4]">750K+</p>
              <p className="mt-2 text-sm text-gray-600"><TranslatedText text="Real-World Eye-Tracking Sessions" /></p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-[#01b3d4]/5 border border-[#01b3d4]/10">
              <p className="text-4xl sm:text-5xl font-bold text-[#01b3d4]">50+</p>
              <p className="mt-2 text-sm text-gray-600"><TranslatedText text="Countries Coverage" /></p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-[#01b3d4]/5 border border-[#01b3d4]/10">
              <p className="text-4xl sm:text-5xl font-bold text-[#01b3d4]">1B+</p>
              <p className="mt-2 text-sm text-gray-600"><TranslatedText text="Impressions Powering ML Models" /></p>
            </div>
          </div>
        </div>
      </section>

      {/* Who / What / Why / How */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <TranslatedText text="Lumen Turns Attention into Action" />
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-[#01b3d4]">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                  <Users className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <div>
                  <CardTitle className="text-lg"><TranslatedText text="Who" /></CardTitle>
                  <CardDescription className="mt-1"><TranslatedText text="A global team with 13 years of experience in the attention economy." /></CardDescription>
                </div>
              </CardHeader>
            </Card>
            <Card className="border-l-4 border-l-[#01b3d4]">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <div>
                  <CardTitle className="text-lg"><TranslatedText text="What" /></CardTitle>
                  <CardDescription className="mt-1"><TranslatedText text="The Lumen Attention Technology toolkit reduces costs and increases the impact of advertising." /></CardDescription>
                </div>
              </CardHeader>
            </Card>
            <Card className="border-l-4 border-l-[#01b3d4]">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                  <Eye className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <div>
                  <CardTitle className="text-lg"><TranslatedText text="Why" /></CardTitle>
                  <CardDescription className="mt-1"><TranslatedText text="We help data-driven advertisers to minimise ad waste and maximise return." /></CardDescription>
                </div>
              </CardHeader>
            </Card>
            <Card className="border-l-4 border-l-[#01b3d4]">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                  <Globe className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <div>
                  <CardTitle className="text-lg"><TranslatedText text="How" /></CardTitle>
                  <CardDescription className="mt-1"><TranslatedText text="We use cutting-edge eye-tracking data across 50+ countries to create actionable attention predictions and brand-specific models of attention." /></CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <TranslatedText text="Award-Winning Technology" />
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              <TranslatedText text="Recognised by the industry for our innovation and impact" />
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl border border-gray-200 bg-white">
              <div className="h-12 w-12 rounded-full bg-[#01b3d4]/10 flex items-center justify-center mx-auto mb-3">
                <Trophy className="h-6 w-6 text-[#01b3d4]" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#01b3d4] mb-1"><TranslatedText text="Winner" /></p>
              <p className="text-sm font-medium text-gray-900"><TranslatedText text="Best Custom Research Project" /></p>
            </div>
            <div className="text-center p-6 rounded-2xl border border-gray-200 bg-white">
              <div className="h-12 w-12 rounded-full bg-[#01b3d4]/10 flex items-center justify-center mx-auto mb-3">
                <Trophy className="h-6 w-6 text-[#01b3d4]" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#01b3d4] mb-1"><TranslatedText text="Winner" /></p>
              <p className="text-sm font-medium text-gray-900"><TranslatedText text="Best Use of Emerging Technology" /></p>
            </div>
            <div className="text-center p-6 rounded-2xl border border-gray-200 bg-white">
              <div className="h-12 w-12 rounded-full bg-[#01b3d4]/10 flex items-center justify-center mx-auto mb-3">
                <Trophy className="h-6 w-6 text-[#01b3d4]" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#01b3d4] mb-1"><TranslatedText text="Winner" /></p>
              <p className="text-sm font-medium text-gray-900"><TranslatedText text="Tech Team of the Year" /></p>
            </div>
            <div className="text-center p-6 rounded-2xl border border-gray-200 bg-white">
              <div className="h-12 w-12 rounded-full bg-[#01b3d4]/10 flex items-center justify-center mx-auto mb-3">
                <Trophy className="h-6 w-6 text-[#01b3d4]" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#01b3d4] mb-1"><TranslatedText text="Winner" /></p>
              <p className="text-sm font-medium text-gray-900"><TranslatedText text="Research Insights Award" /></p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <TranslatedText text="Our Values" />
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              <TranslatedText text="The principles that guide everything we do at Lumen Research" />
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-[#01b3d4]/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-[#01b3d4]" />
                </div>
                <CardTitle className="text-xl"><TranslatedText text="Kind" /></CardTitle>
                <CardDescription className="mt-2 text-base">
                  <TranslatedText text="We treat everyone with respect and empathy. Our relationships with clients, partners, and each other are built on mutual understanding and care." />
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center p-8">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-[#01b3d4]/10 flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-[#01b3d4]" />
                </div>
                <CardTitle className="text-xl"><TranslatedText text="Brilliant" /></CardTitle>
                <CardDescription className="mt-2 text-base">
                  <TranslatedText text="We bring innovative thinking to every challenge. Our team constantly pushes the boundaries of what's possible in attention measurement." />
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center p-8">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-[#01b3d4]/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-[#01b3d4]" />
                </div>
                <CardTitle className="text-xl"><TranslatedText text="Honest" /></CardTitle>
                <CardDescription className="mt-2 text-base">
                  <TranslatedText text="We deliver transparent and truthful insights. Our data tells the real story, helping you make decisions based on facts, not assumptions." />
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#01b3d4]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            <TranslatedText text="Ready to work with us?" />
          </h2>
          <p className="text-white/90 text-lg mb-8">
            <TranslatedText text="Join the growing list of brands and agencies using Lumen to optimize their advertising." />
          </p>
          <Link href="/#contact">
            <Button size="lg" variant="outline" className="bg-white text-[#01b3d4] border-white hover:bg-white/90">
              <TranslatedText text="Get In Touch" />
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

    </>
  );
}
