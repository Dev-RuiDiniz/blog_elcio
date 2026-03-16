import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [45, 75, 92],
    minimumCacheTTL: 300,
  },
  experimental: {
    optimizeCss: true,
  },
  compress: true,
};

export default nextConfig;
