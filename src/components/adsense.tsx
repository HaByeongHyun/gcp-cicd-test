"use client";

import Script from "next/script";

export const AdSense = () => {
  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4208170150303299"
        data-ad-slot="9493566731"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
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
    </>
  );
};
