"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { Menu, X, Search } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/context/language-context";
import { t } from "@/lib/translations";

const searchableContent = [
  { title: "Home", description: "Main landing page", href: "/", keywords: "home landing page attention technology" },
  { title: "About Lumen Research", description: "Founded in 2013, The Attention Technology Company", href: "/about", keywords: "about lumen research founded 2013 attention technology company eye-tracking history team" },
  { title: "Our Solutions", description: "LAMP & Attention Bidding technology", href: "/solutions", keywords: "solutions lamp attention measurement planning bidding technology platform" },
  { title: "Digital Advertising", description: "Measure attention for display, video, social, and native ads", href: "/solutions#digital", keywords: "digital advertising display video social native ads banner" },
  { title: "TV & Connected TV", description: "Attention measurement for linear TV and streaming", href: "/solutions#tv", keywords: "tv ctv connected television streaming linear commercials" },
  { title: "Out-of-Home", description: "Billboards, transit ads, and digital OOH", href: "/solutions#ooh", keywords: "out of home ooh billboards transit advertising digital screens posters" },
  { title: "Print & Packaging", description: "Print media and packaging design measurement", href: "/solutions#print", keywords: "print packaging magazine newspaper product shelf" },
  { title: "News", description: "Latest news and updates from Lumen", href: "/news", keywords: "news articles blog updates latest" },
  { title: "Learn", description: "Resources for attention measurement", href: "/learn", keywords: "learn resources guides tutorials education" },
  { title: "FAQs", description: "Frequently asked questions about Lumen", href: "/faqs", keywords: "faqs frequently asked questions help support" },
  { title: "Predictive Eye-Tracking", description: "AI models trained on millions of real data points", href: "/faqs", keywords: "predictive eye tracking ai models data" },
  { title: "Contact Us", description: "Get in touch with the Lumen team", href: "/#contact", keywords: "contact get in touch email message form" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { language } = useLanguage();

  const navigation = [
    { name: t(language, "nav.home"), href: "/" },
    { name: t(language, "nav.about"), href: "/about" },
    { name: t(language, "nav.solutions"), href: "/solutions" },
    { name: t(language, "nav.news"), href: "/news" },
    { name: t(language, "nav.learn"), href: "/learn" },
    { name: t(language, "nav.faqs"), href: "/faqs" },
  ];

  const searchResults = searchQuery.trim().length > 0
    ? searchableContent.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.keywords.toLowerCase().includes(query)
        );
      })
    : [];

  const handleSearchToggle = useCallback(() => {
    if (searchOpen) {
      setSearchOpen(false);
      setSearchQuery("");
    } else {
      setSearchOpen(true);
      setTimeout(() => searchInputRef.current?.focus(), 300);
    }
  }, [searchOpen]);

  const handleResultClick = useCallback((href: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    setMobileSearchOpen(false);
    setMobileMenuOpen(false);
    router.push(href);
  }, [router]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
        setMobileSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (mobileSearchOpen) {
      setTimeout(() => mobileSearchInputRef.current?.focus(), 100);
    }
  }, [mobileSearchOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Lumen"
                width={60}
                height={20}
                className="h-4 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {navigation.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#01b3d4] border-b-2 border-[#01b3d4] pb-0.5"
                      : "text-gray-600 hover:text-[#01b3d4]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Search + Language + CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-2" ref={searchContainerRef}>
            {/* Search area */}
            <div className="relative flex items-center">
              <button
                type="button"
                onClick={handleSearchToggle}
                className="p-2 text-gray-600 hover:text-[#01b3d4] transition-colors rounded-full hover:bg-gray-100"
                aria-label={searchOpen ? "Close search" : "Open search"}
              >
                {searchOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </button>

              {/* Sliding search bar */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  searchOpen ? "w-64 opacity-100 ml-2" : "w-0 opacity-0 ml-0"
                }`}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t(language, "header.searchPlaceholder")}
                  className="w-full h-10 px-4 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none"
                />
              </div>

              {/* Search results dropdown */}
              {searchOpen && searchQuery.trim().length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50">
                  {searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleResultClick(result.href)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <p className="text-sm font-medium text-gray-900">{result.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{result.description}</p>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <p className="text-sm text-gray-500">{t(language, "header.noResults")}</p>
                      <p className="text-xs text-gray-400 mt-1">{t(language, "header.tryDifferent")}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Get In Touch button */}
            <Link href="/#contact">
              <Button>{t(language, "header.getInTouch")}</Button>
            </Link>
          </div>

          {/* Mobile menu + search + CTA */}
          <div className="flex lg:hidden items-center gap-1">
            <Link href="/#contact">
              <Button size="sm" className="text-xs px-3 h-8">
                {t(language, "header.getInTouch")}
              </Button>
            </Link>
            <LanguageSwitcher />
            <button
              type="button"
              className="p-2 text-gray-600 hover:text-[#01b3d4] transition-colors"
              onClick={() => {
                setMobileSearchOpen(!mobileSearchOpen);
                if (mobileMenuOpen) setMobileMenuOpen(false);
              }}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="p-2 text-gray-600 hover:text-gray-900"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (mobileSearchOpen) setMobileSearchOpen(false);
              }}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {mobileSearchOpen && (
          <div className="lg:hidden py-3 border-t border-gray-100">
            <div className="relative">
              <input
                ref={mobileSearchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t(language, "header.searchPlaceholder")}
                className="w-full h-10 px-4 pr-10 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#01b3d4] focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  setMobileSearchOpen(false);
                  setSearchQuery("");
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {searchQuery.trim().length > 0 && (
              <div className="mt-2 bg-white rounded-lg border border-gray-200 max-h-60 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleResultClick(result.href)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <p className="text-sm font-medium text-gray-900">{result.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{result.description}</p>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-4 text-center">
                    <p className="text-sm text-gray-500">{t(language, "header.noResults")}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-4 border-t border-gray-100">
            {navigation.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block text-sm font-medium ${
                    isActive ? "text-[#01b3d4]" : "text-gray-600 hover:text-[#01b3d4]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-gray-100">
              <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">{t(language, "header.getInTouch")}</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
