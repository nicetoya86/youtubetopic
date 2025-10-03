import { TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react'
import Card from '@/components/ui/Card'

interface ScoreCardProps {
  keyword: string
  revenueScore: number
  competitionLevel: string
  totalVideos: number
}

export default function ScoreCard({
  keyword,
  revenueScore,
  competitionLevel,
  totalVideos,
}: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-green-400'
    if (score >= 5) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getCompetitionColor = (level: string) => {
    if (level === 'low') return 'text-green-400'
    if (level === 'medium') return 'text-yellow-400'
    return 'text-red-400'
  }

  const getCompetitionText = (level: string) => {
    if (level === 'low') return '낮음'
    if (level === 'medium') return '중간'
    return '높음'
  }

  const getRecommendation = (score: number, competition: string) => {
    if (score >= 7 && competition === 'low') {
      return { icon: CheckCircle, text: '매우 추천 (시작하기 좋은 주제)', color: 'text-green-400' }
    }
    if (score >= 5) {
      return { icon: TrendingUp, text: '추천 (도전해볼 만한 주제)', color: 'text-primary-cyan' }
    }
    return { icon: AlertCircle, text: '주의 (신중하게 고려 필요)', color: 'text-yellow-400' }
  }

  const recommendation = getRecommendation(revenueScore, competitionLevel)
  const Icon = recommendation.icon

  return (
    <Card glass className="text-center">
      <h2 className="text-2xl font-bold text-white mb-2">
        &quot;{keyword}&quot; 분석 결과
      </h2>
      <p className="text-gray-400 text-sm mb-8">
        최근 1년 데이터 기준 • 총 {totalVideos}개 영상 분석
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Revenue Score */}
        <div className="glass-light rounded-xl p-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="text-sm text-gray-400">수익성 점수</div>
            <div className="group relative">
              <Info className="w-4 h-4 text-gray-500 cursor-help" />
              <div className="invisible group-hover:visible absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 border border-slate-700 rounded-lg text-xs text-gray-300 shadow-xl">
                <div className="font-semibold text-white mb-1">수익성 점수란?</div>
                조회수, CPM, 참여율, 경쟁도를 종합 분석한 점수입니다.
                <div className="mt-2 space-y-1">
                  <div>• 7점 이상: 높은 수익 가능성</div>
                  <div>• 5-7점: 중간 수익 가능성</div>
                  <div>• 5점 미만: 낮은 수익 가능성</div>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                  <div className="border-4 border-transparent border-t-slate-800"></div>
                </div>
              </div>
            </div>
          </div>
          <div className={`text-5xl font-bold ${getScoreColor(revenueScore)} mb-2`}>
            {revenueScore.toFixed(1)}
            <span className="text-2xl text-gray-500">/10</span>
          </div>
          <div className="flex gap-1 justify-center mt-3 mb-2">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`h-2 w-8 rounded ${
                  i < Math.floor(revenueScore)
                    ? revenueScore >= 7
                      ? 'bg-green-400'
                      : revenueScore >= 5
                      ? 'bg-yellow-400'
                      : 'bg-red-400'
                    : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-3">
            조회수 • CPM • 참여율 • 경쟁도 종합
          </div>
        </div>

        {/* Competition Level */}
        <div className="glass-light rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">경쟁 강도</div>
          <div className={`text-5xl font-bold ${getCompetitionColor(competitionLevel)} mb-2`}>
            {getCompetitionText(competitionLevel)}
          </div>
          <div className="text-sm text-gray-500 mt-3">
            {competitionLevel === 'low' && '진입하기 좋습니다'}
            {competitionLevel === 'medium' && '적절한 경쟁 수준'}
            {competitionLevel === 'high' && '치열한 경쟁'}
          </div>
        </div>

        {/* Recommendation */}
        <div className="glass-light rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">추천도</div>
          <Icon className={`w-12 h-12 ${recommendation.color} mx-auto mb-3`} />
          <div className={`text-sm font-semibold ${recommendation.color}`}>
            {recommendation.text}
          </div>
        </div>
      </div>
    </Card>
  )
}

