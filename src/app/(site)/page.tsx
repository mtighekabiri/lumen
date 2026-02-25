import Link from "next/link";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RotatingText } from "@/components/rotating-text";
import { getPostsByCategory } from "@/lib/blog";
import { T } from "@/components/t";
import { HomeFaqSection } from "@/components/home-faq-section";
import { HomeContactForm } from "@/components/home-contact-form";

export const revalidate = 60;

const HeroBanner = dynamic(
  () => import("@/components/hero-banner").then((m) => ({ default: m.HeroBanner })),
  { loading: () => <div className="relative w-full pt-16"><div className="w-full aspect-[9/12] md:aspect-[16/4.725] bg-gray-900" /></div> },
);
const BrandCarousel = dynamic(
  () => import("@/components/brand-carousel").then((m) => ({ default: m.BrandCarousel })),
);
const LumenMediaCreative = dynamic(
  () => import("@/components/lumen-media-creative").then((m) => ({ default: m.LumenMediaCreative })),
);
const CaseStudy3DCarousel = dynamic(
  () => import("@/components/case-study-3d-carousel").then((m) => ({ default: m.CaseStudy3DCarousel })),
);

async function LatestNewsSection() {
  const { LatestNews } = await import("@/components/latest-news");
  return <LatestNews />;
}

async function CaseStudiesCarousel() {
  const caseStudyPosts = await getPostsByCategory("Case Study", 10);
  return <CaseStudy3DCarousel posts={caseStudyPosts} />;
}

export default function Home() {
  return (
    <>
      {/* Hero Banner Video */}
      <HeroBanner>
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-lg">
            <T id="home.heroTitle" /> <RotatingText />
          </h1>
          <div className="mt-8 flex items-center justify-center gap-x-4">
            <Link href="/#contact">
              <Button size="lg">
                <T id="header.getInTouch" />
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/#brands">
              <Button variant="outline" size="lg" className="bg-white/90 hover:bg-white">
                <T id="home.learnMore" />
              </Button>
            </Link>
          </div>
        </div>
      </HeroBanner>

      {/* Brand Logo Carousel */}
      <BrandCarousel id="brands" brands={[
        "dentsu.png", "adidas.png", "amazon.png", "anzu.png", "bbc.png",
        "carlsberg.png", "condenast.png", "criteo.png", "facebook.png",
        "google.png", "heineken.png", "ias.png", "mastercard.png",
        "pinterest.png", "seedtag.png", "snapchat.png", "teads.png",
        "thetradedesk.png", "tiktok.png", "tvision.png", "workday.png",
        "youtube.png",
      ]} />

      {/* Lumen Media & Creative Strip */}
      <LumenMediaCreative />

      {/* News Section — streamed independently */}
      <Suspense fallback={
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"><T id="home.latestNews" /></h2>
            <p className="mt-4 text-lg text-gray-600"><T id="home.loadingNews" /></p>
          </div>
        </section>
      }>
        <LatestNewsSection />
      </Suspense>

      {/* Case Studies Section — streamed independently */}
      <section id="case-studies" className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <Suspense fallback={
                <div className="flex items-center justify-center" style={{ height: "440px" }}>
                  <p className="text-gray-400"><T id="home.loadingCaseStudies" /></p>
                </div>
              }>
                <CaseStudiesCarousel />
              </Suspense>
            </div>
            <div className="lg:col-span-2 text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                <T id="home.caseStudies" />
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                <T id="home.caseStudiesDesc" />
              </p>
              <div className="mt-8">
                <Link href="/news">
                  <Button variant="outline" size="lg">
                    <T id="home.viewAllCaseStudies" />
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <HomeFaqSection />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#01b3d4]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                <T id="home.contactTitle" />
              </h2>
              <p className="mt-4 text-lg text-white/90">
                <T id="home.contactDesc" />
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
            <HomeContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
