import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '@/components/ui/Card'

interface KeywordTrendChartProps {
  data: any[]
  keyword: string
}

export default function KeywordTrendChart({ data, keyword }: KeywordTrendChartProps) {
  return (
    <Card glass>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-2">월별 업로드 트렌드</h3>
        <p className="text-sm text-gray-400">
          해당 키워드로 업로드된 영상 수를 월별로 집계한 데이터입니다
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#00E5FF" stopOpacity={0.6} />
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
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
            }}
            labelStyle={{ color: '#fff', fontWeight: 'bold' }}
          />
          <Bar 
            dataKey="upload_count" 
            name="업로드 수"
            fill="url(#trendGradient)" 
            radius={[8, 8, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

