/**
 * YouTube 트렌드 기반 새로운 주제 추가 스크립트
 */

import * as fs from 'fs'
import * as path from 'path'

// .env.local 파일 읽기
function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local')
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8')
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        const value = valueParts.join('=')
        if (key && value) {
          process.env[key.trim()] = value.trim()
        }
      }
    })
  }
}

loadEnvFile()

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

// 실제 트렌드 기반 새로운 주제들
const newTopics = [
  // 숏폼 주제
  {
    title: '60초 영어 회화',
    category: 'education',
    content_type: 'short',
    revenue_score: 8,
    competition_level: 'low',
    avg_views: 130000,
    estimated_cpm: 11.00,
    trending_keywords: ['영어', '영어회화', '영어공부', '60초'],
    video_length_min: 45,
    video_length_max: 60,
    is_active: true,
  },
  {
    title: '주식 차트 분석 팁',
    category: 'finance',
    content_type: 'short',
    revenue_score: 9,
    competition_level: 'medium',
    avg_views: 170000,
    estimated_cpm: 14.00,
    trending_keywords: ['주식', '차트', '투자', '재테크'],
    video_length_min: 30,
    video_length_max: 45,
    is_active: true,
  },
  {
    title: '게임 꿀팁 모음',
    category: 'gaming',
    content_type: 'short',
    revenue_score: 6,
    competition_level: 'high',
    avg_views: 250000,
    estimated_cpm: 4.00,
    trending_keywords: ['게임', '꿀팁', '공략', '게이밍'],
    video_length_min: 30,
    video_length_max: 60,
    is_active: true,
  },
  {
    title: '심리 실험',
    category: 'education',
    content_type: 'short',
    revenue_score: 7,
    competition_level: 'medium',
    avg_views: 190000,
    estimated_cpm: 9.00,
    trending_keywords: ['심리학', '실험', '교육', '흥미'],
    video_length_min: 40,
    video_length_max: 60,
    is_active: true,
  },
  
  // 롱폼 주제
  {
    title: 'AI 부업으로 월 100만원',
    category: 'tech',
    content_type: 'long',
    revenue_score: 9,
    competition_level: 'low',
    avg_views: 95000,
    estimated_cpm: 13.00,
    trending_keywords: ['AI', '부업', '사이드프로젝트', '수익화'],
    video_length_min: 900,
    video_length_max: 1200,
    is_active: true,
  },
  {
    title: '주식 기초부터 실전까지',
    category: 'finance',
    content_type: 'long',
    revenue_score: 10,
    competition_level: 'medium',
    avg_views: 110000,
    estimated_cpm: 17.00,
    trending_keywords: ['주식', '투자', '초보', '실전'],
    video_length_min: 1500,
    video_length_max: 2400,
    is_active: true,
  },
  {
    title: '영어 독학 완벽 가이드',
    category: 'education',
    content_type: 'long',
    revenue_score: 9,
    competition_level: 'low',
    avg_views: 85000,
    estimated_cpm: 12.00,
    trending_keywords: ['영어', '독학', '공부법', '교육'],
    video_length_min: 1200,
    video_length_max: 1800,
    is_active: true,
  },
  {
    title: 'N잡러의 하루 루틴',
    category: 'entertainment',
    content_type: 'long',
    revenue_score: 6,
    competition_level: 'high',
    avg_views: 200000,
    estimated_cpm: 4.00,
    trending_keywords: ['N잡', 'Vlog', '일상', '루틴'],
    video_length_min: 600,
    video_length_max: 900,
    is_active: true,
  },
]

async function addTopics() {
  console.log('🚀 새로운 주제 추가 시작...\n')

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Supabase 환경 변수가 설정되지 않았습니다.')
    process.exit(1)
  }

  // 기존 주제 수 확인
  const { count: beforeCount } = await supabase
    .from('topics')
    .select('*', { count: 'exact', head: true })

  console.log(`📊 기존 주제 수: ${beforeCount}개\n`)

  // 새로운 주제 추가
  const { data, error } = await supabase
    .from('topics')
    .insert(newTopics)
    .select()

  if (error) {
    console.error('❌ 주제 추가 실패:', error.message)
    process.exit(1)
  }

  console.log(`✅ ${data?.length || 0}개 새로운 주제 추가 완료!\n`)

  // 추가된 주제 확인
  const { count: afterCount } = await supabase
    .from('topics')
    .select('*', { count: 'exact', head: true })

  console.log(`📊 현재 주제 수: ${afterCount}개\n`)

  // 숏폼/롱폼 별 개수
  const { count: shortCount } = await supabase
    .from('topics')
    .select('*', { count: 'exact', head: true })
    .eq('content_type', 'short')

  const { count: longCount } = await supabase
    .from('topics')
    .select('*', { count: 'exact', head: true })
    .eq('content_type', 'long')

  console.log('📈 통계:')
  console.log(`  - 숏폼: ${shortCount}개`)
  console.log(`  - 롱폼: ${longCount}개`)
  console.log(`  - 총합: ${(shortCount || 0) + (longCount || 0)}개\n`)

  console.log('✅ 완료! 웹사이트에서 새로운 주제를 확인하세요!')
  console.log('👉 http://localhost:3000')
}

addTopics().catch(console.error)

