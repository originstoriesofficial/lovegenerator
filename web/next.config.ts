import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "90mb",
    },
    // this has to be there in order to build the project properly
    serverComponentsExternalPackages: ["@aws-sdk"],
  }
};

export default nextConfig;
