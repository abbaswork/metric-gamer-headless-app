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
      {
        protocol: "https",
        hostname: "images.igdb.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "ec2-18-213-34-154.compute-1.amazonaws.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
initOpenNextCloudflareForDev();
