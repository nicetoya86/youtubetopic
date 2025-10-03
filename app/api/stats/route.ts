import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

/**
 * GET /api/stats
 * 사이트 통계 정보 반환
 */
export async function GET() {
  try {
    // 1. 전체 주제 개수
    const { count: totalTopics, error: topicsError } = await supabase
      .from('topics')
      .select('*', { count: 'exact', head: true })

    if (topicsError) throw topicsError

    // 2. 카테고리 개수
    const { count: totalCategories, error: categoriesError } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true })

    if (categoriesError) throw categoriesError

    // 3. 최근 업데이트 날짜
    const { data: latestTopic, error: latestError } = await supabase
      .from('topics')
      .select('updated_at')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()

    if (latestError && latestError.code !== 'PGRST116') {
      // PGRST116 = no rows returned
      console.error('Latest topic error:', latestError)
    }

    // 4. 평균 수익 점수 (7점 이상인 주제 비율)
    const { data: highRevenueTopics, error: revenueError } = await supabase
      .from('topics')
      .select('revenue_score')
      .gte('revenue_score', 7)

    if (revenueError) throw revenueError

    const accuracyRate = totalTopics 
      ? Math.round((highRevenueTopics?.length || 0) / totalTopics * 100)
      : 98 // 기본값

    return NextResponse.json({
      total_topics: totalTopics || 0,
      total_categories: totalCategories || 0,
      accuracy_rate: accuracyRate,
      last_updated: latestTopic?.updated_at || new Date().toISOString(),
      status: 'active',
    })
  } catch (error: any) {
    console.error('Stats API error:', error)
    return NextResponse.json(
      { 
        error: '통계 조회 중 오류가 발생했습니다.',
        // 폴백 데이터
        total_topics: 150,
        total_categories: 15,
        accuracy_rate: 98,
        last_updated: new Date().toISOString(),
        status: 'fallback',
      },
      { status: 500 }
    )
  }
}

