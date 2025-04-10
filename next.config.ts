import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS hostnames
      },
      {
        protocol: 'http',
        hostname: '**', // Allow all HTTP hostnames (optional and not recommended)
      },
    ],
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
