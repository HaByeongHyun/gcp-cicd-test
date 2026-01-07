import type { NextConfig } from "next";

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

export default nextConfig;
