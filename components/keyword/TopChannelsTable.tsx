import { Users, Video, Eye } from 'lucide-react'
import Card from '@/components/ui/Card'

interface TopChannelsTableProps {
  channels: any[]
}

export default function TopChannelsTable({ channels }: TopChannelsTableProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <Card glass>
      <h3 className="text-xl font-semibold text-white mb-6">상위 채널 TOP 5</h3>
      <div className="space-y-3">
        {channels.slice(0, 5).map((channel, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 glass-light rounded-lg hover:bg-slate-700/30 transition-colors"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="text-2xl font-bold text-primary-cyan">
                #{index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold truncate">
                  {channel.channel_title}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                  <span className="flex items-center">
                    <Video className="w-3 h-3 mr-1" />
                    {channel.video_count}개
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    평균 {formatNumber(channel.avg_views)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

