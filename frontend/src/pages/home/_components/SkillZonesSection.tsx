import { SkillZone } from '../../../types'
import DailyChallengeCard from './DailyChallengeCard'
import SkillZoneCard from './SkillZoneCard'

const zones: SkillZone[] = [
  {
    id: '1',
    name: 'Rừng Cảm Xúc',
    lessons: 12,
    emoji: '🌳',
    gradient: 'linear-gradient(145deg, #FBBF24, #F97316)',
  },
  {
    id: '2',
    name: 'Thành Phố Giao Tiếp',
    lessons: 15,
    emoji: '🏙️',
    gradient: 'linear-gradient(145deg, #38BDF8, #0284C7)',
  },
  {
    id: '3',
    name: 'Làng Tự Lập',
    lessons: 10,
    emoji: '🏡',
    gradient: 'linear-gradient(145deg, #4ADE80, #16A34A)',
  },
  {
    id: '4',
    name: 'Khu Vườn Bạn Bè',
    lessons: 12,
    emoji: '🐰',
    gradient: 'linear-gradient(145deg, #C084FC, #9333EA)',
  },
  {
    id: '5',
    name: 'Hành Tinh Tình Huống',
    lessons: 14,
    emoji: '🚀',
    gradient: 'linear-gradient(145deg, #475569, #1E293B)',
  },
]

export default function SkillZonesSection() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-8 items-start">
          {/* Zones grid */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-black text-gray-800 mb-6">
              Khám phá 5 vùng đất kỹ năng
            </h2>
            <div className="grid grid-cols-5 gap-4">
              {zones.map((zone) => (
                <SkillZoneCard key={zone.id} zone={zone} />
              ))}
            </div>
          </div>

          {/* Daily challenge */}
          <div className="w-64 shrink-0">
            <DailyChallengeCard />
          </div>
        </div>
      </div>
    </section>
  )
}
