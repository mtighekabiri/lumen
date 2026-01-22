import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";

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
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
