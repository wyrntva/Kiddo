import ExploreCloudLayer from './ExploreCloudLayer'
import ExploreDesktopZoneList from './ExploreDesktopZoneList'
import ExploreZoneIslandsLayer from './ExploreZoneIslandsLayer'
import ExploreZoneMapHeader from './ExploreZoneMapHeader'

const imgBg = '/assets/khampha-display.webp'

interface ExploreDesktopZoneMapProps {
  wrapperRef: React.RefObject<HTMLDivElement>
  hoveredZoneIdx: number | null
  scale: number
  height: number
  designWidth: number
  designHeight: number
  desktopVisibleHeight: number
  onHoverChange: (zoneIdx: number | null) => void
  onNavigate: (zoneIdx: number) => void
}

export default function ExploreDesktopZoneMap({
  wrapperRef,
  hoveredZoneIdx,
  scale,
  height,
  designWidth,
  designHeight,
  desktopVisibleHeight,
  onHoverChange,
  onNavigate,
}: ExploreDesktopZoneMapProps) {
  return (
    <div ref={wrapperRef} className="w-full flex-1 min-h-0 hidden xl:block">
      <div
        className="relative rounded-[24px] overflow-hidden shadow-2xl bg-[#93cbee]"
        style={{ width: designWidth, height: scale > 0 ? height / scale : desktopVisibleHeight, transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        <div
          className="absolute left-0 top-0"
          style={{ width: designWidth, height: designHeight }}
        >
          <img src={imgBg} alt="" className="absolute inset-0 pointer-events-none select-none w-full h-full" loading="lazy" decoding="async" />
          <ExploreCloudLayer />
          <ExploreZoneIslandsLayer
            hoveredZoneIdx={hoveredZoneIdx}
            onActivate={() => {}}
            onNavigate={onNavigate}
            onHoverChange={onHoverChange}
          />
        </div>

        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none" style={{ zIndex: 10, padding: '24px 24px 24px 24px', gap: 24 }}>
          <div className="flex flex-col items-center justify-center" style={{ minHeight: 80 }}>
            <ExploreZoneMapHeader />
          </div>

          <div className="flex-1 flex items-center justify-between pointer-events-none min-h-0">
            <ExploreDesktopZoneList
              indices={[0, 1]}
              hoveredZoneIdx={hoveredZoneIdx}
              onHoverChange={onHoverChange}
              onNavigate={onNavigate}
            />
            <ExploreDesktopZoneList
              indices={[2, 3, 4]}
              hoveredZoneIdx={hoveredZoneIdx}
              onHoverChange={onHoverChange}
              onNavigate={onNavigate}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
