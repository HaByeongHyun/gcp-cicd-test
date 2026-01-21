import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Performance } from '@/shared/model';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

const PerformanceCard = ({ performance }: { performance: Performance }) => {
  return (
    <Link href={`/performance/${performance.mt20id}`}>
      <Card className="flex h-full flex-col overflow-hidden pt-0 transition-all hover:scale-[1.02] hover:shadow-lg">
        <div className="relative aspect-3/4 w-full overflow-hidden bg-gray-100">
          {performance.poster ? (
            <Image
              src={performance.poster}
              alt={performance.prfnm}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-200">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
          {performance.openrun === 'Y' && (
            <div className="absolute top-2 right-2 rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">
              오픈런
            </div>
          )}
        </div>

        <CardHeader>
          <div className="mb-2 flex items-start justify-between gap-2">
            <CardTitle className="line-clamp-2 text-xl">
              {performance.prfnm}
            </CardTitle>
          </div>
          <CardDescription className="text-sm">
            {performance.genrenm}
          </CardDescription>
        </CardHeader>

        <CardContent className="grow space-y-3">
          {/* 공연 기간 */}
          <div>
            <h3 className="mb-1 text-sm font-semibold text-gray-700">
              공연기간
            </h3>
            <p className="text-sm text-gray-600">
              {performance.prfpdfrom} ~ {performance.prfpdto}
            </p>
          </div>

          {/* 공연장 */}
          <div>
            <h3 className="mb-1 text-sm font-semibold text-gray-700">공연장</h3>
            <p className="line-clamp-2 text-sm text-gray-600">
              {performance.fcltynm}
            </p>
          </div>

          {/* 공연 상태 & 지역 */}
          <div className="border-t pt-3">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-gray-600">상태</span>
              <span className="font-medium">{performance.prfstate}</span>
            </div>
            {performance.area && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">지역</span>
                <span className="font-medium">{performance.area}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

PerformanceCard.displayName = 'PerformanceCard';

export default memo(PerformanceCard);
