# 플랜더플레이 - SEO 최적화 및 사용자 유입 증대 전략

> 작성일: 2025-01-09
> 프로젝트: 플랜더플레이 (Plan The Play)

## 목차

- [현재 상태 분석](#현재-상태-분석)
- [개선 방안](#개선-방안)
- [즉시 구현 권장 사항](#즉시-구현-권장-사항)
- [예상 효과](#예상-효과)
- [실행 로드맵](#실행-로드맵)

---

## 📊 현재 상태 분석

### ✅ 이미 잘 구현된 부분

#### 1. 기본 SEO 설정

- ✅ 메타태그 (title, description, keywords) 설정 완료
- ✅ Open Graph 태그 (Facebook, KakaoTalk 공유 최적화)
- ✅ Twitter Card 설정
- ✅ robots.txt 설정 (모든 크롤러 허용)
- ✅ sitemap.xml 구현 (3개 정적 페이지)
- ✅ Google Adsense 계정 연동 (`ca-pub-4208170150303299`)
- ✅ Naver 사이트 인증 완료

#### 2. 기술적 최적화

- ✅ PWA (Progressive Web App) 구현
  - 오프라인 지원
  - 앱 설치 가능
  - 서비스 워커 활성화
- ✅ Next.js 이미지 최적화 (`next/image`)
- ✅ 보안 헤더 설정
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: SAMEORIGIN
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy 설정
- ✅ www → apex 도메인 리다이렉트 (301)
- ✅ 한국어 콘텐츠 최적화 (`lang="ko"`, `locale="ko_KR"`)

#### 3. 성능 최적화

- ✅ Standalone 출력 모드 (Docker 최적화)
- ✅ 멀티 스테이지 Docker 빌드
- ✅ Alpine Linux 기반 경량 이미지
- ✅ React 컴포넌트 메모이제이션 (`memo`)
- ✅ Suspense를 활용한 로딩 최적화

### ❌ 개선 필요한 부분

1. **구조화된 데이터 없음** - JSON-LD 스키마 미적용
2. **동적 Sitemap 부족** - 3개 정적 페이지만 포함, 공연 상세 페이지 미포함
3. **OG 이미지 부족** - 홈페이지용 기본 이미지 없음
4. **공유 기능 없음** - 소셜 미디어 공유 버튼 부재
5. **SEO 친화적 URL 구조 부족** - 쿼리스트링 기반 필터링
6. **콘텐츠 다양성 부족** - 공연 목록/상세만 존재

---

## 🚀 개선 방안

### 1단계: 즉시 적용 가능한 SEO 최적화 (High Impact, Low Effort)

#### A. 구조화된 데이터 (JSON-LD) 추가 ⭐⭐⭐

**목적:** 검색 엔진이 공연 정보를 더 정확하게 이해하고 리치 스니펫 표시

**구현 위치:**

- `src/app/performance/[id]/page.tsx`

**적용할 스키마:**

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "공연명",
  "startDate": "2025-01-10",
  "endDate": "2025-03-31",
  "location": {
    "@type": "Place",
    "name": "공연장명",
    "address": "주소"
  },
  "image": "포스터 URL",
  "description": "공연 설명",
  "performer": {
    "@type": "PerformingGroup",
    "name": "출연진"
  },
  "offers": {
    "@type": "Offer",
    "price": "50000",
    "priceCurrency": "KRW"
  }
}
```

**기대 효과:**

- 구글 검색 결과에 별점, 가격, 날짜 등 리치 스니펫 표시
- CTR (클릭률) 30-50% 향상
- 음성 검색 최적화

---

#### B. 동적 Sitemap 생성 ⭐⭐⭐

**현재 문제:**

- sitemap.xml에 3개 정적 페이지만 포함
- 수천 개의 공연 상세 페이지가 크롤링되지 않음

**개선 방안:**

```typescript
// src/app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://plan-the-play.com';

  // 기본 페이지
  const staticPages = [
    { url: baseUrl, priority: 1, changeFrequency: 'daily' },
    { url: `${baseUrl}/about`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/privacy`, priority: 0.5, changeFrequency: 'monthly' },
  ];

  // 인기 공연 100개 동적 추가
  const performances = await fetchPopularPerformances(100);
  const performancePages = performances.map((p) => ({
    url: `${baseUrl}/performance/${p.id}`,
    lastModified: new Date(p.updateDate),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...performancePages];
}
```

**기대 효과:**

- 크롤링 효율 향상
- 인덱싱 속도 20-30% 증가
- 검색 노출 페이지 수 증가

---

#### C. OG 이미지 자동 생성 ⭐⭐

**현재 상태:**

- 공연 상세: 포스터 이미지 사용 중 (✅ 좋음)
- 홈페이지: 기본 OG 이미지 없음

**개선 방안:**

1. **정적 OG 이미지 생성** (`public/og-image.png`)
   - 플랜더플레이 로고 + "공연 검색의 모든 것"

2. **동적 OG 이미지** (Next.js 15+ 기능)
   ```typescript
   // src/app/performance/[id]/opengraph-image.tsx
   export default async function Image({ params }) {
     const performance = await getPerformance(params.id);
     return new ImageResponse();
     // 공연명, 날짜, 장소를 포함한 이미지 생성
   }
   ```

**기대 효과:**

- SNS 공유 시 시각적 매력도 증가
- 클릭률 50% 향상

---

#### D. 캐싱 전략 개선 ⭐⭐⭐

**현재 문제:**

```typescript
// 공연 목록: cache: "no-store" (매번 서버 요청)
// 공연 상세: next: { revalidate: 3600 } (✅ 좋음)
```

**개선 방안:**

```typescript
// 공연 목록도 ISR 적용
const res = await fetch(apiUrl, {
  next: { revalidate: 600 }, // 10분마다 재검증
});
```

**기대 효과:**

- 서버 부하 감소
- 페이지 로딩 속도 향상
- Cloud Run 비용 절감

---

### 2단계: 사용자 유입 증대 기능 (High Impact, Medium Effort)

#### A. 공유하기 기능 ⭐⭐⭐

**구현 방식:**

```typescript
// Web Share API + 소셜 공유 버튼
const sharePerformance = async () => {
  if (navigator.share) {
    await navigator.share({
      title: performance.name,
      text: performance.description,
      url: window.location.href,
    });
  } else {
    // 폴백: 카카오톡, 페이스북, 트위터 버튼
  }
};
```

**위치:**

- 공연 상세 페이지 상단
- 공연 카드 (목록)

**기대 효과:**

- 바이럴 마케팅
- 소셜 트래픽 40-60% 증가
- 자연스러운 백링크 생성

---

#### B. 북마크/즐겨찾기 기능 ⭐⭐⭐

**구현 방식:**

```typescript
// localStorage 기반 (서버 불필요)
const [bookmarks, setBookmarks] = useState<string[]>([]);

useEffect(() => {
  const saved = localStorage.getItem('bookmarks');
  setBookmarks(saved ? JSON.parse(saved) : []);
}, []);

const toggleBookmark = (id: string) => {
  const updated = bookmarks.includes(id)
    ? bookmarks.filter((b) => b !== id)
    : [...bookmarks, id];
  setBookmarks(updated);
  localStorage.setItem('bookmarks', JSON.stringify(updated));
};
```

**추가 페이지:**

- `/bookmarks` - 즐겨찾기한 공연 목록

**기대 효과:**

- 재방문율 15-20% 증가
- 평균 세션 시간 증가
- PWA와 결합 시 앱처럼 사용 가능

---

#### C. 필터 URL 개선 (SEO 친화적) ⭐⭐

**현재 URL 구조:**

```
/?area=11&genre=AAAA&search=햄릿
```

**개선된 URL 구조:**

```
/performances/seoul/musical
/performances/busan/concert
/performances/search/햄릿
```

**구현 방식:**

- Dynamic Routes: `/performances/[region]/[genre]`
- URL 파라미터를 경로로 변환
- `next.config.ts`에서 rewrite 설정

**기대 효과:**

- URL 가독성 향상
- 검색 엔진 친화적
- 북마크/공유 용이

---

#### D. 검색 기능 강화 ⭐⭐

**추가 기능:**

1. **실시간 자동완성**
   - 사용자가 타이핑하는 동안 공연명 제안
   - Debounce 처리로 성능 최적화

2. **최근 검색어**
   - localStorage 저장
   - 검색 입력란 클릭 시 표시

3. **인기 검색어**
   - 서버에서 집계 (선택사항)
   - 또는 고정된 인기 공연 표시

**기대 효과:**

- 사용자 경험 향상
- 검색 성공률 증가
- 체류 시간 증가

---

### 3단계: 콘텐츠 확장 (High Impact, High Effort)

#### A. 공연장 정보 페이지 ⭐⭐⭐

**새로운 페이지:**

```
/venues/[id]
```

**포함 내용:**

- 공연장 기본 정보 (주소, 좌석 수)
- 해당 공연장에서 진행되는 공연 목록
- 교통편 정보 (지하철, 버스)
- Google Maps 통합
- 주변 맛집/카페 정보 (선택사항)

**데이터 소스:**

- KOPIS API: `/prfplc` (공연장 정보)

**SEO 효과:**

- "대학로 예술극장", "세종문화회관 공연" 등 롱테일 키워드 공략
- 검색 유입 25-30% 증가
- 체류 시간 증가

---

#### B. 장르별 큐레이션 페이지 ⭐⭐

**새로운 페이지:**

```
/genres/musical
/genres/concert
/genres/play
```

**포함 내용:**

- 장르 소개
- 추천 공연 (편집자 선정 또는 알고리즘)
- 인기 공연 Top 10
- 장르별 필터링된 목록

**구현 방식:**

- 정적 생성 (SSG)로 SEO 최적화
- 주기적 업데이트 (ISR)

**SEO 효과:**

- "뮤지컬 추천", "콘서트 정보" 등 키워드 공략
- 브랜드 권위 향상

---

#### C. 블로그/콘텐츠 섹션 ⭐⭐⭐

**새로운 페이지:**

```
/blog
/blog/best-musicals-2025
/blog/how-to-choose-performances
```

**콘텐츠 아이디어:**

- "2025년 꼭 봐야 할 뮤지컬 TOP 10"
- "공연 초보자를 위한 공연 선택 가이드"
- "공연장별 꿀팁 - 좋은 좌석 고르는 법"
- "장르별 추천 - 연극 vs 뮤지컬 비교"

**CMS 옵션:**

1. **Markdown 기반** (간단)
   - `/content/blog/*.md`
   - 빌드 시 정적 생성

2. **Headless CMS** (고급)
   - Contentful, Sanity
   - 관리자 페이지에서 작성

**SEO 효과:**

- 롱테일 키워드 공략
- 오가닉 트래픽 50-100% 증가 (장기)
- 백링크 획득
- 브랜드 신뢰도 향상

---

### 4단계: 개인화 기능 (Medium Impact, High Effort)

#### A. 알림 기능 ⭐⭐

**구현 방식:**

- PWA Push Notification API
- 사용자 권한 요청
- Cloud Functions (선택사항)로 스케줄링

**알림 시나리오:**

1. 찜한 공연 시작 임박 (D-7, D-3, D-1)
2. 새로운 공연 등록 (선호 장르)
3. 티켓 오픈 알림

**기대 효과:**

- 재방문율 20-30% 증가
- 앱과 유사한 사용자 경험

---

#### B. 추천 시스템 ⭐

**단계별 구현:**

1. **기본 추천** (즉시 구현 가능)
   - 선호 장르 기반 (localStorage)
   - 최근 본 공연과 유사한 장르

2. **고급 추천** (장기)
   - 협업 필터링 (Collaborative Filtering)
   - 사용자 행동 분석
   - 머신러닝 모델 (선택사항)

**기대 효과:**

- 개인화된 경험
- 평균 세션 시간 증가

---

#### C. 리뷰/평점 시스템 ⭐⭐

**구현 요구사항:**

- 사용자 인증 시스템 (필수)
- 데이터베이스 (Firestore, Supabase 등)
- 스팸 방지 시스템

**기능:**

- 별점 (1-5)
- 리뷰 작성
- 좋아요/신고 기능
- 베스트 리뷰 선정

**기대 효과:**

- 사용자 생성 콘텐츠 (UGC)
- 커뮤니티 형성
- 재방문율 증가
- SEO 효과 (리치 스니펫 별점)

---

## 💡 즉시 구현 권장 사항 (상위 3개)

### 1️⃣ 구조화된 데이터 (JSON-LD) 추가

**작업 시간:** 1-2시간
**난이도:** ⭐ 낮음
**효과:** ⭐⭐⭐ 높음

**구현 파일:**

- `src/app/performance/[id]/page.tsx`

**작업 내용:**

1. Event 스키마 JSON-LD 생성 함수 작성
2. `<script type="application/ld+json">` 태그로 삽입
3. Google Rich Results Test로 검증

---

### 2️⃣ 동적 Sitemap 생성

**작업 시간:** 2-3시간
**난이도:** ⭐⭐ 중간
**효과:** ⭐⭐⭐ 높음

**구현 파일:**

- `src/app/sitemap.ts`

**작업 내용:**

1. KOPIS API에서 인기 공연 100개 조회 함수 작성
2. 공연 상세 페이지 URL 동적 생성
3. 정적 페이지와 병합
4. `lastModified`, `changeFrequency` 설정

---

### 3️⃣ 공유하기 기능

**작업 시간:** 2-3시간
**난이도:** ⭐ 낮음
**효과:** ⭐⭐⭐ 높음

**구현 파일:**

- `src/components/share-button.tsx`
- `src/app/performance/[id]/page.tsx`

**작업 내용:**

1. Web Share API 컴포넌트 작성
2. 카카오톡, 페이스북, 트위터 폴백 버튼
3. 공연 상세 페이지에 통합
4. OG 태그 검증

---

## 📈 예상 효과

| 기능                  | 예상 유입 증가 | 구현 난이도 | 작업 시간 | 우선순위  |
| --------------------- | -------------- | ----------- | --------- | --------- |
| JSON-LD 구조화 데이터 | +30%           | 낮음        | 1-2h      | 🔥 최우선 |
| 동적 Sitemap          | +20%           | 낮음        | 2-3h      | 🔥 최우선 |
| 공유하기 기능         | +40%           | 낮음        | 2-3h      | 🔥 최우선 |
| 북마크 기능           | +15% 재방문    | 낮음        | 3-4h      | ⭐ 높음   |
| 검색 기능 강화        | +10%           | 중간        | 4-6h      | ⭐ 높음   |
| OG 이미지 생성        | +15% CTR       | 낮음        | 2h        | ⭐ 높음   |
| 공연장 페이지         | +25%           | 중간        | 1-2주     | ⭐ 높음   |
| 장르 큐레이션         | +15%           | 중간        | 1주       | 💎 중간   |
| 블로그 콘텐츠         | +50% (장기)    | 높음        | 지속적    | 💎 장기   |
| 알림 기능             | +20% 재방문    | 높음        | 1-2주     | 💎 중간   |
| 추천 시스템           | +10%           | 높음        | 2-3주     | 💎 장기   |
| 리뷰/평점 시스템      | +30%           | 매우 높음   | 3-4주     | 💎 장기   |

---

## 🎯 실행 로드맵

### Phase 1: Quick Wins (1주차)

**목표:** SEO 기반 마련 및 공유 기능 추가

- [x] 빌드 체크 완료
- [ ] JSON-LD 구조화 데이터 추가
- [ ] 동적 Sitemap 생성
- [ ] 공유하기 기능 구현
- [ ] OG 이미지 생성

**예상 효과:** 유입 +40-50%

---

### Phase 2: User Engagement (2주차)

**목표:** 사용자 재방문율 증대

- [ ] 북마크/즐겨찾기 기능
- [ ] 검색 기능 강화 (자동완성, 최근 검색어)
- [ ] 캐싱 전략 개선
- [ ] 필터 URL 개선 (SEO 친화적)

**예상 효과:** 재방문 +15-20%

---

### Phase 3: Content Expansion (3-4주차)

**목표:** 콘텐츠 다양화 및 SEO 강화

- [ ] 공연장 정보 페이지 (/venues/[id])
- [ ] 장르별 큐레이션 페이지 (/genres/[genre])
- [ ] 홈페이지 개선 (인기 공연, 카테고리별 섹션)

**예상 효과:** 유입 +30-40%

---

### Phase 4: Long-term Growth (1-3개월)

**목표:** 브랜드 구축 및 커뮤니티 형성

- [ ] 블로그/콘텐츠 섹션 구축
- [ ] 정기 콘텐츠 발행 (주 1-2회)
- [ ] 알림 기능 (PWA Push)
- [ ] 추천 시스템 (기본)
- [ ] 리뷰/평점 시스템 (선택사항)

**예상 효과:** 유입 +100% (3개월 기준)

---

## 🔍 모니터링 지표

### 1. SEO 지표

- [ ] Google Search Console 연동
- [ ] 검색 노출 수 (Impressions)
- [ ] 검색 클릭 수 (Clicks)
- [ ] 평균 게재 순위 (Avg. Position)
- [ ] CTR (Click-through Rate)

### 2. 트래픽 지표

- [ ] Google Analytics 4 연동
- [ ] 일 방문자 수 (DAU)
- [ ] 페이지뷰 (PV)
- [ ] 평균 세션 시간
- [ ] 이탈률 (Bounce Rate)

### 3. 전환 지표

- [ ] 공연 상세 페이지 조회율
- [ ] 예약 링크 클릭률
- [ ] 북마크 등록 수
- [ ] 공유 횟수

### 4. 기술 지표

- [ ] Lighthouse 점수 (성능, SEO, 접근성)
- [ ] Core Web Vitals (LCP, FID, CLS)
- [ ] 서버 응답 시간 (TTFB)

---

## 📚 참고 자료

### SEO

- [Google Search Central](https://developers.google.com/search)
- [Schema.org - Event](https://schema.org/Event)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

### PWA

- [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
- [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

### 성능 최적화

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [ISR (Incremental Static Regeneration)](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)

---

## 📝 메모

### 고려사항

1. **KOPIS API 제약사항**
   - Rate Limiting 확인 필요
   - 캐싱 전략으로 API 호출 최소화

2. **Cloud Run 비용**
   - 캐싱으로 인스턴스 수 감소
   - 정적 자산은 CDN 활용 검토

3. **개인정보보호**
   - 리뷰/평점 시스템 구현 시 개인정보처리방침 업데이트
   - 쿠키/로컬스토리지 사용 고지

4. **접근성 (a11y)**
   - WCAG 2.1 준수
   - 스크린 리더 호환성
   - 키보드 네비게이션

---

**작성자:** Claude Code
**마지막 업데이트:** 2025-01-09
