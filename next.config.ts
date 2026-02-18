import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lumen-research.com",
      },
      {
        protocol: "https",
        hostname: "*.lumen-research.com",
      },
    ],
  },
};

export default nextConfig;
