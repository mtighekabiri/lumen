import Link from "next/link";
import { Eye, BarChart3, Target, Zap, LineChart, Globe, ArrowRight, Check, Mail, Phone } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-[#01b3d4]/10 px-4 py-2 text-sm font-medium text-[#01b3d4] mb-8">
              <Eye className="h-4 w-4 mr-2" />
              Attention-First Advertising Platform
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Know When Your Ads Are{" "}
              <span className="text-[#01b3d4]">Actually Seen</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Lumen&apos;s predictive eye-tracking technology measures real attention across all your advertising channels.
              Stop guessing, start knowing what works.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-4">
              <Link href="#contact">
                <Button size="lg">
                  Get In Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg">
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image/Graphic */}
          <div className="mt-16 relative">
            <div className="rounded-2xl bg-gradient-to-br from-[#01b3d4]/10 to-[#01b3d4]/20 p-8 shadow-xl">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">Campaign Attention Overview</h3>
                  <span className="text-sm text-green-600 font-medium">+23% vs. benchmark</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-[#01b3d4]">2.4s</p>
                    <p className="text-sm text-gray-600 mt-1">Avg. View Time</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">78%</p>
                    <p className="text-sm text-gray-600 mt-1">Attention Rate</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-[#01b3d4]">1.2M</p>
                    <p className="text-sm text-gray-600 mt-1">Impressions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Measure What Matters
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Go beyond impressions. Understand the true attention your ads receive with our comprehensive platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle>Predictive Eye-Tracking</CardTitle>
                <CardDescription>
                  AI-powered attention prediction that shows exactly where eyes focus on your ads.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle>Unified Dashboard</CardTitle>
                <CardDescription>
                  Compare attention metrics across all channels - digital, TV, outdoor, and print - in one place.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle>Creative Optimization</CardTitle>
                <CardDescription>
                  Get actionable insights to improve ad creative based on attention patterns.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle>Real-Time Analytics</CardTitle>
                <CardDescription>
                  Monitor campaign performance in real-time and make data-driven adjustments instantly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle>ROI Attribution</CardTitle>
                <CardDescription>
                  Link attention metrics directly to business outcomes and prove advertising ROI.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle>Global Benchmarks</CardTitle>
                <CardDescription>
                  Compare your performance against industry benchmarks from our global database.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and transform how you measure advertising effectiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-[#01b3d4] flex items-center justify-center text-white text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Creative</h3>
              <p className="text-gray-600">
                Simply upload your ad creative or connect your ad platforms for automatic syncing.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-[#01b3d4] flex items-center justify-center text-white text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Measure Attention</h3>
              <p className="text-gray-600">
                Our AI analyzes your ads using predictive eye-tracking to measure real attention.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-[#01b3d4] flex items-center justify-center text-white text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Optimize & Scale</h3>
              <p className="text-gray-600">
                Use insights to optimize creative and allocate budget to highest-attention placements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Solutions for Every Channel
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Measure attention across all your advertising investments in one unified platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-xl">Digital Advertising</CardTitle>
                <CardDescription className="text-base mt-2">
                  Measure attention for display, video, social, and native ads. Understand which placements
                  and creatives capture the most attention and drive results.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Display & banner ads
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Video pre-roll & mid-roll
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Social media ads
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-xl">TV & Connected TV</CardTitle>
                <CardDescription className="text-base mt-2">
                  Bring attention measurement to the big screen. Compare performance across linear TV
                  and streaming platforms.
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
                    Streaming & CTV ads
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Cross-platform comparison
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-xl">Out-of-Home</CardTitle>
                <CardDescription className="text-base mt-2">
                  Measure attention for billboards, transit ads, and digital out-of-home placements
                  to optimize your OOH investments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Billboards & posters
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Transit advertising
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Digital OOH screens
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-xl">Print & Packaging</CardTitle>
                <CardDescription className="text-base mt-2">
                  Understand how consumers engage with print media and packaging designs to
                  optimize shelf impact and ad placement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Magazine & newspaper ads
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Product packaging
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="h-5 w-5 text-[#01b3d4] mr-2" />
                    Point-of-sale materials
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials/Social Proof */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by Leading Brands
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join hundreds of companies using Lumen to optimize their advertising attention.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            <div className="h-12 w-32 bg-gray-200 rounded flex items-center justify-center text-gray-500 font-semibold">Brand 1</div>
            <div className="h-12 w-32 bg-gray-200 rounded flex items-center justify-center text-gray-500 font-semibold">Brand 2</div>
            <div className="h-12 w-32 bg-gray-200 rounded flex items-center justify-center text-gray-500 font-semibold">Brand 3</div>
            <div className="h-12 w-32 bg-gray-200 rounded flex items-center justify-center text-gray-500 font-semibold">Brand 4</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#01b3d4]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Transform Your Advertising?
              </h2>
              <p className="mt-4 text-lg text-white/90">
                Get in touch with our team to learn how Lumen can help you measure and optimize
                attention across all your advertising channels.
              </p>
              <div className="mt-8 space-y-4">
                <a
                  href="mailto:info@lumen-research.com"
                  className="flex items-center text-white hover:text-white/80 transition-colors"
                >
                  <Mail className="h-6 w-6 mr-3" />
                  <span className="text-lg">info@lumen-research.com</span>
                </a>
                <a
                  href="tel:+441onal234567890"
                  className="flex items-center text-white hover:text-white/80 transition-colors"
                >
                  <Phone className="h-6 w-6 mr-3" />
                  <span className="text-lg">+44 (0) 20 1234 5678</span>
                </a>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none resize-none"
                    placeholder="Tell us about your advertising measurement needs..."
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
