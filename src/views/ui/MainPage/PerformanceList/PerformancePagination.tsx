import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { memo } from 'react';

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
      params.set('page', pageNum.toString());
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
                href={page > 1 ? createPageUrl(page - 1) : '#'}
                aria-disabled={page <= 1}
                className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {/* 다음 페이지 버튼 */}
            <PaginationItem>
              <PaginationNext
                href={hasNextPage ? createPageUrl(page + 1) : '#'}
                aria-disabled={!hasNextPage}
                className={!hasNextPage ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  },
);

export default PerformancePagination;

PerformancePagination.displayName = 'PerformancePagination';
