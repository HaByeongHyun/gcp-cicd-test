// 공연 상태 코드
export type PerformanceState = "01" | "02" | "03";

// 장르 코드
export type GenreCode =
  | "AAAA" // 연극
  | "BBBC" // 무용
  | "BBBE" // 대중무용
  | "CCCA" // 서양음악
  | "CCCC" // 한국음악
  | "CCCD" // 대중음악
  | "EEEA" // 복합
  | "EEEB" // 서커스/마술
  | "GGGA"; // 뮤지컬

// 지역(시도) 코드
export type AreaCode =
  | "11" // 서울
  | "26" // 부산
  | "27" // 대구
  | "28" // 인천
  | "29" // 광주
  | "30" // 대전
  | "31" // 울산
  | "36" // 세종
  | "41" // 경기
  | "42" // 강원
  | "43" // 충북
  | "44" // 충남
  | "45" // 전북
  | "46" // 전남
  | "47" // 경북
  | "48" // 경남
  | "50"; // 제주

// 공연 목록 정보 (간략)
export interface Performance {
  mt20id: string; // 공연 ID
  prfnm: string; // 공연명
  genrenm: string; // 공연 장르명
  prfstate: string; // 공연상태
  prfpdfrom: string; // 공연시작일
  prfpdto: string; // 공연종료일
  poster: string; // 공연포스터경로
  fcltynm: string; // 공연시설명(공연장명)
  openrun?: string; // 오픈런 (Y/N)
  area?: string; // 공연지역
}

interface Relate {
  relatenm: string; // 예매처명
  relateurl: string; // 예매처url
}

// 공연 상세 정보
export interface PerformanceDetail {
  mt20id: string; // 공연 ID
  mt10id: string; // 공연시설 ID
  prfnm: string; // 공연명
  prfpdfrom: string; // 공연시작일
  prfpdto: string; // 공연종료일
  fcltynm: string; // 공연시설명(공연장명)
  prfcast: string; // 공연출연진
  prfcrew: string; // 공연제작진
  prfruntime: string; // 공연 런타임
  prfage: string; // 공연 관람 연령
  entrpsnmP: string; // 제작사
  entrpsnmA?: string; // 기획사
  entrpsnmH?: string; // 주최
  entrpsnmS?: string; // 주관
  pcseguidance: string; // 티켓가격
  poster: string; // 포스터이미지경로
  sty: string; // 줄거리
  genrenm: string; // 공연장르명
  prfstate: string; // 공연상태
  openrun: string; // 오픈런 (Y/N)
  visit?: string; // 내한 (Y/N)
  child?: string; // 아동 (Y/N)
  daehakro?: string; // 대학로 (Y/N)
  festival?: string; // 축제 (Y/N)
  musicallicense?: string; // 뮤지컬 라이센스 (Y/N)
  musicalcreate?: string; // 뮤지컬 창작 (Y/N)
  updatedate: string; // 최종수정일
  styurls?: {
    styurl: string | string[]; // 소개이미지 (단일 또는 배열)
  };
  relates?: {
    relate: Relate | Relate[];
  }; // 예매처 목록
  dtguidance?: string; // 공연시간
}

// 공연 목록 조회 API 응답 구조
export interface PerformanceApiResponse {
  dbs: {
    db: Performance | Performance[]; // xml2js 설정에 따라 단일 또는 배열
  };
}

// 공연 상세 조회 API 응답 구조
export interface PerformanceDetailApiResponse {
  dbs: {
    db: PerformanceDetail;
  };
}

// 공연 목록 조회 요청 파라미터
export interface PerformanceListParams {
  service: string; // 서비스키
  stdate: string; // 공연시작일 (YYYYMMDD)
  eddate: string; // 공연종료일 (YYYYMMDD, 최대 31일)
  cpage: number; // 현재페이지
  rows: number; // 페이지당 목록 수 (최대 100건)
  shcate?: GenreCode; // 장르코드 (선택)
  shprfnm?: string; // 공연명 (선택, URLEncoding)
  shprfnmfct?: string; // 공연시설명 (선택, URLEncoding)
  prfplccd?: string; // 공연장코드 (선택)
  signgucode?: AreaCode; // 지역(시도)코드 (선택)
  signgucodesub?: string; // 지역(구군)코드 (선택)
  kidstate?: "Y" | "N"; // 아동공연여부 (선택)
  prfstate?: PerformanceState; // 공연상태코드 (선택)
  openrun?: "Y" | "N"; // 오픈런여부 (선택)
  afterdate?: string; // 해당일자 이후 등록/수정된 항목만 출력 (선택)
}

// 공연 상세 조회 요청 파라미터
export interface PerformanceDetailParams {
  service: string; // 서비스키
  mt20id: string; // 공연 ID
}

export const performanceHelpers = {
  AREA_OPTIONS: [
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
  ],

  GENRE_OPTIONS: [
    { value: "AAAA", label: "연극" },
    { value: "BBBC", label: "무용" },
    { value: "BBBE", label: "대중무용" },
    { value: "CCCA", label: "서양음악" },
    { value: "CCCC", label: "한국음악" },
    { value: "CCCD", label: "대중음악" },
    { value: "EEEA", label: "복합" },
    { value: "EEEB", label: "서커스/마술" },
    { value: "GGGA", label: "뮤지컬" },
  ],
};
