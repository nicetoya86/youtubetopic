# YouTubeTopic 🎥

데이터로 찾는 수익형 컨텐츠. AI가 분석한 유튜브 트렌드로 숏폼과 롱폼 주제를 추천받으세요.

## 📋 프로젝트 소개

YouTubeTopic은 유튜브 크리에이터를 위한 데이터 기반 컨텐츠 주제 추천 플랫폼입니다. YouTube Data API를 활용하여 실시간으로 트렌드를 분석하고, 수익성이 높고 경쟁이 적은 주제를 추천합니다.

### 주요 기능

- ✅ **숏폼/롱폼 맞춤 추천**: 컨텐츠 형식별 최적화된 주제 제공
- 📊 **실시간 데이터 분석**: YouTube API 기반 정확한 통계
- 💰 **수익성 분석**: CPM, 조회수, 참여율 종합 평가
- 🎯 **경쟁 강도 측정**: 과열되지 않은 블루오션 발굴
- 🔄 **매월 자동 업데이트**: 최신 트렌드 반영
- 📱 **완전 반응형**: 모바일/태블릿/데스크톱 최적화

## 🛠 기술 스택

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: TailwindCSS 3.4
- **UI Components**: Custom (Glassmorphism)
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **API**: YouTube Data API v3
- **Hosting**: Vercel

## 🚀 시작하기

### 1. 저장소 클론

\`\`\`bash
git clone <repository-url>
cd youtubetopic
\`\`\`

### 2. 패키지 설치

\`\`\`bash
npm install
\`\`\`

### 3. 환경 변수 설정

\`.env.example\` 파일을 복사하여 \`.env.local\` 파일을 생성하고 필요한 값을 입력하세요.

\`\`\`bash
cp .env.example .env.local
\`\`\`

#### 필수 환경 변수:

- \`NEXT_PUBLIC_SUPABASE_URL\`: Supabase 프로젝트 URL
- \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`: Supabase Anon Key
- \`YOUTUBE_API_KEY\`: YouTube Data API v3 키

### 4. 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📦 빌드 및 배포

### 프로덕션 빌드

\`\`\`bash
npm run build
npm run start
\`\`\`

### Vercel 배포

1. Vercel 계정에 로그인
2. 프로젝트를 Import
3. 환경 변수 설정
4. 배포 완료!

## 🔑 API 키 발급 가이드

### YouTube Data API v3

1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. 새 프로젝트 생성
3. "YouTube Data API v3" 검색 후 활성화
4. "사용자 인증 정보" → "API 키 만들기"
5. API 키 복사 및 환경 변수에 추가

**할당량**: 일일 10,000 units (무료)

### Supabase 설정

1. [Supabase](https://supabase.com) 계정 생성
2. 새 프로젝트 생성
3. Settings → API에서 URL과 anon key 복사
4. 환경 변수에 추가

## 📁 프로젝트 구조

\`\`\`
youtubetopic/
├── app/                    # Next.js App Router
│   ├── globals.css        # 글로벌 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── components/            # React 컴포넌트
│   ├── ui/               # 공통 UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Badge.tsx
│   ├── layout/           # 레이아웃 컴포넌트
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── sections/         # 페이지 섹션
│       ├── HeroSection.tsx
│       ├── FeatureSection.tsx
│       ├── TopicsSection.tsx
│       └── CTASection.tsx
├── lib/                  # 유틸리티 함수
│   └── utils.ts
├── public/               # 정적 파일
├── PRD.md               # 제품 요구사항 문서
└── package.json
\`\`\`

## 🎨 디자인 시스템

### 컬러 팔레트

- **Primary Purple**: #5B21B6
- **Primary Blue**: #1E40AF
- **Primary Pink**: #DB2777
- **Accent Cyan**: #06B6D4

### 반응형 브레이크포인트

- Mobile: 320px ~ 767px
- Tablet: 768px ~ 1023px
- Desktop: 1024px+

## 📝 라이선스

이 프로젝트는 개인 학습 및 포트폴리오 목적으로 제작되었습니다.

## 🤝 기여

이슈와 PR은 언제나 환영합니다!

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

**Made with ❤️ using Next.js and YouTube Data API**

