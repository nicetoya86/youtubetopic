/**
 * YouTube API 데이터를 Supabase에 저장하는 스크립트
 * 
 * 실행 방법: npm run fetch-data
 */

import * as fs from 'fs'
import * as path from 'path'
import { createClient } from '@supabase/supabase-js'

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

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || ''
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
const BASE_URL = 'https://www.googleapis.com/youtube/v3'

interface VideoData {
  id: string
  title: string
  categoryId: string
  viewCount: number
  likeCount: number
  commentCount: number
  duration: string
  publishedAt: string
}

/**
 * 인기 영상 가져오기
 */
async function fetchPopularVideos(maxResults: number = 50): Promise<VideoData[]> {
  const url = `${BASE_URL}/videos?part=snippet,statistics,contentDetails&chart=mostPopular&regionCode=KR&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
  
  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data.error) {
      console.error('❌ YouTube API 에러:', data.error.message)
      return []
    }

    return data.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      categoryId: item.snippet.categoryId,
      viewCount: parseInt(item.statistics.viewCount || '0'),
      likeCount: parseInt(item.statistics.likeCount || '0'),
      commentCount: parseInt(item.statistics.commentCount || '0'),
      duration: item.contentDetails.duration,
      publishedAt: item.snippet.publishedAt,
    }))
  } catch (error) {
    console.error('❌ 데이터 가져오기 실패:', error)
    return []
  }
}

/**
 * ISO 8601 duration을 초로 변환
 */
function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0

  const hours = parseInt(match[1] || '0')
  const minutes = parseInt(match[2] || '0')
  const seconds = parseInt(match[3] || '0')

  return hours * 3600 + minutes * 60 + seconds
}

/**
 * 카테고리 ID를 한글 이름으로 변환
 */
function getCategoryName(categoryId: string): string {
  const names: { [key: string]: string } = {
    '1': 'entertainment',
    '2': 'autos',
    '10': 'music',
    '15': 'pets',
    '17': 'sports',
    '19': 'travel',
    '20': 'gaming',
    '22': 'people',
    '23': 'comedy',
    '24': 'entertainment',
    '25': 'news',
    '26': 'howto',
    '27': 'education',
    '28': 'technology',
  }
  return names[categoryId] || 'entertainment'
}

/**
 * 경쟁도 계산 (조회수 기반)
 */
function calculateCompetition(viewCount: number): 'low' | 'medium' | 'high' {
  if (viewCount < 50000) return 'low'
  if (viewCount < 200000) return 'medium'
  return 'high'
}

/**
 * 수익 점수 계산
 */
function calculateRevenueScore(viewCount: number, likeCount: number, cpm: number): number {
  const engagement = likeCount / viewCount
  const baseScore = (viewCount / 10000) * (cpm / 10)
  const engagementBonus = engagement * 100
  
  return Math.min(10, Math.max(1, baseScore + engagementBonus))
}

/**
 * CPM 추정
 */
function estimateCPM(categoryId: string): number {
  const cpmEstimates: { [key: string]: number } = {
    '1': 6,   // 영화
    '2': 8,   // 자동차
    '10': 4,  // 음악
    '15': 7,  // 반려동물
    '17': 5,  // 스포츠
    '19': 9,  // 여행
    '20': 4,  // 게임
    '22': 6,  // 인물
    '23': 5,  // 코미디
    '24': 5,  // 엔터테인먼트
    '25': 8,  // 뉴스
    '26': 10, // 하우투
    '27': 15, // 교육
    '28': 12, // 기술
  }
  return cpmEstimates[categoryId] || 6
}

/**
 * Supabase에 주제 저장
 */
async function saveTopicsToSupabase(videos: VideoData[]) {
  const topics = videos.map(video => {
    const durationSeconds = parseDuration(video.duration)
    const contentType = durationSeconds <= 60 ? 'short' : 'long'
    const category = getCategoryName(video.categoryId)
    const cpm = estimateCPM(video.categoryId)
    const revenueScore = calculateRevenueScore(video.viewCount, video.likeCount, cpm)
    
    // 제목에서 키워드 추출 (간단한 방법)
    const keywords = video.title
      .split(/[\s,.\-!?]+/)
      .filter(word => word.length > 2)
      .slice(0, 5)

    return {
      title: video.title.length > 100 ? video.title.substring(0, 97) + '...' : video.title,
      category,
      content_type: contentType,
      revenue_score: Math.round(revenueScore * 10) / 10,
      competition_level: calculateCompetition(video.viewCount),
      avg_views: video.viewCount,
      estimated_cpm: cpm,
      trending_keywords: keywords,
      video_length_min: contentType === 'short' ? 30 : 600,
      video_length_max: contentType === 'short' ? 60 : 1800,
      is_active: true,
    }
  })

  // 기존 활성 주제 수 확인
  const { count: beforeCount } = await supabase
    .from('topics')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  console.log(`📊 현재 활성 주제: ${beforeCount}개`)

  // 새 주제 저장
  const { data, error } = await supabase
    .from('topics')
    .insert(topics)
    .select()

  if (error) {
    console.error('❌ Supabase 저장 실패:', error.message)
    return 0
  }

  console.log(`✅ ${data?.length || 0}개 주제 저장 완료`)
  return data?.length || 0
}

/**
 * 메인 실행 함수
 */
async function main() {
  console.log('🚀 YouTube → Supabase 데이터 동기화 시작...\n')

  // 환경 변수 확인
  if (!YOUTUBE_API_KEY) {
    console.error('❌ YOUTUBE_API_KEY가 설정되지 않았습니다.')
    console.log('📝 .env.local 파일을 확인해주세요.\n')
    process.exit(1)
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Supabase 설정이 없습니다.')
    console.log('📝 .env.local 파일을 확인해주세요.\n')
    process.exit(1)
  }

  // 1. YouTube 데이터 수집
  console.log('📊 YouTube 인기 영상 수집 중...')
  const videos = await fetchPopularVideos(50)
  
  if (videos.length === 0) {
    console.error('❌ 데이터를 수집하지 못했습니다.')
    process.exit(1)
  }

  console.log(`✅ ${videos.length}개 영상 수집 완료`)

  // 숏폼/롱폼 분류
  const shorts = videos.filter(v => parseDuration(v.duration) <= 60)
  const longs = videos.filter(v => parseDuration(v.duration) > 60)
  console.log(`   - 숏폼: ${shorts.length}개`)
  console.log(`   - 롱폼: ${longs.length}개\n`)

  // 2. Supabase에 저장
  console.log('💾 Supabase에 저장 중...')
  const savedCount = await saveTopicsToSupabase(videos)

  // 3. 결과 확인
  const { count: afterCount } = await supabase
    .from('topics')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  console.log('\n✅ 동기화 완료!')
  console.log(`📈 총 활성 주제: ${afterCount}개 (+${savedCount}개 추가)`)
  console.log('\n🌐 사이트에서 확인하세요:')
  console.log('   - 메인: https://youtubetopic.vercel.app')
  console.log('   - 숏폼: https://youtubetopic.vercel.app/shorts')
  console.log('   - 롱폼: https://youtubetopic.vercel.app/long-form')
  console.log('   - 트렌드: https://youtubetopic.vercel.app/trends')
}

// 실행
main().catch(console.error)

