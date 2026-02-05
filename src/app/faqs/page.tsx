import Link from "next/link";
import { ArrowRight, ChevronDown, HelpCircle } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "What is predictive eye-tracking?",
        answer: "Predictive eye-tracking uses AI models trained on millions of real eye-tracking data points to predict where people will look on any piece of content. This allows us to measure attention at scale without requiring hardware or panels."
      },
      {
        question: "How do I get started with Lumen?",
        answer: "Simply contact our team to schedule a demo. We'll walk you through the platform and help you set up your first attention measurement study. Most clients are up and running within a week."
      },
      {
        question: "What do I need to provide to measure my ads?",
        answer: "For digital ads, you can either provide creative files or we can measure live campaigns via our pixel integration. For TV and OOH, we typically need the creative assets and media plan details."
      },
    ]
  },
  {
    category: "Technology & Accuracy",
    questions: [
      {
        question: "How accurate is Lumen's attention measurement?",
        answer: "Our predictive models achieve over 90% correlation with actual eye-tracking studies. We continuously validate and improve our models against real-world eye-tracking data from our panel of over 650,000 participants."
      },
      {
        question: "What's the difference between viewability and attention?",
        answer: "Viewability measures whether an ad had the opportunity to be seen (e.g., 50% of pixels in view for 1 second). Attention measures whether someone actually looked at and processed the ad. Our research shows that only 35% of viewable ads receive any human attention."
      },
      {
        question: "How does Attention Bidding work?",
        answer: "Attention Bidding uses our predictive models to score each impression opportunity in real-time. Instead of bidding based on viewability alone, you can optimize for predicted attention, ensuring your budget goes to placements more likely to be actually seen."
      },
    ]
  },
  {
    category: "Channels & Coverage",
    questions: [
      {
        question: "What channels can you measure?",
        answer: "We measure attention across all major advertising channels including digital display, video, social media, CTV, linear TV, out-of-home, print, and packaging. Our LAMP platform provides a unified view across all channels."
      },
      {
        question: "Do you support social media platforms?",
        answer: "Yes, we measure attention across all major social platforms including Facebook, Instagram, TikTok, Twitter/X, LinkedIn, Snapchat, and YouTube. Each platform has specific benchmarks and optimization recommendations."
      },
      {
        question: "Can you measure attention for CTV/streaming ads?",
        answer: "Absolutely. CTV is one of our fastest-growing measurement areas. We can measure attention for ads on all major streaming platforms and compare performance to linear TV."
      },
    ]
  },
  {
    category: "Results & Reporting",
    questions: [
      {
        question: "How long does it take to get results?",
        answer: "Results are typically available within 24-48 hours of uploading your creative for testing. For ongoing campaign measurement with our pixel, data is updated in real-time in the LAMP dashboard."
      },
      {
        question: "Can I compare my results to industry benchmarks?",
        answer: "Yes! Our platform includes comprehensive benchmarks across industries, channels, and ad formats so you can see how your campaigns perform relative to others. We publish annual benchmark reports with detailed breakdowns."
      },
      {
        question: "What metrics do you provide?",
        answer: "Key metrics include Attention Rate (% of impressions that receive attention), Attention Time (average seconds of attention), Attention Quality Score (composite metric), and Brand Attention (time on brand elements). We also provide creative heatmaps and element-level analysis."
      },
    ]
  },
  {
    category: "Integration & Pricing",
    questions: [
      {
        question: "Does Lumen integrate with my existing tools?",
        answer: "Yes, we integrate with major DSPs (DV360, The Trade Desk, Amazon DSP), ad servers, and analytics platforms. We also offer API access for custom integrations with your existing marketing stack."
      },
      {
        question: "How is Lumen priced?",
        answer: "We offer flexible pricing based on your needs, including per-study pricing for creative testing and subscription models for ongoing measurement. Contact our team for a customized quote based on your volume and requirements."
      },
      {
        question: "Do you offer enterprise solutions?",
        answer: "Yes, we work with many of the world's largest advertisers and agencies. Enterprise solutions include dedicated support, custom integrations, exclusive benchmarking data, and strategic consulting services."
      },
    ]
  },
];

export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about Lumen&apos;s attention measurement platform. Can&apos;t find what you&apos;re looking for? Contact our team.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs by Category */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-[#01b3d4]" />
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-white rounded-lg shadow-sm border border-gray-200"
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                      <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform shrink-0" />
                    </summary>
                    <div className="px-6 pb-6 text-gray-600">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-8">
            Our team is happy to answer any questions you have about attention measurement, our platform, or how we can help your specific use case.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/learn">
              <Button size="lg" variant="outline">
                Browse Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#01b3d4]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Schedule a demo to see how Lumen can help you measure and optimize attention across all your advertising.
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
