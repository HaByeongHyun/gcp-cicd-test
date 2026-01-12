import { memo } from "react";

const AboutSource = () => {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">데이터 출처</h2>
          <p className="text-gray-700">
            본 서비스는{" "}
            <strong>(재)예술경영지원센터 공연예술통합전산망(KOPIS)</strong>의
            공식 Open API를 통해 공연 정보를 제공받습니다. 모든 공연 데이터는
            신뢰할 수 있는 공식 출처에서 제공되며, 실시간으로 업데이트됩니다.
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
  );
};

export default memo(AboutSource);
