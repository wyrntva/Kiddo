import { EXPLORE_ISLANDS, EXPLORE_ZONES } from './exploreZoneMapData'
import { useAuth } from '../../../context/AuthContext'

interface ExploreZoneIslandsLayerProps {
  activeZoneIdx?: number
  hoveredZoneIdx: number | null
  dbZones?: any[]
  mobile?: boolean
  onActivate: (zoneIdx: number) => void
  onNavigate: (zoneIdx: number) => void
  onHoverChange?: (zoneIdx: number | null) => void
}

export default function ExploreZoneIslandsLayer({
  activeZoneIdx,
  hoveredZoneIdx,
  dbZones = [],
  mobile = false,
  onActivate,
  onNavigate,
  onHoverChange,
}: ExploreZoneIslandsLayerProps) {
  const { user } = useAuth()

  return (
    <>
      {EXPLORE_ISLANDS.map((island, index) => {
        const isActive = activeZoneIdx === island.zoneIdx
        const isHovered = hoveredZoneIdx === island.zoneIdx
        const zone = EXPLORE_ZONES[island.zoneIdx]
        const tooltipBelow = island.zoneIdx === 2

        const keysMap = ['emotion', 'friendship', 'communication', 'independence', 'situation']
        const key = keysMap[island.zoneIdx]
        const dbZone = dbZones.find(z => z.key === key)
        const lockStatus = dbZone?.lockStatus || 'UNLOCKED'

        const isDev = lockStatus === 'DEV'
        const isPaidLocked = lockStatus === 'PAID' && (!user || !user.isPaid)
        const isLocked = isDev || isPaidLocked

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
                  ? `drop-shadow(0 0 35px ${isLocked ? '#e11d48' : island.color})`
                  : 'drop-shadow(0 10px 15px rgba(0, 40, 70, 0.25))'
                : isHovered
                  ? `drop-shadow(0 0 30px ${isLocked ? '#e11d48' : island.color}) drop-shadow(0 0 60px ${isLocked ? '#e11d48' : island.color}80)`
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
                className="absolute left-1/2 font-baloo font-bold text-white text-[16px] px-5 py-1.5 rounded-full whitespace-nowrap pointer-events-none flex flex-col items-center gap-0.5"
                style={{
                  transform: 'translateX(-50%)',
                  ...(tooltipBelow ? { bottom: -60 } : { top: -60 }),
                  backgroundColor: isLocked ? '#e11d48' : island.color,
                  boxShadow: isLocked ? '0 4px 16px rgba(225, 29, 72, 0.4)' : `0 4px 16px ${island.color}66`,
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.25s ease',
                  zIndex: 20,
                }}
              >
                <span>{zone.name.replace('\n', ' ')}</span>
                {isLocked && (
                  <span className="text-[11px] font-medium opacity-90 leading-none">
                    ({isDev ? 'Đang phát triển' : 'Gói trả phí'})
                  </span>
                )}
              </div>
            )}
            <img src={island.img} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', position: 'relative', zIndex: 2 }} />
            
            {isLocked && (
              <img 
                src="/assets/lock_hand_drawn.png" 
                alt="Locked" 
                className="absolute pointer-events-none select-none"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  width: '80px',
                  height: '80px',
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
                }}
              />
            )}
          </div>
        )
      })}
    </>
  )
}
