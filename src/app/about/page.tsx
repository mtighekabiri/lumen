import Link from "next/link";
import { ArrowRight, Heart, Lightbulb, Shield, Users, Award, TrendingUp } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              About Lumen Research
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Founded in 2013, Lumen Research is The Attention Technology Company. We power attention-first advertising through our proprietary predictive eye-tracking technology.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-[#01b3d4]/5 border border-[#01b3d4]/10">
              <p className="text-5xl font-bold text-[#01b3d4]">650K+</p>
              <p className="mt-2 text-gray-600">Eye-Tracking Sessions</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-[#01b3d4]/5 border border-[#01b3d4]/10">
              <p className="text-5xl font-bold text-[#01b3d4]">30B+</p>
              <p className="mt-2 text-gray-600">Programmatic Impressions</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-[#01b3d4]/5 border border-[#01b3d4]/10">
              <p className="text-5xl font-bold text-[#01b3d4]">2013</p>
              <p className="mt-2 text-gray-600">Founded</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Our LAMP (Lumen Attention Measurement &amp; Planning) platform enables you to measure attention across all online and offline environments in a single dashboard.
              </p>
              <p className="mt-4 text-gray-600">
                Compare your advertising investments to find out what works, what doesn&apos;t, and where you should spend future budget.
              </p>
              <p className="mt-4 text-gray-600">
                With Attention Bidding, you can buy media based on predicted attention rather than just viewability. By actually knowing when an ad is seen and for how long, Lumen&apos;s clients create more effective and robust advertising campaigns.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <Card className="border-l-4 border-l-[#01b3d4]">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="h-6 w-6 text-[#01b3d4]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Data-Driven Decisions</CardTitle>
                    <CardDescription className="mt-1">Make smarter advertising investments based on real attention data</CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card className="border-l-4 border-l-[#01b3d4]">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                    <Award className="h-6 w-6 text-[#01b3d4]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Industry Leading</CardTitle>
                    <CardDescription className="mt-1">Pioneering attention measurement since 2013</CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card className="border-l-4 border-l-[#01b3d4]">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-[#01b3d4]/10 flex items-center justify-center shrink-0">
                    <Users className="h-6 w-6 text-[#01b3d4]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Global Reach</CardTitle>
                    <CardDescription className="mt-1">Trusted by leading brands and agencies worldwide</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Lumen Research
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-[#01b3d4]/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-[#01b3d4]" />
                </div>
                <CardTitle className="text-xl">Kind</CardTitle>
                <CardDescription className="mt-2 text-base">
                  We treat everyone with respect and empathy. Our relationships with clients, partners, and each other are built on mutual understanding and care.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center p-8">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-[#01b3d4]/10 flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-[#01b3d4]" />
                </div>
                <CardTitle className="text-xl">Brilliant</CardTitle>
                <CardDescription className="mt-2 text-base">
                  We bring innovative thinking to every challenge. Our team constantly pushes the boundaries of what&apos;s possible in attention measurement.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center p-8">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-[#01b3d4]/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-[#01b3d4]" />
                </div>
                <CardTitle className="text-xl">Honest</CardTitle>
                <CardDescription className="mt-2 text-base">
                  We deliver transparent and truthful insights. Our data tells the real story, helping you make decisions based on facts, not assumptions.
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
            Ready to work with us?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join the growing list of brands and agencies using Lumen to optimize their advertising.
          </p>
          <Link href="/#contact">
            <Button size="lg" variant="outline" className="bg-white text-[#01b3d4] border-white hover:bg-white/90">
              Get In Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
