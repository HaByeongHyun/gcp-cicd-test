"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("App Error:", error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl">오류가 발생했습니다</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-gray-600">
            페이지를 불러오는 중 문제가 발생했습니다.
            <br />
            잠시 후 다시 시도해주세요.
          </p>

          {process.env.NODE_ENV === "development" && (
            <div className="rounded-lg bg-gray-100 p-4 text-left">
              <p className="mb-1 text-xs font-semibold text-gray-500">
                Error Details:
              </p>
              <p className="text-sm font-mono text-gray-700 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="mt-2 text-xs text-gray-500">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={reset} className="w-full sm:w-auto">
              <RefreshCw className="mr-2 h-4 w-4" />
              다시 시도
            </Button>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                홈으로 이동
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
