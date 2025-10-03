'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { TrendingUp, Eye, DollarSign } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { supabase } from '@/lib/supabase'

interface Topic {
  id: string
  title: string
  category: string
  revenueScore: number
  competition: string
  avgViews: string
  cpm: string
  trending: boolean
  description: string
  keywords: string[]
  optimalLength: string
}

export default function ShortsPage() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTopics()
  }, [])

  async function fetchTopics() {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('content_type', 'short')
      .eq('is_active', true)
      .order('revenue_score', { ascending: false })

    if (error) {
      console.error('Error fetching topics:', error)
      setLoading(false)
      return
    }

    if (data) {
      const formattedTopics: Topic[] = data.map((topic: any) => ({
        id: topic.id,
        title: topic.title,
        category: getCategoryName(topic.category),
        revenueScore: topic.revenue_score,
        competition: topic.competition_level,
        avgViews: formatViews(topic.avg_views),
        cpm: `$${Math.floor(topic.estimated_cpm)}-${Math.ceil(topic.estimated_cpm * 1.2)}`,
        trending: topic.revenue_score >= 8,
        description: `${topic.title}에 대한 숏폼 컨텐츠. ${topic.competition_level === 'low' ? '경쟁이 낮고' : topic.competition_level === 'medium' ? '적절한 경쟁이 있으며' : '경쟁이 치열하지만'} 수익성이 ${topic.revenue_score >= 8 ? '높습니다' : '중간입니다'}.`,
        keywords: topic.trending_keywords || ['컨텐츠', '숏폼', '유튜브'],
        optimalLength: topic.video_length_min && topic.video_length_max 
          ? `${topic.video_length_min}-${topic.video_length_max}초`
          : '30-60초',
      }))
      setTopics(formattedTopics)
    }
    setLoading(false)
  }

  function formatViews(views: number): string {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`
    }
    return `${(views / 1000).toFixed(0)}K`
  }

  function getCategoryName(category: string): string {
    const names: { [key: string]: string } = {
      'finance': '금융/투자',
      'education': '교육/강의',
      'tech': '테크',
      'health': '건강/피트니스',
      'cooking': '요리',
      'gaming': '게임',
      'entertainment': '엔터테인먼트',
    }
    return names[category] || category
  }

  // 샘플 데이터 (백업용)
  const sampleTopics = [
    {
      id: '1',
      title: '5분 재테크 팁',
      category: '금융/투자',
      revenueScore: 9,
      competition: 'low',
      avgViews: '150K',
      cpm: '$12-18',
      trending: true,
      description: '짧고 강력한 재테크 정보를 전달하는 숏폼. 높은 CPM과 안정적인 조회수.',
      keywords: ['재테크', '투자', '절약', '돈모으기'],
      optimalLength: '30-60초',
    },
    {
      id: '2',
      title: '1분 요리 레시피',
      category: '요리',
      revenueScore: 7,
      competition: 'medium',
      avgViews: '200K',
      cpm: '$4-8',
      trending: false,
      description: '빠르고 간단한 레시피로 높은 참여율. 시청 완료율이 높음.',
      keywords: ['요리', '레시피', '간단요리', '1분요리'],
      optimalLength: '45-60초',
    },
    {
      id: '3',
      title: 'AI 도구 활용법',
      category: '테크',
      revenueScore: 8,
      competition: 'low',
      avgViews: '120K',
      cpm: '$8-15',
      trending: true,
      description: '최신 AI 도구 소개 및 활용 팁. 테크 분야 CPM이 높은 편.',
      keywords: ['AI', '인공지능', '생산성', '도구'],
      optimalLength: '40-60초',
    },
    {
      id: '4',
      title: '홈트레이닝 루틴',
      category: '건강/피트니스',
      revenueScore: 7,
      competition: 'medium',
      avgViews: '180K',
      cpm: '$5-10',
      trending: false,
      description: '집에서 할 수 있는 간단한 운동 루틴. 재생 횟수가 높음.',
      keywords: ['홈트', '운동', '다이어트', '건강'],
      optimalLength: '30-45초',
    },
    {
      id: '5',
      title: '심리 테스트',
      category: '엔터테인먼트',
      revenueScore: 6,
      competition: 'high',
      avgViews: '300K',
      cpm: '$2-5',
      trending: true,
      description: '높은 조회수지만 CPM이 낮음. 바이럴 가능성 높음.',
      keywords: ['심리테스트', '성격테스트', 'MBTI'],
      optimalLength: '30-60초',
    },
    {
      id: '6',
      title: '영어 회화 표현',
      category: '교육',
      revenueScore: 8,
      competition: 'low',
      avgViews: '100K',
      cpm: '$8-15',
      trending: false,
      description: '일상에서 쓰는 영어 표현. 교육 카테고리로 CPM 우수.',
      keywords: ['영어', '영어회화', '표현', '공부'],
      optimalLength: '30-45초',
    },
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 to-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 glass-light px-4 py-2 rounded-full">
              <TrendingUp className="w-4 h-4 text-primary-cyan" />
              <span className="text-sm text-gray-300">YouTube Shorts 최적화</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              <span className="text-gradient">숏폼</span> 주제 추천
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              60초 안에 수익을 극대화할 수 있는 숏폼 컨텐츠 주제를 추천합니다.
              최근 1년간 데이터를 기반으로 엄선했습니다.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-8">
              <div className="glass-light rounded-xl p-4">
                <div className="text-2xl font-bold text-primary-cyan">{topics.length}개</div>
                <div className="text-xs text-gray-400 mt-1">추천 주제</div>
              </div>
              <div className="glass-light rounded-xl p-4">
                <div className="text-2xl font-bold text-primary-pink">30-60s</div>
                <div className="text-xs text-gray-400 mt-1">최적 길이</div>
              </div>
              <div className="glass-light rounded-xl p-4">
                <div className="text-2xl font-bold text-green-400">높음</div>
                <div className="text-xs text-gray-400 mt-1">바이럴 가능성</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics List */}
      <section className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-cyan"></div>
              <p className="text-gray-400 mt-4">데이터 로딩 중...</p>
            </div>
          ) : topics.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">숏폼 주제를 찾을 수 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic, index) => (
              <Card
                key={topic.id}
                hover
                className="group animate-fadeIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {topic.trending && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-primary-pink/20 backdrop-blur-sm border border-primary-pink/30 px-2 py-1 rounded-full">
                      <TrendingUp className="w-3 h-3 text-primary-pink" />
                      <span className="text-xs text-primary-pink font-semibold">HOT</span>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Badge variant="default">{topic.category}</Badge>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-colors">
                    {topic.title}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed">
                    {topic.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">수익성 점수</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i < topic.revenueScore ? 'bg-primary-cyan' : 'bg-gray-700'
                            }`}
                          />
                        ))}
                        <span className="text-white font-bold ml-2">{topic.revenueScore}/10</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Eye className="w-4 h-4" />
                        <span>평균 조회수</span>
                      </div>
                      <span className="text-white font-semibold">{topic.avgViews}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-400">
                        <DollarSign className="w-4 h-4" />
                        <span>예상 CPM</span>
                      </div>
                      <span className="text-green-400 font-semibold">{topic.cpm}</span>
                    </div>

                    <div className="pt-2 border-t border-white/5">
                      <div className="text-xs text-gray-400 mb-2">추천 길이</div>
                      <div className="text-sm text-white font-medium">{topic.optimalLength}</div>
                    </div>

                    <div className="pt-2">
                      <div className="text-xs text-gray-400 mb-2">인기 키워드</div>
                      <div className="flex flex-wrap gap-1">
                        {topic.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="text-xs px-2 py-1 bg-white/5 rounded-md text-gray-300"
                          >
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

