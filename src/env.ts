// Next.js의 빌드 타임 인라인 치환을 위해 process.env에 직접 접근해야 함

const validateEnv = () => {
  const isProduction = process.env.NODE_ENV === "production";

  const apiUrl = process.env.PERFORMANCE_API_URL;
  const apiKey = process.env.PERFORMANCE_API_KEY;

  if (isProduction) {
    if (!apiUrl) throw new Error("❌ 필수 환경변수 누락: PERFORMANCE_API_URL");
    if (!apiKey) throw new Error("❌ 필수 환경변수 누락: PERFORMANCE_API_KEY");
  }

  return {
    PERFORMANCE_API_URL: apiUrl || "",
    PERFORMANCE_API_KEY: apiKey || "",
    NODE_ENV: process.env.NODE_ENV || "development",
  };
};

export const env = validateEnv();