import { memo } from "react";

const MainBanner = () => {
  return (
    <section className="bg-linear-to-br from-purple-50 via-blue-50 to-indigo-50 px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-purple-600 shadow-sm">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-purple-500"></span>
          </span>
          실시간 업데이트
        </div>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-5xl">
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
            <p className="text-sm text-gray-600">마음에 드는 공연을 찾으세요</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(MainBanner);
