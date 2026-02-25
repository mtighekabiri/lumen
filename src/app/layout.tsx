import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "../../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "../../node_modules/next/dist/next-devtools/server/font/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumen Research - Attention-First Advertising Platform",
  description: "Measure attention across all online and offline environments. Lumen's predictive eye-tracking technology helps you create more effective advertising campaigns.",
  keywords: ["attention measurement", "eye-tracking", "advertising analytics", "ad effectiveness", "attention metrics"],
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {process.env.WORDPRESS_URL && (
          <>
            <link rel="dns-prefetch" href={new URL(process.env.WORDPRESS_URL).origin} />
            <link rel="preconnect" href={new URL(process.env.WORDPRESS_URL).origin} crossOrigin="anonymous" />
          </>
        )}
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
