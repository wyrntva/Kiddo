import { useEffect, useRef, useState } from 'react'
import { EXPLORE_ISLANDS } from './exploreZoneMapData'

const DESIGN_WIDTH = 1824
const DESIGN_HEIGHT = 840
const DESKTOP_VISIBLE_HEIGHT = 840
export default function useExploreZoneMap() {
  const [hoveredZoneIdx, setHoveredZoneIdx] = useState<number | null>(null)
  const [activeZoneIdx, setActiveZoneIdx] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cardContainerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [height, setHeight] = useState(DESIGN_HEIGHT)
  const [mobileScale, setMobileScale] = useState(0.75)

  useEffect(() => {
    const update = () => {
      if (wrapperRef.current) {
        const width = wrapperRef.current.offsetWidth
        // Keep the map tied to its container width. Limiting it by the remaining
        // viewport height made the whole banner (including every island) shrink
        // on laptops with a short screen or a non-default display scale.
        // The page can scroll vertically, so height must not affect its scale.
        const nextScale = width / DESIGN_WIDTH
        const scaledHeight = DESKTOP_VISIBLE_HEIGHT * nextScale

        wrapperRef.current.style.height = `${scaledHeight}px`
        wrapperRef.current.style.maxHeight = `${scaledHeight}px`

        setScale(nextScale)
        setHeight(scaledHeight)
      }

      // Calculate dynamic mobile scale based on container width
      const winWidth = window.innerWidth
      const padding = winWidth < 768 ? 32 : 48
      const containerWidth = winWidth < 768
        ? winWidth - padding
        : Math.min(winWidth - padding, 960) // Capped at new max-width 960px
      const nextMobileScale = Math.max((containerWidth * 1.05) / DESIGN_HEIGHT, 0.75)
      setMobileScale(nextMobileScale)
    }

    update()
    const timer = setTimeout(update, 50)
    window.addEventListener('resize', update)
    const resizeObserver = new ResizeObserver(update)
    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', update)
      resizeObserver.disconnect()
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

      const centerX = (island.left + island.width / 2) * mobileScale
      const centerY = (island.top + island.height / 2) * mobileScale

      container.scrollTo({
        left: centerX - viewportWidth / 2,
        top: centerY - viewportHeight / 2,
        behavior: 'smooth',
      })
    }

    const timer = setTimeout(handleScroll, 300)
    return () => clearTimeout(timer)
  }, [activeZoneIdx, mobileScale])

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
    desktopVisibleHeight: DESKTOP_VISIBLE_HEIGHT,
    mobileScale,
  }
}
