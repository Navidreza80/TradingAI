import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS hostnames
      },
      {
        protocol: "http",
        hostname: "**", // Allow all HTTP hostnames (optional and not recommended)
      },
    ],
  },
};

export default nextConfig;
