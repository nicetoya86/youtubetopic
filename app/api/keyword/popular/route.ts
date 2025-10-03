import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

/**
 * GET /api/keyword/popular
 * 인기 검색어 TOP 10 반환
 */
export async function GET() {
  try {
    // popular_keywords 뷰에서 데이터 가져오기
    const { data, error } = await supabase
      .from('popular_keywords')
      .select('keyword, search_count, last_searched_at')
      .limit(10)

    if (error) {
      console.error('Popular keywords query error:', error)
      // 뷰가 없을 경우 대체 쿼리
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('keyword_searches')
        .select('keyword, search_count')
        .eq('is_blocked', false)
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order('search_count', { ascending: false })
        .limit(10)

      if (fallbackError) {
        throw fallbackError
      }

      return NextResponse.json({
        keywords: fallbackData || [],
        count: fallbackData?.length || 0,
      })
    }

    return NextResponse.json({
      keywords: data || [],
      count: data?.length || 0,
    })
  } catch (error: any) {
    console.error('Popular API error:', error)
    return NextResponse.json(
      { error: '인기 검색어를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

