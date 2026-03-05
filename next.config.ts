import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Use empty string for custom domains. 
  // If you ever need to deploy back to the default github.io/repo link, 
  // you can set basePath: '/portfolio.github.io' again.
  basePath: '',
  assetPrefix: '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
