import Link from "next/link";
import { BarChart3, Target, Zap, LineChart, Globe, ArrowRight, Check, Mail, ChevronDown, BookOpen, Heart, Lightbulb, Shield } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageWrapper } from "@/components/page-wrapper";
import { RotatingText } from "@/components/rotating-text";
import { BrandCarousel } from "@/components/brand-carousel";
import { LatestNews } from "@/components/latest-news";
import { HeroBanner } from "@/components/hero-banner";

export default function Home() {
  return (
    <PageWrapper>
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner Video */}
      <HeroBanner>
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-lg">
            Attention into <RotatingText />
          </h1>
          <div className="mt-8 flex items-center justify-center gap-x-4">
            <Link href="/#contact">
              <Button size="lg">
                Get In Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/#brands">
              <Button variant="outline" size="lg" className="bg-white/90 hover:bg-white">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </HeroBanner>

      {/* Brand Logo Carousel */}
      <BrandCarousel id="brands" brands={[
        "dentsu.png",
        "adidas.png",
        "amazon.png",
        "anzu.png",
        "bbc.png",
        "carlsberg.png",
        "condenast.png",
        "criteo.png",
        "facebook.png",
        "google.png",
        "heineken.png",
        "ias.png",
        "mastercard.png",
        "pinterest.png",
        "seedtag.png",
        "snapchat.png",
        "teads.png",
        "thetradedesk.png",
        "tiktok.png",
        "tvision.png",
        "workday.png",
        "youtube.png",
      ]} />

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                About Lumen Research
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Founded in 2013, Lumen Research is The Attention Technology Company. We power attention-first advertising through our proprietary predictive eye-tracking technology.
              </p>
              <p className="mt-4 text-gray-600">
                Our LAMP (Lumen Attention Measurement &amp; Planning) platform enables you to measure attention across all online and offline environments in a single dashboard. Compare your advertising investments to find out what works, what doesn&apos;t, and where you should spend future budget.
              </p>
              <p className="mt-4 text-gray-600">
                With Attention Bidding, you can buy media based on predicted attention rather than just viewability. By actually knowing when an ad is seen and for how long, Lumen&apos;s clients create more effective and robust advertising campaigns.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#01b3d4]">650K+</p>
                  <p className="text-sm text-gray-600">Eye-Tracking Sessions</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#01b3d4]">30B+</p>
                  <p className="text-sm text-gray-600">Programmatic Impressions</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#01b3d4]">2013</p>
                  <p className="text-sm text-gray-600">Founded</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Our Values</h3>
              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                      <Heart className="h-6 w-6 text-[#01b3d4]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Kind</CardTitle>
                      <CardDescription className="mt-1">We treat everyone with respect and empathy</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                      <Lightbulb className="h-6 w-6 text-[#01b3d4]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Brilliant</CardTitle>
                      <CardDescription className="mt-1">We bring innovative thinking to every challenge</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 py-4">
                    <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                      <Shield className="h-6 w-6 text-[#01b3d4]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Honest</CardTitle>
                      <CardDescription className="mt-1">We deliver transparent and truthful insights</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Solutions
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Powered by LAMP (Lumen Attention Measurement &amp; Planning) and Attention Bidding technology.
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

      {/* News Section */}
      <LatestNews />

      {/* Learn Section */}
      <section id="learn" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Learn
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Resources to help you understand and leverage attention measurement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle>Getting Started Guide</CardTitle>
                <CardDescription>
                  Learn the basics of attention measurement and how to interpret your results.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle>Understanding Metrics</CardTitle>
                <CardDescription>
                  Deep dive into attention metrics: view time, attention rate, and more.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle>Best Practices</CardTitle>
                <CardDescription>
                  Tips and strategies for optimizing your creative based on attention data.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle>ROI Calculator</CardTitle>
                <CardDescription>
                  Calculate the potential return on investment from attention optimization.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle>Webinars</CardTitle>
                <CardDescription>
                  Watch recorded sessions from industry experts on attention-first advertising.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-[#01b3d4]" />
                </div>
                <CardTitle>Industry Reports</CardTitle>
                <CardDescription>
                  Access our research reports on attention trends across industries.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to know about Lumen&apos;s attention measurement platform
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "What is predictive eye-tracking?",
                answer: "Predictive eye-tracking uses AI models trained on millions of real eye-tracking data points to predict where people will look on any piece of content. This allows us to measure attention at scale without requiring hardware or panels."
              },
              {
                question: "How accurate is Lumen's attention measurement?",
                answer: "Our predictive models achieve over 90% correlation with actual eye-tracking studies. We continuously validate and improve our models against real-world eye-tracking data."
              },
              {
                question: "What channels can you measure?",
                answer: "We measure attention across all major advertising channels including digital display, video, social media, CTV, linear TV, out-of-home, print, and packaging."
              },
              {
                question: "How long does it take to get results?",
                answer: "Results are typically available within 24-48 hours of uploading your creative. For ongoing campaign measurement, data is updated in real-time."
              },
              {
                question: "Can I compare my results to industry benchmarks?",
                answer: "Yes! Our platform includes comprehensive benchmarks across industries, channels, and ad formats so you can see how your campaigns perform relative to others."
              },
              {
                question: "How do I get started?",
                answer: "Simply contact our team to schedule a demo. We'll walk you through the platform and help you set up your first attention measurement study."
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  {faq.answer}
                </div>
              </details>
            ))}
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
                  href="mailto:hello@lumen-research.com"
                  className="flex items-center text-white hover:text-white/80 transition-colors"
                >
                  <Mail className="h-6 w-6 mr-3" />
                  <span className="text-lg">hello@lumen-research.com</span>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none resize-none"
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
    </PageWrapper>
  );
}
