"use client";

import { Button } from "@/components/ui/button";
import { Search, Ticket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* 로고 및 사이트명 */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-500">
            <Ticket className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">플랜더플레이</h1>
            <p className="text-xs text-gray-500">PlanThePlay</p>
          </div>
        </Link>

        {/* 검색 버튼 */}
        <div className="flex items-center gap-4">
          {pathname !== "/" && (
            <Button asChild size="default" className="gap-2">
              <Link href="/">
                <Search className="size-4" />
                공연 찾기
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
