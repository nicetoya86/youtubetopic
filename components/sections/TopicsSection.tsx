'use client'

import { useState } from 'react'
import { TrendingUp, Eye, Target, ArrowRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

interface Topic {
  id: string
  title: string
  category: string
  revenueScore: number
  competition: 'low' | 'medium' | 'high'
  avgViews: string
  cpm: string
  trending: boolean
}

export default function TopicsSection() {
  const [activeTab, setActiveTab] = useState<'shorts' | 'long'>('shorts')

  // 샘플 데이터
  const shortTopics: Topic[] = [
    {
      id: '1',
      title: '5분 재테크 팁',
      category: '금융/투자',
      revenueScore: 9,
      competition: 'low',
      avgViews: '150K',
      cpm: '$12-18',
      trending: true,
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
    },
  ]

  const longTopics: Topic[] = [
    {
      id: '5',
      title: '부동산 투자 완벽 가이드',
      category: '금융/투자',
      revenueScore: 10,
      competition: 'low',
      avgViews: '80K',
      cpm: '$15-22',
      trending: true,
    },
    {
      id: '6',
      title: '프로그래밍 강의 시리즈',
      category: '교육',
      revenueScore: 9,
      competition: 'medium',
      avgViews: '100K',
      cpm: '$10-18',
      trending: true,
    },
    {
      id: '7',
      title: '세계 여행 Vlog',
      category: 'Vlog',
      revenueScore: 5,
      competition: 'high',
      avgViews: '250K',
      cpm: '$2-5',
      trending: false,
    },
    {
      id: '8',
      title: '제품 리뷰 & 언박싱',
      category: '테크/리뷰',
      revenueScore: 8,
      competition: 'medium',
      avgViews: '150K',
      cpm: '$6-12',
      trending: false,
    },
  ]

  const topics = activeTab === 'shorts' ? shortTopics : longTopics

  const getCompetitionBadge = (competition: string) => {
    switch (competition) {
      case 'low':
        return <Badge variant="success">낮은 경쟁</Badge>
      case 'medium':
        return <Badge variant="warning">중간 경쟁</Badge>
      case 'high':
        return <Badge variant="danger">높은 경쟁</Badge>
      default:
        return <Badge variant="default">-</Badge>
    }
  }

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-slate-900/50 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            이번 달 <span className="text-gradient">추천 주제</span>
          </h2>
          <p className="text-gray-400 text-lg">
            최근 1년 데이터 분석을 통해 엄선한 수익형 컨텐츠 주제
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex glass rounded-2xl p-1">
            <button
              onClick={() => setActiveTab('shorts')}
              className={`px-6 md:px-8 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'shorts'
                  ? 'bg-gradient-to-r from-primary-cyan to-primary-blue text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              숏폼 (Shorts)
            </button>
            <button
              onClick={() => setActiveTab('long')}
              className={`px-6 md:px-8 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'long'
                  ? 'bg-gradient-to-r from-primary-cyan to-primary-blue text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              롱폼 (일반)
            </button>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {topics.map((topic, index) => (
            <Card
              key={topic.id}
              hover
              className="group relative overflow-hidden animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Trending Badge */}
              {topic.trending && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center space-x-1 bg-primary-pink/20 backdrop-blur-sm border border-primary-pink/30 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3 text-primary-pink" />
                    <span className="text-xs text-primary-pink font-semibold">HOT</span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {/* Category Badge */}
                <Badge variant="default">{topic.category}</Badge>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-colors">
                  {topic.title}
                </h3>

                {/* Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">수익성 점수</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < topic.revenueScore ? 'bg-primary-cyan' : 'bg-gray-700'
                          }`}
                        />
                      ))}
                      <span className="text-white font-bold ml-2">{topic.revenueScore}/10</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">경쟁 강도</span>
                    {getCompetitionBadge(topic.competition)}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Eye className="w-4 h-4" />
                      <span>평균 조회수</span>
                    </div>
                    <span className="text-white font-semibold">{topic.avgViews}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">예상 CPM</span>
                    <span className="text-green-400 font-semibold">{topic.cpm}</span>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors group/btn">
                  <span className="text-sm text-gray-300 group-hover/btn:text-white">자세히 보기</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button size="lg" variant="outline">
            모든 주제 보기
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

