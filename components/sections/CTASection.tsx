import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/20 via-primary-blue/20 to-primary-pink/20"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-cyan/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-pink/20 rounded-full filter blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Icon */}
          <div className="inline-flex p-4 glass rounded-2xl">
            <Sparkles className="w-12 h-12 text-primary-cyan" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            지금 바로 <span className="text-gradient">시작하세요</span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            무료로 모든 기능을 이용할 수 있습니다.
            <br className="hidden sm:block" />
            데이터 기반 추천으로 여러분의 유튜브 수익을 극대화하세요.
          </p>

          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto py-6">
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <div className="w-2 h-2 bg-primary-cyan rounded-full"></div>
              <span className="text-sm">회원가입 불필요</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <div className="w-2 h-2 bg-primary-cyan rounded-full"></div>
              <span className="text-sm">매월 무료 업데이트</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <div className="w-2 h-2 bg-primary-cyan rounded-full"></div>
              <span className="text-sm">실시간 데이터</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/shorts" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto group">
                주제 추천 받기
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/keyword-search" className="w-full sm:w-auto">
              <Button size="lg" variant="ghost" className="w-full sm:w-auto">
                키워드 검색하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

