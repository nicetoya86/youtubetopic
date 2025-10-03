'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import Card from '@/components/ui/Card'

interface ViewsTrendChartProps {
  data?: Array<{
    month: string
    views: number
    revenue: number
  }>
}

const defaultData = [
  { month: '1월', views: 45000, revenue: 280 },
  { month: '2월', views: 52000, revenue: 320 },
  { month: '3월', views: 48000, revenue: 298 },
  { month: '4월', views: 61000, revenue: 390 },
  { month: '5월', views: 78000, revenue: 510 },
  { month: '6월', views: 85000, revenue: 580 },
  { month: '7월', views: 92000, revenue: 645 },
  { month: '8월', views: 88000, revenue: 612 },
  { month: '9월', views: 95000, revenue: 685 },
  { month: '10월', views: 103000, revenue: 752 },
]

export default function ViewsTrendChart({ data = defaultData }: ViewsTrendChartProps) {
  return (
    <Card className="w-full">
      <h3 className="text-xl font-semibold text-white mb-6">조회수 & 수익 트렌드</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00E5FF" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF00FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FF00FF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            yAxisId="left"
          />
          <YAxis
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            orientation="right"
            yAxisId="right"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
            }}
            labelStyle={{ color: '#E5E7EB' }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#00E5FF"
            strokeWidth={3}
            fill="url(#colorViews)"
            dot={{ fill: '#00E5FF', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7 }}
            yAxisId="left"
            name="조회수"
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#FF00FF"
            strokeWidth={3}
            fill="url(#colorRevenue)"
            dot={{ fill: '#FF00FF', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7 }}
            yAxisId="right"
            name="수익 ($)"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

