'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import Card from '@/components/ui/Card'

interface ContentDistributionPieProps {
  data?: Array<{
    name: string
    value: number
  }>
}

const defaultData = [
  { name: '엔터테인먼트', value: 28 },
  { name: '교육', value: 22 },
  { name: '금융', value: 15 },
  { name: '기술', value: 18 },
  { name: '라이프스타일', value: 12 },
  { name: '기타', value: 5 },
]

const COLORS = ['#00E5FF', '#FF00FF', '#FFD700', '#00FF88', '#FF6B6B', '#A78BFA']

const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  // 5% 이하는 표시하지 않음
  if (percent < 0.05) return null

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      style={{ 
        fontSize: '14px', 
        fontWeight: 'bold',
        textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6)'
      }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <div 
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          border: '2px solid rgba(255,255,255,0.2)',
          borderRadius: '12px',
          padding: '12px 16px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
      >
        <p style={{ 
          color: '#fff', 
          fontWeight: 'bold', 
          fontSize: '15px',
          marginBottom: '4px'
        }}>
          {data.name}
        </p>
        <p style={{ 
          color: '#00E5FF', 
          fontSize: '14px',
          fontWeight: '600'
        }}>
          {data.value}개 주제 ({((data.value / data.payload.total) * 100 || data.percent * 100).toFixed(1)}%)
        </p>
      </div>
    )
  }
  return null
}

export default function ContentDistributionPie({ data = defaultData }: ContentDistributionPieProps) {
  return (
    <Card className="w-full">
      <h3 className="text-xl font-semibold text-white mb-6">추천 주제 카테고리 분포</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <defs>
            {COLORS.map((color, index) => (
              <linearGradient key={index} id={`pieGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.7} />
              </linearGradient>
            ))}
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#pieGradient${index % COLORS.length})`}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value, entry: any) => (
              <span style={{ color: '#E5E7EB', fontSize: '13px' }}>
                {value} ({entry.payload.value}개)
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}

