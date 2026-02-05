import Link from "next/link";
import { ArrowRight, Check, Monitor, Tv, MapPin, FileText, BarChart3, Zap } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Our Solutions
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Powered by LAMP (Lumen Attention Measurement &amp; Planning) and Attention Bidding technology. Measure and optimize attention across every advertising channel.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                LAMP Platform
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                The Lumen Attention Measurement &amp; Planning platform is your single source of truth for attention data across all advertising channels.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#01b3d4] shrink-0 mt-0.5" />
                  <span className="text-gray-600">Unified dashboard for all channels</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#01b3d4] shrink-0 mt-0.5" />
                  <span className="text-gray-600">Real-time attention metrics</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#01b3d4] shrink-0 mt-0.5" />
                  <span className="text-gray-600">Industry benchmarks and comparisons</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#01b3d4] shrink-0 mt-0.5" />
                  <span className="text-gray-600">Creative optimization insights</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Attention Bidding
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Buy media based on predicted attention rather than just viewability. Optimize your programmatic campaigns in real-time.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#01b3d4] shrink-0 mt-0.5" />
                  <span className="text-gray-600">Predictive attention scoring</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#01b3d4] shrink-0 mt-0.5" />
                  <span className="text-gray-600">DSP integrations (DV360, TTD, Amazon)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#01b3d4] shrink-0 mt-0.5" />
                  <span className="text-gray-600">Real-time bid optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#01b3d4] shrink-0 mt-0.5" />
                  <span className="text-gray-600">Cost-per-attention-second targeting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Channel Solutions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Solutions by Channel
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive attention measurement across every advertising touchpoint
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4">
                  <Monitor className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle className="text-xl">Digital Advertising</CardTitle>
                <CardDescription className="text-base mt-2">
                  Measure attention for display, video, social, and native ads. Understand which placements and creatives capture the most attention and drive results.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Display &amp; banner ads
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Video pre-roll &amp; mid-roll
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Social media ads
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Native advertising
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4">
                  <Tv className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle className="text-xl">TV &amp; Connected TV</CardTitle>
                <CardDescription className="text-base mt-2">
                  Bring attention measurement to the big screen. Compare performance across linear TV and streaming platforms.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Linear TV commercials
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Streaming &amp; CTV ads
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Cross-platform comparison
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Addressable TV
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle className="text-xl">Out-of-Home</CardTitle>
                <CardDescription className="text-base mt-2">
                  Measure attention for billboards, transit ads, and digital out-of-home placements to optimize your OOH investments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Billboards &amp; posters
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Transit advertising
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Digital OOH screens
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Place-based media
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle className="text-xl">Print &amp; Packaging</CardTitle>
                <CardDescription className="text-base mt-2">
                  Understand how consumers engage with print media and packaging designs to optimize shelf impact and ad placement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Magazine &amp; newspaper ads
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Product packaging
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Point-of-sale materials
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Direct mail
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Lumen?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-[#01b3d4]/10 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-[#01b3d4]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">90%+ Accuracy</h3>
              <p className="text-gray-600">
                Our predictive models achieve over 90% correlation with actual eye-tracking studies.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-[#01b3d4]/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-[#01b3d4]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Results</h3>
              <p className="text-gray-600">
                Get attention data in real-time for ongoing campaigns, or within 24-48 hours for creative testing.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-[#01b3d4]/10 flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-[#01b3d4]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Proven ROI</h3>
              <p className="text-gray-600">
                Clients typically see 30-40% improvement in campaign performance after attention optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#01b3d4]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to optimize your advertising?
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

      <Footer />
    </div>
  );
}
