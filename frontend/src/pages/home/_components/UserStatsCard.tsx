import ProgressBar from '../../../components/ui/ProgressBar'
import { User } from '../../../types'

interface UserStatsCardProps {
  user: User
}

export default function UserStatsCard({ user }: UserStatsCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 w-72 shrink-0">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-50">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-200 to-orange-100 rounded-full flex items-center justify-center text-2xl border-2 border-orange-200 shadow-sm">
          👦
        </div>
        <div>
          <div className="font-black text-gray-800 text-base">{user.name}</div>
          <div className="text-sm text-gray-400 flex items-center gap-1">
            Cấp độ {user.level}
            <span className="text-gray-300">▾</span>
          </div>
        </div>
      </div>

      {/* Stars & Badges */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="w-9 h-9 bg-yellow-50 rounded-xl flex items-center justify-center text-xl">
            ⭐
          </div>
          <div>
            <div className="font-black text-gray-800 text-lg leading-none">{user.stars}</div>
            <div className="text-xs text-gray-400">Sao</div>
          </div>
        </div>
        <div className="w-px h-10 bg-gray-100" />
        <div className="flex items-center gap-2 flex-1">
          <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
            🛡️
          </div>
          <div>
            <div className="font-black text-gray-800 text-lg leading-none">{user.badges}</div>
            <div className="text-xs text-gray-400">Huy hiệu</div>
          </div>
        </div>
      </div>

      {/* Lessons completed */}
      <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3 mb-4">
        <span className="text-2xl">📚</span>
        <div>
          <span className="font-black text-gray-800 text-lg">{user.lessonsCompleted}</span>
          <span className="text-sm text-gray-500 ml-1.5">Bài học đã học</span>
        </div>
      </div>

      {/* Weekly progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600">Tiến trình tuần này</span>
          <span className="text-sm font-bold text-orange-500">{user.weeklyProgress}%</span>
        </div>
        <ProgressBar value={user.weeklyProgress} />
      </div>

      <button className="w-full text-center text-blue-500 font-bold text-sm py-2.5 border border-blue-100 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-1">
        Xem chi tiết
        <span className="text-blue-300">›</span>
      </button>
    </div>
  )
}
