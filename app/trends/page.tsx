'use client'

import { motion } from 'framer-motion'
import { TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react'
import ViewsTrendChart from '@/components/charts/ViewsTrendChart'
import CategoryComparisonChart from '@/components/charts/CategoryComparisonChart'
import TopicAnalysisRadar from '@/components/charts/TopicAnalysisRadar'
import ContentDistributionPie from '@/components/charts/ContentDistributionPie'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function TrendsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge variant="accent" className="mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              실시간 분석
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              트렌드 분석 대시보드
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              AI가 분석한 유튜브 데이터로 최적의 주제를 찾아보세요
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <Card glass hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">총 추천 주제</p>
                  <p className="text-3xl font-bold text-gradient">152</p>
                </div>
                <div className="p-3 bg-primary-cyan/20 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-primary-cyan" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-400">↑ 12%</span>
                <span className="text-gray-400 ml-2">지난달 대비</span>
              </div>
            </Card>

            <Card glass hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">평균 조회수</p>
                  <p className="text-3xl font-bold text-gradient">85K</p>
                </div>
                <div className="p-3 bg-primary-pink/20 rounded-xl">
                  <Activity className="w-6 h-6 text-primary-pink" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-400">↑ 8%</span>
                <span className="text-gray-400 ml-2">지난달 대비</span>
              </div>
            </Card>

            <Card glass hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">평균 CPM</p>
                  <p className="text-3xl font-bold text-gradient">$12.5</p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-400">↑ 15%</span>
                <span className="text-gray-400 ml-2">지난달 대비</span>
              </div>
            </Card>

            <Card glass hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">활성 카테고리</p>
                  <p className="text-3xl font-bold text-gradient">18</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <PieChart className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-400">↑ 3</span>
                <span className="text-gray-400 ml-2">새로 추가됨</span>
              </div>
            </Card>
          </motion.div>

          {/* Charts Grid */}
          <div className="space-y-8">
            {/* Row 1: Line Chart (Full Width) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ViewsTrendChart />
            </motion.div>

            {/* Row 2: Radar + Pie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <TopicAnalysisRadar />
              <ContentDistributionPie />
            </motion.div>

            {/* Row 3: Bar Chart (Full Width) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <CategoryComparisonChart />
            </motion.div>
          </div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12"
          >
            <Card glass className="text-center">
              <TrendingUp className="w-12 h-12 text-primary-cyan mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                매월 1일 자동 업데이트
              </h3>
              <p className="text-gray-400">
                최신 YouTube 트렌드 데이터를 기반으로 주제가 자동으로 갱신됩니다.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
