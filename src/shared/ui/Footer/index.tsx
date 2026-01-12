import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-white py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-4">
          {/* 링크 */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
            <Link href="/about" className="hover:text-gray-900 hover:underline">
              소개
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/privacy"
              className="hover:text-gray-900 hover:underline"
            >
              개인정보처리방침
            </Link>
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
  );
};

export default Footer;
