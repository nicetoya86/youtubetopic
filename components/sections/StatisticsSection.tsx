'use client'

import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import ViewsTrendChart from '@/components/charts/ViewsTrendChart'
import TopicAnalysisRadar from '@/components/charts/TopicAnalysisRadar'
import Badge from '@/components/ui/Badge'

export default function StatisticsSection() {
  return (
    <section className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            <BarChart3 className="w-4 h-4 mr-2" />
            데이터 분석
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            실시간 트렌드 통계
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            AI가 분석한 최신 데이터로 수익성 높은 주제를 찾아보세요
          </p>
        </motion.div>

        {/* Charts */}
        <div className="space-y-8">
          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <ViewsTrendChart />
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <TopicAnalysisRadar />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

