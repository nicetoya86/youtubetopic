import { NextRequest, NextResponse } from 'next/server'
import { isBlockedKeyword, getBlockedKeywordInfo } from '@/lib/blocked-keywords'

export const runtime = 'edge'

/**
 * POST /api/keyword/validate
 * 키워드가 금지 키워드인지 확인
 */
export async function POST(request: NextRequest) {
  try {
    const { keyword } = await request.json()

    // 입력 검증
    if (!keyword || typeof keyword !== 'string') {
      return NextResponse.json(
        { error: '키워드를 입력해주세요.' },
        { status: 400 }
      )
    }

    const trimmedKeyword = keyword.trim()

    // 길이 검증
    if (trimmedKeyword.length < 2) {
      return NextResponse.json(
        { error: '키워드는 최소 2자 이상이어야 합니다.' },
        { status: 400 }
      )
    }

    if (trimmedKeyword.length > 50) {
      return NextResponse.json(
        { error: '키워드는 최대 50자까지 입력 가능합니다.' },
        { status: 400 }
      )
    }

    // 금지 키워드 확인
    const isBlocked = isBlockedKeyword(trimmedKeyword)
    const blockedInfo = isBlocked ? getBlockedKeywordInfo(trimmedKeyword) : null

    if (isBlocked) {
      return NextResponse.json({
        valid: false,
        blocked: true,
        keyword: trimmedKeyword,
        reason: blockedInfo?.reason || '유튜브 커뮤니티 가이드 위배',
        category: blockedInfo?.category || 'unknown',
      })
    }

    // 통과
    return NextResponse.json({
      valid: true,
      blocked: false,
      keyword: trimmedKeyword,
    })
  } catch (error: any) {
    console.error('Validate API error:', error)
    return NextResponse.json(
      { error: '키워드 검증 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

