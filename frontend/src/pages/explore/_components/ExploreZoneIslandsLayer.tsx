import { EXPLORE_ISLANDS, EXPLORE_ZONES } from './exploreZoneMapData'

interface ExploreZoneIslandsLayerProps {
  activeZoneIdx?: number
  hoveredZoneIdx: number | null
  mobile?: boolean
  onActivate: (zoneIdx: number) => void
  onNavigate: (zoneIdx: number) => void
  onHoverChange?: (zoneIdx: number | null) => void
}

export default function ExploreZoneIslandsLayer({
  activeZoneIdx,
  hoveredZoneIdx,
  mobile = false,
  onActivate,
  onNavigate,
  onHoverChange,
}: ExploreZoneIslandsLayerProps) {
  return (
    <>
      {EXPLORE_ISLANDS.map((island, index) => {
        const isActive = activeZoneIdx === island.zoneIdx
        const isHovered = hoveredZoneIdx === island.zoneIdx
        const zone = EXPLORE_ZONES[island.zoneIdx]
        const tooltipBelow = island.zoneIdx === 2

        return (
          <div
            key={index}
            className="absolute cursor-pointer select-none transition-all duration-300"
            style={{
              left: island.left,
              top: island.top,
              width: island.width,
              height: island.height,
              zIndex: mobile ? 2 : isHovered ? 5 : 2,
              animationDelay: island.delay,
              filter: mobile
                ? isActive || isHovered
                  ? `drop-shadow(0 0 35px ${island.color})`
                  : 'drop-shadow(0 10px 15px rgba(0, 40, 70, 0.25))'
                : isHovered
                  ? `drop-shadow(0 0 30px ${island.color}) drop-shadow(0 0 60px ${island.color}80)`
                  : 'drop-shadow(0 10px 15px rgba(0, 40, 70, 0.25))',
              transform: mobile
                ? isActive || isHovered
                  ? 'scale(1.1) translateY(-6px)'
                  : 'scale(1)'
                : isHovered
                  ? 'scale(1.12) translateY(-12px)'
                  : 'scale(1)',
              transition: mobile ? undefined : 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.35s ease',
            }}
            onMouseEnter={mobile ? undefined : () => onHoverChange?.(island.zoneIdx)}
            onMouseLeave={mobile ? undefined : () => onHoverChange?.(null)}
            onClick={() => {
              if (mobile) {
                if (isActive) {
                  onNavigate(island.zoneIdx)
                } else {
                  onActivate(island.zoneIdx)
                }
                return
              }

              onNavigate(island.zoneIdx)
            }}
          >
            {!mobile && (
              <div
                className="absolute left-1/2 font-baloo font-bold text-white text-[18px] px-5 py-2 rounded-full whitespace-nowrap pointer-events-none"
                style={{
                  transform: 'translateX(-50%)',
                  ...(tooltipBelow ? { bottom: -48 } : { top: -48 }),
                  backgroundColor: island.color,
                  boxShadow: `0 4px 16px ${island.color}66`,
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.25s ease',
                }}
              >
                {zone.name.replace('\n', ' ')}
              </div>
            )}
            <img src={island.img} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', position: 'relative', zIndex: 2 }} />
          </div>
        )
      })}
    </>
  )
}
