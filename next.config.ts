import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // better-sqlite3 native modül olduğu için sunucuda dışarıda bırakıyoruz
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
