import { Button } from "@/components/ui/button";
import { Ticket, Search, Filter, Calendar } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "소개",
  description: "플랜더플레이 서비스 소개 - 공연 정보를 쉽고 빠르게 찾아보세요",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg">
              <Ticket className="size-12 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            플랜더플레이
          </h1>
          <p className="text-xl text-gray-600">
            원하는 공연을 쉽고 빠르게 찾아보세요
          </p>
        </div>
      </section>

      {/* 서비스 소개 */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              플랜더플레이는?
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                플랜더플레이는 전국의 다양한 공연 정보를 한 곳에서 쉽게 검색하고
                비교할 수 있는 공연 정보 통합 플랫폼입니다.
              </p>
              <p>
                연극, 뮤지컬, 콘서트, 무용, 클래식 등 다양한 장르의 공연
                일정과 상세 정보를 실시간으로 제공하여, 사용자가 원하는 공연을
                빠르게 찾을 수 있도록 돕습니다.
              </p>
              <p>
                공연예술통합전산망(KOPIS)의 공식 데이터를 기반으로 신뢰할 수
                있는 정보를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 기능 */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            주요 기능
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-purple-100">
                  <Search className="size-8 text-purple-600" />
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                통합 검색
              </h3>
              <p className="text-sm text-gray-600">
                전국의 모든 공연 정보를 한 번에 검색
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-blue-100">
                  <Filter className="size-8 text-blue-600" />
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                상세 필터링
              </h3>
              <p className="text-sm text-gray-600">
                지역, 장르, 기간별로 정확한 검색
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-indigo-100">
                  <Calendar className="size-8 text-indigo-600" />
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                실시간 업데이트
              </h3>
              <p className="text-sm text-gray-600">
                최신 공연 일정을 실시간으로 확인
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-green-100">
                  <Ticket className="size-8 text-green-600" />
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                상세 정보
              </h3>
              <p className="text-sm text-gray-600">
                공연장, 출연진, 가격 등 상세 정보 제공
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 데이터 출처 */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              데이터 출처
            </h2>
            <p className="text-gray-700">
              본 서비스는{" "}
              <strong>
                (재)예술경영지원센터 공연예술통합전산망(KOPIS)
              </strong>
              의 공식 Open API를 통해 공연 정보를 제공받습니다. 모든 공연
              데이터는 신뢰할 수 있는 공식 출처에서 제공되며, 실시간으로
              업데이트됩니다.
            </p>
            <div className="mt-6">
              <a
                href="https://www.kopis.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                공연예술통합전산망(KOPIS) 바로가기 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-purple-600 to-blue-500 px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            지금 바로 원하는 공연을 찾아보세요
          </h2>
          <p className="mb-8 text-lg text-purple-100">
            다양한 장르의 공연 정보를 무료로 검색할 수 있습니다
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            <Link href="/">
              <Search className="mr-2 size-5" />
              공연 검색하기
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
