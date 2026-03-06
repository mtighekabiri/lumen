import Image from "next/image";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Mail } from "lucide-react";
import { T } from "@/components/t";
import { TranslatedText } from "@/components/translated-text";
import { HomeFaqSection } from "@/components/home-faq-section";
import { HomeContactForm } from "@/components/home-contact-form";


export const revalidate = 60;

const HeroBanner = dynamic(
  () => import("@/components/hero-banner").then((m) => ({ default: m.HeroBanner })),
  { loading: () => <div className="relative w-full pt-16"><div className="w-full aspect-[9/12] md:aspect-[16/3.78] bg-gray-900" /></div> },
);
const BrandCarousel = dynamic(
  () => import("@/components/brand-carousel").then((m) => ({ default: m.BrandCarousel })),
);
const LumenMediaCreative = dynamic(
  () => import("@/components/lumen-media-creative").then((m) => ({ default: m.LumenMediaCreative })),
);
const BentoGrid = dynamic(
  () => import("@/components/bento-grid").then((m) => ({ default: m.BentoGrid })),
);
async function LatestNewsSection() {
  const { LatestNews } = await import("@/components/latest-news");
  return <LatestNews />;
}

export default function Home() {
  return (
    <>
      {/* Hero Banner Video */}
      <HeroBanner>
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-5 items-center px-6 sm:px-10 lg:px-16">
          <div className="md:col-start-4 md:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl max-w-md lg:max-w-lg w-full">
            <Image
              src="/logo.png"
              alt="Lumen"
              width={70}
              height={24}
              className="h-4 sm:h-5 w-auto mb-5"
            />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light leading-tight text-gray-900">
              Turn <span className="italic text-[#01b3d4] font-normal"><T id="home.heroAttention" /></span>{" "}
              into action
            </h1>
            <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              <T id="home.heroDesc" />
            </p>
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

      {/* Faded lumen4 background wrapper — excludes brands carousel */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url('/lumen4.jpg')" }}
          aria-hidden="true"
        />

        {/* Bento Grid — headline, stats, devices, chart */}
        <BentoGrid />

        {/* News Section — streamed independently */}
        <Suspense fallback={
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-[#01b3d4]/[0.04] to-gray-50 animate-gradient-drift">
            <div className="mx-auto max-w-7xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#01b3d4]"><T id="home.latestNews" /></p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl max-w-2xl"><T id="news.stayUpdated" /></h2>
              <p className="mt-6 text-gray-400"><T id="home.loadingNews" /></p>
            </div>
          </section>
        }>
          <LatestNewsSection />
        </Suspense>

        {/* For Advertisers & For Agencies */}
        <LumenMediaCreative />

        {/* FAQs Section */}
        <HomeFaqSection />
      </div>

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
