import { useEffect, useRef, useState } from 'react'
import { EXPLORE_ISLANDS } from './exploreZoneMapData'

const DESIGN_WIDTH = 1824
const DESIGN_HEIGHT = 1026
const MOBILE_SCALE = 0.75

export default function useExploreZoneMap() {
  const [hoveredZoneIdx, setHoveredZoneIdx] = useState<number | null>(null)
  const [activeZoneIdx, setActiveZoneIdx] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cardContainerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [height, setHeight] = useState(DESIGN_HEIGHT)

  useEffect(() => {
    const update = () => {
      if (!wrapperRef.current) return

      const width = wrapperRef.current.offsetWidth
      const widthScale = width / DESIGN_WIDTH
      const proportionalHeight = DESIGN_HEIGHT * widthScale

      wrapperRef.current.style.height = ''
      wrapperRef.current.style.maxHeight = `${proportionalHeight}px`

      setScale(widthScale)
      setHeight(wrapperRef.current.offsetHeight)
    }

    update()
    const timer = setTimeout(update, 50)
    window.addEventListener('resize', update)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    let attempts = 0

    const handleScroll = () => {
      const container = scrollContainerRef.current
      if (!container) return

      const island = EXPLORE_ISLANDS.find((entry) => entry.zoneIdx === activeZoneIdx)
      if (!island) return

      const viewportWidth = container.clientWidth
      const viewportHeight = container.clientHeight

      if ((viewportWidth === 0 || viewportHeight === 0) && attempts < 10) {
        attempts += 1
        setTimeout(handleScroll, 100)
        return
      }

      const centerX = (island.left + island.width / 2) * MOBILE_SCALE
      const centerY = (island.top + island.height / 2) * MOBILE_SCALE

      container.scrollTo({
        left: centerX - viewportWidth / 2,
        top: centerY - viewportHeight / 2,
        behavior: 'smooth',
      })
    }

    const timer = setTimeout(handleScroll, 300)
    return () => clearTimeout(timer)
  }, [activeZoneIdx])

  useEffect(() => {
    const cardContainer = cardContainerRef.current
    if (!cardContainer) return

    const activeCard = cardContainer.children[activeZoneIdx] as HTMLElement
    if (!activeCard) return

    cardContainer.scrollTo({
      left: activeCard.offsetLeft - (cardContainer.clientWidth - activeCard.clientWidth) / 2,
      behavior: 'smooth',
    })
  }, [activeZoneIdx])

  return {
    wrapperRef,
    scrollContainerRef,
    cardContainerRef,
    hoveredZoneIdx,
    setHoveredZoneIdx,
    activeZoneIdx,
    setActiveZoneIdx,
    scale,
    height,
    designWidth: DESIGN_WIDTH,
    designHeight: DESIGN_HEIGHT,
    mobileScale: MOBILE_SCALE,
  }
}
