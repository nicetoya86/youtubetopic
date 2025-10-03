/**
 * YouTubeTopic - Supabase 데이터베이스 초기 설정 스크립트
 * 
 * 실행 방법: npm run db:setup
 */

import { supabase } from '../lib/supabase'

const sampleTopics = [
  // 숏폼 주제
  {
    title: '5분 재테크 팁',
    category: '금융/투자',
    content_type: 'short' as const,
    revenue_score: 9,
    competition_level: 'low' as const,
    avg_views: 150000,
    estimated_cpm: 15.00,
    trending_keywords: ['재테크', '투자', '절약', '돈모으기'],
    video_length_min: 30,
    video_length_max: 60,
    is_active: true,
  },
  {
    title: 'AI 도구 활용법',
    category: '테크',
    content_type: 'short' as const,
    revenue_score: 8,
    competition_level: 'low' as const,
    avg_views: 120000,
    estimated_cpm: 12.00,
    trending_keywords: ['AI', '인공지능', '생산성', '도구'],
    video_length_min: 40,
    video_length_max: 60,
    is_active: true,
  },
  {
    title: '1분 요리 레시피',
    category: '요리',
    content_type: 'short' as const,
    revenue_score: 7,
    competition_level: 'medium' as const,
    avg_views: 200000,
    estimated_cpm: 6.00,
    trending_keywords: ['요리', '레시피', '간단요리', '1분요리'],
    video_length_min: 45,
    video_length_max: 60,
    is_active: true,
  },
  
  // 롱폼 주제
  {
    title: '부동산 투자 완벽 가이드',
    category: '금융/투자',
    content_type: 'long' as const,
    revenue_score: 10,
    competition_level: 'low' as const,
    avg_views: 80000,
    estimated_cpm: 18.00,
    trending_keywords: ['부동산', '투자', '재테크', '자산관리'],
    video_length_min: 900,
    video_length_max: 1500,
    is_active: true,
  },
  {
    title: '프로그래밍 강의 시리즈',
    category: '교육',
    content_type: 'long' as const,
    revenue_score: 9,
    competition_level: 'medium' as const,
    avg_views: 100000,
    estimated_cpm: 14.00,
    trending_keywords: ['코딩', '프로그래밍', '개발', '교육'],
    video_length_min: 1200,
    video_length_max: 2400,
    is_active: true,
  },
  {
    title: '제품 리뷰 & 언박싱',
    category: '테크/리뷰',
    content_type: 'long' as const,
    revenue_score: 8,
    competition_level: 'medium' as const,
    avg_views: 150000,
    estimated_cpm: 9.00,
    trending_keywords: ['리뷰', '언박싱', '제품리뷰', '가젯'],
    video_length_min: 600,
    video_length_max: 900,
    is_active: true,
  },
]

const sampleCategories = [
  { name: 'finance', display_name: '금융/투자', avg_cpm: 15.00, icon: 'DollarSign', description: '재테크, 투자 관련 컨텐츠' },
  { name: 'education', display_name: '교육/강의', avg_cpm: 11.50, icon: 'BookOpen', description: '교육 및 강의 컨텐츠' },
  { name: 'tech', display_name: '테크/리뷰', avg_cpm: 9.00, icon: 'Cpu', description: '기술 리뷰 및 가이드' },
  { name: 'health', display_name: '건강/피트니스', avg_cpm: 7.50, icon: 'Heart', description: '운동 및 건강 관련' },
  { name: 'cooking', display_name: '요리/레시피', avg_cpm: 6.00, icon: 'ChefHat', description: '요리 레시피' },
  { name: 'gaming', display_name: '게임', avg_cpm: 4.00, icon: 'Gamepad2', description: '게임 컨텐츠' },
  { name: 'entertainment', display_name: '엔터테인먼트', avg_cpm: 3.50, icon: 'Sparkles', description: '예능 및 엔터테인먼트' },
]

async function main() {
  console.log('🚀 Supabase 데이터베이스 초기 설정 시작...\n')

  // 1. 카테고리 데이터 삽입
  console.log('📁 카테고리 데이터 삽입 중...')
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .insert(sampleCategories)
    .select()

  if (catError) {
    if (catError.code === '23505') {
      console.log('⚠️  카테고리가 이미 존재합니다. 건너뜁니다.')
    } else {
      console.error('❌ 카테고리 삽입 실패:', catError.message)
      return
    }
  } else {
    console.log(`✅ ${categories?.length || 0}개 카테고리 삽입 완료\n`)
  }

  // 2. 주제 데이터 삽입
  console.log('📝 주제 데이터 삽입 중...')
  const { data: topics, error: topicError } = await supabase
    .from('topics')
    .insert(sampleTopics)
    .select()

  if (topicError) {
    console.error('❌ 주제 삽입 실패:', topicError.message)
    return
  }

  console.log(`✅ ${topics?.length || 0}개 주제 삽입 완료\n`)

  // 3. 결과 확인
  const { count: shortCount } = await supabase
    .from('topics')
    .select('*', { count: 'exact', head: true })
    .eq('content_type', 'short')

  const { count: longCount } = await supabase
    .from('topics')
    .select('*', { count: 'exact', head: true })
    .eq('content_type', 'long')

  console.log('📊 데이터베이스 현황:')
  console.log(`  - 총 카테고리: ${categories?.length || 0}개`)
  console.log(`  - 숏폼 주제: ${shortCount || 0}개`)
  console.log(`  - 롱폼 주제: ${longCount || 0}개`)
  console.log(`  - 총 주제: ${(shortCount || 0) + (longCount || 0)}개\n`)

  console.log('✅ 데이터베이스 초기 설정 완료!')
  console.log('\n📝 다음 단계:')
  console.log('  1. 웹사이트에서 데이터 확인 (npm run dev)')
  console.log('  2. YouTube API로 실제 데이터 수집 (npm run fetch-data)')
  console.log('  3. Vercel에 배포')
}

main().catch(console.error)

