/**
 * 환경변수 타입 안전성 강화 유틸리티
 */
const requiredEnv = (key: string, value: string | undefined): string => {
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(`❌ 필수 환경변수가 누락되었습니다: ${key}`);
  }
  return value || "";
};

export const env = {
  PERFORMANCE_API_URL: requiredEnv(
    "PERFORMANCE_API_URL",
    process.env.PERFORMANCE_API_URL
  ),
  PERFORMANCE_API_KEY: requiredEnv(
    "PERFORMANCE_API_KEY",
    process.env.PERFORMANCE_API_KEY
  ),
  NODE_ENV: process.env.NODE_ENV || "development",
} as const;
