# PRD: YouTube Content Topic Recommender

## 📋 프로젝트 개요

유튜브 크리에이터를 위한 데이터 기반 컨텐츠 주제 추천 플랫폼입니다. YouTube API와 실제 통계 데이터를 활용하여 숏폼(Shorts)과 롱폼(일반 영상)별로 수익성이 높고 경쟁이 적절한 주제를 추천합니다.

## 🎯 핵심 목표

1. **데이터 기반 의사결정**: 주관적 추측이 아닌 YouTube API의 실제 데이터로 주제 선정
2. **수익 최적화**: CPM, 조회수, 참여도 등을 종합적으로 분석하여 수익성 높은 주제 추천
3. **경쟁 회피**: 과열된 주제를 필터링하여 블루오션 발굴
4. **지속적 업데이트**: 매월 1일 자동으로 새로운 트렌드 반영

## 👥 타겟 사용자

- 유튜브 수익화를 시작하려는 신규 크리에이터
- 새로운 컨텐츠 주제를 찾는 기존 크리에이터
- 숏폼/롱폼 전략을 수립하려는 콘텐츠 기획자

## 🔑 핵심 기능

### 1. 주제 추천 시스템

#### 1.1 숏폼(Shorts) 주제 추천
- **분석 기준**:
  - 최근 1년간 조회수 증가율
  - 평균 조회수 대비 채널 구독자 수 비율
  - 댓글/좋아요 참여율
  - 업로드 빈도 (경쟁 강도 측정)
  - CPM 추정치

- **추천 항목**:
  - 주제명 및 카테고리
  - 예상 조회수 범위
  - 경쟁 강도 (낮음/보통/높음)
  - 수익성 점수 (1-10)
  - 관련 인기 해시태그
  - 최적 업로드 시간대
  - 참고할 만한 성공 사례 (채널명, 조회수)

#### 1.2 롱폼(일반 영상) 주제 추천
- **분석 기준**:
  - 평균 시청 시간 (Watch Time)
  - 클릭률 (CTR)
  - 광고 수익성 (높은 CPM 카테고리)
  - 검색 볼륨 대비 경쟁 영상 수
  - 시리즈물 가능성

- **추천 항목**:
  - 주제명 및 세부 카테고리
  - 권장 영상 길이
  - 예상 CPM 범위
  - 키워드 난이도
  - 시청자 이탈 구간 분석
  - 추천 썸네일 스타일
  - SEO 최적화 키워드 리스트

### 2. 대시보드

#### 2.1 메인 대시보드
- 숏폼/롱폼 탭 구분
- 상위 10개 추천 주제 카드형 디스플레이
- 필터링 옵션:
  - 카테고리별 (게임, 교육, 엔터테인먼트, 뷰티, 테크, 라이프스타일 등)
  - 수익성 기준 (높음/중간/낮음)
  - 경쟁 강도 (낮음/중간/높음)
  - 난이도 (초보자/중급/전문가)

#### 2.2 상세 분석 페이지
각 추천 주제 클릭 시:
- 트렌드 그래프 (최근 12개월 조회수/업로드 수 추이)
- 경쟁자 분석 (상위 채널 리스트, 구독자 수, 평균 조회수)
- 성공 패턴 분석 (영상 길이, 업로드 주기, 썸네일 스타일)
- 키워드 클라우드
- 예상 수익 계산기 (조회수 입력 시 예상 수익 표시)

### 3. 자동 업데이트 시스템

- **업데이트 주기**: 매월 1일 오전 2시 (UTC+9)
- **업데이트 내용**:
  - 새로운 추천 주제 추가 (최소 3개 이상)
  - 기존 주제의 경쟁 강도 재평가
  - 과열된 주제 제거 또는 경고 표시
  - 트렌드 변화 요약 리포트 생성

- **알림 기능**:
  - 이메일 구독 시 매월 업데이트 내용 발송
  - 사이트 내 "새로운 주제" 배지 표시

### 4. 추가 도구

#### 4.1 수익 계산기
- 예상 조회수 입력
- 카테고리별 평균 CPM 적용
- 숏폼/롱폼 구분에 따른 수익 시뮬레이션

#### 4.2 경쟁 분석기
- 특정 키워드 입력 시 경쟁 강도 분석
- 유사 주제 영상 수, 평균 조회수, 상위 채널 정보 제공

#### 4.3 트렌드 알림
- 급상승 중인 주제 실시간 알림
- 사용자가 관심 카테고리 설정 가능

## 🛠 기술 스택

### Frontend
- **Framework**: React 18+ (Next.js 14 App Router 권장)
- **Styling**: TailwindCSS 3.4+
- **State Management**: React Query (TanStack Query) + Zustand
- **Charts**: Recharts 또는 Chart.js
- **UI Components**: Shadcn/ui 또는 Headless UI
- **Animations**: 
  - Framer Motion (페이지 전환, 스크롤 애니메이션)
  - react-intersection-observer (Scroll Reveal)
- **3D Graphics**: 
  - Three.js + @react-three/fiber (Hero 섹션)
  - 또는 Spline (코드 없는 3D)
- **Slider**: Swiper.js (터치/마우스 슬라이더)
- **Icons**: Lucide React 또는 Hero Icons
- **Fonts**: 
  - 한글: Pretendard (가변 폰트)
  - 영문: Inter (Google Fonts)

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (선택사항)
- **Storage**: Supabase Storage (썸네일 이미지 등)
- **Serverless Functions**: Vercel Edge Functions 또는 Supabase Functions

### Hosting
- **Platform**: Vercel
- **CDN**: Vercel Edge Network

### 데이터 수집 & 분석
- **Cron Jobs**: Vercel Cron Jobs 또는 GitHub Actions
- **Data Processing**: Node.js 스크립트

## 📊 필요한 API 및 데이터 소스

### 1. YouTube Data API v3 (필수)
**필요: API Key**

- **용도**:
  - 영상 검색 및 메타데이터 수집
  - 카테고리별 인기 영상 조회
  - 채널 정보 수집
  - 댓글/좋아요/조회수 데이터

- **주요 엔드포인트**:
  - `search.list`: 키워드 기반 영상 검색
  - `videos.list`: 영상 상세 정보 (조회수, 좋아요, 댓글 수)
  - `channels.list`: 채널 정보
  - `videoCategories.list`: 카테고리 정보

- **할당량**:
  - 일일 10,000 units (기본 무료)
  - 필요 시 할당량 증가 신청

- **발급 방법**:
  1. Google Cloud Console (console.cloud.google.com) 접속
  2. 새 프로젝트 생성
  3. "YouTube Data API v3" 활성화
  4. "사용자 인증 정보" → "API 키" 생성

### 2. YouTube Analytics API (선택사항)
**필요: OAuth 2.0 인증**

- **용도**:
  - 자신의 채널 상세 분석 데이터 (선택 기능)
  - 시청 시간, CTR, 수익 데이터

- **제한사항**:
  - 본인 채널 데이터만 접근 가능
  - 타 채널 분석에는 사용 불가

### 3. Google Trends API (비공식) 또는 Pytrends
**필요: 없음 (공개 API)**

- **용도**:
  - 검색어 트렌드 분석
  - 지역별 관심도 분석
  - 관련 키워드 발굴

- **대안**: 
  - Serp API (유료, 더 안정적)
  - 직접 스크래핑 (Rate Limit 주의)

### 4. Social Blade API (선택사항)
**필요: API Key (유료, $5-50/month)**

- **용도**:
  - 채널 성장 추이
  - 예상 수익 데이터
  - 구독자/조회수 통계

### 5. VidIQ / TubeBuddy API (선택사항)
**필요: 파트너십 또는 유료 플랜**

- **용도**:
  - SEO 스코어
  - 키워드 난이도
  - 경쟁 분석

### 6. 자체 데이터 수집
- YouTube Data API로 정기적으로 데이터 수집 및 DB 저장
- 시계열 데이터 축적으로 트렌드 분석 정확도 향상

## 📈 데이터 분석 기준

### 주제 추천 알고리즘

#### 수익성 점수 계산 (1-10점)
```
수익성 점수 = (
  평균_조회수_점수 * 0.3 +
  CPM_카테고리_점수 * 0.25 +
  참여율_점수 * 0.2 +
  성장률_점수 * 0.15 +
  시청시간_점수 * 0.1
)
```

#### 경쟁 강도 계산
- **낮음**: 월 업로드 수 < 500개, 상위 채널 구독자 수 < 10만
- **보통**: 월 업로드 수 500-2000개, 상위 채널 구독자 수 10만-50만
- **높음**: 월 업로드 수 > 2000개, 상위 채널 구독자 수 > 50만

#### 과열 주제 필터링
다음 조건을 모두 만족 시 제외:
- 최근 3개월 업로드 수 200% 이상 증가
- 상위 10개 채널이 전체 조회수의 80% 이상 차지
- 평균 조회수 대비 중앙값이 1/10 이하 (소수만 성공)

### 카테고리별 CPM 추정치 (참고용)

| 카테고리 | 평균 CPM (USD) | 비고 |
|---------|----------------|------|
| 금융/투자 | $12-18 | 높음 |
| 교육/강의 | $8-15 | 높음 |
| 테크/리뷰 | $6-12 | 중상 |
| 비즈니스 | $7-14 | 중상 |
| 건강/피트니스 | $5-10 | 중간 |
| 요리/레시피 | $4-8 | 중간 |
| 게임 | $2-6 | 낮음 |
| 엔터테인먼트 | $2-5 | 낮음 |
| Vlog | $2-5 | 낮음 |

*실제 CPM은 지역, 시청자층, 시즌에 따라 변동됨*

## 🎨 UI/UX 요구사항

### 디자인 컨셉
**첨부된 레퍼런스 이미지 기반 프리미엄 모던 디자인**

### 핵심 디자인 요소
1. **그라디언트 배경**: 
   - 보라색(#5B21B6) → 파란색(#1E40AF) → 핑크색(#DB2777)
   - 부드러운 블렌딩과 애니메이션 효과
   
2. **3D 비주얼 요소**:
   - Hero 섹션에 3D 그래픽 (Three.js 또는 Spline)
   - 빛나는 효과(glow), 반사 효과
   - 인터랙티브 애니메이션 (마우스 움직임 반응)

3. **글래스모피즘 (Glassmorphism)**:
   - 반투명 카드 (backdrop-blur)
   - 미세한 테두리 (border: 1px solid rgba(255,255,255,0.1))
   - 부드러운 그림자

4. **타이포그래피**:
   - 헤드라인: 대형, 볼드, 그라디언트 텍스트
   - 본문: 가독성 높은 산세리프 (Pretendard 또는 Inter)
   - 영문/한글 혼용 시 자연스러운 조화

5. **애니메이션**:
   - Scroll Reveal: 스크롤 시 페이드인 효과
   - Hover 효과: 카드 확대, 그림자 변화
   - 페이지 전환: 부드러운 트랜지션

### 반응형 디자인 (Responsive Design)

#### 브레이크포인트
```css
- Mobile: 320px ~ 767px
- Tablet: 768px ~ 1023px
- Desktop: 1024px ~ 1439px
- Large Desktop: 1440px+
```

#### 반응형 전략

**1. Mobile First 접근**
- 모바일부터 디자인 후 데스크톱으로 확장
- 터치 인터랙션 최적화

**2. 레이아웃 변화**

| 요소 | Mobile | Tablet | Desktop |
|------|--------|--------|---------|
| 네비게이션 | 햄버거 메뉴 | 축약 메뉴 | 풀 메뉴 바 |
| Hero 섹션 | 1단 세로 배치 | 1단 세로 배치 | 텍스트+비주얼 가로 배치 |
| 주제 카드 | 1열 | 2열 | 3-4열 그리드 |
| 트렌드 그래프 | 세로 스크롤 | 가로 스크롤 | 전체 표시 |
| 상세 페이지 | 1단 | 1단 | 2단 (사이드바) |

**3. 터치 최적화 (Mobile/Tablet)**
- 버튼 최소 크기: 44x44px
- 충분한 여백 (padding/margin)
- 스와이프 제스처 지원 (카드 슬라이더)

**4. 텍스트 크기 조정**
```css
- H1 (Hero): 
  Mobile: 32px / Tablet: 48px / Desktop: 64px
- H2 (Section): 
  Mobile: 24px / Tablet: 32px / Desktop: 40px
- Body: 
  Mobile: 14px / Tablet: 16px / Desktop: 16px
```

**5. 이미지 최적화**
- 반응형 이미지 (srcset, sizes)
- WebP 포맷 사용
- 레이지 로딩 (Lazy Loading)
- Mobile: 최대 768px 너비
- Desktop: 최대 1920px 너비

**6. 성능 최적화**
- Mobile: First Contentful Paint < 1.5초
- Desktop: First Contentful Paint < 1초
- 코드 스플리팅 (동적 import)
- CSS/JS 번들 최소화

### 디자인 원칙
1. **직관성**: 3클릭 이내 원하는 정보 접근
2. **시각화**: 복잡한 데이터를 그래프와 차트로 명확하게 표현
3. **반응형**: 모바일/태블릿/데스크톱 완벽 지원
4. **속도**: 페이지 로딩 시간 < 2초
5. **접근성**: WCAG 2.1 AA 수준 준수

### 주요 화면 구성

#### 1. 랜딩 페이지 (레퍼런스 이미지 기반)

**A. Navigation Bar (고정 헤더)**
- 배경: 반투명 다크 (backdrop-blur-lg)
- 좌측: 로고
- 중앙: 메뉴 (숏폼 추천 | 롱폼 추천 | 트렌드 분석 | 도구)
- 우측: 검색 아이콘, 언어 선택
- Mobile: 햄버거 메뉴로 전환

**B. Hero Section (전체 화면)**
- 배경: 그라디언트 애니메이션 (보라→파란→핑크)
- 중앙: 
  - 3D 그래픽 요소 (빛나는 링 또는 유튜브 로고 형태)
  - 대형 타이틀: "데이터로 찾는 수익형 컨텐츠"
  - 서브타이틀: "AI가 분석한 유튜브 트렌드, 지금 바로 시작하세요"
  - CTA 버튼 2개: "숏폼 주제 보기" / "롱폼 주제 보기"
- 하단: 스크롤 안내 애니메이션
- **Mobile**: 타이틀 32px, 버튼 세로 배치
- **Desktop**: 타이틀 64px, 버튼 가로 배치

**C. Feature Highlight Section**
- 배경: 어두운 그라디언트 + 배경 이미지 (blur)
- 타이틀: "실시간 데이터 기반 추천"
- 3개 컬럼 (Mobile: 1열, Tablet: 2열, Desktop: 3열):
  - 아이콘 + 제목 + 설명
  - 예: "높은 수익성 | 낮은 경쟁 | 매월 업데이트"

**D. Our Topics Section**
- 배경: 그라디언트 전환 (파란→핑크)
- 타이틀: "이번 달 추천 주제"
- 탭: 숏폼 / 롱폼
- 카드 그리드 (글래스모피즘 스타일):
  - Mobile: 1열
  - Tablet: 2열
  - Desktop: 4열
- 각 카드:
  - 카테고리 뱃지
  - 주제명
  - 수익성 점수 (별점 또는 숫자)
  - 경쟁도 인디케이터
  - "자세히 보기" 버튼 (호버 시 확대)

**E. Data Visualization Section**
- 타이틀: "트렌드 한눈에 보기"
- 인터랙티브 차트:
  - 카테고리별 조회수 추이
  - CPM 비교 막대 그래프
- **Mobile**: 차트 단순화, 가로 스크롤
- **Desktop**: 풀 차트 표시

**F. News/Update Section**
- 타이틀: "최신 소식"
- 카드 슬라이더 (Swiper.js):
  - 3개씩 표시 (Mobile: 1개, Tablet: 2개)
  - 업데이트 날짜 + 썸네일 + 제목
  - 좌우 화살표 네비게이션

**G. CTA Section**
- 배경: 밝은 그라디언트 (하늘→바다)
- 중앙 정렬:
  - 타이틀: "지금 바로 시작하세요"
  - 설명: "무료로 모든 기능 이용 가능"
  - 대형 CTA 버튼
- **Mobile**: 패딩 조정, 버튼 전체 너비

**H. Footer**
- 배경: 다크 그레이
- 3개 컬럼 (Mobile: 1열 세로):
  - 회사 정보
  - 빠른 링크
  - 소셜 미디어 아이콘
- 하단: 저작권 정보

#### 2. 주제 탐색 페이지

**Desktop Layout:**
```
┌─────────────────────────────────────┐
│  상단 필터 바 (카테고리, 정렬 옵션)    │
├─────────┬───────────────────────────┤
│ 사이드바 │  주제 카드 그리드 (3-4열)   │
│ (필터)   │                           │
│         │  [카드] [카드] [카드] [카드]│
│         │  [카드] [카드] [카드] [카드]│
└─────────┴───────────────────────────┘
```

**Mobile Layout:**
```
┌────────────────┐
│ 필터 토글 버튼  │
├────────────────┤
│  [주제 카드]    │
│  [주제 카드]    │
│  [주제 카드]    │
│  (1열 세로)     │
└────────────────┘
```

**주제 카드 디자인:**
- 글래스모피즘 스타일
- 호버 시: scale(1.05) + 그림자 증가
- 카드 내용:
  - 상단: 카테고리 뱃지 + 북마크 아이콘
  - 중앙: 주제명 (큰 폰트)
  - 하단: 수익성/경쟁도 바 + 조회수 표시

#### 3. 주제 상세 페이지

**Desktop Layout (2단):**
```
┌──────────────────┬──────────────┐
│ 주제 헤더         │ 사이드바      │
├──────────────────┤ - 핵심 지표   │
│ 트렌드 그래프     │ - 빠른 액션   │
├──────────────────┤              │
│ 경쟁자 분석       │              │
├──────────────────┤              │
│ 키워드 & 태그     │              │
└──────────────────┴──────────────┘
```

**Mobile Layout (1단):**
- 모든 섹션 세로 배치
- 고정 하단 CTA 버튼

**인터랙티브 요소:**
- 탭 전환: 개요 / 경쟁자 / 키워드 / 가이드
- 툴팁: 용어 설명 (물음표 아이콘 호버)
- 공유 버튼: URL 복사, 소셜 공유

#### 4. 도구 페이지

**수익 계산기:**
- 인풋: 예상 조회수, 카테고리 선택
- 실시간 결과 표시 (애니메이션)
- 막대 그래프: 최소/평균/최대 수익 범위

**경쟁 분석기:**
- 검색 바: 키워드 입력
- 결과: 경쟁 점수 (게이지 차트) + 상세 데이터 테이블

**반응형 특이사항:**
- 도구는 세로 스크롤보다 한 화면에 표시 선호
- Mobile: 인풋 크기 확대, 키보드 최적화

### 컬러 스킴 (레퍼런스 이미지 기반)

#### 브랜드 컬러
```css
--primary-purple: #5B21B6;      /* 보라색 */
--primary-blue: #1E40AF;        /* 파란색 */
--primary-pink: #DB2777;        /* 핑크색 */
--accent-cyan: #06B6D4;         /* 강조 청록색 */
```

#### 그라디언트
```css
--gradient-hero: linear-gradient(135deg, #5B21B6 0%, #1E40AF 50%, #DB2777 100%);
--gradient-card: linear-gradient(135deg, rgba(91,33,182,0.1) 0%, rgba(30,64,175,0.1) 100%);
--gradient-text: linear-gradient(90deg, #06B6D4 0%, #DB2777 100%);
```

#### 시맨틱 컬러
- **Success (높은 수익성)**: #10B981 (Green)
- **Warning (중간 경쟁)**: #F59E0B (Amber)
- **Danger (높은 경쟁)**: #EF4444 (Red)
- **Info**: #3B82F6 (Blue)

#### 중립 컬러 (다크 테마)
```css
--bg-dark: #0F172A;            /* 배경 다크 */
--bg-card: rgba(30, 41, 59, 0.5); /* 카드 배경 (반투명) */
--text-primary: #F8FAFC;       /* 텍스트 기본 */
--text-secondary: #CBD5E1;     /* 텍스트 보조 */
--border-glass: rgba(255, 255, 255, 0.1); /* 글래스 테두리 */
```

#### TailwindCSS 설정 예시
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          purple: '#5B21B6',
          blue: '#1E40AF',
          pink: '#DB2777',
          cyan: '#06B6D4',
        },
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #5B21B6 0%, #1E40AF 50%, #DB2777 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(91,33,182,0.1) 0%, rgba(30,64,175,0.1) 100%)',
      },
    },
  },
}
```

## 🗄 데이터베이스 스키마 (Supabase)

### topics 테이블
```sql
id (uuid, primary key)
title (text) - 주제명
category (text) - 카테고리
content_type (text) - 'short' | 'long'
revenue_score (integer) - 1-10
competition_level (text) - 'low' | 'medium' | 'high'
avg_views (bigint) - 평균 조회수
estimated_cpm (numeric) - 예상 CPM
growth_rate (numeric) - 성장률 (%)
engagement_rate (numeric) - 참여율 (%)
trending_keywords (text[]) - 관련 키워드 배열
optimal_upload_time (text) - 최적 업로드 시간
video_length_min (integer) - 권장 최소 길이 (초)
video_length_max (integer) - 권장 최대 길이 (초)
sample_channels (jsonb) - 참고 채널 정보
metadata (jsonb) - 추가 데이터
is_active (boolean) - 활성 여부
created_at (timestamp)
updated_at (timestamp)
```

### trend_history 테이블
```sql
id (uuid, primary key)
topic_id (uuid, foreign key)
date (date)
upload_count (integer) - 해당 주제 업로드 수
avg_views (bigint)
top_video_views (bigint)
metadata (jsonb)
created_at (timestamp)
```

### categories 테이블
```sql
id (uuid, primary key)
name (text)
display_name (text)
avg_cpm (numeric)
icon (text) - 아이콘 이름
description (text)
created_at (timestamp)
```

### user_bookmarks 테이블 (선택사항)
```sql
id (uuid, primary key)
user_id (uuid, foreign key) - Supabase Auth 연동
topic_id (uuid, foreign key)
notes (text)
created_at (timestamp)
```

## 🚀 개발 단계

### Phase 1: MVP (4주)
**목표**: 기본 주제 추천 기능 + 반응형 디자인

**Week 1: 프로젝트 셋업 & 디자인 시스템**
- [ ] Next.js 14 + TailwindCSS + Supabase 프로젝트 초기화
- [ ] TailwindCSS 커스텀 설정 (컬러, 폰트, 브레이크포인트)
- [ ] 글래스모피즘 유틸리티 클래스 생성
- [ ] 공통 컴포넌트: Button, Card, Badge, Input
- [ ] 레이아웃 컴포넌트: Header, Footer (반응형)
- [ ] Pretendard 폰트 설정

**Week 2: 데이터 레이어 & API**
- [ ] YouTube Data API 연동 및 테스트
- [ ] Supabase 데이터베이스 스키마 생성
- [ ] 데이터 수집 스크립트 (Node.js)
- [ ] 초기 샘플 데이터 수집 (50+ 주제)
- [ ] 기본 주제 추천 알고리즘 구현
- [ ] API Routes 생성 (Next.js)

**Week 3: UI 개발 (반응형)**
- [ ] 랜딩 페이지:
  - Hero Section (3D 요소 제외, 그라디언트만)
  - Feature Highlight (3열 그리드)
  - Our Topics Section (카드 그리드)
  - Footer
- [ ] 주제 탐색 페이지:
  - 필터 바 (Desktop 사이드바, Mobile 토글)
  - 주제 카드 그리드 (1/2/4열 반응형)
- [ ] 반응형 테스트 (320px ~ 1920px)

**Week 4: 상세 페이지 & 배포**
- [ ] 주제 상세 페이지 (기본 정보)
- [ ] 데이터 시각화 (간단한 차트)
- [ ] 로딩 상태, 에러 핸들링
- [ ] SEO 최적화 (메타 태그)
- [ ] Lighthouse 성능 테스트 (Mobile/Desktop 90+ 목표)
- [ ] Vercel 배포 및 환경 변수 설정

### Phase 2: 고도화 (3주)
**목표**: 분석 기능 강화 + 프리미엄 디자인

**Week 1: 고급 시각화**
- [ ] Recharts 통합 (반응형 차트)
- [ ] 트렌드 그래프 (선 그래프, 영역 차트)
- [ ] 카테고리별 비교 막대 그래프
- [ ] 경쟁 분석 레이더 차트
- [ ] 차트 인터랙션 (툴팁, 확대/축소)
- [ ] Mobile 차트 최적화 (터치 제스처)

**Week 2: 3D & 애니메이션**
- [ ] Hero Section 3D 그래픽 (Three.js 또는 Spline)
- [ ] Framer Motion 통합
- [ ] 페이지 전환 애니메이션
- [ ] Scroll Reveal 애니메이션 (카드, 섹션)
- [ ] 호버 효과 고도화
- [ ] 로딩 스피너/스켈레톤 UI

**Week 3: 추가 기능 & 도구**
- [ ] 고급 필터링 (다중 선택, 범위 슬라이더)
- [ ] 검색 기능 (자동완성)
- [ ] 수익 계산기 도구 페이지
- [ ] 경쟁 분석기 도구 페이지
- [ ] 카드 슬라이더 (Swiper.js) - 뉴스 섹션
- [ ] 다크모드 지원 (선택사항)

### Phase 3: 자동화 (2주)
**목표**: 자동 업데이트 시스템

- [ ] 월간 자동 데이터 수집 Cron Job
- [ ] 주제 평가 및 업데이트 로직
- [ ] 과열 주제 필터링 자동화
- [ ] 업데이트 히스토리 페이지
- [ ] (선택) 이메일 알림 기능

### Phase 4: 추가 기능 (진행 중)
- [ ] 사용자 인증 및 북마크 기능
- [ ] 경쟁 분석기 도구
- [ ] 추가 API 연동 (Google Trends 등)
- [ ] 다국어 지원 (영어)
- [ ] SEO 최적화
- [ ] 블로그/가이드 섹션

## 📅 자동 업데이트 상세 로직

### 매월 1일 실행 프로세스

#### 1. 데이터 수집 (Day 1, 2:00 AM)
```
1. YouTube Data API로 카테고리별 인기 영상 수집 (최근 30일)
2. 각 주제별 업로드 수, 평균 조회수, 참여율 계산
3. 신규 트렌드 키워드 발굴 (전월 대비 급성장 키워드)
4. 기존 주제의 최신 데이터 업데이트
```

#### 2. 분석 및 평가 (2:30 AM)
```
1. 각 주제의 수익성 점수 재계산
2. 경쟁 강도 재평가
3. 과열 주제 식별 및 마킹
4. 새로운 추천 주제 후보 생성 (최소 5개)
```

#### 3. 필터링 및 선정 (3:00 AM)
```
1. 과열 주제 제외
2. 중복 주제 통합
3. 수익성 점수 7점 이상만 선정
4. 카테고리별 밸런스 조정
5. 최종 신규 주제 3-7개 확정
```

#### 4. 데이터베이스 업데이트 (3:30 AM)
```
1. 신규 주제 topics 테이블에 추가
2. 기존 주제 updated_at, 점수 업데이트
3. 과열 주제는 is_active = false 처리
4. trend_history 테이블에 히스토리 기록
```

#### 5. 알림 발송 (4:00 AM, 선택사항)
```
1. 업데이트 요약 생성
2. 구독자에게 이메일 발송
3. 사이트 내 "NEW" 배지 활성화
```

### Cron Job 설정 (Vercel)
```javascript
// vercel.json
{
  "crons": [{
    "path": "/api/cron/update-topics",
    "schedule": "0 2 1 * *" // 매월 1일 오전 2시
  }]
}
```

## 📊 성공 지표 (KPI)

### 제품 지표
- 월간 활성 사용자 (MAU)
- 페이지뷰 수
- 평균 세션 시간
- 주제 상세 페이지 조회율

### 데이터 품질 지표
- 추천 주제의 평균 수익성 점수
- 사용자가 실제 선택한 주제의 성공률 (추적 가능 시)
- 과열 주제 필터링 정확도

### 기술 지표
- API 호출 성공률 > 99%
- 페이지 로딩 속도 < 2초
- 월간 데이터 업데이트 성공률 100%

## ⚠️ 리스크 및 제약사항

### API 할당량 제한
- **문제**: YouTube Data API 일일 10,000 units 제한
- **해결**: 
  - 데이터 캐싱 (Supabase에 저장, 재사용)
  - 필요 시 할당량 증가 신청
  - 여러 API 키 로테이션

### 데이터 정확도
- **문제**: YouTube는 정확한 수익 데이터 미제공
- **해결**: CPM은 추정치임을 명시, 업계 평균값 사용

### 경쟁사 대응
- **유사 서비스**: VidIQ, TubeBuddy, Social Blade
- **차별화**: 
  - 한국 시장 특화
  - 무료 제공 (광고 또는 프리미엄 모델)
  - 숏폼/롱폼 명확한 구분
  - 자동 업데이트

### 법적 고려사항
- YouTube 서비스 약관 준수
- 저작권 침해 주의 (썸네일 사용 시)
- 개인정보 처리 (사용자 데이터 수집 시)

## 💰 수익화 방안 (선택사항)

1. **광고**: Google AdSense
2. **프리미엄 플랜**: 
   - 무제한 경쟁 분석
   - 개인화 추천
   - API 접근
3. **제휴 마케팅**: 크리에이터 도구 제휴 링크

## 📚 참고 자료

### API 문서
- [YouTube Data API v3](https://developers.google.com/youtube/v3)
- [YouTube Analytics API](https://developers.google.com/youtube/analytics)
- [Supabase Documentation](https://supabase.com/docs)

### 데이터 소스
- [YouTube Creator Academy](https://creatoracademy.youtube.com/)
- [Think with Google](https://www.thinkwithgoogle.com/)

### 벤치마크
- VidIQ: vidiq.com
- TubeBuddy: tubebuddy.com
- Social Blade: socialblade.com

---

## 📝 다음 단계

1. **API 키 발급**: YouTube Data API v3 키 생성
2. **프로젝트 초기화**: React + Supabase 셋업
3. **데이터 수집 POC**: 샘플 데이터로 알고리즘 검증
4. **MVP 개발 시작**: Phase 1 작업 착수

---

## ✅ 반응형 개발 체크리스트

### 전체 페이지 공통
- [ ] 320px (iPhone SE)에서 정상 작동
- [ ] 768px (iPad)에서 레이아웃 전환 확인
- [ ] 1024px (Desktop)에서 최적 레이아웃
- [ ] 1920px+ (대형 모니터)에서 최대 너비 제한
- [ ] 가로/세로 모드 모두 지원 (Tablet)
- [ ] 터치 타겟 최소 44x44px
- [ ] 폰트 크기 반응형 (clamp 또는 미디어 쿼리)

### 네비게이션
- [ ] Desktop: 풀 메뉴 바 표시
- [ ] Mobile: 햄버거 메뉴 + 슬라이드 패널
- [ ] 스크롤 시 헤더 고정 (position: sticky)
- [ ] Mobile에서 메뉴 열림 시 body 스크롤 방지

### Hero Section
- [ ] Desktop: 텍스트+비주얼 가로 배치
- [ ] Mobile: 세로 배치, 3D 요소 단순화
- [ ] 배경 그라디언트 모든 화면에서 자연스럽게
- [ ] CTA 버튼 Mobile에서 전체 너비 또는 세로 배치

### 카드 그리드
- [ ] Mobile: 1열 (100% 너비)
- [ ] Tablet: 2열 (gap 조정)
- [ ] Desktop: 3-4열
- [ ] 카드 높이 통일 (min-height)
- [ ] 이미지 aspect-ratio 유지

### 차트 & 그래프
- [ ] Desktop: 풀 사이즈 표시
- [ ] Mobile: 가로 스크롤 또는 단순화
- [ ] 터치 제스처 지원 (핀치 줌)
- [ ] 범례 위치 조정 (Desktop: 우측, Mobile: 하단)

### 테이블
- [ ] Desktop: 전체 테이블 표시
- [ ] Mobile: 가로 스크롤 또는 카드 뷰로 전환
- [ ] Sticky 헤더 (가로 스크롤 시)

### 폼 & 인풋
- [ ] 인풋 필드 Mobile에서 충분한 크기 (min-height: 44px)
- [ ] 키보드 팝업 시 레이아웃 유지
- [ ] 자동완성 드롭다운 화면 크기 맞춤
- [ ] 에러 메시지 말줄임 없이 표시

### 이미지 & 미디어
- [ ] 반응형 이미지 (srcset, sizes)
- [ ] 레이지 로딩 (loading="lazy")
- [ ] WebP + fallback (picture 태그)
- [ ] 3D 요소 Mobile에서 성능 확인

### 성능
- [ ] Lighthouse Mobile Score > 90
- [ ] Lighthouse Desktop Score > 95
- [ ] First Contentful Paint < 1.5s (Mobile)
- [ ] Cumulative Layout Shift < 0.1
- [ ] 번들 사이즈 최적화 (코드 스플리팅)

### 테스트 디바이스
- [ ] iPhone SE (375px)
- [ ] iPhone 14 Pro (393px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] MacBook (1440px)
- [ ] Desktop (1920px)

### 브라우저 호환성
- [ ] Chrome (최신 2버전)
- [ ] Safari (iOS 15+)
- [ ] Firefox (최신 2버전)
- [ ] Edge (최신 2버전)
- [ ] Samsung Internet (Android)

---

## 📦 필수 패키지 목록

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.4.0",
    "@supabase/supabase-js": "^2.38.0",
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^4.4.0",
    "framer-motion": "^10.16.0",
    "recharts": "^2.10.0",
    "swiper": "^11.0.0",
    "lucide-react": "^0.294.0",
    "react-intersection-observer": "^9.5.0",
    "@react-three/fiber": "^8.15.0",
    "three": "^0.159.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/three": "^0.159.0",
    "typescript": "^5",
    "autoprefixer": "^10",
    "postcss": "^8",
    "eslint": "^8",
    "prettier": "^3"
  }
}
```

---

**문서 버전**: 1.1  
**최종 수정일**: 2025-10-03  
**작성자**: AI Assistant  
**변경사항**: 레퍼런스 디자인 기반 UI/UX 상세화, 반응형 요구사항 추가

