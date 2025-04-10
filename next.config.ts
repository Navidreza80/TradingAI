import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.clerk.com", "img.icons8.com", "utfs.io", "images.unsplash.com", "coin-images.coingecko.com", "assets.coingecko.com", "source.unsplash.com", "via.placeholder.com"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs' module on the client to prevent this error
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        perf_hooks: false,
      };
    }
    return config;
  },
  // Disable the use of Node.js APIs in the browser
  transpilePackages: ['@nodelib/fs.scandir', '@nodelib/fs.stat'],
  // Externalize dependencies that shouldn't be bundled
  serverExternalPackages: ['fs', 'net', 'tls', 'child_process', 'perf_hooks']
};

export default nextConfig;
