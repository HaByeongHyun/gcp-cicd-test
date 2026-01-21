import { memo } from 'react';

const AboutInfo = () => {
  return (
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
              연극, 뮤지컬, 콘서트, 무용, 클래식 등 다양한 장르의 공연 일정과
              상세 정보를 실시간으로 제공하여, 사용자가 원하는 공연을 빠르게
              찾을 수 있도록 돕습니다.
            </p>
            <p>
              공연예술통합전산망(KOPIS)의 공식 데이터를 기반으로 신뢰할 수 있는
              정보를 제공합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutInfo);
