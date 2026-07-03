import ExploreCloudLayer from './ExploreCloudLayer'
import ExploreDesktopZoneList from './ExploreDesktopZoneList'
import ExploreZoneIslandsLayer from './ExploreZoneIslandsLayer'
import ExploreZoneMapHeader from './ExploreZoneMapHeader'

const imgBg = '/assets/explore_cover_banner.webp'

interface ExploreDesktopZoneMapProps {
  wrapperRef: React.RefObject<HTMLDivElement>
  hoveredZoneIdx: number | null
  scale: number
  height: number
  designWidth: number
  designHeight: number
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
  onHoverChange,
  onNavigate,
}: ExploreDesktopZoneMapProps) {
  return (
    <div ref={wrapperRef} className="w-full flex-1 min-h-0 hidden xl:block">
      <div
        className="relative rounded-[24px] overflow-hidden shadow-2xl bg-[#93cbee]"
        style={{ width: designWidth, height: scale > 0 ? height / scale : designHeight, transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        <div className="absolute inset-x-0 bottom-0 w-full h-[1026px]" style={{ transform: 'translateY(100px)' }}>
          <img src={imgBg} alt="" className="absolute inset-0 pointer-events-none select-none w-full h-full" loading="lazy" />
          <ExploreCloudLayer />
          <ExploreZoneIslandsLayer
            hoveredZoneIdx={hoveredZoneIdx}
            onActivate={() => {}}
            onNavigate={onNavigate}
            onHoverChange={onHoverChange}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-between pointer-events-none" style={{ zIndex: 10, top: 50, padding: '32px 24px 24px 24px', gap: 24 }}>
          <div className="flex flex-col items-center justify-center" style={{ height: 80, transform: 'translateY(-60px)' }}>
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
