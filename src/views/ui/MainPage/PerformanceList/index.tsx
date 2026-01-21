import { fetchPerformanceList, PerformanceApiError } from "@/shared/api";
import { Performance } from "@/shared/model";
import LoadFailed from "./LoadFailed";
import NoResult from "./NoResult";
import PerformanceCard from "./PerformanceCard";
import PerformancePagination from "./PerformancePagination";

interface FetchResult {
  success: true;
  performances: Performance[];
  hasNextPage: boolean;
}

interface FetchError {
  success: false;
  error: Error;
}

type FetchOutcome = FetchResult | FetchError;

async function getPerformances(options: {
  page: number;
  perPage: number;
  stdate: string;
  eddate: string;
  area?: string;
  genre?: string;
  search?: string;
}): Promise<FetchOutcome> {
  try {
    const performances = await fetchPerformanceList(options);
    const hasNextPage = performances.length === options.perPage;
    return { success: true, performances, hasNextPage };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("공연 목록 조회 실패:", error);
    }
    return {
      success: false,
      error: error instanceof PerformanceApiError ? error : new Error("알 수 없는 오류가 발생했습니다."),
    };
  }
}

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
  const result = await getPerformances({
    page,
    perPage,
    stdate,
    eddate,
    area,
    genre,
    search,
  });

  if (!result.success) {
    return <LoadFailed error={result.error} />;
  }

  const { performances, hasNextPage } = result;

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
};

export default PerformanceList;
