import { xmlToJson } from '@/shared/lib';
import { Performance, PerformanceApiResponse } from '@/shared/model';
import type { MetadataRoute } from 'next';

import { env } from '@/env';

const API_URL = env.PERFORMANCE_API_URL;
const API_KEY = env.PERFORMANCE_API_KEY;

// 오늘 날짜를 YYYYMMDD 형식으로 반환
function getTodayString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

// 30일 후 날짜를 YYYYMMDD 형식으로 반환
function getEndDateString(): string {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

// 현재 공연 중인 목록 가져오기
async function getPerformances(): Promise<Performance[]> {
  if (!API_URL || !API_KEY) {
    console.warn('Sitemap: API 설정이 없어 정적 페이지만 생성합니다.');
    return [];
  }

  try {
    const params = new URLSearchParams({
      service: API_KEY,
      stdate: getTodayString(),
      eddate: getEndDateString(),
      cpage: '1',
      rows: '100',
      prfstate: '02', // 공연중
    });

    const res = await fetch(`${API_URL}/pblprfr?${params.toString()}`, {
      next: { revalidate: 86400 }, // 24시간 캐시
    });

    if (!res.ok) {
      console.error('Sitemap: API 요청 실패', res.status);
      return [];
    }

    const xmlData = await res.text();
    const jsonData = await xmlToJson<PerformanceApiResponse>(xmlData);

    if (!jsonData?.dbs?.db) {
      return [];
    }

    return Array.isArray(jsonData.dbs.db) ? jsonData.dbs.db : [jsonData.dbs.db];
  } catch (error) {
    console.error('Sitemap: 공연 목록 조회 실패', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://plan-the-play.com';

  // 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // 동적 공연 페이지
  const performances = await getPerformances();
  const performancePages: MetadataRoute.Sitemap = performances.map((p) => ({
    url: `${baseUrl}/performance/${p.mt20id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...performancePages];
}
