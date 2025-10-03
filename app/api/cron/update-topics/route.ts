import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

// Vercel Cron Job에서 호출될 API
export async function GET(request: Request) {
  // Vercel Cron 인증 확인
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log('🚀 월간 자동 업데이트 시작...')

    // 1. 기존 주제 수 확인
    const { count: beforeCount } = await supabase
      .from('topics')
      .select('*', { count: 'exact', head: true })

    // 2. 오래된 주제 비활성화 (예: 3개월 이상 된 주제)
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

    await supabase
      .from('topics')
      .update({ is_active: false })
      .lt('created_at', threeMonthsAgo.toISOString())
      .eq('is_active', true)

    // 3. 새로운 트렌드 주제 추가 (샘플)
    const currentMonth = new Date().getMonth() + 1
    const newTopics = generateMonthlyTopics(currentMonth)

    const { data: insertedTopics, error } = await supabase
      .from('topics')
      .insert(newTopics)
      .select()

    if (error) {
      console.error('Error inserting topics:', error)
      return NextResponse.json({ 
        error: 'Failed to insert topics',
        details: error.message 
      }, { status: 500 })
    }

    // 4. 결과 확인
    const { count: afterCount } = await supabase
      .from('topics')
      .select('*', { count: 'exact', head: true })

    const result = {
      success: true,
      message: '월간 업데이트 완료',
      beforeCount,
      afterCount,
      addedCount: insertedTopics?.length || 0,
      timestamp: new Date().toISOString(),
    }

    console.log('✅ 자동 업데이트 완료:', result)

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('❌ 자동 업데이트 실패:', error)
    return NextResponse.json({ 
      error: 'Update failed',
      details: error.message 
    }, { status: 500 })
  }
}

// 월별 트렌드 주제 생성 함수
function generateMonthlyTopics(month: number) {
  const topics = [
    // 숏폼
    {
      title: `${month}월 트렌드 숏폼`,
      category: 'entertainment',
      content_type: 'short',
      revenue_score: 7,
      competition_level: 'medium',
      avg_views: 150000,
      estimated_cpm: 6.00,
      trending_keywords: ['트렌드', '숏폼', `${month}월`, '인기'],
      video_length_min: 30,
      video_length_max: 60,
      is_active: true,
    },
    // 롱폼
    {
      title: `${month}월 주목할 투자 전략`,
      category: 'finance',
      content_type: 'long',
      revenue_score: 9,
      competition_level: 'low',
      avg_views: 90000,
      estimated_cpm: 16.00,
      trending_keywords: ['투자', '전략', `${month}월`, '재테크'],
      video_length_min: 1200,
      video_length_max: 1800,
      is_active: true,
    },
  ]

  return topics
}

// Vercel이 아닌 환경에서도 테스트 가능하도록
export const runtime = 'edge'
export const dynamic = 'force-dynamic'

