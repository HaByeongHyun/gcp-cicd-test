import { Ticket } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Ticket className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">
              플랜더플레이
            </span>
          </Link>

          {/* 네비게이션 */}
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              홈
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              소개
            </Link>
            <Link
              href="/privacy"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              개인정보처리방침
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
