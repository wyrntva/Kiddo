import { Play } from 'lucide-react'
import Button from '../../../components/ui/Button'
import { User } from '../../../types'
import UserStatsCard from './UserStatsCard'

const mockUser: User = {
  name: 'Bé An',
  level: 3,
  stars: 120,
  badges: 8,
  lessonsCompleted: 18,
  weeklyProgress: 65,
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-50">
      {/* Background decorations */}
      <div className="absolute top-6 left-1/4 w-40 h-20 bg-white/50 rounded-full blur-xl" />
      <div className="absolute top-20 left-1/2 w-28 h-14 bg-white/40 rounded-full blur-lg" />
      <div className="absolute bottom-0 right-0 w-96 h-64 bg-blue-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 py-12 flex items-center gap-6">
        {/* Left: text content */}
        <div className="flex-1 min-w-0 z-10">
          <h1 className="text-4xl xl:text-5xl font-black text-blue-900 leading-tight mb-1">
            Học kỹ năng sống
          </h1>
          <h1 className="text-4xl xl:text-5xl font-black text-orange-500 leading-tight mb-5">
            qua những cuộc phiêu lưu
          </h1>
          <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-sm">
            KIDDO đồng hành cùng bé phát triển cảm xúc, giao tiếp, tự lập và nhiều kỹ năng quan trọng mỗi ngày.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg">
              <Play size={18} className="fill-white" />
              Bắt đầu hành trình
            </Button>
            <Button variant="outline" size="lg">
              Khám phá ngay
            </Button>
          </div>
        </div>

        {/* Center: Game world illustration */}
        <div className="flex-1 relative flex items-end justify-center min-h-[420px] z-10">
          <GameWorld />
        </div>

        {/* Right: User stats card */}
        <div className="z-10">
          <UserStatsCard user={mockUser} />
        </div>
      </div>
    </section>
  )
}

function GameWorld() {
  return (
    <div className="relative w-full max-w-[420px] h-[420px]">
      {/* Sky map background */}
      <div className="absolute inset-x-4 top-0 bottom-16 bg-gradient-to-b from-sky-400 via-sky-300 to-blue-400 rounded-3xl shadow-2xl overflow-hidden">
        {/* Water/ground */}
        <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-blue-500/60 to-transparent" />

        {/* Clouds */}
        <div className="absolute top-6 left-8 flex gap-1 opacity-90">
          <div className="w-10 h-5 bg-white rounded-full" />
          <div className="w-14 h-6 bg-white rounded-full -ml-3 mt-1" />
          <div className="w-8 h-5 bg-white rounded-full -ml-2" />
        </div>
        <div className="absolute top-10 right-10 flex gap-1 opacity-80">
          <div className="w-8 h-4 bg-white rounded-full" />
          <div className="w-12 h-5 bg-white rounded-full -ml-2 mt-1" />
        </div>

        {/* Island 1 - left with trees */}
        <div className="absolute bottom-24 left-8">
          <div className="w-20 h-10 bg-green-500 rounded-full shadow-md" />
          <div className="absolute -top-8 left-3 text-3xl">🌲</div>
          <div className="absolute -top-6 right-3 text-2xl">🌳</div>
        </div>

        {/* Island 2 - center large with castle */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <div className="w-28 h-14 bg-emerald-500 rounded-full shadow-lg" />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-4xl">🏰</div>
        </div>

        {/* Island 3 - right with rocket */}
        <div className="absolute bottom-16 right-8">
          <div className="w-18 h-10 bg-green-400 rounded-full shadow-md" style={{ width: '72px' }} />
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-3xl animate-float">🚀</div>
        </div>

        {/* Small floating island top */}
        <div className="absolute top-20 left-16">
          <div className="w-12 h-7 bg-green-300 rounded-full shadow" />
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xl">🏠</div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-8 right-1/3 text-2xl animate-float-slow">💬</div>
        <div className="absolute top-16 left-1/3 text-xl animate-float">❤️</div>
        <div className="absolute bottom-32 right-16 text-lg animate-pulse">✨</div>
      </div>

      {/* Otter mascot - standing in front */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <div className="relative">
          {/* Body shadow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/10 rounded-full blur-sm" />
          {/* Otter */}
          <div className="w-36 h-36 relative flex items-center justify-center">
            <span className="text-8xl select-none filter drop-shadow-lg">🦦</span>
            {/* Overalls K badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-black text-base border-2 border-white shadow-md">
              K
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
