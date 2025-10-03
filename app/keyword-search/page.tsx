'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import KeywordSearchBar from '@/components/keyword/KeywordSearchBar'
import AnalysisResults from '@/components/keyword/AnalysisResults'
import { Search } from 'lucide-react'
import Badge from '@/components/ui/Badge'

export default function KeywordSearchPage() {
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (result: any) => {
    setAnalysisResult(result)
  }

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading)
  }

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
              <Search className="w-4 h-4 mr-2" />
              AI 키워드 분석
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              키워드 검색 & 분석
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              궁금한 키워드를 입력하고 실시간 분석 결과를 확인하세요
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <KeywordSearchBar 
              onSearch={handleSearch}
              onLoadingChange={handleLoadingChange}
            />
          </motion.div>

          {/* Analysis Results */}
          {analysisResult && (
            <AnalysisResults 
              data={analysisResult}
              isLoading={isLoading}
            />
          )}

          {/* Empty State */}
          {!analysisResult && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-primary-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-primary-cyan" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  키워드를 검색해보세요
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  관심 있는 주제나 키워드를 입력하면<br />
                  AI가 최근 1년 데이터를 분석하여<br />
                  수익성과 경쟁도를 알려드립니다.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

