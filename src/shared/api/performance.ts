import { env } from "@/env";
import { xmlToJson } from "@/shared/lib";
import {
  Performance,
  PerformanceApiResponse,
  PerformanceDetail,
  PerformanceDetailApiResponse,
} from "@/shared/model";

const API_URL = env.PERFORMANCE_API_URL;
const API_KEY = env.PERFORMANCE_API_KEY;

export class PerformanceApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "PerformanceApiError";
  }
}

function validatePerformanceId(id: string): void {
  if (!/^[A-Za-z0-9]{1,50}$/.test(id)) {
    throw new PerformanceApiError("올바르지 않은 공연 ID입니다.");
  }
}

export interface PerformanceListOptions {
  page: number;
  perPage: number;
  stdate: string;
  eddate: string;
  area?: string;
  genre?: string;
  search?: string;
  prfstate?: string;
  revalidate?: number;
}

export async function fetchPerformanceList(
  options: PerformanceListOptions,
): Promise<Performance[]> {
  const {
    page,
    perPage,
    stdate,
    eddate,
    area,
    genre,
    search,
    prfstate = "02",
    revalidate = 600,
  } = options;

  const params = new URLSearchParams({
    service: API_KEY,
    stdate,
    eddate,
    cpage: page.toString(),
    rows: perPage.toString(),
    prfstate,
  });

  if (area) params.append("signgucode", area);
  if (genre) params.append("shcate", genre);
  if (search) params.append("shprfnm", search);

  const res = await fetch(`${API_URL}/pblprfr?${params.toString()}`, {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new PerformanceApiError(
      `API 요청 실패: ${res.status} ${res.statusText}`,
      res.status,
    );
  }

  const xmlData = await res.text();
  const jsonData = await xmlToJson<PerformanceApiResponse>(xmlData);

  if (!jsonData?.dbs) {
    throw new PerformanceApiError("API 응답 형식이 올바르지 않습니다.");
  }

  return Array.isArray(jsonData.dbs.db)
    ? jsonData.dbs.db
    : jsonData.dbs.db
      ? [jsonData.dbs.db]
      : [];
}

export async function fetchPerformanceDetail(
  id: string,
  revalidate = 3600,
): Promise<PerformanceDetail> {
  validatePerformanceId(id);

  const res = await fetch(`${API_URL}/pblprfr/${id}?service=${API_KEY}`, {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new PerformanceApiError(
      `공연 상세 정보를 불러오는데 실패했습니다. (상태 코드: ${res.status})`,
      res.status,
    );
  }

  const xmlData = await res.text();
  const jsonData = await xmlToJson<PerformanceDetailApiResponse>(xmlData);

  if (!jsonData?.dbs?.db) {
    throw new PerformanceApiError("공연 정보가 올바르지 않은 형식입니다.");
  }

  return jsonData.dbs.db;
}