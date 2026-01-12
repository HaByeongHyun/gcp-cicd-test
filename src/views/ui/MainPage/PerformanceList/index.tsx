import { xmlToJson } from "@/shared/lib";
import { PerformanceApiResponse } from "@/shared/model/performance";
import LoadFailed from "./LoadFailed";
import NoResult from "./NoResult";
import PerformanceCard from "./PerformanceCard";
import PerformancePagination from "./PerformancePagination";

const API_URL = process.env.PERFORMANCE_API_URL;
const API_KEY = process.env.PERFORMANCE_API_KEY;

const PerformanceList = async ({
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
}) => {
  try {
    // 환경변수 검증
    if (!API_URL || !API_KEY) {
      throw new Error("API 설정이 올바르지 않습니다.");
    }

    const params = new URLSearchParams({
      service: API_KEY,
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
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      throw new Error(`API 요청 실패: ${res.status} ${res.statusText}`);
    }

    const xmlData = await res.text();

    // XML을 JSON으로 변환
    const jsonData = await xmlToJson<PerformanceApiResponse>(xmlData);

    // API 응답 구조 검증
    if (!jsonData?.dbs) {
      throw new Error("API 응답 형식이 올바르지 않습니다.");
    }

    // db가 단일 객체인 경우 배열로 변환
    const performances = Array.isArray(jsonData.dbs.db)
      ? jsonData.dbs.db
      : jsonData.dbs.db
        ? [jsonData.dbs.db]
        : [];

    // 마지막 페이지 체크 (다음 페이지 버튼 표시 여부)
    const hasNextPage = performances.length === perPage;

    if (performances.length === 0) {
      return <NoResult />;
    }

    return (
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {performances.map((performance) => (
            <PerformanceCard
              key={performance.mt20id}
              performance={performance}
            />
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
  } catch (error) {
    console.error("공연 목록 조회 실패:", error);

    return <LoadFailed error={error as Error} />;
  }
};

export default PerformanceList;
