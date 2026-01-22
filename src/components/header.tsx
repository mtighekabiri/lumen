"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/context/theme-context";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: "About", href: "#about" },
    { name: "Solutions", href: "#solutions" },
    { name: "News", href: "#news" },
    { name: "Learn", href: "#learn" },
    { name: "FAQs", href: "#faqs" },
    { name: "Contact", href: "#contact" },
  ];

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const ThemeIcon = () => {
    if (theme === "light") return <Sun className="h-5 w-5" />;
    if (theme === "dark") return <Moon className="h-5 w-5" />;
    return <Monitor className="h-5 w-5" />;
  };

  const themeLabel = () => {
    if (theme === "light") return "Light";
    if (theme === "dark") return "Dark";
    return "System";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Lumen"
                width={120}
                height={40}
                className="h-8 w-auto dark:brightness-110"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#01b3d4] dark:hover:text-[#01b3d4] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA + Theme Toggle */}
          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            <button
              onClick={cycleTheme}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={`Theme: ${themeLabel()}`}
            >
              <ThemeIcon />
              <span className="hidden xl:inline">{themeLabel()}</span>
            </button>
            <Link href="#contact">
              <Button>Get In Touch</Button>
            </Link>
          </div>

          {/* Mobile: Theme toggle + menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={cycleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={`Theme: ${themeLabel()}`}
            >
              <ThemeIcon />
            </button>
            <button
              type="button"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-4 border-t border-gray-100 dark:border-gray-800">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#01b3d4]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Get In Touch</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
