'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts'
import Card from '@/components/ui/Card'

interface CategoryComparisonChartProps {
  data?: Array<{
    category: string
    avgViews: number
    cpm: number
    competition: number
  }>
}

const defaultData = [
  { category: '엔터테인먼트', avgViews: 125000, cpm: 5.8, competition: 85 },
  { category: '교육', avgViews: 78000, cpm: 12.5, competition: 45 },
  { category: '금융', avgViews: 52000, cpm: 18.2, competition: 32 },
  { category: '기술', avgViews: 95000, cpm: 14.0, competition: 55 },
  { category: '라이프스타일', avgViews: 110000, cpm: 8.5, competition: 68 },
  { category: '게임', avgViews: 145000, cpm: 6.2, competition: 92 },
]

const COLORS = ['#00E5FF', '#FF00FF', '#FFD700', '#00FF88', '#FF6B6B', '#A78BFA']

export default function CategoryComparisonChart({ data = defaultData }: CategoryComparisonChartProps) {
  return (
    <Card className="w-full">
      <h3 className="text-xl font-semibold text-white mb-6">카테고리별 성과 비교</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            {COLORS.map((color, index) => (
              <linearGradient key={index} id={`barGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.9} />
                <stop offset="95%" stopColor={color} stopOpacity={0.6} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="category"
            stroke="#9CA3AF"
            style={{ fontSize: '11px' }}
            angle={-15}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            label={{ value: '평균 조회수', angle: -90, position: 'insideLeft', style: { fill: '#9CA3AF' } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
            }}
            labelStyle={{ color: '#E5E7EB', fontWeight: 'bold' }}
            formatter={(value: any, name: string) => {
              if (name === 'avgViews') return [value.toLocaleString(), '평균 조회수']
              if (name === 'cpm') return [`$${value}`, 'CPM']
              if (name === 'competition') return [`${value}%`, '경쟁도']
              return [value, name]
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => {
              if (value === 'avgViews') return '평균 조회수'
              if (value === 'cpm') return 'CPM ($)'
              if (value === 'competition') return '경쟁도 (%)'
              return value
            }}
          />
          <Bar dataKey="avgViews" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#barGradient${index % COLORS.length})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

