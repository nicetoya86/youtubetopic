import { Lightbulb } from 'lucide-react'
import Card from '@/components/ui/Card'

interface InsightsListProps {
  insights: string[]
}

export default function InsightsList({ insights }: InsightsListProps) {
  return (
    <Card glass>
      <div className="flex items-center mb-6">
        <Lightbulb className="w-6 h-6 text-yellow-400 mr-3" />
        <h3 className="text-xl font-semibold text-white">주요 인사이트</h3>
      </div>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 glass-light rounded-lg"
          >
            <div className="text-2xl">{insight.split(' ')[0]}</div>
            <p className="text-gray-300 leading-relaxed pt-1">
              {insight.substring(insight.indexOf(' ') + 1)}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}

