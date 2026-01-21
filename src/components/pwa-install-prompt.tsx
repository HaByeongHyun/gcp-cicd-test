"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface PromptContentProps {
  variant: "mobile" | "desktop";
  onInstall: () => void;
  onDismiss: () => void;
}

// localStorage 체크 로직을 재사용 가능한 함수로 추출
function shouldShowPrompt(): boolean {
  try {
    // 이미 설치를 수락한 경우
    if (localStorage.getItem("pwa-prompt-accepted") === "true") {
      return false;
    }

    // 최근 1일 이내에 닫은 적이 있는지 확인
    const dismissedAt = localStorage.getItem("pwa-prompt-dismissed");
    if (dismissedAt) {
      const daysSinceDismissed =
        (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 1) {
        return false; // 1일 이내면 표시하지 않음
      }
    }

    return true;
  } catch (error) {
    // localStorage 접근 실패 시 (시크릿 모드 등) 무시하고 표시
    if (process.env.NODE_ENV === "development") {
      console.warn("localStorage access failed:", error);
    }
    return true;
  }
}

function PromptContent({ variant, onInstall, onDismiss }: PromptContentProps) {
  const isMobile = variant === "mobile";
  const titleId = `pwa-prompt-title-${variant}`;
  const descId = `pwa-prompt-desc-${variant}`;

  const title = isMobile ? "홈 화면에 추가" : "홈 화면에 추가하기";
  const description = isMobile
    ? "빠른 접속이 가능해요"
    : "플랜더플레이를 홈 화면에 추가하고 더 빠르게 접속하세요!";
  const installLabel = isMobile ? "추가" : "추가하기";
  const dismissLabel = isMobile ? "1일 후에" : "1일 후에 보기";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      className={
        isMobile
          ? "fixed inset-x-4 top-4 z-50 rounded-lg bg-white p-4 shadow-2xl sm:hidden"
          : "fixed top-4 left-1/2 z-50 hidden max-w-sm -translate-x-1/2 rounded-lg bg-white p-6 shadow-2xl sm:block"
      }
    >
      {isMobile ? (
        /* 모바일 레이아웃: 텍스트(왼쪽) + 버튼(오른쪽) */
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 id={titleId} className="text-sm font-semibold text-gray-900">
              {title}
            </h3>
            <p id={descId} className="mt-0.5 text-xs text-gray-600">
              {description}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={onInstall}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
              aria-label="홈 화면에 추가하기"
            >
              {installLabel}
            </button>
            <button
              onClick={onDismiss}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
              aria-label="1일 후에 다시 보기"
            >
              {dismissLabel}
            </button>
          </div>
        </div>
      ) : (
        /* PC 레이아웃: 아이콘 + 텍스트/버튼 + X버튼 */
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <svg
              className="h-12 w-12 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
            <h3 id={titleId} className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <p id={descId} className="mt-1 text-sm text-gray-600">
              {description}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={onInstall}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                aria-label="홈 화면에 추가하기"
              >
                {installLabel}
              </button>
              <button
                onClick={onDismiss}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                aria-label="1일 후에 다시 보기"
              >
                {dismissLabel}
              </button>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="shrink-0 text-gray-400 hover:text-gray-600"
            aria-label="알림 닫기"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  // useRef로 timeoutId 관리 (메모리 누수 방지)
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 초기 체크: 프롬프트를 표시해야 하는지 확인
    if (!shouldShowPrompt()) {
      return;
    }

    // beforeinstallprompt 이벤트 캡처
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // 기존 timeout이 있으면 정리 (메모리 누수 방지)
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = setTimeout(() => {
        // 알림을 표시하기 직전에 다시 확인
        if (shouldShowPrompt()) {
          setShowPrompt(true);
        }
      }, 10000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
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


      // 수락한 경우 localStorage에 기록 (다시 프롬프트 표시하지 않기 위해)
      if (outcome === "accepted") {
        try {
          localStorage.setItem("pwa-prompt-accepted", "true");
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.warn("localStorage access failed:", error);
          }
        }
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

  const handleDismiss = useCallback(() => {
    // 현재 시간을 localStorage에 저장
    try {
      localStorage.setItem("pwa-prompt-dismissed", Date.now().toString());
    } catch (error) {
      // localStorage 접근 실패 시 (시크릿 모드, 쿼터 초과 등) 무시
      if (process.env.NODE_ENV === "development") {
        console.warn("localStorage access failed:", error);
      }
    }
    setShowPrompt(false);
  }, []);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss();
      }
    };

    if (showPrompt) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [showPrompt, handleDismiss]);

  if (!showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <>
      <PromptContent
        variant="mobile"
        onInstall={handleInstall}
        onDismiss={handleDismiss}
      />
      <PromptContent
        variant="desktop"
        onInstall={handleInstall}
        onDismiss={handleDismiss}
      />
    </>
  );
}
