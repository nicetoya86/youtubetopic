'use client'

import { motion } from 'framer-motion'
import ScoreCard from './ScoreCard'
import ComparisonCards from './ComparisonCards'
import KeywordTrendChart from './KeywordTrendChart'
import CategoryPieChart from './CategoryPieChart'
import TopChannelsTable from './TopChannelsTable'
import InsightsList from './InsightsList'

interface AnalysisResultsProps {
  data: any
  isLoading: boolean
}

export default function AnalysisResults({ data, isLoading }: AnalysisResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Loading Skeleton */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse glass rounded-2xl p-6">
            <div className="h-40 bg-slate-700/50 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (data.no_results) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-12 text-center"
      >
        <p className="text-xl text-gray-300">
          &apos;{data.keyword}&apos; 키워드에 대한 검색 결과가 없습니다.
        </p>
        <p className="text-gray-500 mt-2">
          다른 키워드로 다시 시도해보세요.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ScoreCard
          keyword={data.keyword}
          revenueScore={data.revenue_score}
          competitionLevel={data.competition_level}
          totalVideos={data.total_videos}
        />
      </motion.div>

      {/* Comparison Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <ComparisonCards
          shortsAnalysis={data.shorts_analysis}
          longAnalysis={data.long_analysis}
        />
      </motion.div>

      {/* Insights */}
      {data.insights && data.insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <InsightsList insights={data.insights} />
        </motion.div>
      )}

      {/* Charts */}
      {data.trend_data && data.trend_data.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <KeywordTrendChart data={data.trend_data} keyword={data.keyword} />
        </motion.div>
      )}

      {/* Category Distribution & Top Channels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {data.category_distribution && data.category_distribution.length > 0 && (
          <CategoryPieChart data={data.category_distribution} />
        )}

        {data.top_channels && data.top_channels.length > 0 && (
          <TopChannelsTable channels={data.top_channels} />
        )}
      </motion.div>
    </div>
  )
}

