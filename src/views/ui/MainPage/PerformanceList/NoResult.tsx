import { memo } from 'react';

const NoResult = () => {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center space-y-4">
      <div className="text-center">
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          검색 결과가 없습니다
        </h3>
        <p className="text-gray-600">다른 검색 조건으로 다시 시도해보세요</p>
      </div>
    </div>
  );
};

export default memo(NoResult);
