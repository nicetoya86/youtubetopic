import Card from '@/components/ui/Card'

interface CategoryPieChartProps {
  data: any[]
}

const CATEGORY_NAMES: { [key: string]: string } = {
  '1': '영화/애니메이션',
  '2': '자동차/차량',
  '10': '음악',
  '15': '애완동물/동물',
  '17': '스포츠',
  '19': '여행/이벤트',
  '20': '게임',
  '22': '인물/블로그',
  '23': '코미디',
  '24': '엔터테인먼트',
  '25': '뉴스/정치',
  '26': '하우투/스타일',
  '27': '교육',
  '28': '과학/기술',
  '29': '비영리/사회운동',
  '30': '영화',
  '31': '애니메이션',
  '32': '액션/모험',
  '33': 'SF/판타지',
  '34': '스릴러',
  '35': '단편',
  '36': '드라마',
  '37': '가족',
  '38': '외국영화',
  '39': '공포',
  '40': '로맨스',
  '41': '다큐멘터리',
  '42': '전쟁',
  '43': '범죄',
  '44': '전기'
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

