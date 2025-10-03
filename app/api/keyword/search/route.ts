import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { isBlockedKeyword } from '@/lib/blocked-keywords'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || ''
const BASE_URL = 'https://www.googleapis.com/youtube/v3'

/**
 * POST /api/keyword/search
 * 키워드 분석 (메인 API)
 */
export async function POST(request: NextRequest) {
  try {
    const { keyword } = await request.json()
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    // 입력 검증
    if (!keyword || typeof keyword !== 'string') {
      return NextResponse.json(
        { error: '키워드를 입력해주세요.' },
        { status: 400 }
      )
    }

    const trimmedKeyword = keyword.trim()

    if (trimmedKeyword.length < 2 || trimmedKeyword.length > 50) {
      return NextResponse.json(
        { error: '키워드는 2-50자 사이여야 합니다.' },
        { status: 400 }
      )
    }

    // 1. 금지 키워드 체크
    if (isBlockedKeyword(trimmedKeyword)) {
      return NextResponse.json(
        { 
          error: '입력한 키워드는 검색할 수 없어요',
          message: '이 키워드는 유튜브 커뮤니티 가이드에 위배될 수 있어요.',
          blocked: true 
        },
        { status: 403 }
      )
    }

    // 2. 캐시 확인 (24시간 이내)
    const { data: cachedData } = await supabase
      .from('keyword_searches')
      .select('result_data, cache_expires_at')
      .eq('keyword', trimmedKeyword)
      .gt('cache_expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (cachedData && cachedData.result_data) {
      // 캐시 hit: 검색 횟수만 증가
      await supabase.rpc('increment_keyword_search_count', {
        p_keyword: trimmedKeyword,
        p_ip_address: ip,
      })

      return NextResponse.json({
        ...cachedData.result_data,
        cached: true,
        cache_expires_at: cachedData.cache_expires_at,
      })
    }

    // 3. YouTube API로 데이터 수집
    console.log(`🔍 Analyzing keyword: "${trimmedKeyword}"`)
    
    const analysisResult = await analyzeKeyword(trimmedKeyword)

    // 4. Supabase에 결과 저장
    await supabase
      .from('keyword_searches')
      .insert({
        keyword: trimmedKeyword,
        ip_address: ip,
        result_data: analysisResult,
        cache_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      })

    // 5. 검색 횟수 증가
    await supabase.rpc('increment_keyword_search_count', {
      p_keyword: trimmedKeyword,
      p_ip_address: ip,
    })

    return NextResponse.json({
      ...analysisResult,
      cached: false,
    })
  } catch (error: any) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: '키워드 분석 중 오류가 발생했습니다.', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * 키워드 분석 (YouTube API 호출)
 */
async function analyzeKeyword(keyword: string) {
  // YouTube API: 최근 1년 데이터 검색
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  const searchUrl = `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(keyword)}&type=video&maxResults=50&publishedAfter=${oneYearAgo.toISOString()}&key=${YOUTUBE_API_KEY}`

  const searchResponse = await fetch(searchUrl)
  const searchData = await searchResponse.json()

  if (searchData.error) {
    throw new Error(`YouTube API Error: ${searchData.error.message}`)
  }

  const videoIds = searchData.items?.map((item: any) => item.id.videoId).filter(Boolean) || []

  if (videoIds.length === 0) {
    // 검색 결과 없음
    return {
      keyword,
      revenue_score: 0,
      competition_level: 'unknown',
      shorts_analysis: null,
      long_analysis: null,
      no_results: true,
    }
  }

  // 영상 상세 정보 가져오기
  const videosUrl = `${BASE_URL}/videos?part=snippet,statistics,contentDetails&id=${videoIds.join(',')}&key=${YOUTUBE_API_KEY}`
  const videosResponse = await fetch(videosUrl)
  const videosData = await videosResponse.json()

  if (videosData.error) {
    throw new Error(`YouTube API Error: ${videosData.error.message}`)
  }

  const videos = videosData.items || []

  // 숏폼/롱폼 분류 및 분석
  const { shorts, longForm } = classifyVideos(videos)

  const shortsAnalysis = analyzeVideos(shorts, 'short')
  const longAnalysis = analyzeVideos(longForm, 'long')

  // 종합 점수 계산
  const revenueScore = calculateRevenueScore(shortsAnalysis, longAnalysis)
  const competitionLevel = calculateCompetitionLevel(videos.length)

  // 카테고리 분석
  const categoryDistribution = analyzeCategoryDistribution(videos)

  // 트렌드 데이터 (간단하게 월별로 집계)
  const trendData = generateTrendData(videos)

  // 상위 채널
  const topChannels = extractTopChannels(videos)

  // 인사이트 생성
  const insights = generateInsights(shortsAnalysis, longAnalysis, revenueScore, competitionLevel)

  return {
    keyword,
    revenue_score: revenueScore,
    competition_level: competitionLevel,
    shorts_analysis: shortsAnalysis,
    long_analysis: longAnalysis,
    category_distribution: categoryDistribution,
    trend_data: trendData,
    top_channels: topChannels,
    insights,
    total_videos: videos.length,
    analyzed_at: new Date().toISOString(),
  }
}

// 헬퍼 함수들
function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0
  const hours = parseInt(match[1] || '0')
  const minutes = parseInt(match[2] || '0')
  const seconds = parseInt(match[3] || '0')
  return hours * 3600 + minutes * 60 + seconds
}

function classifyVideos(videos: any[]) {
  const shorts: any[] = []
  const longForm: any[] = []

  videos.forEach(video => {
    const duration = parseDuration(video.contentDetails.duration)
    if (duration <= 60) {
      shorts.push(video)
    } else {
      longForm.push(video)
    }
  })

  return { shorts, longForm }
}

function analyzeVideos(videos: any[], type: 'short' | 'long') {
  if (videos.length === 0) {
    return null
  }

  const totalViews = videos.reduce((sum, v) => sum + parseInt(v.statistics.viewCount || '0'), 0)
  const totalLikes = videos.reduce((sum, v) => sum + parseInt(v.statistics.likeCount || '0'), 0)
  const totalComments = videos.reduce((sum, v) => sum + parseInt(v.statistics.commentCount || '0'), 0)

  const avgViews = Math.round(totalViews / videos.length)
  const avgLikes = Math.round(totalLikes / videos.length)
  const avgComments = Math.round(totalComments / videos.length)
  const engagementRate = totalViews > 0 ? ((totalLikes + totalComments) / totalViews) * 100 : 0

  // CPM 추정 (카테고리별 평균 - 개선)
  const categoryIds = videos.map(v => v.snippet.categoryId)
  const estimatedCPM = calculateEstimatedCPM(categoryIds, type)

  // 경쟁 강도 (영상 개수 + 평균 조회수 고려)
  const competition = calculateCompetition(videos.length, avgViews, type)

  return {
    video_count: videos.length,
    avg_views: avgViews,
    avg_likes: avgLikes,
    avg_comments: avgComments,
    engagement_rate: Math.round(engagementRate * 100) / 100,
    estimated_cpm: estimatedCPM,
    competition,
    recommended_length: type === 'short' ? '30-60초' : '8-15분',
  }
}

// 카테고리별 CPM 계산 (개선)
function calculateEstimatedCPM(categoryIds: string[], type: 'short' | 'long'): number {
  // 유튜브 카테고리별 평균 CPM (업계 표준)
  const categoryBaseCPM: { [key: string]: number } = {
    '1': 8,   // 영화/애니
    '10': 6,  // 음악
    '15': 9,  // 애완동물
    '17': 12, // 스포츠
    '19': 8,  // 여행/이벤트
    '20': 15, // 게임 (광고주 많음)
    '22': 10, // 인물/블로그
    '24': 7,  // 엔터테인먼트
    '25': 18, // 뉴스/정치 (높은 CPM)
    '26': 11, // 하우투/스타일
    '27': 14, // 교육 (높은 CPM)
    '28': 16, // 과학/기술 (매우 높은 CPM)
    '29': 8,  // 비영리/사회운동
  }

  // 카테고리별 평균 계산
  let totalCPM = 0
  let count = 0
  categoryIds.forEach(id => {
    if (categoryBaseCPM[id]) {
      totalCPM += categoryBaseCPM[id]
      count++
    }
  })

  const avgCPM = count > 0 ? totalCPM / count : 8 // 기본값 $8

  // 숏폼은 롱폼보다 CPM이 낮음 (약 60%)
  const multiplier = type === 'short' ? 0.6 : 1.0
  
  return Math.round(avgCPM * multiplier * 10) / 10
}

// 경쟁 강도 계산 (개선)
function calculateCompetition(videoCount: number, avgViews: number, type: 'short' | 'long'): string {
  // 영상 개수 점수 (40% 가중치)
  let countScore = 0
  if (videoCount < 15) countScore = 1
  else if (videoCount < 30) countScore = 2
  else if (videoCount < 50) countScore = 3
  else countScore = 4

  // 평균 조회수 점수 (60% 가중치)
  let viewsScore = 0
  const viewsThreshold = type === 'short' ? 100000 : 50000
  
  if (avgViews < viewsThreshold * 0.5) viewsScore = 1
  else if (avgViews < viewsThreshold) viewsScore = 2
  else if (avgViews < viewsThreshold * 2) viewsScore = 3
  else viewsScore = 4

  // 종합 점수 (가중 평균)
  const finalScore = countScore * 0.4 + viewsScore * 0.6

  if (finalScore < 2) return 'low'
  if (finalScore < 3) return 'medium'
  return 'high'
}

function calculateRevenueScore(shortsAnalysis: any, longAnalysis: any): number {
  let score = 0
  let weights = 0

  // 롱폼 분석 (가중치 60%)
  if (longAnalysis) {
    // 조회수 점수 (0-4점)
    const viewsScore = Math.min(4, (longAnalysis.avg_views / 50000) * 2)
    
    // CPM 점수 (0-3점)
    const cpmScore = Math.min(3, longAnalysis.estimated_cpm / 6)
    
    // 참여율 점수 (0-2점)
    const engagementScore = Math.min(2, longAnalysis.engagement_rate * 20)
    
    // 경쟁도 보너스/페널티 (0-1점)
    const competitionScore = 
      longAnalysis.competition === 'low' ? 1 : 
      longAnalysis.competition === 'medium' ? 0.5 : 0

    score += (viewsScore + cpmScore + engagementScore + competitionScore) * 0.6
    weights += 0.6
  }

  // 숏폼 분석 (가중치 40%)
  if (shortsAnalysis) {
    // 조회수 점수 (0-4점)
    const viewsScore = Math.min(4, (shortsAnalysis.avg_views / 100000) * 2)
    
    // CPM 점수 (0-2점)
    const cpmScore = Math.min(2, shortsAnalysis.estimated_cpm / 3)
    
    // 참여율 점수 (0-2점)
    const engagementScore = Math.min(2, shortsAnalysis.engagement_rate * 20)
    
    // 경쟁도 보너스/페널티 (0-2점)
    const competitionScore = 
      shortsAnalysis.competition === 'low' ? 2 : 
      shortsAnalysis.competition === 'medium' ? 1 : 0

    score += (viewsScore + cpmScore + engagementScore + competitionScore) * 0.4
    weights += 0.4
  }

  // 최종 점수 정규화 (1-10 범위)
  const normalizedScore = weights > 0 ? score / weights : 5
  return Math.min(10, Math.max(1, Math.round(normalizedScore * 10) / 10))
}

function calculateCompetitionLevel(videoCount: number): string {
  if (videoCount < 20) return 'low'
  if (videoCount < 40) return 'medium'
  return 'high'
}

function analyzeCategoryDistribution(videos: any[]) {
  const categories: { [key: string]: number } = {}
  
  videos.forEach(video => {
    const category = video.snippet.categoryId || 'unknown'
    categories[category] = (categories[category] || 0) + 1
  })

  return Object.entries(categories)
    .map(([id, count]) => ({ category_id: id, count }))
    .sort((a, b) => b.count - a.count)
}

function generateTrendData(videos: any[]) {
  // 월별 집계 (최근 12개월)
  const months: { [key: string]: number } = {}
  
  videos.forEach(video => {
    const date = new Date(video.snippet.publishedAt)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    months[monthKey] = (months[monthKey] || 0) + 1
  })

  return Object.entries(months)
    .map(([month, count]) => ({ month, upload_count: count }))
    .sort((a, b) => a.month.localeCompare(b.month))
}

function extractTopChannels(videos: any[]) {
  const channels: { [key: string]: any } = {}

  videos.forEach(video => {
    const channelId = video.snippet.channelId
    const channelTitle = video.snippet.channelTitle
    const views = parseInt(video.statistics.viewCount || '0')

    if (!channels[channelId]) {
      channels[channelId] = {
        channel_id: channelId,
        channel_title: channelTitle,
        video_count: 0,
        total_views: 0,
      }
    }

    channels[channelId].video_count++
    channels[channelId].total_views += views
  })

  return Object.values(channels)
    .map((channel: any) => ({
      ...channel,
      avg_views: Math.round(channel.total_views / channel.video_count),
    }))
    .sort((a: any, b: any) => b.total_views - a.total_views)
    .slice(0, 5)
}

function generateInsights(shortsAnalysis: any, longAnalysis: any, revenueScore: number, competitionLevel: string) {
  const insights: string[] = []

  if (revenueScore >= 7) {
    insights.push('✅ 수익성이 높은 주제입니다')
  } else if (revenueScore < 5) {
    insights.push('⚠️ 수익성이 낮을 수 있습니다')
  }

  if (competitionLevel === 'low') {
    insights.push('✅ 경쟁이 적어 진입하기 좋습니다')
  } else if (competitionLevel === 'high') {
    insights.push('⚠️ 경쟁이 치열한 주제입니다')
  }

  if (longAnalysis && longAnalysis.avg_views > 50000) {
    insights.push('💡 롱폼 콘텐츠가 더 적합합니다')
  } else if (shortsAnalysis && shortsAnalysis.avg_views > 100000) {
    insights.push('💡 숏폼 콘텐츠가 더 적합합니다')
  }

  return insights
}

