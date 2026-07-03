import ExploreZoneCard from './ExploreZoneCard'
import { EXPLORE_ZONES } from './exploreZoneMapData'

interface ExploreDesktopZoneListProps {
  indices: number[]
  hoveredZoneIdx: number | null
  onHoverChange: (zoneIdx: number | null) => void
  onNavigate: (zoneIdx: number) => void
}

export default function ExploreDesktopZoneList({
  indices,
  hoveredZoneIdx,
  onHoverChange,
  onNavigate,
}: ExploreDesktopZoneListProps) {
  return (
    <div className="flex flex-col gap-[24px] pointer-events-auto">
      {indices.map((index) => (
        <ExploreZoneCard
          key={index}
          zone={EXPLORE_ZONES[index]}
          isHovered={hoveredZoneIdx === index}
          onHoverStart={() => onHoverChange(index)}
          onHoverEnd={() => onHoverChange(null)}
          onClick={() => onNavigate(index)}
        />
      ))}
    </div>
  )
}
