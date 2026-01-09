"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sanitizeSearchQuery } from "@/lib/utils";
import { addWeeks, format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

const AREA_OPTIONS = [
  { value: "11", label: "서울" },
  { value: "26", label: "부산" },
  { value: "27", label: "대구" },
  { value: "28", label: "인천" },
  { value: "29", label: "광주" },
  { value: "30", label: "대전" },
  { value: "31", label: "울산" },
  { value: "36", label: "세종" },
  { value: "41", label: "경기" },
  { value: "42", label: "강원" },
  { value: "43", label: "충북" },
  { value: "44", label: "충남" },
  { value: "45", label: "전북" },
  { value: "46", label: "전남" },
  { value: "47", label: "경북" },
  { value: "48", label: "경남" },
  { value: "50", label: "제주" },
];

const GENRE_OPTIONS = [
  { value: "AAAA", label: "연극" },
  { value: "BBBC", label: "무용" },
  { value: "BBBE", label: "대중무용" },
  { value: "CCCA", label: "서양음악" },
  { value: "CCCC", label: "한국음악" },
  { value: "CCCD", label: "대중음악" },
  { value: "EEEA", label: "복합" },
  { value: "EEEB", label: "서커스/마술" },
  { value: "GGGA", label: "뮤지컬" },
];

function PerformanceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  const parseDate = useCallback((dateString: string) => {
    if (!dateString || dateString.length !== 8) return undefined;

    try {
      const year = parseInt(dateString.slice(0, 4));
      const month = parseInt(dateString.slice(4, 6)) - 1;
      const day = parseInt(dateString.slice(6, 8));

      // 유효한 날짜인지 검증
      if (isNaN(year) || isNaN(month) || isNaN(day)) {
        return undefined;
      }

      const date = new Date(year, month, day);

      // 날짜가 유효한지 확인 (예: 2월 30일 같은 잘못된 날짜)
      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month ||
        date.getDate() !== day
      ) {
        return undefined;
      }

      return date;
    } catch {
      return undefined;
    }
  }, []);

  const formatDateToString = useCallback((date: Date | undefined) => {
    if (!date) return "";
    return format(date, "yyyyMMdd");
  }, []);

  const getDefaultStartDate = useCallback(() => {
    return new Date();
  }, []);

  const getDefaultEndDate = useCallback(() => {
    return addWeeks(new Date(), 2);
  }, []);

  const [startDate, setStartDate] = useState<Date | undefined>(() => {
    const paramDate = searchParams.get("stdate");
    return paramDate ? parseDate(paramDate) : getDefaultStartDate();
  });
  const [endDate, setEndDate] = useState<Date | undefined>(() => {
    const paramDate = searchParams.get("eddate");
    return paramDate ? parseDate(paramDate) : getDefaultEndDate();
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: [1],
        rootMargin: "-1px 0px 0px 0px",
      },
    );

    const element = filterRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  const [area, setArea] = useState<string | undefined>(
    searchParams.get("area") || undefined,
  );
  const [genre, setGenre] = useState<string | undefined>(
    searchParams.get("genre") || undefined,
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );

  const handleApplyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    const startDateStr = formatDateToString(startDate);
    const endDateStr = formatDateToString(endDate);

    if (startDateStr) {
      params.set("stdate", startDateStr);
    }
    if (endDateStr) {
      params.set("eddate", endDateStr);
    }

    if (area) {
      params.set("area", area);
    } else {
      params.delete("area");
    }

    if (genre) {
      params.set("genre", genre);
    } else {
      params.delete("genre");
    }

    // 검색어 sanitization (XSS 방지)
    const sanitizedSearch = sanitizeSearchQuery(searchQuery);

    if (sanitizedSearch) {
      params.set("search", sanitizedSearch);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    router.push(`?${params.toString()}`);
  }, [
    searchParams,
    formatDateToString,
    startDate,
    endDate,
    area,
    genre,
    searchQuery,
    router,
  ]);

  const handleResetFilters = useCallback(() => {
    setStartDate(getDefaultStartDate());
    setEndDate(getDefaultEndDate());
    setArea(undefined);
    setGenre(undefined);
    setSearchQuery("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("stdate");
    params.delete("eddate");
    params.delete("area");
    params.delete("genre");
    params.delete("search");
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  }, [getDefaultStartDate, getDefaultEndDate, searchParams, router]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleApplyFilters();
      }
    },
    [handleApplyFilters],
  );

  const areaOptions = useMemo(
    () =>
      AREA_OPTIONS.map((option) => (
        <SelectItem
          key={option.value}
          value={option.value}
          className="cursor-pointer"
        >
          {option.label}
        </SelectItem>
      )),
    [],
  );

  const genreOptions = useMemo(
    () =>
      GENRE_OPTIONS.map((option) => (
        <SelectItem
          key={option.value}
          value={option.value}
          className="cursor-pointer"
        >
          {option.label}
        </SelectItem>
      )),
    [],
  );

  // 선택된 필터 개수 계산
  const activeFilterCount = useMemo(() => {
    let count = 0;

    // 시작일이 기본값과 다른 경우
    const defaultStartDate = getDefaultStartDate();
    if (
      startDate &&
      formatDateToString(startDate) !== formatDateToString(defaultStartDate)
    ) {
      count++;
    }

    // 종료일이 기본값과 다른 경우
    const defaultEndDate = getDefaultEndDate();
    if (
      endDate &&
      formatDateToString(endDate) !== formatDateToString(defaultEndDate)
    ) {
      count++;
    }

    if (area) count++;
    if (genre) count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [
    startDate,
    endDate,
    area,
    genre,
    searchQuery,
    getDefaultStartDate,
    getDefaultEndDate,
    formatDateToString,
  ]);

  return (
    <div
      ref={filterRef}
      className={`sticky top-0 z-50 mb-6 rounded-lg border bg-white p-4 transition-all duration-300 ${
        isSticky ? "bg-white/95 shadow-lg backdrop-blur-sm" : "shadow-sm"
      }`}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="py-0 font-bold">
            <div className="flex items-center gap-2">
              <span>필터</span>
              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500 px-1.5 text-xs font-semibold text-white">
                  {activeFilterCount}
                </span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {/* 시작일 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  시작일
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {startDate ? (
                        format(startDate, "yyyy년 MM월 dd일", { locale: ko })
                      ) : (
                        <span>날짜 선택</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      locale={ko}
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* 종료일 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  종료일
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {endDate ? (
                        format(endDate, "yyyy년 MM월 dd일", { locale: ko })
                      ) : (
                        <span>날짜 선택</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      locale={ko}
                      disabled={(date) => {
                        if (!startDate) return false;
                        return date < startDate;
                      }}
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* 지역 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  지역
                </label>
                <Select
                  value={area}
                  onValueChange={(value) => setArea(value || undefined)}
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="전체 지역" />
                  </SelectTrigger>
                  <SelectContent>{areaOptions}</SelectContent>
                </Select>
              </div>

              {/* 장르 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  장르
                </label>
                <Select
                  value={genre}
                  onValueChange={(value) => setGenre(value || undefined)}
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="전체 장르" />
                  </SelectTrigger>
                  <SelectContent>{genreOptions}</SelectContent>
                </Select>
              </div>

              {/* 검색어 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  공연명 검색
                </label>
                <Input
                  type="text"
                  placeholder="공연명을 입력하세요"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            {/* 버튼 */}
            <div className="mt-4 flex justify-end gap-2">
              <Button
                onClick={handleApplyFilters}
                className="flex cursor-pointer items-center gap-2"
              >
                <Search className="size-4" />
                검색
              </Button>
              <Button
                onClick={handleResetFilters}
                variant="outline"
                className="flex cursor-pointer items-center gap-2"
              >
                <X className="size-4" />
                초기화
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default memo(PerformanceFilters);
