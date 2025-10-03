import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import FeatureSection from '@/components/sections/FeatureSection'
import TopicsSection from '@/components/sections/TopicsSection'
import StatisticsSection from '@/components/sections/StatisticsSection'
import CTASection from '@/components/sections/CTASection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeatureSection />
      <TopicsSection />
      <StatisticsSection />
      <CTASection />
      <Footer />
    </main>
  )
}

