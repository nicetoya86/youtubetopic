'use client'

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import Card from '@/components/ui/Card'

interface TopicAnalysisRadarProps {
  data?: Array<{
    metric: string
    shorts: number
    longForm: number
  }>
}

const defaultData = [
  { metric: '조회수', shorts: 95, longForm: 78 },
  { metric: '수익성', shorts: 65, longForm: 92 },
  { metric: '경쟁 난이도', shorts: 85, longForm: 45 },
  { metric: '제작 난이도', shorts: 30, longForm: 75 },
  { metric: '성장 가능성', shorts: 88, longForm: 70 },
  { metric: '지속성', shorts: 55, longForm: 85 },
]

export default function TopicAnalysisRadar({ data = defaultData }: TopicAnalysisRadarProps) {
  return (
    <Card className="w-full">
      <h3 className="text-xl font-semibold text-white mb-6">숏폼 vs 롱폼 분석</h3>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <defs>
            <linearGradient id="shortsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00E5FF" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="longFormGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF00FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FF00FF" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <PolarGrid stroke="rgba(255,255,255,0.2)" />
          <PolarAngleAxis
            dataKey="metric"
            stroke="#E5E7EB"
            style={{ fontSize: '13px', fontWeight: '500' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            stroke="rgba(255,255,255,0.3)"
            style={{ fontSize: '11px' }}
          />
          <Radar
            name="숏폼"
            dataKey="shorts"
            stroke="#00E5FF"
            fill="url(#shortsGradient)"
            fillOpacity={0.6}
            strokeWidth={2}
          />
          <Radar
            name="롱폼"
            dataKey="longForm"
            stroke="#FF00FF"
            fill="url(#longFormGradient)"
            fillOpacity={0.6}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
            }}
            labelStyle={{ color: '#E5E7EB', fontWeight: 'bold' }}
            formatter={(value: any) => [`${value}점`, '']}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
        <div className="glass-light rounded-lg p-4">
          <div className="text-primary-cyan font-semibold mb-2">숏폼 특징</div>
          <ul className="text-gray-300 space-y-1 text-xs">
            <li>• 높은 조회수</li>
            <li>• 빠른 제작</li>
            <li>• 높은 경쟁</li>
          </ul>
        </div>
        <div className="glass-light rounded-lg p-4">
          <div className="text-primary-pink font-semibold mb-2">롱폼 특징</div>
          <ul className="text-gray-300 space-y-1 text-xs">
            <li>• 높은 수익성</li>
            <li>• 낮은 경쟁</li>
            <li>• 장기 지속성</li>
          </ul>
        </div>
      </div>
    </Card>
  )
}

