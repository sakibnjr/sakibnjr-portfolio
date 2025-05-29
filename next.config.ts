import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "api.microlink.io", 'plus.unsplash.com', 'images.unsplash.com' // Microlink Image Preview
    ],
  },
};

export default nextConfig;
