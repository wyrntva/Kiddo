import { SkillZone } from '../../../types'

interface SkillZoneCardProps {
  zone: SkillZone
}

export default function SkillZoneCard({ zone }: SkillZoneCardProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer group transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl shadow-md"
      style={{ background: zone.gradient }}
    >
      <div className="aspect-square flex items-center justify-center text-6xl p-4 group-hover:scale-110 transition-transform duration-200">
        {zone.emoji}
      </div>
      <div className="px-3 pb-4 text-center">
        <div className="font-black text-white text-sm leading-tight mb-1.5">{zone.name}</div>
        <div className="inline-flex items-center gap-1 bg-black/10 rounded-full px-2.5 py-1">
          <span className="text-yellow-300 text-xs">⭐</span>
          <span className="text-white/90 text-xs font-semibold">{zone.lessons} bài học</span>
        </div>
      </div>
    </div>
  )
}
