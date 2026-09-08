import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  agentRules: false,
  allowedDevOrigins: ["127.0.0.1"],
  basePath,
  distDir: "dist",
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
