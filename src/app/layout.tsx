import type { Metadata } from "next";
import "./globals.css";
import { CookieBanner } from "@/components/cookie-banner";

export const metadata: Metadata = {
  title: "Lumen Research - Attention-First Advertising Platform",
  description: "Measure attention across all online and offline environments. Lumen's predictive eye-tracking technology helps you create more effective advertising campaigns.",
  keywords: ["attention measurement", "eye-tracking", "advertising analytics", "ad effectiveness", "attention metrics"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
