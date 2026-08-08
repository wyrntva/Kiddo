import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import ExploreDesktopZoneMap from './ExploreDesktopZoneMap'
import ExploreMobileZoneMap from './ExploreMobileZoneMap'
import { ZONE_ROUTES } from './exploreZoneMapData'
import useExploreZoneMap from './useExploreZoneMap'

export default function ExploreZoneMap() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [dbZones, setDbZones] = useState<any[]>([])
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
    desktopVisibleHeight,
    mobileScale,
  } = useExploreZoneMap()

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname.includes('ottopia.vn') ? window.location.origin : 'http://localhost:5000')
    const token = localStorage.getItem('accessToken')

    fetch(`${API_URL}/api/zones`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(json => {
        if (Array.isArray(json.data)) {
          setDbZones(json.data)
        }
      })
      .catch(err => console.error('Lỗi khi tải trạng thái khóa hòn đảo:', err))
  }, [])

  const handleNavigate = (zoneIdx = 0) => {
    const keysMap = ['emotion', 'friendship', 'communication', 'independence', 'situation']
    const key = keysMap[zoneIdx]
    const dbZone = dbZones.find(z => z.key === key)
    const lockStatus = dbZone?.lockStatus || 'UNLOCKED'

    if (lockStatus === 'DEV') {
      return
    }

    if (lockStatus === 'PAID') {
      if (!user || !user.isPaid) {
        navigate('/courses')
        return
      }
    }

    navigate(ZONE_ROUTES[zoneIdx] ?? '/courses')
  }

  return (
    <section className="px-4 md:px-6 xl:px-[48px] w-full h-full flex flex-col">
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
        dbZones={dbZones}
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
        dbZones={dbZones}
        scale={scale}
        height={height}
        designWidth={designWidth}
        designHeight={designHeight}
        desktopVisibleHeight={desktopVisibleHeight}
        onHoverChange={setHoveredZoneIdx}
        onNavigate={handleNavigate}
      />
    </section>
  )
}
