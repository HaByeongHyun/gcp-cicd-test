import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.kopis.or.kr",
        pathname: "/upload/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.plan-the-play.com",
          },
        ],
        destination: "https://plan-the-play.com/:path*",
        permanent: true, // 301 redirect for SEO
      },
    ];
  },
};

export default withSerwist(nextConfig);
