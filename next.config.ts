import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'fimgs.net',
      },
      {
        protocol: 'https',
        hostname: 'amouage.com',
      },
      {
        protocol: 'https',
        hostname: 'us.parfums-de-marly.com',
      },
    ],
  },
};

export default nextConfig;
