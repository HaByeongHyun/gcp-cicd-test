"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // beforeinstallprompt 이벤트 캡처
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      timeoutId = setTimeout(() => {
        setShowPrompt(true);
      }, 15000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      // 설치 프롬프트 표시
      await deferredPrompt.prompt();

      // 사용자 선택 대기
      const { outcome } = await deferredPrompt.userChoice;

      // 개발 환경에서만 로그 출력
      if (process.env.NODE_ENV === "development") {
        console.log(`User response: ${outcome}`);
      }

      // 프롬프트 초기화
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      // 에러 발생 시 프롬프트 닫기
      if (process.env.NODE_ENV === "development") {
        console.error("PWA install prompt error:", error);
      }
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <>
      {/* 모바일 */}
      <div className="fixed inset-x-4 top-4 z-50 rounded-lg bg-white p-4 shadow-2xl sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-gray-900">
              홈 화면에 추가
            </h3>
            <p className="mt-0.5 text-xs text-gray-600">빠른 접속이 가능해요</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={handleInstall}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
            >
              추가
            </button>
            <button
              onClick={handleDismiss}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              닫기
            </button>
          </div>
        </div>
      </div>

      {/* PC */}
      <div className="fixed top-4 left-1/2 z-50 hidden max-w-sm -translate-x-1/2 rounded-lg bg-white p-6 shadow-2xl sm:block">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <svg
              className="h-12 w-12 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              홈 화면에 추가하기
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              플랜더플레이를 홈 화면에 추가하고 더 빠르게 접속하세요!
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleInstall}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                추가하기
              </button>
              <button
                onClick={handleDismiss}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                나중에
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="shrink-0 text-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
