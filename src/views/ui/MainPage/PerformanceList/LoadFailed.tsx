import { memo } from 'react';

const LoadFailed = ({ error }: { error: Error }) => {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center space-y-4">
      <div className="text-center">
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          공연 정보를 불러오는데 실패했습니다
        </h3>
        <p className="text-gray-600">
          {error instanceof Error ? error.message : '잠시 후 다시 시도해주세요'}
        </p>
      </div>
    </div>
  );
};

export default memo(LoadFailed);
