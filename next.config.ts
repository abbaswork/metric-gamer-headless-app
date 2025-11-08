import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "metric-gamer.local",
        port: "",
      },
      {
        protocol: "https",
        hostname: "metricgamer.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
initOpenNextCloudflareForDev();
