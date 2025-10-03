-- YouTubeTopic - 키워드 검색 기능 데이터베이스 스키마
-- 작성일: 2025-10-03
-- Phase 4: 키워드 검색 & 분석 시스템

-- ============================================
-- 1. keyword_searches 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS keyword_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- 로그인 사용자 (선택)
  ip_address TEXT, -- 비로그인 사용자 추적용
  search_count INTEGER DEFAULT 1,
  result_data JSONB, -- 분석 결과 캐싱
  cache_expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '24 hours',
  is_blocked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_keyword_searches_keyword ON keyword_searches(keyword);
CREATE INDEX IF NOT EXISTS idx_keyword_searches_created_at ON keyword_searches(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_keyword_searches_search_count ON keyword_searches(search_count DESC);
CREATE INDEX IF NOT EXISTS idx_keyword_searches_ip_address ON keyword_searches(ip_address);
CREATE INDEX IF NOT EXISTS idx_keyword_searches_cache_expires ON keyword_searches(cache_expires_at);

-- 자동 updated_at 업데이트 트리거
CREATE OR REPLACE FUNCTION update_keyword_searches_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_keyword_searches_updated_at
  BEFORE UPDATE ON keyword_searches
  FOR EACH ROW
  EXECUTE FUNCTION update_keyword_searches_updated_at();

-- ============================================
-- 2. blocked_keywords 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS blocked_keywords (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword TEXT NOT NULL UNIQUE,
  reason TEXT,
  category TEXT CHECK (category IN ('adult', 'violence', 'illegal', 'copyright', 'spam')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_blocked_keywords_keyword ON blocked_keywords(keyword);
CREATE INDEX IF NOT EXISTS idx_blocked_keywords_category ON blocked_keywords(category);

-- ============================================
-- 3. popular_keywords 뷰
-- ============================================
CREATE OR REPLACE VIEW popular_keywords AS
SELECT 
  keyword,
  search_count,
  MAX(created_at) as last_searched_at
FROM keyword_searches
WHERE 
  is_blocked = false 
  AND created_at >= NOW() - INTERVAL '7 days'
GROUP BY keyword, search_count
ORDER BY search_count DESC
LIMIT 10;

-- ============================================
-- 4. 샘플 금지 키워드 데이터
-- ============================================
INSERT INTO blocked_keywords (keyword, reason, category) VALUES
-- 성인 콘텐츠
('성인', '성인 콘텐츠', 'adult'),
('19금', '성인 콘텐츠', 'adult'),
('야동', '성인 콘텐츠', 'adult'),
('포르노', '성인 콘텐츠', 'adult'),

-- 폭력/혐오
('폭력', '폭력 콘텐츠', 'violence'),
('살인', '폭력 콘텐츠', 'violence'),
('테러', '폭력 콘텐츠', 'violence'),

-- 불법 활동
('마약', '불법 활동', 'illegal'),
('도박', '불법 활동', 'illegal'),
('해킹', '불법 활동', 'illegal'),
('불법 다운로드', '불법 활동', 'illegal'),

-- 저작권
('영화 다운로드', '저작권 침해', 'copyright'),
('음악 무료 다운', '저작권 침해', 'copyright'),
('토렌트', '저작권 침해', 'copyright'),

-- 스팸
('조회수 늘리기', '스팸/사기', 'spam'),
('구독자 늘리기', '스팸/사기', 'spam'),
('무료 돈 버는 법', '스팸/사기', 'spam')
ON CONFLICT (keyword) DO NOTHING;

-- ============================================
-- 5. RLS (Row Level Security) 정책
-- ============================================

-- keyword_searches 테이블: 모두 읽기 가능
ALTER TABLE keyword_searches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read keyword searches"
  ON keyword_searches FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert keyword searches"
  ON keyword_searches FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own searches"
  ON keyword_searches FOR UPDATE
  USING (auth.uid() = user_id OR user_id IS NULL);

-- blocked_keywords 테이블: 모두 읽기만 가능
ALTER TABLE blocked_keywords ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read blocked keywords"
  ON blocked_keywords FOR SELECT
  USING (true);

-- ============================================
-- 6. 유틸리티 함수
-- ============================================

-- 캐시 만료된 검색 결과 정리 함수
CREATE OR REPLACE FUNCTION cleanup_expired_keyword_cache()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM keyword_searches
  WHERE cache_expires_at < NOW() AND search_count = 1;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- 검색 횟수 증가 함수
CREATE OR REPLACE FUNCTION increment_keyword_search_count(
  p_keyword TEXT,
  p_user_id UUID DEFAULT NULL,
  p_ip_address TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_search_id UUID;
BEGIN
  -- 기존 검색 기록이 있으면 카운트 증가
  UPDATE keyword_searches
  SET search_count = search_count + 1,
      updated_at = NOW()
  WHERE keyword = p_keyword
  RETURNING id INTO v_search_id;
  
  -- 없으면 새로 생성
  IF v_search_id IS NULL THEN
    INSERT INTO keyword_searches (keyword, user_id, ip_address)
    VALUES (p_keyword, p_user_id, p_ip_address)
    RETURNING id INTO v_search_id;
  END IF;
  
  RETURN v_search_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 완료
-- ============================================
-- 키워드 검색 기능 스키마 생성 완료
-- 
-- 다음 단계:
-- 1. Supabase Dashboard에서 SQL Editor로 이동
-- 2. 이 파일의 내용을 복사하여 실행
-- 3. 테이블, 인덱스, 함수가 정상 생성되었는지 확인

