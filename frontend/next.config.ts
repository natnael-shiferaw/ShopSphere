import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        // All requests to /api/:path* will be rewritten
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL}/api/:path*`,
      },
    ];
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
