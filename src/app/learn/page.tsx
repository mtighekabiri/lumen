import Link from "next/link";
import { ArrowRight, BookOpen, BarChart3, Target, LineChart, Zap, Globe, FileText, Video, Download } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Learn
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Resources to help you understand and leverage attention measurement. From getting started guides to advanced optimization strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4 group-hover:bg-[#01b3d4]/20 transition-colors">
                  <BookOpen className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle className="group-hover:text-[#01b3d4] transition-colors">Getting Started Guide</CardTitle>
                <CardDescription>
                  Learn the basics of attention measurement and how to interpret your results. Perfect for teams new to attention metrics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4 group-hover:bg-[#01b3d4]/20 transition-colors">
                  <BarChart3 className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle className="group-hover:text-[#01b3d4] transition-colors">Understanding Metrics</CardTitle>
                <CardDescription>
                  Deep dive into attention metrics: view time, attention rate, attention quality score, and more.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4 group-hover:bg-[#01b3d4]/20 transition-colors">
                  <Target className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle className="group-hover:text-[#01b3d4] transition-colors">Best Practices</CardTitle>
                <CardDescription>
                  Tips and strategies for optimizing your creative based on attention data. Learn what drives higher attention.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Tools &amp; Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4 group-hover:bg-[#01b3d4]/20 transition-colors">
                  <LineChart className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle className="group-hover:text-[#01b3d4] transition-colors">ROI Calculator</CardTitle>
                <CardDescription>
                  Calculate the potential return on investment from attention optimization. See how much you could save.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4 group-hover:bg-[#01b3d4]/20 transition-colors">
                  <FileText className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle className="group-hover:text-[#01b3d4] transition-colors">Benchmarks Database</CardTitle>
                <CardDescription>
                  Access comprehensive attention benchmarks across industries, channels, and ad formats.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4 group-hover:bg-[#01b3d4]/20 transition-colors">
                  <Download className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle className="group-hover:text-[#01b3d4] transition-colors">Templates &amp; Frameworks</CardTitle>
                <CardDescription>
                  Download planning templates, reporting frameworks, and presentation decks for your team.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Educational Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4 group-hover:bg-[#01b3d4]/20 transition-colors">
                  <Zap className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle className="group-hover:text-[#01b3d4] transition-colors">Webinars</CardTitle>
                <CardDescription>
                  Watch recorded sessions from industry experts on attention-first advertising and measurement best practices.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4 group-hover:bg-[#01b3d4]/20 transition-colors">
                  <Globe className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle className="group-hover:text-[#01b3d4] transition-colors">Industry Reports</CardTitle>
                <CardDescription>
                  Access our research reports on attention trends across industries. Stay ahead of the curve.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4 group-hover:bg-[#01b3d4]/20 transition-colors">
                  <Video className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle className="group-hover:text-[#01b3d4] transition-colors">Video Tutorials</CardTitle>
                <CardDescription>
                  Step-by-step video guides for using the LAMP platform and implementing attention bidding.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Resource */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex items-center rounded-full bg-[#01b3d4]/10 px-3 py-1 text-sm font-medium text-[#01b3d4] mb-4">
                  Featured Resource
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  2025 Attention Benchmarks Report
                </h2>
                <p className="text-gray-600 mb-6">
                  Our comprehensive annual report analyzing attention data from over 10 billion impressions. Discover benchmarks across channels, industries, and ad formats.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#01b3d4] mr-2"></span>
                    Channel-by-channel benchmarks
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#01b3d4] mr-2"></span>
                    Industry vertical comparisons
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#01b3d4] mr-2"></span>
                    Creative optimization insights
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#01b3d4] mr-2"></span>
                    Year-over-year trends
                  </li>
                </ul>
                <Link href="/#contact">
                  <Button>
                    Request the Report
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="bg-gradient-to-br from-[#01b3d4]/10 to-[#01b3d4]/30 rounded-xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="h-24 w-24 text-[#01b3d4]/60 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-gray-900">10B+</p>
                  <p className="text-gray-600">Impressions Analyzed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#01b3d4]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need personalized guidance?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Our team is here to help you get the most out of attention measurement. Schedule a consultation today.
          </p>
          <Link href="/#contact">
            <Button size="lg" variant="outline" className="bg-white text-[#01b3d4] border-white hover:bg-white/90">
              Contact Our Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
