'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Clock, Eye, DollarSign, BookOpen } from 'lucide-react'
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
  watchTime: string
}

export default function LongFormPage() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTopics()
  }, [])

  async function fetchTopics() {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('content_type', 'long')
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
        trending: topic.revenue_score >= 9,
        description: `${topic.title}에 대한 롱폼 컨텐츠. ${topic.competition_level === 'low' ? '경쟁이 낮고' : topic.competition_level === 'medium' ? '적절한 경쟁이 있으며' : '경쟁이 치열하지만'} 수익성이 ${topic.revenue_score >= 8 ? '높습니다' : '중간입니다'}.`,
        keywords: topic.trending_keywords || ['컨텐츠', '롱폼', '유튜브'],
        optimalLength: topic.video_length_min && topic.video_length_max 
          ? `${Math.floor(topic.video_length_min / 60)}-${Math.ceil(topic.video_length_max / 60)}분`
          : '10-20분',
        watchTime: topic.video_length_min 
          ? `${Math.floor((topic.video_length_min + (topic.video_length_max || topic.video_length_min)) / 2 / 60)}분`
          : '15분',
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
      'tech': '테크/리뷰',
      'health': '건강/피트니스',
      'cooking': '요리',
      'gaming': '게임',
      'entertainment': 'Vlog',
    }
    return names[category] || category
  }

  // 샘플 데이터 (백업용)
  const sampleTopics = [
    {
      id: '1',
      title: '부동산 투자 완벽 가이드',
      category: '금융/투자',
      revenueScore: 10,
      competition: 'low',
      avgViews: '80K',
      cpm: '$15-22',
      trending: true,
      description: '부동산 투자의 A to Z. 높은 CPM과 긴 시청 시간. 시리즈 제작 가능.',
      keywords: ['부동산', '투자', '재테크', '자산관리'],
      optimalLength: '15-25분',
      watchTime: '18분',
    },
    {
      id: '2',
      title: '프로그래밍 강의 시리즈',
      category: '교육',
      revenueScore: 9,
      competition: 'medium',
      avgViews: '100K',
      cpm: '$10-18',
      trending: true,
      description: '코딩 교육 컨텐츠. 교육 카테고리로 CPM 우수. 시리즈물로 제작 가능.',
      keywords: ['코딩', '프로그래밍', '개발', '교육'],
      optimalLength: '20-40분',
      watchTime: '25분',
    },
    {
      id: '3',
      title: '세계 여행 Vlog',
      category: 'Vlog',
      revenueScore: 5,
      competition: 'high',
      avgViews: '250K',
      cpm: '$2-5',
      trending: false,
      description: '높은 조회수지만 CPM 낮음. 브랜드 협찬 기회 많음.',
      keywords: ['여행', 'vlog', '여행브이로그', '해외여행'],
      optimalLength: '10-20분',
      watchTime: '12분',
    },
    {
      id: '4',
      title: '제품 리뷰 & 언박싱',
      category: '테크/리뷰',
      revenueScore: 8,
      competition: 'medium',
      avgViews: '150K',
      cpm: '$6-12',
      trending: false,
      description: '제품 리뷰로 제휴 마케팅 수익 추가 가능. 테크 분야 CPM 양호.',
      keywords: ['리뷰', '언박싱', '제품리뷰', '가젯'],
      optimalLength: '10-15분',
      watchTime: '11분',
    },
    {
      id: '5',
      title: '역사 다큐멘터리',
      category: '교육',
      revenueScore: 8,
      competition: 'low',
      avgViews: '60K',
      cpm: '$10-16',
      trending: false,
      description: '높은 CPM과 충성도 높은 시청자. 긴 시청 시간.',
      keywords: ['역사', '다큐멘터리', '교육', '세계사'],
      optimalLength: '20-30분',
      watchTime: '22분',
    },
    {
      id: '6',
      title: '재무 설계 컨설팅',
      category: '금융/투자',
      revenueScore: 9,
      competition: 'low',
      avgViews: '70K',
      cpm: '$14-20',
      trending: true,
      description: '금융 상담 컨텐츠. 매우 높은 CPM. 전문성 요구.',
      keywords: ['재무설계', '금융', '연금', '보험'],
      optimalLength: '15-25분',
      watchTime: '19분',
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
              <BookOpen className="w-4 h-4 text-primary-cyan" />
              <span className="text-sm text-gray-300">긴 시청 시간 최적화</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              <span className="text-gradient">롱폼</span> 주제 추천
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              깊이 있는 컨텐츠로 높은 광고 수익을 창출할 수 있는 롱폼 주제를 추천합니다.
              시청 시간과 수익성을 모두 고려했습니다.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-8">
              <div className="glass-light rounded-xl p-4">
                <div className="text-2xl font-bold text-primary-cyan">{topics.length}개</div>
                <div className="text-xs text-gray-400 mt-1">추천 주제</div>
              </div>
              <div className="glass-light rounded-xl p-4">
                <div className="text-2xl font-bold text-primary-pink">10-30분</div>
                <div className="text-xs text-gray-400 mt-1">권장 길이</div>
              </div>
              <div className="glass-light rounded-xl p-4">
                <div className="text-2xl font-bold text-green-400">높음</div>
                <div className="text-xs text-gray-400 mt-1">수익성</div>
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
              <p className="text-gray-400 text-lg">롱폼 주제를 찾을 수 없습니다.</p>
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
                      <Clock className="w-3 h-3 text-primary-pink" />
                      <span className="text-xs text-primary-pink font-semibold">인기</span>
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

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>평균 시청 시간</span>
                      </div>
                      <span className="text-primary-cyan font-semibold">{topic.watchTime}</span>
                    </div>

                    <div className="pt-2 border-t border-white/5">
                      <div className="text-xs text-gray-400 mb-2">권장 길이</div>
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

