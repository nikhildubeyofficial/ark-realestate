import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.figma.com" },
      { protocol: "https", hostname: "files.alnair.ae" },
    ],
  },
};

export default nextConfig;
