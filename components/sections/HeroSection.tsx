'use client'

import { ArrowRight, TrendingUp } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50"></div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-cyan/30 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-pink/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 glass-light px-4 py-2 rounded-full">
            <TrendingUp className="w-4 h-4 text-primary-cyan" />
            <span className="text-sm text-gray-300">매월 1일 새로운 주제 업데이트</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            데이터로 찾는
            <br />
            <span className="text-gradient">수익형 컨텐츠</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            AI가 분석한 유튜브 트렌드로 숏폼과 롱폼 주제를 추천받으세요.
            <br className="hidden sm:block" />
            높은 수익성, 낮은 경쟁의 컨텐츠 주제를 지금 바로 시작하세요.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" variant="primary" className="w-full sm:w-auto group">
              숏폼 주제 보기
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              롱폼 주제 보기
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto pt-8">
            <div className="glass-light rounded-2xl p-4 md:p-6">
              <div className="text-2xl md:text-4xl font-bold text-gradient">150+</div>
              <div className="text-xs md:text-sm text-gray-400 mt-1">추천 주제</div>
            </div>
            <div className="glass-light rounded-2xl p-4 md:p-6">
              <div className="text-2xl md:text-4xl font-bold text-gradient">98%</div>
              <div className="text-xs md:text-sm text-gray-400 mt-1">데이터 정확도</div>
            </div>
            <div className="glass-light rounded-2xl p-4 md:p-6">
              <div className="text-2xl md:text-4xl font-bold text-gradient">24/7</div>
              <div className="text-xs md:text-sm text-gray-400 mt-1">실시간 분석</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

