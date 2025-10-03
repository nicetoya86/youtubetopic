-- YouTubeTopic 데이터베이스 스키마
-- Supabase SQL Editor에 복사해서 실행하세요

-- 1. topics 테이블 생성
CREATE TABLE IF NOT EXISTS topics (
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

-- 2. categories 테이블 생성
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  avg_cpm NUMERIC(10,2),
  icon TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. trend_history 테이블 생성
CREATE TABLE IF NOT EXISTS trend_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  upload_count INTEGER,
  avg_views BIGINT,
  top_video_views BIGINT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_topics_category ON topics(category);
CREATE INDEX IF NOT EXISTS idx_topics_content_type ON topics(content_type);
CREATE INDEX IF NOT EXISTS idx_topics_is_active ON topics(is_active);
CREATE INDEX IF NOT EXISTS idx_trend_history_topic_id ON trend_history(topic_id);
CREATE INDEX IF NOT EXISTS idx_trend_history_date ON trend_history(date);

-- 5. updated_at 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_topics_updated_at ON topics;
CREATE TRIGGER update_topics_updated_at 
  BEFORE UPDATE ON topics
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- 6. 샘플 데이터 삽입 (선택사항)
INSERT INTO categories (name, display_name, avg_cpm, icon, description) VALUES
('finance', '금융/투자', 15.00, 'DollarSign', '재테크, 투자 관련 컨텐츠'),
('education', '교육/강의', 11.50, 'BookOpen', '교육 및 강의 컨텐츠'),
('tech', '테크/리뷰', 9.00, 'Cpu', '기술 리뷰 및 가이드'),
('health', '건강/피트니스', 7.50, 'Heart', '운동 및 건강 관련'),
('cooking', '요리/레시피', 6.00, 'ChefHat', '요리 레시피')
ON CONFLICT (name) DO NOTHING;

-- 완료!
SELECT 'Database schema created successfully!' as message;

