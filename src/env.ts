// Next.js의 빌드 타임 인라인 치환을 위해 process.env에 직접 접근해야 함

import 'server-only';
const validateEnv = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  // Next.js 빌드 단계인지 확인 (정적 페이지 생성 등)
  // 빌드 시에는 실제 API 키가 없을 수 있으므로 에러를 던지지 않습니다.
  const isBuildPhase =
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.env.CI === 'true';

  const apiUrl = process.env.PERFORMANCE_API_URL;
  const apiKey = process.env.PERFORMANCE_API_KEY;

  // 실제 서비스 실행(Runtime) 시에만 필수 환경변수를 엄격하게 검사합니다.
  // 빌드 시에는 에러 대신 경고만 출력합니다.
  if (isProduction && !isBuildPhase) {
    if (!apiUrl) throw new Error('❌ 필수 환경변수 누락: PERFORMANCE_API_URL');
    if (!apiKey) throw new Error('❌ 필수 환경변수 누락: PERFORMANCE_API_KEY');
  } else if (isProduction && isBuildPhase) {
    if (!apiUrl || !apiKey) {
      console.warn(
        '⚠️ [Build Phase] 필수 환경변수가 누락된 상태로 빌드를 진행합니다. 런타임에 반드시 설정되어야 합니다.',
      );
    }
  }

  return {
    PERFORMANCE_API_URL: apiUrl || '',
    PERFORMANCE_API_KEY: apiKey || '',
    NODE_ENV: process.env.NODE_ENV || 'development',
  };
};

export const env = validateEnv();
