import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/portfolio.github.io',
  assetPrefix: '/portfolio.github.io/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
