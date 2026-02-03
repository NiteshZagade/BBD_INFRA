import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
    // Allow local images under /public/images with and without a cache-busting query (e.g., ?v=123)
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/images/**", search: "v=*" },
    ],
  },
  async headers() {
    // Avoid aggressive browser caching for images in development so local
    // replacements are reflected immediately.
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: process.env.NODE_ENV === "production"
              ? "public, max-age=31536000, immutable"
              : "no-store, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
