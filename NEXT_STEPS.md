# 🎯 다음 단계: 실제 데이터 연동

## ✅ 완료된 작업
- [x] 프로젝트 개발 완료
- [x] GitHub 푸시 완료
- [x] Vercel 배포 완료
- [x] 배포 URL: https://youtubetopic.vercel.app

---

## 📊 Step 1: API 키 발급 (10분)

### 1-1. YouTube Data API v3 키 발급

**목적**: 실제 유튜브 트렌드 데이터 수집

**발급 방법**:

1. **Google Cloud Console 접속**
   - 👉 https://console.cloud.google.com

2. **새 프로젝트 생성**
   - 상단 프로젝트 선택 → "새 프로젝트"
   - 프로젝트 이름: `youtubetopic`
   - "만들기" 클릭

3. **YouTube Data API v3 활성화**
   - 검색창에 "YouTube Data API v3" 입력
   - API 선택 후 "사용 설정" 클릭

4. **API 키 생성**
   - 왼쪽 메뉴 → "사용자 인증 정보"
   - "+ 사용자 인증 정보 만들기" → "API 키" 선택
   - API 키 복사 (예: AIzaSyD...)

**할당량**: 일일 10,000 units (무료)

---

### 1-2. Supabase 프로젝트 생성

**목적**: 데이터베이스로 주제 저장

**생성 방법**:

1. **Supabase 접속**
   - 👉 https://supabase.com
   - GitHub 계정으로 로그인

2. **새 프로젝트 생성**
   - "New Project" 클릭
   - Organization: Personal (또는 새로 만들기)
   - 입력:
     ```
     Name: youtubetopic
     Database Password: 강력한비밀번호입력
     Region: Northeast Asia (Seoul)
     ```
   - "Create new project" 클릭 (2-3분 소요)

3. **API 정보 복사**
   - 왼쪽 메뉴 → Settings → API
   - 복사할 것:
     - **Project URL**: https://xxx.supabase.co
     - **anon public key**: eyJhbG...

---

## 🗄️ Step 2: 데이터베이스 설정 (5분)

### 2-1. Supabase SQL 실행

1. **SQL Editor 접속**
   - Supabase 대시보드 → 왼쪽 메뉴 "SQL Editor"

2. **스키마 생성**
   - "New query" 클릭
   - `scripts/database-schema.sql` 파일 내용 전체 복사
   - 붙여넣기 후 "Run" 클릭

**결과**: topics, categories, trend_history 테이블 생성 완료!

---

## 🔧 Step 3: 환경 변수 설정 (3분)

### 3-1. 로컬 환경 변수

프로젝트 루트에 `.env.local` 파일 생성:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=여기에_supabase_url_붙여넣기
NEXT_PUBLIC_SUPABASE_ANON_KEY=여기에_anon_key_붙여넣기

# YouTube Data API
YOUTUBE_API_KEY=여기에_youtube_api_key_붙여넣기
```

### 3-2. Vercel 환경 변수

1. **Vercel 대시보드 접속**
   - 👉 https://vercel.com/dashboard
   - `youtubetopic` 프로젝트 선택

2. **Settings → Environment Variables**

3. **변수 추가** (3개):
   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: [복사한 Supabase URL]
   Environments: ✅ Production, Preview, Development
   ```

   ```
   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: [복사한 Anon Key]
   Environments: ✅ Production, Preview, Development
   ```

   ```
   Name: YOUTUBE_API_KEY
   Value: [복사한 YouTube API Key]
   Environments: ✅ Production, Preview, Development
   ```

4. **저장 후 재배포**
   - Deployments → 최신 배포 → ⋯ (점3개) → "Redeploy"

---

## 📥 Step 4: 샘플 데이터 삽입 (2분)

```bash
# 개발 서버가 실행 중이면 중지 (Ctrl+C)

# tsx 설치 (아직 안했다면)
npm install tsx --save-dev

# 샘플 데이터 삽입
npm run db:setup
```

**결과**: 6개 카테고리 + 6개 주제가 데이터베이스에 저장됨!

---

## 🔄 Step 5: 실제 페이지에서 데이터 가져오기

### 5-1. 홈페이지 수정

`app/page.tsx`를 수정하여 Supabase에서 데이터 가져오기:

```typescript
// 추가할 내용은 별도로 안내드리겠습니다!
```

---

## 🎯 완료 후 확인사항

✅ **로컬 테스트**:
```bash
npm run dev
# http://localhost:3000 접속
# 실제 데이터가 표시되는지 확인
```

✅ **프로덕션 배포**:
```bash
git add .
git commit -m "Add Supabase data integration"
git push
# Vercel 자동 배포 (2-3분)
```

✅ **배포 사이트 확인**:
- https://youtubetopic.vercel.app
- 실제 데이터가 표시되는지 확인

---

## 🚀 Step 6: YouTube 실제 데이터 수집 (선택)

```bash
# YouTube API로 실제 트렌드 데이터 수집
npm run fetch-data
```

이 스크립트는:
- 한국 인기 영상 50개 수집
- 카테고리별 통계 분석
- 숏폼/롱폼 분류
- 추천 키워드 생성

---

## 📊 다음 고급 기능 (선택)

### 7-1. 자동 업데이트 (Vercel Cron)
매월 1일 자동으로 데이터 업데이트

### 7-2. 3D 애니메이션
Hero 섹션에 Three.js 추가

### 7-3. 차트 고도화
Recharts로 트렌드 그래프 추가

### 7-4. 사용자 인증
Supabase Auth로 북마크 기능

---

## 🆘 문제 해결

### YouTube API 할당량 초과
- 하루에 10,000 units 제한
- 다음 날 자동 리셋
- 필요시 할당량 증가 신청

### Supabase 연결 실패
- URL과 Key가 정확한지 확인
- 환경 변수 철자 확인
- 브라우저 콘솔에서 에러 메시지 확인

### 빌드 에러
```bash
# 캐시 삭제 후 재빌드
rm -rf .next
npm run build
```

---

## 📞 지원

문제가 생기면 GitHub Issues에 질문 남겨주세요!

---

**현재 위치**: Step 1 - API 키 발급 단계
**다음**: YouTube API 키를 발급받으면 알려주세요!

