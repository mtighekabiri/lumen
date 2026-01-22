"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Eye } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Eye className="h-8 w-8 text-[#01b3d4]" />
              <span className="text-xl font-bold text-gray-900">Lumen</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-[#01b3d4] transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-[#01b3d4] transition-colors">
              How It Works
            </Link>
            <Link href="#solutions" className="text-sm font-medium text-gray-600 hover:text-[#01b3d4] transition-colors">
              Solutions
            </Link>
            <Link href="#contact" className="text-sm font-medium text-gray-600 hover:text-[#01b3d4] transition-colors">
              Contact
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex md:items-center">
            <Link href="#contact">
              <Button>Get In Touch</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900"
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
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="#features"
              className="block text-sm font-medium text-gray-600 hover:text-[#01b3d4]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="block text-sm font-medium text-gray-600 hover:text-[#01b3d4]"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#solutions"
              className="block text-sm font-medium text-gray-600 hover:text-[#01b3d4]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Solutions
            </Link>
            <Link
              href="#contact"
              className="block text-sm font-medium text-gray-600 hover:text-[#01b3d4]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-gray-100">
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
