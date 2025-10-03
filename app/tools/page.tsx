'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Calculator, DollarSign, TrendingUp } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function ToolsPage() {
  const [views, setViews] = useState<string>('100000')
  const [category, setCategory] = useState<string>('tech')

  const categories = [
    { value: 'finance', label: '금융/투자', cpm: { min: 12, max: 18 } },
    { value: 'education', label: '교육/강의', cpm: { min: 8, max: 15 } },
    { value: 'tech', label: '테크/리뷰', cpm: { min: 6, max: 12 } },
    { value: 'business', label: '비즈니스', cpm: { min: 7, max: 14 } },
    { value: 'health', label: '건강/피트니스', cpm: { min: 5, max: 10 } },
    { value: 'cooking', label: '요리/레시피', cpm: { min: 4, max: 8 } },
    { value: 'gaming', label: '게임', cpm: { min: 2, max: 6 } },
    { value: 'entertainment', label: '엔터테인먼트', cpm: { min: 2, max: 5 } },
  ]

  const selectedCategory = categories.find(c => c.value === category) || categories[0]
  const viewCount = parseInt(views.replace(/,/g, '')) || 0
  
  // CPM 기반 수익 계산 (조회수 / 1000 * CPM)
  const minRevenue = (viewCount / 1000) * selectedCategory.cpm.min
  const maxRevenue = (viewCount / 1000) * selectedCategory.cpm.max
  const avgRevenue = (minRevenue + maxRevenue) / 2

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: string) => {
    const value = num.replace(/,/g, '')
    if (!value) return ''
    return parseInt(value).toLocaleString('ko-KR')
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 to-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 glass-light px-4 py-2 rounded-full">
              <Calculator className="w-4 h-4 text-primary-cyan" />
              <span className="text-sm text-gray-300">무료 도구</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              <span className="text-gradient">수익 계산기</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              예상 조회수와 카테고리를 입력하면 광고 수익을 예측해드립니다.
              실제 수익은 지역, 시청자층, 시즌에 따라 달라질 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="!p-8 md:!p-12">
              <div className="space-y-8">
                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Views Input */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-300">
                      예상 조회수
                    </label>
                    <input
                      type="text"
                      value={views}
                      onChange={(e) => setViews(formatNumber(e.target.value))}
                      placeholder="100,000"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-cyan focus:outline-none transition-colors"
                    />
                    <p className="text-xs text-gray-500">
                      월간 예상 조회수를 입력하세요
                    </p>
                  </div>

                  {/* Category Select */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-300">
                      컨텐츠 카테고리
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:border-primary-cyan focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label} (CPM: ${cat.cpm.min}-${cat.cpm.max})
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500">
                      제작할 컨텐츠 카테고리를 선택하세요
                    </p>
                  </div>
                </div>

                {/* Results */}
                <div className="pt-8 border-t border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-primary-cyan" />
                    <span>예상 수익</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="glass-light rounded-xl p-6 text-center">
                      <div className="text-sm text-gray-400 mb-2">최소 예상</div>
                      <div className="text-2xl md:text-3xl font-bold text-green-400">
                        {formatCurrency(minRevenue)}
                      </div>
                    </div>
                    
                    <div className="glass rounded-xl p-6 text-center border-2 border-primary-cyan/50">
                      <div className="text-sm text-gray-400 mb-2">평균 예상</div>
                      <div className="text-2xl md:text-3xl font-bold text-gradient">
                        {formatCurrency(avgRevenue)}
                      </div>
                    </div>
                    
                    <div className="glass-light rounded-xl p-6 text-center">
                      <div className="text-sm text-gray-400 mb-2">최대 예상</div>
                      <div className="text-2xl md:text-3xl font-bold text-primary-cyan">
                        {formatCurrency(maxRevenue)}
                      </div>
                    </div>
                  </div>

                  {/* Info Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/30 rounded-lg p-4 border border-white/5">
                      <div className="flex items-start space-x-3">
                        <TrendingUp className="w-5 h-5 text-primary-cyan mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white mb-1">선택한 카테고리</h4>
                          <p className="text-sm text-gray-400">
                            {selectedCategory.label} - CPM ${selectedCategory.cpm.min}-${selectedCategory.cpm.max}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-800/30 rounded-lg p-4 border border-white/5">
                      <div className="flex items-start space-x-3">
                        <Calculator className="w-5 h-5 text-primary-pink mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white mb-1">계산 방식</h4>
                          <p className="text-sm text-gray-400">
                            (조회수 / 1,000) × CPM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <p className="text-xs text-amber-400">
                      ⚠️ 이 계산기는 예상 수익을 대략적으로 보여줍니다. 실제 수익은 시청자 지역, 광고주 수요, 시청 시간, 
                      광고 차단 비율 등 여러 요인에 따라 달라질 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Additional Info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary-cyan/20 rounded-xl flex items-center justify-center mx-auto">
                    <DollarSign className="w-6 h-6 text-primary-cyan" />
                  </div>
                  <h3 className="text-lg font-bold text-white">높은 CPM 팁</h3>
                  <p className="text-sm text-gray-400">
                    금융, 교육, 비즈니스 카테고리가 일반적으로 높은 CPM을 기록합니다.
                  </p>
                </div>
              </Card>

              <Card className="text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary-pink/20 rounded-xl flex items-center justify-center mx-auto">
                    <TrendingUp className="w-6 h-6 text-primary-pink" />
                  </div>
                  <h3 className="text-lg font-bold text-white">시청 시간 중요</h3>
                  <p className="text-sm text-gray-400">
                    긴 시청 시간은 더 많은 광고 노출과 높은 수익으로 이어집니다.
                  </p>
                </div>
              </Card>

              <Card className="text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto">
                    <Calculator className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">일관성 유지</h3>
                  <p className="text-sm text-gray-400">
                    정기적인 업로드가 알고리즘에 유리하며 안정적인 수익을 보장합니다.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

