import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async rewrites() {
    return [
      {
        source: '/analyses/:path*',
        destination: 'http://localhost:8000/analyses/:path*', // Proxy to backend
      },
    ]
  },
};

export default nextConfig;
