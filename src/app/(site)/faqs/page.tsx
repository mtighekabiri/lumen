import Link from "next/link";
import { ArrowRight, ChevronDown, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "What is predictive eye-tracking?",
        answer: "Eye-tracking technology is enabled via front-facing camera and browser extension for mobile and desktop to record what people could see and what they do see. Gaze data is captured from opt-in panels to generate AI attention models at scale. No images are stored — just gaze points (x, y, z) and viewing behaviour to protect people's privacy. Our models are powered by 750K+ real-world eye-tracking sessions and 3K continuous panellists."
      },
      {
        question: "How do I get started with Lumen?",
        answer: "Simply contact our team to schedule a demo. We'll walk you through the platform and help you set up your first attention measurement study. For LAMP measurement, you'll need a tag sheet and Lumen tag for Open Web, or we can handle data ingestion for social and streaming platforms."
      },
      {
        question: "What do I need to provide to measure my ads?",
        answer: "For standard online display and video: a tag sheet and Lumen tag. For CTV (Hulu, LG TV, Disney+, NBC, Netflix, Prime): a Lumen pixel or data ingestion. For social media (Facebook, Instagram, TikTok, YouTube, etc.): data ingestion. For offline channels (OOH, Cinema, Print): your media plan with costs, formats, and reach."
      },
    ]
  },
  {
    category: "Technology & Accuracy",
    questions: [
      {
        question: "How accurate is Lumen's attention measurement?",
        answer: "Our predictive models achieve over 90% correlation with actual eye-tracking studies (R² of 92.85%). There is very little variation in attention by market (1% difference), meaning Lumen predicts attention with high accuracy at a global scale. We validate data quality rigorously, retaining around 50-60% of eye-tracking data to ensure high-quality results."
      },
      {
        question: "What's the difference between viewability and attention?",
        answer: "Viewability measures whether an ad achieved MRC minimum standards (50% of pixels on screen for 1 second, or 100% of pixels for 2 seconds of video). Attention measures whether someone actually looked at the ad and for how long. Our analysis of 400B+ attentive impressions shows that 70% of viewable ads are not viewed — meaning viewability alone is not enough."
      },
      {
        question: "How does the Lumen attention model work?",
        answer: "Our model combines eye-tracking data from 750K+ real-world sessions with tagged impressions measured in real-time, plus contextual signals (device, format, ad size, domain, behaviour). Because of these variables, each channel and format has elasticity — our model goes beyond channel and format norms to predict the attention your specific ads get."
      },
    ]
  },
  {
    category: "Channels & Coverage",
    questions: [
      {
        question: "What channels can you measure?",
        answer: "We measure attention across all major channels: digital display and video (desktop and mobile), linear TV, VoD/CTV, social media (Facebook, Instagram, TikTok, YouTube, Pinterest, LinkedIn, X, Snapchat, Twitch), OOH/DOOH, cinema, print, packaging, audio (podcasts, radio, streaming), gaming, email, and retail media. Our LAMP platform provides a unified cross-channel view."
      },
      {
        question: "Do you support social media platforms?",
        answer: "Yes, we have a social attention measurement solution across all major Walled Garden platforms including Facebook, Instagram, TikTok, YouTube, Pinterest, LinkedIn, X, and Snapchat. Social measurement is powered via data ingestion with Lumen models trained across 50+ real-time signals cross-device."
      },
      {
        question: "Can you measure attention for CTV/streaming ads?",
        answer: "Yes. We support CTV measurement via Lumen pixel for platforms including Hulu, LG TV, Disney+, NBC, Peacock, Netflix, Prime, and Twitch. This includes both live measurement and benchmark comparisons, enabling cross-platform performance analysis against linear TV."
      },
    ]
  },
  {
    category: "Results & Reporting",
    questions: [
      {
        question: "How long does it take to get results?",
        answer: "For LAMP campaign measurement, Lumen will share a snapshot report within 48 hours of campaign reports being supplied. For ongoing measurement, data is updated in the LAMP dashboard across cross-channel, Open Web, Walled Garden, and custom report builders."
      },
      {
        question: "Can I compare my results to industry benchmarks?",
        answer: "Yes! Our normative dataset covers Social, Open Web, Print, OOH/DOOH, Cinema, Audio, Gaming, Linear TV, CTV, Retail Media and more. Each insights report includes a bespoke set of normative data selected by a Lumen consultant on a project-by-project basis."
      },
      {
        question: "What metrics do you provide?",
        answer: "Core metrics include: % Viewable (MRC standard), % Viewed (likelihood of being seen, AI-powered), View Time (expected duration if viewed), APM (attentive seconds per 1,000 impressions: % Viewed × View Time × 1,000), and aCPM (cost per 1,000 attentive seconds). For Spotlight studies, we also provide heatmaps, feature analyses, view orders, decay curves, and optimal attention thresholds."
      },
    ]
  },
  {
    category: "Integration & Pricing",
    questions: [
      {
        question: "Does Lumen integrate with my existing tools?",
        answer: "Yes. For activation, we integrate with Index Exchange, The Trade Desk (Kokai), DV360, PubMatic, BidSwitch, and IAS for pre-bid targeting and attention segments. For measurement, we partner with DoubleVerify and IAS for impression-level attention measurement. Lumen's data is also incorporated within agency planning tools and econometric models."
      },
      {
        question: "How is Lumen priced?",
        answer: "We offer flexible pricing including managed and self-service options. Activation via attention PMP segments is available immediately with no contract and no commitment through Index Exchange, The Trade Desk, or DV360. Contact our team for customized pricing based on your measurement and activation needs."
      },
      {
        question: "Do you offer enterprise solutions?",
        answer: "Yes, we work with many of the world's largest advertisers and agencies. Enterprise solutions include dedicated account teams, custom attention algorithms, brand-specific models, exclusive benchmarking data, strategic consulting, PCA (post-campaign analysis) reports, and Omnibus research studies."
      },
    ]
  },
];

export default function FAQsPage() {
  return (
    <>

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

    </>
  );
}
