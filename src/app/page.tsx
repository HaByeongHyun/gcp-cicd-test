import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import type { Performance, PerformanceApiResponse } from "@/types/performance";
import { addWeeks, format } from "date-fns";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { memo, Suspense } from "react";
import { parseStringPromise } from "xml2js";
import PerformanceFilters from "./performance/filters";

const API_URL = process.env.NEXT_PUBLIC_PERFORMANCE_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_PERFORMANCE_API_KEY;

export const metadata: Metadata = {
  title: "공연 검색",
  description:
    "연극, 뮤지컬, 콘서트 등 다양한 공연 정보를 한 곳에서 검색하고 비교하세요. 실시간으로 업데이트되는 전국 공연 일정을 확인할 수 있습니다.",
  keywords: [
    "플랜더플레이",
    "공연",
    "공연정보",
    "연극",
    "뮤지컬",
    "콘서트",
    "공연검색",
    "티켓",
    "공연일정",
  ],
  openGraph: {
    title: "플랜더플레이 - 공연을 계획하고 즐기세요",
    description:
      "연극, 뮤지컬, 콘서트 등 다양한 공연 정보를 한 곳에서 검색하고 비교하세요",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "플랜더플레이 - 공연을 계획하고 즐기세요",
    description:
      "연극, 뮤지컬, 콘서트 등 다양한 공연 정보를 한 곳에서 검색하고 비교하세요",
  },
};

const PerformanceCardSkeleton = memo(() => {
  return (
    <Card className="flex h-full flex-col overflow-hidden pt-0">
      <Skeleton className="aspect-3/4 w-full" />
      <CardHeader>
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardHeader>
      <CardContent className="grow space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="space-y-2 border-t pt-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  );
});

PerformanceCardSkeleton.displayName = "PerformanceCardSkeleton";

const PerformanceCard = memo(
  ({ performance }: { performance: Performance }) => {
    return (
      <Link href={`/performance/${performance.mt20id}`}>
        <Card className="flex h-full flex-col overflow-hidden pt-0 transition-all hover:scale-[1.02] hover:shadow-lg">
          <div className="relative aspect-3/4 w-full overflow-hidden bg-gray-100">
            {performance.poster ? (
              <Image
                src={performance.poster}
                alt={performance.prfnm}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-200">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
            {performance.openrun === "Y" && (
              <div className="absolute top-2 right-2 rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                오픈런
              </div>
            )}
          </div>

          <CardHeader>
            <div className="mb-2 flex items-start justify-between gap-2">
              <CardTitle className="line-clamp-2 text-xl">
                {performance.prfnm}
              </CardTitle>
            </div>
            <CardDescription className="text-sm">
              {performance.genrenm}
            </CardDescription>
          </CardHeader>

          <CardContent className="grow space-y-3">
            {/* 공연 기간 */}
            <div>
              <h3 className="mb-1 text-sm font-semibold text-gray-700">
                공연기간
              </h3>
              <p className="text-sm text-gray-600">
                {performance.prfpdfrom} ~ {performance.prfpdto}
              </p>
            </div>

            {/* 공연장 */}
            <div>
              <h3 className="mb-1 text-sm font-semibold text-gray-700">
                공연장
              </h3>
              <p className="line-clamp-2 text-sm text-gray-600">
                {performance.fcltynm}
              </p>
            </div>

            {/* 공연 상태 & 지역 */}
            <div className="border-t pt-3">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-gray-600">상태</span>
                <span className="font-medium">{performance.prfstate}</span>
              </div>
              {performance.area && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">지역</span>
                  <span className="font-medium">{performance.area}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  },
);

PerformanceCard.displayName = "PerformanceCard";

const PerformancePagination = memo(
  ({
    page,
    hasNextPage,
    searchParams,
  }: {
    page: number;
    hasNextPage: boolean;
    searchParams: Record<string, string>;
  }) => {
    const createPageUrl = (pageNum: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNum.toString());
      return `?${params.toString()}`;
    };

    return (
      <div className="flex w-full justify-center">
        <Pagination>
          <PaginationContent>
            {/* 처음으로 버튼 */}
            {page > 1 && (
              <PaginationItem>
                <PaginationLink href={createPageUrl(1)} size="default">
                  처음으로
                </PaginationLink>
              </PaginationItem>
            )}

            {/* 이전 페이지 버튼 */}
            <PaginationItem>
              <PaginationPrevious
                href={page > 1 ? createPageUrl(page - 1) : "#"}
                aria-disabled={page <= 1}
                className={page <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {/* 다음 페이지 버튼 */}
            <PaginationItem>
              <PaginationNext
                href={hasNextPage ? createPageUrl(page + 1) : "#"}
                aria-disabled={!hasNextPage}
                className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  },
);

PerformancePagination.displayName = "PerformancePagination";

async function PerformanceList({
  page,
  perPage,
  stdate,
  eddate,
  area,
  genre,
  search,
  searchParams,
}: {
  page: number;
  perPage: number;
  stdate: string;
  eddate: string;
  area?: string;
  genre?: string;
  search?: string;
  searchParams: Record<string, string>;
}) {
  const params = new URLSearchParams({
    service: API_KEY || "",
    stdate,
    eddate,
    cpage: page.toString(),
    rows: perPage.toString(),
    prfstate: "02",
  });

  if (area) {
    params.append("signgucode", area);
  }

  if (genre) {
    params.append("shcate", genre);
  }

  if (search) {
    params.append("shprfnm", search);
  }

  const apiUrl = `${API_URL}/pblprfr?${params.toString()}`;

  const res = await fetch(apiUrl, {
    cache: "no-store",
  });

  const xmlData = await res.text();

  // XML을 JSON으로 변환
  const jsonData: PerformanceApiResponse = await parseStringPromise(xmlData, {
    explicitArray: false, // 단일 요소를 배열로 감싸지 않음
    trim: true, // 공백 제거
    normalize: true, // 공백 정규화
    normalizeTags: false, // 태그명 소문자 변환 안함
    mergeAttrs: true, // 속성을 자식 요소로 병합
  });

  // db가 단일 객체인 경우 배열로 변환
  const performances = Array.isArray(jsonData.dbs.db)
    ? jsonData.dbs.db
    : jsonData.dbs.db
      ? [jsonData.dbs.db]
      : [];

  // 마지막 페이지 체크 (다음 페이지 버튼 표시 여부)
  const hasNextPage = performances.length === perPage;

  if (performances.length === 0) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center space-y-4">
        <div className="text-center">
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            검색 결과가 없습니다
          </h3>
          <p className="text-gray-600">다른 검색 조건으로 다시 시도해보세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {performances.map((performance) => (
          <PerformanceCard key={performance.mt20id} performance={performance} />
        ))}
      </div>
      {performances.length > 0 && (
        <PerformancePagination
          page={page}
          hasNextPage={hasNextPage}
          searchParams={searchParams}
        />
      )}
    </div>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    perPage?: string;
    stdate?: string;
    eddate?: string;
    area?: string;
    genre?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const perPage = Number(params.perPage) || 12;

  const getDefaultStartDate = () => format(new Date(), "yyyyMMdd");
  const getDefaultEndDate = () => format(addWeeks(new Date(), 2), "yyyyMMdd");

  const stdate = params.stdate || getDefaultStartDate();
  const eddate = params.eddate || getDefaultEndDate();
  const area = params.area;
  const genre = params.genre;
  const search = params.search;

  // searchParams 객체 생성 (undefined 값 제외)
  const currentSearchParams: Record<string, string> = {};
  if (params.page) currentSearchParams.page = params.page;
  if (params.perPage) currentSearchParams.perPage = params.perPage;
  if (params.stdate) currentSearchParams.stdate = params.stdate;
  if (params.eddate) currentSearchParams.eddate = params.eddate;
  if (params.area) currentSearchParams.area = params.area;
  if (params.genre) currentSearchParams.genre = params.genre;
  if (params.search) currentSearchParams.search = params.search;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-purple-50 via-blue-50 to-indigo-50 px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-purple-600 shadow-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-purple-500"></span>
            </span>
            실시간 업데이트
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            원하는 공연을 쉽고 빠르게
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            연극, 뮤지컬, 콘서트 등 다양한 공연 정보를 한 곳에서 검색하고
            비교하세요
          </p>

          {/* 간단한 사용 안내 */}
          <div className="mx-auto grid max-w-3xl gap-4 text-left sm:grid-cols-3">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-2 flex size-8 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600">
                1
              </div>
              <h3 className="mb-1 font-semibold text-gray-900">날짜 선택</h3>
              <p className="text-sm text-gray-600">
                원하는 공연 기간을 선택하세요
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-2 flex size-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                2
              </div>
              <h3 className="mb-1 font-semibold text-gray-900">필터 설정</h3>
              <p className="text-sm text-gray-600">지역, 장르 등으로 필터링</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-2 flex size-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                3
              </div>
              <h3 className="mb-1 font-semibold text-gray-900">공연 선택</h3>
              <p className="text-sm text-gray-600">
                마음에 드는 공연을 찾으세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance List */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <PerformanceFilters />
          <Suspense
            fallback={
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: perPage }).map((_, i) => (
                  <PerformanceCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <PerformanceList
              page={page}
              perPage={perPage}
              stdate={stdate}
              eddate={eddate}
              area={area}
              genre={genre}
              search={search}
              searchParams={currentSearchParams}
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
