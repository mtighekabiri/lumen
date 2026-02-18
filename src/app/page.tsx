import Link from "next/link";
import { ArrowRight, Mail, ChevronDown } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { RotatingText } from "@/components/rotating-text";
import { BrandCarousel } from "@/components/brand-carousel";
import { LatestNews } from "@/components/latest-news";
import { HeroBanner } from "@/components/hero-banner";
import { CaseStudy3DCarousel } from "@/components/case-study-3d-carousel";
import { LumenMediaCreative } from "@/components/lumen-media-creative";
import { getPostsByCategory } from "@/lib/blog";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const caseStudyPosts = await getPostsByCategory('Case Study', 10);
  return (
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

      {/* Lumen Media & Creative Strip */}
      <LumenMediaCreative />

      {/* News Section */}
      <LatestNews />

      {/* Case Studies Section */}
      <section id="case-studies" className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Carousel — left 60% */}
            <div className="lg:col-span-3">
              <CaseStudy3DCarousel posts={caseStudyPosts} />
            </div>
            {/* Text — right 40% */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Case Studies
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                See how leading brands use Lumen&apos;s attention technology to transform their advertising performance.
              </p>
              <div className="mt-8">
                <Link href="/news">
                  <Button variant="outline" size="lg">
                    View All Case Studies
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
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
  );
}
