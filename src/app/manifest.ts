import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "플랜더플레이 - 공연을 계획하고 즐기세요",
    short_name: "플랜더플레이",
    description:
      "연극, 뮤지컬, 콘서트 등 다양한 공연 정보를 한 곳에서 검색하고 비교하세요. 실시간으로 업데이트되는 전국 공연 일정을 확인할 수 있습니다.",
    scope: "/",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    lang: "ko-KR",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshot-desktop.png",
        sizes: "3804x1857",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "/screenshot-mobile.png",
        sizes: "384x723",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
  };
}
