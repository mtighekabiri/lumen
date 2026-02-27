import Link from "next/link";
import { ArrowRight, Check, Monitor, Tv, MapPin, FileText, BarChart3, Zap, Eye, Target, TrendingDown, Layers, Radio, Gamepad2, Mail, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TranslatedText } from "@/components/translated-text";

export default function SolutionsPage() {
  return (
    <>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              <TranslatedText text="Our Solutions" />
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              <TranslatedText text="Attention is the missing link between impressions and outcomes. Lumen's technology toolkit reduces costs and increases the impact of advertising across every channel." />
            </p>
          </div>
        </div>
      </section>

      {/* The Problem: Ad Wastage */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-red-500 mb-2"><TranslatedText text="The Problem" /></p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <TranslatedText text="People are very good at ignoring advertising" />
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              <TranslatedText text="Unseen ads lead to wasted money. Without attention measurement, your media plan can be just an expensive guess." />
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-red-50 border border-red-100">
              <p className="text-5xl font-bold text-red-500">70%</p>
              <p className="mt-2 text-gray-700 font-medium"><TranslatedText text="Display Wasted Impressions" /></p>
              <p className="mt-1 text-sm text-gray-500"><TranslatedText text="Unseen media" /></p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-red-50 border border-red-100">
              <p className="text-5xl font-bold text-red-500">60%</p>
              <p className="mt-2 text-gray-700 font-medium"><TranslatedText text="Online Video Wasted" /></p>
              <p className="mt-1 text-sm text-gray-500"><TranslatedText text="Unseen media" /></p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-red-50 border border-red-100">
              <p className="text-5xl font-bold text-red-500">55%</p>
              <p className="mt-2 text-gray-700 font-medium"><TranslatedText text="CTV Video Wasted" /></p>
              <p className="mt-1 text-sm text-gray-500"><TranslatedText text="Unseen media" /></p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-400 mt-4"><TranslatedText text="Source: Lumen analysis, 400B+ attentive impressions" /></p>
        </div>
      </section>

      {/* Key Attention Metrics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#01b3d4] mb-2"><TranslatedText text="The Solution" /></p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <TranslatedText text="Lumen's Attention Measurement Framework" />
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              <TranslatedText text="Our eye-tracking technology measures what people actually see, not just what was delivered to their screen" />
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#01b3d4] mb-2"><TranslatedText text="% Viewed" /></p>
              <p className="text-gray-700 text-sm"><TranslatedText text="How many people saw the ad" /></p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#01b3d4] mb-2"><TranslatedText text="View Time" /></p>
              <p className="text-gray-700 text-sm"><TranslatedText text="How long people saw the ad for" /></p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#01b3d4] mb-2"><TranslatedText text="APM" /></p>
              <p className="text-gray-700 text-sm"><TranslatedText text="Attentive seconds per 1,000 impressions" /></p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#01b3d4] mb-2"><TranslatedText text="aCPM" /></p>
              <p className="text-gray-700 text-sm"><TranslatedText text="Cost per 1,000 attentive seconds" /></p>
            </div>
          </div>
        </div>
      </section>

      {/* Attention Journey */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <TranslatedText text="Start Your Attention Journey" />
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              <TranslatedText text="Three stages to transform your advertising with attention data" />
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 border-t-4 border-t-[#01b3d4]">
              <CardHeader>
                <div className="text-4xl font-bold text-[#01b3d4]/20 mb-2">01</div>
                <CardTitle className="text-xl"><TranslatedText text="How much attention do I get?" /></CardTitle>
                <CardDescription className="text-base mt-2">
                  <TranslatedText text="Understand how much attention your ads receive and discover how much of your ad spend is wasted on zero-attention placements." />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600 text-sm">
                    <Check className="h-4 w-4 text-[#01b3d4] mr-2 shrink-0" />
                    <TranslatedText text="Multi-channel attention measurement" />
                  </li>
                  <li className="flex items-center text-gray-600 text-sm">
                    <Check className="h-4 w-4 text-[#01b3d4] mr-2 shrink-0" />
                    <TranslatedText text="Identify wasted impressions" />
                  </li>
                  <li className="flex items-center text-gray-600 text-sm">
                    <Check className="h-4 w-4 text-[#01b3d4] mr-2 shrink-0" />
                    <TranslatedText text="Benchmark against industry norms" />
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="p-6 border-t-4 border-t-[#01b3d4]">
              <CardHeader>
                <div className="text-4xl font-bold text-[#01b3d4]/20 mb-2">02</div>
                <CardTitle className="text-xl"><TranslatedText text="How much attention do I need?" /></CardTitle>
                <CardDescription className="text-base mt-2">
                  <TranslatedText text="Understand and deliver the optimal amount of attention required to drive the business outcomes that matter to you." />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600 text-sm">
                    <Check className="h-4 w-4 text-[#01b3d4] mr-2 shrink-0" />
                    <TranslatedText text="Optimal attention thresholds" />
                  </li>
                  <li className="flex items-center text-gray-600 text-sm">
                    <Check className="h-4 w-4 text-[#01b3d4] mr-2 shrink-0" />
                    <TranslatedText text="Link attention to brand outcomes" />
                  </li>
                  <li className="flex items-center text-gray-600 text-sm">
                    <Check className="h-4 w-4 text-[#01b3d4] mr-2 shrink-0" />
                    <TranslatedText text="Aggregate attention strategies" />
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="p-6 border-t-4 border-t-[#01b3d4]">
              <CardHeader>
                <div className="text-4xl font-bold text-[#01b3d4]/20 mb-2">03</div>
                <CardTitle className="text-xl"><TranslatedText text="How do I use attention to improve every decision?" /></CardTitle>
                <CardDescription className="text-base mt-2">
                  <TranslatedText text="Lumen is already embedded into your planning and buying tools, DSP & SSP partners, and outcomes providers." />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600 text-sm">
                    <Check className="h-4 w-4 text-[#01b3d4] mr-2 shrink-0" />
                    <TranslatedText text="Planning & buying integrations" />
                  </li>
                  <li className="flex items-center text-gray-600 text-sm">
                    <Check className="h-4 w-4 text-[#01b3d4] mr-2 shrink-0" />
                    <TranslatedText text="MMM and econometric models" />
                  </li>
                  <li className="flex items-center text-gray-600 text-sm">
                    <Check className="h-4 w-4 text-[#01b3d4] mr-2 shrink-0" />
                    <TranslatedText text="Prove attention-led ROI" />
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform: LAMP & Spotlight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                <TranslatedText text="LAMP Platform" />
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                <TranslatedText text="The Lumen Attention Measurement Platform enables measurement and optimisation of digital campaigns across programmatic, direct-bought, and Walled Garden activity. Available as managed or self-service." />
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#01b3d4] shrink-0 mt-0.5" />
                  <span className="text-gray-600"><TranslatedText text="Open Web measurement via LAMP attention tag (JavaScript alongside creative)" /></span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#01b3d4] shrink-0 mt-0.5" />
                  <span className="text-gray-600"><TranslatedText text="Social & streaming data ingestion for Walled Gardens" /></span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#01b3d4] shrink-0 mt-0.5" />
                  <span className="text-gray-600"><TranslatedText text="Cross-channel, Open Web, and Walled Garden reports" /></span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#01b3d4] shrink-0 mt-0.5" />
                  <span className="text-gray-600"><TranslatedText text="Supported across all DSPs with platform-specific macros" /></span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                <TranslatedText text="Lumen Spotlight" />
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                <TranslatedText text="A lab-based behavioural science product that tests ads within highly realistic sandbox environments, capturing eye-tracking, device, meta-data, and survey responses." />
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#01b3d4] shrink-0 mt-0.5" />
                  <span className="text-gray-600"><TranslatedText text="In-context creative effectiveness testing" /></span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#01b3d4] shrink-0 mt-0.5" />
                  <span className="text-gray-600"><TranslatedText text="Heatmaps, view orders, and feature-level analysis" /></span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#01b3d4] shrink-0 mt-0.5" />
                  <span className="text-gray-600"><TranslatedText text="Brand recall and choice uplift survey integration" /></span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#01b3d4] shrink-0 mt-0.5" />
                  <span className="text-gray-600"><TranslatedText text="Optimal attention thresholds for brand outcomes" /></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Lumen In-Market */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <TranslatedText text="Lumen In-Market" />
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              <TranslatedText text="Attention data embedded across the advertising ecosystem" />
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-[#01b3d4]/5 p-6 rounded-xl border border-[#01b3d4]/10 text-center">
              <BarChart3 className="h-8 w-8 text-[#01b3d4] mx-auto mb-3" />
              <p className="font-semibold text-gray-900 text-sm"><TranslatedText text="Planning Tools" /></p>
              <p className="mt-2 text-xs text-gray-600"><TranslatedText text="Lumen's data powers attentive reach curves in all major agency planning tools" /></p>
            </div>
            <div className="bg-[#01b3d4]/5 p-6 rounded-xl border border-[#01b3d4]/10 text-center">
              <Target className="h-8 w-8 text-[#01b3d4] mx-auto mb-3" />
              <p className="font-semibold text-gray-900 text-sm"><TranslatedText text="Buying Tools" /></p>
              <p className="mt-2 text-xs text-gray-600"><TranslatedText text="Lumen's models are used in pre-bid targeting in major DSPs and SSPs" /></p>
            </div>
            <div className="bg-[#01b3d4]/5 p-6 rounded-xl border border-[#01b3d4]/10 text-center">
              <Zap className="h-8 w-8 text-[#01b3d4] mx-auto mb-3" />
              <p className="font-semibold text-gray-900 text-sm"><TranslatedText text="Activation" /></p>
              <p className="mt-2 text-xs text-gray-600"><TranslatedText text="Lumen's data helps minimise ad wastage across key Ad Tech platforms" /></p>
            </div>
            <div className="bg-[#01b3d4]/5 p-6 rounded-xl border border-[#01b3d4]/10 text-center">
              <Eye className="h-8 w-8 text-[#01b3d4] mx-auto mb-3" />
              <p className="font-semibold text-gray-900 text-sm">Measure + Impact</p>
              <p className="mt-2 text-xs text-gray-600">Lumen&apos;s models used as ingredient within major viewability attention solutions</p>
            </div>
            <div className="bg-[#01b3d4]/5 p-6 rounded-xl border border-[#01b3d4]/10 text-center">
              <TrendingDown className="h-8 w-8 text-[#01b3d4] mx-auto mb-3" />
              <p className="font-semibold text-gray-900 text-sm">Econometrics</p>
              <p className="mt-2 text-xs text-gray-600">Lumen&apos;s data is incorporated within econometric models to prove ROI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Channel Solutions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Multi-Channel Attention Measurement
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive coverage across every advertising touchpoint
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-5">
              <CardHeader className="p-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                    <Monitor className="h-5 w-5 text-[#01b3d4]" />
                  </div>
                  <CardTitle className="text-base">Digital Media</CardTitle>
                </div>
                <CardDescription className="text-sm">Standard display, video, rich media, outstream, pre-roll, interscrollers, skins, and full-screen takeovers.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-5">
              <CardHeader className="p-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                    <Tv className="h-5 w-5 text-[#01b3d4]" />
                  </div>
                  <CardTitle className="text-base">Linear TV &amp; CTV</CardTitle>
                </div>
                <CardDescription className="text-sm">Linear TV, VoD, Hulu, LG TV, Disney+, NBC, Peacock, Netflix, Prime, and Twitch via tagging, pixel, and data ingestion.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-5">
              <CardHeader className="p-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                    <Layers className="h-5 w-5 text-[#01b3d4]" />
                  </div>
                  <CardTitle className="text-base">Social Media</CardTitle>
                </div>
                <CardDescription className="text-sm">Facebook, Instagram, TikTok, YouTube, Pinterest, LinkedIn, X, Snapchat, and Twitch via data ingestion.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-5">
              <CardHeader className="p-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-[#01b3d4]" />
                  </div>
                  <CardTitle className="text-base">OOH &amp; DOOH</CardTitle>
                </div>
                <CardDescription className="text-sm">Billboards, transit, digital OOH using first-person POV video eye-tracking with creative insertion.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-5">
              <CardHeader className="p-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-[#01b3d4]" />
                  </div>
                  <CardTitle className="text-base">Print &amp; Packaging</CardTitle>
                </div>
                <CardDescription className="text-sm">Newspapers, magazines, product packaging, and point-of-sale tested via e-editions with eye-tracking.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-5">
              <CardHeader className="p-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                    <Monitor className="h-5 w-5 text-[#01b3d4]" />
                  </div>
                  <CardTitle className="text-base">Cinema</CardTitle>
                </div>
                <CardDescription className="text-sm">Cinema advertising attention measurement via in-person and remote eye-tracking studies.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-5">
              <CardHeader className="p-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                    <Radio className="h-5 w-5 text-[#01b3d4]" />
                  </div>
                  <CardTitle className="text-base">Audio</CardTitle>
                </div>
                <CardDescription className="text-sm">Podcasts, radio, and music streaming with audibility measurement and inferred attention modelling.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-5">
              <CardHeader className="p-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                    <Gamepad2 className="h-5 w-5 text-[#01b3d4]" />
                  </div>
                  <CardTitle className="text-base">Gaming</CardTitle>
                </div>
                <CardDescription className="text-sm">In-game advertising (billboards, banners, reward videos, sponsorships) using POV video eye-tracking.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-5">
              <CardHeader className="p-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                    <ShoppingCart className="h-5 w-5 text-[#01b3d4]" />
                  </div>
                  <CardTitle className="text-base">Retail Media</CardTitle>
                </div>
                <CardDescription className="text-sm">In-store and online retail media attention measurement, creating a common currency across all media.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Proven Results */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Proven Results
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Attention drives outcomes across digital performance, brand lift, and profit
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-[#01b3d4]/5 border border-[#01b3d4]/10">
              <p className="text-5xl font-bold text-[#01b3d4]">25%</p>
              <p className="mt-2 text-gray-900 font-medium">Reduction in Ad Wastage</p>
              <p className="mt-1 text-sm text-gray-500">Via Lumen attention segments</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-[#01b3d4]/5 border border-[#01b3d4]/10">
              <p className="text-5xl font-bold text-[#01b3d4]">124%</p>
              <p className="mt-2 text-gray-900 font-medium">Avg Increase in Conversions</p>
              <p className="mt-1 text-sm text-gray-500">Per attention-optimised campaign</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-[#01b3d4]/5 border border-[#01b3d4]/10">
              <p className="text-5xl font-bold text-[#01b3d4]">88%</p>
              <p className="mt-2 text-gray-900 font-medium">Profit Explained by APM</p>
              <p className="mt-1 text-sm text-gray-500">Every +100 APM = +&pound;1 profit / 1,000 impressions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#01b3d4]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to optimise your advertising?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Schedule a demo to see how Lumen can help you measure and improve attention across all your campaigns.
          </p>
          <Link href="/#contact">
            <Button size="lg" variant="outline" className="bg-white text-[#01b3d4] border-white hover:bg-white/90">
              Request a Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

    </>
  );
}
