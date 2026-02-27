"use client";

import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { t } from "@/lib/translations";

const faqKeys = [
  { q: "home.faq1Q", a: "home.faq1A" },
  { q: "home.faq2Q", a: "home.faq2A" },
  { q: "home.faq3Q", a: "home.faq3A" },
  { q: "home.faq4Q", a: "home.faq4A" },
  { q: "home.faq5Q", a: "home.faq5A" },
  { q: "home.faq6Q", a: "home.faq6A" },
];

export function HomeFaqSection() {
  const { language } = useLanguage();

  return (
    <section id="faqs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-[#01b3d4]/[0.04] to-gray-50 animate-gradient-drift">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t(language, "home.faqsTitle")}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t(language, "home.faqsSubtitle")}
          </p>
        </div>

        <div className="space-y-4">
          {faqKeys.map((faq, index) => (
            <details
              key={index}
              className="group bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-medium text-gray-900">{t(language, faq.q)}</span>
                <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                {t(language, faq.a)}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
