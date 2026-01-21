"use client";

import { ArrowUp, Check, Link2, X } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleShare = () => {
    setShareUrl(window.location.href);
    setShowShareModal(true);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // 폴백: 구형 브라우저 지원
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const closeModal = () => {
    setShowShareModal(false);
    setCopied(false);
  };

  return (
    <>
      {/* 플로팅 버튼 컨테이너 */}
      <div
        className={`fixed right-6 bottom-6 z-50 flex flex-col gap-3 transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
      >
        {/* 공유하기 버튼 */}
        <button
          onClick={handleShare}
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-xl border border-gray-200"
          aria-label="공유하기"
        >
          <Link2 className="h-5 w-5" />
        </button>

        {/* 최상단 이동 버튼 */}
        <button
          onClick={scrollToTop}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
          aria-label="맨 위로 이동"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>

      {/* 공유하기 모달 */}
      {showShareModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">공유하기</h3>
              <button
                onClick={closeModal}
                className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label="닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* URL 입력 영역 */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                링크 주소
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className={`flex min-w-[80px] items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      완료
                    </>
                  ) : (
                    "복사"
                  )}
                </button>
              </div>
            </div>

            {/* 복사 완료 메시지 */}
            {copied && (
              <p className="text-center text-sm text-green-600">
                클립보드에 복사되었습니다!
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
