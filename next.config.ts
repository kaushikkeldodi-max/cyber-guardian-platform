import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Ensure easy deployment and static handling where needed
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
