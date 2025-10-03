import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'YouTubeTopic - 데이터로 찾는 수익형 콘텐츠',
  description: 'AI가 분석한 유튜브 트렌드로 숏폼과 롱폼 주제를 추천받으세요. 높은 수익성, 낮은 경쟁의 콘텐츠 주제를 매월 업데이트합니다.',
  keywords: ['유튜브', '콘텐츠 추천', '숏폼', '롱폼', 'YouTube', '수익화', '트렌드'],
  openGraph: {
    title: 'YouTubeTopic',
    description: 'AI가 분석한 유튜브 트렌드, 지금 바로 시작하세요',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

