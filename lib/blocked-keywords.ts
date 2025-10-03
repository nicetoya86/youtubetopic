/**
 * 금지 키워드 블랙리스트
 * 유튜브 커뮤니티 가이드에 위배될 수 있는 키워드 목록
 */

export interface BlockedKeyword {
  keyword: string
  category: 'adult' | 'violence' | 'illegal' | 'copyright' | 'spam'
  reason: string
}

export const BLOCKED_KEYWORDS: BlockedKeyword[] = [
  // ========== 성인 콘텐츠 ==========
  { keyword: '성인', category: 'adult', reason: '성인 콘텐츠' },
  { keyword: '19금', category: 'adult', reason: '성인 콘텐츠' },
  { keyword: '야동', category: 'adult', reason: '성인 콘텐츠' },
  { keyword: '포르노', category: 'adult', reason: '성인 콘텐츠' },
  { keyword: 'porn', category: 'adult', reason: '성인 콘텐츠' },
  { keyword: 'sex', category: 'adult', reason: '성인 콘텐츠' },
  { keyword: 'xxx', category: 'adult', reason: '성인 콘텐츠' },
  { keyword: '섹스', category: 'adult', reason: '성인 콘텐츠' },
  { keyword: '음란', category: 'adult', reason: '성인 콘텐츠' },
  { keyword: '야한', category: 'adult', reason: '성인 콘텐츠' },

  // ========== 폭력/혐오 ==========
  { keyword: '폭력', category: 'violence', reason: '폭력 콘텐츠' },
  { keyword: '살인', category: 'violence', reason: '폭력 콘텐츠' },
  { keyword: '테러', category: 'violence', reason: '폭력 콘텐츠' },
  { keyword: '자살', category: 'violence', reason: '폭력 콘텐츠' },
  { keyword: '학대', category: 'violence', reason: '폭력 콘텐츠' },
  { keyword: '고문', category: 'violence', reason: '폭력 콘텐츠' },
  { keyword: '혐오', category: 'violence', reason: '혐오 표현' },
  { keyword: 'violence', category: 'violence', reason: '폭력 콘텐츠' },
  { keyword: 'murder', category: 'violence', reason: '폭력 콘텐츠' },
  { keyword: 'suicide', category: 'violence', reason: '폭력 콘텐츠' },

  // ========== 불법 활동 ==========
  { keyword: '마약', category: 'illegal', reason: '불법 활동' },
  { keyword: '도박', category: 'illegal', reason: '불법 활동' },
  { keyword: '해킹', category: 'illegal', reason: '불법 활동' },
  { keyword: '불법', category: 'illegal', reason: '불법 활동' },
  { keyword: '사기', category: 'illegal', reason: '불법 활동' },
  { keyword: '탈세', category: 'illegal', reason: '불법 활동' },
  { keyword: '위조', category: 'illegal', reason: '불법 활동' },
  { keyword: '밀수', category: 'illegal', reason: '불법 활동' },
  { keyword: 'drug', category: 'illegal', reason: '불법 활동' },
  { keyword: 'gambling', category: 'illegal', reason: '불법 활동' },
  { keyword: 'hacking', category: 'illegal', reason: '불법 활동' },
  { keyword: 'illegal', category: 'illegal', reason: '불법 활동' },
  { keyword: 'scam', category: 'illegal', reason: '불법 활동' },
  { keyword: '범죄', category: 'illegal', reason: '불법 활동' },

  // ========== 저작권 침해 ==========
  { keyword: '영화 다운로드', category: 'copyright', reason: '저작권 침해' },
  { keyword: '드라마 다운로드', category: 'copyright', reason: '저작권 침해' },
  { keyword: '음악 다운로드', category: 'copyright', reason: '저작권 침해' },
  { keyword: '무료 다운로드', category: 'copyright', reason: '저작권 침해' },
  { keyword: '토렌트', category: 'copyright', reason: '저작권 침해' },
  { keyword: '불법 다운로드', category: 'copyright', reason: '저작권 침해' },
  { keyword: 'torrent', category: 'copyright', reason: '저작권 침해' },
  { keyword: 'piracy', category: 'copyright', reason: '저작권 침해' },
  { keyword: 'crack', category: 'copyright', reason: '저작권 침해' },
  { keyword: '크랙', category: 'copyright', reason: '저작권 침해' },
  { keyword: '무료 영화', category: 'copyright', reason: '저작권 침해' },
  { keyword: '무료 드라마', category: 'copyright', reason: '저작권 침해' },

  // ========== 스팸/사기 ==========
  { keyword: '조회수 늘리기', category: 'spam', reason: '스팸/사기' },
  { keyword: '구독자 늘리기', category: 'spam', reason: '스팸/사기' },
  { keyword: '무료 돈', category: 'spam', reason: '스팸/사기' },
  { keyword: '쉽게 돈 버는 법', category: 'spam', reason: '스팸/사기' },
  { keyword: '클릭만 하면', category: 'spam', reason: '스팸/사기' },
  { keyword: '보증금 없이', category: 'spam', reason: '스팸/사기' },
  { keyword: '투자 100% 수익', category: 'spam', reason: '스팸/사기' },
  { keyword: 'view bot', category: 'spam', reason: '스팸/사기' },
  { keyword: 'subscriber bot', category: 'spam', reason: '스팸/사기' },
  { keyword: 'easy money', category: 'spam', reason: '스팸/사기' },
  { keyword: 'get rich quick', category: 'spam', reason: '스팸/사기' },
  { keyword: '좋아요 늘리기', category: 'spam', reason: '스팸/사기' },

  // ========== 추가 위험 키워드 ==========
  { keyword: '무기', category: 'violence', reason: '위험 콘텐츠' },
  { keyword: '총기', category: 'violence', reason: '위험 콘텐츠' },
  { keyword: '폭탄', category: 'violence', reason: '위험 콘텐츠' },
  { keyword: 'weapon', category: 'violence', reason: '위험 콘텐츠' },
  { keyword: 'gun', category: 'violence', reason: '위험 콘텐츠' },
  { keyword: 'bomb', category: 'violence', reason: '위험 콘텐츠' },
]

/**
 * 키워드가 블랙리스트에 있는지 확인
 */
export function isBlockedKeyword(keyword: string): boolean {
  const normalizedKeyword = keyword.toLowerCase().trim()
  return BLOCKED_KEYWORDS.some(
    blocked => blocked.keyword.toLowerCase() === normalizedKeyword ||
               normalizedKeyword.includes(blocked.keyword.toLowerCase())
  )
}

/**
 * 블랙리스트에 있는 키워드 정보 반환
 */
export function getBlockedKeywordInfo(keyword: string): BlockedKeyword | null {
  const normalizedKeyword = keyword.toLowerCase().trim()
  return BLOCKED_KEYWORDS.find(
    blocked => blocked.keyword.toLowerCase() === normalizedKeyword ||
               normalizedKeyword.includes(blocked.keyword.toLowerCase())
  ) || null
}

/**
 * 카테고리별 블랙리스트 개수
 */
export function getBlockedKeywordStats() {
  const stats = {
    adult: 0,
    violence: 0,
    illegal: 0,
    copyright: 0,
    spam: 0,
    total: BLOCKED_KEYWORDS.length,
  }

  BLOCKED_KEYWORDS.forEach(blocked => {
    stats[blocked.category]++
  })

  return stats
}

