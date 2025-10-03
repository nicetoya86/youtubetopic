import { Video, Clock, DollarSign, Target, CheckCircle, AlertCircle } from 'lucide-react'
import Card from '@/components/ui/Card'

interface ComparisonCardsProps {
  shortsAnalysis: any
  longAnalysis: any
}

export default function ComparisonCards({ shortsAnalysis, longAnalysis }: ComparisonCardsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const renderAnalysis = (title: string, data: any, type: 'shorts' | 'long') => {
    if (!data) {
      return (
        <Card glass className="text-center py-12">
          <p className="text-gray-500">데이터 없음</p>
        </Card>
      )
    }

    const isGood = data.competition === 'low' || data.avg_views > 50000
    const IconComponent = isGood ? CheckCircle : AlertCircle

    return (
      <Card glass className={type === 'shorts' ? 'border-l-4 border-primary-cyan' : 'border-l-4 border-primary-pink'}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <IconComponent className={isGood ? 'w-6 h-6 text-green-400' : 'w-6 h-6 text-yellow-400'} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center text-gray-400 text-sm mb-1">
              <Video className="w-4 h-4 mr-1" />
              평균 조회수
            </div>
            <div className="text-2xl font-bold text-white">
              {formatNumber(data.avg_views)}
            </div>
          </div>

          <div>
            <div className="flex items-center text-gray-400 text-sm mb-1">
              <DollarSign className="w-4 h-4 mr-1" />
              예상 CPM
            </div>
            <div className="text-2xl font-bold text-white">
              ${data.estimated_cpm.toFixed(1)}
            </div>
          </div>

          <div>
            <div className="flex items-center text-gray-400 text-sm mb-1">
              <Target className="w-4 h-4 mr-1" />
              경쟁도
            </div>
            <div className={`text-2xl font-bold ${
              data.competition === 'low' ? 'text-green-400' :
              data.competition === 'medium' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {data.competition === 'low' ? '낮음' : 
               data.competition === 'medium' ? '중간' : '높음'}
            </div>
          </div>

          <div>
            <div className="flex items-center text-gray-400 text-sm mb-1">
              <Clock className="w-4 h-4 mr-1" />
              권장 길이
            </div>
            <div className="text-2xl font-bold text-white text-sm pt-1">
              {data.recommended_length}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="text-sm text-gray-400">
            참여율: <span className="text-primary-cyan font-semibold">{data.engagement_rate.toFixed(2)}%</span>
            {' • '}
            영상 수: <span className="text-white font-semibold">{data.video_count}개</span>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">숏폼 vs 롱폼 비교</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderAnalysis('숏폼 분석', shortsAnalysis, 'shorts')}
        {renderAnalysis('롱폼 분석', longAnalysis, 'long')}
      </div>
    </div>
  )
}

