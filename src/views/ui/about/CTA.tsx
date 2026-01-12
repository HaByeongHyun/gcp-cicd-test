import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

const AboutCTA = () => {
  return (
    <section className="bg-linear-to-br from-purple-600 to-blue-500 px-4 py-16 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-3xl font-bold">
          지금 바로 원하는 공연을 찾아보세요
        </h2>
        <p className="mb-8 text-lg text-purple-100">
          다양한 장르의 공연 정보를 무료로 검색할 수 있습니다
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white text-purple-600 hover:bg-gray-100"
        >
          <Link href="/">
            <Search className="mr-2 size-5" />
            공연 검색하기
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default memo(AboutCTA);
