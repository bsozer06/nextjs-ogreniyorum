import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos", // dış resim domain'i buraya eklenir
      },
    ],
  },
};

export default nextConfig;
