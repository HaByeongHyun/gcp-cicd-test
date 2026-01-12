import { addWeeks, format } from "date-fns";
import { memo, Suspense } from "react";
import PerformanceFilters from "./Filters";
import MainBanner from "./MainBanner";
import PerformanceList from "./PerformanceList";
import SkeletonCard from "./SkeletonCard";

const MainPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
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
      <MainBanner />

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <PerformanceFilters />
          <Suspense
            fallback={
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: perPage }).map((_, i) => (
                  <SkeletonCard key={i} />
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
};

export default memo(MainPage);
