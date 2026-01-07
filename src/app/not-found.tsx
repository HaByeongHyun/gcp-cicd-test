import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <Card className="w-full max-w-2xl overflow-hidden">
          <CardContent className="p-12 text-center">
            {/* 404 텍스트 */}
            <div className="mb-8">
              <h1 className="bg-linear-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-8xl font-bold text-transparent">
                404
              </h1>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="h-1 w-16 rounded-full bg-linear-to-r from-purple-400 to-blue-400"></div>
                <Search className="size-6 text-purple-500" />
                <div className="h-1 w-16 rounded-full bg-linear-to-r from-blue-400 to-indigo-400"></div>
              </div>
            </div>

            {/* 메시지 */}
            <div className="mb-8 space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">
                페이지를 찾을 수 없습니다
              </h2>
              <p className="text-gray-600">
                요청하신 페이지가 존재하지 않거나 이동되었습니다.
                <br />
                주소를 다시 확인해주세요.
              </p>
            </div>

            {/* 버튼들 */}
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/">
                <Button
                  size="lg"
                  className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 sm:w-auto"
                >
                  <Home className="mr-2 size-5" />
                  홈으로 돌아가기
                </Button>
              </Link>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-purple-200 hover:bg-purple-50 sm:w-auto"
                >
                  <Search className="mr-2 size-5" />
                  공연 검색하기
                </Button>
              </Link>
            </div>

            {/* 추가 정보 */}
            <div className="mt-12 rounded-lg bg-purple-50 p-4">
              <p className="text-sm text-gray-600">
                💡 <span className="font-semibold">Tip:</span> 연극, 뮤지컬,
                콘서트 등 다양한 공연 정보를 검색해보세요!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
