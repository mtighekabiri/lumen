import type { NextConfig } from "next";

const wordpressUrl = process.env.WORDPRESS_API_URL;
const wpHostname = wordpressUrl
  ? new URL(wordpressUrl).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allow WordPress media uploads
      ...(wpHostname
        ? [{ protocol: "https" as const, hostname: wpHostname }]
        : []),
    ],
  },
};

export default nextConfig;
