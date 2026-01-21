'use client';

import Script from 'next/script';

export const AdSense = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', margin: '0 auto' }}
        data-ad-client="ca-pub-4208170150303299"
        data-ad-slot="3387323384"
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
            console.error('AdSense initialization error:', e);
          }
        }}
      />
    </div>
  );
};
