"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { t } from "@/lib/translations";

export function HomeContactForm() {
  const { language } = useLanguage();

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">{t(language, "home.sendUsMessage")}</h3>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {t(language, "home.formName")}
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none"
            placeholder={t(language, "home.formNamePlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {t(language, "home.formEmail")}
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none"
            placeholder={t(language, "home.formEmailPlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            {t(language, "home.formCompany")}
          </label>
          <input
            type="text"
            id="company"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none"
            placeholder={t(language, "home.formCompanyPlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            {t(language, "home.formMessage")}
          </label>
          <textarea
            id="message"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none resize-none"
            placeholder={t(language, "home.formMessagePlaceholder")}
          />
        </div>
        <Button type="submit" className="w-full">
          {t(language, "home.sendMessage")}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
