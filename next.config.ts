import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for Vercel deployment
  output: 'standalone',
  experimental: {
    // Enable modern features
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
  // Image optimization
  images: {
    domains: ['i.scdn.co', 'mosaic.scdn.co', 'wrapped-images.spotifycdn.com'],
    formats: ['image/webp', 'image/avif'],
  },
  // Headers for better performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
