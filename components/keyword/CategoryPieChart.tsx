import Card from '@/components/ui/Card'

interface CategoryPieChartProps {
  data: any[]
}

const CATEGORY_NAMES: { [key: string]: string } = {
  '1': '영화/애니',
  '10': '음악',
  '20': '게임',
  '22': '인물/블로그',
  '24': '엔터테인먼트',
  '25': '뉴스/정치',
  '26': '하우투/스타일',
  '27': '교육',
  '28': '과학/기술',
}

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0)

  return (
    <Card glass>
      <h3 className="text-xl font-semibold text-white mb-6">카테고리 분포</h3>
      <div className="space-y-3">
        {data.slice(0, 5).map((item, index) => {
          const percentage = ((item.count / total) * 100).toFixed(1)
          const categoryName = CATEGORY_NAMES[item.category_id] || `카테고리 ${item.category_id}`
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">{categoryName}</span>
                <span className="text-primary-cyan font-semibold">{percentage}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-cyan to-primary-pink rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

