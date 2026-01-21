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
  async headers() {
    // CSP 정책 (AdSense, Google Analytics, KOPIS API 허용)
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagservices.com https://www.google-analytics.com https://adservice.google.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.kopis.or.kr https://pagead2.googlesyndication.com https://www.google-analytics.com https://*.googleusercontent.com",
      "font-src 'self' data:",
      "connect-src 'self' https://www.kopis.or.kr https://pagead2.googlesyndication.com https://www.google-analytics.com",
      "frame-src 'self' https://googleads.g.doubleclick.net https://www.google.com https://tpc.googlesyndication.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: cspDirectives,
          },
          // MIME 타입 스니핑 방지
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // 클릭재킹 방어
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Referrer 정책
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // 불필요한 브라우저 기능 비활성화
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default withSerwist(nextConfig);
