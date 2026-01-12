import { Calendar, Filter, Search, Ticket } from "lucide-react";
import { memo } from "react";

const AboutFeature = () => {
  return (
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
  );
};

export default memo(AboutFeature);
