import { Ticket } from 'lucide-react';
import { memo } from 'react';

const AboutBanner = () => {
  return (
    <section className="bg-linear-to-br from-purple-50 via-blue-50 to-indigo-50 px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-linear-to-br from-purple-600 to-blue-500 shadow-lg">
            <Ticket className="size-12 text-white" />
          </div>
        </div>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
          플랜더플레이
        </h1>
        <p className="text-xl text-gray-600">
          원하는 공연을 쉽고 빠르게 찾아보세요
        </p>
      </div>
    </section>
  );
};

export default memo(AboutBanner);
