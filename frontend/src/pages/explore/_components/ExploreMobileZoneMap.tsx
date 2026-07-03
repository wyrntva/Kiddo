import ExploreCloudLayer from './ExploreCloudLayer'
import ExploreZoneCard from './ExploreZoneCard'
import ExploreZoneIslandsLayer from './ExploreZoneIslandsLayer'
import ExploreZoneMapHeader from './ExploreZoneMapHeader'
import { EXPLORE_ZONES } from './exploreZoneMapData'

const imgBg = '/assets/explore_cover_banner.webp'

interface ExploreMobileZoneMapProps {
  activeZoneIdx: number
  hoveredZoneIdx: number | null
  cardContainerRef: React.RefObject<HTMLDivElement>
  scrollContainerRef: React.RefObject<HTMLDivElement>
  designWidth: number
  designHeight: number
  mobileScale: number
  onSetActiveZone: (zoneIdx: number) => void
  onNavigate: (zoneIdx: number) => void
}

export default function ExploreMobileZoneMap({
  activeZoneIdx,
  hoveredZoneIdx,
  cardContainerRef,
  scrollContainerRef,
  designWidth,
  designHeight,
  mobileScale,
  onSetActiveZone,
  onNavigate,
}: ExploreMobileZoneMapProps) {
  return (
    <div className="flex flex-col gap-6 xl:hidden w-full pb-8">
      <div className="mt-2">
        <ExploreZoneMapHeader compact />
      </div>

      <div className="w-full aspect-square max-w-[400px] md:max-w-[600px] mx-auto relative rounded-[24px] overflow-hidden shadow-lg bg-[#93cbee]">
        <div ref={scrollContainerRef} className="w-full h-full overflow-auto scroll-smooth scrollbar-none">
          <div className="relative" style={{ width: designWidth * mobileScale, height: designHeight * mobileScale }}>
            <div
              className="absolute overflow-hidden"
              style={{ width: designWidth, height: designHeight, transform: `scale(${mobileScale})`, transformOrigin: 'top left' }}
            >
              <img src={imgBg} alt="" className="absolute left-0 top-0 w-full h-full object-cover pointer-events-none select-none" loading="lazy" />
              <ExploreCloudLayer />
              <ExploreZoneIslandsLayer
                mobile
                activeZoneIdx={activeZoneIdx}
                hoveredZoneIdx={hoveredZoneIdx}
                onActivate={onSetActiveZone}
                onNavigate={onNavigate}
              />
            </div>
          </div>
        </div>
      </div>

      <div ref={cardContainerRef} className="flex flex-row gap-4 overflow-x-auto pt-3 pb-4 scroll-smooth scrollbar-none snap-x snap-mandatory px-4 -mx-4">
        {EXPLORE_ZONES.map((zone, index) => {
          const isActive = activeZoneIdx === index

          return (
            <div key={index} className="snap-center shrink-0">
              <ExploreZoneCard
                zone={zone}
                isHovered={isActive}
                onHoverStart={() => {}}
                onHoverEnd={() => {}}
                onClick={() => (isActive ? onNavigate(index) : onSetActiveZone(index))}
                className="w-[245px] border-2 transition-all duration-300"
                style={{
                  borderColor: isActive ? zone.color : '#e2e8f0',
                  boxShadow: isActive ? `0px 4px 20px ${zone.color}33` : '0px 2px 8px rgba(0,0,0,0.05)',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
