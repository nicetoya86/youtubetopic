import { DollarSign, Target, RefreshCw, BarChart3, Shield, Zap } from 'lucide-react'
import Card from '@/components/ui/Card'

export default function FeatureSection() {
  const features = [
    {
      icon: DollarSign,
      title: '높은 수익성',
      description: 'CPM이 높고 광고 수익이 좋은 카테고리를 우선 추천합니다.',
      color: 'text-green-400',
    },
    {
      icon: Target,
      title: '낮은 경쟁',
      description: '과열되지 않은 블루오션 주제를 데이터 기반으로 선정합니다.',
      color: 'text-blue-400',
    },
    {
      icon: RefreshCw,
      title: '매월 업데이트',
      description: '매월 1일, 최신 트렌드를 반영한 새로운 주제를 자동 추가합니다.',
      color: 'text-purple-400',
    },
    {
      icon: BarChart3,
      title: '실시간 분석',
      description: 'YouTube Data API로 실시간 조회수, 참여율 데이터를 수집합니다.',
      color: 'text-cyan-400',
    },
    {
      icon: Shield,
      title: '검증된 데이터',
      description: '주관적 추측이 아닌 실제 통계 데이터만 사용합니다.',
      color: 'text-amber-400',
    },
    {
      icon: Zap,
      title: '빠른 성장',
      description: '초보자도 쉽게 따라할 수 있는 상세한 가이드를 제공합니다.',
      color: 'text-pink-400',
    },
  ]

  return (
    <section className="relative py-20 md:py-32 bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            왜 <span className="text-gradient">Topic Finder</span>인가?
          </h2>
          <p className="text-gray-400 text-lg">
            실시간 데이터 분석으로 검증된 수익형 주제만 추천합니다
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                hover
                className="group animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-4">
                  <div className={`inline-flex p-3 rounded-xl bg-slate-800/50 ${feature.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

