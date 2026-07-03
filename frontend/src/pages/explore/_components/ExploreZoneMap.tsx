import { useNavigate } from 'react-router-dom'
import ExploreDesktopZoneMap from './ExploreDesktopZoneMap'
import ExploreMobileZoneMap from './ExploreMobileZoneMap'
import { ZONE_ROUTES } from './exploreZoneMapData'
import useExploreZoneMap from './useExploreZoneMap'

export default function ExploreZoneMap() {
  const navigate = useNavigate()
  const {
    wrapperRef,
    scrollContainerRef,
    cardContainerRef,
    hoveredZoneIdx,
    setHoveredZoneIdx,
    activeZoneIdx,
    setActiveZoneIdx,
    scale,
    height,
    designWidth,
    designHeight,
    mobileScale,
  } = useExploreZoneMap()

  const handleNavigate = (zoneIdx = 0) => {
    navigate(ZONE_ROUTES[zoneIdx] ?? '/courses')
  }

  return (
    <section className="px-4 xl:px-[48px] w-full h-full flex flex-col">
      <style>{`
        @keyframes drift {
          0% { transform: translateX(-400px); }
          100% { transform: translateX(2000px); }
        }
        .animate-drift { animation: drift linear infinite; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none', userSelect: 'none' }}>
        <defs>
          <filter id="cloud-filter-back">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="cloud-filter-front">
            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <ExploreMobileZoneMap
        activeZoneIdx={activeZoneIdx}
        hoveredZoneIdx={hoveredZoneIdx}
        cardContainerRef={cardContainerRef}
        scrollContainerRef={scrollContainerRef}
        designWidth={designWidth}
        designHeight={designHeight}
        mobileScale={mobileScale}
        onSetActiveZone={setActiveZoneIdx}
        onNavigate={handleNavigate}
      />

      <ExploreDesktopZoneMap
        wrapperRef={wrapperRef}
        hoveredZoneIdx={hoveredZoneIdx}
        scale={scale}
        height={height}
        designWidth={designWidth}
        designHeight={designHeight}
        onHoverChange={setHoveredZoneIdx}
        onNavigate={handleNavigate}
      />
    </section>
  )
}
