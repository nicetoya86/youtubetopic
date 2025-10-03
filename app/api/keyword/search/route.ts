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

  // CPM 추정 (카테고리별 평균)
  const estimatedCPM = type === 'short' ? 5.5 : 10.0

  // 경쟁 강도
  const competition = videos.length < 15 ? 'low' : videos.length < 35 ? 'medium' : 'high'

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

function calculateRevenueScore(shortsAnalysis: any, longAnalysis: any): number {
  let score = 5 // 기본 점수

  if (longAnalysis) {
    score += (longAnalysis.avg_views / 50000) * 2
    score += longAnalysis.estimated_cpm / 2
  }

  if (shortsAnalysis) {
    score += (shortsAnalysis.avg_views / 100000)
  }

  return Math.min(10, Math.max(1, Math.round(score * 10) / 10))
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

