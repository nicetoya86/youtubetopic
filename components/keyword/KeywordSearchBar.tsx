'use client'

import { useState, useEffect } from 'react'
import { Search, TrendingUp, X } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface KeywordSearchBarProps {
  onSearch: (result: any) => void
  onLoadingChange: (loading: boolean) => void
}

export default function KeywordSearchBar({ onSearch, onLoadingChange }: KeywordSearchBarProps) {
  const [keyword, setKeyword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [popularKeywords, setPopularKeywords] = useState<string[]>([])

  // 최근 검색어 로드 (로컬 스토리지)
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // 인기 검색어 로드
  useEffect(() => {
    fetchPopularKeywords()
  }, [])

  const fetchPopularKeywords = async () => {
    try {
      const response = await fetch('/api/keyword/popular')
      const data = await response.json()
      if (data.keywords) {
        setPopularKeywords(data.keywords.map((k: any) => k.keyword).slice(0, 10))
      }
    } catch (error) {
      console.error('Failed to fetch popular keywords:', error)
    }
  }

  const handleSearch = async () => {
    if (!keyword.trim()) {
      alert('키워드를 입력해주세요.')
      return
    }

    // 1. Validate API로 금지 키워드 체크
    setIsLoading(true)
    onLoadingChange(true)

    try {
      const validateResponse = await fetch('/api/keyword/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: keyword.trim() }),
      })

      const validateData = await validateResponse.json()

      if (validateData.blocked) {
        alert('⚠️ 입력한 키워드는 검색할 수 없어요\n\n이 키워드는 유튜브 커뮤니티 가이드에 위배될 수 있어요.\n다른 키워드로 다시 시도해주세요.')
        setIsLoading(false)
        onLoadingChange(false)
        return
      }

      // 2. Search API로 실제 분석
      const searchResponse = await fetch('/api/keyword/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: keyword.trim() }),
      })

      if (!searchResponse.ok) {
        const errorData = await searchResponse.json()
        throw new Error(errorData.error || '분석 중 오류가 발생했습니다.')
      }

      const searchData = await searchResponse.json()

      // 3. 최근 검색어에 추가
      const updated = [keyword.trim(), ...recentSearches.filter(k => k !== keyword.trim())].slice(0, 10)
      setRecentSearches(updated)
      localStorage.setItem('recentSearches', JSON.stringify(updated))

      // 4. 결과 반환
      onSearch(searchData)
    } catch (error: any) {
      console.error('Search error:', error)
      alert(`검색 중 오류가 발생했습니다.\n${error.message}`)
    } finally {
      setIsLoading(false)
      onLoadingChange(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleChipClick = (kw: string) => {
    setKeyword(kw)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  return (
    <Card glass>
      {/* Input */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="예: 재테크, 운동 루틴, 파이썬 강의"
            className="w-full pl-12 pr-20 py-4 bg-slate-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all"
            disabled={isLoading}
            maxLength={50}
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
            {keyword.length}/50
          </span>
        </div>
        <Button
          onClick={handleSearch}
          disabled={isLoading || !keyword.trim()}
          className="px-8 py-4"
        >
          {isLoading ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
              분석 중...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              분석하기
            </>
          )}
        </Button>
      </div>

      {/* Recent & Popular Searches */}
      <div className="mt-6 space-y-4">
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">최근 검색</span>
              <button
                onClick={clearRecentSearches}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((kw, index) => (
                <button
                  key={index}
                  onClick={() => handleChipClick(kw)}
                  className="px-3 py-1.5 bg-slate-800/50 border border-gray-700 rounded-full text-sm text-gray-300 hover:bg-slate-700/50 hover:border-primary-cyan hover:text-primary-cyan transition-all"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Keywords */}
        {popularKeywords.length > 0 && (
          <div>
            <div className="flex items-center mb-2">
              <TrendingUp className="w-4 h-4 text-primary-pink mr-2" />
              <span className="text-sm text-gray-400">인기 검색어</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularKeywords.map((kw, index) => (
                <button
                  key={index}
                  onClick={() => handleChipClick(kw)}
                  className="px-3 py-1.5 bg-primary-pink/10 border border-primary-pink/30 rounded-full text-sm text-primary-pink hover:bg-primary-pink/20 transition-all"
                >
                  {index + 1}. {kw}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

