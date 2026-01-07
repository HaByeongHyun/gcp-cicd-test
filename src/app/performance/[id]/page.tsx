import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  PerformanceDetail,
  PerformanceDetailApiResponse,
} from "@/types/performance";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { memo } from "react";
import { parseStringPromise } from "xml2js";
import { IntroImage, PerformanceImage } from "./PerformanceImage";

const API_URL = process.env.NEXT_PUBLIC_PERFORMANCE_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_PERFORMANCE_API_KEY;

async function getPerformanceDetail(id: string): Promise<PerformanceDetail> {
  const res = await fetch(`${API_URL}/pblprfr/${id}?service=${API_KEY}`);

  const xmlData = await res.text();

  // XML을 JSON으로 변환
  const jsonData: PerformanceDetailApiResponse = await parseStringPromise(
    xmlData,
    {
      explicitArray: false,
      trim: true,
      normalize: true,
      normalizeTags: false,
      mergeAttrs: true,
    },
  );

  return jsonData.dbs.db;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const performance = await getPerformanceDetail(id);

  return {
    title: performance.prfnm,
    description: `${performance.prfnm} | ${performance.genrenm} | ${performance.fcltynm} | ${performance.prfpdfrom} ~ ${performance.prfpdto}`,
    keywords: [
      performance.prfnm,
      performance.genrenm,
      performance.fcltynm,
      "플랜더플레이",
      "공연",
      "공연정보",
      "티켓",
    ],
    openGraph: {
      title: `${performance.prfnm} - 플랜더플레이`,
      description: `${performance.genrenm} | ${performance.fcltynm}`,
      images: performance.poster ? [{ url: performance.poster }] : [],
      type: "website",
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title: `${performance.prfnm} - 플랜더플레이`,
      description: `${performance.genrenm} | ${performance.fcltynm}`,
      images: performance.poster ? [performance.poster] : [],
    },
  };
}

export default async function PerformanceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const performance = await getPerformanceDetail(id);

  const relateInfo = performance.relates?.relate
    ? Array.isArray(performance.relates.relate)
      ? performance.relates.relate
      : [performance.relates.relate]
    : [];

  console.log(relateInfo);

  // 소개이미지 배열 처리
  const introImages = performance.styurls?.styurl
    ? Array.isArray(performance.styurls.styurl)
      ? performance.styurls.styurl
      : [performance.styurls.styurl]
    : [];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* 헤더 */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
          >
            <ChevronLeft className="h-4 w-4" />
            목록으로 돌아가기
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* 왼쪽: 포스터 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 overflow-hidden py-0">
              <div className="relative aspect-3/4 w-full">
                {performance.poster ? (
                  <PerformanceImage
                    src={performance.poster}
                    alt={performance.prfnm}
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                {performance.openrun === "Y" && (
                  <div className="absolute top-4 right-4 z-10 rounded-lg bg-red-500 px-3 py-1.5 text-sm font-semibold text-white shadow-lg">
                    오픈런
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* 오른쪽: 상세 정보 */}
          <div className="space-y-6 lg:col-span-2">
            {/* 제목 및 기본 정보 */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">
                  {performance.genrenm || "-"}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    performance.prfstate === "공연중"
                      ? "bg-green-100 text-green-700"
                      : performance.prfstate === "공연예정"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {performance.prfstate || "-"}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                {performance.prfnm || "-"}
              </h1>
            </div>

            {/* 공연 정보 카드 */}
            <Card className="gap-2">
              <CardHeader>
                <CardTitle>공연 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoItem
                    label="공연기간"
                    value={`${performance.prfpdfrom || "-"} ~ ${performance.prfpdto || "-"}`}
                  />
                  <InfoItem label="공연장" value={performance.fcltynm} />
                  <InfoItem label="공연시간" value={performance.prfruntime} />
                  <InfoItem label="관람연령" value={performance.prfage} />
                  <InfoItem
                    label="공연시간 안내"
                    value={performance.dtguidance || "-"}
                    className="sm:col-span-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* 출연진 및 제작진 */}
            <Card className="gap-2">
              <CardHeader>
                <CardTitle>출연/제작</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <InfoItem label="출연" value={performance.prfcast} />
                <InfoItem label="제작진" value={performance.prfcrew} />
                <InfoItem label="제작사" value={performance.entrpsnmP} />
                <InfoItem label="기획사" value={performance.entrpsnmA || "-"} />
                <InfoItem label="주최" value={performance.entrpsnmH || "-"} />
                <InfoItem label="주관" value={performance.entrpsnmS || "-"} />
              </CardContent>
            </Card>

            {/* 티켓 정보 */}
            <Card className="gap-2">
              <CardHeader>
                <CardTitle>티켓 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <InfoItem label="가격" value={performance.pcseguidance} />

                {/* 예약 버튼 영역 */}
                {relateInfo.length > 0 && (
                  <div className="mt-6 border-t pt-4">
                    <p className="mb-3 text-sm font-medium text-gray-700">
                      예약하기
                    </p>
                    <div
                      className={`grid gap-2 ${
                        relateInfo.length > 2 ? "grid-cols-2" : "grid-cols-1"
                      }`}
                    >
                      {relateInfo.map(({ relatenm, relateurl }) => (
                        <a
                          href={relateurl}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={relateurl}
                          className="w-full"
                        >
                          <Button
                            variant="outline"
                            className="w-full border-blue-200 bg-blue-50 hover:border-blue-300 hover:bg-blue-100"
                            size={relateInfo.length > 2 ? "default" : "lg"}
                          >
                            {relatenm}
                          </Button>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 줄거리 */}
            <Card className="gap-2">
              <CardHeader>
                <CardTitle>줄거리</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed whitespace-pre-wrap text-gray-700">
                  {performance.sty.trim() || "-"}
                </p>
              </CardContent>
            </Card>

            {/* 소개 이미지 */}
            {introImages.length > 0 && (
              <Card className="gap-2">
                <CardHeader>
                  <CardTitle>소개 이미지</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {introImages.map((imgUrl, index) => (
                      <IntroImage
                        key={index}
                        src={imgUrl}
                        alt={`${performance.prfnm} 소개 이미지 ${index + 1}`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 추가 정보 */}
            {/* <Card className="gap-2">
              <CardHeader>
                <CardTitle>추가 정보</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  {performance.visit === "Y" && <Badge>내한공연</Badge>}
                  {performance.child === "Y" && <Badge>아동공연</Badge>}
                  {performance.daehakro === "Y" && <Badge>대학로</Badge>}
                  {performance.festival === "Y" && <Badge>축제</Badge>}
                  {performance.musicallicense === "Y" && (
                    <Badge>뮤지컬 라이센스</Badge>
                  )}
                  {performance.musicalcreate === "Y" && (
                    <Badge>뮤지컬 창작</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  최종 수정일: {format(performance.updatedate, "yyyy-MM-dd")}
                </p>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoItem = memo(
  ({
    label,
    value,
    className,
  }: {
    label: string;
    value: string;
    className?: string;
  }) => {
    return (
      <div className={className}>
        <dt className="mb-1 text-sm font-medium text-gray-500">{label}</dt>
        <dd className="text-base text-gray-900">{value.trim() || "-"}</dd>
      </div>
    );
  },
);

InfoItem.displayName = "InfoItem";

const Badge = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
      {children}
    </span>
  );
});

Badge.displayName = "Badge";
