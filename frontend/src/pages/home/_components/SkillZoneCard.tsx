import { SkillZone } from '../../../types'

interface SkillZoneCardProps {
  zone: SkillZone
}

export default function SkillZoneCard({ zone }: SkillZoneCardProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer group transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl shadow-md"
    >
      {/* Scene area */}
      <div
        className="relative aspect-square flex items-end justify-center overflow-hidden"
        style={{ background: zone.gradient }}
      >
        {/* Background decorative emojis */}
        {zone.sceneEmojis && (
          <>
            <span className="absolute top-2 left-2 text-xl opacity-80 select-none">{zone.sceneEmojis[0]}</span>
            <span className="absolute top-3 right-3 text-lg opacity-70 select-none">{zone.sceneEmojis[1]}</span>
            <span className="absolute top-6 left-1/2 -translate-x-1/2 text-base opacity-60 select-none">{zone.sceneEmojis[2]}</span>
            <span className="absolute top-2 right-8 text-sm opacity-50 select-none">{zone.sceneEmojis[3]}</span>
          </>
        )}
        {/* Main emoji */}
        <span className="relative text-6xl pb-3 group-hover:scale-110 transition-transform duration-200 drop-shadow-lg select-none">
          {zone.emoji}
        </span>
        {/* Shine effect */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
      </div>

      {/* Info area */}
      <div className="px-3 py-3 text-center bg-white">
        <div className="font-black text-gray-800 text-sm leading-tight mb-1.5">{zone.name}</div>
        <div className="inline-flex items-center gap-1 bg-yellow-50 border border-yellow-100 rounded-full px-2.5 py-1">
          <span className="text-yellow-400 text-xs">⭐</span>
          <span className="text-gray-600 text-xs font-semibold">{zone.lessons} bài học</span>
        </div>
      </div>
    </div>
  )
}
