# 🚀 프로젝트 설정 가이드

## 1. 환경 변수 설정

### 필요한 API 키

#### 1.1 YouTube Data API v3 (필수)

**발급 방법:**

1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. 새 프로젝트 생성 (예: "youtubetopic")
3. 검색창에 "YouTube Data API v3" 입력 후 활성화
4. 좌측 메뉴 → "사용자 인증 정보" 클릭
5. "+ 사용자 인증 정보 만들기" → "API 키" 선택
6. API 키 복사

**할당량:** 일일 10,000 units (무료)

#### 1.2 Supabase 설정 (필수)

**프로젝트 생성:**

1. [Supabase](https://supabase.com) 접속 및 로그인
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - Name: youtubetopic
   - Database Password: 강력한 비밀번호 설정
   - Region: Northeast Asia (Seoul) 권장
4. "Create new project" 클릭 (1-2분 소요)

**API 정보 확인:**

1. 프로젝트 대시보드 → Settings → API
2. 다음 정보 복사:
   - `Project URL` → NEXT_PUBLIC_SUPABASE_URL
   - `anon public` 키 → NEXT_PUBLIC_SUPABASE_ANON_KEY

### 환경 변수 파일 생성

프로젝트 루트에 \`.env.local\` 파일 생성:

\`\`\`bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# YouTube Data API v3
YOUTUBE_API_KEY=your-youtube-api-key-here
\`\`\`

⚠️ **중요:** 
- \`.env.local\` 파일은 Git에 커밋하지 마세요 (이미 .gitignore에 포함됨)
- Vercel 배포 시 Environment Variables에 동일하게 추가해야 합니다

## 2. Supabase 데이터베이스 스키마 생성

Supabase Dashboard → SQL Editor에서 다음 쿼리 실행:

\`\`\`sql
-- topics 테이블 생성
CREATE TABLE topics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('short', 'long')),
  revenue_score INTEGER CHECK (revenue_score >= 1 AND revenue_score <= 10),
  competition_level TEXT CHECK (competition_level IN ('low', 'medium', 'high')),
  avg_views BIGINT,
  estimated_cpm NUMERIC(10,2),
  growth_rate NUMERIC(5,2),
  engagement_rate NUMERIC(5,2),
  trending_keywords TEXT[],
  optimal_upload_time TEXT,
  video_length_min INTEGER,
  video_length_max INTEGER,
  sample_channels JSONB,
  metadata JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- categories 테이블 생성
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  avg_cpm NUMERIC(10,2),
  icon TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- trend_history 테이블 생성
CREATE TABLE trend_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  upload_count INTEGER,
  avg_views BIGINT,
  top_video_views BIGINT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 인덱스 생성
CREATE INDEX idx_topics_category ON topics(category);
CREATE INDEX idx_topics_content_type ON topics(content_type);
CREATE INDEX idx_topics_is_active ON topics(is_active);
CREATE INDEX idx_trend_history_topic_id ON trend_history(topic_id);
CREATE INDEX idx_trend_history_date ON trend_history(date);

-- updated_at 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_topics_updated_at BEFORE UPDATE ON topics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
\`\`\`

### 샘플 데이터 삽입 (선택사항)

\`\`\`sql
-- 카테고리 데이터
INSERT INTO categories (name, display_name, avg_cpm, icon, description) VALUES
('finance', '금융/투자', 15.00, 'DollarSign', '재테크, 투자 관련 컨텐츠'),
('education', '교육/강의', 11.50, 'BookOpen', '교육 및 강의 컨텐츠'),
('tech', '테크/리뷰', 9.00, 'Cpu', '기술 리뷰 및 가이드'),
('health', '건강/피트니스', 7.50, 'Heart', '운동 및 건강 관련'),
('cooking', '요리/레시피', 6.00, 'ChefHat', '요리 레시피');

-- 샘플 주제 데이터
INSERT INTO topics (
  title, category, content_type, revenue_score, competition_level,
  avg_views, estimated_cpm, trending_keywords, video_length_min, video_length_max
) VALUES
('5분 재테크 팁', 'finance', 'short', 9, 'low', 150000, 15.00, 
 ARRAY['재테크', '투자', '절약'], 30, 60),
('프로그래밍 강의 시리즈', 'education', 'long', 9, 'medium', 100000, 12.00,
 ARRAY['코딩', '프로그래밍', '개발'], 1200, 2400);
\`\`\`

## 3. 패키지 설치 및 실행

\`\`\`bash
# 패키지 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
\`\`\`

## 4. Vercel 배포

### 4.1 GitHub에 푸시

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
\`\`\`

### 4.2 Vercel 배포

1. [Vercel](https://vercel.com) 로그인
2. "New Project" 클릭
3. GitHub 저장소 Import
4. Environment Variables 추가:
   - \`NEXT_PUBLIC_SUPABASE_URL\`
   - \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`
   - \`YOUTUBE_API_KEY\`
5. "Deploy" 클릭

## 5. 확인 사항

### 로컬 개발 환경

- [ ] Node.js 18+ 설치 확인 (\`node -v\`)
- [ ] \`.env.local\` 파일 생성 및 환경 변수 입력
- [ ] \`npm install\` 성공
- [ ] \`npm run dev\` 실행 후 http://localhost:3000 접속 가능
- [ ] 페이지가 정상적으로 렌더링됨

### Supabase

- [ ] 프로젝트 생성 완료
- [ ] 데이터베이스 스키마 생성 완료
- [ ] API URL 및 Key 복사 완료

### YouTube API

- [ ] Google Cloud Console 프로젝트 생성
- [ ] YouTube Data API v3 활성화
- [ ] API 키 발급 완료

### Vercel 배포 (선택)

- [ ] GitHub 저장소 연결
- [ ] Environment Variables 설정
- [ ] 배포 성공

## 6. 문제 해결

### 문제: "Module not found" 오류

**해결방법:**
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### 문제: Supabase 연결 실패

**확인사항:**
- \`.env.local\` 파일의 URL과 Key가 올바른지 확인
- Supabase 프로젝트가 활성화되어 있는지 확인
- 네트워크 연결 확인

### 문제: YouTube API 할당량 초과

**해결방법:**
- Google Cloud Console에서 할당량 증가 신청
- 데이터 캐싱으로 API 호출 최소화
- 여러 API 키 사용 (로테이션)

### 문제: 빌드 오류

**해결방법:**
\`\`\`bash
# 캐시 삭제
rm -rf .next

# 재빌드
npm run build
\`\`\`

## 7. 다음 단계

1. **데이터 수집 스크립트 작성**: YouTube API를 사용하여 실제 데이터 수집
2. **Cron Job 설정**: 매월 1일 자동 업데이트 (Vercel Cron)
3. **인증 추가**: Supabase Auth로 사용자 로그인 (선택)
4. **분석 도구 추가**: Google Analytics 또는 Vercel Analytics

## 📞 지원

문제가 발생하면 GitHub Issues에 질문을 남겨주세요.

---

**Happy Coding! 🚀**

