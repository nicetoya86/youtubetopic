import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { TrendingUp, BarChart3 } from 'lucide-react'
import Card from '@/components/ui/Card'

export const metadata = {
  title: '트렌드 분석 - YouTubeTopic',
  description: '유튜브 컨텐츠 트렌드를 실시간으로 분석합니다.',
}

export default function TrendsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 to-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 glass-light px-4 py-2 rounded-full">
              <TrendingUp className="w-4 h-4 text-primary-cyan" />
              <span className="text-sm text-gray-300">실시간 데이터 분석</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              <span className="text-gradient">트렌드 분석</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              유튜브 컨텐츠 트렌드를 실시간으로 분석하여
              <br className="hidden sm:block" />
              수익성 높은 주제를 찾아드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Coming Soon Card */}
            <Card className="text-center py-16">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-primary-cyan/20 rounded-full flex items-center justify-center mx-auto">
                  <BarChart3 className="w-10 h-10 text-primary-cyan" />
                </div>
                
                <h2 className="text-3xl font-bold text-white">
                  트렌드 분석 기능 준비중
                </h2>
                
                <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                  실시간 트렌드 그래프, 카테고리별 성장률, 경쟁 분석 등<br />
                  강력한 분석 도구를 곧 제공할 예정입니다.
                </p>

                <div className="pt-6">
                  <div className="inline-flex items-center space-x-2 text-primary-cyan">
                    <div className="w-2 h-2 bg-primary-cyan rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold">개발 진행 중</span>
                  </div>
                </div>

                {/* Feature Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                  <div className="glass-light rounded-xl p-6">
                    <h3 className="font-semibold text-white mb-2">실시간 트렌드</h3>
                    <p className="text-sm text-gray-400">
                      시간별 조회수 변화 추이
                    </p>
                  </div>
                  
                  <div className="glass-light rounded-xl p-6">
                    <h3 className="font-semibold text-white mb-2">카테고리 분석</h3>
                    <p className="text-sm text-gray-400">
                      분야별 성장률 비교
                    </p>
                  </div>
                  
                  <div className="glass-light rounded-xl p-6">
                    <h3 className="font-semibold text-white mb-2">경쟁 지수</h3>
                    <p className="text-sm text-gray-400">
                      주제별 경쟁 강도 측정
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Temporary Info */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                현재는 <a href="/shorts" className="text-primary-cyan hover:underline">숏폼 추천</a>과{' '}
                <a href="/long-form" className="text-primary-cyan hover:underline">롱폼 추천</a> 기능을 이용하실 수 있습니다.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

