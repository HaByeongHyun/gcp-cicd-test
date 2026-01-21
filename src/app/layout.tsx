import { PWAInstallPrompt } from "@/components/pwa-install-prompt";
import { Footer, Header } from "@/shared/ui";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
  preload: true,
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
  other: {
    "google-adsense-account": "ca-pub-4208170150303299",
    "naver-site-verification": "005e76922028478d4f77b54bce78adb2a68bee02",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-sans antialiased`}>
        <Header />
        <PWAInstallPrompt />
        {children}
        {/* 수평광고 */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-4208170150303299"
          data-ad-slot="9493566731"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <Footer />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4208170150303299"
          crossOrigin="anonymous"
          strategy="afterInteractive"
          onLoad={() => {
            try {
              ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
                (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle ||
                []).push({});
            } catch (e) {
              console.error("AdSense initialization error:", e);
            }
          }}
        />
        {/* <ScrollToTop /> */}
      </body>
    </html>
  );
}
