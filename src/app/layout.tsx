import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navigation } from "@/components/navigation";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "플랜더플레이 - 공연을 계획하고 즐기세요",
    template: "%s | 플랜더플레이",
  },
  description:
    "연극, 뮤지컬, 콘서트 등 다양한 공연 정보를 한 곳에서 검색하고 비교하세요. 실시간으로 업데이트되는 전국 공연 일정을 확인할 수 있습니다.",
  keywords: [
    "플랜더플레이",
    "PlanThePlay",
    "공연",
    "공연정보",
    "연극",
    "뮤지컬",
    "콘서트",
    "공연검색",
    "티켓",
    "공연일정",
  ],
  authors: [{ name: "플랜더플레이" }],
  creator: "플랜더플레이",
  publisher: "플랜더플레이",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "플랜더플레이",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4208170150303299"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Navigation />
        {children}
        <footer className="border-t bg-white py-8">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-col items-center gap-4">
              {/* 링크 */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
                <a
                  href="/about"
                  className="hover:text-gray-900 hover:underline"
                >
                  소개
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="/privacy"
                  className="hover:text-gray-900 hover:underline"
                >
                  개인정보처리방침
                </a>
              </div>

              {/* 문의 이메일 */}
              <div className="text-sm text-gray-600">
                문의: contact.soulha@gmail.com
              </div>

              {/* 저작권 및 출처 */}
              <div className="text-center text-xs text-gray-500">
                <p>Data provided by KOPIS (공연예술통합전산망)</p>
                <p className="mt-1">© 2025 플랜더플레이. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
