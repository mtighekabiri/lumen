import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Lumen"
                width={120}
                height={40}
                className="h-8 w-auto brightness-110"
              />
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              The Attention Technology Company. Since 2013, we&apos;ve been powering attention-first advertising
              with predictive eye-tracking technology.
            </p>
            <div className="mt-6">
              <a
                href="mailto:hello@lumen-research.com"
                className="flex items-center text-gray-400 hover:text-[#01b3d4] transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                hello@lumen-research.com
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/#about" className="text-gray-400 hover:text-[#01b3d4] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#solutions" className="text-gray-400 hover:text-[#01b3d4] transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-[#01b3d4] transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/#learn" className="text-gray-400 hover:text-[#01b3d4] transition-colors">
                  Learn
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="text-gray-400 hover:text-[#01b3d4] transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-400 hover:text-[#01b3d4] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#01b3d4] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#01b3d4] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#01b3d4] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-[#01b3d4] transition-colors">
                  Content Manager
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Lumen Research. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-[#01b3d4] transition-colors">
              Twitter
            </Link>
            <Link href="#" className="text-gray-400 hover:text-[#01b3d4] transition-colors">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
