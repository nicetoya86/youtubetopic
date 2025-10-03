/**
 * YouTube Data API를 사용하여 트렌드 데이터를 수집하는 스크립트
 * 
 * 실행 방법: npx tsx scripts/fetch-youtube-data.ts
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

// 환경 변수 로드
loadEnvFile()

interface VideoData {
  id: string
  title: string
  channelTitle: string
  categoryId: string
  viewCount: number
  likeCount: number
  commentCount: number
  publishedAt: string
  duration: string
}

interface CategoryData {
  id: string
  name: string
  avgViews: number
  videoCount: number
  avgCPM: number
}

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || ''
const BASE_URL = 'https://www.googleapis.com/youtube/v3'

// YouTube 카테고리 ID 매핑
const CATEGORY_IDS = {
  'gaming': '20',
  'music': '10',
  'entertainment': '24',
  'education': '27',
  'howto': '26',
  'people': '22',
  'news': '25',
  'film': '1',
  'autos': '2',
  'sports': '17',
  'travel': '19',
  'tech': '28',
}

/**
 * 인기 영상 목록 가져오기
 */
async function fetchPopularVideos(
  regionCode: string = 'KR',
  maxResults: number = 50
): Promise<VideoData[]> {
  const url = `${BASE_URL}/videos?part=snippet,statistics,contentDetails&chart=mostPopular&regionCode=${regionCode}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
  
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
      channelTitle: item.snippet.channelTitle,
      categoryId: item.snippet.categoryId,
      viewCount: parseInt(item.statistics.viewCount || '0'),
      likeCount: parseInt(item.statistics.likeCount || '0'),
      commentCount: parseInt(item.statistics.commentCount || '0'),
      publishedAt: item.snippet.publishedAt,
      duration: item.contentDetails.duration,
    }))
  } catch (error) {
    console.error('❌ 데이터 가져오기 실패:', error)
    return []
  }
}

/**
 * 특정 키워드로 영상 검색
 */
async function searchVideos(
  keyword: string,
  maxResults: number = 20
): Promise<any[]> {
  const url = `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(keyword)}&type=video&maxResults=${maxResults}&order=viewCount&key=${YOUTUBE_API_KEY}`
  
  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data.error) {
      console.error('❌ 검색 에러:', data.error.message)
      return []
    }

    return data.items
  } catch (error) {
    console.error('❌ 검색 실패:', error)
    return []
  }
}

/**
 * 카테고리별 통계 분석
 */
function analyzeCategoryStats(videos: VideoData[]): CategoryData[] {
  const categoryMap: { [key: string]: VideoData[] } = {}

  // 카테고리별로 그룹화
  videos.forEach(video => {
    if (!categoryMap[video.categoryId]) {
      categoryMap[video.categoryId] = []
    }
    categoryMap[video.categoryId].push(video)
  })

  // 카테고리별 평균 계산
  return Object.entries(categoryMap).map(([categoryId, vids]) => {
    const avgViews = vids.reduce((sum, v) => sum + v.viewCount, 0) / vids.length
    const videoCount = vids.length

    // CPM 추정 (카테고리별 대략적인 값)
    const cpmEstimates: { [key: string]: number } = {
      '20': 4,  // 게임
      '10': 3,  // 음악
      '24': 3,  // 엔터테인먼트
      '27': 12, // 교육
      '26': 8,  // 하우투
      '28': 10, // 테크
    }

    return {
      id: categoryId,
      name: getCategoryName(categoryId),
      avgViews: Math.round(avgViews),
      videoCount,
      avgCPM: cpmEstimates[categoryId] || 5,
    }
  })
}

/**
 * 카테고리 ID를 이름으로 변환
 */
function getCategoryName(categoryId: string): string {
  const names: { [key: string]: string } = {
    '1': '영화/애니메이션',
    '2': '자동차',
    '10': '음악',
    '17': '스포츠',
    '19': '여행/이벤트',
    '20': '게임',
    '22': '인물/블로그',
    '23': '코미디',
    '24': '엔터테인먼트',
    '25': '뉴스/정치',
    '26': '하우투/스타일',
    '27': '교육',
    '28': '과학/기술',
  }
  return names[categoryId] || `카테고리 ${categoryId}`
}

/**
 * 숏폼 vs 롱폼 분류
 */
function classifyByDuration(videos: VideoData[]): {
  shorts: VideoData[]
  long: VideoData[]
} {
  const shorts: VideoData[] = []
  const long: VideoData[] = []

  videos.forEach(video => {
    // ISO 8601 duration 파싱 (예: PT1M30S = 1분 30초)
    const duration = parseDuration(video.duration)
    
    if (duration <= 60) {
      shorts.push(video)
    } else {
      long.push(video)
    }
  })

  return { shorts, long }
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
 * 메인 실행 함수
 */
async function main() {
  console.log('🚀 YouTube 데이터 수집 시작...\n')

  if (!YOUTUBE_API_KEY) {
    console.error('❌ YOUTUBE_API_KEY 환경 변수가 설정되지 않았습니다.')
    console.log('📝 .env.local 파일에 YOUTUBE_API_KEY를 추가해주세요.\n')
    process.exit(1)
  }

  // 1. 인기 영상 데이터 수집
  console.log('📊 인기 영상 데이터 수집 중...')
  const videos = await fetchPopularVideos('KR', 50)
  console.log(`✅ ${videos.length}개 영상 데이터 수집 완료\n`)

  if (videos.length === 0) {
    console.error('❌ 데이터를 수집하지 못했습니다. API 키를 확인해주세요.')
    process.exit(1)
  }

  // 2. 카테고리별 분석
  console.log('📈 카테고리별 분석 중...')
  const categoryStats = analyzeCategoryStats(videos)
  console.log('✅ 분석 완료\n')

  console.log('📋 카테고리별 통계:')
  categoryStats.forEach(cat => {
    console.log(`  - ${cat.name}: 평균 ${(cat.avgViews / 1000).toFixed(0)}K 조회수, CPM $${cat.avgCPM}`)
  })
  console.log('')

  // 3. 숏폼/롱폼 분류
  console.log('⏱️  숏폼/롱폼 분류 중...')
  const { shorts, long } = classifyByDuration(videos)
  console.log(`✅ 숏폼: ${shorts.length}개, 롱폼: ${long.length}개\n`)

  // 4. 추천 주제 생성 (예시)
  console.log('💡 추천 주제 생성 중...')
  const recommendedKeywords = [
    '재테크', 'AI 활용법', '영어 공부', '운동 루틴', '요리 레시피',
    '프로그래밍', '부동산 투자', '주식 투자', '다이어트', '독서'
  ]

  for (const keyword of recommendedKeywords.slice(0, 3)) {
    console.log(`  🔍 "${keyword}" 검색 중...`)
    const results = await searchVideos(keyword, 5)
    console.log(`     → ${results.length}개 결과 발견`)
    
    // API 호출 제한을 위한 딜레이
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  console.log('\n✅ 데이터 수집 완료!')
  console.log('\n📝 다음 단계:')
  console.log('  1. 수집된 데이터를 Supabase에 저장')
  console.log('  2. 주제 추천 알고리즘 적용')
  console.log('  3. 매월 자동 업데이트 스케줄링')
}

// 스크립트 실행
if (require.main === module) {
  main().catch(console.error)
}

export { fetchPopularVideos, searchVideos, analyzeCategoryStats }

